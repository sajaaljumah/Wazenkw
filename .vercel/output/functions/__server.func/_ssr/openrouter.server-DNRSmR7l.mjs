//#region node_modules/.nitro/vite/services/ssr/assets/openrouter.server-DNRSmR7l.js
/**
* OpenRouter AI Server Service for Wazen.
*
* Runs strictly on the server backend. Never imported into client bundles.
* All requests to OpenRouter are made server-to-server.
* Credentials exist only in server environment variables.
* Official API: https://openrouter.ai/api/v1/chat/completions
*/
var OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
/**
* Retrieves the OpenRouter API key from server environment.
* Never logs or returns the key value in public responses.
*/
function getApiKey() {
	const key = process.env.OPENROUTER_API_KEY;
	if (!key || key.trim() === "") return null;
	return key.trim();
}
/**
* Checks whether the OpenRouter key is configured without exposing it.
*/
function isOpenRouterConfigured() {
	return Boolean(getApiKey());
}
/**
* Cleanly extracts JSON from an LLM response string that may contain markdown fences or surrounding text.
*/
function extractJson(rawText) {
	const text = rawText.trim();
	try {
		return JSON.parse(text);
	} catch {
		const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
		if (fenceMatch?.[1]) try {
			return JSON.parse(fenceMatch[1].trim());
		} catch {}
		const firstBrace = text.indexOf("{");
		const lastBrace = text.lastIndexOf("}");
		if (firstBrace !== -1 && lastBrace > firstBrace) try {
			return JSON.parse(text.substring(firstBrace, lastBrace + 1));
		} catch {}
		return null;
	}
}
/**
* Life stage descriptions and prompt tailoring
*/
function describeLifeStage(stage, language) {
	if (language === "ar") switch (stage) {
		case "child": return "طفل (6-12 سنة): أسلوب بسيط جداً، محبب وممتع، أمثلة عن الحصالة وشراء الألعاب والحلوى، ومفهوم الحاجات مقابل الرغبات.";
		case "teenager": return "يافع / مراهق (13-17 سنة): أسلوب تفاعلي وقريب من واقعه، أمثلة عن المصروف الشخصي، الأجهزة الذكية، الخروج مع الأصدقاء، وتحدي التوفير.";
		case "university_student": return "طالب جامعي (18-23 سنة): أسلوب عملي وموجه، إدارة المكافأة الطلابية والمصاريف الجامعية، المواصلات، الكافيهات، والادخار للبدايات.";
		case "employee": return "موظف: تخطيط مالي شخصي، قاعدة 50/30/20، صندوق الطوارئ، تخصيص الراتب، والادخار طويل المدى في بيئة الكويت والخليج.";
		case "self_employed": return "عمل حر / صاحب مشروع صغير: إدارة الدخل غير الثابت، فصل أموال العمل عن الحساب الشخصي، بناء سيولة احتياطية، والتخطيط للتدفقات النقدية.";
		case "parent": return "ولي أمر / والد: ميزانية الأسرة، تعليم الأبناء المسؤولية المالية والمصروف، التوازن بين الالتزامات والأهداف العائلية.";
	}
	else switch (stage) {
		case "child": return "Child (6-12 years): Very simple, playful, and fun tone. Use piggy bank and toy examples, focusing on needs vs wants.";
		case "teenager": return "Teenager (13-17 years): Relatable, modern, engaging tone. Cover pocket money, gadgets, peer outings, and saving habits.";
		case "university_student": return "University Student: Practical and budget-conscious. Cover student allowances, transportation, campus living, and smart spending.";
		case "employee": return "Employee: Structured personal finance, 50/30/20 budgeting, salary allocation, emergency funds, and long-term saving.";
		case "self_employed": return "Self-Employed: Cash flow fluctuations, separating personal from business finances, and building robust liquid reserves.";
		case "parent": return "Parent: Household budgeting, teaching children financial habits, managing family goals, and securing family reserves.";
	}
}
/**
* Builds base system prompt respecting life stage, language, educational stance, and context boundaries.
*/
function buildBaseSystemPrompt(lifeStage = "employee", language = "ar") {
	const stageDesc = describeLifeStage(lifeStage, language);
	if (language === "ar") return `أنت مساعد الذكاء الاصطناعي لمنصة «وازن» المالية (Wazen).
العملة الأساسية للمنصة هي الدينار الكويتي (KWD).
لغة الرد المطلوبة: اللغة العربية السليمة والواضحة.

الجمهور المستهدف والمرحلة الحياتية للمستخدم:
${stageDesc}

إرشادات أساسية صارمة:
1. أنت تقدم توجيهاً وتثقيفاً مالياً عاماً وشخصياً لمساعدة المستخدم في إدارة أمواله بحكمة.
2. لست مستشاراً مالياً معتمداً، ولا تقدم نصائح استثمارية أو قانونية ملزمة.
3. التزم بالبيانات المالية المزودة لك بدقة ولا تختلق أي أرقام أو معاملات وهمية غير موجودة في السياق.
4. لا تطلب أو تكشف أو تشارك أي بيانات سرية أو أرقام حسابات أو كلمات مرور.
5. اجعل التوجيهات قابلة للتطبيق العملي ومشجعة ومناسبة لثقافة المجتمع الكويتي والخليجي.`;
	return `You are the AI Assistant for the "Wazen" (وازن) Financial Platform.
The primary base currency is Kuwaiti Dinar (KWD).
Target Language: English.

User Life Stage & Audience:
${stageDesc}

Strict Core Guidelines:
1. You provide personalized financial education, insights, and guidance to empower smart money habits.
2. You are NOT a certified financial advisor and do not offer certified legal, investment, or tax advice.
3. Strictly stick to any provided financial numbers; NEVER fabricate or invent financial transactions or figures not given.
4. Never ask for, log, or disclose private credentials, account numbers, or passwords.
5. Keep guidance encouraging, actionable, and culturally respectful.`;
}
/**
* 1. Core Chat Completion call to OpenRouter.
*/
async function sendChatCompletion(messages, options = {}) {
	const apiKey = getApiKey();
	if (!apiKey) return {
		success: false,
		error: "NO_API_KEY",
		message: "OpenRouter API key is not configured on the server."
	};
	const model = options.model ?? "openrouter/free";
	const temperature = options.temperature ?? .7;
	const maxTokens = options.max_tokens ?? 2e3;
	const timeoutMs = options.timeoutMs ?? 45e3;
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const response = await fetch(OPENROUTER_BASE_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"HTTP-Referer": "https://wazen.kw",
				"X-Title": "Wazen Financial Platform",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model,
				messages,
				temperature,
				max_tokens: maxTokens
			}),
			signal: controller.signal
		});
		clearTimeout(timeoutId);
		if (!response.ok) {
			if (response.status === 429) return {
				success: false,
				error: "RATE_LIMITED",
				message: "OpenRouter rate limit reached. Please try again shortly."
			};
			return {
				success: false,
				error: "API_ERROR",
				message: (await response.json().catch(() => ({}))).error?.message || `AI service returned HTTP ${response.status}.`
			};
		}
		const data = await response.json();
		const choice = data.choices?.[0];
		const msg = choice?.message;
		const content = (msg?.content || msg?.reasoning || choice?.text || "")?.trim();
		if (!content) return {
			success: false,
			error: "MALFORMED_RESPONSE",
			message: "AI service returned an empty response."
		};
		return {
			success: true,
			content,
			model: data.model || model,
			role: choice?.message?.role || "assistant",
			finishReason: choice?.finish_reason || void 0
		};
	} catch (err) {
		clearTimeout(timeoutId);
		return {
			success: false,
			error: "NETWORK_ERROR",
			message: err instanceof Error && err.name === "AbortError" ? "AI request timed out. Please try again." : err instanceof Error ? err.message : "Network failure contacting AI provider."
		};
	}
}
/**
* 2. Send Financial Advice with Wazen context.
*/
async function sendFinancialAdvice(prompt, context, options = {}) {
	const language = options.language ?? "ar";
	const systemPrompt = `${buildBaseSystemPrompt(options.lifeStage ?? "employee", language)}

تعليمات الاستجابة بصيغة JSON حصراً:
أجب بتنسيق كائن JSON صالح بالشكل التالي:
{
  "advice": "النص الإرشادي الشامل والمخصص للمستخدم",
  "keyPoints": ["نقطة رئيسية 1", "نقطة رئيسية 2", "نقطة رئيسية 3"],
  "disclaimer": "${language === "ar" ? "هذا التوجيه لأغراض تعليمية وإرشادية فقط ولا يعد استشارة مالية أو قانونية معتمدة." : "This guidance is for educational and planning purposes only and does not constitute certified financial or legal advice."}"
}`;
	let contextDescription = "";
	if (context) {
		const parts = [];
		if (context.income !== void 0) parts.push(`Income: ${context.income} KWD`);
		if (context.expenses !== void 0) parts.push(`Expenses: ${context.expenses} KWD`);
		if (context.budget !== void 0) parts.push(`Monthly Budget: ${context.budget} KWD`);
		if (context.savings !== void 0) parts.push(`Savings: ${context.savings} KWD`);
		if (context.emergency_fund !== void 0) parts.push(`Emergency Fund: ${context.emergency_fund} KWD`);
		if (context.goals && context.goals.length > 0) {
			const gStr = context.goals.map((g) => `${g.name} (target: ${g.target} KWD, current: ${g.current ?? 0} KWD)`).join(", ");
			parts.push(`Goals: ${gStr}`);
		}
		if (context.spending_categories && context.spending_categories.length > 0) {
			const catStr = context.spending_categories.map((c) => `${c.category}: ${c.amount} KWD`).join(", ");
			parts.push(`Spending by category: ${catStr}`);
		}
		if (context.investments && context.investments.length > 0) {
			const invStr = context.investments.map((i) => `${i.name}: ${i.value} KWD`).join(", ");
			parts.push(`Investments: ${invStr}`);
		}
		if (context.learning_progress) parts.push(`Learning: XP=${context.learning_progress.xp ?? 0}, streak=${context.learning_progress.streak ?? 0} days`);
		if (parts.length > 0) contextDescription = `\n\nFinancial Context Provided (Kuwaiti Dinar):\n${parts.join("\n")}`;
	}
	const userContent = `${prompt}${contextDescription}`;
	const completion = await sendChatCompletion([{
		role: "system",
		content: systemPrompt
	}, {
		role: "user",
		content: userContent
	}], {
		model: options.model,
		temperature: .6
	});
	if (!completion.success) return completion;
	const parsed = extractJson(completion.content);
	if (parsed && typeof parsed.advice === "string") return {
		success: true,
		data: {
			advice: parsed.advice,
			keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
			disclaimer: parsed.disclaimer || (language === "ar" ? "هذا التوجيه لأغراض تعليمية وإرشادية فقط ولا يعد استشارة مالية معتمدة." : "This guidance is for educational purposes only.")
		}
	};
	return {
		success: true,
		data: {
			advice: completion.content,
			keyPoints: [],
			disclaimer: language === "ar" ? "هذا التوجيه لأغراض تعليمية وإرشادية فقط ولا يعد استشارة مالية معتمدة." : "This guidance is for educational purposes only."
		}
	};
}
/**
* 3. Generate Personalized Learning Lesson.
*/
async function generatePersonalizedLearning(topic, lifeStage = "employee", language = "ar", options = {}) {
	const completion = await sendChatCompletion([{
		role: "system",
		content: `${buildBaseSystemPrompt(lifeStage, language)}

You must generate an engaging, bite-sized, age-appropriate personal finance lesson for the topic: "${topic}".
Output MUST be a valid JSON object matching this structure:
{
  "title": "عنوان الدرس",
  "summary": "ملخص مشوق في سطرين",
  "steps": [
    { "title": "عنوان الخطوة 1", "body": "شرح الخطوة" },
    { "title": "عنوان الخطوة 2", "body": "شرح الخطوة" },
    { "title": "عنوان الخطوة 3", "body": "شرح الخطوة" }
  ],
  "takeaway": "الدرس المستفاد في جملة واحدة ملهمة"
}`
	}, {
		role: "user",
		content: `أنشئ درساً مالياً مخصصاً للمرحلة (${lifeStage}) حول موضوع: ${topic}`
	}], {
		model: options.model,
		temperature: .7
	});
	if (!completion.success) return completion;
	const parsed = extractJson(completion.content);
	if (parsed && parsed.title && Array.isArray(parsed.steps)) return {
		success: true,
		data: {
			topic,
			lifeStage,
			title: parsed.title,
			summary: parsed.summary || "",
			steps: parsed.steps,
			takeaway: parsed.takeaway || ""
		}
	};
	return {
		success: true,
		data: {
			topic,
			lifeStage,
			title: topic,
			summary: completion.content.slice(0, 150),
			steps: [{
				title: topic,
				body: completion.content
			}],
			takeaway: "الوعي المالي بداية الاستقرار."
		}
	};
}
/**
* 4. Generate Interactive Quiz.
*/
async function generateQuiz(topic, lifeStage = "child", language = "ar", questionCount = 3, options = {}) {
	const count = Math.min(Math.max(Number(questionCount) || 3, 1), 10);
	const completion = await sendChatCompletion([{
		role: "system",
		content: `${buildBaseSystemPrompt(lifeStage, language)}

Generate ${count} multiple-choice quiz questions for the topic: "${topic}".
Output MUST be a valid JSON object matching this schema:
{
  "questions": [
    {
      "question": "نص السؤال",
      "options": ["الخيار الأول", "الخيار الثاني", "الخيار الثالث"],
      "answerIndex": 0,
      "explanation": "شرح مبسط للإجابة الصحيحة"
    }
  ]
}`
	}, {
		role: "user",
		content: `Generate ${count} quiz questions about ${topic} suitable for a ${lifeStage}.`
	}], {
		model: options.model,
		temperature: .6
	});
	if (!completion.success) return completion;
	const parsed = extractJson(completion.content);
	if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) return {
		success: true,
		data: {
			topic,
			questions: parsed.questions.map((q, idx) => ({
				question: q.question || `سؤال ${idx + 1}`,
				options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ["نعم", "لا"],
				answerIndex: typeof q.answerIndex === "number" ? q.answerIndex : 0,
				explanation: q.explanation || ""
			}))
		}
	};
	return {
		success: true,
		data: {
			topic,
			questions: [{
				question: `ما هي أهم فائدة للادخار في موضوع ${topic}؟`,
				options: [
					"تحقيق الأهداف وتأمين المستقبل",
					"إنفاق المال فوراً",
					"تجاهل المصاريف"
				],
				answerIndex: 0,
				explanation: "الادخار يساعد في تحقيق الأهداف والتأهب للمستقبل."
			}]
		}
	};
}
/**
* 5. Generate Financial Challenge.
*/
async function generateChallenge(topic, lifeStage = "teenager", language = "ar", options = {}) {
	const completion = await sendChatCompletion([{
		role: "system",
		content: `${buildBaseSystemPrompt(lifeStage, language)}

Generate a practical, motivating financial challenge for the topic: "${topic}".
Output MUST be a valid JSON object matching this schema:
{
  "title": "عنوان التحدي المشجع",
  "description": "وصف التحدي والهدف منه",
  "durationDays": 7,
  "dailyAction": "الإجراء اليومي المطلوب من المستخدم",
  "rewardXp": 50
}`
	}, {
		role: "user",
		content: `أنشئ تحدياً مالياً تفاعلياً وممتعاً لمرحلة (${lifeStage}) في موضوع: ${topic}`
	}], {
		model: options.model,
		temperature: .7
	});
	if (!completion.success) return completion;
	const parsed = extractJson(completion.content);
	if (parsed && parsed.title) return {
		success: true,
		data: {
			topic,
			title: parsed.title,
			description: parsed.description || "",
			durationDays: Number(parsed.durationDays) || 7,
			dailyAction: parsed.dailyAction || "",
			rewardXp: Number(parsed.rewardXp) || 50
		}
	};
	return {
		success: true,
		data: {
			topic,
			title: `تحدي ${topic}`,
			description: "تحدَّ نفسك اليوم في الالتزام بأهدافك المالية.",
			durationDays: 7,
			dailyAction: "سجل مصاريفك وادخر مبلغاً بسيطاً يومياً.",
			rewardXp: 50
		}
	};
}
//#endregion
export { generateChallenge, generatePersonalizedLearning, generateQuiz, isOpenRouterConfigured, sendChatCompletion, sendFinancialAdvice };
