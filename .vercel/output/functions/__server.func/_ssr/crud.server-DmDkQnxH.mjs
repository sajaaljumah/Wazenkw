import { getCollection, getMongoDb } from "./mongodb.server-B1VXbgjA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crud.server-DmDkQnxH.js
/**
* Wazen MongoDB Application CRUD Service.
*
* Exclusively executes server-side.
* Serves as the authoritative source of truth for:
* 1. Transactions (Income, Expenses, Savings, Refunds, Parent-Paid)
* 2. Recurring Items
* 3. Budgets & Savings Goals
* 4. Assets & Valuations
* 5. Learning Progress, Streaks, XP & Challenges
* 6. Family Member Summaries & Permissions
*/
async function listTransactions(userId) {
	return (await (await getCollection("transactions")).find({ user_id: userId }).sort({
		occurred_on: -1,
		created_at: -1
	}).toArray()).map((d) => ({
		...d,
		id: d.id || d._id
	}));
}
async function createTransaction(userId, input) {
	const col = await getCollection("transactions");
	const id = input.id || crypto.randomUUID();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const doc = {
		_id: id,
		id,
		user_id: userId,
		kind: input.kind,
		category: input.category,
		merchant: input.merchant ?? null,
		amount: input.amount,
		currency: input.currency,
		occurred_on: input.occurred_on,
		note: input.note ?? null,
		payment_method: input.payment_method ?? null,
		goal_id: input.goal_id ?? null,
		paid_by_parent: input.paid_by_parent ?? false,
		deducted_from_child: input.deducted_from_child ?? false,
		beneficiary_user_id: input.beneficiary_user_id ?? null,
		linked_transaction_id: input.linked_transaction_id ?? null,
		original_amount: input.original_amount ?? null,
		original_currency: input.original_currency ?? null,
		converted_amount: input.converted_amount ?? null,
		exchange_rate: input.exchange_rate ?? null,
		rate_date: input.rate_date ?? null,
		created_at: now,
		updated_at: now
	};
	await col.updateOne({ _id: id }, { $set: doc }, { upsert: true });
	return doc;
}
async function updateTransaction(userId, id, updates) {
	const col = await getCollection("transactions");
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const res = await col.findOneAndUpdate({
		$or: [{ _id: id }, { id }],
		user_id: userId
	}, { $set: {
		...updates,
		updated_at: now
	} }, { returnDocument: "after" });
	return res ? {
		...res,
		id: res.id || res._id
	} : null;
}
async function deleteTransaction(userId, id) {
	return (await (await getCollection("transactions")).deleteOne({
		$or: [{ _id: id }, { id }],
		user_id: userId
	})).deletedCount > 0;
}
async function refundTransaction(userId, originalTxId, reason) {
	const col = await getCollection("transactions");
	const original = await col.findOne({
		$or: [{ _id: originalTxId }, { id: originalTxId }],
		user_id: userId
	});
	if (!original) throw new Error("Transaction not found or not owned by user.");
	const refundId = crypto.randomUUID();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const refundDoc = {
		_id: refundId,
		id: refundId,
		user_id: userId,
		kind: "refund",
		category: original.category,
		merchant: original.merchant,
		amount: original.amount,
		currency: original.currency,
		occurred_on: now.slice(0, 10),
		note: reason || `Refund for transaction ${originalTxId}`,
		linked_transaction_id: original._id || originalTxId,
		refunds_transaction_id: original._id || originalTxId,
		is_refund: true,
		payment_method: original.payment_method,
		created_at: now,
		updated_at: now
	};
	await col.insertOne(refundDoc);
	await col.updateOne({ _id: original._id }, { $set: {
		refunded_by_transaction_id: refundId,
		updated_at: now
	} });
	return refundDoc;
}
async function listParentPaidForMe(childUserId) {
	return (await (await getCollection("transactions")).find({
		beneficiary_user_id: childUserId,
		paid_by_parent: true,
		user_id: { $ne: childUserId }
	}).sort({ occurred_on: -1 }).toArray()).map((d) => ({
		...d,
		id: d.id || d._id
	}));
}
async function addParentPaidExpense(parentUserId, input) {
	const rel = await (await getCollection("family_relationships")).findOne({
		parent_user_id: parentUserId,
		child_user_id: input.childUserId,
		status: "active"
	});
	if (rel && rel.permissions && rel.permissions.can_fund === false) throw new Error("Permission denied: You do not have funding permission for this member.");
	const parentTx = await createTransaction(parentUserId, {
		kind: "expense",
		category: input.category,
		merchant: input.merchant,
		amount: input.amount,
		currency: input.currency,
		occurred_on: input.occurredOn,
		payment_method: input.paymentMethod,
		beneficiary_user_id: input.childUserId,
		paid_by_parent: true,
		deducted_from_child: input.deductFromChild,
		note: input.note,
		original_amount: input.originalAmount,
		original_currency: input.originalCurrency,
		converted_amount: input.convertedAmount,
		exchange_rate: input.exchangeRate,
		rate_date: input.rateDate
	});
	let childTx;
	if (input.deductFromChild) childTx = await createTransaction(input.childUserId, {
		kind: "expense",
		category: input.category,
		merchant: input.merchant,
		amount: input.amount,
		currency: input.currency,
		occurred_on: input.occurredOn,
		payment_method: input.paymentMethod,
		beneficiary_user_id: input.childUserId,
		paid_by_parent: true,
		deducted_from_child: true,
		linked_transaction_id: parentTx.id,
		note: input.note || "Paid by parent from your funds",
		original_amount: input.originalAmount,
		original_currency: input.originalCurrency,
		converted_amount: input.convertedAmount,
		exchange_rate: input.exchangeRate,
		rate_date: input.rateDate
	});
	return {
		parentTx,
		childTx
	};
}
async function listRecurringItems(userId, activeOnly = false) {
	const col = await getCollection("recurring_items");
	const filter = { user_id: userId };
	if (activeOnly) filter["is_active"] = true;
	return (await col.find(filter).sort({ day_of_month: 1 }).toArray()).map((d) => ({
		...d,
		id: d.id || d._id
	}));
}
async function saveRecurringItem(userId, input) {
	const col = await getCollection("recurring_items");
	const id = input.id || crypto.randomUUID();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const doc = {
		_id: id,
		id,
		user_id: userId,
		kind: input.kind,
		name: input.name,
		merchant: input.merchant ?? null,
		category: input.category,
		amount: input.amount,
		currency: input.currency,
		frequency: input.frequency,
		day_of_month: input.day_of_month,
		start_date: input.start_date,
		ends_on: input.ends_on ?? null,
		note: input.note ?? null,
		is_active: input.active,
		created_at: now,
		updated_at: now
	};
	await col.updateOne({
		_id: id,
		user_id: userId
	}, { $set: doc }, { upsert: true });
	return doc;
}
async function toggleRecurringItem(userId, id, active) {
	return (await (await getCollection("recurring_items")).updateOne({
		$or: [{ _id: id }, { id }],
		user_id: userId
	}, { $set: {
		is_active: active,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	} })).modifiedCount > 0;
}
async function deleteRecurringItem(userId, id) {
	return (await (await getCollection("recurring_items")).deleteOne({
		$or: [{ _id: id }, { id }],
		user_id: userId
	})).deletedCount > 0;
}
async function getMonthlyBudget(userId, periodMonth) {
	const doc = await (await getCollection("budgets")).findOne({
		user_id: userId,
		period_month: periodMonth
	});
	return doc ? {
		...doc,
		id: doc.id || doc._id
	} : null;
}
async function upsertMonthlyBudget(userId, periodMonth, amount, currency = "KWD") {
	const col = await getCollection("budgets");
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const existing = await col.findOne({
		user_id: userId,
		period_month: periodMonth
	});
	const id = existing?.id || existing?._id || crypto.randomUUID();
	const doc = {
		_id: id,
		id,
		user_id: userId,
		period_month: periodMonth,
		amount,
		currency,
		created_at: existing?.created_at || now,
		updated_at: now
	};
	await col.updateOne({
		user_id: userId,
		period_month: periodMonth
	}, { $set: doc }, { upsert: true });
	return doc;
}
async function listGoals(userId) {
	return (await (await getCollection("savings_goals")).find({ user_id: userId }).sort({ created_at: 1 }).toArray()).map((d) => ({
		...d,
		id: d.id || d._id
	}));
}
async function createGoal(userId, input) {
	const col = await getCollection("savings_goals");
	const id = input.id || crypto.randomUUID();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const doc = {
		_id: id,
		id,
		user_id: userId,
		name: input.name,
		kind: input.kind || "goal",
		target_amount: input.target_amount,
		target_date: input.target_date ?? null,
		currency: input.currency || "KWD",
		created_at: now,
		updated_at: now
	};
	await col.updateOne({ _id: id }, { $set: doc }, { upsert: true });
	return doc;
}
async function updateGoal(userId, id, updates) {
	const res = await (await getCollection("savings_goals")).findOneAndUpdate({
		$or: [{ _id: id }, { id }],
		user_id: userId
	}, { $set: {
		...updates,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	} }, { returnDocument: "after" });
	return res ? {
		...res,
		id: res.id || res._id
	} : null;
}
async function deleteGoal(userId, id) {
	return (await (await getCollection("savings_goals")).deleteOne({
		$or: [{ _id: id }, { id }],
		user_id: userId
	})).deletedCount > 0;
}
async function listAssets(userId) {
	return (await (await getCollection("assets")).find({ user_id: userId }).sort({ purchase_date: 1 }).toArray()).map((d) => ({
		...d,
		id: d.id || d._id
	}));
}
async function listAssetValuations(userId) {
	return (await (await getMongoDb("Wazen")).collection("asset_valuations").find({ user_id: userId }).sort({ valued_on: 1 }).toArray()).map((d) => ({
		id: d.id || d._id,
		asset_id: d.asset_id,
		valued_on: d.valued_on,
		unit_value: d.unit_value
	}));
}
async function saveAsset(userId, input, id) {
	const col = await getCollection("assets");
	const valCol = (await getMongoDb("Wazen")).collection("asset_valuations");
	const assetId = id || crypto.randomUUID();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const today = now.slice(0, 10);
	const doc = {
		_id: assetId,
		id: assetId,
		user_id: userId,
		kind: input.kind,
		name: input.name,
		symbol: input.symbol,
		quantity: input.quantity,
		unit_cost: input.unit_cost,
		current_unit_value: input.current_unit_value,
		currency: input.currency,
		purity: input.purity,
		property_type: input.property_type,
		monthly_rent: input.monthly_rent,
		purchase_date: input.purchase_date,
		notes: input.notes,
		created_at: now,
		updated_at: now
	};
	await col.updateOne({
		_id: assetId,
		user_id: userId
	}, { $set: doc }, { upsert: true });
	const valId = `${assetId}_${today}`;
	await valCol.updateOne({ _id: valId }, { $set: {
		_id: valId,
		id: valId,
		asset_id: assetId,
		user_id: userId,
		valued_on: today,
		unit_value: input.current_unit_value
	} }, { upsert: true });
	return assetId;
}
async function deleteAsset(userId, id) {
	const col = await getCollection("assets");
	const valCol = (await getMongoDb("Wazen")).collection("asset_valuations");
	const res = await col.deleteOne({
		$or: [{ _id: id }, { id }],
		user_id: userId
	});
	await valCol.deleteMany({
		$or: [{ asset_id: id }, { asset_id: id }],
		user_id: userId
	});
	return res.deletedCount > 0;
}
async function getLearningProfile(userId) {
	const doc = await (await getMongoDb("Wazen")).collection("learning_profiles").findOne({ user_id: userId });
	if (doc) return {
		user_id: doc.user_id,
		xp: doc.xp || 0,
		current_streak: doc.current_streak || 0,
		longest_streak: doc.longest_streak || 0,
		last_activity_on: doc.last_activity_on || null
	};
	return {
		user_id: userId,
		xp: 0,
		current_streak: 0,
		longest_streak: 0,
		last_activity_on: null
	};
}
async function listLearningProgress(userId) {
	return (await (await getCollection("learning_progress")).find({ user_id: userId }).sort({ last_activity_at: -1 }).toArray()).map((d) => ({
		...d,
		id: d.id || d._id
	}));
}
async function listLearningChallenges(userId) {
	return (await (await getCollection("challenges")).find({ user_id: userId }).sort({ started_on: -1 }).toArray()).map((d) => ({
		...d,
		id: d.id || d._id
	}));
}
async function recordLearningActivity(userId, activity) {
	const col = await getCollection("learning_progress");
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const existing = await col.findOne({
		user_id: userId,
		activity_type: activity.activity_type,
		activity_key: activity.activity_key
	});
	const id = existing?.id || existing?._id || crypto.randomUUID();
	const attempts = (existing?.attempts ?? 0) + 1;
	const bestScore = Math.max(existing?.best_score ?? 0, activity.score);
	const status = existing?.status === "completed" || activity.completed ? "completed" : "in_progress";
	const doc = {
		_id: id,
		id,
		user_id: userId,
		activity_type: activity.activity_type,
		activity_key: activity.activity_key,
		topic: activity.topic,
		status,
		score: activity.score,
		best_score: bestScore,
		max_score: activity.max_score,
		attempts,
		difficulty: activity.difficulty ?? null,
		last_activity_at: now,
		created_at: existing?.created_at || now
	};
	await col.updateOne({
		user_id: userId,
		activity_type: activity.activity_type,
		activity_key: activity.activity_key
	}, { $set: doc }, { upsert: true });
	if (activity.xp > 0) {
		const profCol = (await getMongoDb("Wazen")).collection("learning_profiles");
		const prof = await profCol.findOne({ user_id: userId });
		const today = now.slice(0, 10);
		const yesterday = (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString().slice(0, 10);
		const currentStreak = prof?.last_activity_on === today ? prof.current_streak : prof?.last_activity_on === yesterday ? (prof.current_streak || 0) + 1 : 1;
		const longestStreak = Math.max(currentStreak, prof?.longest_streak ?? 0);
		const newXp = (prof?.xp ?? 0) + activity.xp;
		await profCol.updateOne({ user_id: userId }, { $set: {
			_id: userId,
			user_id: userId,
			xp: newXp,
			current_streak: currentStreak,
			longest_streak: longestStreak,
			last_activity_on: today
		} }, { upsert: true });
	}
	return doc;
}
async function startLearningChallenge(userId, key, targetDays) {
	const col = await getCollection("challenges");
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const existing = await col.findOne({
		user_id: userId,
		challenge_key: key
	});
	const id = existing?.id || existing?._id || crypto.randomUUID();
	const doc = {
		_id: id,
		id,
		user_id: userId,
		challenge_key: key,
		target_days: targetDays,
		days_completed: 0,
		status: "active",
		started_on: today,
		last_checkin_on: null,
		completed_on: null
	};
	await col.updateOne({
		user_id: userId,
		challenge_key: key
	}, { $set: doc }, { upsert: true });
	return doc;
}
async function checkInLearningChallenge(userId, challengeId) {
	const col = await getCollection("challenges");
	const challenge = await col.findOne({
		$or: [
			{ _id: challengeId },
			{ id: challengeId },
			{ challenge_key: challengeId }
		],
		user_id: userId
	});
	if (!challenge) throw new Error("Challenge not found or not owned by user.");
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	if (challenge.last_checkin_on === today || challenge.status === "completed") return {
		success: false,
		completed: challenge.status === "completed",
		daysCompleted: challenge.days_completed
	};
	const daysCompleted = Math.min(challenge.days_completed + 1, challenge.target_days);
	const isFinished = daysCompleted >= challenge.target_days;
	await col.updateOne({ _id: challenge._id }, { $set: {
		days_completed: daysCompleted,
		last_checkin_on: today,
		status: isFinished ? "completed" : "active",
		completed_on: isFinished ? today : null
	} });
	const xpReward = isFinished ? 40 : 10;
	await (await getMongoDb("Wazen")).collection("learning_profiles").updateOne({ user_id: userId }, { $inc: { xp: xpReward } }, { upsert: true });
	return {
		success: true,
		completed: isFinished,
		daysCompleted
	};
}
async function getFamilySummary(parentUserId) {
	const links = await (await getCollection("family_relationships")).find({
		parent_user_id: parentUserId,
		status: "active"
	}).toArray();
	if (links.length === 0) return [];
	const allowed = links.filter((row) => {
		const p = row.permissions ?? {};
		return p["can_monitor"] === true || p["can_fund"] === true || p["can_view_transactions"] === true;
	});
	if (allowed.length === 0) return [];
	const childIds = allowed.map((row) => row.child_user_id);
	const profCol = await getCollection("profiles");
	const txCol = await getCollection("transactions");
	const goalCol = await getCollection("savings_goals");
	const childProfiles = await profCol.find({ user_id: { $in: childIds } }).toArray();
	const childTransactions = await txCol.find({ user_id: { $in: childIds } }).toArray();
	const childGoals = await goalCol.find({ user_id: { $in: childIds } }).toArray();
	return childProfiles.map((profile) => {
		const permissions = allowed.find((row) => row.child_user_id === profile.user_id)?.permissions ?? {};
		return {
			profile: {
				...profile,
				id: profile.user_id
			},
			canFund: permissions["can_fund"] === true || permissions["can_manage_budget"] === true,
			canMonitor: permissions["can_monitor"] === true || permissions["can_view_transactions"] === true,
			transactions: childTransactions.filter((t) => t.user_id === profile.user_id).map((t) => ({
				...t,
				id: t.id || t._id
			})),
			goals: childGoals.filter((g) => g.user_id === profile.user_id).map((g) => ({
				...g,
				id: g.id || g._id
			}))
		};
	}).sort((a, b) => (a.profile.full_name || "").localeCompare(b.profile.full_name || ""));
}
//#endregion
export { addParentPaidExpense, checkInLearningChallenge, createGoal, createTransaction, deleteAsset, deleteGoal, deleteRecurringItem, deleteTransaction, getFamilySummary, getLearningProfile, getMonthlyBudget, listAssetValuations, listAssets, listGoals, listLearningChallenges, listLearningProgress, listParentPaidForMe, listRecurringItems, listTransactions, recordLearningActivity, refundTransaction, saveAsset, saveRecurringItem, startLearningChallenge, toggleRecurringItem, updateGoal, updateTransaction, upsertMonthlyBudget };
