/**
 * Frankfurter Currency Service for Wazen.
 *
 * Runs strictly on the server backend. Never imported into client bundles.
 * All requests to Frankfurter are made server-to-server.
 * No API key is required.
 * Official API: https://api.frankfurter.dev/v2
 */

export const FRANKFURTER_BASE_URL = "https://api.frankfurter.dev/v2";

export type FrankfurterError = {
  success: false;
  error: "INVALID_CURRENCY" | "INVALID_DATE" | "RATE_UNAVAILABLE" | "NETWORK_ERROR";
  message: string;
};

export type ExchangeRateResult = {
  success: true;
  base: string;
  quote: string;
  rate: number;
  date: string;
  cached?: boolean | undefined;
};

export type BulkRatesResult = {
  success: true;
  base: string;
  date: string;
  rates: Record<string, number>;
  cached?: boolean | undefined;
};

export type CurrencyConversionResult = {
  success: true;
  original_amount: number;
  original_currency: string;
  converted_amount: number; // in target currency (default KWD)
  target_currency: string;
  exchange_rate: number; // 1 unit of from = exchange_rate units of to
  rate_date: string;
  cached?: boolean | undefined;
};

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setToCache<T>(key: string, data: T, ttlMs: number): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

// TTL: 1 hour for latest rates, 7 days for historical date rates
const LATEST_TTL_MS = 60 * 60 * 1000;
const HISTORICAL_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function sanitizeDate(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  const trimmed = dateStr.slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

/**
 * 1. Fetch rate for a single currency pair (e.g. USD -> KWD, KWD -> USD)
 * Supports optional historical date (YYYY-MM-DD).
 */
export async function getRate(
  base: string,
  quote: string,
  date?: string | null,
): Promise<ExchangeRateResult | FrankfurterError> {
  const b = base.trim().toUpperCase();
  const q = quote.trim().toUpperCase();
  const validDate = sanitizeDate(date);

  if (!b || !q) {
    return {
      success: false,
      error: "INVALID_CURRENCY",
      message: "Base and quote currency codes are required.",
    };
  }

  // Identity rate (e.g. KWD to KWD is always 1.0)
  if (b === q) {
    return {
      success: true,
      base: b,
      quote: q,
      rate: 1.0,
      date: validDate || new Date().toISOString().slice(0, 10),
    };
  }

  const cacheKey = `fx_rate:${b}:${q}:${validDate || "latest"}`;
  const cached = getFromCache<ExchangeRateResult>(cacheKey);
  if (cached) {
    return { ...cached, cached: true };
  }

  const queryParams = new URLSearchParams();
  if (validDate) {
    queryParams.set("date", validDate);
  }

  const url = `${FRANKFURTER_BASE_URL}/rate/${encodeURIComponent(b)}/${encodeURIComponent(q)}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Wazen-Finance-App/1.0",
      },
    });

    if (!res.ok) {
      const errBody = (await res.json().catch(() => ({}))) as { message?: string; status?: number };
      const status = res.status;
      if (status === 422) {
        return {
          success: false,
          error: errBody.message?.includes("date") ? "INVALID_DATE" : "INVALID_CURRENCY",
          message: errBody.message || "Invalid currency or date provided.",
        };
      }
      return {
        success: false,
        error: "RATE_UNAVAILABLE",
        message: errBody.message || `Rate unavailable (HTTP ${status}).`,
      };
    }

    const data = (await res.json()) as { date: string; base: string; quote: string; rate: number };
    const result: ExchangeRateResult = {
      success: true,
      base: data.base,
      quote: data.quote,
      rate: data.rate,
      date: data.date,
    };

    setToCache(cacheKey, result, validDate ? HISTORICAL_TTL_MS : LATEST_TTL_MS);
    return result;
  } catch (err) {
    return {
      success: false,
      error: "NETWORK_ERROR",
      message: err instanceof Error ? err.message : "Network error contacting Frankfurter API.",
    };
  }
}

/**
 * 2. Fetch bulk exchange rates for a base currency against multiple quotes.
 */
export async function getRates(
  base: string = "KWD",
  quotes?: string[],
  date?: string | null,
): Promise<BulkRatesResult | FrankfurterError> {
  const b = base.trim().toUpperCase() || "KWD";
  const validDate = sanitizeDate(date);
  const qList = quotes && quotes.length > 0 ? quotes.map((q) => q.trim().toUpperCase()) : undefined;

  const cacheKey = `fx_bulk:${b}:${qList ? qList.sort().join(",") : "all"}:${validDate || "latest"}`;
  const cached = getFromCache<BulkRatesResult>(cacheKey);
  if (cached) {
    return { ...cached, cached: true };
  }

  const queryParams = new URLSearchParams({ base: b });
  if (qList && qList.length > 0) {
    queryParams.set("quotes", qList.join(","));
  }
  if (validDate) {
    queryParams.set("date", validDate);
  }

  const url = `${FRANKFURTER_BASE_URL}/rates?${queryParams.toString()}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Wazen-Finance-App/1.0",
      },
    });

    if (!res.ok) {
      const errBody = (await res.json().catch(() => ({}))) as { message?: string };
      return {
        success: false,
        error: "RATE_UNAVAILABLE",
        message: errBody.message || `Exchange rates unavailable (HTTP ${res.status}).`,
      };
    }

    const rows = (await res.json()) as Array<{
      date: string;
      base: string;
      quote: string;
      rate: number;
    }>;
    const rateMap: Record<string, number> = { [b]: 1.0 };
    let latestDate = validDate || new Date().toISOString().slice(0, 10);

    for (const row of rows) {
      rateMap[row.quote] = row.rate;
      if (row.date) latestDate = row.date;
    }

    const result: BulkRatesResult = {
      success: true,
      base: b,
      date: latestDate,
      rates: rateMap,
    };

    setToCache(cacheKey, result, validDate ? HISTORICAL_TTL_MS : LATEST_TTL_MS);
    return result;
  } catch (err) {
    return {
      success: false,
      error: "NETWORK_ERROR",
      message: err instanceof Error ? err.message : "Network error contacting Frankfurter API.",
    };
  }
}

/**
 * 3. Currency conversion helper
 * Converts `amount` from `fromCurrency` to `toCurrency` (default KWD).
 * If date is given, uses the historical exchange rate on that date.
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string = "KWD",
  date?: string | null,
): Promise<CurrencyConversionResult | FrankfurterError> {
  const numAmount = Number(amount) || 0;
  const from = fromCurrency.trim().toUpperCase();
  const to = toCurrency.trim().toUpperCase() || "KWD";
  const validDate = sanitizeDate(date);

  // Identity case
  if (from === to) {
    const today = validDate || new Date().toISOString().slice(0, 10);
    return {
      success: true,
      original_amount: numAmount,
      original_currency: from,
      converted_amount: numAmount,
      target_currency: to,
      exchange_rate: 1.0,
      rate_date: today,
    };
  }

  // Fetch exchange rate from `from` to `to`
  const rateRes = await getRate(from, to, validDate);
  if (!rateRes.success) {
    return rateRes;
  }

  const exchangeRate = rateRes.rate;
  const convertedAmount = Number((numAmount * exchangeRate).toFixed(3));

  return {
    success: true,
    original_amount: numAmount,
    original_currency: from,
    converted_amount: convertedAmount,
    target_currency: to,
    exchange_rate: exchangeRate,
    rate_date: rateRes.date,
    cached: rateRes.cached,
  };
}
