import { a as buildEntitlements, s as findPrice, t as FALLBACK_PRICES } from "./subscription-fUSurh1V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subscription.server-CKtb24YT.js
/**
* Maps a MongoDB subscription document into Wazen's canonical Subscription model.
* Handles both MongoDB Atlas field conventions (plan_id, billing_cycle) and
* Supabase field conventions (plan, subscription_type, billing_period).
*/
function mapMongoSubDocToSubscription(doc) {
	const isPremium = doc.plan === "premium" || doc.plan_id === "individual" || doc.plan_id === "family";
	const plan = isPremium ? "premium" : "free";
	const subscription_type = doc.subscription_type === "family" || doc.plan_id === "family" ? "family" : "individual";
	let status = "inactive";
	if (doc.status === "active") status = "active";
	else if (doc.status === "trialing") status = "trialing";
	else if (doc.status === "past_due") status = "past_due";
	else if (doc.status === "canceled" || doc.status === "cancelled") status = "cancelled";
	else if (doc.status === "inactive") status = "inactive";
	else if (isPremium) status = "active";
	return {
		id: String(doc.id || doc._id || `sub_${doc.user_id}`),
		user_id: String(doc.user_id || doc._id),
		plan,
		status,
		subscription_type,
		family_id: doc.family_id ? String(doc.family_id) : null,
		billing_period: doc.billing_period || doc.billing_cycle || "monthly",
		price_key: doc.price_key ? String(doc.price_key) : null,
		included_parent_count: Number(doc.included_parent_count ?? (subscription_type === "family" ? 2 : 1)),
		included_child_count: Number(doc.included_child_count ?? (subscription_type === "family" ? 4 : 0)),
		additional_child_count: Number(doc.additional_child_count ?? 0),
		stripe_customer_id: doc.stripe_customer_id ? String(doc.stripe_customer_id) : null,
		stripe_subscription_id: doc.stripe_subscription_id ? String(doc.stripe_subscription_id) : null,
		stripe_price_id: doc.stripe_price_id ? String(doc.stripe_price_id) : null,
		started_at: doc.started_at ? String(doc.started_at) : doc.current_period_start ? String(doc.current_period_start) : doc.created_at ? String(doc.created_at) : null,
		current_period_start: doc.current_period_start ? String(doc.current_period_start) : null,
		current_period_end: doc.current_period_end ? String(doc.current_period_end) : null,
		renewal_at: doc.cancel_at_period_end ? null : doc.renewal_at ? String(doc.renewal_at) : doc.current_period_end ? String(doc.current_period_end) : null,
		cancel_at_period_end: Boolean(doc.cancel_at_period_end),
		cancelled_at: doc.cancelled_at ? String(doc.cancelled_at) : null,
		trial_ends_at: doc.trial_ends_at ? String(doc.trial_ends_at) : null,
		created_at: doc.created_at ? String(doc.created_at) : (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: doc.updated_at ? String(doc.updated_at) : (/* @__PURE__ */ new Date()).toISOString()
	};
}
/**
* Server-side source of truth for subscription state.
*
* PRIMARY SOURCE: MongoDB Atlas (`subscriptions` collection).
* Reads the authoritative subscription document created/updated by verified
* Stripe webhooks.
*
* FALLBACK SOURCE: Supabase (`subscriptions` table).
* Preserves seamless backward compatibility for older accounts without requiring
* SUPABASE_SERVICE_ROLE_KEY for normal entitlement checks.
*/
async function loadEntitlements(supabaseOrUserId, maybeUserId) {
	let supabase = null;
	let userId;
	if (typeof supabaseOrUserId === "string") {
		userId = supabaseOrUserId;
		supabase = null;
	} else {
		supabase = supabaseOrUserId ?? null;
		userId = maybeUserId || "";
	}
	let ownSubscription = null;
	let familySubscription = null;
	let membership = null;
	let prices = FALLBACK_PRICES;
	let familyMembers = [];
	try {
		const { getDatabase, COLLECTIONS } = await import("./mongodb.server-B1VXbgjA.mjs");
		const mongoSub = await (await getDatabase()).collection(COLLECTIONS.subscriptions).findOne({ $or: [{ user_id: userId }, { _id: userId }] });
		if (mongoSub) ownSubscription = mapMongoSubDocToSubscription(mongoSub);
	} catch (mongoErr) {
		console.warn("MongoDB subscription read error, falling back:", mongoErr instanceof Error ? mongoErr.message : String(mongoErr));
	}
	try {
		const [ownRes, memberRes, pricesRes] = await Promise.all([
			!ownSubscription && supabase ? supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle() : Promise.resolve({
				data: null,
				error: null
			}),
			supabase ? supabase.from("family_members").select("id, family_id, user_id, member_role, seat_kind, seat_suspended, created_at").eq("user_id", userId).maybeSingle() : Promise.resolve({
				data: null,
				error: null
			}),
			supabase ? supabase.from("subscription_prices").select("*").eq("active", true) : Promise.resolve({
				data: null,
				error: null
			})
		]);
		if (!ownSubscription && ownRes.data) ownSubscription = ownRes.data;
		if (memberRes.data) membership = memberRes.data;
		if (pricesRes.data && pricesRes.data.length > 0) prices = pricesRes.data;
	} catch {}
	const familyId = membership?.family_id ?? ownSubscription?.family_id ?? null;
	if (familyId) {
		if (ownSubscription && (ownSubscription.subscription_type === "family" || ownSubscription.family_id === familyId)) familySubscription = ownSubscription;
		else {
			try {
				const { getDatabase, COLLECTIONS } = await import("./mongodb.server-B1VXbgjA.mjs");
				const mongoFamilySub = await (await getDatabase()).collection(COLLECTIONS.subscriptions).findOne({
					family_id: familyId,
					$or: [
						{ plan_id: "family" },
						{ subscription_type: "family" },
						{ plan: "premium" }
					],
					status: { $in: ["active", "trialing"] }
				});
				if (mongoFamilySub) familySubscription = mapMongoSubDocToSubscription(mongoFamilySub);
			} catch (mongoFamErr) {
				console.warn("MongoDB family subscription read error:", mongoFamErr instanceof Error ? mongoFamErr.message : String(mongoFamErr));
			}
			if (!familySubscription && supabase) try {
				const subRes = await supabase.from("subscriptions").select("*").eq("family_id", familyId).eq("subscription_type", "family").maybeSingle();
				if (subRes.data) familySubscription = subRes.data;
			} catch {}
		}
		if (supabase) try {
			const membersRes = await supabase.from("family_members").select("id, family_id, user_id, member_role, seat_kind, seat_suspended, created_at").eq("family_id", familyId);
			if (membersRes.data) familyMembers = membersRes.data;
		} catch {}
	}
	return buildEntitlements({
		userId,
		ownSubscription,
		familyId: membership?.family_id ?? null,
		familyRole: membership?.member_role ?? null,
		familySeatKind: membership?.seat_kind ?? null,
		familySubscription,
		familyMembers,
		prices
	});
}
/**
* Guard for billing actions. Children/teenagers can never start, change or pay
* for a subscription — their access belongs to the family subscription.
*/
async function requireBillingOwner(supabase, userId) {
	const entitlements = await loadEntitlements(supabase, userId);
	if (!entitlements.canSubscribe) throw new Response(JSON.stringify({
		error: "billing_not_allowed",
		reason: "child_accounts_cannot_subscribe"
	}), {
		status: 403,
		headers: { "content-type": "application/json" }
	});
	return entitlements;
}
function addPeriod(from, period) {
	const next = new Date(from);
	if (period === "yearly") next.setFullYear(next.getFullYear() + 1);
	else next.setMonth(next.getMonth() + 1);
	return next;
}
/**
* Activates premium for the caller.
* Primary state is stored in MongoDB Atlas, with best-effort Supabase sync.
*/
async function activatePremium(supabase, userId, input) {
	const current = await requireBillingOwner(supabase, userId);
	const familyId = current.family?.familyId ?? null;
	const kind = input.kind === "family" && familyId ? "family" : "individual";
	const price = findPrice(current.prices, kind, input.billingPeriod);
	const now = /* @__PURE__ */ new Date();
	const periodEnd = addPeriod(now, input.billingPeriod);
	try {
		const { getDatabase, COLLECTIONS } = await import("./mongodb.server-B1VXbgjA.mjs");
		await (await getDatabase()).collection(COLLECTIONS.subscriptions).updateOne({ $or: [{ user_id: userId }, { _id: userId }] }, {
			$set: {
				plan_id: kind === "family" ? "family" : "individual",
				plan: "premium",
				status: "active",
				subscription_type: kind,
				family_id: kind === "family" ? familyId : null,
				billing_cycle: input.billingPeriod,
				billing_period: input.billingPeriod,
				included_parent_count: kind === "family" ? price?.included_parent_count ?? 2 : 1,
				included_child_count: kind === "family" ? price?.included_child_count ?? 4 : 0,
				additional_child_count: kind === "family" ? Math.max(0, input.additionalChildren) : 0,
				current_period_start: current.startedAt ?? now.toISOString(),
				current_period_end: periodEnd.toISOString(),
				cancel_at_period_end: false,
				cancelled_at: null,
				updated_at: now.toISOString()
			},
			$setOnInsert: {
				_id: userId,
				id: userId,
				user_id: userId,
				created_at: now.toISOString()
			}
		}, { upsert: true });
	} catch (mongoErr) {
		console.warn("MongoDB subscription activation error:", mongoErr instanceof Error ? mongoErr.message : String(mongoErr));
	}
	if (process.env.SUPABASE_SERVICE_ROLE_KEY) try {
		const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
		await supabaseAdmin.from("subscriptions").upsert({
			user_id: userId,
			plan: "premium",
			status: "active",
			subscription_type: kind,
			family_id: kind === "family" ? familyId : null,
			billing_period: input.billingPeriod,
			price_key: price?.key ?? null,
			included_parent_count: kind === "family" ? price?.included_parent_count ?? 2 : 1,
			included_child_count: kind === "family" ? price?.included_child_count ?? 4 : 0,
			additional_child_count: kind === "family" ? Math.max(0, input.additionalChildren) : 0,
			started_at: current.startedAt ?? now.toISOString(),
			current_period_start: now.toISOString(),
			current_period_end: periodEnd.toISOString(),
			cancel_at_period_end: false,
			cancelled_at: null
		}, { onConflict: "user_id" });
		if (kind === "family" && familyId) await supabaseAdmin.from("family_members").update({ seat_suspended: false }).eq("family_id", familyId);
	} catch {}
	return loadEntitlements(supabase, userId);
}
/**
* Cancels premium and returns the account to Free.
* Primary state is stored in MongoDB Atlas, with best-effort Supabase sync.
*/
async function cancelPremium(supabase, userId) {
	await requireBillingOwner(supabase, userId);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	try {
		const { getDatabase, COLLECTIONS } = await import("./mongodb.server-B1VXbgjA.mjs");
		await (await getDatabase()).collection(COLLECTIONS.subscriptions).updateOne({ $or: [{ user_id: userId }, { _id: userId }] }, { $set: {
			plan_id: "free",
			plan: "free",
			status: "canceled",
			cancelled_at: now,
			cancel_at_period_end: false,
			current_period_end: now,
			updated_at: now
		} });
	} catch (mongoErr) {
		console.warn("MongoDB subscription cancellation error:", mongoErr instanceof Error ? mongoErr.message : String(mongoErr));
	}
	if (process.env.SUPABASE_SERVICE_ROLE_KEY) try {
		const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
		await supabaseAdmin.from("subscriptions").update({
			plan: "free",
			status: "cancelled",
			cancelled_at: now,
			cancel_at_period_end: false,
			current_period_end: now
		}).eq("user_id", userId);
	} catch {}
	return loadEntitlements(supabase, userId);
}
//#endregion
export { activatePremium, cancelPremium, loadEntitlements, requireBillingOwner };
