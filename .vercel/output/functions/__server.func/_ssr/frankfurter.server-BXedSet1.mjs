//#region node_modules/.nitro/vite/services/ssr/assets/frankfurter.server-BXedSet1.js
/**
* Frankfurter Currency Service for Wazen.
*
* Runs strictly on the server backend. Never imported into client bundles.
* All requests to Frankfurter are made server-to-server.
* No API key is required.
* Official API: https://api.frankfurter.dev/v2
*/
var FRANKFURTER_BASE_URL = "https://api.frankfurter.dev/v2";
var cache = /* @__PURE__ */ new Map();
function getFromCache(key) {
	const entry = cache.get(key);
	if (!entry) return null;
	if (Date.now() > entry.expiresAt) {
		cache.delete(key);
		return null;
	}
	return entry.data;
}
function setToCache(key, data, ttlMs) {
	cache.set(key, {
		data,
		expiresAt: Date.now() + ttlMs
	});
}
var LATEST_TTL_MS = 36e5;
var HISTORICAL_TTL_MS = 6048e5;
function sanitizeDate(dateStr) {
	if (!dateStr) return null;
	const trimmed = dateStr.slice(0, 10);
	if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
	return null;
}
/**
* 1. Fetch rate for a single currency pair (e.g. USD -> KWD, KWD -> USD)
* Supports optional historical date (YYYY-MM-DD).
*/
async function getRate(base, quote, date) {
	const b = base.trim().toUpperCase();
	const q = quote.trim().toUpperCase();
	const validDate = sanitizeDate(date);
	if (!b || !q) return {
		success: false,
		error: "INVALID_CURRENCY",
		message: "Base and quote currency codes are required."
	};
	if (b === q) return {
		success: true,
		base: b,
		quote: q,
		rate: 1,
		date: validDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	};
	const cacheKey = `fx_rate:${b}:${q}:${validDate || "latest"}`;
	const cached = getFromCache(cacheKey);
	if (cached) return {
		...cached,
		cached: true
	};
	const queryParams = new URLSearchParams();
	if (validDate) queryParams.set("date", validDate);
	const url = `${FRANKFURTER_BASE_URL}/rate/${encodeURIComponent(b)}/${encodeURIComponent(q)}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	try {
		const res = await fetch(url, { headers: {
			Accept: "application/json",
			"User-Agent": "Wazen-Finance-App/1.0"
		} });
		if (!res.ok) {
			const errBody = await res.json().catch(() => ({}));
			const status = res.status;
			if (status === 422) return {
				success: false,
				error: errBody.message?.includes("date") ? "INVALID_DATE" : "INVALID_CURRENCY",
				message: errBody.message || "Invalid currency or date provided."
			};
			return {
				success: false,
				error: "RATE_UNAVAILABLE",
				message: errBody.message || `Rate unavailable (HTTP ${status}).`
			};
		}
		const data = await res.json();
		const result = {
			success: true,
			base: data.base,
			quote: data.quote,
			rate: data.rate,
			date: data.date
		};
		setToCache(cacheKey, result, validDate ? HISTORICAL_TTL_MS : LATEST_TTL_MS);
		return result;
	} catch (err) {
		return {
			success: false,
			error: "NETWORK_ERROR",
			message: err instanceof Error ? err.message : "Network error contacting Frankfurter API."
		};
	}
}
/**
* 2. Fetch bulk exchange rates for a base currency against multiple quotes.
*/
async function getRates(base = "KWD", quotes, date) {
	const b = base.trim().toUpperCase() || "KWD";
	const validDate = sanitizeDate(date);
	const qList = quotes && quotes.length > 0 ? quotes.map((q) => q.trim().toUpperCase()) : void 0;
	const cacheKey = `fx_bulk:${b}:${qList ? qList.sort().join(",") : "all"}:${validDate || "latest"}`;
	const cached = getFromCache(cacheKey);
	if (cached) return {
		...cached,
		cached: true
	};
	const queryParams = new URLSearchParams({ base: b });
	if (qList && qList.length > 0) queryParams.set("quotes", qList.join(","));
	if (validDate) queryParams.set("date", validDate);
	const url = `${FRANKFURTER_BASE_URL}/rates?${queryParams.toString()}`;
	try {
		const res = await fetch(url, { headers: {
			Accept: "application/json",
			"User-Agent": "Wazen-Finance-App/1.0"
		} });
		if (!res.ok) return {
			success: false,
			error: "RATE_UNAVAILABLE",
			message: (await res.json().catch(() => ({}))).message || `Exchange rates unavailable (HTTP ${res.status}).`
		};
		const rows = await res.json();
		const rateMap = { [b]: 1 };
		let latestDate = validDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		for (const row of rows) {
			rateMap[row.quote] = row.rate;
			if (row.date) latestDate = row.date;
		}
		const result = {
			success: true,
			base: b,
			date: latestDate,
			rates: rateMap
		};
		setToCache(cacheKey, result, validDate ? HISTORICAL_TTL_MS : LATEST_TTL_MS);
		return result;
	} catch (err) {
		return {
			success: false,
			error: "NETWORK_ERROR",
			message: err instanceof Error ? err.message : "Network error contacting Frankfurter API."
		};
	}
}
/**
* 3. Currency conversion helper
* Converts `amount` from `fromCurrency` to `toCurrency` (default KWD).
* If date is given, uses the historical exchange rate on that date.
*/
async function convertCurrency(amount, fromCurrency, toCurrency = "KWD", date) {
	const numAmount = Number(amount) || 0;
	const from = fromCurrency.trim().toUpperCase();
	const to = toCurrency.trim().toUpperCase() || "KWD";
	const validDate = sanitizeDate(date);
	if (from === to) return {
		success: true,
		original_amount: numAmount,
		original_currency: from,
		converted_amount: numAmount,
		target_currency: to,
		exchange_rate: 1,
		rate_date: validDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	};
	const rateRes = await getRate(from, to, validDate);
	if (!rateRes.success) return rateRes;
	const exchangeRate = rateRes.rate;
	return {
		success: true,
		original_amount: numAmount,
		original_currency: from,
		converted_amount: Number((numAmount * exchangeRate).toFixed(3)),
		target_currency: to,
		exchange_rate: exchangeRate,
		rate_date: rateRes.date,
		cached: rateRes.cached
	};
}
//#endregion
export { convertCurrency, getRate, getRates };
