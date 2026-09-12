/**
 * Wazen Market Data Server Functions (RPC Gateway).
 *
 * Bridge between client UI and Alpha Vantage backend service.
 * Runs exclusively on the server. Alpha Vantage API keys and external calls
 * NEVER touch the client bundle.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type {
  StockSearchResult,
  StockQuote,
  StockHistoryPoint,
  StockOverview,
  MetalSpotPrice,
  MetalHistoryPoint,
  AssetLiveValuation,
  AlphaVantageError,
} from "@/lib/alpha-vantage.server";

export type {
  StockSearchResult,
  StockQuote,
  StockHistoryPoint,
  StockOverview,
  MetalSpotPrice,
  MetalHistoryPoint,
  AssetLiveValuation,
  AlphaVantageError,
};

/**
 * 1. Search Stock Symbols & Tickers
 */
export const searchStocksFn = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ keywords: z.string().min(1) }).parse(data))
  .handler(
    async ({ data }): Promise<{ success: true; data: StockSearchResult[] } | AlphaVantageError> => {
      const { searchStocks } = await import("@/lib/alpha-vantage.server");
      return searchStocks(data.keywords);
    },
  );

/**
 * 2. Real-time / Latest Stock Quote
 */
export const getStockQuoteFn = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ symbol: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<{ success: true; data: StockQuote } | AlphaVantageError> => {
    const { getStockQuote } = await import("@/lib/alpha-vantage.server");
    return getStockQuote(data.symbol);
  });

/**
 * 3. Historical Stock Daily Prices
 */
export const getStockHistoryFn = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ symbol: z.string().min(1) }).parse(data))
  .handler(
    async ({ data }): Promise<{ success: true; data: StockHistoryPoint[] } | AlphaVantageError> => {
      const { getStockHistory } = await import("@/lib/alpha-vantage.server");
      return getStockHistory(data.symbol);
    },
  );

/**
 * 4. Stock Overview & Dividend Information
 */
export const getStockOverviewFn = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ symbol: z.string().min(1) }).parse(data))
  .handler(
    async ({ data }): Promise<{ success: true; data: StockOverview } | AlphaVantageError> => {
      const { getStockOverview } = await import("@/lib/alpha-vantage.server");
      return getStockOverview(data.symbol);
    },
  );

/**
 * 5. Gold (XAU) Spot Price & Gram Rates
 */
export const getGoldPriceFn = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ currency: z.string().optional() }).optional().parse(data))
  .handler(
    async ({ data }): Promise<{ success: true; data: MetalSpotPrice } | AlphaVantageError> => {
      const { getGoldSpot } = await import("@/lib/alpha-vantage.server");
      return getGoldSpot(data?.currency || "USD");
    },
  );

/**
 * 6. Silver (XAG) Spot Price & Gram Rates
 */
export const getSilverPriceFn = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ currency: z.string().optional() }).optional().parse(data))
  .handler(
    async ({ data }): Promise<{ success: true; data: MetalSpotPrice } | AlphaVantageError> => {
      const { getSilverSpot } = await import("@/lib/alpha-vantage.server");
      return getSilverSpot(data?.currency || "USD");
    },
  );

/**
 * 7. Historical Metal Prices (Gold or Silver)
 */
export const getMetalHistoryFn = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ metal: z.enum(["gold", "silver"]) }).parse(data))
  .handler(
    async ({ data }): Promise<{ success: true; data: MetalHistoryPoint[] } | AlphaVantageError> => {
      const { getMetalHistory } = await import("@/lib/alpha-vantage.server");
      return getMetalHistory(data.metal);
    },
  );

/**
 * 8. Live Portfolio Valuation with P/L
 * Computes valuation against live Alpha Vantage rates while leaving original purchase records intact.
 */
export const calculatePortfolioValuationFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        assets: z.array(
          z.object({
            id: z.string(),
            kind: z.enum(["stock", "gold", "silver", "real_estate"]),
            name: z.string(),
            symbol: z.string().nullable(),
            currency: z.string(),
            quantity: z.number(),
            unit_cost: z.number(),
            purity: z.string().nullable().optional(),
          }),
        ),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<AssetLiveValuation[]> => {
    const { calculateLivePortfolioValuation } = await import("@/lib/alpha-vantage.server");
    return calculateLivePortfolioValuation(data.assets);
  });
