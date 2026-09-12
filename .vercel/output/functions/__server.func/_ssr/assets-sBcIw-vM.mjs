import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { a as objectType, i as numberType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, c as formatMoney, n as Button, s as formatDate } from "./button-vAj4SDK8.mjs";
import { $ as StocksIcon, C as GOLD_PURITIES, Et as gainPercentOf, F as MetalsIcon, Gt as useDeleteAsset, Ht as useAssets, Mt as marketValue, Nt as portfolioSeries, O as HOLDING_PURPOSES, P as LossIcon, Pt as portfolioTotals, Q as SpinnerIcon, Qt as useSaveAsset, R as PortfolioIcon, Tt as gainOf, V as PropertyIcon, Vt as useAssetValuations, _ as EditIcon, bt as createSsrRpc, h as DeleteIcon, k as ICON_STROKE, mt as canOwnAssets, n as ASSET_KINDS, r as AddIcon, s as AppShell, sn as valuationsFor, ut as annualRentOf, vt as costBasis, w as GainIcon, zt as unitOf } from "./AppShell-cdoNFpBj.mjs";
import { i as EmptyState, l as StatCard, r as DisclosurePanel, s as Panel } from "./primitives-CO_AoPcR.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CU7WH-S6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as XAxis, l as ResponsiveContainer, n as LineChart, o as Line, r as YAxis, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets-sBcIw-vM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
createServerFn({ method: "GET" }).inputValidator((data) => objectType({ keywords: stringType().min(1) }).parse(data)).handler(createSsrRpc("57780b7df85c06ad6d420b160d5031ff0b4236363401abea91e62bb6dabb8758"));
/**
* 2. Real-time / Latest Stock Quote
*/
var getStockQuoteFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ symbol: stringType().min(1) }).parse(data)).handler(createSsrRpc("32360425227d72510f59ed785c4fa3b24e11307ca313d45c6cdd02f1afb47120"));
createServerFn({ method: "GET" }).inputValidator((data) => objectType({ symbol: stringType().min(1) }).parse(data)).handler(createSsrRpc("1198b15cbd8d2a1ecfbcb1e0b5f0f79ef1390255c5c9e73ea2c2d6c7277957ba"));
createServerFn({ method: "GET" }).inputValidator((data) => objectType({ symbol: stringType().min(1) }).parse(data)).handler(createSsrRpc("052c42861bbe1de2174e807917d7beb21b4bae09411a8f0e91636da0e71214d0"));
/**
* 5. Gold (XAU) Spot Price & Gram Rates
*/
var getGoldPriceFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ currency: stringType().optional() }).optional().parse(data)).handler(createSsrRpc("cb0a6b652d4d978421329994b9e02bda2340ca471681034f26034b742deb5a0e"));
/**
* 6. Silver (XAG) Spot Price & Gram Rates
*/
var getSilverPriceFn = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ currency: stringType().optional() }).optional().parse(data)).handler(createSsrRpc("be3103a4abf0690020c28a0ceec89a072c607739918964dd837527ce9b7a47d7"));
createServerFn({ method: "GET" }).inputValidator((data) => objectType({ metal: enumType(["gold", "silver"]) }).parse(data)).handler(createSsrRpc("7aae837a8dc2d8ae8fd19c5d22fa19c8d087ca4532c31791e3a612358fb8bffd"));
/**
* 8. Live Portfolio Valuation with P/L
* Computes valuation against live Alpha Vantage rates while leaving original purchase records intact.
*/
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
})) }).parse(data)).handler(createSsrRpc("de7c35356207661962f7c476e42377ba7a7074a9d7e9d5b2f4ac13833c457d4a"));
var inputClass = "wazen-field";
var KIND_LABEL_KEY = {
	stock: "kindStock",
	gold: "kindGold",
	silver: "kindSilver",
	real_estate: "kindRealEstate"
};
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function AssetFormDialog({ open, onClose, asset, currency }) {
	const { t } = useWazenLocale();
	const save = useSaveAsset();
	const [kind, setKind] = (0, import_react.useState)("stock");
	const [name, setName] = (0, import_react.useState)("");
	const [symbol, setSymbol] = (0, import_react.useState)("");
	const [purchaseDate, setPurchaseDate] = (0, import_react.useState)(today);
	const [quantity, setQuantity] = (0, import_react.useState)("1");
	const [unitCost, setUnitCost] = (0, import_react.useState)("");
	const [currentValue, setCurrentValue] = (0, import_react.useState)("");
	const [purity, setPurity] = (0, import_react.useState)("");
	const [propertyType, setPropertyType] = (0, import_react.useState)("");
	const [monthlyRent, setMonthlyRent] = (0, import_react.useState)("0");
	const [holdingPurpose, setHoldingPurpose] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setKind(asset?.kind ?? "stock");
		setName(asset?.name ?? "");
		setSymbol(asset?.symbol ?? "");
		setPurchaseDate(asset?.purchase_date ?? today());
		setQuantity(asset ? String(Number(asset.quantity)) : "1");
		setUnitCost(asset ? String(Number(asset.unit_cost)) : "");
		setCurrentValue(asset ? String(Number(asset.current_unit_value)) : "");
		setPurity(asset?.purity ?? "");
		setPropertyType(asset?.property_type ?? "");
		setMonthlyRent(asset ? String(Number(asset.monthly_rent)) : "0");
		setHoldingPurpose(asset?.holding_purpose ?? "");
		setNotes(asset?.notes ?? "");
	}, [open, asset]);
	const unit = unitOf(kind);
	const isProperty = unit === "property";
	const isMetal = unit === "grams";
	const [fetchingPrice, setFetchingPrice] = (0, import_react.useState)(false);
	async function fetchLiveMarketPrice() {
		if (kind === "stock") {
			if (!symbol.trim()) {
				toast.error("Please enter a stock symbol first (e.g. AAPL, IBM)");
				return;
			}
			setFetchingPrice(true);
			try {
				const res = await getStockQuoteFn({ data: { symbol: symbol.trim() } });
				if (!res.success) toast.error(res.message);
				else {
					setCurrentValue(String(res.data.price));
					if (!name.trim()) setName(res.data.symbol);
					toast.success(`${res.data.symbol}: $${res.data.price} (${res.data.changePercentFormatted})`);
				}
			} catch (err) {
				toast.error(err instanceof Error ? err.message : "Failed to fetch stock quote");
			} finally {
				setFetchingPrice(false);
			}
		} else if (kind === "gold") {
			setFetchingPrice(true);
			try {
				const res = await getGoldPriceFn({ data: { currency: "USD" } });
				if (!res.success) toast.error(res.message);
				else {
					let gramPrice = res.data.pricePerGram24K;
					if (purity === "21K" && res.data.pricePerGram21K) gramPrice = res.data.pricePerGram21K;
					else if (purity === "18K" && res.data.pricePerGram18K) gramPrice = res.data.pricePerGram18K;
					else if (purity === "22K") gramPrice = Number((gramPrice * (22 / 24)).toFixed(4));
					setCurrentValue(String(gramPrice));
					toast.success(`Gold ${purity || "24K"}: $${gramPrice}/g`);
				}
			} catch (err) {
				toast.error(err instanceof Error ? err.message : "Failed to fetch gold price");
			} finally {
				setFetchingPrice(false);
			}
		} else if (kind === "silver") {
			setFetchingPrice(true);
			try {
				const res = await getSilverPriceFn({ data: { currency: "USD" } });
				if (!res.success) toast.error(res.message);
				else {
					const gramPrice = res.data.pricePerGram24K;
					setCurrentValue(String(gramPrice));
					toast.success(`Silver: $${gramPrice}/g`);
				}
			} catch (err) {
				toast.error(err instanceof Error ? err.message : "Failed to fetch silver price");
			} finally {
				setFetchingPrice(false);
			}
		}
	}
	async function submit() {
		const qty = isProperty ? 1 : Number(quantity);
		const cost = Number(unitCost);
		const current = Number(currentValue);
		if (name.trim().length < 2) {
			toast.error(t("assetName"));
			return;
		}
		if (!Number.isFinite(qty) || qty <= 0) {
			toast.error(isMetal ? t("quantityGrams") : t("quantityShares"));
			return;
		}
		if (!Number.isFinite(cost) || cost < 0 || !Number.isFinite(current) || current < 0) {
			toast.error(t("unitCostProperty"));
			return;
		}
		const input = {
			kind,
			name: name.trim(),
			symbol: symbol.trim() || null,
			currency,
			purchase_date: purchaseDate,
			quantity: qty,
			unit_cost: cost,
			current_unit_value: current,
			purity: isMetal ? purity.trim() || null : null,
			property_type: isProperty ? propertyType.trim() || null : null,
			monthly_rent: isProperty ? Math.max(Number(monthlyRent) || 0, 0) : 0,
			holding_purpose: holdingPurpose || null,
			notes: notes.trim() || null
		};
		try {
			await save.mutateAsync({
				id: asset?.id,
				input
			});
			toast.success(t("assetSaved"));
			onClose();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next ? onClose() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[85vh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: asset ? t("editAsset") : t("addAsset") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("notSpendable") })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("assetKind"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass,
								value: kind,
								onChange: (e) => setKind(e.target.value),
								children: ASSET_KINDS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option,
									children: t(KIND_LABEL_KEY[option])
								}, option))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("assetName"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: name,
								onChange: (e) => setName(e.target.value)
							})
						}),
						kind === "stock" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("assetSymbol"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: symbol,
								onChange: (e) => setSymbol(e.target.value)
							})
						}) : null,
						isProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("propertyType"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: propertyType,
								onChange: (e) => setPropertyType(e.target.value)
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: isMetal ? t("quantityGrams") : t("quantityShares"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "number",
								min: "0",
								step: "0.0001",
								value: quantity,
								onChange: (e) => setQuantity(e.target.value)
							})
						}),
						isMetal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("purity"),
							children: kind === "gold" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass,
								value: purity || "24K",
								onChange: (e) => setPurity(e.target.value),
								children: GOLD_PURITIES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option,
									children: option
								}, option))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: purity,
								onChange: (e) => setPurity(e.target.value),
								placeholder: "999"
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("holdingPurpose"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass,
								value: holdingPurpose,
								onChange: (e) => setHoldingPurpose(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "—"
								}), HOLDING_PURPOSES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option,
									children: t(`purpose_${option}`)
								}, option))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("purchaseDate"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "date",
								value: purchaseDate,
								onChange: (e) => setPurchaseDate(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `${isProperty ? t("unitCostProperty") : isMetal ? t("unitCostGram") : t("unitCostShare")} (${currency})`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "number",
								min: "0",
								step: "0.001",
								value: unitCost,
								onChange: (e) => setUnitCost(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `${isProperty ? t("currentValueProperty") : isMetal ? t("currentValueGram") : t("currentValueShare")} (${currency})`,
							action: kind === "stock" || kind === "gold" || kind === "silver" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: fetchLiveMarketPrice,
								disabled: fetchingPrice,
								className: "text-xs text-primary hover:underline inline-flex items-center gap-1 font-medium cursor-pointer",
								children: [fetchingPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-3 animate-spin" }) : null, kind === "stock" ? "Fetch live quote" : "Fetch spot price"]
							}) : null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "number",
								min: "0",
								step: "0.001",
								value: currentValue,
								onChange: (e) => setCurrentValue(e.target.value)
							})
						}),
						isProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `${t("monthlyRent")} (${currency})`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "number",
								min: "0",
								step: "0.001",
								value: monthlyRent,
								onChange: (e) => setMonthlyRent(e.target.value)
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("notesField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: notes,
								onChange: (e) => setNotes(e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: submit,
						disabled: save.isPending,
						children: [save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("save")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onClose,
						variant: "outline",
						children: t("cancel")
					})]
				})
			]
		})
	});
}
function Field({ label, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "wazen-label",
				children: label
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		})]
	});
}
/**
* Live portfolio valuation computing current market values and P/L
* against live Alpha Vantage rates while preserving purchase cost basis.
*/
function useLivePortfolioValuation(assets) {
	const activeAssets = assets.filter((a) => a.kind === "stock" || a.kind === "gold" || a.kind === "silver");
	return useQuery({
		queryKey: ["live-portfolio-valuation", activeAssets.map((a) => `${a.id}:${a.symbol}:${a.quantity}:${a.unit_cost}:${a.purity}`).join(",")],
		enabled: activeAssets.length > 0,
		staleTime: 3e5,
		queryFn: async () => {
			return calculatePortfolioValuationFn({ data: { assets: activeAssets.map((a) => ({
				id: a.id,
				kind: a.kind,
				name: a.name,
				symbol: a.symbol,
				currency: a.currency,
				quantity: Number(a.quantity),
				unit_cost: Number(a.unit_cost),
				purity: a.purity
			})) } });
		}
	});
}
var KIND_ORDER = [
	"stock",
	"gold",
	"silver",
	"real_estate"
];
var KIND_META = {
	stock: {
		key: "kindStock",
		icon: StocksIcon
	},
	gold: {
		key: "kindGold",
		icon: MetalsIcon
	},
	silver: {
		key: "kindSilver",
		icon: MetalsIcon
	},
	real_estate: {
		key: "kindRealEstate",
		icon: PropertyIcon
	}
};
function AssetsPage() {
	const { t, locale } = useWazenLocale();
	const { data: profile, isLoading: profileLoading } = useProfile();
	const assets = useAssets();
	const valuations = useAssetValuations();
	const remove = useDeleteAsset();
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const currency = profile?.base_currency ?? "KWD";
	const allowed = canOwnAssets(profile?.life_stage);
	const rows = assets.data ?? [];
	const history = valuations.data ?? [];
	const liveValuation = useLivePortfolioValuation(rows);
	const liveMap = /* @__PURE__ */ new Map();
	for (const item of liveValuation.data ?? []) liveMap.set(item.id, item);
	const totals = portfolioTotals(rows, liveValuation.data);
	if (profileLoading || assets.isLoading || valuations.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[40vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" })
	}) });
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: t("assets"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("assetsNotAvailable"),
			description: t("assetsSubtitle")
		})
	}) });
	const series = portfolioSeries(rows, history).map((point) => ({
		label: new Intl.DateTimeFormat(locale, {
			month: "short",
			year: "2-digit"
		}).format(/* @__PURE__ */ new Date(`${point.date}T00:00:00`)),
		value: Number(point.value.toFixed(3))
	}));
	async function onRemove(asset) {
		if (!window.confirm(t("confirmRemoveAsset"))) return;
		try {
			await remove.mutateAsync(asset.id);
			toast.success(t("assetRemoved"));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 wazen-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "wazen-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wazen-label",
						children: t("portfolio")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-3xl sm:text-4xl",
						children: t("assets")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: t("assetsSubtitle")
					}),
					rows.some((a) => a.kind === "stock" || a.kind === "gold" || a.kind === "silver") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						children: liveValuation.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-3 animate-spin text-muted-foreground" }), t("updatingMarketRates")]
						}) : liveValuation.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-muted-foreground/60" }), t("liveRatesUnavailable")]
						}) : totals.hasLiveValuation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-chart-2/30 bg-chart-2/10 px-2.5 py-1 text-xs font-medium text-chart-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-chart-2 animate-pulse" }), t("liveValuationActive")]
						}) : null
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								setEditing(null);
								setDialogOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							}), t("addAsset")]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("totalAssetValue"),
						amount: totals.value,
						currency,
						hint: totals.hasLiveValuation ? t("liveMarketValue") : t("notSpendable"),
						className: "min-[420px]:col-span-2 lg:col-span-1",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("investedAmount"),
						amount: totals.cost,
						currency
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("unrealisedGain"),
						amount: totals.gain,
						currency,
						tone: totals.gain >= 0 ? "positive" : "negative",
						hint: `${totals.gainPercent.toFixed(1)}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("annualRentalIncome"),
						amount: totals.annualRentalIncome,
						currency,
						tone: "gold"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: t("portfolioTrend"),
				children: series.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioIcon, {
						className: "size-5",
						strokeWidth: ICON_STROKE
					}),
					title: t("noAssets"),
					description: t("noAssetsDescription")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-52 w-full min-w-0 sm:h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: series,
							margin: {
								top: 8,
								right: 8,
								left: 8,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									tickLine: false,
									axisLine: false,
									fontSize: 10,
									interval: "preserveStartEnd",
									minTickGap: 24
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									formatter: (value) => formatMoney(Number(value), currency),
									contentStyle: {
										borderRadius: "0.75rem",
										border: "1px solid var(--border)",
										background: "var(--card)",
										color: "var(--card-foreground)",
										fontSize: "0.8rem"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "value",
									stroke: "var(--chart-1)",
									strokeWidth: 2,
									dot: false
								})
							]
						})
					})
				})
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: t("assets"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioIcon, {
						className: "size-5",
						strokeWidth: ICON_STROKE
					}),
					title: t("noAssets"),
					description: t("noAssetsDescription")
				})
			}) : KIND_ORDER.filter((kind) => rows.some((asset) => asset.kind === kind)).map((kind) => {
				const meta = KIND_META[kind];
				const Icon = meta.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: t(meta.key),
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5 text-muted-foreground",
						strokeWidth: ICON_STROKE
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-4",
						children: rows.filter((asset) => asset.kind === kind).map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetRow, {
							asset,
							history: valuationsFor(history, asset.id),
							live: liveMap.get(asset.id),
							isLiveLoading: liveValuation.isLoading,
							onEdit: () => {
								setEditing(asset);
								setDialogOpen(true);
							},
							onRemove: () => onRemove(asset)
						}, asset.id))
					})
				}, kind);
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetFormDialog, {
		open: dialogOpen,
		asset: editing,
		currency,
		onClose: () => {
			setDialogOpen(false);
			setEditing(null);
		}
	})] });
}
function AssetRow({ asset, history, live, isLiveLoading, onEdit, onRemove }) {
	const { t } = useWazenLocale();
	const unit = unitOf(asset.kind);
	const isMarketKind = asset.kind === "stock" || asset.kind === "gold" || asset.kind === "silver";
	const isLive = Boolean(live?.priceAvailable && live.liveMarketValue !== null);
	const effectiveMarketValue = isLive && live?.liveMarketValue !== null ? live.liveMarketValue : marketValue(asset);
	const effectiveCostBasis = costBasis(asset);
	const effectiveGain = isLive && live?.gain !== null ? live.gain : gainOf(asset);
	const effectiveGainPercent = isLive && live?.gainPercent !== null ? live.gainPercent : gainPercentOf(asset);
	const effectiveUnitPrice = isLive && live?.liveUnitPrice !== null ? live.liveUnitPrice : Number(asset.current_unit_value);
	const positive = effectiveGain >= 0;
	const points = history.map((row) => ({
		label: row.valued_on,
		value: Number(row.unit_value)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-2xl border border-border bg-secondary/35 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "break-words text-base flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: asset.name }),
						asset.symbol ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: asset.symbol
						}) : null,
						isLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-chart-2/30 bg-chart-2/10 px-2 py-0.5 text-[10px] font-medium text-chart-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-chart-2 animate-pulse" }), t("liveRates")]
						}) : isLiveLoading && isMarketKind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 text-[10px] text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-3 animate-spin text-muted-foreground" })
						}) : isMarketKind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground",
							children: t("recordedRate")
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						unit === "property" ? asset.property_type ?? t("kindRealEstate") : unit === "grams" ? `${Number(asset.quantity)} g${asset.purity ? ` · ${asset.purity}` : ""}` : `${Number(asset.quantity)} × ${formatMoney(Number(asset.unit_cost), asset.currency)}`,
						" · ",
						t("purchaseDate"),
						": ",
						formatDate(asset.purchase_date)
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onEdit,
					"aria-label": t("editAsset"),
					title: t("editAsset"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onRemove,
					"aria-label": t("deleteAsset"),
					title: t("deleteAsset"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DisclosurePanel, {
			title: t("valueHistory"),
			summary: formatMoney(effectiveMarketValue, asset.currency),
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							label: t("investedAmount"),
							value: formatMoney(effectiveCostBasis, asset.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							label: t("totalAssetValue"),
							value: formatMoney(effectiveMarketValue, asset.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							label: t("unrealisedGain"),
							value: `${formatMoney(effectiveGain, asset.currency)} · ${effectiveGainPercent.toFixed(1)}%`,
							tone: positive ? "positive" : "negative",
							icon: positive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GainIcon, {
								className: "size-3.5",
								strokeWidth: ICON_STROKE
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LossIcon, {
								className: "size-3.5",
								strokeWidth: ICON_STROKE
							})
						}),
						asset.kind === "real_estate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							label: t("annualRentalIncome"),
							value: formatMoney(annualRentOf(asset), asset.currency)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							label: unit === "grams" ? t("currentValueGram") : unit === "shares" ? t("currentValueShare") : t("currentValueProperty"),
							value: formatMoney(effectiveUnitPrice, asset.currency)
						})
					]
				}),
				points.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wazen-label",
						children: t("valueHistory")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-16 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: points,
								margin: {
									top: 4,
									right: 4,
									left: 4,
									bottom: 0
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									formatter: (value) => formatMoney(Number(value), asset.currency),
									labelFormatter: (label) => formatDate(String(label)),
									contentStyle: {
										borderRadius: "0.75rem",
										border: "1px solid var(--border)",
										background: "var(--card)",
										color: "var(--card-foreground)",
										fontSize: "0.75rem"
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "value",
									stroke: positive ? "var(--chart-2)" : "var(--destructive)",
									strokeWidth: 2,
									dot: false
								})]
							})
						})
					})]
				}) : null,
				live?.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground font-mono bg-secondary/50 rounded-lg px-3 py-1.5 inline-block",
					children: live.notes
				}) : null,
				asset.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: asset.notes
				}) : null
			]
		})]
	});
}
function Cell({ label, value, tone, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "wazen-label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: `wazen-number mt-1 flex min-w-0 items-center gap-1.5 break-words text-sm ${tone === "positive" ? "text-chart-2" : tone === "negative" ? "text-destructive" : ""}`,
			children: [icon, value]
		})]
	});
}
//#endregion
export { AssetsPage as component };
