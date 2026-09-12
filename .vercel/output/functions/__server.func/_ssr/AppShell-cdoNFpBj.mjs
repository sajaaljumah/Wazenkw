import { o as __toESM } from "../_runtime.mjs";
import { O as isRedirect, g as Link, l as useLocation, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { a as objectType, c as unknownType, i as numberType, n as booleanType, o as recordType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-UoWCc94R.mjs";
import { d as requireSupabaseAuth, i as PREMIUM_FEATURES, n as FREE_ENTITLEMENTS, u as hasFeature } from "./subscription-fUSurh1V.mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, T as useSignOut, a as cn, c as formatMoney, i as availableMoney, n as Button, o as firstOfMonth, r as WazenLocaleProvider, v as round, w as useSession } from "./button-vAj4SDK8.mjs";
import { $ as ArrowUpFromLine, A as Gamepad2, B as ChartPie, C as LoaderCircle, D as House, E as Landmark, F as Coins, G as CalendarDays, H as ChartColumn, I as Circle, J as BookOpen, K as Building2, M as Flag, N as FileText, O as HandCoins, P as Ellipsis, Q as ArrowUpRight, R as ChevronDown, S as Lock, T as Languages, U as ChartCandlestick, V as ChartLine, W as Camera, X as BadgeCheck, Y as Bell, Z as Award, _ as Receipt, a as Upload, c as Target, d as ShoppingBag, et as ArrowRight, f as ShieldCheck, g as RefreshCw, h as RotateCcw, i as User, j as Flame, k as GraduationCap, m as Scale, n as Wallet, nt as ArrowDownRight, o as TriangleAlert, p as Settings, q as Briefcase, r as Users, s as Trash2, tt as ArrowDownToLine, u as Sparkles, v as Plus, w as ListChecks, x as LogOut, y as Pencil, z as Check } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-cdoNFpBj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
/**
* Wazen icon system.
*
* One cohesive family of clean, minimal outline icons (Lucide) with a single
* stroke weight and a small set of sizes, so every screen shares the same
* visual language. Import icons from here — never directly from lucide-react
* in Wazen feature code.
*/
/** Shared stroke weight for every icon in the product. */
var ICON_STROKE = 1.5;
var DashboardIcon = House;
var ProfileIcon = User;
var SettingsIcon = Settings;
var NotificationsIcon = Bell;
var SignOutIcon = LogOut;
var LanguageIcon = Languages;
var IncomeIcon = ArrowDownToLine;
var ExpensesIcon = ArrowUpFromLine;
var RefundIcon = RotateCcw;
var SpendIcon = ShoppingBag;
var GiveIcon = HandCoins;
var BudgetIcon = Wallet;
var SavingsIcon = Coins;
var GoalsIcon = Target;
var EmergencyFundIcon = ShieldCheck;
var ScheduledIcon = CalendarDays;
var ReceiptIcon = Receipt;
var BankIcon = Landmark;
var ZakatIcon = Scale;
var AnalyticsIcon = ChartLine;
var CategoryChartIcon = ChartPie;
var TrendChartIcon = ChartColumn;
var PortfolioIcon = Briefcase;
var StocksIcon = ChartCandlestick;
var MetalsIcon = Coins;
var PropertyIcon = Building2;
var GainIcon = ArrowUpRight;
var LossIcon = ArrowDownRight;
var ChallengesIcon = Flag;
var LearnIcon = BookOpen;
var GameIcon = Gamepad2;
var QuizIcon = ListChecks;
var RecommendIcon = Sparkles;
var AiIcon = Sparkles;
var StreakIcon = Flame;
var RewardsIcon = Award;
var PremiumIcon = BadgeCheck;
var FreePlanIcon = Circle;
var FamilyIcon = Users;
var StudentIcon = GraduationCap;
var LockedIcon = Lock;
var CheckIcon = Check;
var AddIcon = Plus;
var ForwardIcon = ArrowRight;
var SpinnerIcon = LoaderCircle;
var EditIcon = Pencil;
var DeleteIcon = Trash2;
var DocumentIcon = FileText;
var UploadIcon = Upload;
var CameraIcon = Camera;
var AlertIcon = TriangleAlert;
var RetryIcon = RefreshCw;
var ExpandIcon = ChevronDown;
var MoreIcon = Ellipsis;
/**
* Wazen never shows family names or surnames anywhere in the interface —
* users are always displayed by their first name.
*/
function firstNameOf(name) {
	const first = name.trim().split(/\s+/)[0];
	return first && first.length > 0 ? first : name.trim();
}
/** Age is always derived from date_of_birth — never stored. */
function calculateAge(dateOfBirth) {
	const dob = typeof dateOfBirth === "string" ? new Date(dateOfBirth) : dateOfBirth;
	if (Number.isNaN(dob.getTime())) return 0;
	const today = /* @__PURE__ */ new Date();
	let age = today.getFullYear() - dob.getFullYear();
	const monthDiff = today.getMonth() - dob.getMonth();
	if (monthDiff < 0 || monthDiff === 0 && today.getDate() < dob.getDate()) age -= 1;
	return Math.max(age, 0);
}
var ADULT_LIFE_STAGES = [
	"university_student",
	"employee",
	"self_employed",
	"parent"
];
/** Children and teenagers get an age-based stage; adults choose their own. */
function lifeStageForAge(age) {
	if (age < 13) return "child";
	if (age < 18) return "teenager";
	return null;
}
function accountTypeFor(lifeStage) {
	if (lifeStage === "child" || lifeStage === "teenager") return "dependent";
	if (lifeStage === "parent") return "parent";
	return "independent";
}
function paletteFor(lifeStage) {
	switch (lifeStage) {
		case "child": return {
			plate: "var(--avatar-child-plate)",
			field: "var(--avatar-child-field)",
			accent: "var(--avatar-child-accent)"
		};
		case "teenager": return {
			plate: "var(--avatar-teen-plate)",
			field: "var(--avatar-teen-field)",
			accent: "var(--avatar-teen-accent)"
		};
		case "university_student": return {
			plate: "var(--avatar-student-plate)",
			field: "var(--avatar-student-field)",
			accent: "var(--avatar-student-accent)"
		};
		default: return {
			plate: "var(--avatar-adult-plate)",
			field: "var(--avatar-adult-field)",
			accent: "var(--avatar-adult-accent)"
		};
	}
}
/**
* A gender-neutral identity seal. The geometry changes by life stage while the
* monogram keeps each account recognizable without using cartoon portraits.
*/
function WazenAvatar({ fullName, lifeStage, avatarUrl, size = 56, className }) {
	const name = firstNameOf(fullName);
	const initial = Array.from(name.trim())[0]?.toLocaleUpperCase() ?? "W";
	const palette = paletteFor(lifeStage);
	const uid = (0, import_react.useId)().replace(/[:]/g, "");
	if (avatarUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: avatarUrl,
		alt: `${name}'s profile photo`,
		width: size,
		height: size,
		style: {
			width: size,
			height: size
		},
		className: cn("shrink-0 rounded-full border border-border object-cover", className)
	});
	const child = lifeStage === "child";
	const teen = lifeStage === "teenager";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 96 96",
		width: size,
		height: size,
		style: {
			width: size,
			height: size
		},
		role: "img",
		"aria-label": `${name}'s avatar`,
		className: cn("shrink-0 rounded-full", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `avatar-field-${uid}`,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: palette.field
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: palette.plate
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "48",
				cy: "48",
				r: "47",
				fill: `url(#avatar-field-${uid})`,
				stroke: palette.plate,
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "48",
				cy: "48",
				r: child ? 33 : teen ? 32 : 31,
				fill: "none",
				stroke: palette.accent,
				strokeWidth: "1.5",
				opacity: "0.75"
			}),
			child ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "48",
					cy: "14",
					r: "3",
					fill: palette.accent
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "82",
					cy: "48",
					r: "3",
					fill: palette.accent
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "48",
					cy: "82",
					r: "3",
					fill: palette.accent
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "14",
					cy: "48",
					r: "3",
					fill: palette.accent
				})
			] }) : teen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 69 48 21l24 48Z",
				fill: "none",
				stroke: palette.accent,
				strokeWidth: "1.5",
				opacity: "0.45"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 48h52M48 22v52",
				stroke: palette.accent,
				strokeWidth: "1",
				opacity: "0.24"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "48",
				y: "51",
				dominantBaseline: "middle",
				textAnchor: "middle",
				fill: palette.accent,
				fontFamily: "var(--font-display)",
				fontSize: child ? 31 : 29,
				fontWeight: "700",
				children: initial
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/** Authoritative entitlements for the signed-in user, computed on the server. */
var getMyEntitlements = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("47a39c067d064e4985c476cb2282738deccd4b54c915a8a730f4ac5dda8b202a"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({ feature: enumType(PREMIUM_FEATURES) }).parse(data)).handler(createSsrRpc("b6705a9c73432a9ef18c84e028d2e70a91d7beb066b36375e5ae50962dddd18a"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	kind: enumType(["individual", "family"]).default("family"),
	billingPeriod: enumType(["monthly", "yearly"]).default("monthly"),
	children: numberType().int().min(0).max(20).optional()
}).parse(data ?? {})).handler(createSsrRpc("6b3b2f739974aee15bf0f15a5765dee7e74d54517c6e0dac7b947e069e2c9463"));
/**
* Server-side TanStack Start function for Stripe Test Mode Checkout Session creation.
* Rejects child/teen accounts server-side.
* Does NOT mark a user Premium merely because Checkout was opened.
*/
var createCheckoutSessionFn = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	kind: enumType(["individual", "family"]).default("individual"),
	billingPeriod: enumType(["monthly", "yearly"]).default("monthly"),
	additionalChildren: numberType().int().min(0).max(20).default(0),
	successUrl: stringType().optional(),
	cancelUrl: stringType().optional()
}).parse(data ?? {})).handler(createSsrRpc("006e78a88e60586c3473369e879f6a8b6b2522c89c51faef604ce62dabec89f1"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	kind: enumType(["individual", "family"]).default("individual"),
	billingPeriod: enumType(["monthly", "yearly"]).default("monthly"),
	additionalChildren: numberType().int().min(0).max(20).default(0)
}).parse(data ?? {})).handler(createSsrRpc("732f28acfe98b74a2fa2f04ef644489228a94af066db16bbdf151946f2f1ea98"));
/** Cancels premium immediately; the account returns to Free by stored status. */
var cancelPremiumSubscription = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("6537acec683b83cd4e54db140fba98eff29bb08f2206cdd6173e7b23f3129621"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("2674e01b6221091bd8875e27066684bf0cfb025f802d69822142012f59ffdc9b"));
/**
* Entitlements come from the server (never from client-held state), so the UI
* and the backend always agree on what the user may access.
*/
function useEntitlements() {
	const { user, loading } = useSession();
	const fetchEntitlements = useServerFn(getMyEntitlements);
	return useQuery({
		queryKey: ["entitlements", user?.id],
		enabled: !loading && !!user,
		staleTime: 6e4,
		queryFn: async () => await fetchEntitlements()
	});
}
/** Convenience wrapper: safe defaults to the free plan while loading. */
function useSubscriptionAccess() {
	const { data, isLoading, isError, refetch } = useEntitlements();
	const entitlements = data ?? FREE_ENTITLEMENTS;
	return {
		entitlements,
		isLoading,
		isError,
		refetch,
		isPremium: entitlements.isPremium,
		/** Family subscription seat role, when the user belongs to a family. */
		seatRole: entitlements.seatRole,
		/** False for children/teenagers: they never see checkout or payment. */
		canSubscribe: entitlements.canSubscribe,
		canManageBilling: entitlements.canManageBilling,
		family: entitlements.family,
		can: (feature) => hasFeature(entitlements, feature)
	};
}
/**
* Subscription indicator. Text + icon carry the meaning, never colour alone.
* Status is read from server-computed entitlements, so it always matches access.
*/
function PlanBadge({ className, size = "default" }) {
	const { isPremium, isLoading } = useSubscriptionAccess();
	const { t } = useWazenLocale();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block h-6 w-16 animate-pulse rounded-md bg-secondary", className) });
	const Icon = isPremium ? PremiumIcon : FreePlanIcon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-md border font-medium", size === "sm" ? "px-2 py-0.5 text-[0.6875rem]" : "px-2.5 py-1 text-xs", isPremium ? "border-gold/25 bg-gold/10 text-gold" : "border-border bg-secondary text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: size === "sm" ? "size-3" : "size-3.5",
			strokeWidth: ICON_STROKE
		}), isPremium ? t("premium") : t("free")]
	});
}
var ASSET_KINDS = [
	"stock",
	"gold",
	"silver",
	"real_estate"
];
var num = (value) => {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
};
/** Units are shares for stocks, grams for metals and a single unit for property. */
function unitOf(kind) {
	if (kind === "stock") return "shares";
	if (kind === "gold" || kind === "silver") return "grams";
	return "property";
}
function costBasis(asset) {
	return num(asset.quantity) * num(asset.unit_cost);
}
function marketValue(asset) {
	return num(asset.quantity) * num(asset.current_unit_value);
}
function gainOf(asset) {
	return marketValue(asset) - costBasis(asset);
}
function gainPercentOf(asset) {
	const cost = costBasis(asset);
	if (cost <= 0) return 0;
	return gainOf(asset) / cost * 100;
}
function annualRentOf(asset) {
	return num(asset.monthly_rent) * 12;
}
function portfolioTotals(assets, liveValuations) {
	let cost = 0;
	let value = 0;
	let annualRentalIncome = 0;
	let hasLiveValuation = false;
	const kinds = /* @__PURE__ */ new Map();
	const liveMap = /* @__PURE__ */ new Map();
	if (liveValuations && liveValuations.length > 0) for (const item of liveValuations) liveMap.set(item.id, item);
	for (const asset of assets) {
		const live = liveMap.get(asset.id);
		const assetCost = costBasis(asset);
		const isLive = Boolean(live && live.priceAvailable && live.liveMarketValue !== null);
		if (isLive) hasLiveValuation = true;
		const assetValue = isLive && live?.liveMarketValue !== null ? live.liveMarketValue : marketValue(asset);
		cost += assetCost;
		value += assetValue;
		annualRentalIncome += annualRentOf(asset);
		const entry = kinds.get(asset.kind) ?? {
			kind: asset.kind,
			count: 0,
			cost: 0,
			value: 0,
			gain: 0
		};
		entry.count += 1;
		entry.cost += assetCost;
		entry.value += assetValue;
		entry.gain = entry.value - entry.cost;
		kinds.set(asset.kind, entry);
	}
	return {
		cost,
		value,
		gain: value - cost,
		gainPercent: cost > 0 ? (value - cost) / cost * 100 : 0,
		annualRentalIncome,
		byKind: ASSET_KINDS.map((kind) => kinds.get(kind)).filter((entry) => !!entry),
		hasLiveValuation
	};
}
function valuationsFor(valuations, assetId) {
	return valuations.filter((row) => row.asset_id === assetId).sort((a, b) => a.valued_on.localeCompare(b.valued_on));
}
/**
* Total portfolio value on each date the user has recorded a valuation, using
* the last known value of every asset already owned on that date.
*/
function portfolioSeries(assets, valuations) {
	if (assets.length === 0 || valuations.length === 0) return [];
	const dates = [...new Set(valuations.map((row) => row.valued_on))].sort();
	const byAsset = /* @__PURE__ */ new Map();
	for (const asset of assets) byAsset.set(asset.id, valuationsFor(valuations, asset.id));
	return dates.map((date) => {
		let value = 0;
		for (const asset of assets) {
			if (asset.purchase_date > date) continue;
			const history = byAsset.get(asset.id) ?? [];
			let unitValue = null;
			for (const row of history) if (row.valued_on <= date) unitValue = num(row.unit_value);
			else break;
			value += num(asset.quantity) * (unitValue ?? num(asset.unit_cost));
		}
		return {
			date,
			value
		};
	});
}
/** Life stages that may own assets — children and teenagers never can. */
function canOwnAssets(lifeStage) {
	return lifeStage === "university_student" || lifeStage === "employee" || lifeStage === "self_employed" || lifeStage === "parent";
}
var wazen_logo_dark_png_asset_default = {
	version: 1,
	asset_id: "e56b3a72-43a3-4baa-8eb1-bcb9c8514fd9",
	project_id: "783c8e2b-0272-40b2-9952-b06bf8328649",
	url: "/__l5e/assets-v1/e56b3a72-43a3-4baa-8eb1-bcb9c8514fd9/wazen-logo-dark.png",
	r2_key: "a/v1/783c8e2b-0272-40b2-9952-b06bf8328649/e56b3a72-43a3-4baa-8eb1-bcb9c8514fd9/wazen-logo-dark.png",
	original_filename: "wazen-logo-dark.png",
	size: 495189,
	content_type: "image/png",
	created_at: "2026-09-11T12:55:50Z"
};
var wazen_logo_light_png_asset_default = {
	version: 1,
	asset_id: "f1e1f05e-5d66-4e11-9cd1-a7b657db30f7",
	project_id: "783c8e2b-0272-40b2-9952-b06bf8328649",
	url: "/__l5e/assets-v1/f1e1f05e-5d66-4e11-9cd1-a7b657db30f7/wazen-logo-light.png",
	r2_key: "a/v1/783c8e2b-0272-40b2-9952-b06bf8328649/f1e1f05e-5d66-4e11-9cd1-a7b657db30f7/wazen-logo-light.png",
	original_filename: "wazen-logo-light.png",
	size: 574787,
	content_type: "image/png",
	created_at: "2026-09-11T12:55:47Z"
};
/** Intrinsic size of both source artworks (they share the same canvas). */
var SRC_W = 1920;
var SRC_H = 1279;
var ASPECT_RATIO = SRC_W / SRC_H;
/**
* The official Wazen lockup. Two finalised files are supplied — the dark
* wordmark for light mode and the white wordmark for dark mode — and both are
* used exactly as delivered: transparent, never recoloured, never plated.
*/
function WazenLogo({ size = 40, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("relative inline-block shrink-0", className),
		style: {
			height: size,
			width: size * ASPECT_RATIO
		},
		role: "img",
		"aria-label": "Wazen",
		children: [[wazen_logo_light_png_asset_default.url, "dark:hidden"], [wazen_logo_dark_png_asset_default.url, "hidden dark:block"]].map(([url, visibility]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: "",
			"aria-hidden": true,
			width: SRC_W,
			height: SRC_H,
			className: cn("absolute inset-0 size-full object-contain", visibility),
			loading: "eager",
			decoding: "async"
		}, url))
	});
}
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
/**
* Wazen TanStack Start Server Functions for MongoDB CRUD.
*
* Runs strictly server-side.
* Serves as the RPC bridge between client React hooks and MongoDB collections.
* Enforces server-side authentication and user ownership.
*/
var listTransactionsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("ef18b4309437958303c3d473a426334badff3df37a4bfa4568c23e78506a40b0"));
var createTransactionFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	kind: enumType([
		"income",
		"expense",
		"saving",
		"refund"
	]),
	category: stringType().min(1),
	merchant: stringType().nullable().optional(),
	amount: numberType(),
	currency: stringType().default("KWD"),
	occurred_on: stringType(),
	note: stringType().nullable().optional(),
	payment_method: stringType().nullable().optional(),
	goal_id: stringType().nullable().optional(),
	paid_by_parent: booleanType().optional(),
	deducted_from_child: booleanType().optional(),
	beneficiary_user_id: stringType().nullable().optional(),
	linked_transaction_id: stringType().nullable().optional(),
	original_amount: numberType().nullable().optional(),
	original_currency: stringType().nullable().optional(),
	converted_amount: numberType().nullable().optional(),
	exchange_rate: numberType().nullable().optional(),
	rate_date: stringType().nullable().optional(),
	id: stringType().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("89408c9d50a4898b0d7bc753b5236b8af41987e58b8ae768ff241873cf70af1a"));
createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	updates: recordType(unknownType()),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("5ca1e8c26da9fe8e9115d43ee39f4af25ef24819c4d93be9350c44855776d233"));
createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("855f4a908abba9a6f2c1094480c564f48f6bab57801bf27b28ab1c856291cf2b"));
createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	reason: stringType().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("a89ba3ddf621615c1399f601bdd420ef7e2cb8ce4cf1e8a2e0af9f2a62cf8947"));
var listParentPaidForMeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("d64ed3230db9c580baf8d84f6ab39e68879de84d104db15ba0d0eca0f5778510"));
var addParentPaidExpenseFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	childUserId: stringType(),
	amount: numberType(),
	category: stringType(),
	merchant: stringType().nullable(),
	occurredOn: stringType(),
	paymentMethod: stringType().nullable(),
	currency: stringType(),
	deductFromChild: booleanType(),
	note: stringType().nullable().optional(),
	originalAmount: numberType().nullable().optional(),
	originalCurrency: stringType().nullable().optional(),
	convertedAmount: numberType().nullable().optional(),
	exchangeRate: numberType().nullable().optional(),
	rateDate: stringType().nullable().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("cc52aa22d94149fc554423b46268d781c9adacf62d175e732c8f4e4da7a699ef"));
var listRecurringItemsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	activeOnly: booleanType().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("7780b19e867ee0b09decf353da46ee533cfe744b54dadf1c8d7970d2639634e3"));
var saveRecurringItemFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType().optional(),
	kind: enumType([
		"income",
		"expense",
		"saving"
	]),
	name: stringType().min(1),
	merchant: stringType().nullable().optional(),
	category: stringType(),
	amount: numberType(),
	currency: stringType().default("KWD"),
	frequency: enumType([
		"weekly",
		"monthly",
		"yearly"
	]),
	day_of_month: numberType(),
	start_date: stringType(),
	ends_on: stringType().nullable().optional(),
	note: stringType().nullable().optional(),
	active: booleanType().default(true),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("ae0051acbc04091e0b7cb8ef4e62968818cddc3f1d8efe84fc667257dff67309"));
var toggleRecurringItemFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	active: booleanType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("74a7276b38bf502cddf02db922e794e0df35a200156947668f55f221631f6071"));
var deleteRecurringItemFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("e397f022ad361bacc5cfacd3bf2d285d39f428c8e50255e0da5edf33e493c17b"));
var getMonthlyBudgetFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	periodMonth: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("8a991ac915924a9014aa0fe85c3bf91cd2f3d0965ad85901c656faa848fd5f0e"));
var upsertMonthlyBudgetFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	periodMonth: stringType(),
	amount: numberType(),
	currency: stringType().default("KWD"),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("2e7faad092ff62ce9c0596e3412e7fdcd3f909f2a242972e3ee0d6681812cb32"));
var listGoalsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("e0d388243cbbd2a6d8610675360dd663025e078ec1d02c04c56df8e9ca63c659"));
var createGoalFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	name: stringType().min(1),
	kind: enumType(["goal", "emergency_fund"]).default("goal"),
	target_amount: numberType(),
	target_date: stringType().nullable().optional(),
	currency: stringType().default("KWD"),
	id: stringType().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("612f6905d2d60fb5aeaeebf1b5ef737ebbc503128ed9877c08df106795d40f97"));
createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	updates: recordType(unknownType()),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("d2a6b4311acba04433320700684c65e46ee96b1ec07d6f8f8583643069e68357"));
createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("ca94a18368b9af693a4358d6c8a6c23a7d1f79855c1fb9afaf0d5f5b4c2d5003"));
var listAssetsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("5c5dc9154e2e6fd991a44a026234e8599b942a0b22a7006d4b7975e840633c45"));
var listAssetValuationsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("5a8ab31af7302dd940e5743d40a9bd097e6f90fb882c55cea69af9a1067b03b2"));
var saveAssetFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType().optional(),
	input: objectType({
		kind: enumType([
			"stock",
			"gold",
			"silver",
			"real_estate"
		]),
		name: stringType(),
		symbol: stringType().nullable(),
		currency: stringType(),
		purchase_date: stringType(),
		quantity: numberType(),
		unit_cost: numberType(),
		current_unit_value: numberType(),
		purity: stringType().nullable(),
		property_type: stringType().nullable(),
		monthly_rent: numberType(),
		holding_purpose: stringType().nullable(),
		notes: stringType().nullable()
	}),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("383afbf32b4ff3c311cb2aedc236bb45df9949f8602fe6efe78d5310945bb4fb"));
var deleteAssetFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("6242a574a6513b4295f9ebcbb14c27cc04fd5fc102342cb8ecd7d18e66516524"));
var getLearningProfileFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("fd473dea172955f1f14d3d54ac5d6a2c1eba1ed9176221a327f60df8fcf66cde"));
var listLearningProgressFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("f43f459d296c3cd642797ee9c14ef6671e71e11beb2f1fbb6cb1a3f0578fb749"));
var listLearningChallengesFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("c44bc50333eec4b69aa2f60b751efbaea75c0cbbc413301c58d809b09a0930b8"));
var recordLearningActivityFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	activity_type: enumType([
		"lesson",
		"game",
		"quiz"
	]),
	activity_key: stringType(),
	topic: stringType(),
	score: numberType(),
	max_score: numberType(),
	completed: booleanType(),
	difficulty: stringType().optional(),
	xp: numberType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("b0fe7e5865d93583c012e29ccb668546c00a359f9792b54ae9aa2e7c4316b36e"));
var startLearningChallengeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	key: stringType(),
	targetDays: numberType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("64fe9a4a5db39215a96bfdc3d8aae428529621d09f415533f5b484736154f85b"));
var checkInLearningChallengeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	challengeId: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("59b252fa270e10a17c73ed8bdeaf230ae2ae147334a0ec247a6558e14a059712"));
var getFamilySummaryFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createSsrRpc("b6e285205c2a406e1daaae48718b1d462f8f2581aadf37d2c5b17cdb394f4fc2"));
/** Assets are private to their owner; MongoDB verified server-side. */
function useAssets() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["assets", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			return await listAssetsFn({ data: { authToken: session?.access_token } }) ?? [];
		}
	});
}
/** Recorded value history for every asset the signed-in user owns. */
function useAssetValuations() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["asset-valuations", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			return await listAssetValuationsFn({ data: { authToken: session?.access_token } }) ?? [];
		}
	});
}
function useInvalidateAssets() {
	const queryClient = useQueryClient();
	return async () => {
		await Promise.all([queryClient.invalidateQueries({ queryKey: ["assets"] }), queryClient.invalidateQueries({ queryKey: ["asset-valuations"] })]);
	};
}
function useSaveAsset() {
	const { session } = useSession();
	const invalidate = useInvalidateAssets();
	return useMutation({
		mutationFn: async ({ id, input }) => {
			return (await saveAssetFn({ data: {
				authToken: session?.access_token,
				id,
				input
			} })).id;
		},
		onSuccess: invalidate
	});
}
function useDeleteAsset() {
	const { session } = useSession();
	const invalidate = useInvalidateAssets();
	return useMutation({
		mutationFn: async (id) => {
			await deleteAssetFn({ data: {
				authToken: session?.access_token,
				id
			} });
		},
		onSuccess: invalidate
	});
}
/** Currencies Wazen presents today. KWD is first because Kuwait is the home market. */
var CURRENCIES = [
	{
		code: "KWD",
		digits: 3,
		nameEn: "Kuwaiti dinar",
		nameAr: "دينار كويتي"
	},
	{
		code: "SAR",
		digits: 2,
		nameEn: "Saudi riyal",
		nameAr: "ريال سعودي"
	},
	{
		code: "AED",
		digits: 2,
		nameEn: "UAE dirham",
		nameAr: "درهم إماراتي"
	},
	{
		code: "BHD",
		digits: 3,
		nameEn: "Bahraini dinar",
		nameAr: "دينار بحريني"
	},
	{
		code: "QAR",
		digits: 2,
		nameEn: "Qatari riyal",
		nameAr: "ريال قطري"
	},
	{
		code: "OMR",
		digits: 3,
		nameEn: "Omani rial",
		nameAr: "ريال عماني"
	},
	{
		code: "USD",
		digits: 2,
		nameEn: "US dollar",
		nameAr: "دولار أمريكي"
	},
	{
		code: "EUR",
		digits: 2,
		nameEn: "Euro",
		nameAr: "يورو"
	},
	{
		code: "GBP",
		digits: 2,
		nameEn: "British pound",
		nameAr: "جنيه إسترليني"
	}
];
function currencyMeta(code) {
	return CURRENCIES.find((item) => item.code === code) ?? {
		code,
		digits: 2,
		nameEn: code,
		nameAr: code
	};
}
function currencyName(code, language) {
	const meta = currencyMeta(code);
	return language === "ar" ? meta.nameAr : meta.nameEn;
}
var FX_TAG_REGEX = /<!--fx:(\{[^}]+\})-->/;
/** Serializes an exchange-rate snapshot into a metadata tag */
function attachFxSnapshot(note, snapshot) {
	const clean = (note ?? "").replace(FX_TAG_REGEX, "").trim();
	const serialized = `<!--fx:${JSON.stringify(snapshot)}-->`;
	return clean ? `${clean}\n${serialized}` : serialized;
}
/** Extracts an exchange-rate snapshot from metadata */
function parseFxSnapshot(note) {
	if (!note) return {
		cleanNote: null,
		snapshot: null
	};
	const match = note.match(FX_TAG_REGEX);
	if (!match) return {
		cleanNote: note,
		snapshot: null
	};
	try {
		const rawTag = match[1];
		if (!rawTag) return {
			cleanNote: note,
			snapshot: null
		};
		const parsed = JSON.parse(rawTag);
		const clean = note.replace(FX_TAG_REGEX, "").trim();
		return {
			cleanNote: clean.length > 0 ? clean : null,
			snapshot: parsed
		};
	} catch {
		return {
			cleanNote: note,
			snapshot: null
		};
	}
}
/** Enriches a transaction record with parsed FX snapshot data */
function enrichTransactionWithFx(transaction) {
	const parsed = parseFxSnapshot(transaction.note);
	const raw = transaction;
	if (parsed.snapshot) return {
		...transaction,
		note: parsed.cleanNote,
		original_amount: parsed.snapshot.original_amount,
		original_currency: parsed.snapshot.original_currency,
		converted_amount: parsed.snapshot.converted_amount,
		exchange_rate: parsed.snapshot.exchange_rate,
		rate_date: parsed.snapshot.rate_date
	};
	return {
		...transaction,
		original_amount: raw["original_amount"] ?? transaction.amount,
		original_currency: raw["original_currency"] ?? transaction.currency,
		converted_amount: raw["converted_amount"] ?? transaction.amount,
		exchange_rate: raw["exchange_rate"] ?? 1,
		rate_date: raw["rate_date"] ?? null
	};
}
createServerFn({ method: "GET" }).inputValidator((data) => objectType({
	base: stringType().min(1),
	quote: stringType().min(1),
	date: stringType().nullable().optional()
}).parse(data)).handler(createSsrRpc("20779578d0ff149d35bfb5cde7d70d256d0d266769c7e2b6eb0020b3c3d3f5ee"));
createServerFn({ method: "GET" }).inputValidator((data) => objectType({
	base: stringType().default("KWD"),
	quotes: arrayType(stringType()).optional(),
	date: stringType().nullable().optional()
}).parse(data)).handler(createSsrRpc("656a6b49e4600a642c6844b4bf78d200e8a6560231903b4898f9ce6a68c9d16f"));
/**
* 3. Convert an amount from one currency to another (default KWD),
* preserving exchange rate and date snapshot.
*/
var convertCurrencyFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	amount: numberType(),
	from: stringType().min(1),
	to: stringType().default("KWD"),
	date: stringType().nullable().optional()
}).parse(data)).handler(createSsrRpc("2627f10cf918c235a1e2e2fd2998e56f98f6ca7c7543a21c42db12b393346994"));
/** All queries are scoped to the signed-in user and served from MongoDB Atlas. */
function useTransactions() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["transactions", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const res = await listTransactionsFn({ data: {
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to load transactions from MongoDB.");
			return (res.data ?? []).map((row) => enrichTransactionWithFx(row));
		}
	});
}
function useGoals() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["goals", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const res = await listGoalsFn({ data: {
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to load goals from MongoDB.");
			return res.data ?? [];
		}
	});
}
function useMonthlyBudget() {
	const { session, user, loading } = useSession();
	const period = firstOfMonth();
	return useQuery({
		queryKey: [
			"budget",
			user?.id,
			period
		],
		enabled: !loading && !!user,
		queryFn: async () => {
			const res = await getMonthlyBudgetFn({ data: {
				periodMonth: period,
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to load monthly budget from MongoDB.");
			return res.data ?? null;
		}
	});
}
function useRecurringItems() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["recurring", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const res = await listRecurringItemsFn({ data: {
				activeOnly: true,
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to load recurring items from MongoDB.");
			return (res.data ?? []).map((row) => enrichTransactionWithFx(row));
		}
	});
}
/**
* Parents only: linked children/teenagers they are permitted to see.
* Reads rely entirely on the family permissions stored in MongoDB.
*/
function useFamilySummary(enabled) {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["family-summary", user?.id],
		enabled: enabled && !loading && !!user,
		queryFn: async () => {
			const res = await getFamilySummaryFn({ data: {
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to load family summary from MongoDB.");
			return (res.data ?? []).map((member) => ({
				profile: member.profile,
				canFund: member.canFund,
				canMonitor: member.canMonitor,
				transactions: (member.transactions ?? []).map((t) => enrichTransactionWithFx(t)),
				goals: member.goals ?? []
			}));
		}
	});
}
/**
* Spending a parent recorded for the signed-in child/teenager.
*/
function useParentPaidForMe() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["parent-paid", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const res = await listParentPaidForMeFn({ data: {
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to load parent paid records from MongoDB.");
			return (res.data ?? []).map((row) => enrichTransactionWithFx(row));
		}
	});
}
/**
* Records an expense a parent paid for a linked child or teenager into MongoDB.
*/
function useAddParentPaidExpense() {
	const { session, user } = useSession();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			let finalAmount = input.amount;
			let parentNote = null;
			let snapshotData = {};
			if (input.currency !== "KWD") {
				const fxRes = await convertCurrencyFn({ data: {
					amount: input.amount,
					from: input.currency,
					to: "KWD",
					date: input.occurredOn
				} });
				if (fxRes.success) {
					finalAmount = fxRes.converted_amount;
					const snapshot = {
						original_amount: fxRes.original_amount,
						original_currency: fxRes.original_currency,
						converted_amount: fxRes.converted_amount,
						exchange_rate: fxRes.exchange_rate,
						rate_date: fxRes.rate_date
					};
					parentNote = attachFxSnapshot(parentNote, snapshot);
					snapshotData = snapshot;
				}
			}
			await addParentPaidExpenseFn({ data: {
				childUserId: input.childUserId,
				amount: finalAmount,
				category: input.category,
				merchant: input.merchant,
				occurredOn: input.occurredOn,
				paymentMethod: input.paymentMethod,
				currency: input.currency,
				deductFromChild: input.deductFromChild,
				note: parentNote,
				originalAmount: snapshotData["original_amount"] ?? null,
				originalCurrency: snapshotData["original_currency"] ?? null,
				convertedAmount: snapshotData["converted_amount"] ?? null,
				exchangeRate: snapshotData["exchange_rate"] ?? null,
				rateDate: snapshotData["rate_date"] ?? null,
				authToken: session?.access_token,
				userId: user?.id
			} });
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ["transactions"] }),
				queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
				queryClient.invalidateQueries({ queryKey: ["parent-paid"] })
			]);
		}
	});
}
/**
* Mutation hooks for standard Transaction CRUD in MongoDB.
*/
function useCreateTransaction() {
	const { session, user } = useSession();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			const res = await createTransactionFn({ data: {
				...input,
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to create transaction in MongoDB.");
			return res.data;
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ["transactions"] }),
				queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
				queryClient.invalidateQueries({ queryKey: ["budget"] })
			]);
		}
	});
}
/**
* Mutation hooks for Goals & Budgets in MongoDB.
*/
function useCreateGoal() {
	const { session, user } = useSession();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			const res = await createGoalFn({ data: {
				...input,
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to create goal in MongoDB.");
			return res.data;
		},
		onSuccess: async () => {
			await Promise.all([queryClient.invalidateQueries({ queryKey: ["goals"] }), queryClient.invalidateQueries({ queryKey: ["family-summary"] })]);
		}
	});
}
function useUpsertMonthlyBudget() {
	const { session, user } = useSession();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ periodMonth, amount, currency }) => {
			const res = await upsertMonthlyBudgetFn({ data: {
				periodMonth,
				amount,
				currency: currency || "KWD",
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to update monthly budget in MongoDB.");
			return res.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["budget"] });
		}
	});
}
/**
* Wazen Zakat engine.
*
* Methodology reference: Kuwait Zakat House (بيت الزكاة الكويتي)
* https://www.zakathouse.org.kw/calculate.aspx
*
* Design rules:
* - No price and no nisab amount is hardcoded. Gram prices come from stored,
*   updatable `metal_rates` rows (later fed by a backend integration).
* - The nisab thresholds themselves are methodology constants (85g pure 24K
*   gold, ~595g pure silver), not market values.
* - Every asset type has its own eligibility rule; 2.5% is never applied
*   blindly to everything the user owns.
* - Wazen presents a calculation, never a religious ruling.
*/
var ZAKAT_REFERENCE_URL = "https://www.zakathouse.org.kw/calculate.aspx";
var ZAKAT_METHODOLOGY_REFERENCE = "Kuwait Zakat House — https://www.zakathouse.org.kw/calculate.aspx";
/** ربع العشر — a quarter of one tenth. */
var ZAKAT_RATE = .025;
var GOLD_PURITIES = [
	"18K",
	"21K",
	"22K",
	"24K"
];
/** Share of pure gold in a given karat, used to convert to 24K equivalent. */
function purityFactor(purity) {
	const key = (purity ?? "24K").toUpperCase().replace(/\s/g, "");
	if (key.startsWith("18")) return 18 / 24;
	if (key.startsWith("21")) return 21 / 24;
	if (key.startsWith("22")) return 22 / 24;
	return 1;
}
/** Fraction of pure silver; silver holdings are usually quoted near .999. */
function silverPurityFactor(purity) {
	const key = (purity ?? "").replace(/[^0-9.]/g, "");
	const parsed = Number(key);
	if (Number.isFinite(parsed) && parsed > 0) {
		if (parsed > 1 && parsed <= 100) return parsed / 100;
		if (parsed > 100) return parsed / 1e3;
		return parsed;
	}
	return 1;
}
function latestRate(rates, metal) {
	return rates.filter((row) => row.metal === metal).sort((a, b) => b.as_of.localeCompare(a.as_of))[0] ?? null;
}
/**
* Nisab in KWD, always derived: 85 × current 24K gram price (or 595 × silver).
* Returns null when no rate is stored yet — the UI then says the reference
* price is pending instead of inventing one.
*/
function nisabValue(rates, method, goldGrams = 85, silverGrams = 595) {
	const rate = latestRate(rates, method === "silver" ? "silver" : "gold_24k");
	if (!rate) return null;
	return {
		value: round((method === "silver" ? silverGrams : goldGrams) * Number(rate.price_per_gram)),
		rate
	};
}
var HIJRI = "islamic-umalqura";
function hijriParts(date) {
	try {
		const parts = new Intl.DateTimeFormat(`en-u-ca-${HIJRI}`, {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			timeZone: "UTC"
		}).formatToParts(date);
		const get = (type) => Number(parts.find((p) => p.type === type)?.value?.replace(/[^0-9]/g, ""));
		const year = get("year");
		const month = get("month");
		const day = get("day");
		if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
		return {
			year,
			month,
			day
		};
	} catch {
		return null;
	}
}
/** Human Hijri label, e.g. "1447-03-12 AH". */
function hijriLabel(value) {
	const parts = hijriParts(typeof value === "string" ? /* @__PURE__ */ new Date(`${value.slice(0, 10)}T00:00:00Z`) : value);
	if (!parts) return null;
	const pad = (n) => String(n).padStart(2, "0");
	return `${parts.year}-${pad(parts.month)}-${pad(parts.day)} AH`;
}
var DAY_MS = 864e5;
/**
* One complete Hijri (lunar) year after the given date — never a flat 365-day
* Gregorian assumption. Falls back to 354 days only if the Hijri calendar is
* unavailable in the runtime.
*/
function addHijriYear(value) {
	const start = typeof value === "string" ? /* @__PURE__ */ new Date(`${value.slice(0, 10)}T00:00:00Z`) : value;
	const startParts = hijriParts(start);
	if (!startParts) return new Date(start.getTime() + 354 * DAY_MS).toISOString().slice(0, 10);
	const target = {
		year: startParts.year + 1,
		month: startParts.month,
		day: startParts.day
	};
	for (let offset = 350; offset <= 360; offset += 1) {
		const candidate = new Date(start.getTime() + offset * DAY_MS);
		const parts = hijriParts(candidate);
		if (!parts) break;
		if (parts.year === target.year && parts.month === target.month && parts.day === target.day) return candidate.toISOString().slice(0, 10);
	}
	for (let offset = 350; offset <= 360; offset += 1) {
		const candidate = new Date(start.getTime() + offset * DAY_MS);
		const parts = hijriParts(candidate);
		if (parts && parts.year === target.year && parts.month >= target.month) return candidate.toISOString().slice(0, 10);
	}
	return new Date(start.getTime() + 354 * DAY_MS).toISOString().slice(0, 10);
}
function daysBetween(from, to) {
	const a = (/* @__PURE__ */ new Date(`${from.slice(0, 10)}T00:00:00Z`)).getTime();
	const b = (/* @__PURE__ */ new Date(`${to.slice(0, 10)}T00:00:00Z`)).getTime();
	return Math.round((b - a) / DAY_MS);
}
function todayISO(now = /* @__PURE__ */ new Date()) {
	return (/* @__PURE__ */ new Date(now.getTime() - now.getTimezoneOffset() * 6e4)).toISOString().slice(0, 10);
}
/** Purposes a holding can be kept for; drives its zakat treatment. */
var HOLDING_PURPOSES = [
	"trade",
	"long_term",
	"personal_use",
	"primary_residence",
	"rental_income",
	"for_sale"
];
function purposeOf(asset) {
	const raw = asset.holding_purpose;
	if (raw) return raw;
	if (asset.kind === "real_estate") {
		const type = (asset.property_type ?? "").toLowerCase();
		if (type.includes("residence") || type.includes("home") || type.includes("سكن")) return "primary_residence";
		if (type.includes("rent") || type.includes("إيجار")) return "rental_income";
		if (type.includes("sale") || type.includes("trade")) return "for_sale";
	}
	return null;
}
/** Savings balance held aside (goals, emergency fund, saving transfers). */
function savingsBalance(transactions) {
	return round(transactions.filter((t) => t.kind === "saving").reduce((sum, t) => sum + (Number(t.amount) || 0), 0));
}
function assetLines(assets, transactions) {
	const lines = [];
	const cash = round(Math.max(availableMoney(transactions), 0));
	lines.push({
		key: "cash",
		assetId: null,
		type: "cash",
		label: "cash",
		value: cash,
		eligible: cash > 0,
		needsReview: false,
		reason: "zakatCashReason",
		method: "zakatMethodFullValue"
	});
	const savings = savingsBalance(transactions);
	lines.push({
		key: "savings",
		assetId: null,
		type: "savings",
		label: "savings",
		value: savings,
		eligible: savings > 0,
		needsReview: false,
		reason: "zakatSavingsReason",
		method: "zakatMethodFullValue"
	});
	for (const asset of assets) {
		const value = round(marketValue(asset));
		const purpose = purposeOf(asset);
		if (asset.kind === "gold") {
			const pure = round(Number(asset.quantity) * purityFactor(asset.purity));
			lines.push({
				key: asset.id,
				assetId: asset.id,
				type: "gold",
				label: asset.name,
				value,
				eligible: value > 0,
				needsReview: purpose === "personal_use",
				reason: purpose === "personal_use" ? "zakatGoldJewelleryReason" : "zakatGoldReason",
				method: "zakatMethodCurrentMarketValue",
				detail: `${asset.quantity} g ${(asset.purity ?? "24k").toUpperCase()} → ${pure} g 24K`
			});
			continue;
		}
		if (asset.kind === "silver") {
			const pure = round(Number(asset.quantity) * silverPurityFactor(asset.purity));
			lines.push({
				key: asset.id,
				assetId: asset.id,
				type: "silver",
				label: asset.name,
				value,
				eligible: value > 0,
				needsReview: purpose === "personal_use",
				reason: purpose === "personal_use" ? "zakatSilverJewelleryReason" : "zakatSilverReason",
				method: "zakatMethodCurrentMarketValue",
				detail: `${asset.quantity} g · ${pure} g pure`
			});
			continue;
		}
		if (asset.kind === "stock") {
			const trading = purpose === "trade" || purpose === "for_sale";
			lines.push({
				key: asset.id,
				assetId: asset.id,
				type: "stock",
				label: asset.name,
				value,
				eligible: trading && value > 0,
				needsReview: !trading,
				reason: trading ? "zakatStockTradeReason" : "zakatStockReviewReason",
				method: trading ? "zakatMethodCurrentMarketValue" : "zakatMethodNeedsRuling",
				detail: `${asset.quantity} ${asset.symbol ?? ""}`.trim()
			});
			continue;
		}
		const forSale = purpose === "for_sale" || purpose === "trade";
		const personal = purpose === "primary_residence" || purpose === "personal_use";
		lines.push({
			key: asset.id,
			assetId: asset.id,
			type: "real_estate",
			label: asset.name,
			value,
			eligible: forSale && value > 0,
			needsReview: !forSale && !personal,
			reason: forSale ? "zakatPropertyForSaleReason" : personal ? "zakatPropertyPersonalReason" : "zakatPropertyRentalReason",
			method: forSale ? "zakatMethodCurrentMarketValue" : "zakatMethodExcluded",
			detail: asset.property_type ?? void 0
		});
	}
	return lines;
}
function calculateZakat(input) {
	const today = todayISO(input.now ?? /* @__PURE__ */ new Date());
	const method = input.profile?.nisab_method === "silver" ? "silver" : "gold";
	const lines = assetLines(input.assets, input.transactions);
	const eligibleTotal = round(lines.filter((l) => l.eligible && !l.needsReview).reduce((s, l) => s + l.value, 0));
	const reviewTotal = round(lines.filter((l) => l.needsReview).reduce((s, l) => s + l.value, 0));
	const excludedTotal = round(lines.filter((l) => !l.eligible && !l.needsReview).reduce((s, l) => s + l.value, 0));
	const deductions = round(Math.max(input.deductions ?? 0, 0));
	const zakatableAmount = round(Math.max(eligibleTotal - deductions, 0));
	const nisab = nisabValue(input.rates, method, input.profile?.gold_nisab_grams ?? 85, input.profile?.silver_nisab_grams ?? 595);
	const nisabKwd = nisab?.value ?? null;
	const meetsNisab = nisabKwd !== null && zakatableAmount >= nisabKwd;
	const startDate = input.profile?.zakat_start_date ?? null;
	const dueDate = startDate ? input.profile?.zakat_due_date ?? addHijriYear(startDate) : null;
	let hawlStatus = "not_started";
	let hawlProgress = 0;
	let hawlDaysRemaining = null;
	if (startDate && dueDate) {
		const span = Math.max(daysBetween(startDate, dueDate), 1);
		const elapsed = Math.min(Math.max(daysBetween(startDate, today), 0), span);
		hawlProgress = Math.round(elapsed / span * 100);
		hawlDaysRemaining = Math.max(daysBetween(today, dueDate), 0);
		hawlStatus = today >= dueDate ? "completed" : "in_progress";
	}
	const zakatDue = meetsNisab && hawlStatus === "completed" ? round(zakatableAmount * ZAKAT_RATE) : 0;
	const cycleStart = startDate ?? "0001-01-01";
	const paid = round(input.payments.filter((p) => p.status === "paid" && p.payment_date >= cycleStart).reduce((s, p) => s + (Number(p.amount_kwd) || 0), 0));
	const remaining = round(Math.max(zakatDue - paid, 0));
	let status;
	if (!meetsNisab) status = "below_nisab";
	else if (hawlStatus !== "completed") status = "hawl_in_progress";
	else if (zakatDue > 0 && remaining <= 0) status = "recorded";
	else status = "due";
	return {
		today,
		lines,
		eligibleTotal,
		reviewTotal,
		excludedTotal,
		deductions,
		zakatableAmount,
		nisabKwd,
		nisabRate: nisab?.rate ?? null,
		nisabMethod: method,
		meetsNisab,
		hawlStatus,
		hawlProgress,
		hawlDaysRemaining,
		startDate,
		dueDate,
		hijriStart: startDate ? hijriLabel(startDate) : null,
		hijriDue: dueDate ? hijriLabel(dueDate) : null,
		status,
		zakatDue,
		paid,
		remaining,
		needsStartDate: meetsNisab && !startDate
	};
}
/** Only adult, independent accounts calculate their own zakat. */
function canCalculateZakat(lifeStage) {
	return lifeStage === "university_student" || lifeStage === "employee" || lifeStage === "self_employed" || lifeStage === "parent";
}
/** Reference gram prices — stored rows, updatable by the backend integration. */
function useMetalRates() {
	const { user, loading } = useSession();
	return useQuery({
		queryKey: ["metal-rates"],
		enabled: !loading && !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("metal_rates").select("id, metal, price_per_gram, currency, as_of, source").order("as_of", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useZakatProfile() {
	const { user, loading } = useSession();
	return useQuery({
		queryKey: ["zakat-profile", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("zakat_profiles").select("*").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data ?? null;
		}
	});
}
function useZakatPayments() {
	const { user, loading } = useSession();
	return useQuery({
		queryKey: ["zakat-payments", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("zakat_payments").select("*").eq("user_id", user.id).order("payment_date", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useZakatCalculations() {
	const { user, loading } = useSession();
	return useQuery({
		queryKey: ["zakat-calculations", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("zakat_calculations").select("*").eq("user_id", user.id).order("calculation_date", { ascending: false }).limit(24);
			if (error) throw error;
			return data ?? [];
		}
	});
}
/**
* Live zakat picture, computed from the same stored financial data the rest of
* Wazen uses — no second balance system.
*/
function useZakat() {
	const transactions = useTransactions();
	const assets = useAssets();
	const rates = useMetalRates();
	const zakatProfile = useZakatProfile();
	const payments = useZakatPayments();
	const isLoading = transactions.isLoading || assets.isLoading || rates.isLoading || zakatProfile.isLoading || payments.isLoading;
	return {
		result: isLoading ? null : calculateZakat({
			assets: assets.data ?? [],
			transactions: transactions.data ?? [],
			rates: rates.data ?? [],
			profile: zakatProfile.data ?? null,
			payments: payments.data ?? []
		}),
		isLoading,
		profile: zakatProfile.data ?? null,
		payments: payments.data ?? [],
		rates: rates.data ?? []
	};
}
function useInvalidateZakat() {
	const queryClient = useQueryClient();
	return async () => {
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: ["zakat-profile"] }),
			queryClient.invalidateQueries({ queryKey: ["zakat-payments"] }),
			queryClient.invalidateQueries({ queryKey: ["zakat-calculations"] }),
			queryClient.invalidateQueries({ queryKey: ["transactions"] })
		]);
	};
}
/** Sets or confirms the date the user's wealth first reached nisab. */
function useSaveZakatStartDate() {
	const { user } = useSession();
	const invalidate = useInvalidateZakat();
	return useMutation({
		mutationFn: async ({ startDate, nisabMethod, nisabKwd }) => {
			const dueDate = addHijriYear(startDate);
			const { error } = await supabase.from("zakat_profiles").upsert({
				user_id: user.id,
				zakat_start_date: startDate,
				zakat_due_date: dueDate,
				hijri_start_date: hijriLabel(startDate),
				hijri_due_date: hijriLabel(dueDate),
				...nisabMethod ? { nisab_method: nisabMethod } : {},
				...nisabKwd != null ? { current_nisab_kwd: nisabKwd } : {},
				hawl_status: "in_progress",
				status: "hawl_in_progress"
			}, { onConflict: "user_id" });
			if (error) throw error;
			return dueDate;
		},
		onSuccess: invalidate
	});
}
/** Stores an immutable snapshot of the current calculation plus its asset lines. */
function useSaveZakatCalculation() {
	const { user } = useSession();
	const invalidate = useInvalidateZakat();
	return useMutation({
		mutationFn: async (result) => {
			const { data, error } = await supabase.from("zakat_calculations").insert({
				user_id: user.id,
				calculation_date: result.today,
				nisab_value_kwd: result.nisabKwd ?? 0,
				eligible_assets_total_kwd: result.eligibleTotal,
				deductions_kwd: result.deductions,
				zakatable_amount_kwd: result.zakatableAmount,
				zakat_rate: ZAKAT_RATE,
				zakat_due_kwd: result.zakatDue,
				hawl_status: result.hawlStatus,
				methodology_reference: ZAKAT_METHODOLOGY_REFERENCE,
				breakdown: result.lines
			}).select("id").single();
			if (error) throw error;
			const calculationId = data.id;
			const rows = result.lines.map((line) => ({
				user_id: user.id,
				calculation_id: calculationId,
				asset_type: line.type,
				asset_id: line.assetId,
				eligible: line.eligible && !line.needsReview,
				eligibility_reason: line.reason,
				value_kwd: line.value,
				calculation_method: line.method,
				calculation_date: result.today
			}));
			if (rows.length > 0) {
				const { error: linesError } = await supabase.from("zakat_assets").insert(rows);
				if (linesError) throw linesError;
			}
			return calculationId;
		},
		onSuccess: invalidate
	});
}
/**
* Records a zakat payment. It is deliberately its own record type: sadaqah
* (giving) is never treated as zakat, and zakat is never treated as sadaqah.
*/
function useRecordZakatPayment() {
	const { session, user } = useSession();
	const invalidate = useInvalidateZakat();
	return useMutation({
		mutationFn: async (input) => {
			let transactionId = null;
			if (input.status === "paid") transactionId = (await createTransactionFn({ data: {
				authToken: session?.access_token,
				transaction: {
					kind: "expense",
					category: "Zakat",
					merchant: input.recipient || null,
					amount: input.amount,
					currency: input.currency || "KWD",
					occurred_on: input.paymentDate,
					note: input.notes || null
				}
			} })).id;
			const { error: paymentError } = await supabase.from("zakat_payments").insert({
				user_id: user.id,
				calculation_id: input.calculationId ?? null,
				amount_kwd: input.amount,
				currency: input.currency,
				payment_date: input.paymentDate,
				payment_type: "zakat",
				recipient: input.recipient,
				status: input.status,
				notes: input.notes,
				transaction_id: transactionId
			});
			if (paymentError) throw paymentError;
		},
		onSuccess: invalidate
	});
}
/**
* Notification centre. Today it carries the zakat reminder, which only appears
* once nisab and a complete hawl are both satisfied.
*/
function ZakatNotificationBell({ lifeStage, currency }) {
	const { t } = useWazenLocale();
	const enabled = canCalculateZakat(lifeStage);
	const { result } = useZakat();
	if (!enabled) return null;
	const due = result?.status === "due";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative",
			"aria-label": t("zakatStatus"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsIcon, {
				className: "size-4",
				strokeWidth: ICON_STROKE
			}), due ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute end-2 top-2 size-2 rounded-full bg-primary",
				"aria-hidden": true
			}) : null]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
		align: "end",
		className: "w-[min(20rem,calc(100vw-1rem))] text-sm",
		children: !result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "…"
		}) : due ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-primary",
					children: t("zakatDueTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: t("zakatDueBody")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [
						t("zakatRemaining"),
						": ",
						formatMoney(result.remaining, currency)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/zakat",
					className: "inline-block text-primary underline underline-offset-4",
					children: t("zakat")
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: t("zakatNotDueTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: result.needsStartDate ? t("zakatNeedsStartDate") : result.status === "below_nisab" ? t("zakatBelowNisab") : result.status === "recorded" ? t("zakatRecordedBody") : t("zakatHawlIncomplete")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/zakat",
					className: "inline-block text-primary underline underline-offset-4",
					children: t("zakat")
				})
			]
		})
	})] });
}
var NAV = [
	{
		to: "/dashboard",
		label: "overview",
		icon: DashboardIcon
	},
	{
		to: "/learn",
		label: "learnNav",
		icon: LearnIcon,
		childrenOnly: true
	},
	{
		to: "/recurring",
		label: "recurringNav",
		icon: ScheduledIcon
	},
	{
		to: "/documents",
		label: "documentsNav",
		icon: DocumentIcon
	},
	{
		to: "/assets",
		label: "assets",
		icon: PortfolioIcon,
		adultsOnly: true
	},
	{
		to: "/zakat",
		label: "zakat",
		icon: ZakatIcon,
		adultsOnly: true
	},
	{
		to: "/settings",
		label: "settings",
		icon: SettingsIcon
	}
];
function WazenMark({ className, size = 40 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenLogo, {
		size,
		className: cn("transition-opacity hover:opacity-85", className)
	});
}
function AppShell({ children }) {
	const location = useLocation();
	const signOut = useSignOut();
	const { data: profile } = useProfile();
	const { t } = useWazenLocale();
	const nav = NAV.filter((item) => (!("adultsOnly" in item && item.adultsOnly) || canOwnAssets(profile?.life_stage)) && (!("childrenOnly" in item && item.childrenOnly) || profile?.life_stage === "child"));
	const SETTINGS_GROUP = [
		"/settings",
		"/profile",
		"/subscription"
	];
	const isActive = (to) => to === "/settings" ? SETTINGS_GROUP.includes(location.pathname) : location.pathname === to;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("wazen-app-canvas min-h-screen", profile?.life_stage === "teenager" && "stage-teen", profile?.life_stage === "university_student" && "stage-university"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/70 bg-card/85 shadow-soft backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid h-[4.5rem] max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3 lg:gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "shrink-0",
							"aria-label": t("overviewAria"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenMark, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden min-w-0 items-center gap-2 lg:flex xl:gap-6",
							"aria-label": t("primaryNav"),
							children: nav.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to,
								className: cn("relative flex h-[4.5rem] min-w-0 items-center gap-1.5 border-b-2 px-1 text-xs font-semibold transition-colors xl:gap-2 xl:text-sm", isActive(to) ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: t(label)
								})]
							}, to))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-0.5 sm:gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanBadge, {
								className: "hidden lg:inline-flex",
								size: "sm"
							}),
							profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZakatNotificationBell, {
								lifeStage: profile.life_stage,
								currency: profile.base_currency
							}) : null,
							profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								"data-tour": "profile",
								title: `${firstNameOf(profile.full_name)} — ${t("viewProfileTitle")}`,
								className: "wazen-interactive rounded-full outline-hidden hover:wazen-interactive-hover focus-visible:ring-2 focus-visible:ring-ring/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenAvatar, {
									fullName: profile.full_name,
									gender: profile.gender,
									lifeStage: profile.life_stage,
									avatarUrl: profile.avatar_url,
									size: 36
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: signOut,
								variant: "ghost",
								size: "icon",
								title: t("signOut"),
								"aria-label": t("signOut"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutIcon, {
									className: "size-4 rtl:-scale-x-100",
									strokeWidth: ICON_STROKE
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenLocaleProvider, {
				language: profile?.language,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto max-w-6xl px-3 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-6 min-[375px]:px-4 sm:px-6 sm:pt-9 lg:px-8 lg:pb-14",
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-lifted backdrop-blur-xl lg:hidden",
				"aria-label": t("mobileNav"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-md items-stretch",
					style: { gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))` },
					children: nav.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						className: cn("relative flex min-h-[4.25rem] min-w-0 flex-col items-center justify-center gap-1 px-0.5 py-2 text-center text-[0.625rem] font-semibold leading-tight transition-colors", isActive(to) ? "bg-primary/5 text-primary after:absolute after:left-1/2 after:top-0 after:h-0.5 after:w-8 after:-translate-x-1/2 after:rounded-full after:bg-primary" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: ICON_STROKE
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "line-clamp-2",
							children: t(label)
						})]
					}, to))
				})
			})
		]
	});
}
//#endregion
export { StocksIcon as $, useSaveZakatCalculation as $t, IncomeIcon as A, listLearningProgressFn as At, ProfileIcon as B, useAddParentPaidExpense as Bt, GOLD_PURITIES as C, deleteRecurringItemFn as Ct, GoalsIcon as D, getLearningProfileFn as Dt, GiveIcon as E, gainPercentOf as Et, MetalsIcon as F, recordLearningActivityFn as Ft, RefundIcon as G, useDeleteAsset as Gt, QuizIcon as H, useAssets as Ht, MoreIcon as I, saveRecurringItemFn as It, SavingsIcon as J, useMonthlyBudget as Jt, RetryIcon as K, useFamilySummary as Kt, PlanBadge as L, startLearningChallengeFn as Lt, LearnIcon as M, marketValue as Mt, LockedIcon as N, portfolioSeries as Nt, HOLDING_PURPOSES as O, lifeStageForAge as Ot, LossIcon as P, portfolioTotals as Pt, SpinnerIcon as Q, useSaveAsset as Qt, PortfolioIcon as R, toggleRecurringItemFn as Rt, ForwardIcon as S, currencyName as St, GameIcon as T, gainOf as Tt, ReceiptIcon as U, useCreateGoal as Ut, PropertyIcon as V, useAssetValuations as Vt, RecommendIcon as W, useCreateTransaction as Wt, SignOutIcon as X, useRecordZakatPayment as Xt, ScheduledIcon as Y, useParentPaidForMe as Yt, SpendIcon as Z, useRecurringItems as Zt, EditIcon as _, convertCurrencyFn as _t, AlertIcon as a, useZakat as an, WazenLogo as at, ExpensesIcon as b, createSsrRpc as bt, BankIcon as c, ZakatIcon as ct, CameraIcon as d, attachFxSnapshot as dt, useSaveZakatStartDate as en, StreakIcon as et, CategoryChartIcon as f, calculateAge as ft, DocumentIcon as g, checkInLearningChallengeFn as gt, DeleteIcon as h, cancelPremiumSubscription as ht, AiIcon as i, useUpsertMonthlyBudget as in, WazenAvatar as it, LanguageIcon as j, listRecurringItemsFn as jt, ICON_STROKE as k, listLearningChallengesFn as kt, BudgetIcon as l, accountTypeFor as lt, CheckIcon as m, canOwnAssets as mt, ASSET_KINDS as n, useSubscriptionAccess as nn, TrendChartIcon as nt, AnalyticsIcon as o, useZakatCalculations as on, WazenMark as ot, ChallengesIcon as p, canCalculateZakat as pt, RewardsIcon as q, useGoals as qt, AddIcon as r, useTransactions as rn, UploadIcon as rt, AppShell as s, valuationsFor as sn, ZAKAT_REFERENCE_URL as st, ADULT_LIFE_STAGES as t, useServerFn as tn, StudentIcon as tt, CURRENCIES as u, annualRentOf as ut, EmergencyFundIcon as v, costBasis as vt, GainIcon as w, firstNameOf as wt, FamilyIcon as x, createTransactionFn as xt, ExpandIcon as y, createCheckoutSessionFn as yt, PremiumIcon as z, unitOf as zt };
