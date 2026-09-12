import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, _ as recurringStatus, a as cn, c as formatMoney, g as nextDueDate, m as monthlyCommitments, n as Button, o as firstOfMonth, s as formatDate, u as frequencyOf, w as useSession } from "./button-vAj4SDK8.mjs";
import { A as IncomeIcon, Ct as deleteRecurringItemFn, It as saveRecurringItemFn, J as SavingsIcon, Q as SpinnerIcon, Rt as toggleRecurringItemFn, St as currencyName, Y as ScheduledIcon, _ as EditIcon, _t as convertCurrencyFn, dt as attachFxSnapshot, h as DeleteIcon, jt as listRecurringItemsFn, k as ICON_STROKE, r as AddIcon, s as AppShell, u as CURRENCIES } from "./AppShell-cdoNFpBj.mjs";
import { i as EmptyState, l as StatCard, r as DisclosurePanel, s as Panel } from "./primitives-CO_AoPcR.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CU7WH-S6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useWazenLabels } from "./i18n-labels-DPVkAazE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recurring-CRKe8XXU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Every recurring commitment, paused ones included, served from MongoDB Atlas. */
function useAllRecurringItems() {
	const { session, user, loading } = useSession();
	return useQuery({
		queryKey: ["recurring-all", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const res = await listRecurringItemsFn({ data: {
				activeOnly: false,
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to load recurring items from MongoDB.");
			return res.data ?? [];
		}
	});
}
function useInvalidateRecurring() {
	const queryClient = useQueryClient();
	return async () => {
		await Promise.all([queryClient.invalidateQueries({ queryKey: ["recurring-all"] }), queryClient.invalidateQueries({ queryKey: ["recurring"] })]);
	};
}
function useSaveRecurringItem() {
	const { session, user } = useSession();
	const invalidate = useInvalidateRecurring();
	return useMutation({
		mutationFn: async (input) => {
			const res = await saveRecurringItemFn({ data: {
				id: input.id,
				kind: input.kind,
				name: input.name,
				merchant: input.merchant,
				category: input.category,
				amount: input.amount,
				currency: input.currency,
				frequency: input.frequency,
				day_of_month: input.day_of_month,
				start_date: input.start_date,
				ends_on: input.ends_on,
				note: input.note,
				active: input.active,
				authToken: session?.access_token,
				userId: user?.id
			} });
			if (!res.success) throw new Error("Failed to save recurring item to MongoDB.");
			return res.data;
		},
		onSuccess: invalidate
	});
}
function useToggleRecurringItem() {
	const { session, user } = useSession();
	const invalidate = useInvalidateRecurring();
	return useMutation({
		mutationFn: async ({ id, active }) => {
			if (!(await toggleRecurringItemFn({ data: {
				id,
				active,
				authToken: session?.access_token,
				userId: user?.id
			} })).success) throw new Error("Failed to toggle recurring item in MongoDB.");
		},
		onSuccess: invalidate
	});
}
function useDeleteRecurringItem() {
	const { session, user } = useSession();
	const invalidate = useInvalidateRecurring();
	return useMutation({
		mutationFn: async (id) => {
			if (!(await deleteRecurringItemFn({ data: {
				id,
				authToken: session?.access_token,
				userId: user?.id
			} })).success) throw new Error("Failed to delete recurring item from MongoDB.");
		},
		onSuccess: invalidate
	});
}
var FREQUENCIES = [
	"weekly",
	"monthly",
	"quarterly",
	"yearly"
];
var KINDS = [
	"expense",
	"income",
	"saving"
];
function RecurringFormDialog({ open, onOpenChange, item, currency = "KWD" }) {
	const { t, language } = useWazenLocale();
	const save = useSaveRecurringItem();
	const [kind, setKind] = (0, import_react.useState)("expense");
	const [name, setName] = (0, import_react.useState)("");
	const [merchant, setMerchant] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(t("subscriptionsCategory"));
	const [amount, setAmount] = (0, import_react.useState)("");
	const [itemCurrency, setItemCurrency] = (0, import_react.useState)(currency);
	const [frequency, setFrequency] = (0, import_react.useState)("monthly");
	const [day, setDay] = (0, import_react.useState)("1");
	const [startDate, setStartDate] = (0, import_react.useState)(firstOfMonth());
	const [endsOn, setEndsOn] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setKind(item?.kind ?? "expense");
		setName(item?.name ?? "");
		setMerchant(item?.merchant ?? "");
		setCategory(item?.category ?? t("subscriptionsCategory"));
		setAmount(item ? String(item.amount) : "");
		setItemCurrency(item?.currency ?? currency);
		setFrequency(item?.frequency ?? "monthly");
		setDay(String(item?.day_of_month ?? 1));
		setStartDate(item?.start_date?.slice(0, 10) ?? firstOfMonth());
		setEndsOn(item?.ends_on?.slice(0, 10) ?? "");
		setNote(item?.note ?? "");
	}, [
		open,
		item,
		currency,
		t
	]);
	const submit = async (event) => {
		event.preventDefault();
		const value = Number(amount);
		if (!name.trim() || !Number.isFinite(value) || value <= 0) return;
		try {
			let finalAmount = value;
			let finalNote = note.trim() || null;
			if (itemCurrency !== "KWD") {
				const fxRes = await convertCurrencyFn({ data: {
					amount: value,
					from: itemCurrency,
					to: "KWD",
					date: startDate || firstOfMonth()
				} });
				if (fxRes.success) {
					finalAmount = fxRes.converted_amount;
					finalNote = attachFxSnapshot(finalNote, {
						original_amount: fxRes.original_amount,
						original_currency: fxRes.original_currency,
						converted_amount: fxRes.converted_amount,
						exchange_rate: fxRes.exchange_rate,
						rate_date: fxRes.rate_date
					});
				}
			}
			await save.mutateAsync({
				id: item?.id,
				kind,
				name: name.trim(),
				merchant: merchant.trim() || null,
				category: category.trim() || t("subscriptionsCategory"),
				amount: finalAmount,
				currency: itemCurrency,
				frequency,
				day_of_month: Math.min(Math.max(Number(day) || 1, 1), 31),
				start_date: startDate || firstOfMonth(),
				ends_on: endsOn || null,
				note: finalNote,
				active: item ? item.active : true
			});
			toast.success(t("recurringSaved"));
			onOpenChange(false);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("errorTitle"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[88vh] overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: item ? t("editRecurring") : t("addRecurring") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("recurringSubtitle") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("typeLabel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "wazen-field mt-2",
									value: kind,
									onChange: (e) => setKind(e.target.value),
									children: KINDS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: option,
										children: option === "income" ? t("income") : option === "saving" ? t("savingKind") : t("expense")
									}, option))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("recurringName")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wazen-field mt-2",
									value: name,
									onChange: (e) => setName(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("provider")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wazen-field mt-2",
									value: merchant,
									onChange: (e) => setMerchant(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("categoryLabel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wazen-field mt-2",
									value: category,
									onChange: (e) => setCategory(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("amountLabel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wazen-field mt-2",
									type: "number",
									inputMode: "decimal",
									step: "0.001",
									min: "0",
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("currencyLabel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "wazen-field mt-2",
									value: itemCurrency,
									onChange: (e) => setItemCurrency(e.target.value),
									children: CURRENCIES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: option.code,
										children: [
											option.code,
											" — ",
											currencyName(option.code, language)
										]
									}, option.code))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("frequencyLabel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "wazen-field mt-2",
									value: frequency,
									onChange: (e) => setFrequency(e.target.value),
									children: FREQUENCIES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: option,
										children: t(option === "monthly" ? "monthlyFreq" : option)
									}, option))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("dayOfMonth")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wazen-field mt-2",
									type: "number",
									min: "1",
									max: "31",
									value: day,
									onChange: (e) => setDay(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("startDate")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wazen-field mt-2",
									type: "date",
									value: startDate,
									onChange: (e) => setStartDate(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("endDateOptional")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wazen-field mt-2",
									type: "date",
									value: endsOn,
									onChange: (e) => setEndsOn(e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-label",
							children: t("noteOptional")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "wazen-field mt-2",
							value: note,
							onChange: (e) => setNote(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => onOpenChange(false),
							children: t("cancelLabel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: save.isPending,
							children: [save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("saveLabel")]
						})]
					})
				]
			})]
		})
	});
}
var STATUS_KEY = {
	active: "statusActive",
	paused: "statusPaused",
	ended: "statusEnded",
	scheduled: "statusScheduled"
};
function RecurringPage() {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const { data: profile } = useProfile();
	const items = useAllRecurringItems();
	const toggle = useToggleRecurringItem();
	const remove = useDeleteRecurringItem();
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const currency = profile?.base_currency || "KWD";
	const list = items.data ?? [];
	const totals = monthlyCommitments(list);
	const openNew = () => {
		setEditing(null);
		setDialogOpen(true);
	};
	const renderItem = (item) => {
		const status = recurringStatus(item);
		const due = nextDueDate(item);
		const frequency = frequencyOf(item);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border/70 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground",
								children: t("recurringBadge")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("rounded-full px-2 py-0.5 text-[0.625rem] font-semibold", status === "active" ? "bg-chart-2/12 text-chart-2" : "bg-secondary text-muted-foreground"),
								children: t(STATUS_KEY[status])
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 truncate text-xs text-muted-foreground",
						children: [
							t(frequency === "monthly" ? "monthlyFreq" : frequency),
							item.merchant ? ` · ${labels.merchant(item.merchant)}` : "",
							" ·",
							" ",
							labels.category(item.category),
							due ? ` · ${t("nextPayment")}: ${formatDate(due)}` : ""
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("shrink-0 text-sm tabular-nums", item.kind === "income" ? "text-chart-2" : "text-foreground"),
					children: [item.kind === "income" ? "+" : "−", formatMoney(Number(item.amount), item.currency || currency)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => toggle.mutate({
								id: item.id,
								active: !item.active
							}),
							children: item.active ? t("pauseLabel") : t("resumeLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": t("editRecurring"),
							onClick: () => {
								setEditing(item);
								setDialogOpen(true);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": t("deleteLabel"),
							onClick: async () => {
								await remove.mutateAsync(item.id);
								toast.success(t("recurringDeleted"));
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							})
						})
					]
				})
			]
		}, item.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 wazen-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "wazen-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wazen-label",
					children: t("recurringBadge")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl sm:text-4xl",
							children: t("recurringTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-muted-foreground",
							children: t("recurringSubtitle")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: openNew,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}), t("addRecurring")]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("committedExpenses"),
						amount: totals.expenses,
						currency,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduledIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}),
						hint: t("monthlyCommitmentsTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("committedIncome"),
						amount: totals.income,
						currency,
						tone: "positive",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncomeIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}),
						hint: t("monthlyCommitmentsTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("committedSavings"),
						amount: totals.savings,
						currency,
						tone: "gold",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}),
						hint: t("monthlyCommitmentsTitle")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: t("recurringTitle"),
				children: items.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-32 items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-5 animate-spin text-muted-foreground" })
				}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduledIcon, {
						className: "size-5",
						strokeWidth: ICON_STROKE
					}),
					title: t("noRecurring"),
					description: t("noRecurringDescription")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border/70",
						children: list.filter((item) => recurringStatus(item) === "active" || recurringStatus(item) === "scheduled").map(renderItem)
					}), list.some((item) => recurringStatus(item) === "paused" || recurringStatus(item) === "ended") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
						title: t("inactiveCommitments"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border/70",
							children: list.filter((item) => recurringStatus(item) === "paused" || recurringStatus(item) === "ended").map(renderItem)
						})
					}) : null]
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecurringFormDialog, {
		open: dialogOpen,
		onOpenChange: setDialogOpen,
		item: editing,
		currency
	})] });
}
//#endregion
export { RecurringPage as component };
