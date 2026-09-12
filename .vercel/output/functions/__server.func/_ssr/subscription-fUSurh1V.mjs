import { t as getRequest } from "./server-DuGX_xsT.mjs";
import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subscription-fUSurh1V.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const SUPABASE_URL = process.env["SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = process.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	const request = getRequest();
	if (!request?.headers) throw new Error("Unauthorized: No request headers available");
	const authHeader = request.headers.get("authorization");
	if (!authHeader) throw new Error("Unauthorized: No authorization header provided");
	if (!authHeader.startsWith("Bearer ")) throw new Error("Unauthorized: Only Bearer tokens are supported");
	const token = authHeader.replace("Bearer ", "");
	if (!token) throw new Error("Unauthorized: No token provided");
	if (token.split(".").length !== 3) throw new Error("Unauthorized: Invalid token");
	const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: {
			fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
			headers: { Authorization: `Bearer ${token}` }
		},
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
	const { data, error } = await supabase.auth.getClaims(token);
	if (error || !data?.claims) throw new Error("Unauthorized: Invalid token");
	if (!data.claims.sub) throw new Error("Unauthorized: No user ID found in token");
	return next({ context: {
		supabase,
		userId: data.claims.sub,
		claims: data.claims
	} });
});
/** Fallback used only when the price table cannot be read (never for billing). */
var FALLBACK_PRICES = [{
	key: "individual_monthly",
	subscription_type: "individual",
	billing_period: "monthly",
	amount: 2.5,
	additional_child_amount: 0,
	currency: "KWD",
	included_parent_count: 1,
	included_child_count: 0,
	active: true
}, {
	key: "family_monthly",
	subscription_type: "family",
	billing_period: "monthly",
	amount: 5,
	additional_child_amount: 1,
	currency: "KWD",
	included_parent_count: 2,
	included_child_count: 4,
	active: true
}];
function findPrice(prices, kind, period = "monthly") {
	return prices.find((p) => p.subscription_type === kind && p.billing_period === period && p.active) ?? FALLBACK_PRICES.find((p) => p.subscription_type === kind && p.billing_period === period) ?? null;
}
/** Family base subscription + additional children fees. */
function computeFamilyTotal(price, additionalChildren) {
	const base = price?.amount ?? 0;
	const perChild = price?.additional_child_amount ?? 0;
	const additional = Math.max(0, additionalChildren) * perChild;
	return {
		base,
		additional,
		total: base + additional,
		currency: price?.currency ?? "KWD"
	};
}
function formatMoney(amount, currency = "KWD") {
	return `${amount.toFixed(3)} ${currency}`;
}
/** Feature keys guarded by the premium plan. Server-side checks use these too. */
var PREMIUM_FEATURES = [
	"advanced_analytics",
	"ai_advisor",
	"investments",
	"zakat_planner",
	"unlimited_goals",
	"family_insights",
	"data_export"
];
/** Free-plan quotas. Enforce these server-side when the modules are built. */
var FREE_PLAN_LIMITS = {
	goals: 3,
	budgets: 1,
	recurring_items: 5
};
var FREE_ENTITLEMENTS = {
	plan: "free",
	status: "active",
	isPremium: false,
	isCancelling: false,
	needsAttention: false,
	features: [],
	limits: { ...FREE_PLAN_LIMITS },
	startedAt: null,
	currentPeriodEnd: null,
	renewalAt: null,
	trialEndsAt: null,
	source: "none",
	subscriptionKind: null,
	billingPeriod: null,
	seatRole: null,
	seatKind: null,
	isOwner: false,
	canSubscribe: true,
	canManageBilling: false,
	family: null,
	prices: FALLBACK_PRICES
};
/** Single source of truth for "is this subscription currently premium?". */
function isPremiumActive(sub) {
	if (!sub || sub.plan !== "premium") return false;
	if (sub.status !== "active" && sub.status !== "trialing") return false;
	if (sub.current_period_end && new Date(sub.current_period_end) <= /* @__PURE__ */ new Date()) return false;
	return true;
}
/**
* Which family seats the subscription actually pays for: every included parent,
* every included child, and additional children up to `additional_child_count`.
* Mirrors `private.is_family_seat_entitled` in the database.
*/
function resolveFamilySeats(members, sub) {
	const premium = isPremiumActive(sub);
	const includedParents = sub?.included_parent_count ?? 2;
	const paidAdditional = sub?.additional_child_count ?? 0;
	const byDate = [...members].sort((a, b) => a.created_at.localeCompare(b.created_at));
	let parentIndex = 0;
	let additionalIndex = 0;
	return byDate.map((m) => {
		let entitled = false;
		const suspended = m.seat_suspended === true;
		if (m.member_role === "parent") {
			parentIndex += 1;
			entitled = premium && parentIndex <= includedParents;
		} else if (m.seat_kind === "included") entitled = premium;
		else {
			additionalIndex += 1;
			entitled = premium && additionalIndex <= paidAdditional;
		}
		return {
			userId: m.user_id,
			role: m.member_role,
			seatKind: m.seat_kind,
			entitled: entitled && !suspended
		};
	});
}
function summariseFamily(familyId, members, sub) {
	const seats = resolveFamilySeats(members, sub);
	const parents = seats.filter((s) => s.role === "parent");
	const children = seats.filter((s) => s.role === "child");
	const includedChildCount = sub?.included_child_count ?? 4;
	const includedChildrenUsed = children.filter((c) => c.seatKind === "included").length;
	return {
		familyId,
		ownerUserId: sub?.user_id ?? null,
		includedParentCount: sub?.included_parent_count ?? 2,
		includedChildCount,
		additionalChildCount: sub?.additional_child_count ?? 0,
		parentCount: parents.length,
		childCount: children.length,
		entitledChildCount: children.filter((c) => c.entitled).length,
		remainingIncludedChildSeats: Math.max(0, includedChildCount - includedChildrenUsed),
		seats
	};
}
/**
* Combines an individual subscription and any family subscription into one
* authoritative entitlement view.
*/
function buildEntitlements(input) {
	const family = input.familyId !== null ? summariseFamily(input.familyId, input.familyMembers, input.familySubscription) : null;
	const seat = family?.seats.find((s) => s.userId === input.userId) ?? null;
	const ownPremium = isPremiumActive(input.ownSubscription);
	const familyPremium = !!seat?.entitled;
	const premium = ownPremium || familyPremium;
	const active = ownPremium ? input.ownSubscription : familyPremium ? input.familySubscription : input.familySubscription ?? input.ownSubscription;
	const source = ownPremium ? "individual" : familyPremium ? "family" : input.familyId ? "family" : "none";
	const isChild = input.familyRole === "child";
	const isOwner = !!active && active.user_id === input.userId;
	return {
		plan: premium ? "premium" : "free",
		status: active?.status ?? "active",
		isPremium: premium,
		isCancelling: premium && !!active?.cancel_at_period_end,
		needsAttention: active?.status === "past_due",
		features: premium ? [...PREMIUM_FEATURES] : [],
		limits: premium ? {
			goals: null,
			budgets: null,
			recurring_items: null
		} : { ...FREE_PLAN_LIMITS },
		startedAt: active?.started_at ?? null,
		currentPeriodEnd: active?.current_period_end ?? null,
		renewalAt: active?.renewal_at ?? active?.current_period_end ?? null,
		trialEndsAt: active?.trial_ends_at ?? null,
		source,
		subscriptionKind: active?.subscription_type ?? (input.familyId ? "family" : null),
		billingPeriod: active?.billing_period ?? null,
		seatRole: input.familyRole,
		seatKind: input.familySeatKind,
		isOwner,
		canSubscribe: !isChild,
		canManageBilling: !isChild && (isOwner || input.familyRole === "parent"),
		family,
		prices: input.prices.length ? input.prices : FALLBACK_PRICES
	};
}
function hasFeature(entitlements, feature) {
	return entitlements.features.includes(feature);
}
`${FREE_PLAN_LIMITS.goals}`;
function dateLocale() {
	return typeof document !== "undefined" && document.documentElement.lang === "en" ? "en-KW" : "ar-KW";
}
function formatPlanDate(value) {
	if (!value) return "—";
	return new Date(value).toLocaleDateString(dateLocale(), {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
//#endregion
export { buildEntitlements as a, formatMoney as c, requireSupabaseAuth as d, PREMIUM_FEATURES as i, formatPlanDate as l, FREE_ENTITLEMENTS as n, computeFamilyTotal as o, FREE_PLAN_LIMITS as r, findPrice as s, FALLBACK_PRICES as t, hasFeature as u };
