import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { a as objectType, i as numberType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as cn } from "./button-vAj4SDK8.mjs";
import { bt as createSsrRpc } from "./AppShell-cdoNFpBj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/illustrations-q4nQvRiv.js
var import_jsx_runtime = require_jsx_runtime();
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
createServerFn({ method: "GET" }).handler(createSsrRpc("02119e10bb5a26dcf1854d2e8238baed9e2aa07d8e708eec00e086babba81e2a"));
/**
* 1. Send chat completion
*/
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
}).parse(data)).handler(createSsrRpc("739c21a364a6cd3456c26a44c6a7132e18fe8e8f72e3e067e6be7f57f412206b"));
/**
* 2. Get Financial Advice with context
*/
var getFinancialAdviceFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	prompt: stringType().min(1),
	context: financialContextSchema.nullable().optional(),
	lifeStage: lifeStageSchema.optional().default("employee"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	model: stringType().optional()
}).parse(data)).handler(createSsrRpc("5b21d13d8e6280553fdb65a5ed1587ace75afb1e3a88da7738c3a387e39a878f"));
/**
* 3. Generate Personalized Learning Lesson
*/
var getPersonalizedLearningFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	topic: stringType().min(1),
	lifeStage: lifeStageSchema.optional().default("employee"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	model: stringType().optional()
}).parse(data)).handler(createSsrRpc("c6d8f0074406f3d1678a4c7afd584559772c649f74467404c683200559380c34"));
/**
* 4. Generate Interactive Quiz
*/
var getQuizFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	topic: stringType().min(1),
	lifeStage: lifeStageSchema.optional().default("child"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	questionCount: numberType().min(1).max(10).optional().default(3),
	model: stringType().optional()
}).parse(data)).handler(createSsrRpc("a9f8832a7631f0837f2e25d519ea59bca62455531da50c61d84c4dc0eb326081"));
/**
* 5. Generate Financial Challenge
*/
var getChallengeFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	topic: stringType().min(1),
	lifeStage: lifeStageSchema.optional().default("teenager"),
	language: enumType(["ar", "en"]).optional().default("ar"),
	model: stringType().optional()
}).parse(data)).handler(createSsrRpc("3a03c5418933c35f40cf51fdc7208ab8025cb2498d2147dba15c0487870dc2b1"));
/**
* Wazen AI React Query Hooks.
*
* Provides reusable hooks for:
* - Dashboard AI insights
* - Financial advice
* - Child/Teen personalized learning
* - Quizzes
* - Challenges
* - Chat completions
*/
/**
* Hook for generating financial advice based on user prompt and Wazen financial context.
*/
function useFinancialAdvice() {
	return useMutation({ mutationFn: async (variables) => {
		const res = await getFinancialAdviceFn({ data: variables });
		if (!res.success) throw new Error(res.message || "Failed to generate financial advice.");
		return res.data;
	} });
}
/**
* Hook for generating personalized learning lessons.
*/
function usePersonalizedLearning() {
	return useMutation({ mutationFn: async (variables) => {
		const res = await getPersonalizedLearningFn({ data: variables });
		if (!res.success) throw new Error(res.message || "Failed to generate learning content.");
		return res.data;
	} });
}
/**
* Hook for generating interactive financial quizzes.
*/
function useGenerateQuiz() {
	return useMutation({ mutationFn: async (variables) => {
		const res = await getQuizFn({ data: variables });
		if (!res.success) throw new Error(res.message || "Failed to generate quiz.");
		return res.data;
	} });
}
/**
* Hook for generating interactive financial challenges.
*/
function useGenerateChallenge() {
	return useMutation({ mutationFn: async (variables) => {
		const res = await getChallengeFn({ data: variables });
		if (!res.success) throw new Error(res.message || "Failed to generate challenge.");
		return res.data;
	} });
}
/**
* Hook for general conversational chat completions.
*/
function useAiChat() {
	return useMutation({ mutationFn: async (variables) => {
		const res = await sendChatCompletionFn({ data: variables });
		if (!res.success) throw new Error(res.message || "AI chat completion failed.");
		return res;
	} });
}
var soft = "var(--color-kid-soft)";
var mid = "var(--color-kid-mid)";
var deep = "var(--color-kid-deep)";
var champagne = "var(--color-kid-champagne)";
var ivory = "var(--color-kid-ivory)";
function Frame({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 120 120",
		className: cn("size-full", className),
		role: "presentation",
		"aria-hidden": "true",
		children
	});
}
function SavingsJarIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "42",
				width: "52",
				height: "54",
				rx: "18",
				fill: ivory,
				stroke: mid,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "42",
				y: "32",
				width: "36",
				height: "12",
				rx: "6",
				fill: mid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "52",
				y: "52",
				width: "16",
				height: "4",
				rx: "2",
				fill: deep,
				opacity: "0.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "72",
				r: "7",
				fill: champagne
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "68",
				cy: "78",
				r: "9",
				fill: champagne,
				opacity: "0.85"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "58",
				cy: "88",
				r: "6",
				fill: champagne,
				opacity: "0.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M92 34c2 4 6 5 6 5s-4 1-6 5c-2-4-6-5-6-5s4-1 6-5z",
				fill: champagne
			})
		]
	});
}
function BicycleIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "80",
				r: "16",
				fill: "none",
				stroke: deep,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "84",
				cy: "80",
				r: "16",
				fill: "none",
				stroke: deep,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 80l14-26h18l12 26",
				fill: "none",
				stroke: mid,
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M54 54h22",
				stroke: mid,
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M74 54l6-14h8",
				stroke: champagne,
				strokeWidth: "4",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "80",
				r: "4",
				fill: champagne
			})
		]
	});
}
function ToyIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "56",
				r: "24",
				fill: ivory,
				stroke: mid,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "38",
				cy: "40",
				r: "10",
				fill: mid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "82",
				cy: "40",
				r: "10",
				fill: mid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "52",
				cy: "52",
				r: "3",
				fill: deep
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "68",
				cy: "52",
				r: "3",
				fill: deep
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M52 64c3 4 13 4 16 0",
				stroke: deep,
				strokeWidth: "3",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M44 86h32",
				stroke: champagne,
				strokeWidth: "5",
				strokeLinecap: "round"
			})
		]
	});
}
function TravelIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M26 70l62-30-14 34-12-6-6 14-4-16z",
				fill: ivory,
				stroke: mid,
				strokeWidth: "3",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30 88c10-6 22-6 32 0",
				stroke: champagne,
				strokeWidth: "4",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "90",
				cy: "30",
				r: "5",
				fill: champagne
			})
		]
	});
}
function BookIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 40h26c4 0 6 3 6 6v42c0-4-2-6-6-6H28z",
				fill: ivory,
				stroke: mid,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M92 40H66c-4 0-6 3-6 6v42c0-4 2-6 6-6h26z",
				fill: ivory,
				stroke: mid,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 34c2 4 6 5 6 5s-4 1-6 5c-2-4-6-5-6-5s4-1 6-5z",
				fill: champagne
			})
		]
	});
}
function GiftIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "52",
				width: "56",
				height: "40",
				rx: "10",
				fill: ivory,
				stroke: mid,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "42",
				width: "64",
				height: "14",
				rx: "7",
				fill: mid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 42V92",
				stroke: champagne,
				strokeWidth: "5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 42c-8-14-22-8-16 0zM60 42c8-14 22-8 16 0z",
				fill: champagne
			})
		]
	});
}
function HeartIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 92S28 74 28 52c0-11 9-18 18-18 6 0 11 3 14 8 3-5 8-8 14-8 9 0 18 7 18 18 0 22-32 40-32 40z",
				fill: ivory,
				stroke: mid,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "58",
				r: "7",
				fill: champagne
			})
		]
	});
}
function CoinIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "52",
				fill: soft,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "62",
				r: "26",
				fill: champagne
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "62",
				r: "18",
				fill: ivory,
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 52v20M54 58h12M54 66h12",
				stroke: deep,
				strokeWidth: "3",
				strokeLinecap: "round"
			})
		]
	});
}
function StarBadgeIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "60",
			cy: "60",
			r: "52",
			fill: soft,
			opacity: "0.55"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M60 26l10 22 24 3-17 17 4 24-21-12-21 12 4-24-17-17 24-3z",
			fill: champagne,
			stroke: mid,
			strokeWidth: "3",
			strokeLinejoin: "round"
		})]
	});
}
/** Picks a friendly illustration from the goal's own name — no new data needed. */
function illustrationForGoal(name) {
	const value = name.toLowerCase();
	if (/bike|bicycle|cycle|scooter|skate/.test(value)) return BicycleIllustration;
	if (/toy|lego|game|doll|console|playstation|puzzle|robot/.test(value)) return ToyIllustration;
	if (/trip|travel|holiday|umrah|flight|camp|beach|visit/.test(value)) return TravelIllustration;
	if (/book|school|course|learn|read/.test(value)) return BookIllustration;
	if (/gift|present|birthday|eid/.test(value)) return GiftIllustration;
	if (/give|charity|sadaqah|donat|help/.test(value)) return HeartIllustration;
	if (/phone|tablet|watch|headphone|bag|shoe/.test(value)) return CoinIllustration;
	return SavingsJarIllustration;
}
/** Small decorative sparkles / hearts / coins scattered behind a section. */
function KidDecorations({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-none absolute inset-0 overflow-hidden", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "absolute right-5 top-5 size-6 kid-twinkle",
				viewBox: "0 0 24 24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 2l2.2 6.2L20 10l-5.8 1.8L12 18l-2.2-6.2L4 10l5.8-1.8z",
					fill: champagne
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "absolute right-16 top-16 size-4 kid-twinkle",
				viewBox: "0 0 24 24",
				style: { animationDelay: "700ms" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "10",
					fill: mid,
					opacity: "0.7"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "absolute bottom-6 right-10 size-5 kid-float",
				viewBox: "0 0 24 24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 21S3 15 3 9.5C3 6.5 5.4 5 7.5 5c1.7 0 3.2 1 4.5 2.6C13.3 6 14.8 5 16.5 5 18.6 5 21 6.5 21 9.5 21 15 12 21 12 21z",
					fill: soft
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "absolute left-6 bottom-8 size-4 kid-twinkle",
				viewBox: "0 0 24 24",
				style: { animationDelay: "1200ms" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 2l2.2 6.2L20 10l-5.8 1.8L12 18l-2.2-6.2L4 10l5.8-1.8z",
					fill: mid
				})
			})
		]
	});
}
/** Gentle one-off confetti burst for a real milestone. */
function Celebration({ show }) {
	if (!show) return null;
	const pieces = Array.from({ length: 18 });
	const colors = [
		champagne,
		mid,
		soft,
		deep
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]",
		"aria-hidden": "true",
		children: pieces.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "kid-confetti-piece absolute top-0 block size-2 rounded-full",
			style: {
				left: `${(index * 5.5 + 4) % 96}%`,
				backgroundColor: colors[index % colors.length],
				animationDelay: `${index % 6 * 120}ms`
			}
		}, index))
	});
}
//#endregion
export { KidDecorations as a, illustrationForGoal as c, useGenerateChallenge as d, useGenerateQuiz as f, HeartIllustration as i, useAiChat as l, CoinIllustration as n, SavingsJarIllustration as o, usePersonalizedLearning as p, GiftIllustration as r, StarBadgeIllustration as s, Celebration as t, useFinancialAdvice as u };
