import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, a as cn, w as useSession, x as totalsFor, y as savedForGoal } from "./button-vAj4SDK8.mjs";
import { At as listLearningProgressFn, Dt as getLearningProfileFn, Ft as recordLearningActivityFn, H as QuizIcon, J as SavingsIcon, K as RetryIcon, Lt as startLearningChallengeFn, M as LearnIcon, N as LockedIcon, Q as SpinnerIcon, S as ForwardIcon, T as GameIcon, W as RecommendIcon, et as StreakIcon, ft as calculateAge, gt as checkInLearningChallengeFn, i as AiIcon, k as ICON_STROKE, kt as listLearningChallengesFn, m as CheckIcon, p as ChallengesIcon, q as RewardsIcon, qt as useGoals, rn as useTransactions, s as AppShell, y as ExpandIcon } from "./AppShell-cdoNFpBj.mjs";
import { t as useReveal } from "./use-reveal-CLerR8q0.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CU7WH-S6.mjs";
import { d as useGenerateChallenge, f as useGenerateQuiz, p as usePersonalizedLearning, s as StarBadgeIllustration } from "./illustrations-q4nQvRiv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn-BOrsMGeV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIFFICULTY_LABEL = {
	beginner: {
		en: "Beginner",
		ar: "مبتدئ"
	},
	intermediate: {
		en: "Intermediate",
		ar: "متوسط"
	},
	advanced: {
		en: "Advanced",
		ar: "متقدم"
	}
};
var LESSONS = [
	{
		key: "needs-wants",
		topic: "needs_wants",
		title: {
			en: "My needs and my wants",
			ar: "احتياجاتي ورغباتي"
		},
		summary: {
			en: "Learn the difference between what you need and what you simply want.",
			ar: "تعرّف على الفرق بين ما تحتاجه وما ترغب به فقط."
		},
		minutes: 3,
		xp: 40,
		steps: [
			{
				title: {
					en: "A need keeps you well",
					ar: "الاحتياج يحفظ صحتك"
				},
				body: {
					en: "Food, water, school clothes and medicine are needs. Life becomes hard without them.",
					ar: "الطعام والماء وملابس المدرسة والدواء احتياجات. الحياة تصعب بدونها."
				}
			},
			{
				title: {
					en: "A want is extra joy",
					ar: "الرغبة متعة إضافية"
				},
				body: {
					en: "A new game, sweets or a toy are wants. They are fun, but you can wait for them.",
					ar: "لعبة جديدة أو حلوى أو دمية رغبات. ممتعة، لكن يمكنك الانتظار."
				}
			},
			{
				title: {
					en: "Needs come first",
					ar: "الاحتياجات أولاً"
				},
				body: {
					en: "Cover your needs first, then choose one want you really care about.",
					ar: "غطِّ احتياجاتك أولاً، ثم اختر رغبة واحدة تهمك فعلاً."
				}
			}
		],
		takeaway: {
			en: "Before buying, ask: do I need this, or do I want this?",
			ar: "قبل الشراء اسأل: هل أحتاج هذا أم أرغب به؟"
		}
	},
	{
		key: "how-to-save",
		topic: "saving",
		title: {
			en: "How do I save?",
			ar: "كيف أوفر؟"
		},
		summary: {
			en: "Small amounts, kept safely and often, become a big amount.",
			ar: "المبالغ الصغيرة المحفوظة بانتظام تصبح مبلغاً كبيراً."
		},
		minutes: 3,
		xp: 40,
		steps: [
			{
				title: {
					en: "Save first, not last",
					ar: "ادخر أولاً لا أخيراً"
				},
				body: {
					en: "When you receive money, put a small part aside before you spend anything.",
					ar: "عندما تحصل على مال، ضع جزءاً صغيراً جانباً قبل أن تصرف شيئاً."
				}
			},
			{
				title: {
					en: "Keep it in one place",
					ar: "احفظه في مكان واحد"
				},
				body: {
					en: "Money spread everywhere disappears. One safe place makes it grow visibly.",
					ar: "المال المتفرق يضيع. مكان واحد آمن يجعله ينمو أمام عينيك."
				}
			},
			{
				title: {
					en: "Be steady",
					ar: "كن منتظماً"
				},
				body: {
					en: "Saving a little every week beats saving a lot once and then stopping.",
					ar: "ادخار القليل كل أسبوع أفضل من ادخار الكثير مرة واحدة ثم التوقف."
				}
			}
		],
		takeaway: {
			en: "Steady small saving is the strongest money habit.",
			ar: "الادخار القليل المنتظم أقوى عادة مالية."
		}
	},
	{
		key: "smart-spending",
		topic: "spending",
		title: {
			en: "How do I spend smartly?",
			ar: "كيف أصرف بذكاء؟"
		},
		summary: {
			en: "Compare, wait a little, then decide with a calm mind.",
			ar: "قارن، وانتظر قليلاً، ثم قرّر بعقل هادئ."
		},
		minutes: 3,
		xp: 40,
		steps: [
			{
				title: {
					en: "Compare prices",
					ar: "قارن الأسعار"
				},
				body: {
					en: "The same thing can cost different amounts in different shops.",
					ar: "الشيء نفسه قد يكون بأسعار مختلفة في متاجر مختلفة."
				}
			},
			{
				title: {
					en: "Wait one day",
					ar: "انتظر يوماً واحداً"
				},
				body: {
					en: "If you still want it tomorrow, it matters. Many wishes fade overnight.",
					ar: "إذا بقيت ترغب به غداً فهو مهم. كثير من الرغبات تختفي بين ليلة وصباح."
				}
			},
			{
				title: {
					en: "Count what is left",
					ar: "احسب ما تبقّى"
				},
				body: {
					en: "Before paying, think about what you still need this week.",
					ar: "قبل الدفع، فكّر بما تحتاجه هذا الأسبوع."
				}
			}
		],
		takeaway: {
			en: "A smart buyer thinks first and pays second.",
			ar: "المشتري الذكي يفكر أولاً ويدفع ثانياً."
		}
	},
	{
		key: "what-is-budget",
		topic: "budget",
		title: {
			en: "What is a budget?",
			ar: "ما هي الميزانية؟"
		},
		summary: {
			en: "A budget is a simple plan for your money before you use it.",
			ar: "الميزانية خطة بسيطة لمالك قبل أن تستخدمه."
		},
		minutes: 4,
		xp: 50,
		steps: [
			{
				title: {
					en: "Start with what you have",
					ar: "ابدأ بما لديك"
				},
				body: {
					en: "Write down the money you received this month.",
					ar: "اكتب المال الذي حصلت عليه هذا الشهر."
				}
			},
			{
				title: {
					en: "Give every part a job",
					ar: "أعطِ كل جزء مهمة"
				},
				body: {
					en: "Some for needs, some for saving, some for giving, a little for fun.",
					ar: "جزء للاحتياجات، وجزء للادخار، وجزء للعطاء، وقليل للمتعة."
				}
			},
			{
				title: {
					en: "Check at the end",
					ar: "راجع في النهاية"
				},
				body: {
					en: "Compare your plan with what really happened, then improve next month.",
					ar: "قارن خطتك بما حدث فعلاً، ثم حسّنها الشهر القادم."
				}
			}
		],
		takeaway: {
			en: "A budget is you deciding, instead of money deciding for you.",
			ar: "الميزانية أن تقرر أنت، بدلاً من أن يقرر المال عنك."
		}
	},
	{
		key: "set-a-goal",
		topic: "goals",
		title: {
			en: "How do I set my goal?",
			ar: "كيف أحدد هدفي؟"
		},
		summary: {
			en: "A clear goal with a date turns saving into a game you can win.",
			ar: "الهدف الواضح بتاريخ محدد يحوّل الادخار إلى لعبة تفوز بها."
		},
		minutes: 3,
		xp: 40,
		steps: [
			{
				title: {
					en: "Name it",
					ar: "سمِّ هدفك"
				},
				body: {
					en: "\"A bicycle\" is a goal. \"Something nice\" is not.",
					ar: "«دراجة» هدف. «شيء جميل» ليس هدفاً."
				}
			},
			{
				title: {
					en: "Know the price",
					ar: "اعرف السعر"
				},
				body: {
					en: "Find the real price so you know how much to save.",
					ar: "اعرف السعر الحقيقي لتعرف كم تحتاج أن تدخر."
				}
			},
			{
				title: {
					en: "Split it into weeks",
					ar: "قسّمه على الأسابيع"
				},
				body: {
					en: "Divide the price by the weeks you have. That is your weekly amount.",
					ar: "اقسم السعر على عدد الأسابيع المتاحة. هذا مبلغك الأسبوعي."
				}
			}
		],
		takeaway: {
			en: "Named goal + real price + weekly amount = you get there.",
			ar: "هدف واضح + سعر حقيقي + مبلغ أسبوعي = تصل."
		}
	},
	{
		key: "why-we-give",
		topic: "giving",
		title: {
			en: "Why do we give to others?",
			ar: "لماذا نعطي الآخرين؟"
		},
		summary: {
			en: "Giving is a habit of the heart, and it can be small.",
			ar: "العطاء عادة من القلب، ويمكن أن يكون بسيطاً."
		},
		minutes: 3,
		xp: 40,
		steps: [
			{
				title: {
					en: "Giving helps people",
					ar: "العطاء يساعد الناس"
				},
				body: {
					en: "A small amount from many people solves big problems.",
					ar: "مبلغ صغير من كثير من الناس يحل مشاكل كبيرة."
				}
			},
			{
				title: {
					en: "Giving is voluntary",
					ar: "العطاء تطوعي"
				},
				body: {
					en: "Sadaqah is a gift you choose to give whenever you wish.",
					ar: "الصدقة عطاء تختاره متى شئت."
				}
			},
			{
				title: {
					en: "Plan a little for it",
					ar: "خطّط له قليلاً"
				},
				body: {
					en: "Keeping a small part for giving makes it a habit, not a surprise.",
					ar: "تخصيص جزء صغير للعطاء يجعله عادة لا مفاجأة."
				}
			}
		],
		takeaway: {
			en: "Kindness costs little and matters a lot.",
			ar: "الإحسان يكلف قليلاً ويعني كثيراً."
		}
	},
	{
		key: "what-is-zakat",
		topic: "zakat",
		title: {
			en: "What is Zakat? (learning only)",
			ar: "ما هي الزكاة؟ (تعليمي فقط)"
		},
		summary: {
			en: "An educational introduction. This lesson does not calculate any Zakat for you.",
			ar: "مقدمة تعليمية. هذا الدرس لا يحسب أي زكاة عليك."
		},
		minutes: 4,
		xp: 50,
		steps: [
			{
				title: {
					en: "Zakat is a pillar",
					ar: "الزكاة من أركان الإسلام"
				},
				body: {
					en: "It is a known right of the poor in the wealth of adults who own enough wealth for a full year.",
					ar: "هي حق معلوم للفقراء في مال الكبار الذين يملكون نصاباً لمدة سنة كاملة."
				}
			},
			{
				title: {
					en: "It has conditions",
					ar: "لها شروط"
				},
				body: {
					en: "There is a minimum amount (Nisab) and a full lunar year (Hawl) before Zakat is due.",
					ar: "هناك حد أدنى (النصاب) وسنة هجرية كاملة (الحول) قبل أن تجب الزكاة."
				}
			},
			{
				title: {
					en: "Different from Sadaqah",
					ar: "تختلف عن الصدقة"
				},
				body: {
					en: "Sadaqah is voluntary and any amount. Zakat is an obligation with rules.",
					ar: "الصدقة تطوعية وبأي مبلغ. الزكاة فريضة لها أحكام."
				}
			},
			{
				title: {
					en: "Learning now, not paying now",
					ar: "تعلّم الآن لا دفع الآن"
				},
				body: {
					en: "You are learning the idea. Wazen only calculates Zakat for accounts the rules apply to.",
					ar: "أنت تتعلم الفكرة. وازن يحسب الزكاة فقط للحسابات التي تنطبق عليها الأحكام."
				}
			}
		],
		takeaway: {
			en: "Zakat is an obligation of adult wealth; this page is education only.",
			ar: "الزكاة فريضة في مال الكبار؛ وهذه الصفحة للتعليم فقط."
		}
	}
];
var GAMES = [
	{
		key: "needs-or-wants",
		topic: "needs_wants",
		title: {
			en: "Needs or wants?",
			ar: "الاحتياجات أم الرغبات؟"
		},
		summary: {
			en: "Sort things quickly into needs and wants.",
			ar: "صنّف الأشياء بسرعة إلى احتياجات ورغبات."
		},
		how: {
			en: "You will see one thing at a time. Tap Need or Want. Harder levels add trickier items.",
			ar: "سيظهر لك شيء واحد كل مرة. اختر احتياج أو رغبة. المستويات الأصعب تضيف أشياء أذكى."
		},
		rounds: 8
	},
	{
		key: "build-your-budget",
		topic: "budget",
		title: {
			en: "Build your budget",
			ar: "ابنِ ميزانيتك"
		},
		summary: {
			en: "Share your coins between saving, needs, giving and fun.",
			ar: "وزّع نقودك بين الادخار والاحتياجات والعطاء والمتعة."
		},
		how: {
			en: "You have coins to place. Cover the needs, save something, give something, and do not go over.",
			ar: "لديك نقود لتوزّعها. غطِّ الاحتياجات، وادخر شيئاً، وأعطِ شيئاً، ولا تتجاوز المبلغ."
		},
		rounds: 3
	},
	{
		key: "save-for-goal",
		topic: "goals",
		title: {
			en: "Save for your goal",
			ar: "ادخر لهدفك"
		},
		summary: {
			en: "Make weekly choices and reach your goal in time.",
			ar: "اتخذ قرارات أسبوعية وحقّق هدفك في الوقت."
		},
		how: {
			en: "Every week you choose what to do with your money. Reach the goal before the weeks end.",
			ar: "كل أسبوع تختار ما تفعله بمالك. اصل إلى الهدف قبل انتهاء الأسابيع."
		},
		rounds: 6
	},
	{
		key: "smart-shopper",
		topic: "spending",
		title: {
			en: "Smart shopper",
			ar: "المتسوق الذكي"
		},
		summary: {
			en: "Pick the better value in each pair.",
			ar: "اختر الخيار الأفضل قيمة في كل مقارنة."
		},
		how: {
			en: "Two offers appear. Choose the one that gives more value for the money.",
			ar: "يظهر عرضان. اختر العرض الذي يعطي قيمة أكبر للمال."
		},
		rounds: 6
	},
	{
		key: "money-mission",
		topic: "saving",
		title: {
			en: "Money mission",
			ar: "مهمة المال"
		},
		summary: {
			en: "Quick money decisions, one after another.",
			ar: "قرارات مالية سريعة، واحداً بعد الآخر."
		},
		how: {
			en: "Answer fast money questions in a row. Each right answer moves the mission forward.",
			ar: "أجب على أسئلة مالية سريعة بالتتابع. كل إجابة صحيحة تُقدّم المهمة."
		},
		rounds: 7
	}
];
var gameMeta = (key) => GAMES.find((game) => game.key === key);
/** Needs-or-wants items, grouped by how tricky they are. */
var NEEDS_WANTS_ITEMS = [
	{
		label: {
			en: "Drinking water",
			ar: "ماء الشرب"
		},
		need: true,
		level: "beginner"
	},
	{
		label: {
			en: "School bag",
			ar: "حقيبة المدرسة"
		},
		need: true,
		level: "beginner"
	},
	{
		label: {
			en: "Video game",
			ar: "لعبة إلكترونية"
		},
		need: false,
		level: "beginner"
	},
	{
		label: {
			en: "Candy",
			ar: "حلوى"
		},
		need: false,
		level: "beginner"
	},
	{
		label: {
			en: "Medicine",
			ar: "دواء"
		},
		need: true,
		level: "beginner"
	},
	{
		label: {
			en: "Toy car",
			ar: "سيارة لعبة"
		},
		need: false,
		level: "beginner"
	},
	{
		label: {
			en: "Winter jacket",
			ar: "معطف الشتاء"
		},
		need: true,
		level: "beginner"
	},
	{
		label: {
			en: "Stickers",
			ar: "ملصقات"
		},
		need: false,
		level: "beginner"
	},
	{
		label: {
			en: "School shoes",
			ar: "حذاء المدرسة"
		},
		need: true,
		level: "intermediate"
	},
	{
		label: {
			en: "A second pair of party shoes",
			ar: "حذاء مناسبات ثانٍ"
		},
		need: false,
		level: "intermediate"
	},
	{
		label: {
			en: "Notebook for class",
			ar: "دفتر للحصة"
		},
		need: true,
		level: "intermediate"
	},
	{
		label: {
			en: "Fancy pen set",
			ar: "طقم أقلام فخم"
		},
		need: false,
		level: "intermediate"
	},
	{
		label: {
			en: "Healthy lunch",
			ar: "غداء صحي"
		},
		need: true,
		level: "intermediate"
	},
	{
		label: {
			en: "Restaurant dessert",
			ar: "تحلية من المطعم"
		},
		need: false,
		level: "intermediate"
	},
	{
		label: {
			en: "Bus fare to school",
			ar: "أجرة الباص للمدرسة"
		},
		need: true,
		level: "advanced"
	},
	{
		label: {
			en: "Taxi because I woke up late",
			ar: "تاكسي لأنني تأخرت"
		},
		need: false,
		level: "advanced"
	},
	{
		label: {
			en: "Eyeglasses I was prescribed",
			ar: "نظارة طبية موصوفة لي"
		},
		need: true,
		level: "advanced"
	},
	{
		label: {
			en: "Sunglasses like my friend's",
			ar: "نظارة شمسية مثل صديقي"
		},
		need: false,
		level: "advanced"
	},
	{
		label: {
			en: "Refill for my water bottle",
			ar: "تعبئة قارورة الماء"
		},
		need: true,
		level: "advanced"
	},
	{
		label: {
			en: "New bottle because the colour is nicer",
			ar: "قارورة جديدة لأن لونها أجمل"
		},
		need: false,
		level: "advanced"
	}
];
/** Smart-shopper comparisons: which offer gives more value? */
var SHOPPER_PAIRS = [
	{
		question: {
			en: "Same juice, two shops",
			ar: "نفس العصير، متجران"
		},
		options: [{
			en: "1 bottle for 0.500 KWD",
			ar: "قارورة بـ 0.500 د.ك"
		}, {
			en: "2 bottles for 0.700 KWD",
			ar: "قارورتان بـ 0.700 د.ك"
		}],
		better: 1,
		why: {
			en: "Two bottles cost 0.350 each — cheaper per bottle.",
			ar: "القارورتان بـ 0.350 لكل واحدة — أرخص للقارورة."
		},
		level: "beginner"
	},
	{
		question: {
			en: "The notebook you need",
			ar: "الدفتر الذي تحتاجه"
		},
		options: [{
			en: "Plain notebook for 0.400 KWD",
			ar: "دفتر عادي بـ 0.400 د.ك"
		}, {
			en: "Same notebook with a cartoon cover for 1.200 KWD",
			ar: "نفس الدفتر بغلاف مرسوم بـ 1.200 د.ك"
		}],
		better: 0,
		why: {
			en: "Both write the same. The cover costs three times more.",
			ar: "الاثنان يكتبان بنفس الجودة. الغلاف يكلف ثلاثة أضعاف."
		},
		level: "beginner"
	},
	{
		question: {
			en: "A snack every school day",
			ar: "وجبة خفيفة كل يوم دراسي"
		},
		options: [{
			en: "Buy one daily for 0.250 KWD",
			ar: "شراء واحدة يومياً بـ 0.250 د.ك"
		}, {
			en: "A family pack of 10 for 1.500 KWD",
			ar: "عبوة عائلية من 10 بـ 1.500 د.ك"
		}],
		better: 1,
		why: {
			en: "The pack is 0.150 each instead of 0.250.",
			ar: "العبوة 0.150 للواحدة بدل 0.250."
		},
		level: "intermediate"
	},
	{
		question: {
			en: "A game you already own",
			ar: "لعبة تملكها بالفعل"
		},
		options: [{
			en: "Buy a newer copy for 8 KWD",
			ar: "شراء نسخة أحدث بـ 8 د.ك"
		}, {
			en: "Keep yours and save the 8 KWD",
			ar: "احتفظ بلعبتك وادخر الـ 8 د.ك"
		}],
		better: 1,
		why: {
			en: "Paying twice for the same fun is not value.",
			ar: "الدفع مرتين لنفس المتعة ليس قيمة."
		},
		level: "intermediate"
	},
	{
		question: {
			en: "Big offer, short use",
			ar: "عرض كبير، استخدام قصير"
		},
		options: [{
			en: "10 pens for 1 KWD, you need 2",
			ar: "10 أقلام بـ 1 د.ك وتحتاج قلمين"
		}, {
			en: "2 pens for 0.300 KWD",
			ar: "قلمان بـ 0.300 د.ك"
		}],
		better: 1,
		why: {
			en: "A discount on things you will not use is still spending.",
			ar: "الخصم على ما لن تستخدمه يبقى صرفاً."
		},
		level: "advanced"
	},
	{
		question: {
			en: "Waiting has a price",
			ar: "الانتظار له سعر"
		},
		options: [{
			en: "Buy the shoes today for 12 KWD",
			ar: "شراء الحذاء اليوم بـ 12 د.ك"
		}, {
			en: "The same shoes next week in the sale for 8 KWD",
			ar: "نفس الحذاء الأسبوع القادم بالتخفيض بـ 8 د.ك"
		}],
		better: 1,
		why: {
			en: "If you can wait, waiting saved 4 KWD.",
			ar: "إذا كان بإمكانك الانتظار، فقد وفّر 4 د.ك."
		},
		level: "advanced"
	}
];
/** Budget game rounds: coins to place across four jobs. */
var BUDGET_ROUNDS = [
	{
		money: 10,
		needs: 4,
		minSave: 2,
		minGive: 1,
		story: {
			en: "You received 10 KWD this month.",
			ar: "حصلت على 10 د.ك هذا الشهر."
		}
	},
	{
		money: 8,
		needs: 3,
		minSave: 2,
		minGive: 1,
		story: {
			en: "This month you have 8 KWD only.",
			ar: "هذا الشهر لديك 8 د.ك فقط."
		}
	},
	{
		money: 14,
		needs: 6,
		minSave: 4,
		minGive: 1,
		story: {
			en: "A gift made it 14 KWD — plan carefully.",
			ar: "هدية جعلت المبلغ 14 د.ك — خطّط بعناية."
		}
	}
];
/** Weekly decisions in the goal game. */
var GOAL_CHOICES = [
	{
		label: {
			en: "Save most of my allowance",
			ar: "أدخر معظم مصروفي"
		},
		save: 3,
		hint: {
			en: "Fast progress",
			ar: "تقدّم سريع"
		}
	},
	{
		label: {
			en: "Save half, spend half",
			ar: "أدخر النصف وأصرف النصف"
		},
		save: 2,
		hint: {
			en: "Balanced",
			ar: "متوازن"
		}
	},
	{
		label: {
			en: "Buy snacks, save a little",
			ar: "أشتري وجبات وأدخر قليلاً"
		},
		save: 1,
		hint: {
			en: "Slow progress",
			ar: "تقدّم بطيء"
		}
	},
	{
		label: {
			en: "Spend everything this week",
			ar: "أصرف كل شيء هذا الأسبوع"
		},
		save: 0,
		hint: {
			en: "No progress",
			ar: "بلا تقدّم"
		}
	}
];
var QUIZ_BANK = [
	{
		key: "q-nw-1",
		topic: "needs_wants",
		difficulty: "beginner",
		prompt: {
			en: "Which one is a need?",
			ar: "أي واحد منها احتياج؟"
		},
		options: [
			{
				en: "Drinking water",
				ar: "ماء الشرب"
			},
			{
				en: "A new toy",
				ar: "دمية جديدة"
			},
			{
				en: "Chocolate",
				ar: "شوكولاتة"
			}
		],
		answer: 0,
		explain: {
			en: "Water keeps you healthy — that is a need.",
			ar: "الماء يحفظ صحتك — هذا احتياج."
		}
	},
	{
		key: "q-nw-2",
		topic: "needs_wants",
		difficulty: "intermediate",
		prompt: {
			en: "You have school shoes that fit. New party shoes are…",
			ar: "لديك حذاء مدرسة مناسب. حذاء المناسبات الجديد هو…"
		},
		options: [
			{
				en: "A want",
				ar: "رغبة"
			},
			{
				en: "A need",
				ar: "احتياج"
			},
			{
				en: "Free money",
				ar: "مال مجاني"
			}
		],
		answer: 0,
		explain: {
			en: "Your feet are already covered, so the extra pair is a want.",
			ar: "قدماك مغطّاتان بالفعل، فالحذاء الإضافي رغبة."
		}
	},
	{
		key: "q-nw-3",
		topic: "needs_wants",
		difficulty: "advanced",
		prompt: {
			en: "Bus fare to school and a taxi because you slept late — which is the need?",
			ar: "أجرة الباص للمدرسة وتاكسي لأنك تأخرت — أيّهما الاحتياج؟"
		},
		options: [
			{
				en: "The bus fare",
				ar: "أجرة الباص"
			},
			{
				en: "The taxi",
				ar: "التاكسي"
			},
			{
				en: "Both the same",
				ar: "الاثنان سواء"
			}
		],
		answer: 0,
		explain: {
			en: "The bus gets you there normally; the taxi paid for a mistake.",
			ar: "الباص وسيلتك المعتادة؛ التاكسي دفعتَه بسبب خطأ."
		}
	},
	{
		key: "q-sv-1",
		topic: "saving",
		difficulty: "beginner",
		prompt: {
			en: "When is the best time to save?",
			ar: "ما أفضل وقت للادخار؟"
		},
		options: [
			{
				en: "Right when I get money",
				ar: "عند حصولي على المال"
			},
			{
				en: "After I spend everything",
				ar: "بعد أن أصرف كل شيء"
			},
			{
				en: "Never",
				ar: "أبداً"
			}
		],
		answer: 0,
		explain: {
			en: "Save first, then spend what is left.",
			ar: "ادخر أولاً، ثم اصرف ما تبقّى."
		}
	},
	{
		key: "q-sv-2",
		topic: "saving",
		difficulty: "intermediate",
		prompt: {
			en: "You save 1 KWD every week. How much after 6 weeks?",
			ar: "تدخر 1 د.ك كل أسبوع. كم يصبح المبلغ بعد 6 أسابيع؟"
		},
		options: [
			{
				en: "6 KWD",
				ar: "6 د.ك"
			},
			{
				en: "3 KWD",
				ar: "3 د.ك"
			},
			{
				en: "12 KWD",
				ar: "12 د.ك"
			}
		],
		answer: 0,
		explain: {
			en: "1 × 6 = 6 KWD.",
			ar: "1 × 6 = 6 د.ك."
		}
	},
	{
		key: "q-sv-3",
		topic: "saving",
		difficulty: "advanced",
		prompt: {
			en: "Which habit builds savings fastest?",
			ar: "أي عادة تبني الادخار أسرع؟"
		},
		options: [
			{
				en: "A small amount every week without stopping",
				ar: "مبلغ صغير كل أسبوع دون توقف"
			},
			{
				en: "A big amount once a year",
				ar: "مبلغ كبير مرة في السنة"
			},
			{
				en: "Saving only what is left at the end",
				ar: "ادخار ما يتبقى في النهاية فقط"
			}
		],
		answer: 0,
		explain: {
			en: "Regular saving beats rare big attempts.",
			ar: "الانتظام يتغلب على المحاولات الكبيرة النادرة."
		}
	},
	{
		key: "q-sp-1",
		topic: "spending",
		difficulty: "beginner",
		prompt: {
			en: "Before buying something, what should you do first?",
			ar: "قبل شراء شيء، ماذا تفعل أولاً؟"
		},
		options: [
			{
				en: "Think if I really need it",
				ar: "أفكر إن كنت أحتاجه فعلاً"
			},
			{
				en: "Buy it quickly",
				ar: "أشتريه بسرعة"
			},
			{
				en: "Ask for more money",
				ar: "أطلب مالاً أكثر"
			}
		],
		answer: 0,
		explain: {
			en: "Thinking first prevents regret.",
			ar: "التفكير أولاً يمنع الندم."
		}
	},
	{
		key: "q-sp-2",
		topic: "spending",
		difficulty: "intermediate",
		prompt: {
			en: "The same pencil case is 1 KWD in one shop and 2 KWD in another. What do you do?",
			ar: "نفس المقلمة بـ 1 د.ك في متجر وبـ 2 د.ك في آخر. ماذا تفعل؟"
		},
		options: [
			{
				en: "Buy the 1 KWD one",
				ar: "أشتري التي بـ 1 د.ك"
			},
			{
				en: "Buy the 2 KWD one",
				ar: "أشتري التي بـ 2 د.ك"
			},
			{
				en: "Buy both",
				ar: "أشتري الاثنتين"
			}
		],
		answer: 0,
		explain: {
			en: "Same item, lower price — you keep 1 KWD.",
			ar: "نفس الشيء بسعر أقل — تحتفظ بـ 1 د.ك."
		}
	},
	{
		key: "q-bd-1",
		topic: "budget",
		difficulty: "beginner",
		prompt: {
			en: "What is a budget?",
			ar: "ما هي الميزانية؟"
		},
		options: [
			{
				en: "A plan for my money",
				ar: "خطة لمالي"
			},
			{
				en: "A kind of shop",
				ar: "نوع من المتاجر"
			},
			{
				en: "A game only",
				ar: "لعبة فقط"
			}
		],
		answer: 0,
		explain: {
			en: "A budget plans money before you use it.",
			ar: "الميزانية تخطّط للمال قبل استخدامه."
		}
	},
	{
		key: "q-bd-2",
		topic: "budget",
		difficulty: "advanced",
		prompt: {
			en: "You have 10 KWD: needs 4, saving 3, giving 1. How much is left for fun?",
			ar: "لديك 10 د.ك: احتياجات 4، ادخار 3، عطاء 1. كم يتبقى للمتعة؟"
		},
		options: [
			{
				en: "2 KWD",
				ar: "2 د.ك"
			},
			{
				en: "4 KWD",
				ar: "4 د.ك"
			},
			{
				en: "0 KWD",
				ar: "0 د.ك"
			}
		],
		answer: 0,
		explain: {
			en: "10 − 4 − 3 − 1 = 2 KWD.",
			ar: "10 − 4 − 3 − 1 = 2 د.ك."
		}
	},
	{
		key: "q-gl-1",
		topic: "goals",
		difficulty: "beginner",
		prompt: {
			en: "Which is a clear goal?",
			ar: "أي واحد هدف واضح؟"
		},
		options: [
			{
				en: "A bicycle for 30 KWD by summer",
				ar: "دراجة بـ 30 د.ك قبل الصيف"
			},
			{
				en: "Something nice",
				ar: "شيء جميل"
			},
			{
				en: "More money",
				ar: "مال أكثر"
			}
		],
		answer: 0,
		explain: {
			en: "A clear goal has a name, a price and a date.",
			ar: "الهدف الواضح له اسم وسعر وتاريخ."
		}
	},
	{
		key: "q-gl-2",
		topic: "goals",
		difficulty: "intermediate",
		prompt: {
			en: "Your goal costs 20 KWD and you have 10 weeks. How much per week?",
			ar: "هدفك بـ 20 د.ك ولديك 10 أسابيع. كم في الأسبوع؟"
		},
		options: [
			{
				en: "2 KWD",
				ar: "2 د.ك"
			},
			{
				en: "5 KWD",
				ar: "5 د.ك"
			},
			{
				en: "1 KWD",
				ar: "1 د.ك"
			}
		],
		answer: 0,
		explain: {
			en: "20 ÷ 10 = 2 KWD each week.",
			ar: "20 ÷ 10 = 2 د.ك كل أسبوع."
		}
	},
	{
		key: "q-hb-1",
		topic: "saving",
		difficulty: "intermediate",
		prompt: {
			en: "Your friends are all buying something you do not need. You…",
			ar: "أصدقاؤك يشترون شيئاً لا تحتاجه. أنت…"
		},
		options: [
			{
				en: "Keep my money for my goal",
				ar: "أحتفظ بمالي لهدفي"
			},
			{
				en: "Buy it so I look the same",
				ar: "أشتريه لأبدو مثلهم"
			},
			{
				en: "Borrow money to buy it",
				ar: "أستلف مالاً لأشتريه"
			}
		],
		answer: 0,
		explain: {
			en: "Your goal matters more than matching others.",
			ar: "هدفك أهم من مجاراة الآخرين."
		}
	},
	{
		key: "q-gv-1",
		topic: "giving",
		difficulty: "beginner",
		prompt: {
			en: "Sadaqah (giving) is…",
			ar: "الصدقة هي…"
		},
		options: [
			{
				en: "Voluntary, any amount",
				ar: "تطوعية، بأي مبلغ"
			},
			{
				en: "Only for adults",
				ar: "للكبار فقط"
			},
			{
				en: "Only very large amounts",
				ar: "للمبالغ الكبيرة فقط"
			}
		],
		answer: 0,
		explain: {
			en: "Any small amount, given willingly, counts.",
			ar: "أي مبلغ صغير يُعطى برضا له قيمة."
		}
	},
	{
		key: "q-zk-1",
		topic: "zakat",
		difficulty: "intermediate",
		prompt: {
			en: "How is Zakat different from Sadaqah?",
			ar: "كيف تختلف الزكاة عن الصدقة؟"
		},
		options: [
			{
				en: "Zakat is an obligation with rules; Sadaqah is voluntary",
				ar: "الزكاة فريضة لها أحكام؛ والصدقة تطوعية"
			},
			{
				en: "They are exactly the same",
				ar: "هما نفس الشيء تماماً"
			},
			{
				en: "Sadaqah must be paid once a year",
				ar: "الصدقة تُدفع مرة في السنة"
			}
		],
		answer: 0,
		explain: {
			en: "Zakat has a minimum amount and a full year; Sadaqah is a free gift.",
			ar: "للزكاة نصاب وحول كامل؛ والصدقة عطاء حر."
		}
	}
];
/** Quick-fire questions for the money-mission game (reuses the quiz bank). */
var missionQuestions = (level) => {
	return (level === "beginner" ? ["beginner", "intermediate"] : level === "intermediate" ? [
		"intermediate",
		"beginner",
		"advanced"
	] : ["advanced", "intermediate"]).flatMap((d) => QUIZ_BANK.filter((q) => q.difficulty === d)).slice(0, 7);
};
var CHALLENGES = [
	{
		key: "save-7-days",
		title: {
			en: "Save for 7 days",
			ar: "تحدي الادخار لمدة 7 أيام"
		},
		description: {
			en: "Put something aside every day for a week.",
			ar: "ضع شيئاً جانباً كل يوم لمدة أسبوع."
		},
		targetDays: 7,
		reward: {
			en: "Saving Star badge",
			ar: "شارة نجم الادخار"
		},
		xp: 70
	},
	{
		key: "no-extra-buying",
		title: {
			en: "No unnecessary buying",
			ar: "تحدي عدم الشراء غير الضروري"
		},
		description: {
			en: "For 5 days, buy needs only.",
			ar: "لمدة 5 أيام، اشترِ الاحتياجات فقط."
		},
		targetDays: 5,
		reward: {
			en: "Smart Shopper badge",
			ar: "شارة المتسوق الذكي"
		},
		xp: 60
	},
	{
		key: "steady-saver",
		title: {
			en: "Keep saving",
			ar: "تحدي الادخار المستمر"
		},
		description: {
			en: "Check in for 14 days of steady saving.",
			ar: "سجّل حضورك 14 يوماً من الادخار المستمر."
		},
		targetDays: 14,
		reward: {
			en: "Saving Hero badge",
			ar: "شارة بطل الادخار"
		},
		xp: 120
	}
];
var challengeMeta = (key) => CHALLENGES.find((item) => item.key === key);
var LEVELS$1 = [
	{
		min: 0,
		label: {
			en: "Level 1 — Explorer",
			ar: "المستوى 1 — مستكشف"
		}
	},
	{
		min: 150,
		label: {
			en: "Level 2 — Saver",
			ar: "المستوى 2 — مدخر"
		}
	},
	{
		min: 350,
		label: {
			en: "Level 3 — Planner",
			ar: "المستوى 3 — مخطط"
		}
	},
	{
		min: 650,
		label: {
			en: "Level 4 — Money Star",
			ar: "المستوى 4 — نجم المال"
		}
	},
	{
		min: 1e3,
		label: {
			en: "Level 5 — Money Hero",
			ar: "المستوى 5 — بطل المال"
		}
	}
];
function levelFor(xp) {
	let index = 0;
	LEVELS$1.forEach((level, i) => {
		if (xp >= level.min) index = i;
	});
	const next = LEVELS$1[index + 1];
	const current = LEVELS$1[index];
	const span = next ? next.min - current.min : 1;
	const into = next ? xp - current.min : span;
	return {
		index,
		label: current.label,
		nextAt: next?.min ?? null,
		percentToNext: next ? Math.min(100, Math.round(into / span * 100)) : 100
	};
}
var completed = (context, type, key) => context.progress.filter((row) => row.activity_type === type && row.status === "completed" && (!key || row.activity_key === key));
var BADGES = [
	{
		key: "first-saver",
		label: {
			en: "First saver",
			ar: "أول مدخر"
		},
		hint: {
			en: "Save money for the first time",
			ar: "ادخر مالاً لأول مرة"
		},
		earned: (c) => c.totalSaved > 0
	},
	{
		key: "little-saver",
		label: {
			en: "Little saver",
			ar: "مدخر صغير"
		},
		hint: {
			en: "Finish the saving lesson",
			ar: "أكمل درس الادخار"
		},
		earned: (c) => completed(c, "lesson", "how-to-save").length > 0
	},
	{
		key: "saving-star",
		label: {
			en: "Saving star",
			ar: "نجم الادخار"
		},
		hint: {
			en: "Reach half of your goal",
			ar: "اوصل إلى نصف هدفك"
		},
		earned: (c) => c.goalPercent >= 50
	},
	{
		key: "saving-hero",
		label: {
			en: "Saving hero",
			ar: "بطل الادخار"
		},
		hint: {
			en: "Finish a saving challenge",
			ar: "أكمل تحدي ادخار"
		},
		earned: (c) => c.challenges.some((row) => row.status === "completed")
	},
	{
		key: "smart-shopper",
		label: {
			en: "Smart shopper",
			ar: "المتسوق الذكي"
		},
		hint: {
			en: "Win the smart shopper game",
			ar: "افز بلعبة المتسوق الذكي"
		},
		earned: (c) => completed(c, "game", "smart-shopper").length > 0
	},
	{
		key: "budget-builder",
		label: {
			en: "Budget builder",
			ar: "صانع الميزانية"
		},
		hint: {
			en: "Win the build-your-budget game",
			ar: "افز بلعبة ابنِ ميزانيتك"
		},
		earned: (c) => completed(c, "game", "build-your-budget").length > 0
	},
	{
		key: "goal-owner",
		label: {
			en: "Goal owner",
			ar: "صاحب الهدف"
		},
		hint: {
			en: "Have a savings goal of your own",
			ar: "اجعل لك هدف ادخار"
		},
		earned: (c) => c.hasGoal
	}
];
/**
* One next step, chosen from stored progress — never random.
* Order: unfinished lesson → unplayed game → weak-topic quiz → nearly-earned
* badge → open challenge.
*/
function recommendNext(context) {
	const doneLesson = new Set(completed(context, "lesson").map((row) => row.activity_key));
	const nextLesson = LESSONS.find((lesson) => !doneLesson.has(lesson.key));
	if (nextLesson) return {
		kind: "lesson",
		key: nextLesson.key,
		title: nextLesson.title,
		reason: {
			en: "Continue where you stopped",
			ar: "أكمل من حيث توقفت"
		}
	};
	const playedGames = new Set(context.progress.filter((row) => row.activity_type === "game").map((row) => row.activity_key));
	const nextGame = GAMES.find((game) => !playedGames.has(game.key));
	if (nextGame) return {
		kind: "game",
		key: nextGame.key,
		title: nextGame.title,
		reason: {
			en: "A new game is waiting for you",
			ar: "لعبة جديدة تنتظرك"
		}
	};
	const weakGame = context.progress.filter((row) => row.activity_type === "game" && row.max_score > 0 && row.best_score / row.max_score < .7).sort((a, b) => a.best_score / a.max_score - b.best_score / b.max_score)[0];
	if (weakGame) {
		const meta = GAMES.find((game) => game.key === weakGame.activity_key);
		if (meta) return {
			kind: "game",
			key: meta.key,
			title: meta.title,
			reason: {
				en: "Try this one again for a higher score",
				ar: "أعد المحاولة لدرجة أعلى"
			}
		};
	}
	const nearBadge = BADGES.find((badge) => !badge.earned(context) && badge.key === "saving-star");
	if (nearBadge && context.goalPercent >= 35) return {
		kind: "badge",
		key: nearBadge.key,
		title: nearBadge.label,
		reason: {
			en: "You are close to earning it",
			ar: "أنت قريب من الحصول عليها"
		}
	};
	const quizRow = context.progress.find((row) => row.activity_type === "quiz");
	const level = nextQuizDifficulty(context.progress);
	if (!quizRow || quizRow.max_score > 0 && quizRow.best_score / quizRow.max_score < .8) return {
		kind: "quiz",
		key: `quiz-${level}`,
		title: {
			en: "Test your knowledge",
			ar: "اختبر معلوماتك"
		},
		reason: DIFFICULTY_LABEL[level]
	};
	const openChallenge = CHALLENGES.find((meta) => !context.challenges.some((row) => row.challenge_key === meta.key));
	if (openChallenge) return {
		kind: "challenge",
		key: openChallenge.key,
		title: openChallenge.title,
		reason: {
			en: "Start a new challenge",
			ar: "ابدأ تحدياً جديداً"
		}
	};
	return {
		kind: "quiz",
		key: `quiz-${level}`,
		title: {
			en: "Test your knowledge",
			ar: "اختبر معلوماتك"
		},
		reason: DIFFICULTY_LABEL[level]
	};
}
/** Quiz difficulty grows with real results, so no two quizzes feel identical. */
function nextQuizDifficulty(progress) {
	const quizzes = progress.filter((row) => row.activity_type === "quiz" && row.max_score > 0);
	if (quizzes.length === 0) return "beginner";
	const best = quizzes.reduce((top, row) => Math.max(top, row.best_score / row.max_score), 0);
	if (quizzes.some((row) => row.difficulty === "advanced" && row.best_score / row.max_score >= .8)) return "advanced";
	if (quizzes.some((row) => row.difficulty === "intermediate" && row.best_score / row.max_score >= .8)) return "advanced";
	if (best >= .7) return "intermediate";
	return "beginner";
}
/** Topics the child answered weakest, so quizzes lean on what needs practice. */
function weakTopics(progress) {
	const scored = progress.filter((row) => row.max_score > 0 && row.topic).map((row) => ({
		topic: row.topic,
		ratio: row.best_score / row.max_score
	})).sort((a, b) => a.ratio - b.ratio).filter((row) => row.ratio < .8).map((row) => row.topic);
	return Array.from(new Set(scored));
}
/** Build a personalised 6-question quiz from age, difficulty and weak topics. */
function buildQuiz(options) {
	const { difficulty, weak, age } = options;
	const allowZakat = (age ?? 10) >= 9;
	const pool = QUIZ_BANK.filter((question) => allowZakat || question.topic !== "zakat");
	const order = difficulty === "beginner" ? [
		"beginner",
		"intermediate",
		"advanced"
	] : difficulty === "intermediate" ? [
		"intermediate",
		"beginner",
		"advanced"
	] : [
		"advanced",
		"intermediate",
		"beginner"
	];
	const ranked = [...pool].sort((a, b) => {
		const level = order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
		if (level !== 0) return level;
		return (weak.includes(a.topic) ? 0 : 1) - (weak.includes(b.topic) ? 0 : 1);
	});
	const chosen = [];
	const topics = /* @__PURE__ */ new Set();
	ranked.forEach((question) => {
		if (chosen.length >= 6) return;
		if (topics.has(question.topic) && chosen.length < 4) return;
		topics.add(question.topic);
		chosen.push(question);
	});
	return chosen.slice(0, 6);
}
var LEARN_COPY = {
	en: {
		learn: "Learn",
		pageTitle: "Learn with Wazen",
		pageIntro: "Short lessons, real games and small challenges that build good money habits.",
		recommended: "Recommended for you",
		start: "Start",
		progressTitle: "My learning progress",
		progressCaption: "See what you have built, then choose one next step.",
		overall: "Overall progress",
		lessonsDone: "Lessons completed",
		level: "Current level",
		streak: "Day streak",
		badgesEarned: "Badges earned",
		nextUp: "Next activity",
		xpToNext: "to the next level",
		lessons: "My lessons",
		lessonsCaption: "Small ideas you can use with real money.",
		games: "My games",
		gamesCaption: "Practise your choices in a safe place.",
		quiz: "Test your knowledge",
		quizCaption: "A short check based on what you have practised.",
		challenges: "My challenges",
		challengesCaption: "Turn one good choice into a steady habit.",
		achievements: "My achievements",
		minutes: "min",
		completedTag: "Completed",
		reviewAgain: "Review again",
		play: "Play",
		playAgain: "Play again",
		howToPlay: "How to play",
		score: "Score",
		bestScore: "Best",
		correct: "Correct!",
		wrong: "Not this time",
		finish: "Finish",
		next: "Next",
		done: "Done",
		close: "Close",
		winTitle: "Great work!",
		tryAgainTitle: "Good try!",
		winBody: "You finished this round.",
		tryAgainBody: "Play again to raise your score.",
		quizIntro: "Six questions chosen for you from what you have practised.",
		startQuiz: "Start quiz",
		yourResult: "Your result",
		question: "Question",
		difficulty: "Level",
		checkIn: "Check in today",
		checkedInToday: "Checked in today",
		startChallenge: "Start challenge",
		daysDone: "days done",
		daysLeft: "days left",
		reward: "Reward",
		challengeComplete: "Challenge completed",
		active: "Active",
		earned: "Earned",
		locked: "Keep going",
		lockedNote: "Locked badges are simply your next goals.",
		saving: "Saving…",
		zakatNote: "This is a lesson about Zakat. It does not calculate Zakat for you.",
		stepOf: "of",
		takeaway: "Remember",
		lessonDone: "Lesson completed",
		markComplete: "I finished this lesson",
		budgetNeeds: "Needs",
		budgetSave: "Saving",
		budgetGive: "Giving",
		budgetFun: "Fun",
		coinsLeft: "Coins left",
		submitPlan: "Check my plan",
		need: "Need",
		want: "Want",
		week: "Week",
		savedSoFar: "Saved so far",
		goalTarget: "Goal",
		goalReached: "You reached your goal!",
		goalMissed: "The weeks ended before the goal."
	},
	ar: {
		learn: "تعلّم",
		pageTitle: "تعلّم مع وازن",
		pageIntro: "دروس قصيرة وألعاب حقيقية وتحديات صغيرة تبني عادات مالية جيدة.",
		recommended: "مقترح لك",
		start: "ابدأ",
		progressTitle: "تقدمي في التعلم",
		progressCaption: "شاهد ما حققته، ثم اختر خطوتك التالية.",
		overall: "التقدم العام",
		lessonsDone: "الدروس المكتملة",
		level: "المستوى الحالي",
		streak: "أيام متتابعة",
		badgesEarned: "الشارات المكتسبة",
		nextUp: "النشاط القادم",
		xpToNext: "للمستوى التالي",
		lessons: "دروسي",
		lessonsCaption: "أفكار صغيرة يمكنك استخدامها مع أموالك الحقيقية.",
		games: "ألعابي",
		gamesCaption: "تدرّب على اختياراتك في مساحة آمنة.",
		quiz: "اختبر معلوماتك",
		quizCaption: "اختبار قصير مبني على ما تدرّبت عليه.",
		challenges: "تحدياتي",
		challengesCaption: "حوّل اختياراً جيداً إلى عادة ثابتة.",
		achievements: "إنجازاتي",
		minutes: "دقيقة",
		completedTag: "مكتمل",
		reviewAgain: "راجع مرة أخرى",
		play: "العب",
		playAgain: "العب مرة أخرى",
		howToPlay: "طريقة اللعب",
		score: "النقاط",
		bestScore: "الأفضل",
		correct: "إجابة صحيحة!",
		wrong: "ليست هذه المرة",
		finish: "إنهاء",
		next: "التالي",
		done: "تم",
		close: "إغلاق",
		winTitle: "عمل رائع!",
		tryAgainTitle: "محاولة جيدة!",
		winBody: "أكملت هذه الجولة.",
		tryAgainBody: "العب مرة أخرى لترفع نقاطك.",
		quizIntro: "ست أسئلة مختارة لك بناءً على ما تدرّبت عليه.",
		startQuiz: "ابدأ الاختبار",
		yourResult: "نتيجتك",
		question: "سؤال",
		difficulty: "المستوى",
		checkIn: "سجّل اليوم",
		checkedInToday: "تم التسجيل اليوم",
		startChallenge: "ابدأ التحدي",
		daysDone: "أيام منجزة",
		daysLeft: "أيام متبقية",
		reward: "المكافأة",
		challengeComplete: "تم إكمال التحدي",
		active: "جارٍ",
		earned: "مكتسبة",
		locked: "واصل",
		lockedNote: "الشارات المقفلة هي أهدافك القادمة فقط.",
		saving: "جارٍ الحفظ…",
		zakatNote: "هذا درس عن الزكاة، ولا يحسب عليك زكاة.",
		stepOf: "من",
		takeaway: "تذكّر",
		lessonDone: "تم إكمال الدرس",
		markComplete: "أكملت هذا الدرس",
		budgetNeeds: "الاحتياجات",
		budgetSave: "الادخار",
		budgetGive: "العطاء",
		budgetFun: "المتعة",
		coinsLeft: "المتبقي",
		submitPlan: "تحقّق من خطتي",
		need: "احتياج",
		want: "رغبة",
		week: "الأسبوع",
		savedSoFar: "المدخر حتى الآن",
		goalTarget: "الهدف",
		goalReached: "وصلت إلى هدفك!",
		goalMissed: "انتهت الأسابيع قبل الوصول للهدف."
	}
};
/** Learn-page copy, resolved from the account language (Arabic by default). */
function useLearnCopy() {
	const { language } = useWazenLocale();
	return {
		language,
		lc: (key) => LEARN_COPY[language][key],
		s: (text) => text[language]
	};
}
/** Soft progress bar that eases to its value — used across the Learn page. */
function LearnProgressBar({ percent, className, tone = "champagne" }) {
	const { ref, revealed } = useReveal();
	const [width, setWidth] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!revealed) return;
		const frame = window.requestAnimationFrame(() => setWidth(Math.max(0, Math.min(100, percent))));
		return () => window.cancelAnimationFrame(frame);
	}, [percent, revealed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("wazen-progress-track h-3 w-full overflow-hidden rounded-full bg-kid-soft/70", className),
		"data-complete": percent >= 100 ? "true" : void 0,
		role: "progressbar",
		"aria-valuenow": Math.round(percent),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("wazen-progress-fill h-full rounded-full transition-[width] duration-700 ease-out", tone === "deep" ? "bg-kid-deep" : "bg-kid-champagne"),
			style: { width: `${width}%` }
		})
	});
}
function LearnSection({ title, caption, icon, children, collapsible = false, defaultOpen = false }) {
	const { ref, revealed } = useReveal();
	if (collapsible) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		ref,
		"data-revealed": revealed,
		className: "kid-panel wazen-reveal group p-5 sm:p-6",
		open: defaultOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "flex min-w-0 cursor-pointer list-none items-start gap-3 focus-visible:outline-hidden",
			children: [
				icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-kid-soft/70 text-kid-deep",
					children: icon
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-lg font-semibold sm:text-xl",
						children: title
					}), caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs text-muted-foreground sm:text-sm",
						children: caption
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-kid-soft/70 text-kid-deep transition-transform group-open:rotate-180",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 border-t border-kid-soft pt-5",
			children
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		"data-revealed": revealed,
		className: "wazen-reveal space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex min-w-0 items-start gap-3 px-1",
			children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-kid-soft/70 text-kid-deep",
				children: icon
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "truncate text-lg sm:text-xl",
					children: title
				}), caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground sm:text-sm",
					children: caption
				}) : null]
			})]
		}), children]
	});
}
function LearnStat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "kid-panel min-w-0 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate text-xl tabular-nums sm:text-2xl",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate text-[0.7rem] text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
/** Shared dialog frame for lessons, games and quizzes. */
function LearnDialog({ open, onClose, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next ? onClose() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "kid-theme max-h-[88vh] overflow-y-auto rounded-[1.75rem] bg-card sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "text-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-xl sm:text-2xl",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: description })]
			}), children]
		})
	});
}
function LearnButton({ children, onClick, variant = "primary", disabled, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		disabled,
		className: cn("kid-press inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-55", variant === "primary" ? "bg-kid-deep text-kid-ivory" : "border border-kid-soft bg-kid-tint text-kid-deep", className),
		children
	});
}
/** Correct / incorrect feedback line with calm, non-shaming wording. */
function Feedback({ state, message }) {
	if (!state) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "status",
		className: cn("kid-pop rounded-2xl px-4 py-3 text-sm", state === "correct" ? "bg-kid-soft/70 text-kid-deep" : "border border-border bg-secondary/60 text-foreground"),
		children: message
	});
}
function useLearningProfile() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["learning-profile", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			return await getLearningProfileFn({ data: { authToken: session?.access_token } }) ?? null;
		}
	});
}
function useLearningProgress() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["learning-progress", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			return await listLearningProgressFn({ data: { authToken: session?.access_token } }) ?? [];
		}
	});
}
function useLearningChallenges() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["learning-challenges", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			return await listLearningChallengesFn({ data: { authToken: session?.access_token } }) ?? [];
		}
	});
}
function useInvalidateLearning() {
	const queryClient = useQueryClient();
	return async () => {
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: ["learning-profile"] }),
			queryClient.invalidateQueries({ queryKey: ["learning-progress"] }),
			queryClient.invalidateQueries({ queryKey: ["learning-challenges"] })
		]);
	};
}
/** Records a lesson, game or quiz result and keeps the best score. */
function useRecordActivity() {
	const { session } = useSession();
	const invalidate = useInvalidateLearning();
	return useMutation({
		mutationFn: async (result) => {
			await recordLearningActivityFn({ data: {
				authToken: session?.access_token,
				result
			} });
		},
		onSuccess: invalidate
	});
}
function useStartChallenge() {
	const { session } = useSession();
	const invalidate = useInvalidateLearning();
	return useMutation({
		mutationFn: async ({ key, targetDays }) => {
			await startLearningChallengeFn({ data: {
				authToken: session?.access_token,
				key,
				targetDays
			} });
		},
		onSuccess: invalidate
	});
}
/** One check-in per day; finishing the target completes the challenge. */
function useCheckInChallenge() {
	const { session } = useSession();
	const invalidate = useInvalidateLearning();
	return useMutation({
		mutationFn: async (challenge) => {
			await checkInLearningChallengeFn({ data: {
				authToken: session?.access_token,
				challengeId: challenge.id
			} });
		},
		onSuccess: invalidate
	});
}
/** Short, stepped lesson — one idea per screen instead of a wall of text. */
function LessonDialog({ lesson, onClose, alreadyDone }) {
	const { lc, s } = useLearnCopy();
	const record = useRecordActivity();
	const [step, setStep] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => setStep(0), [lesson?.key]);
	const settled = record.isSuccess || record.isError;
	(0, import_react.useEffect)(() => {
		if (settled) onClose();
	}, [settled, onClose]);
	if (!lesson) return null;
	const total = lesson.steps.length + 1;
	const isTakeaway = step === lesson.steps.length;
	const current = lesson.steps[Math.min(step, lesson.steps.length - 1)];
	const finish = () => {
		record.mutate({
			activity_type: "lesson",
			activity_key: lesson.key,
			topic: lesson.topic,
			score: 100,
			max_score: 100,
			completed: true,
			xp: alreadyDone ? 0 : lesson.xp
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnDialog, {
		open: true,
		onClose,
		title: s(lesson.title),
		description: s(lesson.summary),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, { percent: (step + 1) / total * 100 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							step + 1,
							" ",
							lc("stepOf"),
							" ",
							total
						]
					})]
				}),
				lesson.topic === "zakat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-xs text-muted-foreground",
					children: lc("zakatNote")
				}) : null,
				isTakeaway ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-kid-tint p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-kid-deep",
						children: lc("takeaway")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base sm:text-lg",
						children: s(lesson.takeaway)
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-kid-tint p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base sm:text-lg",
						children: s(current.title)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: s(current.body)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [isTakeaway ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
						onClick: finish,
						disabled: record.isPending,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}), record.isPending ? lc("saving") : lc("markComplete")]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
						onClick: () => setStep((value) => value + 1),
						children: [lc("next"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForwardIcon, {
							className: "size-4 rtl:rotate-180",
							strokeWidth: ICON_STROKE
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
						variant: "soft",
						onClick: onClose,
						children: lc("close")
					})]
				})
			]
		})
	});
}
/**
* Personalised quiz: powered by OpenRouter AI when available, targeting the
* topics the child scored lowest in, with seamless fallback to static question bank.
*/
function QuizDialog({ open, onClose, progress, age }) {
	const { lc, s } = useLearnCopy();
	const { isArabic } = useWazenLocale();
	const isAr = isArabic;
	const record = useRecordActivity();
	const aiQuizMutation = useGenerateQuiz();
	const difficulty = (0, import_react.useMemo)(() => nextQuizDifficulty(progress), [progress]);
	const staticQuestions = (0, import_react.useMemo)(() => buildQuiz({
		difficulty,
		weak: weakTopics(progress),
		age
	}), [
		difficulty,
		progress,
		age
	]);
	const [aiQuestions, setAiQuestions] = (0, import_react.useState)(null);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setAiQuestions(null);
			setIndex(0);
			setPicked(null);
			setScore(0);
			setFinished(false);
			return;
		}
		const topic = weakTopics(progress)[0] ?? "saving";
		const lifeStage = age && age >= 13 ? "teenager" : "child";
		aiQuizMutation.mutate({
			topic,
			lifeStage,
			language: isAr ? "ar" : "en",
			questionCount: 3
		}, {
			onSuccess: (res) => {
				if (res?.questions && res.questions.length > 0) {
					const mapped = res.questions.map((q, qIndex) => ({
						id: `ai-${qIndex}`,
						topic: res.topic || topic,
						difficulty,
						prompt: {
							ar: q.question,
							en: q.question
						},
						options: q.options.map((opt) => ({
							ar: opt,
							en: opt
						})),
						answer: q.answerIndex,
						explanation: {
							ar: q.explanation,
							en: q.explanation
						}
					}));
					setAiQuestions(mapped);
				}
			},
			onError: () => {
				setAiQuestions(null);
			}
		});
	}, [open]);
	const questions = aiQuestions && aiQuestions.length > 0 ? aiQuestions : staticQuestions;
	const isAiQuiz = Boolean(aiQuestions && aiQuestions.length > 0);
	const question = questions[index];
	const answer = (option) => {
		if (picked !== null || !question) return;
		setPicked(option);
		if (option === question.answer) setScore((value) => value + 1);
	};
	const advance = () => {
		if (index + 1 < questions.length) {
			setIndex(index + 1);
			setPicked(null);
			return;
		}
		setFinished(true);
		record.mutate({
			activity_type: "quiz",
			activity_key: isAiQuiz ? `ai-quiz-${difficulty}` : `quiz-${difficulty}`,
			topic: question?.topic ?? "saving",
			score,
			max_score: questions.length,
			completed: score >= Math.ceil(questions.length * .6),
			difficulty,
			xp: score * 10
		});
	};
	const restart = () => {
		setIndex(0);
		setPicked(null);
		setScore(0);
		setFinished(false);
	};
	const close = () => {
		restart();
		onClose();
	};
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnDialog, {
		open,
		onClose: close,
		title: lc("quiz"),
		description: `${lc("quizIntro")} · ${lc("difficulty")}: ${s(DIFFICULTY_LABEL[difficulty])}${isAiQuiz ? " · ✨ الذكاء الاصطناعي" : ""}`,
		children: aiQuizMutation.isPending && !aiQuestions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center space-y-3 py-10 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: isAr ? "وازِن يجهز اختباراً مخصصاً لك بالذكاء الاصطناعي..." : "Wazen AI is crafting your personalized quiz..."
			})]
		}) : finished || !question ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: lc("yourResult")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-4xl tabular-nums",
					children: [
						score,
						"/",
						questions.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: score >= questions.length / 2 ? lc("winBody") : lc("tryAgainBody")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
						onClick: restart,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}), lc("playAgain")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
						variant: "soft",
						onClick: close,
						children: lc("done")
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, { percent: (index + (picked === null ? 0 : 1)) / questions.length * 100 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							lc("question"),
							" ",
							index + 1,
							" ",
							lc("stepOf"),
							" ",
							questions.length
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								lc("score"),
								": ",
								score
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base sm:text-lg",
					children: s(question.prompt)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: question.options.map((option, optionIndex) => {
						const isAnswer = optionIndex === question.answer;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => answer(optionIndex),
							disabled: picked !== null,
							className: ["kid-press w-full rounded-2xl border px-4 py-3 text-start text-sm transition-colors", picked === null ? "border-kid-soft bg-kid-tint hover:bg-kid-soft/60" : isAnswer ? "border-kid-mid bg-kid-soft/70" : picked === optionIndex ? "border-border bg-secondary/60" : "border-border bg-card opacity-70"].join(" "),
							children: s(option)
						}) }, optionIndex);
					})
				}),
				picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
					state: picked === question.answer ? "correct" : "wrong",
					message: `${picked === question.answer ? lc("correct") : lc("wrong")} — ${s(question.explain)}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
					onClick: advance,
					children: [index + 1 < questions.length ? lc("next") : lc("finish"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					})]
				})] }) : null
			]
		})
	});
}
var LEVELS = [
	"beginner",
	"intermediate",
	"advanced"
];
function NeedsOrWants({ level, onFinish }) {
	const { lc, s } = useLearnCopy();
	const items = (0, import_react.useMemo)(() => {
		const allowed = level === "beginner" ? ["beginner"] : level === "intermediate" ? ["beginner", "intermediate"] : ["intermediate", "advanced"];
		return NEEDS_WANTS_ITEMS.filter((item) => allowed.includes(item.level)).slice(0, 8);
	}, [level]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [state, setState] = (0, import_react.useState)(null);
	const item = items[index];
	if (!item) return null;
	const answer = (asNeed) => {
		if (state) return;
		const right = asNeed === item.need;
		if (right) setScore((value) => value + 1);
		setState(right ? "correct" : "wrong");
		window.setTimeout(() => {
			if (index + 1 >= items.length) {
				onFinish(right ? score + 1 : score, items.length);
				return;
			}
			setIndex(index + 1);
			setState(null);
		}, 850);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundHeader, {
				index,
				total: items.length,
				score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-28 items-center justify-center rounded-2xl bg-kid-tint p-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg sm:text-xl",
					children: s(item.label)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
					onClick: () => answer(true),
					disabled: !!state,
					children: lc("need")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
					variant: "soft",
					onClick: () => answer(false),
					disabled: !!state,
					children: lc("want")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				state,
				message: state === "correct" ? lc("correct") : lc("wrong")
			})
		]
	});
}
function BuildYourBudget({ level, onFinish }) {
	const { lc, s } = useLearnCopy();
	const [round, setRound] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [state, setState] = (0, import_react.useState)(null);
	const [plan, setPlan] = (0, import_react.useState)({
		needs: 0,
		save: 0,
		give: 0,
		fun: 0
	});
	const bonus = level === "advanced" ? 1 : level === "intermediate" ? 0 : 0;
	const config = BUDGET_ROUNDS[Math.min(round, BUDGET_ROUNDS.length - 1)];
	const target = {
		...config,
		minSave: config.minSave + bonus
	};
	const used = plan.needs + plan.save + plan.give + plan.fun;
	const left = target.money - used;
	const buckets = [
		{
			key: "needs",
			label: lc("budgetNeeds")
		},
		{
			key: "save",
			label: lc("budgetSave")
		},
		{
			key: "give",
			label: lc("budgetGive")
		},
		{
			key: "fun",
			label: lc("budgetFun")
		}
	];
	const check = () => {
		if (state) return;
		const ok = plan.needs >= target.needs && plan.save >= target.minSave && plan.give >= target.minGive && used <= target.money;
		if (ok) setScore((value) => value + 1);
		setState(ok ? "correct" : "wrong");
		window.setTimeout(() => {
			if (round + 1 >= BUDGET_ROUNDS.length) {
				onFinish(ok ? score + 1 : score, BUDGET_ROUNDS.length);
				return;
			}
			setRound(round + 1);
			setPlan({
				needs: 0,
				save: 0,
				give: 0,
				fun: 0
			});
			setState(null);
		}, 1100);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundHeader, {
				index: round,
				total: BUDGET_ROUNDS.length,
				score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-kid-tint p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: s(target.story)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						lc("budgetNeeds"),
						" ≥ ",
						target.needs,
						" · ",
						lc("budgetSave"),
						" ≥ ",
						target.minSave,
						" ·",
						" ",
						lc("budgetGive"),
						" ≥ ",
						target.minGive
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: buckets.map((bucket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-kid-soft bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate text-sm",
						children: bucket.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `-1 ${bucket.label}`,
								className: "kid-press size-9 rounded-full border border-kid-soft bg-kid-tint text-base",
								onClick: () => setPlan((value) => ({
									...value,
									[bucket.key]: Math.max(0, value[bucket.key] - 1)
								})),
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-center tabular-nums",
								children: plan[bucket.key]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `+1 ${bucket.label}`,
								className: "kid-press size-9 rounded-full bg-kid-deep text-base text-kid-ivory",
								disabled: left <= 0,
								onClick: () => setPlan((value) => left <= 0 ? value : {
									...value,
									[bucket.key]: value[bucket.key] + 1
								}),
								children: "+"
							})
						]
					})]
				}, bucket.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					lc("coinsLeft"),
					": ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-foreground",
						children: left
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
				onClick: check,
				disabled: !!state,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
					className: "size-4",
					strokeWidth: ICON_STROKE
				}), lc("submitPlan")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				state,
				message: state === "correct" ? lc("correct") : lc("wrong")
			})
		]
	});
}
function SaveForGoal({ level, onFinish }) {
	const { lc, s } = useLearnCopy();
	const weeks = 6;
	const target = level === "advanced" ? 16 : level === "intermediate" ? 13 : 10;
	const [week, setWeek] = (0, import_react.useState)(1);
	const [saved, setSaved] = (0, import_react.useState)(0);
	const choose = (amount) => {
		const total = saved + amount;
		if (week >= weeks || total >= target) {
			const score = total >= target ? weeks : Math.max(0, Math.round(total / target * weeks));
			setSaved(total);
			onFinish(Math.min(score, weeks), weeks);
			return;
		}
		setSaved(total);
		setWeek(week + 1);
	};
	const percent = Math.min(100, saved / target * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-kid-tint p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						lc("week"),
						" ",
						week,
						" ",
						lc("stepOf"),
						" ",
						weeks
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [
							lc("goalTarget"),
							": ",
							target
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-center gap-2 text-lg tabular-nums",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsIcon, {
						className: "size-5 text-kid-deep",
						strokeWidth: ICON_STROKE
					}), saved]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, {
					percent,
					className: "mt-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: lc("savedSoFar")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: GOAL_CHOICES.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => choose(choice.save),
				className: "kid-press w-full rounded-2xl border border-kid-soft bg-card px-4 py-3 text-start text-sm hover:bg-kid-tint",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block",
					children: s(choice.label)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted-foreground",
					children: s(choice.hint)
				})]
			}) }, choice.save))
		})]
	});
}
function SmartShopper({ level, onFinish }) {
	const { lc, s } = useLearnCopy();
	const pairs = (0, import_react.useMemo)(() => {
		return (level === "beginner" ? ["beginner", "intermediate"] : level === "intermediate" ? ["intermediate", "beginner"] : ["advanced", "intermediate"]).flatMap((d) => SHOPPER_PAIRS.filter((pair) => pair.level === d)).slice(0, 6);
	}, [level]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const pair = pairs[index];
	if (!pair) return null;
	const answer = (option) => {
		if (picked !== null) return;
		setPicked(option);
		const right = option === pair.better;
		if (right) setScore((value) => value + 1);
		window.setTimeout(() => {
			if (index + 1 >= pairs.length) {
				onFinish(right ? score + 1 : score, pairs.length);
				return;
			}
			setIndex(index + 1);
			setPicked(null);
		}, 1200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundHeader, {
				index,
				total: pairs.length,
				score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base sm:text-lg",
				children: s(pair.question)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: pair.options.map((option, optionIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => answer(optionIndex),
					disabled: picked !== null,
					className: cn("kid-press rounded-2xl border px-4 py-3 text-start text-sm", picked === null ? "border-kid-soft bg-kid-tint hover:bg-kid-soft/60" : optionIndex === pair.better ? "border-kid-mid bg-kid-soft/70" : "border-border bg-card opacity-70"),
					children: s(option)
				}, optionIndex))
			}),
			picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				state: picked === pair.better ? "correct" : "wrong",
				message: `${picked === pair.better ? lc("correct") : lc("wrong")} — ${s(pair.why)}`
			}) : null
		]
	});
}
function MoneyMission({ level, onFinish }) {
	const { lc, s } = useLearnCopy();
	const questions = (0, import_react.useMemo)(() => missionQuestions(level), [level]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [seconds, setSeconds] = (0, import_react.useState)(15);
	const question = questions[index];
	(0, import_react.useEffect)(() => {
		setSeconds(15);
		const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1e3);
		return () => window.clearInterval(timer);
	}, [index]);
	(0, import_react.useEffect)(() => {
		if (seconds > 0 || picked !== null) return;
		setPicked(-1);
		const timeout = window.setTimeout(() => {
			if (index + 1 >= questions.length) onFinish(score, questions.length);
			else {
				setIndex(index + 1);
				setPicked(null);
			}
		}, 900);
		return () => window.clearTimeout(timeout);
	}, [
		seconds,
		picked,
		index,
		questions.length,
		score,
		onFinish
	]);
	if (!question) return null;
	const answer = (option) => {
		if (picked !== null) return;
		setPicked(option);
		const right = option === question.answer;
		if (right) setScore((value) => value + 1);
		window.setTimeout(() => {
			if (index + 1 >= questions.length) {
				onFinish(right ? score + 1 : score, questions.length);
				return;
			}
			setIndex(index + 1);
			setPicked(null);
		}, 950);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundHeader, {
				index,
				total: questions.length,
				score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, {
				percent: seconds / 15 * 100,
				tone: "deep"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base sm:text-lg",
				children: s(question.prompt)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: question.options.map((option, optionIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => answer(optionIndex),
					disabled: picked !== null,
					className: cn("kid-press rounded-2xl border px-4 py-3 text-start text-sm", picked === null ? "border-kid-soft bg-kid-tint hover:bg-kid-soft/60" : optionIndex === question.answer ? "border-kid-mid bg-kid-soft/70" : "border-border bg-card opacity-70"),
					children: s(option)
				}, optionIndex))
			}),
			picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				state: picked === question.answer ? "correct" : "wrong",
				message: `${picked === question.answer ? lc("correct") : lc("wrong")} — ${s(question.explain)}`
			}) : null
		]
	});
}
function RoundHeader({ index, total, score }) {
	const { lc } = useLearnCopy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, { percent: index / total * 100 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				index + 1,
				" ",
				lc("stepOf"),
				" ",
				total
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums",
				children: [
					lc("score"),
					": ",
					score
				]
			})]
		})]
	});
}
var GAME_COMPONENT = {
	"needs-or-wants": NeedsOrWants,
	"build-your-budget": BuildYourBudget,
	"save-for-goal": SaveForGoal,
	"smart-shopper": SmartShopper,
	"money-mission": MoneyMission
};
/** Instructions → gameplay → win/try-again, with progress saved on finish. */
function GameDialog({ gameKey, onClose, progress }) {
	const { lc, s } = useLearnCopy();
	const record = useRecordActivity();
	const [level, setLevel] = (0, import_react.useState)("beginner");
	const [phase, setPhase] = (0, import_react.useState)("intro");
	const [result, setResult] = (0, import_react.useState)({
		score: 0,
		max: 0
	});
	const [round, setRound] = (0, import_react.useState)(0);
	const row = progress.find((item) => item.activity_type === "game" && item.activity_key === gameKey);
	(0, import_react.useEffect)(() => {
		if (!gameKey) return;
		setPhase("intro");
		setResult({
			score: 0,
			max: 0
		});
		const best = row && row.max_score > 0 ? row.best_score / row.max_score : 0;
		setLevel(best >= .85 ? "advanced" : best >= .6 ? "intermediate" : "beginner");
	}, [gameKey]);
	if (!gameKey) return null;
	const meta = gameMeta(gameKey);
	const Game = GAME_COMPONENT[gameKey];
	const finish = (score, max) => {
		setResult({
			score,
			max
		});
		setPhase("result");
		record.mutate({
			activity_type: "game",
			activity_key: gameKey,
			topic: meta.topic,
			score,
			max_score: max,
			completed: score >= Math.ceil(max * .7),
			difficulty: level,
			xp: score * 8
		});
	};
	const won = result.max > 0 && result.score >= Math.ceil(result.max * .7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnDialog, {
		open: true,
		onClose,
		title: s(meta.title),
		description: s(meta.summary),
		children: phase === "intro" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-kid-tint p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-kid-deep",
						children: lc("howToPlay")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: s(meta.how)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: lc("difficulty")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-3 gap-2",
					children: LEVELS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setLevel(option),
						className: cn("kid-press min-h-10 rounded-xl border px-2 text-xs", option === level ? "border-kid-mid bg-kid-soft/70 text-kid-deep" : "border-kid-soft bg-card"),
						children: s(DIFFICULTY_LABEL[option])
					}, option))
				})] }),
				row ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground tabular-nums",
					children: [
						lc("bestScore"),
						": ",
						row.best_score,
						"/",
						row.max_score
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
					onClick: () => {
						setRound((value) => value + 1);
						setPhase("play");
					},
					children: lc("play")
				})
			]
		}) : phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {
			level,
			onFinish: finish
		}, `${gameKey}-${level}-${round}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg",
					children: won ? lc("winTitle") : lc("tryAgainTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-4xl tabular-nums",
					children: [
						result.score,
						"/",
						result.max
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: won ? lc("winBody") : lc("tryAgainBody")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
						onClick: () => {
							setRound((value) => value + 1);
							setPhase("play");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}), lc("playAgain")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
						variant: "soft",
						onClick: onClose,
						children: lc("done")
					})]
				})
			]
		})
	});
}
function LearnPage() {
	const navigate = useNavigate();
	const { lc, s, language } = useLearnCopy();
	const { data: profile, isLoading: profileLoading } = useProfile();
	const progress = useLearningProgress();
	const learning = useLearningProfile();
	const challenges = useLearningChallenges();
	const transactions = useTransactions();
	const goals = useGoals();
	const startChallenge = useStartChallenge();
	const checkIn = useCheckInChallenge();
	const [lesson, setLesson] = (0, import_react.useState)(null);
	const [game, setGame] = (0, import_react.useState)(null);
	const [quizOpen, setQuizOpen] = (0, import_react.useState)(false);
	const [customAiChallenges, setCustomAiChallenges] = (0, import_react.useState)([]);
	const personalizedLesson = usePersonalizedLearning();
	const personalizedChallenge = useGenerateChallenge();
	const handleGenerateAiLesson = () => {
		const weak = weakTopics(progress.data ?? [])[0] ?? "saving";
		personalizedLesson.mutate({
			topic: weak,
			lifeStage: "child",
			language: language === "ar" ? "ar" : "en"
		}, { onSuccess: (res) => {
			const aiLesson = {
				key: `ai-lesson-${Date.now()}`,
				topic: res.topic || "saving",
				title: {
					en: res.title,
					ar: res.title
				},
				summary: {
					en: res.summary,
					ar: res.summary
				},
				minutes: 3,
				xp: 50,
				steps: res.steps.map((st) => ({
					title: {
						en: st.title,
						ar: st.title
					},
					body: {
						en: st.body,
						ar: st.body
					}
				})),
				takeaway: {
					en: res.takeaway,
					ar: res.takeaway
				}
			};
			setLesson(aiLesson);
		} });
	};
	const handleGenerateAiChallenge = () => {
		const weak = weakTopics(progress.data ?? [])[0] ?? "saving";
		personalizedChallenge.mutate({
			topic: weak,
			lifeStage: "child",
			language: language === "ar" ? "ar" : "en"
		}, { onSuccess: (res) => {
			const newChallenge = {
				key: `ai-challenge-${Date.now()}`,
				title: {
					en: res.title,
					ar: res.title
				},
				description: {
					en: res.description,
					ar: res.description
				},
				targetDays: res.durationDays || 5,
				reward: {
					en: `🌟 ${res.rewardXp || 60} XP + Smart Saver Badge`,
					ar: `🌟 ${res.rewardXp || 60} نقطة خبرة + شارة الموفر الذكي`
				},
				xp: res.rewardXp || 60
			};
			setCustomAiChallenges((prev) => [newChallenge, ...prev]);
		} });
	};
	(0, import_react.useEffect)(() => {
		if (profile && profile.life_stage !== "child") navigate({ to: "/dashboard" });
	}, [profile, navigate]);
	const rows = progress.data ?? [];
	const challengeRows = challenges.data ?? [];
	const context = (0, import_react.useMemo)(() => {
		const list = transactions.data ?? [];
		const goal = (goals.data ?? []).find((item) => item.kind === "goal") ?? null;
		const saved = goal ? savedForGoal(list, goal.id) : 0;
		const target = goal ? Number(goal.target_amount) : 0;
		return {
			progress: rows,
			challenges: challengeRows,
			totalSaved: totalsFor(list).savings,
			goalPercent: target > 0 ? Math.min(100, Math.round(saved / target * 100)) : 0,
			hasGoal: !!goal
		};
	}, [
		rows,
		challengeRows,
		transactions.data,
		goals.data
	]);
	if (profileLoading || progress.isLoading || learning.isLoading || challenges.isLoading || transactions.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[40vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" })
	}) });
	const doneLessons = rows.filter((row) => row.activity_type === "lesson" && row.status === "completed");
	const lessonPercent = Math.round(doneLessons.length / LESSONS.length * 100);
	const xp = learning.data?.xp ?? 0;
	const level = levelFor(xp);
	const earnedBadges = BADGES.filter((badge) => badge.earned(context));
	const recommendation = recommendNext(context);
	const quizLevel = nextQuizDifficulty(rows);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const age = profile ? calculateAge(profile.date_of_birth) : null;
	const openRecommendation = () => {
		if (recommendation.kind === "lesson") {
			setLesson(LESSONS.find((item) => item.key === recommendation.key) ?? null);
			return;
		}
		if (recommendation.kind === "game") {
			setGame(recommendation.key);
			return;
		}
		if (recommendation.kind === "quiz") {
			setQuizOpen(true);
			return;
		}
		if (recommendation.kind === "challenge") {
			const meta = challengeMeta(recommendation.key);
			if (meta) startChallenge.mutate({
				key: meta.key,
				targetDays: meta.targetDays
			});
			return;
		}
		document.getElementById("learn-achievements")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "kid-theme space-y-8 wazen-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "kid-panel relative overflow-hidden bg-kid-tint p-6 sm:p-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-xs text-kid-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnIcon, {
										className: "size-4",
										strokeWidth: ICON_STROKE
									}), lc("learn")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-2 text-2xl sm:text-3xl",
									children: lc("pageTitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-md text-sm text-muted-foreground",
									children: lc("pageIntro")
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden size-20 shrink-0 kid-float sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarBadgeIllustration, {})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl border border-kid-soft bg-card p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs text-kid-deep",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							}), lc("nextUp")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-3 min-[420px]:grid-cols-[minmax(0,1fr)_auto] min-[420px]:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base sm:text-lg",
									children: s(recommendation.title)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: s(recommendation.reason)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
								onClick: openRecommendation,
								children: [lc("start"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForwardIcon, {
									className: "size-4 rtl:rotate-180",
									strokeWidth: ICON_STROKE
								})]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnSection, {
					title: lc("progressTitle"),
					caption: lc("progressCaption"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kid-panel space-y-4 p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lc("overall") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-muted-foreground",
									children: [lessonPercent, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, {
								percent: lessonPercent,
								className: "mt-3"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnStat, {
										label: lc("lessonsDone"),
										value: `${doneLessons.length}/${LESSONS.length}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnStat, {
										label: lc("level"),
										value: s(level.label),
										hint: `${xp} XP`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnStat, {
										label: lc("streak"),
										value: String(learning.data?.current_streak ?? 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnStat, {
										label: lc("badgesEarned"),
										value: `${earnedBadges.length}/${BADGES.length}`
									})
								]
							}),
							level.nextAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, {
								percent: level.percentToNext,
								tone: "deep"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground tabular-nums",
								children: [
									Math.max(0, level.nextAt - xp),
									" XP ",
									lc("xpToNext")
								]
							})] }) : null
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnSection, {
					title: lc("lessons"),
					caption: lc("lessonsCaption"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kid-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-kid-tint to-kid-soft/40 border border-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiIcon, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: language === "ar" ? "درس مالي مخصص بالذكاء الاصطناعي" : "AI Personalized Lesson"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: language === "ar" ? "أنشئ درساً تفاعلياً مخصصاً بالذكاء الاصطناعي حسب مستواك المالي" : "Generate a custom interactive lesson tailored by AI to your progress"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: personalizedLesson.isPending,
									onClick: handleGenerateAiLesson,
									className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 shrink-0",
									children: personalizedLesson.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: language === "ar" ? "جاري الإعداد..." : "Preparing..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiIcon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: language === "ar" ? "طلب درس ذكي جديد" : "Request AI Lesson" })] })
								})]
							}),
							personalizedLesson.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive px-1",
								children: language === "ar" ? "تعذر إعداد الدرس الذكي حالياً، يمكنك تجربة الدروس المتاحة أدناه." : "Could not generate AI lesson right now. Please explore available lessons below."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid gap-4 min-[560px]:grid-cols-2 xl:grid-cols-3",
								children: LESSONS.map((item) => {
									const done = doneLessons.some((row) => row.activity_key === item.key);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setLesson(item),
										className: "kid-panel kid-press flex h-full w-full flex-col gap-2 p-5 text-start",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded-full bg-kid-soft/70 px-3 py-1 text-[0.7rem] text-kid-deep",
													children: [
														item.minutes,
														" ",
														lc("minutes")
													]
												}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 text-[0.7rem] text-kid-deep",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
														className: "size-3.5",
														strokeWidth: ICON_STROKE
													}), lc("completedTag")]
												}) : null]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base sm:text-lg",
												children: s(item.title)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: s(item.summary)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-auto pt-3 text-xs text-kid-deep",
												children: done ? lc("reviewAgain") : lc("start")
											})
										]
									}) }, item.key);
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnSection, {
					collapsible: true,
					defaultOpen: true,
					title: lc("games"),
					caption: lc("gamesCaption"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-4 min-[560px]:grid-cols-2 xl:grid-cols-3",
						children: GAMES.map((item) => {
							const row = rows.find((entry) => entry.activity_type === "game" && entry.activity_key === item.key);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setGame(item.key),
								className: "kid-panel kid-press flex h-full w-full flex-col gap-2 bg-kid-tint p-5 text-start",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-11 items-center justify-center rounded-2xl bg-kid-soft/80 text-kid-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameIcon, {
											className: "size-5",
											strokeWidth: ICON_STROKE
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-base sm:text-lg",
										children: s(item.title)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: s(item.summary)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-auto flex flex-wrap items-center gap-2 pt-3 text-xs text-kid-deep",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row ? lc("playAgain") : lc("play") }), row && row.max_score > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums text-muted-foreground",
											children: [
												lc("bestScore"),
												": ",
												row.best_score,
												"/",
												row.max_score
											]
										}) : null]
									})
								]
							}) }, item.key);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnSection, {
					collapsible: true,
					defaultOpen: true,
					title: lc("quiz"),
					caption: lc("quizCaption"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kid-panel grid gap-4 p-5 sm:p-6 min-[420px]:grid-cols-[minmax(0,1fr)_auto] min-[420px]:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: lc("quizIntro")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									lc("difficulty"),
									": ",
									s(DIFFICULTY_LABEL[quizLevel])
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
							onClick: () => setQuizOpen(true),
							children: lc("startQuiz")
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnSection, {
					collapsible: true,
					defaultOpen: true,
					title: lc("challenges"),
					caption: lc("challengesCaption"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengesIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kid-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-kid-tint to-kid-soft/40 border border-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiIcon, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: language === "ar" ? "تحدٍ مالي مخصص بالذكاء الاصطناعي" : "AI Personalized Challenge"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: language === "ar" ? "أنشئ تحدياً ذكياً مخصصاً لبناء عادات مالية مستدامة" : "Create a custom AI challenge to build smart money habits"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: personalizedChallenge.isPending,
									onClick: handleGenerateAiChallenge,
									className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 shrink-0",
									children: personalizedChallenge.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: language === "ar" ? "جاري الابتكار..." : "Generating..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiIcon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: language === "ar" ? "ابتكر تحدياً ذكياً" : "Generate AI Challenge" })] })
								})]
							}),
							personalizedChallenge.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive px-1",
								children: language === "ar" ? "تعذر إنشاء التحدي الذكي حالياً، يمكنك خوض التحديات أدناه." : "Could not generate AI challenge right now. Try the challenges below."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid gap-4 min-[560px]:grid-cols-2 xl:grid-cols-3",
								children: [...customAiChallenges, ...CHALLENGES].map((meta) => {
									const row = challengeRows.find((entry) => entry.challenge_key === meta.key);
									const days = row?.days_completed ?? 0;
									const percent = Math.round(days / meta.targetDays * 100);
									const done = row?.status === "completed";
									const checkedToday = row?.last_checkin_on === today;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "kid-panel flex flex-col gap-3 p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "min-w-0 text-base",
													children: s(meta.title)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("shrink-0 rounded-full px-3 py-1 text-[0.7rem]", done ? "bg-kid-soft/70 text-kid-deep" : row ? "bg-secondary/70" : "bg-kid-tint text-kid-deep"),
													children: done ? lc("challengeComplete") : row ? lc("active") : lc("startChallenge")
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: s(meta.description)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnProgressBar, { percent }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground tabular-nums",
												children: [
													days,
													" ",
													lc("daysDone"),
													" · ",
													Math.max(0, meta.targetDays - days),
													" ",
													lc("daysLeft")
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-2 text-xs text-kid-deep",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsIcon, {
														className: "size-4",
														strokeWidth: ICON_STROKE
													}),
													lc("reward"),
													": ",
													s(meta.reward)
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-auto pt-1",
												children: !row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnButton, {
													variant: "soft",
													onClick: () => startChallenge.mutate({
														key: meta.key,
														targetDays: meta.targetDays
													}),
													disabled: startChallenge.isPending,
													children: lc("startChallenge")
												}) : done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "flex items-center gap-2 text-xs text-kid-deep",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
														className: "size-4",
														strokeWidth: ICON_STROKE
													}), lc("challengeComplete")]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LearnButton, {
													onClick: () => checkIn.mutate(row),
													disabled: checkedToday || checkIn.isPending,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakIcon, {
														className: "size-4",
														strokeWidth: ICON_STROKE
													}), checkedToday ? lc("checkedInToday") : lc("checkIn")]
												})
											})
										]
									}, meta.key);
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "learn-achievements",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnSection, {
						collapsible: true,
						defaultOpen: true,
						title: lc("achievements"),
						caption: lc("lockedNote"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid grid-cols-2 gap-3 min-[520px]:grid-cols-3 lg:grid-cols-4",
							children: BADGES.map((badge) => {
								const earned = badge.earned(context);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("flex flex-col items-center gap-2 rounded-3xl border p-4 text-center transition-[border-color,box-shadow,transform] duration-200", earned ? "kid-earned border-kid-soft bg-kid-soft/50 kid-pop" : "border-border bg-card"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("size-12", earned ? "" : "opacity-45"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarBadgeIllustration, {})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs",
											children: s(badge.label)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex items-center gap-1 text-[0.7rem] text-muted-foreground",
											children: earned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
												className: "size-3",
												strokeWidth: ICON_STROKE
											}), lc("earned")] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedIcon, {
												className: "size-3",
												strokeWidth: ICON_STROKE
											}), lc("locked")] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.7rem] text-muted-foreground",
											children: s(badge.hint)
										})
									]
								}, badge.key);
							})
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonDialog, {
			lesson,
			onClose: () => setLesson(null),
			alreadyDone: !!lesson && doneLessons.some((row) => row.activity_key === lesson.key)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameDialog, {
			gameKey: game,
			onClose: () => setGame(null),
			progress: rows
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizDialog, {
			open: quizOpen,
			onClose: () => setQuizOpen(false),
			progress: rows,
			age
		})
	] });
}
//#endregion
export { LearnPage as component };
