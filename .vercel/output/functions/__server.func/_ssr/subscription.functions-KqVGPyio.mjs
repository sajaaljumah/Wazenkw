import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { a as objectType, i as numberType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { d as requireSupabaseAuth, i as PREMIUM_FEATURES, o as computeFamilyTotal, s as findPrice } from "./subscription-fUSurh1V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subscription.functions-KqVGPyio.js
/** Authoritative entitlements for the signed-in user, computed on the server. */
var getMyEntitlements_createServerFn_handler = createServerRpc({
	id: "47a39c067d064e4985c476cb2282738deccd4b54c915a8a730f4ac5dda8b202a",
	name: "getMyEntitlements",
	filename: "src/lib/subscription.functions.ts"
}, (opts) => getMyEntitlements.__executeServer(opts));
var getMyEntitlements = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyEntitlements_createServerFn_handler, async ({ context }) => {
	const { loadEntitlements } = await import("./subscription.server-CKtb24YT.mjs");
	return loadEntitlements(context.supabase, context.userId);
});
var checkFeatureAccess_createServerFn_handler = createServerRpc({
	id: "b6705a9c73432a9ef18c84e028d2e70a91d7beb066b36375e5ae50962dddd18a",
	name: "checkFeatureAccess",
	filename: "src/lib/subscription.functions.ts"
}, (opts) => checkFeatureAccess.__executeServer(opts));
var checkFeatureAccess = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({ feature: enumType(PREMIUM_FEATURES) }).parse(data)).handler(checkFeatureAccess_createServerFn_handler, async ({ context, data }) => {
	const { loadEntitlements } = await import("./subscription.server-CKtb24YT.mjs");
	return {
		allowed: (await loadEntitlements(context.supabase, context.userId)).features.includes(data.feature),
		feature: data.feature
	};
});
var getSubscriptionQuote_createServerFn_handler = createServerRpc({
	id: "6b3b2f739974aee15bf0f15a5765dee7e74d54517c6e0dac7b947e069e2c9463",
	name: "getSubscriptionQuote",
	filename: "src/lib/subscription.functions.ts"
}, (opts) => getSubscriptionQuote.__executeServer(opts));
var getSubscriptionQuote = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	kind: enumType(["individual", "family"]).default("family"),
	billingPeriod: enumType(["monthly", "yearly"]).default("monthly"),
	children: numberType().int().min(0).max(20).optional()
}).parse(data ?? {})).handler(getSubscriptionQuote_createServerFn_handler, async ({ context, data }) => {
	const { loadEntitlements } = await import("./subscription.server-CKtb24YT.mjs");
	const entitlements = await loadEntitlements(context.supabase, context.userId);
	const price = findPrice(entitlements.prices, data.kind, data.billingPeriod);
	const includedChildren = price?.included_child_count ?? 0;
	const totalChildren = data.children ?? entitlements.family?.childCount ?? 0;
	const additionalChildren = data.kind === "family" ? Math.max(0, totalChildren - includedChildren) : 0;
	const money = computeFamilyTotal(price, additionalChildren);
	return {
		kind: data.kind,
		billingPeriod: data.billingPeriod,
		currency: money.currency,
		base: money.base,
		additionalChildren,
		additionalChildAmount: price?.additional_child_amount ?? 0,
		additional: money.additional,
		total: money.total,
		includedParentCount: price?.included_parent_count ?? 1,
		includedChildCount: includedChildren
	};
});
var createCheckoutSessionFn_createServerFn_handler = createServerRpc({
	id: "006e78a88e60586c3473369e879f6a8b6b2522c89c51faef604ce62dabec89f1",
	name: "createCheckoutSessionFn",
	filename: "src/lib/subscription.functions.ts"
}, (opts) => createCheckoutSessionFn.__executeServer(opts));
var createCheckoutSessionFn = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	kind: enumType(["individual", "family"]).default("individual"),
	billingPeriod: enumType(["monthly", "yearly"]).default("monthly"),
	additionalChildren: numberType().int().min(0).max(20).default(0),
	successUrl: stringType().optional(),
	cancelUrl: stringType().optional()
}).parse(data ?? {})).handler(createCheckoutSessionFn_createServerFn_handler, async ({ context, data }) => {
	const { requireBillingOwner } = await import("./subscription.server-CKtb24YT.mjs");
	const current = await requireBillingOwner(context.supabase, context.userId);
	const { createCheckoutSession } = await import("./stripe.server-CEV2JBoH.mjs");
	const session = await createCheckoutSession({
		userId: context.userId,
		userEmail: "userEmail" in context && typeof context.userEmail === "string" ? context.userEmail : null,
		kind: data.kind,
		billingPeriod: data.billingPeriod,
		additionalChildren: data.additionalChildren,
		familyId: current.family?.familyId ?? null,
		successUrl: data.successUrl,
		cancelUrl: data.cancelUrl
	});
	return {
		sessionId: session.id,
		url: session.url
	};
});
var startPremiumUpgrade_createServerFn_handler = createServerRpc({
	id: "732f28acfe98b74a2fa2f04ef644489228a94af066db16bbdf151946f2f1ea98",
	name: "startPremiumUpgrade",
	filename: "src/lib/subscription.functions.ts"
}, (opts) => startPremiumUpgrade.__executeServer(opts));
var startPremiumUpgrade = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	kind: enumType(["individual", "family"]).default("individual"),
	billingPeriod: enumType(["monthly", "yearly"]).default("monthly"),
	additionalChildren: numberType().int().min(0).max(20).default(0)
}).parse(data ?? {})).handler(startPremiumUpgrade_createServerFn_handler, async ({ context, data }) => {
	const { activatePremium } = await import("./subscription.server-CKtb24YT.mjs");
	return {
		status: "activated",
		url: null,
		entitlements: await activatePremium(context.supabase, context.userId, {
			kind: data.kind,
			billingPeriod: data.billingPeriod,
			additionalChildren: data.additionalChildren
		})
	};
});
var cancelPremiumSubscription_createServerFn_handler = createServerRpc({
	id: "6537acec683b83cd4e54db140fba98eff29bb08f2206cdd6173e7b23f3129621",
	name: "cancelPremiumSubscription",
	filename: "src/lib/subscription.functions.ts"
}, (opts) => cancelPremiumSubscription.__executeServer(opts));
var cancelPremiumSubscription = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(cancelPremiumSubscription_createServerFn_handler, async ({ context }) => {
	try {
		const { getCollection } = await import("./mongodb.server-B1VXbgjA.mjs");
		const mongoSub = await (await getCollection("subscriptions")).findOne({ user_id: context.userId });
		if (mongoSub?.stripe_subscription_id) {
			const { cancelSubscription } = await import("./stripe.server-CEV2JBoH.mjs");
			await cancelSubscription(mongoSub.stripe_subscription_id, true);
			const { loadEntitlements } = await import("./subscription.server-CKtb24YT.mjs");
			return {
				status: "cancelled",
				entitlements: await loadEntitlements(context.supabase, context.userId)
			};
		}
	} catch {}
	const { cancelPremium } = await import("./subscription.server-CKtb24YT.mjs");
	return {
		status: "cancelled",
		entitlements: await cancelPremium(context.supabase, context.userId)
	};
});
var openBillingPortal_createServerFn_handler = createServerRpc({
	id: "2674e01b6221091bd8875e27066684bf0cfb025f802d69822142012f59ffdc9b",
	name: "openBillingPortal",
	filename: "src/lib/subscription.functions.ts"
}, (opts) => openBillingPortal.__executeServer(opts));
var openBillingPortal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(openBillingPortal_createServerFn_handler, async ({ context }) => {
	const { requireBillingOwner } = await import("./subscription.server-CKtb24YT.mjs");
	await requireBillingOwner(context.supabase, context.userId);
	return {
		status: "not_configured",
		url: null,
		message: "Subscription management is not connected yet."
	};
});
//#endregion
export { cancelPremiumSubscription_createServerFn_handler, checkFeatureAccess_createServerFn_handler, createCheckoutSessionFn_createServerFn_handler, getMyEntitlements_createServerFn_handler, getSubscriptionQuote_createServerFn_handler, openBillingPortal_createServerFn_handler, startPremiumUpgrade_createServerFn_handler };
