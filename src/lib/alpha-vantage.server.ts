/**
 * Alpha Vantage Server Service for Wazen.
 *
 * Runs strictly on the server backend. Never imported into client bundles.
 * All requests to Alpha Vantage are made server-to-server.
 * Credentials exist only in server environment variables.
 */

// International troy ounce to gram conversion ratio
export const TROY_OUNCE_TO_GRAMS = 31.1034768;

export type AlphaVantageError = {
  success: false;
  error: "NO_API_KEY" | "RATE_LIMITED" | "INVALID_SYMBOL" | "API_ERROR" | "NETWORK_ERROR";
  message: string;
};

export type StockQuote = {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  latestTradingDay: string;
  previousClose: number;
  change: number;
  changePercent: number;
  changePercentFormatted: string;
  asOf: string;
};

export type StockSearchResult = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
  matchScore: number;
};

export type StockHistoryPoint = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type StockOverview = {
  symbol: string;
  name: string;
  description?: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  dividendYield: number;
  dividendPerShare: number;
  dividendDate: string | null;
  exDividendDate: string | null;
  peRatio: number | null;
  weekHigh52: number | null;
  weekLow52: number | null;
};

export type MetalSpotPrice = {
  metal: "gold" | "silver";
  symbol: "XAU" | "XAG";
  currency: string;
  pricePerTroyOunce: number;
  pricePerGram24K: number;
  pricePerGram21K?: number;
  pricePerGram18K?: number;
  asOf: string;
  cached?: boolean;
};

export type MetalHistoryPoint = {
  date: string;
  pricePerTroyOunce: number;
  pricePerGram: number;
};

export type AssetValuationInput = {
  id: string;
  kind: "stock" | "gold" | "silver" | "real_estate";
  name: string;
  symbol: string | null;
  currency: string;
  quantity: number;
  unit_cost: number;
  purity?: string | null;
};

export type AssetLiveValuation = {
  id: string;
  kind: string;
  name: string;
  symbol: string | null;
  quantity: number;
  originalUnitCost: number;
  originalCostBasis: number;
  liveUnitPrice: number | null;
  liveMarketValue: number | null;
  gain: number | null;
  gainPercent: number | null;
  priceAvailable: boolean;
  notes?: string;
};

// In-memory cache structure
type CacheEntry<T> = {
  data: T;
  timestamp: number;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

function getFromCache<T>(key: string): { data: T; isStale: boolean } | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  const now = Date.now();
  if (now <= entry.expiresAt) {
    return { data: entry.data, isStale: false };
  }
  // Stale entry kept as fallback if rate-limited
  return { data: entry.data, isStale: true };
}

function setToCache<T>(key: string, data: T, ttlMs: number): void {
  const now = Date.now();
  cache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + ttlMs,
  });
}

function getApiKey(): string | null {
  const key = process.env["ALPHA_VANTAGE_API_KEY"];
  if (!key || key.trim().length === 0) {
    return null;
  }
  return key.trim();
}

const BASE_URL = "https://www.alphavantage.co/query";

async function fetchAlphaVantage(
  params: Record<string, string>,
): Promise<Record<string, unknown> | AlphaVantageError> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      success: false,
      error: "NO_API_KEY",
      message:
        "Alpha Vantage API key is not configured on the server. Set ALPHA_VANTAGE_API_KEY in server environment.",
    };
  }

  const query = new URLSearchParams({
    ...params,
    apikey: apiKey,
  });

  try {
    const res = await fetch(`${BASE_URL}?${query.toString()}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Wazen-Finance-App/1.0",
      },
    });

    if (!res.ok) {
      return {
        success: false,
        error: "NETWORK_ERROR",
        message: `Alpha Vantage returned HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as Record<string, unknown>;

    // Handle Alpha Vantage error message formats
    if (json["Error Message"]) {
      return {
        success: false,
        error: "INVALID_SYMBOL",
        message: String(json["Error Message"]),
      };
    }

    // Handle rate-limit notes and throttling messages
    if (
      json["Note"] ||
      (typeof json["Information"] === "string" &&
        ((json["Information"] as string).toLowerCase().includes("call frequency") ||
          (json["Information"] as string).toLowerCase().includes("rate limit") ||
          (json["Information"] as string).toLowerCase().includes("requests per day") ||
          (json["Information"] as string).toLowerCase().includes("sparingly") ||
          (json["Information"] as string).toLowerCase().includes("premium")))
    ) {
      return {
        success: false,
        error: "RATE_LIMITED",
        message:
          "Alpha Vantage free API rate limit reached (standard limit is 25 requests/day or 5 calls/minute). Please try again shortly.",
      };
    }

    return json;
  } catch (err) {
    return {
      success: false,
      error: "NETWORK_ERROR",
      message: err instanceof Error ? err.message : "Network error contacting Alpha Vantage",
    };
  }
}

/**
 * 1. Search/Lookup Stocks
 */
export async function searchStocks(
  keywords: string,
): Promise<{ success: true; data: StockSearchResult[] } | AlphaVantageError> {
  const trimmed = keywords.trim();
  if (!trimmed) {
    return { success: true, data: [] };
  }

  const cacheKey = `stock_search:${trimmed.toUpperCase()}`;
  const cached = getFromCache<StockSearchResult[]>(cacheKey);
  if (cached && !cached.isStale) {
    return { success: true, data: cached.data };
  }

  const res = await fetchAlphaVantage({
    function: "SYMBOL_SEARCH",
    keywords: trimmed,
  });

  if ("success" in res && !res.success) {
    // If rate limited, fallback to stale cache if available
    if (cached) return { success: true, data: cached.data };
    return res;
  }

  const matches = (res["bestMatches"] as Array<Record<string, string>>) || [];
  const results: StockSearchResult[] = matches.map((m) => ({
    symbol: m["1. symbol"] ?? "",
    name: m["2. name"] ?? "",
    type: m["3. type"] ?? "",
    region: m["4. region"] ?? "",
    currency: m["8. currency"] ?? "USD",
    matchScore: parseFloat(m["9. matchScore"] ?? "0"),
  }));

  setToCache(cacheKey, results, 60 * 60 * 1000); // 1 hour TTL
  return { success: true, data: results };
}

/**
 * 2. Latest Stock Quote
 */
export async function getStockQuote(
  symbol: string,
): Promise<{ success: true; data: StockQuote } | AlphaVantageError> {
  const sym = symbol.trim().toUpperCase();
  if (!sym) {
    return { success: false, error: "INVALID_SYMBOL", message: "Stock symbol is required" };
  }

  const cacheKey = `stock_quote:${sym}`;
  const cached = getFromCache<StockQuote>(cacheKey);
  if (cached && !cached.isStale) {
    return { success: true, data: cached.data };
  }

  const res = await fetchAlphaVantage({
    function: "GLOBAL_QUOTE",
    symbol: sym,
  });

  if ("success" in res && !res.success) {
    if (cached) return { success: true, data: cached.data };
    return res;
  }

  const quoteData = res["Global Quote"] as Record<string, string> | undefined;
  if (!quoteData || !quoteData["01. symbol"] || !quoteData["05. price"]) {
    if (cached) return { success: true, data: cached.data };
    return {
      success: false,
      error: "INVALID_SYMBOL",
      message: `No quote data available for symbol "${sym}"`,
    };
  }

  const price = parseFloat(quoteData["05. price"] ?? "0");
  const change = parseFloat(quoteData["09. change"] ?? "0");
  const changePctStr = quoteData["10. change percent"] ?? "0%";
  const changePercent = parseFloat(changePctStr.replace("%", "")) || 0;

  const quote: StockQuote = {
    symbol: quoteData["01. symbol"],
    price,
    open: parseFloat(quoteData["02. open"] ?? "0"),
    high: parseFloat(quoteData["03. high"] ?? "0"),
    low: parseFloat(quoteData["04. low"] ?? "0"),
    volume: parseInt(quoteData["06. volume"] ?? "0", 10),
    latestTradingDay: quoteData["07. latest trading day"] ?? new Date().toISOString().slice(0, 10),
    previousClose: parseFloat(quoteData["08. previous close"] ?? "0"),
    change,
    changePercent,
    changePercentFormatted: changePctStr,
    asOf: new Date().toISOString(),
  };

  setToCache(cacheKey, quote, 5 * 60 * 1000); // 5 minutes TTL
  return { success: true, data: quote };
}

/**
 * 3. Historical Stock Prices
 */
export async function getStockHistory(
  symbol: string,
): Promise<{ success: true; data: StockHistoryPoint[] } | AlphaVantageError> {
  const sym = symbol.trim().toUpperCase();
  if (!sym) {
    return { success: false, error: "INVALID_SYMBOL", message: "Stock symbol is required" };
  }

  const cacheKey = `stock_history:${sym}`;
  const cached = getFromCache<StockHistoryPoint[]>(cacheKey);
  if (cached && !cached.isStale) {
    return { success: true, data: cached.data };
  }

  const res = await fetchAlphaVantage({
    function: "TIME_SERIES_DAILY",
    symbol: sym,
    outputsize: "compact", // last 100 days
  });

  if ("success" in res && !res.success) {
    if (cached) return { success: true, data: cached.data };
    return res;
  }

  const timeSeries = res["Time Series (Daily)"] as
    Record<string, Record<string, string>> | undefined;
  if (!timeSeries) {
    if (cached) return { success: true, data: cached.data };
    return {
      success: false,
      error: "API_ERROR",
      message: `Historical daily data unavailable for "${sym}"`,
    };
  }

  const points: StockHistoryPoint[] = Object.entries(timeSeries)
    .map(([date, values]) => ({
      date,
      open: parseFloat(values["1. open"] ?? "0"),
      high: parseFloat(values["2. high"] ?? "0"),
      low: parseFloat(values["3. low"] ?? "0"),
      close: parseFloat(values["4. close"] ?? "0"),
      volume: parseInt(values["5. volume"] ?? "0", 10),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  setToCache(cacheKey, points, 24 * 60 * 60 * 1000); // 24 hours TTL
  return { success: true, data: points };
}

/**
 * 4. Stock Overview & Dividends
 */
export async function getStockOverview(
  symbol: string,
): Promise<{ success: true; data: StockOverview } | AlphaVantageError> {
  const sym = symbol.trim().toUpperCase();
  if (!sym) {
    return { success: false, error: "INVALID_SYMBOL", message: "Stock symbol is required" };
  }

  const cacheKey = `stock_overview:${sym}`;
  const cached = getFromCache<StockOverview>(cacheKey);
  if (cached && !cached.isStale) {
    return { success: true, data: cached.data };
  }

  const res = await fetchAlphaVantage({
    function: "OVERVIEW",
    symbol: sym,
  });

  if ("success" in res && !res.success) {
    if (cached) return { success: true, data: cached.data };
    return res;
  }

  if (!res["Symbol"]) {
    if (cached) return { success: true, data: cached.data };
    return {
      success: false,
      error: "INVALID_SYMBOL",
      message: `No overview details found for "${sym}"`,
    };
  }

  const overview: StockOverview = {
    symbol: String(res["Symbol"] ?? sym),
    name: String(res["Name"] ?? sym),
    description: res["Description"] ? String(res["Description"]) : undefined,
    currency: String(res["Currency"] ?? "USD"),
    country: String(res["Country"] ?? ""),
    sector: String(res["Sector"] ?? ""),
    industry: String(res["Industry"] ?? ""),
    dividendYield: parseFloat(String(res["DividendYield"] ?? "0")),
    dividendPerShare: parseFloat(String(res["DividendPerShare"] ?? "0")),
    dividendDate: res["DividendDate"] ? String(res["DividendDate"]) : null,
    exDividendDate: res["ExDividendDate"] ? String(res["ExDividendDate"]) : null,
    peRatio: res["PERatio"] ? parseFloat(String(res["PERatio"])) : null,
    weekHigh52: res["52WeekHigh"] ? parseFloat(String(res["52WeekHigh"])) : null,
    weekLow52: res["52WeekLow"] ? parseFloat(String(res["52WeekLow"])) : null,
  };

  setToCache(cacheKey, overview, 12 * 60 * 60 * 1000); // 12 hours TTL
  return { success: true, data: overview };
}

/**
 * 5. Gold Spot Price (XAU) & Gram Calculations
 */
export async function getGoldSpot(
  toCurrency: string = "USD",
): Promise<{ success: true; data: MetalSpotPrice } | AlphaVantageError> {
  const curr = toCurrency.trim().toUpperCase() || "USD";
  const cacheKey = `metal_spot:XAU:${curr}`;
  const cached = getFromCache<MetalSpotPrice>(cacheKey);
  if (cached && !cached.isStale) {
    return { success: true, data: cached.data };
  }

  let pricePerOunce = 0;
  let asOf = new Date().toISOString();

  // 1. Try dedicated GOLD_SILVER_SPOT endpoint
  const spotRes = await fetchAlphaVantage({
    function: "GOLD_SILVER_SPOT",
    symbol: "GOLD",
  });

  if (!("success" in spotRes && !spotRes.success)) {
    if (typeof spotRes["price"] === "string" || typeof spotRes["price"] === "number") {
      pricePerOunce = parseFloat(String(spotRes["price"]));
      if (typeof spotRes["timestamp"] === "string") asOf = String(spotRes["timestamp"]);
    }
  }

  // 2. Fallback: try CURRENCY_EXCHANGE_RATE for XAU
  if (pricePerOunce <= 0) {
    const res = await fetchAlphaVantage({
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: "XAU",
      to_currency: curr,
    });

    if (!("success" in res && !res.success)) {
      const rateData = res["Realtime Currency Exchange Rate"] as Record<string, string> | undefined;
      if (rateData && rateData["5. Exchange Rate"]) {
        pricePerOunce = parseFloat(rateData["5. Exchange Rate"]);
        asOf = rateData["6. Last Refreshed"] || asOf;
      }
    }
  }

  // 3. Fallback: try commodities GOLD daily
  if (pricePerOunce <= 0) {
    const goldFallback = await fetchAlphaVantage({
      function: "GOLD",
      interval: "daily",
    });

    if (!("success" in goldFallback && !goldFallback.success)) {
      const goldData = goldFallback["data"] as Array<{ date: string; value: string }> | undefined;
      if (goldData && goldData.length > 0 && goldData[0].value !== ".") {
        pricePerOunce = parseFloat(goldData[0].value);
        asOf = goldData[0].date;
      }
    }
  }

  if (pricePerOunce <= 0) {
    if (cached) return { success: true, data: { ...cached.data, cached: true } };
    return {
      success: false,
      error: "API_ERROR",
      message: "Gold (XAU) spot price currently unavailable from Alpha Vantage",
    };
  }

  const pricePerGram24K = Number((pricePerOunce / TROY_OUNCE_TO_GRAMS).toFixed(4));
  const pricePerGram21K = Number(((pricePerOunce / TROY_OUNCE_TO_GRAMS) * (21 / 24)).toFixed(4));
  const pricePerGram18K = Number(((pricePerOunce / TROY_OUNCE_TO_GRAMS) * (18 / 24)).toFixed(4));

  const data: MetalSpotPrice = {
    metal: "gold",
    symbol: "XAU",
    currency: curr,
    pricePerTroyOunce: Number(pricePerOunce.toFixed(2)),
    pricePerGram24K,
    pricePerGram21K,
    pricePerGram18K,
    asOf,
  };

  setToCache(cacheKey, data, 5 * 60 * 1000); // 5 min TTL
  return { success: true, data };
}

/**
 * 6. Silver Spot Price (XAG) & Gram Calculations
 */
export async function getSilverSpot(
  toCurrency: string = "USD",
): Promise<{ success: true; data: MetalSpotPrice } | AlphaVantageError> {
  const curr = toCurrency.trim().toUpperCase() || "USD";
  const cacheKey = `metal_spot:XAG:${curr}`;
  const cached = getFromCache<MetalSpotPrice>(cacheKey);
  if (cached && !cached.isStale) {
    return { success: true, data: cached.data };
  }

  let pricePerOunce = 0;
  let asOf = new Date().toISOString();

  // 1. Try dedicated GOLD_SILVER_SPOT endpoint
  const spotRes = await fetchAlphaVantage({
    function: "GOLD_SILVER_SPOT",
    symbol: "SILVER",
  });

  if (!("success" in spotRes && !spotRes.success)) {
    if (typeof spotRes["price"] === "string" || typeof spotRes["price"] === "number") {
      pricePerOunce = parseFloat(String(spotRes["price"]));
      if (typeof spotRes["timestamp"] === "string") asOf = String(spotRes["timestamp"]);
    }
  }

  // 2. Fallback: try CURRENCY_EXCHANGE_RATE for XAG
  if (pricePerOunce <= 0) {
    const res = await fetchAlphaVantage({
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: "XAG",
      to_currency: curr,
    });

    if (!("success" in res && !res.success)) {
      const rateData = res["Realtime Currency Exchange Rate"] as Record<string, string> | undefined;
      if (rateData && rateData["5. Exchange Rate"]) {
        pricePerOunce = parseFloat(rateData["5. Exchange Rate"]);
        asOf = rateData["6. Last Refreshed"] || asOf;
      }
    }
  }

  if (pricePerOunce <= 0) {
    if (cached) return { success: true, data: { ...cached.data, cached: true } };
    return {
      success: false,
      error: "API_ERROR",
      message: "Silver (XAG) spot price currently unavailable from Alpha Vantage",
    };
  }

  const pricePerGram24K = Number((pricePerOunce / TROY_OUNCE_TO_GRAMS).toFixed(4));

  const data: MetalSpotPrice = {
    metal: "silver",
    symbol: "XAG",
    currency: curr,
    pricePerTroyOunce: Number(pricePerOunce.toFixed(2)),
    pricePerGram24K,
    asOf,
  };

  setToCache(cacheKey, data, 5 * 60 * 1000); // 5 min TTL
  return { success: true, data };
}

/**
 * 7. Historical Metal Prices (Gold or Silver)
 */
export async function getMetalHistory(
  metal: "gold" | "silver",
): Promise<{ success: true; data: MetalHistoryPoint[] } | AlphaVantageError> {
  const cacheKey = `metal_history:${metal}`;
  const cached = getFromCache<MetalHistoryPoint[]>(cacheKey);
  if (cached && !cached.isStale) {
    return { success: true, data: cached.data };
  }

  const res = await fetchAlphaVantage({
    function: metal.toUpperCase(),
    interval: "daily",
  });

  if ("success" in res && !res.success) {
    if (cached) return { success: true, data: cached.data };
    return res;
  }

  const dataArr = res["data"] as Array<{ date: string; value: string }> | undefined;
  if (!dataArr || !Array.isArray(dataArr)) {
    if (cached) return { success: true, data: cached.data };
    return {
      success: false,
      error: "API_ERROR",
      message: `Historical daily data unavailable for ${metal}`,
    };
  }

  const points: MetalHistoryPoint[] = dataArr
    .filter((d) => d.value !== ".")
    .slice(0, 90) // recent 90 trading days
    .map((d) => {
      const pricePerTroyOunce = parseFloat(d.value);
      return {
        date: d.date,
        pricePerTroyOunce,
        pricePerGram: Number((pricePerTroyOunce / TROY_OUNCE_TO_GRAMS).toFixed(4)),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  setToCache(cacheKey, points, 24 * 60 * 60 * 1000); // 24h TTL
  return { success: true, data: points };
}

/**
 * 8. Live Portfolio Valuation with Profit/Loss calculation
 *
 * Keeps original purchase information (unit_cost, quantity) separate
 * and computes current live market value from Alpha Vantage data.
 */
export async function calculateLivePortfolioValuation(
  assets: AssetValuationInput[],
): Promise<AssetLiveValuation[]> {
  const results: AssetLiveValuation[] = [];

  // Pre-fetch metal rates if gold or silver exists
  let goldRate: MetalSpotPrice | null = null;
  let silverRate: MetalSpotPrice | null = null;

  const hasGold = assets.some((a) => a.kind === "gold");
  const hasSilver = assets.some((a) => a.kind === "silver");

  if (hasGold) {
    const goldRes = await getGoldSpot("USD");
    if ("success" in goldRes && goldRes.success) {
      goldRate = goldRes.data;
    }
  }

  if (hasSilver) {
    const silverRes = await getSilverSpot("USD");
    if ("success" in silverRes && silverRes.success) {
      silverRate = silverRes.data;
    }
  }

  for (const asset of assets) {
    const costBasis = asset.quantity * asset.unit_cost;

    if (asset.kind === "stock" && asset.symbol) {
      const quoteRes = await getStockQuote(asset.symbol);
      if ("success" in quoteRes && quoteRes.success) {
        const livePrice = quoteRes.data.price;
        const liveMarketValue = asset.quantity * livePrice;
        const gain = liveMarketValue - costBasis;
        const gainPercent = costBasis > 0 ? (gain / costBasis) * 100 : 0;

        results.push({
          id: asset.id,
          kind: asset.kind,
          name: asset.name,
          symbol: asset.symbol,
          quantity: asset.quantity,
          originalUnitCost: asset.unit_cost,
          originalCostBasis: costBasis,
          liveUnitPrice: livePrice,
          liveMarketValue: Number(liveMarketValue.toFixed(3)),
          gain: Number(gain.toFixed(3)),
          gainPercent: Number(gainPercent.toFixed(2)),
          priceAvailable: true,
          notes: `${asset.symbol} quote @ $${livePrice}`,
        });
        continue;
      }
    }

    if (asset.kind === "gold" && goldRate) {
      // Adjust price per gram based on purity if given
      let gramPrice = goldRate.pricePerGram24K;
      if (asset.purity === "21K") gramPrice = goldRate.pricePerGram21K ?? gramPrice * (21 / 24);
      else if (asset.purity === "18K")
        gramPrice = goldRate.pricePerGram18K ?? gramPrice * (18 / 24);
      else if (asset.purity === "22K") gramPrice = Number((gramPrice * (22 / 24)).toFixed(4));

      const liveMarketValue = asset.quantity * gramPrice;
      const gain = liveMarketValue - costBasis;
      const gainPercent = costBasis > 0 ? (gain / costBasis) * 100 : 0;

      results.push({
        id: asset.id,
        kind: asset.kind,
        name: asset.name,
        symbol: "XAU",
        quantity: asset.quantity,
        originalUnitCost: asset.unit_cost,
        originalCostBasis: costBasis,
        liveUnitPrice: Number(gramPrice.toFixed(3)),
        liveMarketValue: Number(liveMarketValue.toFixed(3)),
        gain: Number(gain.toFixed(3)),
        gainPercent: Number(gainPercent.toFixed(2)),
        priceAvailable: true,
        notes: `Gold ${asset.purity || "24K"} @ $${gramPrice}/g`,
      });
      continue;
    }

    if (asset.kind === "silver" && silverRate) {
      const gramPrice = silverRate.pricePerGram24K;
      const liveMarketValue = asset.quantity * gramPrice;
      const gain = liveMarketValue - costBasis;
      const gainPercent = costBasis > 0 ? (gain / costBasis) * 100 : 0;

      results.push({
        id: asset.id,
        kind: asset.kind,
        name: asset.name,
        symbol: "XAG",
        quantity: asset.quantity,
        originalUnitCost: asset.unit_cost,
        originalCostBasis: costBasis,
        liveUnitPrice: Number(gramPrice.toFixed(3)),
        liveMarketValue: Number(liveMarketValue.toFixed(3)),
        gain: Number(gain.toFixed(3)),
        gainPercent: Number(gainPercent.toFixed(2)),
        priceAvailable: true,
        notes: `Silver @ $${gramPrice}/g`,
      });
      continue;
    }

    // Fallback if price is not dynamically available (or real estate)
    results.push({
      id: asset.id,
      kind: asset.kind,
      name: asset.name,
      symbol: asset.symbol,
      quantity: asset.quantity,
      originalUnitCost: asset.unit_cost,
      originalCostBasis: costBasis,
      liveUnitPrice: null,
      liveMarketValue: null,
      gain: null,
      gainPercent: null,
      priceAvailable: false,
    });
  }

  return results;
}
