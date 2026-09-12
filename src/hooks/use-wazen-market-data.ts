import { useQuery } from "@tanstack/react-query";
import {
  searchStocksFn,
  getStockQuoteFn,
  getStockHistoryFn,
  getStockOverviewFn,
  getGoldPriceFn,
  getSilverPriceFn,
  getMetalHistoryFn,
  calculatePortfolioValuationFn,
} from "@/lib/market-data.functions";
import type { Asset } from "@/lib/assets";

/**
 * Search stock symbols and companies
 */
export function useStockSearch(keywords: string) {
  const query = keywords.trim();
  return useQuery({
    queryKey: ["stock-search", query],
    enabled: query.length >= 2,
    staleTime: 60 * 60 * 1000, // 1 hour
    queryFn: async () => {
      const res = await searchStocksFn({ data: { keywords: query } });
      return res;
    },
  });
}

/**
 * Fetch latest quote for a stock
 */
export function useStockQuote(symbol: string | null | undefined) {
  const sym = symbol?.trim().toUpperCase();
  return useQuery({
    queryKey: ["stock-quote", sym],
    enabled: Boolean(sym && sym.length >= 1),
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async () => {
      if (!sym) return null;
      const res = await getStockQuoteFn({ data: { symbol: sym } });
      return res;
    },
  });
}

/**
 * Fetch historical prices for a stock
 */
export function useStockHistory(symbol: string | null | undefined) {
  const sym = symbol?.trim().toUpperCase();
  return useQuery({
    queryKey: ["stock-history", sym],
    enabled: Boolean(sym && sym.length >= 1),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    queryFn: async () => {
      if (!sym) return null;
      const res = await getStockHistoryFn({ data: { symbol: sym } });
      return res;
    },
  });
}

/**
 * Fetch company fundamentals and dividend details
 */
export function useStockOverview(symbol: string | null | undefined) {
  const sym = symbol?.trim().toUpperCase();
  return useQuery({
    queryKey: ["stock-overview", sym],
    enabled: Boolean(sym && sym.length >= 1),
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
    queryFn: async () => {
      if (!sym) return null;
      const res = await getStockOverviewFn({ data: { symbol: sym } });
      return res;
    },
  });
}

/**
 * Fetch live spot price for gold or silver
 */
export function useMetalSpot(metal: "gold" | "silver", currency: string = "USD") {
  return useQuery({
    queryKey: ["metal-spot", metal, currency],
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async () => {
      if (metal === "gold") {
        return getGoldPriceFn({ data: { currency } });
      }
      return getSilverPriceFn({ data: { currency } });
    },
  });
}

/**
 * Fetch historical daily prices for gold or silver
 */
export function useMetalHistory(metal: "gold" | "silver") {
  return useQuery({
    queryKey: ["metal-history", metal],
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    queryFn: async () => {
      return getMetalHistoryFn({ data: { metal } });
    },
  });
}

/**
 * Live portfolio valuation computing current market values and P/L
 * against live Alpha Vantage rates while preserving purchase cost basis.
 */
export function useLivePortfolioValuation(assets: Asset[]) {
  const activeAssets = assets.filter(
    (a) => a.kind === "stock" || a.kind === "gold" || a.kind === "silver",
  );
  return useQuery({
    queryKey: [
      "live-portfolio-valuation",
      activeAssets.map((a) => `${a.id}:${a.quantity}:${a.unit_cost}`).join(","),
    ],
    enabled: activeAssets.length > 0,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const payload = activeAssets.map((a) => ({
        id: a.id,
        kind: a.kind,
        name: a.name,
        symbol: a.symbol,
        currency: a.currency,
        quantity: Number(a.quantity),
        unit_cost: Number(a.unit_cost),
        purity: a.purity,
      }));
      return calculatePortfolioValuationFn({ data: { assets: payload } });
    },
  });
}
