import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { a as objectType, c as unknownType, i as numberType, n as booleanType, o as recordType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crud.functions-C0ccQ8re.js
/**
* Wazen TanStack Start Server Functions for MongoDB CRUD.
*
* Runs strictly server-side.
* Serves as the RPC bridge between client React hooks and MongoDB collections.
* Enforces server-side authentication and user ownership.
*/
async function resolveUser(data) {
	const { getAuthenticatedUserId } = await import("./server-auth-Fk0MqaBh.mjs");
	if (data.authToken) return getAuthenticatedUserId(data.authToken);
	try {
		return await getAuthenticatedUserId();
	} catch (err) {
		if (data.userId && false);
		throw err;
	}
}
var listTransactionsFn_createServerFn_handler = createServerRpc({
	id: "ef18b4309437958303c3d473a426334badff3df37a4bfa4568c23e78506a40b0",
	name: "listTransactionsFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listTransactionsFn.__executeServer(opts));
var listTransactionsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listTransactionsFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listTransactions } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listTransactions(userId)
	};
});
var createTransactionFn_createServerFn_handler = createServerRpc({
	id: "89408c9d50a4898b0d7bc753b5236b8af41987e58b8ae768ff241873cf70af1a",
	name: "createTransactionFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => createTransactionFn.__executeServer(opts));
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
}).parse(data)).handler(createTransactionFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { createTransaction } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await createTransaction(userId, data)
	};
});
var updateTransactionFn_createServerFn_handler = createServerRpc({
	id: "5ca1e8c26da9fe8e9115d43ee39f4af25ef24819c4d93be9350c44855776d233",
	name: "updateTransactionFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => updateTransactionFn.__executeServer(opts));
var updateTransactionFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	updates: recordType(unknownType()),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(updateTransactionFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { updateTransaction } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await updateTransaction(userId, data.id, data.updates)
	};
});
var deleteTransactionFn_createServerFn_handler = createServerRpc({
	id: "855f4a908abba9a6f2c1094480c564f48f6bab57801bf27b28ab1c856291cf2b",
	name: "deleteTransactionFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => deleteTransactionFn.__executeServer(opts));
var deleteTransactionFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(deleteTransactionFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { deleteTransaction } = await import("./crud.server-DmDkQnxH.mjs");
	return { success: await deleteTransaction(userId, data.id) };
});
var refundTransactionFn_createServerFn_handler = createServerRpc({
	id: "a89ba3ddf621615c1399f601bdd420ef7e2cb8ce4cf1e8a2e0af9f2a62cf8947",
	name: "refundTransactionFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => refundTransactionFn.__executeServer(opts));
var refundTransactionFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	reason: stringType().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(refundTransactionFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { refundTransaction } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await refundTransaction(userId, data.id, data.reason)
	};
});
var listParentPaidForMeFn_createServerFn_handler = createServerRpc({
	id: "d64ed3230db9c580baf8d84f6ab39e68879de84d104db15ba0d0eca0f5778510",
	name: "listParentPaidForMeFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listParentPaidForMeFn.__executeServer(opts));
var listParentPaidForMeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listParentPaidForMeFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listParentPaidForMe } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listParentPaidForMe(userId)
	};
});
var addParentPaidExpenseFn_createServerFn_handler = createServerRpc({
	id: "cc52aa22d94149fc554423b46268d781c9adacf62d175e732c8f4e4da7a699ef",
	name: "addParentPaidExpenseFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => addParentPaidExpenseFn.__executeServer(opts));
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
}).parse(data)).handler(addParentPaidExpenseFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { addParentPaidExpense } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await addParentPaidExpense(userId, data)
	};
});
var listRecurringItemsFn_createServerFn_handler = createServerRpc({
	id: "7780b19e867ee0b09decf353da46ee533cfe744b54dadf1c8d7970d2639634e3",
	name: "listRecurringItemsFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listRecurringItemsFn.__executeServer(opts));
var listRecurringItemsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	activeOnly: booleanType().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listRecurringItemsFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listRecurringItems } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listRecurringItems(userId, data.activeOnly)
	};
});
var saveRecurringItemFn_createServerFn_handler = createServerRpc({
	id: "ae0051acbc04091e0b7cb8ef4e62968818cddc3f1d8efe84fc667257dff67309",
	name: "saveRecurringItemFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => saveRecurringItemFn.__executeServer(opts));
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
}).parse(data)).handler(saveRecurringItemFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { saveRecurringItem } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await saveRecurringItem(userId, data)
	};
});
var toggleRecurringItemFn_createServerFn_handler = createServerRpc({
	id: "74a7276b38bf502cddf02db922e794e0df35a200156947668f55f221631f6071",
	name: "toggleRecurringItemFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => toggleRecurringItemFn.__executeServer(opts));
var toggleRecurringItemFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	active: booleanType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(toggleRecurringItemFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { toggleRecurringItem } = await import("./crud.server-DmDkQnxH.mjs");
	return { success: await toggleRecurringItem(userId, data.id, data.active) };
});
var deleteRecurringItemFn_createServerFn_handler = createServerRpc({
	id: "e397f022ad361bacc5cfacd3bf2d285d39f428c8e50255e0da5edf33e493c17b",
	name: "deleteRecurringItemFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => deleteRecurringItemFn.__executeServer(opts));
var deleteRecurringItemFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(deleteRecurringItemFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { deleteRecurringItem } = await import("./crud.server-DmDkQnxH.mjs");
	return { success: await deleteRecurringItem(userId, data.id) };
});
var getMonthlyBudgetFn_createServerFn_handler = createServerRpc({
	id: "8a991ac915924a9014aa0fe85c3bf91cd2f3d0965ad85901c656faa848fd5f0e",
	name: "getMonthlyBudgetFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => getMonthlyBudgetFn.__executeServer(opts));
var getMonthlyBudgetFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	periodMonth: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(getMonthlyBudgetFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { getMonthlyBudget } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await getMonthlyBudget(userId, data.periodMonth)
	};
});
var upsertMonthlyBudgetFn_createServerFn_handler = createServerRpc({
	id: "2e7faad092ff62ce9c0596e3412e7fdcd3f909f2a242972e3ee0d6681812cb32",
	name: "upsertMonthlyBudgetFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => upsertMonthlyBudgetFn.__executeServer(opts));
var upsertMonthlyBudgetFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	periodMonth: stringType(),
	amount: numberType(),
	currency: stringType().default("KWD"),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(upsertMonthlyBudgetFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { upsertMonthlyBudget } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await upsertMonthlyBudget(userId, data.periodMonth, data.amount, data.currency)
	};
});
var listGoalsFn_createServerFn_handler = createServerRpc({
	id: "e0d388243cbbd2a6d8610675360dd663025e078ec1d02c04c56df8e9ca63c659",
	name: "listGoalsFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listGoalsFn.__executeServer(opts));
var listGoalsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listGoalsFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listGoals } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listGoals(userId)
	};
});
var createGoalFn_createServerFn_handler = createServerRpc({
	id: "612f6905d2d60fb5aeaeebf1b5ef737ebbc503128ed9877c08df106795d40f97",
	name: "createGoalFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => createGoalFn.__executeServer(opts));
var createGoalFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	name: stringType().min(1),
	kind: enumType(["goal", "emergency_fund"]).default("goal"),
	target_amount: numberType(),
	target_date: stringType().nullable().optional(),
	currency: stringType().default("KWD"),
	id: stringType().optional(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(createGoalFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { createGoal } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await createGoal(userId, data)
	};
});
var updateGoalFn_createServerFn_handler = createServerRpc({
	id: "d2a6b4311acba04433320700684c65e46ee96b1ec07d6f8f8583643069e68357",
	name: "updateGoalFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => updateGoalFn.__executeServer(opts));
var updateGoalFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	updates: recordType(unknownType()),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(updateGoalFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { updateGoal } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await updateGoal(userId, data.id, data.updates)
	};
});
var deleteGoalFn_createServerFn_handler = createServerRpc({
	id: "ca94a18368b9af693a4358d6c8a6c23a7d1f79855c1fb9afaf0d5f5b4c2d5003",
	name: "deleteGoalFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => deleteGoalFn.__executeServer(opts));
var deleteGoalFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(deleteGoalFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { deleteGoal } = await import("./crud.server-DmDkQnxH.mjs");
	return { success: await deleteGoal(userId, data.id) };
});
var listAssetsFn_createServerFn_handler = createServerRpc({
	id: "5c5dc9154e2e6fd991a44a026234e8599b942a0b22a7006d4b7975e840633c45",
	name: "listAssetsFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listAssetsFn.__executeServer(opts));
var listAssetsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listAssetsFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listAssets } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listAssets(userId)
	};
});
var listAssetValuationsFn_createServerFn_handler = createServerRpc({
	id: "5a8ab31af7302dd940e5743d40a9bd097e6f90fb882c55cea69af9a1067b03b2",
	name: "listAssetValuationsFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listAssetValuationsFn.__executeServer(opts));
var listAssetValuationsFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listAssetValuationsFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listAssetValuations } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listAssetValuations(userId)
	};
});
var saveAssetFn_createServerFn_handler = createServerRpc({
	id: "383afbf32b4ff3c311cb2aedc236bb45df9949f8602fe6efe78d5310945bb4fb",
	name: "saveAssetFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => saveAssetFn.__executeServer(opts));
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
}).parse(data)).handler(saveAssetFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { saveAsset } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		id: await saveAsset(userId, data.input, data.id)
	};
});
var deleteAssetFn_createServerFn_handler = createServerRpc({
	id: "6242a574a6513b4295f9ebcbb14c27cc04fd5fc102342cb8ecd7d18e66516524",
	name: "deleteAssetFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => deleteAssetFn.__executeServer(opts));
var deleteAssetFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	id: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(deleteAssetFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { deleteAsset } = await import("./crud.server-DmDkQnxH.mjs");
	return { success: await deleteAsset(userId, data.id) };
});
var getLearningProfileFn_createServerFn_handler = createServerRpc({
	id: "fd473dea172955f1f14d3d54ac5d6a2c1eba1ed9176221a327f60df8fcf66cde",
	name: "getLearningProfileFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => getLearningProfileFn.__executeServer(opts));
var getLearningProfileFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(getLearningProfileFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { getLearningProfile } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await getLearningProfile(userId)
	};
});
var listLearningProgressFn_createServerFn_handler = createServerRpc({
	id: "f43f459d296c3cd642797ee9c14ef6671e71e11beb2f1fbb6cb1a3f0578fb749",
	name: "listLearningProgressFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listLearningProgressFn.__executeServer(opts));
var listLearningProgressFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listLearningProgressFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listLearningProgress } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listLearningProgress(userId)
	};
});
var listLearningChallengesFn_createServerFn_handler = createServerRpc({
	id: "c44bc50333eec4b69aa2f60b751efbaea75c0cbbc413301c58d809b09a0930b8",
	name: "listLearningChallengesFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => listLearningChallengesFn.__executeServer(opts));
var listLearningChallengesFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(listLearningChallengesFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { listLearningChallenges } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await listLearningChallenges(userId)
	};
});
var recordLearningActivityFn_createServerFn_handler = createServerRpc({
	id: "b0fe7e5865d93583c012e29ccb668546c00a359f9792b54ae9aa2e7c4316b36e",
	name: "recordLearningActivityFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => recordLearningActivityFn.__executeServer(opts));
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
}).parse(data)).handler(recordLearningActivityFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { recordLearningActivity } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await recordLearningActivity(userId, data)
	};
});
var startLearningChallengeFn_createServerFn_handler = createServerRpc({
	id: "64fe9a4a5db39215a96bfdc3d8aae428529621d09f415533f5b484736154f85b",
	name: "startLearningChallengeFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => startLearningChallengeFn.__executeServer(opts));
var startLearningChallengeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	key: stringType(),
	targetDays: numberType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(startLearningChallengeFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { startLearningChallenge } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await startLearningChallenge(userId, data.key, data.targetDays)
	};
});
var checkInLearningChallengeFn_createServerFn_handler = createServerRpc({
	id: "59b252fa270e10a17c73ed8bdeaf230ae2ae147334a0ec247a6558e14a059712",
	name: "checkInLearningChallengeFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => checkInLearningChallengeFn.__executeServer(opts));
var checkInLearningChallengeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	challengeId: stringType(),
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(checkInLearningChallengeFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { checkInLearningChallenge } = await import("./crud.server-DmDkQnxH.mjs");
	const res = await checkInLearningChallenge(userId, data.challengeId);
	return {
		success: res.success,
		data: {
			completed: res.completed,
			daysCompleted: res.daysCompleted
		}
	};
});
var getFamilySummaryFn_createServerFn_handler = createServerRpc({
	id: "b6e285205c2a406e1daaae48718b1d462f8f2581aadf37d2c5b17cdb394f4fc2",
	name: "getFamilySummaryFn",
	filename: "src/lib/crud.functions.ts"
}, (opts) => getFamilySummaryFn.__executeServer(opts));
var getFamilySummaryFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	authToken: stringType().nullable().optional(),
	userId: stringType().optional()
}).parse(data)).handler(getFamilySummaryFn_createServerFn_handler, async ({ data }) => {
	const userId = await resolveUser(data);
	const { getFamilySummary } = await import("./crud.server-DmDkQnxH.mjs");
	return {
		success: true,
		data: await getFamilySummary(userId)
	};
});
//#endregion
export { addParentPaidExpenseFn_createServerFn_handler, checkInLearningChallengeFn_createServerFn_handler, createGoalFn_createServerFn_handler, createTransactionFn_createServerFn_handler, deleteAssetFn_createServerFn_handler, deleteGoalFn_createServerFn_handler, deleteRecurringItemFn_createServerFn_handler, deleteTransactionFn_createServerFn_handler, getFamilySummaryFn_createServerFn_handler, getLearningProfileFn_createServerFn_handler, getMonthlyBudgetFn_createServerFn_handler, listAssetValuationsFn_createServerFn_handler, listAssetsFn_createServerFn_handler, listGoalsFn_createServerFn_handler, listLearningChallengesFn_createServerFn_handler, listLearningProgressFn_createServerFn_handler, listParentPaidForMeFn_createServerFn_handler, listRecurringItemsFn_createServerFn_handler, listTransactionsFn_createServerFn_handler, recordLearningActivityFn_createServerFn_handler, refundTransactionFn_createServerFn_handler, saveAssetFn_createServerFn_handler, saveRecurringItemFn_createServerFn_handler, startLearningChallengeFn_createServerFn_handler, toggleRecurringItemFn_createServerFn_handler, updateGoalFn_createServerFn_handler, updateTransactionFn_createServerFn_handler, upsertMonthlyBudgetFn_createServerFn_handler };
