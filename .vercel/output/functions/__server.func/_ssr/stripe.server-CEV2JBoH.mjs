import { getCollection } from "./mongodb.server-B1VXbgjA.mjs";
import { t as stripe_esm_worker_default } from "../_libs/stripe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stripe.server-CEV2JBoH.js
/**
* Stripe Server Service for Wazen (Test Mode Only).
*
* Runs strictly on the server backend. Never imported into client bundles.
* All requests to Stripe are made server-to-server.
* Stripe credentials exist only in server environment variables.
* Never exposes the Stripe secret key, credentials, or internal exceptions.
*/
/**
* Returns an initialized Stripe client for TEST MODE only.
* Strictly verifies and refuses live mode keys to prevent charging real money.
*/
function getStripeClient() {
	const secretKey = process.env.STRIPE_SECRET_KEY;
	if (!secretKey || secretKey.trim() === "") throw new Error("STRIPE_SECRET_KEY is not configured in the server environment.");
	const trimmed = secretKey.trim();
	if (!trimmed.startsWith("sk_test_")) throw new Error("Security Constraint: Only Stripe TEST MODE (sk_test_*) is permitted. Refusing to operate in live mode.");
	return new stripe_esm_worker_default(trimmed);
}
/**
* Retrieves or creates a Stripe customer safely and idempotently.
* Checks MongoDB and Supabase to reuse an existing Stripe Customer ID,
* preventing duplicate customers for the same Wazen user.
*/
async function getOrCreateStripeCustomer(userId, userEmail) {
	const stripe = getStripeClient();
	try {
		const mongoSub = await (await getCollection("subscriptions")).findOne({ user_id: userId });
		if (mongoSub?.stripe_customer_id) try {
			const existing = await stripe.customers.retrieve(mongoSub.stripe_customer_id);
			if (!existing.deleted) return existing.id;
		} catch {}
	} catch {}
	try {
		const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
		const { data: supaSub } = await supabaseAdmin.from("subscriptions").select("stripe_customer_id").eq("user_id", userId).maybeSingle();
		if (supaSub?.stripe_customer_id) try {
			const existing = await stripe.customers.retrieve(supaSub.stripe_customer_id);
			if (!existing.deleted) return existing.id;
		} catch {}
	} catch {}
	try {
		const search = await stripe.customers.search({ query: `metadata['userId']:'${userId}'` });
		if (search.data.length > 0 && !search.data[0].deleted) return search.data[0].id;
	} catch {}
	return (await stripe.customers.create({
		email: userEmail || void 0,
		metadata: {
			userId,
			app: "Wazen"
		}
	})).id;
}
/**
* Creates a Stripe Checkout Session in TEST mode for Wazen subscription.
* Does NOT activate Premium access merely because Checkout was opened.
*/
async function createCheckoutSession(options) {
	const stripe = getStripeClient();
	const customerId = await getOrCreateStripeCustomer(options.userId, options.userEmail);
	const premiumPriceId = process.env.STRIPE_PREMIUM_PRICE_ID;
	const familyPriceId = process.env.STRIPE_FAMILY_PRICE_ID;
	const additionalChildPriceId = process.env.STRIPE_FAMILY_ADDITIONAL_CHILD_PRICE_ID;
	const lineItems = [];
	if (options.kind === "individual") {
		if (!premiumPriceId) throw new Error("STRIPE_PREMIUM_PRICE_ID is not configured in server environment.");
		lineItems.push({
			price: premiumPriceId,
			quantity: 1
		});
	} else {
		if (!familyPriceId) throw new Error("STRIPE_FAMILY_PRICE_ID is not configured in server environment.");
		lineItems.push({
			price: familyPriceId,
			quantity: 1
		});
		const extraChildren = options.additionalChildren ?? 0;
		if (extraChildren > 0) {
			if (!additionalChildPriceId) throw new Error("STRIPE_FAMILY_ADDITIONAL_CHILD_PRICE_ID is not configured in server environment.");
			lineItems.push({
				price: additionalChildPriceId,
				quantity: extraChildren
			});
		}
	}
	const baseUrl = process.env.APP_URL || "https://wazen.app";
	const successUrl = options.successUrl || `${baseUrl}/subscription?session_id={CHECKOUT_SESSION_ID}&success=true`;
	const cancelUrl = options.cancelUrl || `${baseUrl}/subscription?canceled=true`;
	const metadata = {
		userId: options.userId,
		kind: options.kind,
		billingPeriod: options.billingPeriod || "monthly",
		familyId: options.familyId || "",
		additionalChildren: String(options.additionalChildren || 0)
	};
	const session = await stripe.checkout.sessions.create({
		mode: "subscription",
		customer: customerId,
		line_items: lineItems,
		client_reference_id: options.userId,
		metadata,
		subscription_data: { metadata },
		success_url: successUrl,
		cancel_url: cancelUrl
	});
	try {
		await (await getCollection("subscriptions")).updateOne({ user_id: options.userId }, {
			$set: {
				stripe_customer_id: customerId,
				stripe_checkout_session_id: session.id,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			},
			$setOnInsert: {
				_id: options.userId,
				id: options.userId,
				user_id: options.userId,
				plan_id: "free",
				status: "active",
				billing_cycle: options.billingPeriod || "monthly",
				current_period_start: (/* @__PURE__ */ new Date()).toISOString(),
				current_period_end: (/* @__PURE__ */ new Date()).toISOString(),
				cancel_at_period_end: false,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			}
		}, { upsert: true });
	} catch (err) {}
	return session;
}
/**
* Cancels a subscription through Stripe.
* Prefers cancel_at_period_end so access remains valid until billing period ends.
*/
async function cancelSubscription(subscriptionId, cancelAtPeriodEnd = true) {
	const stripe = getStripeClient();
	let subscription;
	if (cancelAtPeriodEnd) subscription = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
	else subscription = await stripe.subscriptions.cancel(subscriptionId);
	const userId = subscription.metadata?.userId;
	if (userId) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const periodEnd = subscription.current_period_end ? (/* @__PURE__ */ new Date(subscription.current_period_end * 1e3)).toISOString() : now;
		try {
			await (await getCollection("subscriptions")).updateOne({ user_id: userId }, { $set: {
				cancel_at_period_end: cancelAtPeriodEnd,
				cancelled_at: now,
				current_period_end: periodEnd,
				status: cancelAtPeriodEnd ? "active" : "canceled",
				plan_id: cancelAtPeriodEnd ? subscription.metadata?.kind === "family" ? "family" : "individual" : "free",
				updated_at: now
			} });
		} catch {}
		try {
			const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
			await supabaseAdmin.from("subscriptions").update({
				cancel_at_period_end: cancelAtPeriodEnd,
				cancelled_at: now,
				current_period_end: periodEnd,
				...cancelAtPeriodEnd ? {} : {
					plan: "free",
					status: "cancelled"
				}
			}).eq("user_id", userId);
		} catch {}
	}
	return subscription;
}
/**
* Verifies and constructs a Stripe Webhook Event from raw payload and signature.
* Uses constructEventAsync for compatibility with Web Crypto / Cloudflare Workers / modern edge runtimes.
*/
async function constructWebhookEvent(rawPayload, signature) {
	const stripe = getStripeClient();
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret || webhookSecret.trim() === "") throw new Error("STRIPE_WEBHOOK_SECRET is not configured in the server environment.");
	return stripe.webhooks.constructEventAsync(rawPayload, signature, webhookSecret.trim());
}
/**
* Synchronizes verified subscription state to both MongoDB Atlas and Supabase.
* Enforces Wazen business rules:
* - Immediate activation on payment
* - Family members inherit Family Premium
* - Children/teens never pay directly
* - Clean return to Free on cancellation/expiry
*/
async function syncSubscriptionState(params) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const isPremium = params.plan !== "free" && params.status === "active";
	const start = params.periodStart || now;
	const end = params.periodEnd || new Date(Date.now() + 2592e6).toISOString();
	try {
		await (await getCollection("subscriptions")).updateOne({ $or: [{ user_id: params.userId }, { _id: params.userId }] }, {
			$set: {
				plan_id: params.plan,
				plan: isPremium ? "premium" : "free",
				status: params.status,
				subscription_type: params.plan === "family" ? "family" : "individual",
				billing_cycle: "monthly",
				billing_period: "monthly",
				current_period_start: start,
				current_period_end: end,
				cancel_at_period_end: params.cancelAtPeriodEnd ?? false,
				stripe_customer_id: params.stripeCustomerId || null,
				stripe_subscription_id: params.stripeSubscriptionId || null,
				stripe_checkout_session_id: params.stripeCheckoutSessionId || null,
				stripe_price_id: params.stripePriceId || null,
				family_id: params.familyId || null,
				additional_child_count: params.additionalChildCount ?? 0,
				cancelled_at: params.status === "canceled" ? now : null,
				updated_at: now
			},
			$setOnInsert: {
				_id: params.userId,
				id: params.userId,
				user_id: params.userId,
				created_at: now
			}
		}, { upsert: true });
	} catch (err) {
		console.error("MongoDB subscription sync error:", err instanceof Error ? err.message : String(err));
	}
	if (process.env.SUPABASE_SERVICE_ROLE_KEY) try {
		const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
		await supabaseAdmin.from("subscriptions").upsert({
			user_id: params.userId,
			plan: isPremium ? "premium" : "free",
			status: params.status === "canceled" ? "cancelled" : params.status,
			subscription_type: params.plan === "family" ? "family" : "individual",
			family_id: params.familyId || null,
			billing_period: "monthly",
			stripe_customer_id: params.stripeCustomerId || null,
			stripe_subscription_id: params.stripeSubscriptionId || null,
			stripe_price_id: params.stripePriceId || null,
			included_parent_count: params.plan === "family" ? 2 : 1,
			included_child_count: params.plan === "family" ? 4 : 0,
			additional_child_count: params.additionalChildCount ?? 0,
			started_at: start,
			current_period_start: start,
			current_period_end: end,
			cancel_at_period_end: params.cancelAtPeriodEnd ?? false,
			cancelled_at: params.status === "canceled" ? now : null
		}, { onConflict: "user_id" });
		if (params.plan === "family" && params.familyId) await supabaseAdmin.from("family_members").update({ seat_suspended: false }).eq("family_id", params.familyId);
	} catch (err) {
		console.error("Supabase subscription sync error:", err instanceof Error ? err.message : String(err));
	}
}
/**
* Handles verified Stripe Webhook Events idempotently.
*/
async function handleStripeWebhook(event) {
	try {
		if (await (await getCollection("stripe_events")).findOne({ _id: event.id })) return {
			received: true,
			eventId: event.id,
			type: event.type,
			status: "already_processed"
		};
	} catch {}
	const stripe = getStripeClient();
	switch (event.type) {
		case "checkout.session.completed": {
			const session = event.data.object;
			const userId = session.client_reference_id || session.metadata?.userId;
			if (!userId) break;
			const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id || null;
			const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id || null;
			const kind = session.metadata?.kind === "family" ? "family" : "individual";
			const familyId = session.metadata?.familyId || null;
			const additionalChildren = parseInt(session.metadata?.additionalChildren || "0", 10) || 0;
			let periodStart = (/* @__PURE__ */ new Date()).toISOString();
			let periodEnd = new Date(Date.now() + 2592e6).toISOString();
			let priceId = null;
			if (subscriptionId) try {
				const sub = await stripe.subscriptions.retrieve(subscriptionId);
				if (sub.current_period_start) periodStart = (/* @__PURE__ */ new Date(sub.current_period_start * 1e3)).toISOString();
				if (sub.current_period_end) periodEnd = (/* @__PURE__ */ new Date(sub.current_period_end * 1e3)).toISOString();
				priceId = sub.items?.data?.[0]?.price?.id || null;
			} catch {}
			await syncSubscriptionState({
				userId,
				plan: kind,
				status: "active",
				stripeCustomerId: customerId,
				stripeSubscriptionId: subscriptionId,
				stripeCheckoutSessionId: session.id,
				stripePriceId: priceId,
				familyId,
				additionalChildCount: additionalChildren,
				periodStart,
				periodEnd,
				cancelAtPeriodEnd: false
			});
			break;
		}
		case "customer.subscription.created":
		case "customer.subscription.updated": {
			const sub = event.data.object;
			const userId = sub.metadata?.userId;
			const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id || null;
			let resolvedUserId = userId;
			if (!resolvedUserId) try {
				const found = await (await getCollection("subscriptions")).findOne({ $or: [{ stripe_subscription_id: sub.id }, { stripe_customer_id: customerId }] });
				if (found) resolvedUserId = found.user_id;
			} catch {}
			if (!resolvedUserId) break;
			const kind = sub.metadata?.kind === "family" ? "family" : "individual";
			const familyId = sub.metadata?.familyId || null;
			const additionalChildren = parseInt(sub.metadata?.additionalChildren || "0", 10) || 0;
			const priceId = sub.items?.data?.[0]?.price?.id || null;
			const isActive = sub.status === "active" || sub.status === "trialing";
			const isPastDue = sub.status === "past_due";
			const status = isActive ? "active" : isPastDue ? "past_due" : "canceled";
			const plan = isActive ? kind : "free";
			const periodStart = sub.current_period_start ? (/* @__PURE__ */ new Date(sub.current_period_start * 1e3)).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
			const periodEnd = sub.current_period_end ? (/* @__PURE__ */ new Date(sub.current_period_end * 1e3)).toISOString() : new Date(Date.now() + 2592e6).toISOString();
			await syncSubscriptionState({
				userId: resolvedUserId,
				plan,
				status,
				stripeCustomerId: customerId,
				stripeSubscriptionId: sub.id,
				stripePriceId: priceId,
				familyId,
				additionalChildCount: additionalChildren,
				periodStart,
				periodEnd,
				cancelAtPeriodEnd: sub.cancel_at_period_end
			});
			break;
		}
		case "customer.subscription.deleted": {
			const sub = event.data.object;
			const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id || null;
			let resolvedUserId = sub.metadata?.userId;
			if (!resolvedUserId) try {
				const found = await (await getCollection("subscriptions")).findOne({ $or: [{ stripe_subscription_id: sub.id }, { stripe_customer_id: customerId }] });
				if (found) resolvedUserId = found.user_id;
			} catch {}
			if (resolvedUserId) await syncSubscriptionState({
				userId: resolvedUserId,
				plan: "free",
				status: "canceled",
				stripeCustomerId: customerId,
				stripeSubscriptionId: sub.id,
				cancelAtPeriodEnd: false
			});
			break;
		}
	}
	try {
		await (await getCollection("stripe_events")).insertOne({
			_id: event.id,
			id: event.id,
			type: event.type,
			processed_at: (/* @__PURE__ */ new Date()).toISOString(),
			livemode: event.livemode
		});
	} catch {}
	return {
		received: true,
		eventId: event.id,
		type: event.type,
		status: "processed"
	};
}
//#endregion
export { cancelSubscription, constructWebhookEvent, createCheckoutSession, handleStripeWebhook };
