//#region node_modules/.nitro/vite/services/ssr/assets/alpha-vantage.server-C_RaE_5c.js
/**
* Alpha Vantage Server Service for Wazen.
*
* Runs strictly on the server backend. Never imported into client bundles.
* All requests to Alpha Vantage are made server-to-server.
* Credentials exist only in server environment variables.
*/
var TROY_OUNCE_TO_GRAMS = 31.1034768;
var cache = /* @__PURE__ */ new Map();
function getFromCache(key) {
	const entry = cache.get(key);
	if (!entry) return null;
	if (Date.now() <= entry.expiresAt) return {
		data: entry.data,
		isStale: false
	};
	return {
		data: entry.data,
		isStale: true
	};
}
function setToCache(key, data, ttlMs) {
	const now = Date.now();
	cache.set(key, {
		data,
		timestamp: now,
		expiresAt: now + ttlMs
	});
}
function getApiKey() {
	const key = process.env["ALPHA_VANTAGE_API_KEY"];
	if (!key || key.trim().length === 0) return null;
	return key.trim();
}
var BASE_URL = "https://www.alphavantage.co/query";
async function fetchAlphaVantage(params) {
	const apiKey = getApiKey();
	if (!apiKey) return {
		success: false,
		error: "NO_API_KEY",
		message: "Alpha Vantage API key is not configured on the server. Set ALPHA_VANTAGE_API_KEY in server environment."
	};
	const query = new URLSearchParams({
		...params,
		apikey: apiKey
	});
	try {
		const res = await fetch(`${BASE_URL}?${query.toString()}`, { headers: {
			Accept: "application/json",
			"User-Agent": "Wazen-Finance-App/1.0"
		} });
		if (!res.ok) return {
			success: false,
			error: "NETWORK_ERROR",
			message: `Alpha Vantage returned HTTP ${res.status}`
		};
		const json = await res.json();
		if (json["Error Message"]) return {
			success: false,
			error: "INVALID_SYMBOL",
			message: String(json["Error Message"])
		};
		if (json["Note"] || typeof json["Information"] === "string" && (json["Information"].toLowerCase().includes("call frequency") || json["Information"].toLowerCase().includes("rate limit") || json["Information"].toLowerCase().includes("requests per day") || json["Information"].toLowerCase().includes("sparingly") || json["Information"].toLowerCase().includes("premium"))) return {
			success: false,
			error: "RATE_LIMITED",
			message: "Alpha Vantage free API rate limit reached (standard limit is 25 requests/day or 5 calls/minute). Please try again shortly."
		};
		return json;
	} catch (err) {
		return {
			success: false,
			error: "NETWORK_ERROR",
			message: err instanceof Error ? err.message : "Network error contacting Alpha Vantage"
		};
	}
}
/**
* 1. Search/Lookup Stocks
*/
async function searchStocks(keywords) {
	const trimmed = keywords.trim();
	if (!trimmed) return {
		success: true,
		data: []
	};
	const cacheKey = `stock_search:${trimmed.toUpperCase()}`;
	const cached = getFromCache(cacheKey);
	if (cached && !cached.isStale) return {
		success: true,
		data: cached.data
	};
	const res = await fetchAlphaVantage({
		function: "SYMBOL_SEARCH",
		keywords: trimmed
	});
	if ("success" in res && !res.success) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return res;
	}
	const results = (res["bestMatches"] || []).map((m) => ({
		symbol: m["1. symbol"] ?? "",
		name: m["2. name"] ?? "",
		type: m["3. type"] ?? "",
		region: m["4. region"] ?? "",
		currency: m["8. currency"] ?? "USD",
		matchScore: parseFloat(m["9. matchScore"] ?? "0")
	}));
	setToCache(cacheKey, results, 36e5);
	return {
		success: true,
		data: results
	};
}
/**
* 2. Latest Stock Quote
*/
async function getStockQuote(symbol) {
	const sym = symbol.trim().toUpperCase();
	if (!sym) return {
		success: false,
		error: "INVALID_SYMBOL",
		message: "Stock symbol is required"
	};
	const cacheKey = `stock_quote:${sym}`;
	const cached = getFromCache(cacheKey);
	if (cached && !cached.isStale) return {
		success: true,
		data: cached.data
	};
	const res = await fetchAlphaVantage({
		function: "GLOBAL_QUOTE",
		symbol: sym
	});
	if ("success" in res && !res.success) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return res;
	}
	const quoteData = res["Global Quote"];
	if (!quoteData || !quoteData["01. symbol"] || !quoteData["05. price"]) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return {
			success: false,
			error: "INVALID_SYMBOL",
			message: `No quote data available for symbol "${sym}"`
		};
	}
	const price = parseFloat(quoteData["05. price"] ?? "0");
	const change = parseFloat(quoteData["09. change"] ?? "0");
	const changePctStr = quoteData["10. change percent"] ?? "0%";
	const changePercent = parseFloat(changePctStr.replace("%", "")) || 0;
	const quote = {
		symbol: quoteData["01. symbol"],
		price,
		open: parseFloat(quoteData["02. open"] ?? "0"),
		high: parseFloat(quoteData["03. high"] ?? "0"),
		low: parseFloat(quoteData["04. low"] ?? "0"),
		volume: parseInt(quoteData["06. volume"] ?? "0", 10),
		latestTradingDay: quoteData["07. latest trading day"] ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		previousClose: parseFloat(quoteData["08. previous close"] ?? "0"),
		change,
		changePercent,
		changePercentFormatted: changePctStr,
		asOf: (/* @__PURE__ */ new Date()).toISOString()
	};
	setToCache(cacheKey, quote, 3e5);
	return {
		success: true,
		data: quote
	};
}
/**
* 3. Historical Stock Prices
*/
async function getStockHistory(symbol) {
	const sym = symbol.trim().toUpperCase();
	if (!sym) return {
		success: false,
		error: "INVALID_SYMBOL",
		message: "Stock symbol is required"
	};
	const cacheKey = `stock_history:${sym}`;
	const cached = getFromCache(cacheKey);
	if (cached && !cached.isStale) return {
		success: true,
		data: cached.data
	};
	const res = await fetchAlphaVantage({
		function: "TIME_SERIES_DAILY",
		symbol: sym,
		outputsize: "compact"
	});
	if ("success" in res && !res.success) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return res;
	}
	const timeSeries = res["Time Series (Daily)"];
	if (!timeSeries) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return {
			success: false,
			error: "API_ERROR",
			message: `Historical daily data unavailable for "${sym}"`
		};
	}
	const points = Object.entries(timeSeries).map(([date, values]) => ({
		date,
		open: parseFloat(values["1. open"] ?? "0"),
		high: parseFloat(values["2. high"] ?? "0"),
		low: parseFloat(values["3. low"] ?? "0"),
		close: parseFloat(values["4. close"] ?? "0"),
		volume: parseInt(values["5. volume"] ?? "0", 10)
	})).sort((a, b) => a.date.localeCompare(b.date));
	setToCache(cacheKey, points, 864e5);
	return {
		success: true,
		data: points
	};
}
/**
* 4. Stock Overview & Dividends
*/
async function getStockOverview(symbol) {
	const sym = symbol.trim().toUpperCase();
	if (!sym) return {
		success: false,
		error: "INVALID_SYMBOL",
		message: "Stock symbol is required"
	};
	const cacheKey = `stock_overview:${sym}`;
	const cached = getFromCache(cacheKey);
	if (cached && !cached.isStale) return {
		success: true,
		data: cached.data
	};
	const res = await fetchAlphaVantage({
		function: "OVERVIEW",
		symbol: sym
	});
	if ("success" in res && !res.success) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return res;
	}
	if (!res["Symbol"]) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return {
			success: false,
			error: "INVALID_SYMBOL",
			message: `No overview details found for "${sym}"`
		};
	}
	const overview = {
		symbol: String(res["Symbol"] ?? sym),
		name: String(res["Name"] ?? sym),
		description: res["Description"] ? String(res["Description"]) : void 0,
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
		weekLow52: res["52WeekLow"] ? parseFloat(String(res["52WeekLow"])) : null
	};
	setToCache(cacheKey, overview, 432e5);
	return {
		success: true,
		data: overview
	};
}
/**
* 5. Gold Spot Price (XAU) & Gram Calculations
*/
async function getGoldSpot(toCurrency = "USD") {
	const curr = toCurrency.trim().toUpperCase() || "USD";
	const cacheKey = `metal_spot:XAU:${curr}`;
	const cached = getFromCache(cacheKey);
	if (cached && !cached.isStale) return {
		success: true,
		data: cached.data
	};
	let pricePerOunce = 0;
	let asOf = (/* @__PURE__ */ new Date()).toISOString();
	const spotRes = await fetchAlphaVantage({
		function: "GOLD_SILVER_SPOT",
		symbol: "GOLD"
	});
	if (!("success" in spotRes && !spotRes.success)) {
		if (typeof spotRes["price"] === "string" || typeof spotRes["price"] === "number") {
			pricePerOunce = parseFloat(String(spotRes["price"]));
			if (typeof spotRes["timestamp"] === "string") asOf = String(spotRes["timestamp"]);
		}
	}
	if (pricePerOunce <= 0) {
		const res = await fetchAlphaVantage({
			function: "CURRENCY_EXCHANGE_RATE",
			from_currency: "XAU",
			to_currency: curr
		});
		if (!("success" in res && !res.success)) {
			const rateData = res["Realtime Currency Exchange Rate"];
			if (rateData && rateData["5. Exchange Rate"]) {
				pricePerOunce = parseFloat(rateData["5. Exchange Rate"]);
				asOf = rateData["6. Last Refreshed"] || asOf;
			}
		}
	}
	if (pricePerOunce <= 0) {
		const goldFallback = await fetchAlphaVantage({
			function: "GOLD",
			interval: "daily"
		});
		if (!("success" in goldFallback && !goldFallback.success)) {
			const goldData = goldFallback["data"];
			if (goldData && goldData.length > 0 && goldData[0].value !== ".") {
				pricePerOunce = parseFloat(goldData[0].value);
				asOf = goldData[0].date;
			}
		}
	}
	if (pricePerOunce <= 0) {
		if (cached) return {
			success: true,
			data: {
				...cached.data,
				cached: true
			}
		};
		return {
			success: false,
			error: "API_ERROR",
			message: "Gold (XAU) spot price currently unavailable from Alpha Vantage"
		};
	}
	const pricePerGram24K = Number((pricePerOunce / TROY_OUNCE_TO_GRAMS).toFixed(4));
	const pricePerGram21K = Number((pricePerOunce / TROY_OUNCE_TO_GRAMS * (21 / 24)).toFixed(4));
	const pricePerGram18K = Number((pricePerOunce / TROY_OUNCE_TO_GRAMS * (18 / 24)).toFixed(4));
	const data = {
		metal: "gold",
		symbol: "XAU",
		currency: curr,
		pricePerTroyOunce: Number(pricePerOunce.toFixed(2)),
		pricePerGram24K,
		pricePerGram21K,
		pricePerGram18K,
		asOf
	};
	setToCache(cacheKey, data, 3e5);
	return {
		success: true,
		data
	};
}
/**
* 6. Silver Spot Price (XAG) & Gram Calculations
*/
async function getSilverSpot(toCurrency = "USD") {
	const curr = toCurrency.trim().toUpperCase() || "USD";
	const cacheKey = `metal_spot:XAG:${curr}`;
	const cached = getFromCache(cacheKey);
	if (cached && !cached.isStale) return {
		success: true,
		data: cached.data
	};
	let pricePerOunce = 0;
	let asOf = (/* @__PURE__ */ new Date()).toISOString();
	const spotRes = await fetchAlphaVantage({
		function: "GOLD_SILVER_SPOT",
		symbol: "SILVER"
	});
	if (!("success" in spotRes && !spotRes.success)) {
		if (typeof spotRes["price"] === "string" || typeof spotRes["price"] === "number") {
			pricePerOunce = parseFloat(String(spotRes["price"]));
			if (typeof spotRes["timestamp"] === "string") asOf = String(spotRes["timestamp"]);
		}
	}
	if (pricePerOunce <= 0) {
		const res = await fetchAlphaVantage({
			function: "CURRENCY_EXCHANGE_RATE",
			from_currency: "XAG",
			to_currency: curr
		});
		if (!("success" in res && !res.success)) {
			const rateData = res["Realtime Currency Exchange Rate"];
			if (rateData && rateData["5. Exchange Rate"]) {
				pricePerOunce = parseFloat(rateData["5. Exchange Rate"]);
				asOf = rateData["6. Last Refreshed"] || asOf;
			}
		}
	}
	if (pricePerOunce <= 0) {
		if (cached) return {
			success: true,
			data: {
				...cached.data,
				cached: true
			}
		};
		return {
			success: false,
			error: "API_ERROR",
			message: "Silver (XAG) spot price currently unavailable from Alpha Vantage"
		};
	}
	const pricePerGram24K = Number((pricePerOunce / TROY_OUNCE_TO_GRAMS).toFixed(4));
	const data = {
		metal: "silver",
		symbol: "XAG",
		currency: curr,
		pricePerTroyOunce: Number(pricePerOunce.toFixed(2)),
		pricePerGram24K,
		asOf
	};
	setToCache(cacheKey, data, 3e5);
	return {
		success: true,
		data
	};
}
/**
* 7. Historical Metal Prices (Gold or Silver)
*/
async function getMetalHistory(metal) {
	const cacheKey = `metal_history:${metal}`;
	const cached = getFromCache(cacheKey);
	if (cached && !cached.isStale) return {
		success: true,
		data: cached.data
	};
	const res = await fetchAlphaVantage({
		function: metal.toUpperCase(),
		interval: "daily"
	});
	if ("success" in res && !res.success) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return res;
	}
	const dataArr = res["data"];
	if (!dataArr || !Array.isArray(dataArr)) {
		if (cached) return {
			success: true,
			data: cached.data
		};
		return {
			success: false,
			error: "API_ERROR",
			message: `Historical daily data unavailable for ${metal}`
		};
	}
	const points = dataArr.filter((d) => d.value !== ".").slice(0, 90).map((d) => {
		const pricePerTroyOunce = parseFloat(d.value);
		return {
			date: d.date,
			pricePerTroyOunce,
			pricePerGram: Number((pricePerTroyOunce / TROY_OUNCE_TO_GRAMS).toFixed(4))
		};
	}).sort((a, b) => a.date.localeCompare(b.date));
	setToCache(cacheKey, points, 864e5);
	return {
		success: true,
		data: points
	};
}
/**
* 8. Live Portfolio Valuation with Profit/Loss calculation
*
* Keeps original purchase information (unit_cost, quantity) separate
* and computes current live market value from Alpha Vantage data.
*/
async function calculateLivePortfolioValuation(assets) {
	const results = [];
	let goldRate = null;
	let silverRate = null;
	const hasGold = assets.some((a) => a.kind === "gold");
	const hasSilver = assets.some((a) => a.kind === "silver");
	if (hasGold) {
		const goldRes = await getGoldSpot("USD");
		if ("success" in goldRes && goldRes.success) goldRate = goldRes.data;
	}
	if (hasSilver) {
		const silverRes = await getSilverSpot("USD");
		if ("success" in silverRes && silverRes.success) silverRate = silverRes.data;
	}
	for (const asset of assets) {
		const costBasis = asset.quantity * asset.unit_cost;
		if (asset.kind === "stock" && asset.symbol) {
			const quoteRes = await getStockQuote(asset.symbol);
			if ("success" in quoteRes && quoteRes.success) {
				const livePrice = quoteRes.data.price;
				const liveMarketValue = asset.quantity * livePrice;
				const gain = liveMarketValue - costBasis;
				const gainPercent = costBasis > 0 ? gain / costBasis * 100 : 0;
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
					notes: `${asset.symbol} quote @ $${livePrice}`
				});
				continue;
			}
		}
		if (asset.kind === "gold" && goldRate) {
			let gramPrice = goldRate.pricePerGram24K;
			if (asset.purity === "21K") gramPrice = goldRate.pricePerGram21K ?? gramPrice * (21 / 24);
			else if (asset.purity === "18K") gramPrice = goldRate.pricePerGram18K ?? gramPrice * (18 / 24);
			else if (asset.purity === "22K") gramPrice = Number((gramPrice * (22 / 24)).toFixed(4));
			const liveMarketValue = asset.quantity * gramPrice;
			const gain = liveMarketValue - costBasis;
			const gainPercent = costBasis > 0 ? gain / costBasis * 100 : 0;
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
				notes: `Gold ${asset.purity || "24K"} @ $${gramPrice}/g`
			});
			continue;
		}
		if (asset.kind === "silver" && silverRate) {
			const gramPrice = silverRate.pricePerGram24K;
			const liveMarketValue = asset.quantity * gramPrice;
			const gain = liveMarketValue - costBasis;
			const gainPercent = costBasis > 0 ? gain / costBasis * 100 : 0;
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
				notes: `Silver @ $${gramPrice}/g`
			});
			continue;
		}
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
			priceAvailable: false
		});
	}
	return results;
}
//#endregion
export { calculateLivePortfolioValuation, getGoldSpot, getMetalHistory, getSilverSpot, getStockHistory, getStockOverview, getStockQuote, searchStocks };
