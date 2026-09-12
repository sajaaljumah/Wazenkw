/**
 * Wazen's currency layer.
 *
 * Wazen currently targets Kuwait, so KWD is the default currency everywhere.
 * Conversion is deliberately expressed as a provider interface: a live exchange
 * rate API can be wired behind `ExchangeRateProvider` later (in the backend/API
 * layer) without touching any screen. Nothing here calls an external service and
 * no API key belongs in this file.
 */

export type CurrencyCode = string;

export const DEFAULT_CURRENCY: CurrencyCode = "KWD";

export type CurrencyMeta = {
  code: CurrencyCode;
  /** Minor-unit digits used for display and rounding. */
  digits: number;
  nameEn: string;
  nameAr: string;
};

/** Currencies Wazen presents today. KWD is first because Kuwait is the home market. */
export const CURRENCIES: CurrencyMeta[] = [
  { code: "KWD", digits: 3, nameEn: "Kuwaiti dinar", nameAr: "دينار كويتي" },
  { code: "SAR", digits: 2, nameEn: "Saudi riyal", nameAr: "ريال سعودي" },
  { code: "AED", digits: 2, nameEn: "UAE dirham", nameAr: "درهم إماراتي" },
  { code: "BHD", digits: 3, nameEn: "Bahraini dinar", nameAr: "دينار بحريني" },
  { code: "QAR", digits: 2, nameEn: "Qatari riyal", nameAr: "ريال قطري" },
  { code: "OMR", digits: 3, nameEn: "Omani rial", nameAr: "ريال عماني" },
  { code: "USD", digits: 2, nameEn: "US dollar", nameAr: "دولار أمريكي" },
  { code: "EUR", digits: 2, nameEn: "Euro", nameAr: "يورو" },
  { code: "GBP", digits: 2, nameEn: "British pound", nameAr: "جنيه إسترليني" },
];

export function currencyMeta(code: CurrencyCode): CurrencyMeta {
  return (
    CURRENCIES.find((item) => item.code === code) ?? {
      code,
      digits: 2,
      nameEn: code,
      nameAr: code,
    }
  );
}

export function currencyDigits(code: CurrencyCode): number {
  return currencyMeta(code).digits;
}

export function currencyName(code: CurrencyCode, language: "en" | "ar"): string {
  const meta = currencyMeta(code);
  return language === "ar" ? meta.nameAr : meta.nameEn;
}

/** A snapshot of rates expressed as "1 unit of base = rates[code] units of code". */
export type RateSnapshot = {
  base: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  /** When the snapshot was produced. */
  asOf: string;
  /** Where the numbers came from; "none" means no rate source is connected yet. */
  source: "none" | "stored" | "api";
};

export type ExchangeRateProvider = {
  /**
   * Returns a rate snapshot, or null when no rate source is available.
   * A future currency API implementation plugs in here.
   */
  getRates(base: CurrencyCode): Promise<RateSnapshot | null>;
};

/**
 * The provider Wazen ships with today: no external rate source is connected, so
 * it reports that rates are unavailable instead of inventing numbers.
 */
export const unavailableRateProvider: ExchangeRateProvider = {
  async getRates() {
    return null;
  },
};

let activeProvider: ExchangeRateProvider = unavailableRateProvider;

/** Swap in a real provider once the backend/API layer exists. */
export function setExchangeRateProvider(provider: ExchangeRateProvider): void {
  activeProvider = provider;
}

export function exchangeRateProvider(): ExchangeRateProvider {
  return activeProvider;
}

export type ConversionResult = {
  amount: number | null;
  rate: number | null;
  /** True when the two currencies match and no rate is needed. */
  identity: boolean;
};

/**
 * Pure conversion helper. With no snapshot it only resolves the identity case,
 * which keeps every calculation honest until a rate source is connected.
 */
export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  snapshot?: RateSnapshot | null,
): ConversionResult {
  if (from === to) return { amount, rate: 1, identity: true };
  if (!snapshot) return { amount: null, rate: null, identity: false };
  const rates = { ...snapshot.rates, [snapshot.base]: 1 };
  const fromRate = rates[from];
  const toRate = rates[to];
  if (!fromRate || !toRate) return { amount: null, rate: null, identity: false };
  const rate = toRate / fromRate;
  return { amount: amount * rate, rate, identity: false };
}

/** Stored foreign-currency snapshot preserved on transactions. */
export type FxSnapshot = {
  original_amount: number;
  original_currency: string;
  converted_amount: number; // in base currency (KWD)
  exchange_rate: number; // rate used to convert to KWD
  rate_date: string; // date of the exchange rate used
};

const FX_TAG_REGEX = /<!--fx:(\{[^}]+\})-->/;

/** Serializes an exchange-rate snapshot into a metadata tag */
export function attachFxSnapshot(note: string | null | undefined, snapshot: FxSnapshot): string {
  const clean = (note ?? "").replace(FX_TAG_REGEX, "").trim();
  const serialized = `<!--fx:${JSON.stringify(snapshot)}-->`;
  return clean ? `${clean}\n${serialized}` : serialized;
}

/** Extracts an exchange-rate snapshot from metadata */
export function parseFxSnapshot(note: string | null | undefined): {
  cleanNote: string | null;
  snapshot: FxSnapshot | null;
} {
  if (!note) return { cleanNote: null, snapshot: null };
  const match = note.match(FX_TAG_REGEX);
  if (!match) return { cleanNote: note, snapshot: null };
  try {
    const rawTag = match[1];
    if (!rawTag) return { cleanNote: note, snapshot: null };
    const parsed = JSON.parse(rawTag) as FxSnapshot;
    const clean = note.replace(FX_TAG_REGEX, "").trim();
    return {
      cleanNote: clean.length > 0 ? clean : null,
      snapshot: parsed,
    };
  } catch {
    return { cleanNote: note, snapshot: null };
  }
}

/** Enriches a transaction record with parsed FX snapshot data */
export function enrichTransactionWithFx<
  T extends { note?: string | null; amount: number; currency: string },
>(
  transaction: T,
): T & {
  original_amount?: number | null;
  original_currency?: string | null;
  converted_amount?: number | null;
  exchange_rate?: number | null;
  rate_date?: string | null;
} {
  const parsed = parseFxSnapshot(transaction.note);
  const raw = transaction as Record<string, unknown>;
  if (parsed.snapshot) {
    return {
      ...transaction,
      note: parsed.cleanNote,
      original_amount: parsed.snapshot.original_amount,
      original_currency: parsed.snapshot.original_currency,
      converted_amount: parsed.snapshot.converted_amount,
      exchange_rate: parsed.snapshot.exchange_rate,
      rate_date: parsed.snapshot.rate_date,
    };
  }
  return {
    ...transaction,
    original_amount: (raw["original_amount"] as number | undefined) ?? transaction.amount,
    original_currency: (raw["original_currency"] as string | undefined) ?? transaction.currency,
    converted_amount: (raw["converted_amount"] as number | undefined) ?? transaction.amount,
    exchange_rate: (raw["exchange_rate"] as number | undefined) ?? 1.0,
    rate_date: (raw["rate_date"] as string | undefined) ?? null,
  };
}
