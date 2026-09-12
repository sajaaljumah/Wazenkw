/**
 * Wazen Currency Server Functions (RPC Gateway).
 *
 * Bridge between client UI and Frankfurter backend service.
 * Runs exclusively on the server.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type {
  ExchangeRateResult,
  BulkRatesResult,
  CurrencyConversionResult,
  FrankfurterError,
} from "@/lib/frankfurter.server";

export type { ExchangeRateResult, BulkRatesResult, CurrencyConversionResult, FrankfurterError };

/**
 * 1. Get exchange rate for a pair, optionally at a specific historical date
 */
export const getRateFn = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z
      .object({
        base: z.string().min(1),
        quote: z.string().min(1),
        date: z.string().nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<ExchangeRateResult | FrankfurterError> => {
    const { getRate } = await import("@/lib/frankfurter.server");
    return getRate(data.base, data.quote, data.date);
  });

/**
 * 2. Get bulk exchange rates for a base currency against multiple quotes
 */
export const getRatesFn = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z
      .object({
        base: z.string().default("KWD"),
        quotes: z.array(z.string()).optional(),
        date: z.string().nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<BulkRatesResult | FrankfurterError> => {
    const { getRates } = await import("@/lib/frankfurter.server");
    return getRates(data.base, data.quotes, data.date);
  });

/**
 * 3. Convert an amount from one currency to another (default KWD),
 * preserving exchange rate and date snapshot.
 */
export const convertCurrencyFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        amount: z.number(),
        from: z.string().min(1),
        to: z.string().default("KWD"),
        date: z.string().nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<CurrencyConversionResult | FrankfurterError> => {
    const { convertCurrency } = await import("@/lib/frankfurter.server");
    return convertCurrency(data.amount, data.from, data.to, data.date);
  });
