import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { a as objectType, i as numberType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/currency.functions-D0L8T4hY.js
/**
* Wazen Currency Server Functions (RPC Gateway).
*
* Bridge between client UI and Frankfurter backend service.
* Runs exclusively on the server.
*/
var getRateFn_createServerFn_handler = createServerRpc({
	id: "20779578d0ff149d35bfb5cde7d70d256d0d266769c7e2b6eb0020b3c3d3f5ee",
	name: "getRateFn",
	filename: "src/lib/currency.functions.ts"
}, (opts) => getRateFn.__executeServer(opts));
var getRateFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({
	base: stringType().min(1),
	quote: stringType().min(1),
	date: stringType().nullable().optional()
}).parse(data)).handler(getRateFn_createServerFn_handler, async ({ data }) => {
	const { getRate } = await import("./frankfurter.server-BXedSet1.mjs");
	return getRate(data.base, data.quote, data.date);
});
var getRatesFn_createServerFn_handler = createServerRpc({
	id: "656a6b49e4600a642c6844b4bf78d200e8a6560231903b4898f9ce6a68c9d16f",
	name: "getRatesFn",
	filename: "src/lib/currency.functions.ts"
}, (opts) => getRatesFn.__executeServer(opts));
var getRatesFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({
	base: stringType().default("KWD"),
	quotes: arrayType(stringType()).optional(),
	date: stringType().nullable().optional()
}).parse(data)).handler(getRatesFn_createServerFn_handler, async ({ data }) => {
	const { getRates } = await import("./frankfurter.server-BXedSet1.mjs");
	return getRates(data.base, data.quotes, data.date);
});
var convertCurrencyFn_createServerFn_handler = createServerRpc({
	id: "2627f10cf918c235a1e2e2fd2998e56f98f6ca7c7543a21c42db12b393346994",
	name: "convertCurrencyFn",
	filename: "src/lib/currency.functions.ts"
}, (opts) => convertCurrencyFn.__executeServer(opts));
var convertCurrencyFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	amount: numberType(),
	from: stringType().min(1),
	to: stringType().default("KWD"),
	date: stringType().nullable().optional()
}).parse(data)).handler(convertCurrencyFn_createServerFn_handler, async ({ data }) => {
	const { convertCurrency } = await import("./frankfurter.server-BXedSet1.mjs");
	return convertCurrency(data.amount, data.from, data.to, data.date);
});
//#endregion
export { convertCurrencyFn_createServerFn_handler, getRateFn_createServerFn_handler, getRatesFn_createServerFn_handler };
