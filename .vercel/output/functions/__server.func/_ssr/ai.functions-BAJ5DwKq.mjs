import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { a as objectType, i as numberType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-BAJ5DwKq.js
/**
* Wazen AI Server Functions (RPC Gateway).
*
* Bridge between client UI and OpenRouter backend service.
* Runs exclusively on the server.
* Never exposes the OpenRouter API key to the client bundle.
*/
var lifeStageSchema = enumType([
	"child",
	"teenager",
	"university_student",
	"employee",
	"self_employed",
	"parent"
]);
var financialContextSchema = objectType({
	income: numberType().optional(),
	expenses: numberType().optional(),
	budget: numberType().optional(),
	savings: numberType().optional(),
	goals: arrayType(objectType({
		name: stringType(),
		target: numberType(),
		current: numberType().optional()
	})).optional(),
	emergency_fund: numberType().optional(),
	spending_categories: arrayType(objectType({
		category: stringType(),
		amount: numberType()
	})).optional(),
	investments: arrayType(objectType({
		name: stringType(),
		value: numberType()
	})).optional(),
	learning_progress: objectType({
		xp: numberType().optional(),
		streak: numberType().optional(),
		completedLessons: numberType().optional()
	}).optional()
});
/**
* Check if OpenRouter AI is configured on the server without returning the key.
*/
var checkAiConfiguredFn_createServerFn_handler = createServerRpc({
	id: "02119e10bb5a26dcf1854d2e8238baed9e2aa07d8e708eec00e086babba81e2a",
	name: "checkAiConfiguredFn",
	filename: "src/lib/ai.functions.ts"
}, (opts) => checkAiConfiguredFn.__executeServer(opts));
var checkAiConfiguredFn = createServerFn({ method: "GET" }).handler(checkAiConfiguredFn_createServerFn_handler, async () => {
	const { isOpenRouterConfigured } = await import("./openrouter.server-DNRSmR7l.mjs");
	return { configured: isOpenRouterConfigured() };
});
var sendChatCompletionFn_createServerFn_handler = createServerRpc({
	id: "739c21a364a6cd3456c26a44c6a7132e18fe8e8f72e3e067e6be7f57f412206b",
	name: "sendChatCompletionFn",
	filename: "src/lib/ai.functions.ts"
}, (opts) => sendChatCompletionFn.__executeServer(opts));
var sendChatCompletionFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	messages: arrayType(objectType({
		role: enumType([
			"system",
			"user",
			"assistant"
		]),
		content: stringType().min(1)
	})),
	options: objectType({
		model: stringType().optional(),
		temperature: numberType().min(0).max(2).optional(),
		max_tokens: numberType().min(10).max(4e3).optional()
	}).optional()
}).parse(data)).handler(sendChatCompletionFn_createServerFn_handler, async ({ data }) => {
	const { sendChatCompletion } = await import("./openrouter.server-DNRSmR7l.mjs");
	return sendChatCompletion(data.messages, data.options);
});
var getFinancialAdviceFn_createServerFn_handler = createServerRpc({
	id: "5b21d13d8e6280553fdb65a5ed1587ace75afb1e3a88da7738c3a387e39a878f",
	name: "getFinancialAdviceFn",
	filename: "src/lib/ai.functions.ts"
}, (opts) => getFinancialAdviceFn.__executeServer(opts));
var getFinancialAdviceFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	prompt: stringType().min(1),
	context: financialContextSchema.nullable().optional(),
	lifeStage: lifeStageSchema.optional().default("employee"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	model: stringType().optional()
}).parse(data)).handler(getFinancialAdviceFn_createServerFn_handler, async ({ data }) => {
	const { sendFinancialAdvice } = await import("./openrouter.server-DNRSmR7l.mjs");
	return sendFinancialAdvice(data.prompt, data.context, {
		lifeStage: data.lifeStage,
		language: data.language,
		model: data.model
	});
});
var getPersonalizedLearningFn_createServerFn_handler = createServerRpc({
	id: "c6d8f0074406f3d1678a4c7afd584559772c649f74467404c683200559380c34",
	name: "getPersonalizedLearningFn",
	filename: "src/lib/ai.functions.ts"
}, (opts) => getPersonalizedLearningFn.__executeServer(opts));
var getPersonalizedLearningFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	topic: stringType().min(1),
	lifeStage: lifeStageSchema.optional().default("employee"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	model: stringType().optional()
}).parse(data)).handler(getPersonalizedLearningFn_createServerFn_handler, async ({ data }) => {
	const { generatePersonalizedLearning } = await import("./openrouter.server-DNRSmR7l.mjs");
	return generatePersonalizedLearning(data.topic, data.lifeStage, data.language, { model: data.model });
});
var getQuizFn_createServerFn_handler = createServerRpc({
	id: "a9f8832a7631f0837f2e25d519ea59bca62455531da50c61d84c4dc0eb326081",
	name: "getQuizFn",
	filename: "src/lib/ai.functions.ts"
}, (opts) => getQuizFn.__executeServer(opts));
var getQuizFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	topic: stringType().min(1),
	lifeStage: lifeStageSchema.optional().default("child"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	questionCount: numberType().min(1).max(10).optional().default(3),
	model: stringType().optional()
}).parse(data)).handler(getQuizFn_createServerFn_handler, async ({ data }) => {
	const { generateQuiz } = await import("./openrouter.server-DNRSmR7l.mjs");
	return generateQuiz(data.topic, data.lifeStage, data.language, data.questionCount, { model: data.model });
});
var getChallengeFn_createServerFn_handler = createServerRpc({
	id: "3a03c5418933c35f40cf51fdc7208ab8025cb2498d2147dba15c0487870dc2b1",
	name: "getChallengeFn",
	filename: "src/lib/ai.functions.ts"
}, (opts) => getChallengeFn.__executeServer(opts));
var getChallengeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	topic: stringType().min(1),
	lifeStage: lifeStageSchema.optional().default("teenager"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	model: stringType().optional()
}).parse(data)).handler(getChallengeFn_createServerFn_handler, async ({ data }) => {
	const { generateChallenge } = await import("./openrouter.server-DNRSmR7l.mjs");
	return generateChallenge(data.topic, data.lifeStage, data.language, { model: data.model });
});
//#endregion
export { checkAiConfiguredFn_createServerFn_handler, getChallengeFn_createServerFn_handler, getFinancialAdviceFn_createServerFn_handler, getPersonalizedLearningFn_createServerFn_handler, getQuizFn_createServerFn_handler, sendChatCompletionFn_createServerFn_handler };
