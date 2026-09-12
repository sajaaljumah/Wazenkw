import { useQuery } from "@tanstack/react-query";
import { getRateFn, getRatesFn, convertCurrencyFn } from "@/lib/currency.functions";
import type {
  CurrencyConversionResult,
  ExchangeRateResult,
  BulkRatesResult,
} from "@/lib/currency.functions";

/**
 * Fetch exchange rate for a single pair (e.g. USD -> KWD).
 * Stored in React Query cache.
 */
export function useCurrencyRate(base: string, quote: string, date?: string | null) {
  const b = base.trim().toUpperCase();
  const q = quote.trim().toUpperCase();
  return useQuery({
    queryKey: ["currency-rate", b, q, date || "latest"],
    enabled: Boolean(b && q),
    staleTime: 60 * 60 * 1000, // 1 hour
    queryFn: async (): Promise<ExchangeRateResult | null> => {
      const res = await getRateFn({ data: { base: b, quote: q, date: date || undefined } });
      if (!res.success) return null;
      return res;
    },
  });
}

/**
 * Fetch bulk exchange rates for a base currency (default KWD).
 */
export function useCurrencyRates(base: string = "KWD", quotes?: string[], date?: string | null) {
  const b = base.trim().toUpperCase() || "KWD";
  return useQuery({
    queryKey: [
      "currency-rates-bulk",
      b,
      quotes ? quotes.sort().join(",") : "all",
      date || "latest",
    ],
    staleTime: 60 * 60 * 1000, // 1 hour
    queryFn: async (): Promise<BulkRatesResult | null> => {
      const res = await getRatesFn({ data: { base: b, quotes, date: date || undefined } });
      if (!res.success) return null;
      return res;
    },
  });
}

/**
 * Convert an amount between currencies.
 */
export function useConvertCurrency(
  amount: number,
  from: string,
  to: string = "KWD",
  date?: string | null,
) {
  const num = Number(amount) || 0;
  const f = from.trim().toUpperCase();
  const t = to.trim().toUpperCase() || "KWD";
  return useQuery({
    queryKey: ["currency-convert", num, f, t, date || "latest"],
    enabled: num > 0 && Boolean(f && t),
    staleTime: 60 * 60 * 1000,
    queryFn: async (): Promise<CurrencyConversionResult | null> => {
      const res = await convertCurrencyFn({
        data: {
          amount: num,
          from: f,
          to: t,
          date: date || undefined,
        },
      });
      if (!res.success) return null;
      return res;
    },
  });
}
