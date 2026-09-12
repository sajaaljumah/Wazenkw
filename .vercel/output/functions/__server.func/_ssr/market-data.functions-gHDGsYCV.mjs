import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { a as objectType, i as numberType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-data.functions-gHDGsYCV.js
/**
* Wazen Market Data Server Functions (RPC Gateway).
*
* Bridge between client UI and Alpha Vantage backend service.
* Runs exclusively on the server. Alpha Vantage API keys and external calls
* NEVER touch the client bundle.
*/
var searchStocksFn_createServerFn_handler = createServerRpc({
	id: "57780b7df85c06ad6d420b160d5031ff0b4236363401abea91e62bb6dabb8758",
	name: "searchStocksFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => searchStocksFn.__executeServer(opts));
var searchStocksFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ keywords: stringType().min(1) }).parse(data)).handler(searchStocksFn_createServerFn_handler, async ({ data }) => {
	const { searchStocks } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return searchStocks(data.keywords);
});
var getStockQuoteFn_createServerFn_handler = createServerRpc({
	id: "32360425227d72510f59ed785c4fa3b24e11307ca313d45c6cdd02f1afb47120",
	name: "getStockQuoteFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => getStockQuoteFn.__executeServer(opts));
var getStockQuoteFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ symbol: stringType().min(1) }).parse(data)).handler(getStockQuoteFn_createServerFn_handler, async ({ data }) => {
	const { getStockQuote } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return getStockQuote(data.symbol);
});
var getStockHistoryFn_createServerFn_handler = createServerRpc({
	id: "1198b15cbd8d2a1ecfbcb1e0b5f0f79ef1390255c5c9e73ea2c2d6c7277957ba",
	name: "getStockHistoryFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => getStockHistoryFn.__executeServer(opts));
var getStockHistoryFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ symbol: stringType().min(1) }).parse(data)).handler(getStockHistoryFn_createServerFn_handler, async ({ data }) => {
	const { getStockHistory } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return getStockHistory(data.symbol);
});
var getStockOverviewFn_createServerFn_handler = createServerRpc({
	id: "052c42861bbe1de2174e807917d7beb21b4bae09411a8f0e91636da0e71214d0",
	name: "getStockOverviewFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => getStockOverviewFn.__executeServer(opts));
var getStockOverviewFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ symbol: stringType().min(1) }).parse(data)).handler(getStockOverviewFn_createServerFn_handler, async ({ data }) => {
	const { getStockOverview } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return getStockOverview(data.symbol);
});
var getGoldPriceFn_createServerFn_handler = createServerRpc({
	id: "cb0a6b652d4d978421329994b9e02bda2340ca471681034f26034b742deb5a0e",
	name: "getGoldPriceFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => getGoldPriceFn.__executeServer(opts));
var getGoldPriceFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ currency: stringType().optional() }).optional().parse(data)).handler(getGoldPriceFn_createServerFn_handler, async ({ data }) => {
	const { getGoldSpot } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return getGoldSpot(data?.currency || "USD");
});
var getSilverPriceFn_createServerFn_handler = createServerRpc({
	id: "be3103a4abf0690020c28a0ceec89a072c607739918964dd837527ce9b7a47d7",
	name: "getSilverPriceFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => getSilverPriceFn.__executeServer(opts));
var getSilverPriceFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ currency: stringType().optional() }).optional().parse(data)).handler(getSilverPriceFn_createServerFn_handler, async ({ data }) => {
	const { getSilverSpot } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return getSilverSpot(data?.currency || "USD");
});
var getMetalHistoryFn_createServerFn_handler = createServerRpc({
	id: "7aae837a8dc2d8ae8fd19c5d22fa19c8d087ca4532c31791e3a612358fb8bffd",
	name: "getMetalHistoryFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => getMetalHistoryFn.__executeServer(opts));
var getMetalHistoryFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ metal: enumType(["gold", "silver"]) }).parse(data)).handler(getMetalHistoryFn_createServerFn_handler, async ({ data }) => {
	const { getMetalHistory } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return getMetalHistory(data.metal);
});
var calculatePortfolioValuationFn_createServerFn_handler = createServerRpc({
	id: "de7c35356207661962f7c476e42377ba7a7074a9d7e9d5b2f4ac13833c457d4a",
	name: "calculatePortfolioValuationFn",
	filename: "src/lib/market-data.functions.ts"
}, (opts) => calculatePortfolioValuationFn.__executeServer(opts));
var calculatePortfolioValuationFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({ assets: arrayType(objectType({
	id: stringType(),
	kind: enumType([
		"stock",
		"gold",
		"silver",
		"real_estate"
	]),
	name: stringType(),
	symbol: stringType().nullable(),
	currency: stringType(),
	quantity: numberType(),
	unit_cost: numberType(),
	purity: stringType().nullable().optional()
})) }).parse(data)).handler(calculatePortfolioValuationFn_createServerFn_handler, async ({ data }) => {
	const { calculateLivePortfolioValuation } = await import("./alpha-vantage.server-C_RaE_5c.mjs");
	return calculateLivePortfolioValuation(data.assets);
});
//#endregion
export { calculatePortfolioValuationFn_createServerFn_handler, getGoldPriceFn_createServerFn_handler, getMetalHistoryFn_createServerFn_handler, getSilverPriceFn_createServerFn_handler, getStockHistoryFn_createServerFn_handler, getStockOverviewFn_createServerFn_handler, getStockQuoteFn_createServerFn_handler, searchStocksFn_createServerFn_handler };
