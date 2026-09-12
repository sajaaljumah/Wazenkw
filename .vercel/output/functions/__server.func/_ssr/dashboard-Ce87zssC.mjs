import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, S as upcomingCashFlow, a as cn, b as spendingByCategory, c as formatMoney, d as inMonth, f as monthKey, h as monthlySeries, l as formatToday, n as Button, o as firstOfMonth, p as monthKeyOf, s as formatDate, w as useSession, x as totalsFor, y as savedForGoal } from "./button-vAj4SDK8.mjs";
import { I as Circle, L as ChevronRight, z as Check } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { $ as StocksIcon, A as IncomeIcon, Bt as useAddParentPaidExpense, D as GoalsIcon, E as GiveIcon, F as MetalsIcon, G as RefundIcon, Ht as useAssets, I as MoreIcon, J as SavingsIcon, Jt as useMonthlyBudget, K as RetryIcon, Kt as useFamilySummary, P as LossIcon, Pt as portfolioTotals, Q as SpinnerIcon, R as PortfolioIcon, S as ForwardIcon, U as ReceiptIcon, Ut as useCreateGoal, V as PropertyIcon, Wt as useCreateTransaction, Y as ScheduledIcon, Yt as useParentPaidForMe, Z as SpendIcon, Zt as useRecurringItems, _t as convertCurrencyFn, an as useZakat, b as ExpensesIcon, dt as attachFxSnapshot, f as CategoryChartIcon, ft as calculateAge, i as AiIcon, in as useUpsertMonthlyBudget, it as WazenAvatar, k as ICON_STROKE, l as BudgetIcon, nt as TrendChartIcon, o as AnalyticsIcon, pt as canCalculateZakat, qt as useGoals, r as AddIcon, rn as useTransactions, s as AppShell, tt as StudentIcon, u as CURRENCIES, w as GainIcon, wt as firstNameOf, x as FamilyIcon, y as ExpandIcon, z as PremiumIcon } from "./AppShell-cdoNFpBj.mjs";
import { t as useReveal } from "./use-reveal-CLerR8q0.mjs";
import { a as InsightStrip, c as ProgressBar, i as EmptyState, n as DashboardHeader, o as JourneySection, r as DisclosurePanel, s as Panel, t as BalanceHero, u as percentOf } from "./primitives-CO_AoPcR.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CU7WH-S6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Area, c as Bar, i as XAxis, l as ResponsiveContainer, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { t as useWazenLabels } from "./i18n-labels-DPVkAazE.mjs";
import { r as isDemoAccount } from "./demo-accounts-Ba1ysXXf.mjs";
import { t as ZakatAlert } from "./ZakatAlert-rTGggKK0.mjs";
import { a as KidDecorations, c as illustrationForGoal, i as HeartIllustration, l as useAiChat, n as CoinIllustration, o as SavingsJarIllustration, r as GiftIllustration, s as StarBadgeIllustration, t as Celebration, u as useFinancialAdvice } from "./illustrations-q4nQvRiv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Ce87zssC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{ value: "all" },
	{ value: "in" },
	{ value: "out" },
	{ value: "saving" }
];
function matchesFilter(kind, filter) {
	if (filter === "all") return true;
	if (filter === "in") return kind === "income" || kind === "refund";
	if (filter === "saving") return kind === "saving";
	return kind === "expense";
}
function RecentTransactionsCard({ transactions, currency, limit = 6, title }) {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const recent = transactions.filter((t) => matchesFilter(t.kind, filter)).slice(0, limit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: title ?? t("recent"),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1",
			role: "group",
			"aria-label": t("filterTransactions"),
			children: FILTERS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				"aria-pressed": filter === option.value,
				onClick: () => setFilter(option.value),
				variant: filter === option.value ? "secondary" : "ghost",
				size: "sm",
				className: "h-7 px-2.5",
				children: t(option.value === "all" ? "all" : option.value === "in" ? "moneyIn" : option.value === "out" ? "spending" : "saving")
			}, option.value))
		}),
		children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: filter === "all" ? t("noTransactions") : t("nothingHere"),
			description: filter === "all" ? t("noTransactionsDescription") : t("tryAnotherFilter")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border/70",
			children: recent.map((t) => {
				const isPositive = t.kind === "income" || t.kind === "refund";
				const Icon = t.kind === "income" ? IncomeIcon : t.kind === "refund" ? RefundIcon : t.kind === "saving" ? SavingsIcon : ExpensesIcon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-4 py-3.5 first:pt-0 last:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex size-9 shrink-0 items-center justify-center rounded-md", isPositive ? "bg-chart-2/12 text-chart-2" : "bg-secondary text-muted-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm",
								children: labels.merchant(t.merchant) || labels.category(t.category)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 truncate text-xs text-muted-foreground",
								children: [
									labels.transactionKind(t.kind),
									" · ",
									labels.category(t.category),
									" ·",
									" ",
									formatDate(t.occurred_on)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("shrink-0 text-sm tabular-nums", isPositive ? "text-chart-2" : "text-foreground"),
							children: [isPositive ? "+" : "−", formatMoney(Number(t.amount), t.currency || currency)]
						})
					]
				}, t.id);
			})
		})
	});
}
function UpcomingCashFlowCard({ items, currency, title }) {
	const { t } = useWazenLocale();
	const upcoming = upcomingCashFlow(items).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: title ?? t("upcoming"),
		children: upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduledIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noScheduled"),
			description: t("noScheduledDescription")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "wazen-rule-list",
			children: upcoming.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-4 py-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm",
							children: entry.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-border/70 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground",
							children: t("recurringBadge")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: [
							entry.kind === "income" ? t("income") : entry.kind === "saving" ? t("savingKind") : t("expense"),
							" ",
							"· ",
							t(entry.frequency === "monthly" ? "monthlyFreq" : entry.frequency),
							" ·",
							" ",
							t("nextPayment"),
							": ",
							formatDate(entry.date)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("shrink-0 text-sm tabular-nums", entry.kind === "income" ? "text-chart-2" : "text-foreground"),
					children: [entry.kind === "income" ? "+" : "−", formatMoney(entry.amount, entry.currency || currency)]
				})]
			}, entry.id))
		})
	});
}
function GoalsCard({ goals, transactions, currency, title, playful = false }) {
	const { t } = useWazenLocale();
	const list = goals.filter((goal) => goal.kind === "goal");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: title ?? t("savingsGoals"),
		children: list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noGoals"),
			description: t("noGoalsDescription")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-6",
			children: list.map((goal) => {
				const saved = savedForGoal(transactions, goal.id);
				const percent = percentOf(saved, Number(goal.target_amount));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-sm", playful && "text-base"),
							children: goal.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs tabular-nums text-muted-foreground",
							children: [
								formatMoney(saved, goal.currency || currency),
								" ",
								t("ofWord"),
								" ",
								formatMoney(Number(goal.target_amount), goal.currency || currency)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						value: saved,
						max: Number(goal.target_amount),
						tone: playful ? "sage" : "gold",
						className: playful ? "mt-3 h-4" : "mt-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [
							percent,
							"% ",
							t("savedWord"),
							goal.target_date ? ` · ${t("targetWord")} ${formatDate(goal.target_date)}` : "",
							playful && percent >= 100 ? ` · ${t("goalReachedTag")}` : ""
						]
					})
				] }, goal.id);
			})
		})
	});
}
function EmergencyFundCard({ goals, transactions, currency }) {
	const { t } = useWazenLocale();
	const fund = goals.find((goal) => goal.kind === "emergency_fund");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: t("emergencyFund"),
		children: !fund ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noEmergency"),
			description: t("emergencyDescription")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xl tabular-nums",
				children: formatMoney(savedForGoal(transactions, fund.id), fund.currency || currency)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					t("ofWord"),
					" ",
					formatMoney(Number(fund.target_amount), fund.currency || currency),
					" ·",
					" ",
					t("targetWord")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
				value: savedForGoal(transactions, fund.id),
				max: Number(fund.target_amount),
				tone: "sage",
				className: "mt-4"
			})
		] })
	});
}
function BudgetCard({ budget, spent, currency, title }) {
	const { t } = useWazenLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: title ?? t("monthlyBudget"),
		children: budget === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noBudget"),
			description: t("budgetDescription")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl tabular-nums",
					children: formatMoney(Math.max(budget - spent, 0), currency)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [
						t("leftOf"),
						" ",
						formatMoney(budget, currency)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
				value: spent,
				max: budget,
				tone: spent > budget ? "charcoal" : "gold",
				className: "mt-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: [
					formatMoney(spent, currency),
					" ",
					t("spentThisMonth"),
					spent > budget ? ` · ${t("overBudget")}` : ` · ${percentOf(spent, budget)}% ${t("usedWord")}`
				]
			})
		] })
	});
}
var BAR_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)"
];
var TOOLTIP_STYLE = {
	borderRadius: "0.75rem",
	border: "1px solid var(--border)",
	background: "var(--card)",
	color: "var(--card-foreground)",
	fontSize: "0.78rem",
	boxShadow: "var(--shadow-soft)"
};
/**
* Spending by category — ranked horizontal bars.
* Reads like a bank statement breakdown: ordered, labelled, comparable.
*/
function SpendingByCategoryCard({ transactions, currency, title }) {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const slices = spendingByCategory(transactions).slice(0, 6);
	const total = slices.reduce((sum, slice) => sum + slice.amount, 0);
	const max = slices.reduce((peak, slice) => Math.max(peak, slice.amount), 0);
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
	const topSlice = slices[0];
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: title ?? t("spendingCategory"),
		children: slices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChartIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noSpendingYet"),
			description: t("noSpendingYetBody")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 border-b border-border/70 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wazen-label block",
					children: t("topSpendingCategory")
				}), topSlice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 block text-sm text-muted-foreground",
					children: [
						labels.category(topSlice.category),
						" ·",
						" ",
						Math.round(topSlice.amount / total * 100),
						"% ",
						t("ofSpending")
					]
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wazen-number text-lg",
					children: formatMoney(total, currency)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				ref,
				className: "space-y-4",
				children: slices.map((slice, index) => {
					const share = total > 0 ? Math.round(slice.amount / total * 100) : 0;
					const width = max > 0 ? Math.max(slice.amount / max * 100, 3) : 0;
					const color = BAR_COLORS[index % BAR_COLORS.length];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							className: "wazen-chart-row group h-auto w-full justify-stretch rounded-lg px-2 py-1.5 text-start outline-hidden focus-visible:ring-2 focus-visible:ring-ring/60",
							"data-active": selectedCategory === slice.category ? "true" : void 0,
							"aria-pressed": selectedCategory === slice.category,
							onClick: () => setSelectedCategory((current) => current === slice.category ? null : slice.category),
							title: `${labels.category(slice.category)}: ${formatMoney(slice.amount, currency)} · ${share}%`,
							"aria-label": `${labels.category(slice.category)}: ${formatMoney(slice.amount, currency)}, ${share}%`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2 rounded-full",
										style: { background: color }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: labels.category(slice.category)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 tabular-nums text-muted-foreground",
									children: [
										share,
										"% ·",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: formatMoney(slice.amount, currency)
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "wazen-chart-bar h-full rounded-full transition-[width,filter] duration-700 ease-out",
									style: {
										width: revealed ? `${width}%` : "0%",
										background: `linear-gradient(90deg, ${color}, color-mix(in oklab, ${color} 62%, var(--chart-fade)))`
									}
								})
							})]
						})
					}, slice.category);
				})
			})]
		})
	});
}
/**
* Income vs expenses — grouped bars with a net line on top, so the month-to-month
* story (and whether the month closed positive) is readable at a glance.
*/
function IncomeVsExpensesCard({ transactions, currency, months = 6 }) {
	const series = monthlySeries(transactions, months).map((point) => ({
		...point,
		net: point.income - point.expenses
	}));
	const hasData = series.some((point) => point.income > 0 || point.expenses > 0);
	const { t } = useWazenLocale();
	const latestNet = series.at(-1)?.net ?? 0;
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: t("incomeExpenses"),
		children: [!hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChartIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("notEnoughData"),
			description: t("notEnoughDataBody")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-baseline justify-between gap-3 border-b border-border/70 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted-foreground",
				children: t("latestMonthlyNet")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: latestNet >= 0 ? "wazen-number text-sm text-chart-2" : "wazen-number text-sm text-destructive",
				children: [latestNet >= 0 ? "+" : "−", formatMoney(Math.abs(latestNet), currency)]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: "h-52 w-full min-w-0 sm:h-56",
			role: "img",
			"aria-label": `${t("incomeExpenses")}: ${t("latestMonthlyNet")} ${formatMoney(latestNet, currency)}`,
			children: revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
					data: series,
					barGap: 3,
					margin: {
						top: 8,
						right: 2,
						bottom: 0,
						left: -28
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							vertical: false,
							stroke: "var(--border)",
							strokeOpacity: .7,
							strokeDasharray: "3 5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "label",
							tickLine: false,
							axisLine: false,
							tick: {
								fontSize: 11,
								fill: "var(--muted-foreground)"
							},
							interval: "preserveStartEnd",
							minTickGap: 18
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tickLine: false,
							axisLine: false,
							width: 48,
							tick: {
								fontSize: 10,
								fill: "var(--muted-foreground)"
							},
							tickFormatter: (value) => Intl.NumberFormat(void 0, { notation: "compact" }).format(Number(value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							cursor: {
								fill: "var(--secondary)",
								opacity: .45
							},
							formatter: (value) => formatMoney(Number(value), currency),
							contentStyle: TOOLTIP_STYLE,
							labelStyle: {
								color: "var(--muted-foreground)",
								marginBottom: "0.35rem"
							},
							itemStyle: { color: "var(--card-foreground)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "income",
							name: t("income"),
							fill: "var(--chart-2)",
							radius: [
								5,
								5,
								0,
								0
							],
							maxBarSize: 16,
							animationDuration: 700
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "expenses",
							name: t("expensesLabel"),
							fill: "var(--chart-1)",
							radius: [
								5,
								5,
								0,
								0
							],
							maxBarSize: 16,
							animationDuration: 700
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: "net",
							name: t("netLabel"),
							stroke: "var(--foreground)",
							strokeWidth: 1.75,
							dot: {
								r: 2.5,
								fill: "var(--card)",
								strokeWidth: 1.5
							},
							activeDot: { r: 4 },
							animationDuration: 900
						})
					]
				})
			}) : null
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-center gap-5 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2 rounded-full",
							style: { background: "var(--chart-2)" }
						}),
						" ",
						t("income")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2 rounded-full",
							style: { background: "var(--chart-1)" }
						}),
						" ",
						t("expensesLabel")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-px w-4",
							style: { background: "var(--foreground)" }
						}),
						" ",
						t("netLabel")
					]
				})
			]
		})]
	});
}
/** Cumulative savings — a calm gradient area chart showing balance building over time. */
function SavingsTrendCard({ transactions, currency, months = 12, title }) {
	const { t } = useWazenLocale();
	const buckets = /* @__PURE__ */ new Map();
	const now = /* @__PURE__ */ new Date();
	const keys = [];
	for (let index = months - 1; index >= 0; index -= 1) {
		const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
		const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
		keys.push(key);
		buckets.set(key, 0);
	}
	for (const item of transactions) {
		if (item.kind !== "saving") continue;
		const key = monthKeyOf(item.occurred_on);
		if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + Number(item.amount));
	}
	let running = 0;
	const series = keys.map((key) => {
		running += buckets.get(key) ?? 0;
		return {
			label: key.slice(5),
			total: Math.round(running * 100) / 100
		};
	});
	const hasData = series.some((point) => point.total > 0);
	const currentTotal = series.at(-1)?.total ?? 0;
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: title ?? t("savingsOverTime"),
		children: !hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChartIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noSavingsYet"),
			description: t("noSavingsYetBody")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-baseline justify-between gap-3 border-b border-border/70 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted-foreground",
				children: t("savedThisPeriod")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "wazen-number text-sm text-chart-2",
				children: formatMoney(currentTotal, currency)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: "h-48 w-full min-w-0",
			role: "img",
			"aria-label": `${title ?? t("savingsOverTime")}: ${formatMoney(currentTotal, currency)}`,
			children: revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
					data: series,
					margin: {
						top: 8,
						right: 2,
						bottom: 0,
						left: -28
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "wazen-savings-area",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--chart-2)",
								stopOpacity: .35
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--chart-2)",
								stopOpacity: .02
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							vertical: false,
							stroke: "var(--border)",
							strokeOpacity: .7,
							strokeDasharray: "3 5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "label",
							tickLine: false,
							axisLine: false,
							tick: {
								fontSize: 10,
								fill: "var(--muted-foreground)"
							},
							interval: "preserveStartEnd",
							minTickGap: 18
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tickLine: false,
							axisLine: false,
							width: 48,
							tick: {
								fontSize: 10,
								fill: "var(--muted-foreground)"
							},
							tickFormatter: (value) => Intl.NumberFormat(void 0, { notation: "compact" }).format(Number(value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							formatter: (value) => formatMoney(Number(value), currency),
							contentStyle: TOOLTIP_STYLE,
							labelStyle: {
								color: "var(--muted-foreground)",
								marginBottom: "0.35rem"
							},
							itemStyle: { color: "var(--card-foreground)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "total",
							name: title ?? t("savingsOverTime"),
							stroke: "var(--chart-2)",
							strokeWidth: 2,
							fill: "url(#wazen-savings-area)",
							activeDot: {
								r: 5,
								fill: "var(--card)",
								stroke: "var(--chart-2)",
								strokeWidth: 2
							},
							animationDuration: 900
						})
					]
				})
			}) : null
		})] })
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var inputClass$1 = "wazen-field";
function metaFor(t) {
	const tr = t;
	return {
		expense: {
			label: tr("iSpent"),
			title: tr("iSpentTitle"),
			description: tr("iSpentDescription"),
			icon: ExpensesIcon,
			primary: true
		},
		saving: {
			label: tr("iSaved"),
			title: tr("iSavedTitle"),
			description: tr("iSavedDescription"),
			icon: SavingsIcon,
			primary: true
		},
		give: {
			label: tr("iGave"),
			title: tr("iGaveTitle"),
			description: tr("iGaveDescription"),
			icon: GiveIcon,
			primary: true
		},
		income: {
			label: tr("receivedMoney"),
			title: tr("incomeTitle"),
			description: tr("incomeDescription"),
			icon: IncomeIcon
		},
		budget: {
			label: tr("newBudget"),
			title: tr("budgetTitle"),
			description: tr("budgetDescriptionDialog"),
			icon: BudgetIcon
		},
		goal: {
			label: tr("newGoal"),
			title: tr("goalTitle"),
			description: tr("goalDescriptionDialog"),
			icon: GoalsIcon
		}
	};
}
var GIVING_TYPES = [
	"givingSadaqah",
	"givingGift",
	"givingSupport"
];
var PAYMENT_METHODS = [
	"payCard",
	"payCash",
	"payTransfer"
];
function QuickActions({ userId, currency, goals, actions }) {
	const { t } = useWazenLocale();
	const [open, setOpen] = (0, import_react.useState)(null);
	const meta = metaFor(t);
	const order = actions ?? [
		"expense",
		"saving",
		"give",
		"income",
		"budget",
		"goal"
	];
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		"data-revealed": revealed,
		className: "wazen-action-dock wazen-reveal",
		"data-tour": "actions",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wazen-label block",
					children: t("moneyActions")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted-foreground",
					children: t("moneyActionsHint")
				})]
			}), order.some((kind) => !meta[kind].primary) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					}), t("moreActions")]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
				align: "end",
				className: "min-w-52 p-2",
				children: order.filter((kind) => !meta[kind].primary).map((kind) => {
					const item = meta[kind];
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onSelect: () => setOpen(kind),
						className: "min-h-11 gap-3 px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}), item.label]
					}, kind);
				})
			})] }) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-3 gap-2 sm:gap-3",
			children: order.filter((kind) => meta[kind].primary).map((kind) => {
				const item = meta[kind];
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setOpen(kind),
					className: "group h-auto min-h-20 min-w-0 flex-col gap-2 border-primary/15 bg-card px-2 py-3 text-center hover:border-primary/35 hover:bg-accent/45 sm:min-h-16 sm:flex-row sm:justify-start sm:px-4 sm:text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-active:scale-95",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 text-xs font-semibold leading-tight sm:text-sm",
						children: item.label
					})]
				}, kind);
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionDialog, {
		kind: open,
		onClose: () => setOpen(null),
		userId,
		currency,
		goals
	})] });
}
function ActionDialog({ kind, onClose, userId, currency, goals }) {
	const { t } = useWazenLocale();
	const tr = t;
	useQueryClient();
	const createTx = useCreateTransaction();
	const createGoal = useCreateGoal();
	const upsertBudget = useUpsertMonthlyBudget();
	const [amount, setAmount] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [merchant, setMerchant] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [givingType, setGivingType] = (0, import_react.useState)(GIVING_TYPES[0]);
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)(PAYMENT_METHODS[0]);
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [goalId, setGoalId] = (0, import_react.useState)("");
	const [goalName, setGoalName] = (0, import_react.useState)("");
	const [goalTarget, setGoalTarget] = (0, import_react.useState)("");
	const [goalDate, setGoalDate] = (0, import_react.useState)("");
	const [budgetMonth, setBudgetMonth] = (0, import_react.useState)(() => firstOfMonth().slice(0, 7));
	const [selectedCurrency, setSelectedCurrency] = (0, import_react.useState)(currency);
	const [busy, setBusy] = (0, import_react.useState)(false);
	function reset() {
		setAmount("");
		setCategory("");
		setMerchant("");
		setNote("");
		setGivingType(GIVING_TYPES[0]);
		setPaymentMethod(PAYMENT_METHODS[0]);
		setDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
		setGoalId("");
		setGoalName("");
		setGoalTarget("");
		setGoalDate("");
		setBudgetMonth(firstOfMonth().slice(0, 7));
		setSelectedCurrency(currency);
	}
	function close() {
		reset();
		onClose();
	}
	async function submit() {
		if (!kind) return;
		setBusy(true);
		try {
			if (kind === "goal") {
				const target = Number(goalTarget);
				if (goalName.trim().length < 2) throw new Error(tr("enterGoalName"));
				if (!Number.isFinite(target) || target <= 0) throw new Error(tr("enterAmount"));
				await createGoal.mutateAsync({
					name: goalName.trim(),
					kind: "goal",
					target_amount: target,
					target_date: goalDate || null,
					currency
				});
			} else if (kind === "budget") {
				const value = Number(amount);
				if (!Number.isFinite(value) || value <= 0) throw new Error(tr("enterAmount"));
				await upsertBudget.mutateAsync({
					periodMonth: `${budgetMonth}-01`,
					amount: value,
					currency
				});
			} else {
				const value = Number(amount);
				if (!Number.isFinite(value) || value <= 0) throw new Error(tr("enterAmount"));
				if ((kind === "expense" || kind === "income") && category.trim().length < 2) throw new Error(tr("enterCategory"));
				const resolvedCategory = kind === "saving" ? t("savingsCategory") : kind === "give" ? tr(givingType) : category.trim();
				let finalAmount = value;
				let finalNote = note.trim() || null;
				let fxSnapshotData = null;
				if (selectedCurrency !== "KWD") {
					const fxRes = await convertCurrencyFn({ data: {
						amount: value,
						from: selectedCurrency,
						to: "KWD",
						date
					} });
					if (fxRes.success) {
						finalAmount = fxRes.converted_amount;
						fxSnapshotData = {
							original_amount: fxRes.original_amount,
							original_currency: fxRes.original_currency,
							converted_amount: fxRes.converted_amount,
							exchange_rate: fxRes.exchange_rate,
							rate_date: fxRes.rate_date
						};
						finalNote = attachFxSnapshot(finalNote, {
							original_amount: fxRes.original_amount,
							original_currency: fxRes.original_currency,
							converted_amount: fxRes.converted_amount,
							exchange_rate: fxRes.exchange_rate,
							rate_date: fxRes.rate_date
						});
					}
				}
				await createTx.mutateAsync({
					kind: kind === "give" ? "expense" : kind,
					category: resolvedCategory,
					merchant: merchant.trim() || null,
					note: finalNote,
					amount: finalAmount,
					currency: selectedCurrency,
					occurred_on: date,
					payment_method: kind === "saving" ? null : tr(paymentMethod),
					goal_id: kind === "saving" && goalId ? goalId : null,
					original_amount: fxSnapshotData?.original_amount ?? null,
					original_currency: fxSnapshotData?.original_currency ?? null,
					converted_amount: fxSnapshotData?.converted_amount ?? null,
					exchange_rate: fxSnapshotData?.exchange_rate ?? null,
					rate_date: fxSnapshotData?.rate_date ?? null
				});
			}
			toast.success(tr("savedToast"));
			close();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
		} finally {
			setBusy(false);
		}
	}
	const meta = kind ? metaFor(t)[kind] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: kind !== null,
		onOpenChange: (next) => !next ? close() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-md",
			children: meta && kind ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: meta.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: meta.description })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: kind === "goal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("goalNameField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								value: goalName,
								onChange: (e) => setGoalName(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: `${tr("targetAmountField")} (${currency})`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								type: "number",
								min: "0",
								step: "0.001",
								value: goalTarget,
								onChange: (e) => setGoalTarget(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("targetDateField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								type: "date",
								value: goalDate,
								onChange: (e) => setGoalDate(e.target.value)
							})
						})
					] }) : kind === "budget" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: tr("budgetMonthField"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass$1,
							type: "month",
							value: budgetMonth,
							onChange: (e) => setBudgetMonth(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: `${tr("amountField")} (${currency})`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass$1,
							type: "number",
							min: "0",
							step: "0.001",
							value: amount,
							onChange: (e) => setAmount(e.target.value)
						})
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[1fr_110px] gap-2 items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: `${tr("amountField")} (${selectedCurrency})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass$1,
									type: "number",
									min: "0",
									step: "0.001",
									value: amount,
									onChange: (e) => setAmount(e.target.value)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "Currency",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: inputClass$1,
									value: selectedCurrency,
									onChange: (e) => setSelectedCurrency(e.target.value),
									children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.code,
										children: c.code
									}, c.code))
								})
							})]
						}),
						kind === "saving" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("towardsGoal"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass$1,
								value: goalId,
								onChange: (e) => setGoalId(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: tr("generalSavings")
								}), goals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: goal.id,
									children: goal.name
								}, goal.id))]
							})
						}) : kind === "give" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("givingTypeField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass$1,
								value: givingType,
								onChange: (e) => setGivingType(e.target.value),
								children: GIVING_TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: type,
									children: tr(type)
								}, type))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("recipientField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								value: merchant,
								onChange: (e) => setMerchant(e.target.value)
							})
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("categoryField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								value: category,
								onChange: (e) => setCategory(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: kind === "income" ? tr("sourceField") : tr("merchantField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								value: merchant,
								onChange: (e) => setMerchant(e.target.value)
							})
						})] }),
						kind === "saving" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("paymentMethodField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass$1,
								value: paymentMethod,
								onChange: (e) => setPaymentMethod(e.target.value),
								children: PAYMENT_METHODS.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: method,
									children: tr(method)
								}, method))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("dateField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: tr("notesField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass$1,
								value: note,
								onChange: (e) => setNote(e.target.value)
							})
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: submit,
						disabled: busy,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, tr("save")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: close,
						variant: "outline",
						children: tr("cancel")
					})]
				})
			] }) : null
		})
	});
}
function Field$1({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "wazen-label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		})]
	});
}
var KIND_META = {
	stock: {
		key: "kindStock",
		icon: StocksIcon
	},
	gold: {
		key: "kindGold",
		icon: MetalsIcon
	},
	silver: {
		key: "kindSilver",
		icon: MetalsIcon
	},
	real_estate: {
		key: "kindRealEstate",
		icon: PropertyIcon
	}
};
/** Dashboard summary of owned assets — always kept apart from available money. */
function PortfolioSummaryCard({ assets, currency, liveValuations }) {
	const { t } = useWazenLocale();
	const totals = portfolioTotals(assets, liveValuations);
	const positive = totals.gain >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: t("portfolioSummary"),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/assets",
			className: "inline-flex items-center gap-1.5 text-sm font-semibold text-primary",
			children: [t("viewPortfolio"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForwardIcon, {
				className: "size-4",
				strokeWidth: ICON_STROKE
			})]
		}),
		children: assets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noAssets"),
			description: t("noAssetsDescription")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "wazen-label",
								children: t("totalAssetValue")
							}), totals.hasLiveValuation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-chart-2/30 bg-chart-2/10 px-1.5 py-0.2 text-[10px] font-medium text-chart-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-chart-2 animate-pulse" }), t("liveRates")]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-number mt-2 text-2xl sm:text-3xl",
							children: formatMoney(totals.value, currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: t("notSpendable")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `wazen-number inline-flex items-center gap-1.5 text-sm ${positive ? "text-chart-2" : "text-destructive"}`,
						children: [
							positive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GainIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LossIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							}),
							formatMoney(totals.gain, currency),
							" · ",
							totals.gainPercent.toFixed(1),
							"%"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 sm:grid-cols-2",
					children: totals.byKind.map((entry) => {
						const meta = KIND_META[entry.kind];
						const Icon = meta.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4 text-muted-foreground",
										strokeWidth: ICON_STROKE
									}),
									t(meta.key),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: ["· ", entry.count]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-number text-sm",
								children: formatMoney(entry.value, currency)
							})]
						}, entry.kind);
					})
				}),
				totals.annualRentalIncome > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						t("annualRentalIncome"),
						":",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-number text-foreground",
							children: formatMoney(totals.annualRentalIncome, currency)
						})
					]
				}) : null
			]
		})
	});
}
/**
* Child / teenager view of spending a parent paid for them. Amounts here belong
* to the parent's records, so they only reduce the child's own money when the
* parent explicitly deducted them.
*/
function ParentPaidCard({ transactions }) {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: t("paidByFamily"),
		children: transactions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noParentPaid"),
			description: t("noParentPaidDescription")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border/70",
			children: transactions.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm",
						children: labels.merchant(item.merchant) || labels.category(item.category)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: [
							labels.category(item.category),
							" · ",
							formatDate(item.occurred_on),
							" ·",
							" ",
							item.deducted_from_child ? t("deductedFromYou") : t("coveredByParent")
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wazen-number shrink-0 text-sm",
					children: formatMoney(Number(item.amount), item.currency)
				})]
			}, item.id))
		})
	});
}
var inputClass = "wazen-field";
/** Parents record spending they paid for a linked child or teenager. */
function ParentPaidExpenseDialog({ open, onClose, members, currency, defaultMemberId }) {
	const { t } = useWazenLocale();
	const { paymentMethods } = useWazenLabels();
	const save = useAddParentPaidExpense();
	const [childId, setChildId] = (0, import_react.useState)(defaultMemberId ?? members[0]?.profile.id ?? "");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [merchant, setMerchant] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("Debit card");
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [deduct, setDeduct] = (0, import_react.useState)(false);
	const canDeduct = members.find((member) => member.profile.id === childId)?.canFund === true;
	function close() {
		setAmount("");
		setCategory("");
		setMerchant("");
		setDeduct(false);
		setDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
		onClose();
	}
	async function submit() {
		const value = Number(amount);
		if (!childId) {
			toast.error(t("selectFamilyMember"));
			return;
		}
		if (!Number.isFinite(value) || value <= 0) {
			toast.error(t("amountField"));
			return;
		}
		if (category.trim().length < 2) {
			toast.error(t("categoryField"));
			return;
		}
		try {
			await save.mutateAsync({
				childUserId: childId,
				amount: value,
				category: category.trim(),
				merchant: merchant.trim() || null,
				occurredOn: date,
				paymentMethod: method,
				currency,
				deductFromChild: canDeduct ? deduct : false
			});
			toast.success(t("parentPaidSaved"));
			close();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next ? close() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("addExpenseForChild") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("parentPaidIntro") })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("forFamilyMember"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass,
								value: childId,
								onChange: (e) => setChildId(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: t("selectFamilyMember")
								}), members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: member.profile.id,
									children: firstNameOf(member.profile.full_name)
								}, member.profile.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `${t("amountField")} (${currency})`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "number",
								min: "0",
								step: "0.001",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("categoryField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: category,
								onChange: (e) => setCategory(e.target.value),
								placeholder: t("categoryPlaceholder")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("merchantField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: merchant,
								onChange: (e) => setMerchant(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("paymentMethod"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass,
								value: method,
								onChange: (e) => setMethod(e.target.value),
								children: paymentMethods.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option.value,
									children: option.label
								}, option.value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("dateField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})
						}),
						canDeduct ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-0.5 size-4 accent-[var(--primary)]",
								checked: deduct,
								onChange: (e) => setDeduct(e.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t("deductFromChild"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-muted-foreground",
								children: t("deductHint")
							})] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t("deductHint")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: submit,
						disabled: save.isPending,
						children: [save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("save")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: close,
						variant: "outline",
						children: t("cancel")
					})]
				})
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "wazen-label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		})]
	});
}
function AiFinancialAdvisor({ currency, transactions, goals, budget, lifeStage, className }) {
	const { isArabic } = useWazenLocale();
	const isAr = isArabic;
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [customPrompt, setCustomPrompt] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("advice");
	const [chatMessages, setChatMessages] = (0, import_react.useState)([]);
	const adviceMutation = useFinancialAdvice();
	const chatMutation = useAiChat();
	const key = monthKey(/* @__PURE__ */ new Date());
	const monthTxs = inMonth(transactions, key);
	const monthTotals = totalsFor(monthTxs);
	const allTotals = totalsFor(transactions);
	const catMap = /* @__PURE__ */ new Map();
	for (const tx of monthTxs) if (tx.kind === "expense") catMap.set(tx.category, (catMap.get(tx.category) ?? 0) + Number(tx.amount));
	const spendingCategories = Array.from(catMap.entries()).map(([category, amount]) => ({
		category,
		amount
	})).sort((a, b) => b.amount - a.amount).slice(0, 5);
	const context = {
		income: monthTotals.income,
		expenses: monthTotals.expenses,
		budget: budget ? Number(budget.amount) : void 0,
		savings: allTotals.savings,
		emergency_fund: allTotals.savings,
		goals: goals.map((g) => ({
			name: g.name,
			target: Number(g.target_amount)
		})),
		spending_categories: spendingCategories
	};
	const quickPrompts = isAr ? [
		{
			label: "تحليل المصاريف الشهرية",
			prompt: "قدم تحليلاً مالياً سريعاً لمصاريفي هذا الشهر مقارنة بدخلي وميزانيتي."
		},
		{
			label: "نصيحة لزيادة التوفير",
			prompt: "ما هي أفضل خطوة عملية يمكنني اتخاذها اليوم لزيادة مدخراتي وتقليل الهدر؟"
		},
		{
			label: "تقييم أهداف الادخار",
			prompt: "قيم تقدمي في أهداف الادخار بناءً على وضعي المالي الحالي."
		}
	] : [
		{
			label: "Analyze monthly spending",
			prompt: "Provide a quick financial assessment of my expenses this month relative to income."
		},
		{
			label: "Tips to boost savings",
			prompt: "What practical steps can I take today to increase my monthly savings rate?"
		},
		{
			label: "Review savings goals",
			prompt: "Evaluate my progress toward savings goals given my current cash flow."
		}
	];
	const handleRequestAdvice = (promptText) => {
		adviceMutation.mutate({
			prompt: promptText,
			context,
			lifeStage,
			language: isAr ? "ar" : "en"
		});
	};
	const handleSendChat = (e) => {
		e.preventDefault();
		if (!customPrompt.trim() || chatMutation.isPending) return;
		const userText = customPrompt.trim();
		setCustomPrompt("");
		const newHistory = [...chatMessages, {
			role: "user",
			content: userText
		}];
		setChatMessages(newHistory);
		const systemPrompt = isAr ? `أنت المستشار المالي الذكي لتطبيق وازن في الكويت. أجب بلغة عربية راقية وموجزة. المرحلة العمرية للمستخدم: ${lifeStage}. الدخل: ${monthTotals.income} ${currency}، المصاريف: ${monthTotals.expenses} ${currency}، المدخرات: ${allTotals.savings} ${currency}. الميزانية: ${budget ? Number(budget.amount) : "غير محددة"} ${currency}. لا تقدم نصائح مضاربة عالية المخاطر.` : `You are the Wazen AI Financial Assistant in Kuwait. Respond clearly and concisely. Life stage: ${lifeStage}. Income: ${monthTotals.income} ${currency}, Expenses: ${monthTotals.expenses} ${currency}, Savings: ${allTotals.savings} ${currency}. Do not give high-risk trading advice.`;
		chatMutation.mutate({ messages: [{
			role: "system",
			content: systemPrompt
		}, ...newHistory.map((m) => ({
			role: m.role,
			content: m.content
		}))] }, { onSuccess: (data) => {
			setChatMessages((prev) => [...prev, {
				role: "assistant",
				content: data.content
			}]);
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("wazen-card relative overflow-hidden border border-border/80", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-xl bg-gold/15 text-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiIcon, {
						className: "size-5",
						strokeWidth: ICON_STROKE
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold sm:text-xl",
					children: isAr ? "مستشار وازن المالي الذكي" : "Wazen AI Financial Advisor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: isAr ? "تحليل مالي فوري وشخصي مدعوم بالذكاء الاصطناعي" : "Personalized financial guidance powered by AI"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => setIsOpen((prev) => !prev),
					className: "text-xs",
					children: isOpen ? isAr ? "إخفاء" : "Collapse" : isAr ? "استشارة الذكاء الاصطناعي" : "Open Advisor"
				})
			})]
		}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-5 wazen-enter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 border-b border-border/50 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActiveTab("advice"),
					className: cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-colors", activeTab === "advice" ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground hover:bg-secondary"),
					children: isAr ? "تحليل مالي شامل" : "Comprehensive Review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActiveTab("chat"),
					className: cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-colors", activeTab === "chat" ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground hover:bg-secondary"),
					children: isAr ? "محادثة مباشرة مع وازن" : "Ask a Question"
				})]
			}), activeTab === "advice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: quickPrompts.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: adviceMutation.isPending,
							onClick: () => handleRequestAdvice(item.prompt),
							className: "h-auto rounded-full px-3 py-1.5 text-xs font-normal hover:border-gold hover:text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiIcon, {
								className: "size-3 text-gold me-1.5",
								strokeWidth: ICON_STROKE
							}), item.label]
						}, idx))
					}),
					adviceMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: isAr ? "جارٍ تحليل بياناتك المالية عبر الذكاء الاصطناعي..." : "Analyzing your financial data with Wazen AI..."
						})]
					}) : null,
					adviceMutation.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: isAr ? "تعذر إنشاء الاستشارة المالية" : "Unable to generate financial advice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: adviceMutation.error.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => handleRequestAdvice(quickPrompts[0].prompt),
								className: "mt-3 h-7 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryIcon, {
									className: "size-3 me-1.5",
									strokeWidth: ICON_STROKE
								}), isAr ? "إعادة المحاولة" : "Retry"]
							})
						]
					}) : null,
					adviceMutation.isSuccess && adviceMutation.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 rounded-2xl border border-gold/30 bg-gold/5 p-4 sm:p-5 wazen-enter",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold sm:text-base",
									children: isAr ? "التوصية المالية المخصصة" : "Personalized Financial Assessment"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-foreground whitespace-pre-line",
								children: adviceMutation.data.advice
							}),
							adviceMutation.data.keyPoints && adviceMutation.data.keyPoints.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: isAr ? "الخطوات المقترحة" : "Key Actionable Takeaways"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1.5",
									children: adviceMutation.data.keyPoints.map((point, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2 text-xs sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: point })]
									}, i))
								})]
							}) : null,
							adviceMutation.data.disclaimer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border-t border-border/50 pt-3 text-[0.7rem] text-muted-foreground italic",
								children: adviceMutation.data.disclaimer
							}) : null
						]
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-64 space-y-3 overflow-y-auto rounded-xl border border-border/60 bg-secondary/30 p-3 sm:p-4",
					children: [chatMessages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-4 text-center text-xs text-muted-foreground",
						children: isAr ? "اطرح أي سؤال حول ميزانيتك، خطط التوفير، أو إدارة المصاريف في الكويت." : "Ask any question regarding your budget, savings plans, or expense management."
					}) : chatMessages.map((msg, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("rounded-xl p-3 text-xs sm:text-sm leading-relaxed max-w-[85%]", msg.role === "user" ? "ms-auto bg-primary text-primary-foreground" : "me-auto border border-border bg-card text-foreground"),
						children: msg.content
					}, index)), chatMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-3 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isAr ? "وازِن يفكر..." : "Wazen AI is thinking..." })]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSendChat,
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: customPrompt,
						onChange: (e) => setCustomPrompt(e.target.value),
						placeholder: isAr ? "اكتب سؤالك المالي هنا..." : "Type your financial question...",
						className: "wazen-field flex-1 text-xs sm:text-sm",
						disabled: chatMutation.isPending
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !customPrompt.trim() || chatMutation.isPending,
						size: "sm",
						children: chatMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : isAr ? "إرسال" : "Ask"
					})]
				})]
			})]
		}) : null]
	});
}
var GIVE_PATTERN = /giv|charity|sadaqah|donat|help/i;
/** Big soft progress bar that eases up to its value whenever it changes. */
function KidProgress({ percent, className }) {
	const safePercent = Math.max(0, Math.min(100, percent));
	const { ref, revealed } = useReveal();
	const [width, setWidth] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!revealed) return;
		const frame = window.requestAnimationFrame(() => setWidth(safePercent));
		return () => window.cancelAnimationFrame(frame);
	}, [safePercent, revealed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("wazen-progress-track h-5 w-full overflow-hidden rounded-full bg-kid-soft/70", className),
		"data-complete": safePercent >= 100 ? "true" : void 0,
		role: "progressbar",
		"aria-valuenow": safePercent,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "wazen-progress-fill h-full rounded-full bg-kid-champagne transition-[width] duration-1000 ease-out",
			style: { width: `${width}%` }
		})
	});
}
function MoneyTile({ label, amount, currency, illustration, helper }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "kid-panel kid-money-tile relative overflow-hidden p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-kid-deep",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-2xl tabular-nums",
					children: formatMoney(amount, currency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: helper
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-14 shrink-0 kid-float",
				children: illustration
			})]
		})
	});
}
function ChoiceTile({ title, caption, illustration, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "kid-panel kid-press flex flex-col items-center gap-3 bg-kid-tint p-6 text-center focus-visible:ring-2 focus-visible:ring-kid-mid focus-visible:outline-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-20",
				children: illustration
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-lg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: caption
			})
		]
	});
}
var ACTIVITY_ICON = {
	income: IncomeIcon,
	expense: SpendIcon,
	saving: SavingsIcon,
	refund: RefundIcon
};
var ACTIVITY_KEY = {
	income: "kidGotMoney",
	expense: "kidSpentWord",
	saving: "kidSavedMoneyWord",
	refund: "kidMoneyBack"
};
function ChildDashboard({ data, firstName, fullName, gender, avatarUrl }) {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const { currency, transactions, goals, userId } = data;
	const [action, setAction] = (0, import_react.useState)(null);
	const parentPaid = useParentPaidForMe();
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const r1 = useReveal();
	const r2 = useReveal();
	const r3 = useReveal();
	const r4 = useReveal();
	const r5 = useReveal();
	const r6 = useReveal();
	const r7 = useReveal();
	const monthTransactions = (0, import_react.useMemo)(() => inMonth(transactions, monthKey(/* @__PURE__ */ new Date())), [transactions]);
	const month = totalsFor(monthTransactions);
	const all = totalsFor(transactions);
	const allowance = monthTransactions.filter((t) => t.kind === "income" && /allowance|pocket/i.test(t.category)).reduce((sum, t) => sum + Number(t.amount), 0);
	const give = monthTransactions.filter((t) => t.kind === "expense" && GIVE_PATTERN.test(`${t.category} ${t.merchant ?? ""}`)).reduce((sum, t) => sum + Number(t.amount), 0);
	const goal = goals.find((g) => g.kind === "goal") ?? null;
	const saved = goal ? savedForGoal(transactions, goal.id) : 0;
	const target = goal ? Number(goal.target_amount) : 0;
	const percent = target > 0 ? Math.min(Math.round(saved / target * 100), 100) : 0;
	const GoalArt = illustrationForGoal(goal?.name ?? "");
	const [celebrate, setCelebrate] = (0, import_react.useState)(false);
	const lastMilestone = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const milestone = percent >= 100 ? 100 : percent >= 50 ? 50 : 0;
		if (lastMilestone.current === null) {
			lastMilestone.current = milestone;
			return;
		}
		if (milestone > lastMilestone.current) {
			lastMilestone.current = milestone;
			setCelebrate(true);
			const timer = window.setTimeout(() => setCelebrate(false), 2200);
			return () => window.clearTimeout(timer);
		}
		lastMilestone.current = milestone;
	}, [percent]);
	const badges = [
		{
			label: t("kidBadgeFirstSaving"),
			earned: all.savings > 0,
			hint: t("kidBadgeFirstSavingHint")
		},
		{
			label: t("kidBadgeGoalStarted"),
			earned: !!goal,
			hint: t("kidBadgeGoalStartedHint")
		},
		{
			label: t("kidBadgeHalfway"),
			earned: percent >= 50,
			hint: t("kidBadgeHalfwayHint")
		},
		{
			label: t("kidBadgeKind"),
			earned: give > 0,
			hint: t("kidBadgeKindHint")
		}
	];
	const earnedCount = badges.filter((b) => b.earned).length;
	const recent = transactions.slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "kid-theme flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "kid-panel relative order-0 overflow-hidden bg-kid-tint p-7 sm:p-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KidDecorations, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid grid-cols-1 items-center gap-5 text-center sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-7 sm:text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kid-float rounded-full bg-kid-soft/70 p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenAvatar, {
								fullName,
								gender,
								lifeStage: "child",
								avatarUrl,
								size: 84
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-kid-deep",
									children: [
										t("kidHi"),
										" ",
										firstName,
										"!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-2 text-3xl sm:text-4xl",
									children: t("kidWorldTitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-md text-sm text-muted-foreground",
									children: t("kidWorldBody")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAction("saving"),
							className: "kid-press flex w-full items-center justify-center gap-2 rounded-xl bg-kid-deep px-6 py-3 text-sm text-kid-ivory sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							}), t("kidSaveMoney")]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "wazen-reveal order-3 space-y-4",
				"data-revealed": r3.revealed,
				ref: r3.ref,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-1 text-xl",
					children: t("kidMyMoney")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 min-[520px]:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyTile, {
							label: t("kidGot"),
							amount: month.income,
							currency,
							helper: t("kidThisMonth"),
							illustration: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIllustration, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyTile, {
							label: t("kidSpentLabel"),
							amount: month.expenses,
							currency,
							helper: t("kidThisMonth"),
							illustration: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftIllustration, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyTile, {
							label: t("kidSavedLabel"),
							amount: all.savings,
							currency,
							helper: t("kidKeptSafe"),
							illustration: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsJarIllustration, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: r1.ref,
				"data-revealed": r1.revealed,
				className: "kid-panel wazen-reveal relative order-1 overflow-hidden bg-kid-tint/70 p-7 sm:p-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Celebration, { show: celebrate }), goal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSheet("goal"),
					className: "relative flex w-full flex-col items-center gap-6 text-center sm:flex-row sm:text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-32 shrink-0 kid-float sm:size-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalArt, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-kid-deep",
								children: t("kidBigGoal")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-2xl sm:text-3xl",
								children: goal.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KidProgress, {
								percent,
								className: "mt-5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-3 block text-sm text-muted-foreground",
								children: [
									formatMoney(saved, currency),
									" ",
									t("kidGoalSavedOf"),
									" ",
									formatMoney(target, currency),
									" ",
									"— ",
									t("kidGoalThere"),
									" ",
									percent,
									"% ",
									t("kidGoalThereEnd")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-4 inline-flex items-center gap-2 text-sm text-kid-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								}), percent >= 100 ? t("kidYouDidIt") : t("kidTapGoal")]
							})
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col items-center gap-5 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-32 kid-float",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsJarIllustration, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl",
							children: t("kidPickGoal")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-sm text-sm text-muted-foreground",
							children: t("kidPickGoalBody")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAction("goal"),
							className: "kid-press rounded-xl bg-kid-deep px-6 py-3 text-sm text-kid-ivory",
							children: t("kidMakeGoal")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "wazen-reveal order-2 space-y-4",
				"data-revealed": r2.revealed,
				ref: r2.ref,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-1 text-xl",
					children: t("kidWhatDo")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 min-[520px]:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceTile, {
							title: t("kidSave"),
							caption: `${formatMoney(all.savings, currency)} ${t("kidSavedCaption")}`,
							illustration: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsJarIllustration, {}),
							onClick: () => setAction("saving")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceTile, {
							title: t("kidSpend"),
							caption: `${formatMoney(month.expenses, currency)} ${t("kidThisMonthCaption")}`,
							illustration: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftIllustration, {}),
							onClick: () => setSheet("spend")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceTile, {
							title: t("kidGive"),
							caption: give > 0 ? `${formatMoney(give, currency)} ${t("kidSharedCaption")}` : t("kidLearnSharing"),
							illustration: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartIllustration, {}),
							onClick: () => setSheet("give")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-4 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "kid-panel wazen-reveal relative overflow-hidden p-6",
					"data-revealed": r4.revealed,
					ref: r4.ref,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-14 kid-float",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIllustration, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-kid-deep",
								children: t("kidAllowance")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-2xl tabular-nums",
								children: formatMoney(allowance, currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: t("kidPocketMoney")
							})
						] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "kid-panel wazen-reveal p-6",
					"data-revealed": r5.revealed,
					ref: r5.ref,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-kid-deep",
							children: t("kidMyStars")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								earnedCount,
								" ",
								t("ofWord"),
								" ",
								badges.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							title: badge.hint,
							className: cn("flex flex-col items-center gap-2 rounded-3xl p-3 text-center text-xs", badge.earned ? "kid-earned bg-kid-soft/60 kid-pop" : "bg-secondary/50 opacity-55"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarBadgeIllustration, {})
							}), badge.label]
						}, badge.label))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				ref: r6.ref,
				"data-revealed": r6.revealed,
				open: true,
				className: "kid-panel wazen-reveal group order-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 focus-visible:outline-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xl font-semibold",
							children: t("kidLately")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs font-normal text-muted-foreground",
							children: t("kidLatelyHint")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-kid-soft/70 text-kid-deep transition-transform group-open:rotate-180",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 border-t border-kid-soft pt-5",
					children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col items-center gap-3 rounded-3xl bg-kid-tint/70 p-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsJarIllustration, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("kidNothingYet") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: t("kidNothingYetBody")
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-3",
						children: recent.map((item) => {
							const Icon = ACTIVITY_ICON[item.kind];
							const isOut = item.kind === "expense";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-kid-tint/60 p-4 min-[420px]:grid-cols-[auto_minmax(0,1fr)_auto]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-kid-soft/80 text-kid-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											className: "size-5",
											strokeWidth: ICON_STROKE
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block truncate text-sm",
											children: [
												t(ACTIVITY_KEY[item.kind]),
												" —",
												" ",
												labels.merchant(item.merchant) || labels.category(item.category)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-muted-foreground",
											children: formatDate(item.occurred_on)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("col-start-2 text-sm tabular-nums min-[420px]:col-start-3", isOut ? "text-kid-deep" : "text-foreground"),
										children: [isOut ? "−" : "+", formatMoney(Number(item.amount), currency)]
									})
								]
							}, item.id);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				ref: r7.ref,
				"data-revealed": r7.revealed,
				className: "kid-panel wazen-reveal group order-6 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 focus-visible:outline-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xl font-semibold",
							children: t("kidPaidByFamily")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs font-normal text-muted-foreground",
							children: t("kidPaidByFamilyHint")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-kid-soft/70 text-kid-deep transition-transform group-open:rotate-180",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 border-t border-kid-soft pt-5",
					children: (parentPaid.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: t("kidPaidByFamilyBody")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-3",
						children: (parentPaid.data ?? []).slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-kid-tint/60 p-4 min-[420px]:grid-cols-[auto_minmax(0,1fr)_auto]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-kid-soft/80 text-kid-deep",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiveIcon, {
										className: "size-5",
										strokeWidth: ICON_STROKE
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm",
										children: labels.merchant(item.merchant) || labels.category(item.category)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs text-muted-foreground",
										children: [
											formatDate(item.occurred_on),
											" ·",
											" ",
											item.deducted_from_child ? t("kidFromYourMoney") : t("kidFamilyPaid")
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "col-start-2 text-sm tabular-nums min-[420px]:col-start-3",
									children: formatMoney(Number(item.amount), item.currency)
								})
							]
						}, item.id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionDialog, {
				kind: action,
				onClose: () => setAction(null),
				userId,
				currency,
				goals
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpendSheet, {
				open: sheet === "spend",
				onClose: () => setSheet(null),
				transactions: monthTransactions,
				currency,
				onAddExpense: () => {
					setSheet(null);
					setAction("expense");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiveSheet, {
				open: sheet === "give",
				onClose: () => setSheet(null),
				given: give,
				currency,
				onAddGiving: () => {
					setSheet(null);
					setAction("give");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalSheet, {
				open: sheet === "goal",
				onClose: () => setSheet(null),
				goal,
				saved,
				percent,
				currency,
				onAddSaving: () => {
					setSheet(null);
					setAction("saving");
				}
			})
		]
	});
}
function SheetShell({ open, onClose, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next ? onClose() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "rounded-[2rem] sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-2xl",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: description })] }), children]
		})
	});
}
function SpendSheet({ open, onClose, transactions, currency, onAddExpense }) {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const spending = transactions.filter((item) => item.kind === "expense");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetShell, {
		open,
		onClose,
		title: t("kidSpendSheetTitle"),
		description: t("kidSpendSheetBody"),
		children: [spending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("kidNoSpending")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "max-h-72 space-y-2 overflow-y-auto",
			children: spending.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpensesIcon, {
						className: "size-4 shrink-0 text-muted-foreground",
						strokeWidth: ICON_STROKE
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: labels.merchant(item.merchant) || labels.category(item.category)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 tabular-nums",
					children: formatMoney(Number(item.amount), currency)
				})]
			}, item.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onAddExpense,
			className: "mt-2 w-full rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground",
			children: t("kidAddSpent")
		})]
	});
}
function GiveSheet({ open, onClose, given, currency, onAddGiving }) {
	const { t } = useWazenLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetShell, {
		open,
		onClose,
		title: t("kidGiveTitle"),
		description: t("kidGiveBody"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 rounded-3xl bg-secondary/50 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-14 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartIllustration, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						t("kidGiveSummaryStart"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatMoney(given, currency)
						}),
						" ",
						t("kidGiveSummaryEnd")
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiveIcon, {
									className: "mt-0.5 size-4 shrink-0",
									strokeWidth: ICON_STROKE
								}),
								" ",
								t("kidGiveTip1")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduledIcon, {
									className: "mt-0.5 size-4 shrink-0",
									strokeWidth: ICON_STROKE
								}),
								" ",
								t("kidGiveTip2")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
									className: "mt-0.5 size-4 shrink-0",
									strokeWidth: ICON_STROKE
								}),
								" ",
								t("kidGiveTip3")
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onAddGiving,
					className: "kid-press w-full rounded-xl bg-kid-deep px-6 py-3 text-sm text-kid-ivory",
					children: t("kidGaveSomething")
				})
			]
		})
	});
}
function GoalSheet({ open, onClose, goal, saved, percent, currency, onAddSaving }) {
	const { t } = useWazenLocale();
	if (!goal) return null;
	const Art = illustrationForGoal(goal.name);
	const left = Math.max(Number(goal.target_amount) - saved, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetShell, {
		open,
		onClose,
		title: goal.name,
		description: t("kidGoalSheetBody"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto block size-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Art, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KidProgress, { percent }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center",
					children: [
						formatMoney(saved, currency),
						" ",
						t("kidSavedCaption"),
						" —",
						" ",
						left > 0 ? `${formatMoney(left, currency)} ${t("kidToGo")}` : t("kidGoalComplete")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onAddSaving,
					className: "flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsIcon, {
						className: "size-4",
						strokeWidth: ICON_STROKE
					}), t("kidAddToGoal")]
				})
			]
		})
	});
}
function useMonthTotals(transactions) {
	const key = monthKey(/* @__PURE__ */ new Date());
	const monthTransactions = inMonth(transactions, key);
	return {
		monthTransactions,
		month: totalsFor(monthTransactions),
		all: totalsFor(transactions)
	};
}
/** Employee, self-employed, university student and parent personal overview. */
function AdultDashboard({ data, focus }) {
	const { currency, transactions, goals, budget, recurring, userId } = data;
	const { monthTransactions, month, all } = useMonthTotals(transactions);
	const savedTotal = all.savings;
	const { t } = useWazenLocale();
	const assets = useAssets();
	const nextMovement = upcomingCashFlow(recurring, 7)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BalanceHero, {
			label: t("availableMoney"),
			amount: all.net,
			currency,
			hint: t("afterExpensesHint"),
			items: [
				{
					label: t("incomeMonth"),
					amount: month.income,
					tone: "positive"
				},
				{
					label: t("expensesMonth"),
					amount: month.expenses,
					tone: "negative"
				},
				{
					label: t("totalSavings"),
					amount: savedTotal,
					tone: "gold"
				}
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightStrip, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			label: t("dashboardInsight"),
			children: [budget && month.expenses > Number(budget.amount) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive font-semibold",
				children: t("overBudget")
			}) : month.income >= month.expenses ? t("dashboardInsightHealthy") : t("dashboardInsightWatch"), nextMovement ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					t("comingUp"),
					": ",
					nextMovement.name,
					" (",
					formatMoney(nextMovement.amount, currency),
					")"
				]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiFinancialAdvisor, {
			currency,
			transactions,
			goals,
			budget,
			lifeStage: focus === "student" ? "university_student" : "employee"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, {
			userId,
			currency,
			goals
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneySection, {
			eyebrow: t("moneyStory"),
			title: t("planAhead"),
			description: t("planAheadBody"),
			id: "planning",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetCard, {
						budget: budget ? Number(budget.amount) : null,
						spent: month.expenses,
						currency
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmergencyFundCard, {
						goals,
						transactions,
						currency
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsCard, {
						goals,
						transactions,
						currency
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneySection, {
			eyebrow: t("lookBack"),
			title: t("activityAndTrends"),
			description: t("activityAndTrendsBody"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentTransactionsCard, {
					transactions,
					currency,
					limit: 6
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingCashFlowCard, {
					items: recurring,
					currency
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(JourneySection, {
			eyebrow: t("lookBack"),
			title: t("deeperAnalytics"),
			description: t("deeperAnalyticsSummary"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpendingByCategoryCard, {
					transactions: monthTransactions,
					currency
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncomeVsExpensesCard, {
					transactions,
					currency
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsTrendCard, {
					transactions,
					currency
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
			title: t("portfolioSummary"),
			summary: t("notSpendable"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioSummaryCard, {
				assets: assets.data ?? [],
				currency
			})
		}),
		focus === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightStrip, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			label: t("studyTip"),
			children: t("studyTipBody")
		}) : null
	] });
}
/** Teenager: youthful, allowance-first, with budget awareness. */
function TeenagerDashboard({ data }) {
	const { currency, transactions, goals, budget, recurring, userId } = data;
	const { monthTransactions, month, all } = useMonthTotals(transactions);
	const allowance = monthTransactions.filter((t) => t.kind === "income" && /allowance/i.test(t.category)).reduce((sum, t) => sum + Number(t.amount), 0);
	const { t } = useWazenLocale();
	const parentPaid = useParentPaidForMe();
	const nextMovement = upcomingCashFlow(recurring, 7)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BalanceHero, {
			label: t("moneyAvailable"),
			amount: all.net,
			currency,
			items: [
				{
					label: t("allowanceMonth"),
					amount: allowance,
					tone: "positive"
				},
				{
					label: t("spentMonth"),
					amount: month.expenses,
					tone: "negative"
				},
				{
					label: t("savedSoFar"),
					amount: all.savings,
					tone: "gold"
				}
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightStrip, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			label: t("dashboardInsight"),
			children: [budget && month.expenses > Number(budget.amount) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive font-semibold",
				children: t("overBudget")
			}) : month.income >= month.expenses ? t("dashboardInsightHealthy") : t("dashboardInsightWatch"), nextMovement ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					t("comingUp"),
					": ",
					nextMovement.name,
					" (",
					formatMoney(nextMovement.amount, currency),
					")"
				]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiFinancialAdvisor, {
			currency,
			transactions,
			goals,
			budget,
			lifeStage: "teenager"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, {
			userId,
			currency,
			goals,
			actions: [
				"expense",
				"saving",
				"give",
				"income",
				"goal"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneySection, {
			eyebrow: t("moneyStory"),
			title: t("planAhead"),
			description: t("planAheadBody"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsCard, {
					goals,
					transactions,
					currency,
					title: t("savingFor")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetCard, {
					budget: budget ? Number(budget.amount) : null,
					spent: month.expenses,
					currency,
					title: t("spendingLimit")
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneySection, {
			eyebrow: t("lookBack"),
			title: t("latestActivity"),
			description: t("activityAndTrendsBody"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentTransactionsCard, {
					transactions,
					currency,
					title: t("latestActivity")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingCashFlowCard, {
					items: recurring,
					currency,
					title: t("comingUp")
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(JourneySection, {
			eyebrow: t("lookBack"),
			title: t("deeperAnalytics"),
			description: t("deeperAnalyticsSummary"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpendingByCategoryCard, {
					transactions: monthTransactions,
					currency,
					title: t("whereMoneyWent")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncomeVsExpensesCard, {
					transactions,
					currency,
					months: 4
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsTrendCard, {
					transactions,
					currency,
					title: t("savedSoFar")
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
			title: t("paidByFamily"),
			summary: t("paidByFamilyIntro"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentPaidCard, { transactions: parentPaid.data ?? [] })
		})
	] });
}
/** Parent: personal overview plus a summary of permitted family members only. */
function FamilySummaryCard({ members, isLoading, currency, transactions = [] }) {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const parentPaid = transactions.filter((item) => item.paid_by_parent && item.beneficiary_user_id && item.beneficiary_user_id !== item.user_id).slice(0, 8);
	const nameOf = (id) => {
		const member = members.find((entry) => entry.profile.id === id);
		return member ? firstNameOf(member.profile.full_name) : "—";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: t("familySummary"),
		action: members.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: () => setDialogOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcon, {
				className: "size-4",
				strokeWidth: ICON_STROKE
			}), t("addExpenseForChild")]
		}) : null,
		children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("loadingFamily")
		}) : members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyIcon, {
				className: "size-5",
				strokeWidth: ICON_STROKE
			}),
			title: t("noFamily"),
			description: t("noFamilyDescription")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-4 sm:grid-cols-2",
			children: members.map(({ profile, canFund, canMonitor, transactions, goals }) => {
				const totals = totalsFor(transactions);
				const goal = goals.find((g) => g.kind === "goal");
				const saved = goal ? savedForGoal(transactions, goal.id) : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "wazen-interactive border border-border bg-secondary/35 p-5 hover:bg-secondary/70 hover:wazen-interactive-hover",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenAvatar, {
									fullName: profile.full_name,
									gender: profile.gender,
									lifeStage: profile.life_stage,
									avatarUrl: profile.avatar_url,
									size: 44
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-base",
										children: firstNameOf(profile.full_name)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: [
											labels.lifeStage(profile.life_stage),
											" ·",
											" ",
											calculateAge(profile.date_of_birth),
											" ",
											t("yearsOld")
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "border border-border bg-background px-2.5 py-1 text-[0.7rem] text-muted-foreground",
								children: canFund ? t("allowanceTag") : canMonitor ? t("monitoringTag") : t("linkedTag")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: t("available"),
									value: formatMoney(totals.net, profile.base_currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: t("saved"),
									value: formatMoney(totals.savings, profile.base_currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: t("spent"),
									value: formatMoney(totals.expenses, profile.base_currency)
								})
							]
						}),
						goal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
							value: saved,
							max: Number(goal.target_amount),
							tone: "sage",
							className: "mt-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								goal.name,
								" · ",
								percentOf(saved, Number(goal.target_amount)),
								"%"
							]
						})] }) : null
					]
				}, profile.id);
			})
		}), members.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 border-t border-border/70 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg",
					children: t("parentPaidTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("parentPaidIntro")
				}),
				parentPaid.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptIcon, {
							className: "size-5",
							strokeWidth: ICON_STROKE
						}),
						title: t("noParentPaidRecorded"),
						description: t("noParentPaidRecordedDescription")
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border/70",
					children: parentPaid.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm",
								children: [labels.merchant(item.merchant) || labels.category(item.category), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ms-2 text-xs text-muted-foreground",
									children: `${t("forFamilyMember")} ${nameOf(item.beneficiary_user_id)}`
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: [
									labels.category(item.category),
									" · ",
									formatDate(item.occurred_on),
									item.payment_method ? ` · ${item.payment_method}` : "",
									item.deducted_from_child ? ` · ${t("deductFromChild")}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-number shrink-0 text-sm",
							children: formatMoney(Number(item.amount), item.currency)
						})]
					}, item.id))
				})
			]
		}) : null]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentPaidExpenseDialog, {
		open: dialogOpen,
		onClose: () => setDialogOpen(false),
		members,
		currency
	})] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "tabular-nums",
			children: value
		})]
	});
}
var TOUR_VERSION = "v1";
function keyFor(userId) {
	return `wazen.walkthrough.${TOUR_VERSION}.${userId}`;
}
/**
* First-use walkthrough.
*
* Regular accounts see it once — completing or skipping marks it done for that
* account. Demo accounts see it on every sign-in (once per browser session) so
* it can always be shown during presentations.
*/
function FirstUseWalkthrough({ userId, isDemo, lifeStage }) {
	const { t } = useWazenLocale();
	const [step, setStep] = (0, import_react.useState)(0);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const key = keyFor(userId);
		try {
			if (isDemo) {
				setOpen(sessionStorage.getItem(key) !== "seen");
				return;
			}
			setOpen(localStorage.getItem(key) !== "done");
		} catch {
			setOpen(true);
		}
	}, [isDemo, userId]);
	const complete = () => {
		try {
			if (isDemo) sessionStorage.setItem(keyFor(userId), "seen");
			else localStorage.setItem(keyFor(userId), "done");
		} catch {}
		setOpen(false);
	};
	const childLike = lifeStage === "child" || lifeStage === "teenager";
	const steps = [
		{
			title: t("tourWelcomeTitle"),
			body: childLike ? t("tourWelcomeYoungBody") : t("tourWelcomeBody"),
			icon: BudgetIcon
		},
		{
			title: t("tourUnderstandTitle"),
			body: t("tourUnderstandBody"),
			icon: BudgetIcon
		},
		{
			title: t("tourPlanTitle"),
			body: childLike ? t("tourPlanYoungBody") : t("tourPlanBody"),
			icon: GoalsIcon
		},
		{
			title: t("tourGrowTitle"),
			body: childLike ? t("tourGrowYoungBody") : t("tourGrowBody"),
			icon: SavingsIcon
		}
	];
	const current = steps[step] ?? steps[0];
	if (!current) return null;
	const Icon = current.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next ? complete() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md overflow-hidden p-0",
			"aria-describedby": "walkthrough-description",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-accent/55 px-6 pb-7 pt-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: ICON_STROKE
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "wazen-label mt-6",
						children: [
							t("tourStep"),
							" ",
							step + 1,
							" ",
							t("ofWord"),
							" ",
							steps.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "mt-2 text-2xl sm:text-3xl",
						children: current.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						id: "walkthrough-description",
						className: "mt-3 text-sm leading-relaxed",
						children: current.body
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pb-6 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex gap-2",
					"aria-hidden": true,
					children: steps.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1 flex-1 rounded-full ${index <= step ? "bg-primary" : "bg-secondary"}` }, item.title))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: complete,
						children: t("tourSkip")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setStep((value) => value - 1),
							children: t("backLabel")
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => step === steps.length - 1 ? complete() : setStep((value) => value + 1),
							children: step === steps.length - 1 ? t("tourFinish") : t("continueLabel")
						})]
					})]
				})]
			})]
		})
	});
}
var STAGE_KEY = {
	child: "stageChild",
	teenager: "stageTeenager",
	university_student: "stageUniversity",
	employee: "stageEmployee",
	self_employed: "stageSelfEmployed",
	parent: "stageParent"
};
var WELCOME_KEY = {
	child: "welcomeChild",
	teenager: "welcomeTeenager",
	university_student: "welcomeUniversity",
	employee: "welcomeEmployee",
	self_employed: "welcomeSelfEmployed",
	parent: "welcomeParent"
};
function Dashboard() {
	const navigate = useNavigate();
	const { t, locale } = useWazenLocale();
	const { user } = useSession();
	const { data: profile, isLoading: profileLoading } = useProfile();
	const transactions = useTransactions();
	const goals = useGoals();
	const budget = useMonthlyBudget();
	const recurring = useRecurringItems();
	const isParent = profile?.life_stage === "parent";
	const family = useFamilySummary(!!isParent);
	const zakat = useZakat();
	(0, import_react.useEffect)(() => {
		if (profile && !profile.onboarding_completed) navigate({ to: "/onboarding" });
	}, [profile, navigate]);
	if (profileLoading || transactions.isLoading || goals.isLoading || budget.isLoading || recurring.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[40vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" })
	}) });
	if (!profile || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wazen-panel p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl",
			children: t("finishProfile")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/onboarding",
			className: "mt-4 inline-block text-sm underline underline-offset-4",
			children: t("continueSetup")
		})]
	}) });
	const data = {
		userId: user.id,
		currency: profile.base_currency,
		transactions: transactions.data ?? [],
		goals: goals.data ?? [],
		budget: budget.data ?? null,
		recurring: recurring.data ?? []
	};
	const firstName = firstNameOf(profile.full_name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirstUseWalkthrough, {
		userId: user.id,
		isDemo: isDemoAccount(user.email),
		lifeStage: profile.life_stage
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-8 wazen-enter ${profile.life_stage === "teenager" ? "stage-teen" : profile.life_stage === "university_student" ? "stage-university" : ""}`,
		children: [
			profile.life_stage === "child" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				name: firstName,
				eyebrow: `${t(STAGE_KEY[profile.life_stage])} ${t("experience")}`,
				subtitle: t(WELCOME_KEY[profile.life_stage]),
				today: formatToday(/* @__PURE__ */ new Date(), locale),
				avatar: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					className: "wazen-interactive block rounded-full outline-hidden hover:wazen-interactive-hover focus-visible:ring-2 focus-visible:ring-ring/60",
					title: t("viewProfile"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenAvatar, {
						fullName: profile.full_name,
						gender: profile.gender,
						lifeStage: profile.life_stage,
						avatarUrl: profile.avatar_url,
						size: 72
					})
				})
			}),
			canCalculateZakat(profile.life_stage) && zakat.result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZakatAlert, {
				result: zakat.result,
				currency: profile.base_currency,
				compact: true
			}) : null,
			profile.life_stage === "child" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildDashboard, {
				data,
				firstName,
				fullName: profile.full_name,
				gender: profile.gender,
				avatarUrl: profile.avatar_url
			}) : profile.life_stage === "teenager" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeenagerDashboard, { data }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultDashboard, {
				data,
				focus: profile.life_stage === "university_student" ? "student" : "employee"
			}),
			isParent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneySection, {
				title: t("familyFinances"),
				description: t("noFamilyDescription"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilySummaryCard, {
					members: family.data ?? [],
					isLoading: family.isLoading,
					currency: profile.base_currency,
					transactions: transactions.data ?? []
				})
			}) : null
		]
	})] });
}
//#endregion
export { Dashboard as component };
