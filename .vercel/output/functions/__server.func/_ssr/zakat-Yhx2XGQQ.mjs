import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as useProfile, E as useWazenLocale, c as formatMoney, n as Button, s as formatDate } from "./button-vAj4SDK8.mjs";
import { $t as useSaveZakatCalculation, F as MetalsIcon, Q as SpinnerIcon, Xt as useRecordZakatPayment, Y as ScheduledIcon, an as useZakat, ct as ZakatIcon, en as useSaveZakatStartDate, k as ICON_STROKE, on as useZakatCalculations, pt as canCalculateZakat, s as AppShell, st as ZAKAT_REFERENCE_URL } from "./AppShell-cdoNFpBj.mjs";
import { c as ProgressBar, i as EmptyState, l as StatCard, r as DisclosurePanel, s as Panel } from "./primitives-CO_AoPcR.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CU7WH-S6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ZakatAlert } from "./ZakatAlert-rTGggKK0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/zakat-Yhx2XGQQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "wazen-field";
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
/** Zakat payments are their own record type — never a sadaqah/giving entry. */
function ZakatPaymentDialog({ open, onClose, currency, suggestedAmount, calculationId }) {
	const { t } = useWazenLocale();
	const record = useRecordZakatPayment();
	const [amount, setAmount] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(today);
	const [recipient, setRecipient] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setAmount(suggestedAmount > 0 ? String(suggestedAmount) : "");
		setDate(today());
		setRecipient("");
		setNotes("");
	}, [open, suggestedAmount]);
	async function submit() {
		const value = Number(amount);
		if (!Number.isFinite(value) || value <= 0) {
			toast.error(t("enterAmount"));
			return;
		}
		try {
			await record.mutateAsync({
				amount: value,
				currency,
				paymentDate: date,
				recipient: recipient.trim() || null,
				notes: notes.trim() || null,
				status: "paid",
				calculationId: calculationId ?? null
			});
			toast.success(t("zakatPaymentSaved"));
			onClose();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next ? onClose() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("zakatRecordPayment") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("zakatSeparateSadaqah") })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: `${t("zakatPaymentAmount")} (${currency})`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${inputClass} mt-2`,
								type: "number",
								min: "0",
								step: "0.001",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: t("zakatPaymentDate")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${inputClass} mt-2`,
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: t("zakatPaymentRecipient")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${inputClass} mt-2`,
								value: recipient,
								onChange: (e) => setRecipient(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: t("zakatPaymentNotes")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${inputClass} mt-2`,
								value: notes,
								onChange: (e) => setNotes(e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: submit,
						disabled: record.isPending,
						children: [record.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("save")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onClose,
						variant: "outline",
						children: t("cancel")
					})]
				})
			]
		})
	});
}
function ZakatPage() {
	const { t, locale } = useWazenLocale();
	const { data: profile } = useProfile();
	const { result, isLoading, payments, profile: zakatProfile } = useZakat();
	const history = useZakatCalculations();
	const saveStartDate = useSaveZakatStartDate();
	const saveCalculation = useSaveZakatCalculation();
	const [paymentOpen, setPaymentOpen] = (0, import_react.useState)(false);
	const [startDate, setStartDate] = (0, import_react.useState)("");
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "wazen-panel p-8 text-sm text-muted-foreground",
		children: "…"
	}) });
	if (!canCalculateZakat(profile.life_stage)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: t("zakatTitle"),
		description: t("zakatDisclaimer"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZakatIcon, {
			className: "size-5",
			strokeWidth: ICON_STROKE
		})
	}) });
	const currency = profile.base_currency;
	if (isLoading || !result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wazen-panel flex items-center gap-3 p-8 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, {
			className: "size-4 animate-spin",
			strokeWidth: ICON_STROKE
		}), t("zakatTitle")]
	}) });
	const eligible = result.lines.filter((line) => line.eligible && !line.needsReview);
	const review = result.lines.filter((line) => line.needsReview);
	const excluded = result.lines.filter((line) => !line.eligible && !line.needsReview);
	async function submitStartDate() {
		const value = startDate || result.today;
		try {
			await saveStartDate.mutateAsync({
				startDate: value,
				nisabMethod: result.nisabMethod,
				nisabKwd: result.nisabKwd
			});
			toast.success(t("savedToast"));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7 wazen-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid grid-cols-1 items-end gap-4 md:grid-cols-[minmax(0,1fr)_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-eyebrow",
							children: t("zakat")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-3xl",
							children: t("zakatTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm text-muted-foreground",
							children: t("zakatSubtitle")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setPaymentOpen(true),
						variant: "outline",
						className: "w-full md:w-auto",
						children: t("zakatRecordPayment")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: async () => {
							try {
								await saveCalculation.mutateAsync(result);
								toast.success(t("zakatCalculationSaved"));
							} catch (error) {
								toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
							}
						},
						disabled: saveCalculation.isPending,
						className: "w-full md:w-auto",
						children: [saveCalculation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("zakatSaveCalculation")]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZakatAlert, {
				result,
				currency
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("nisabValue"),
						amount: result.nisabKwd ?? 0,
						currency,
						tone: "gold",
						hint: result.nisabKwd === null ? t("nisabPending") : result.nisabMethod === "silver" ? t("nisabSilver") : t("nisabGold"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetalsIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("zakatableWealth"),
						amount: result.zakatableAmount,
						currency,
						hint: t("zakatRate")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("zakatAmount"),
						amount: result.zakatDue,
						currency,
						hint: `${t("zakatPaid")}: ${formatMoney(result.paid, currency)}`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZakatIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: t("zakatRemaining"),
						amount: result.remaining,
						currency,
						tone: result.remaining > 0 ? "negative" : "positive",
						hint: result.dueDate ? `${t("zakatDueDate")}: ${formatDate(result.dueDate)}` : t("zakatNeedsStartDate"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduledIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: t("hawl"),
					children: result.startDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
								value: result.hawlProgress,
								max: 100
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									t("hawlProgress"),
									": ",
									result.hawlProgress,
									"%",
									result.hawlDaysRemaining !== null ? ` · ${result.hawlDaysRemaining} ${t("hawlDaysRemaining")}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid gap-3 text-sm sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "wazen-label",
										children: t("zakatStartDate")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: result.startDate }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-xs text-muted-foreground",
										children: result.hijriStart
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "wazen-label",
										children: t("zakatDueDate")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: result.dueDate }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-xs text-muted-foreground",
										children: result.hijriDue
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									t("nisabMethod"),
									":",
									" ",
									result.nisabMethod === "silver" ? `${zakatProfile?.silver_nisab_grams ?? 595} g` : `${zakatProfile?.gold_nisab_grams ?? 85} g`,
									result.nisabRate ? ` · ${t("zakatRatesAsOf")} ${result.nisabRate.as_of} (${formatMoney(Number(result.nisabRate.price_per_gram), result.nisabRate.currency)}/g)` : ""
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold",
								children: t("zakatSetHawl")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: t("zakatSetHawlBody")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "wazen-label",
										children: t("zakatStartDate")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "wazen-field mt-2",
										type: "date",
										value: startDate || result.today,
										onChange: (e) => setStartDate(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: submitStartDate,
									disabled: saveStartDate.isPending,
									className: "w-full sm:w-auto",
									children: [saveStartDate.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("zakatSaveStartDate")]
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
					title: t("zakatExplanation"),
					summary: t("zakatReference"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("zakatExplanationBody") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("zakatSeparateSadaqah") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("zakatDisclaimer") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: t("zakatReference")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: ZAKAT_REFERENCE_URL,
								target: "_blank",
								rel: "noreferrer noopener",
								className: "inline-block text-primary underline underline-offset-4",
								children: t("zakatReferenceLink")
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: t("zakatBreakdown"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineGroup, {
							title: t("zakatEligible"),
							lines: eligible,
							currency
						}),
						review.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
							title: t("zakatNeedsReview"),
							summary: t("zakatNeedsReviewBody"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineGroup, {
								title: t("zakatNeedsReview"),
								lines: review,
								currency
							})
						}) : null,
						excluded.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
							title: t("zakatExcluded"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineGroup, {
								title: t("zakatExcluded"),
								lines: excluded,
								currency
							})
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
				title: t("zakatHistory"),
				summary: t("zakatHistorySummary"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: t("zakatPaymentHistory"),
						children: payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("zakatNoPayments")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border/60 text-sm",
							children: payments.map((payment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: formatMoney(Number(payment.amount_kwd), payment.currency)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [payment.payment_date, payment.recipient ? ` · ${payment.recipient}` : ""]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "wazen-label",
									children: t("zakat")
								})]
							}, payment.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: t("zakatCalculationHistory"),
						children: (history.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("zakatNoCalculations")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border/60 text-sm",
							children: (history.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-1 gap-1 py-3 min-[420px]:grid-cols-[minmax(0,1fr)_auto] min-[420px]:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: formatMoney(Number(row.zakat_due_kwd), currency)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(/* @__PURE__ */ new Date(`${row.calculation_date}T00:00:00`))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										t("zakatableWealth"),
										":",
										" ",
										formatMoney(Number(row.zakatable_amount_kwd), currency)
									]
								})]
							}, row.id))
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: [
					t("zakatReference"),
					" ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: ZAKAT_REFERENCE_URL,
						target: "_blank",
						rel: "noreferrer noopener",
						className: "underline underline-offset-4",
						children: "zakathouse.org.kw"
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZakatPaymentDialog, {
		open: paymentOpen,
		onClose: () => setPaymentOpen(false),
		currency,
		suggestedAmount: result.remaining
	})] });
}
function LineGroup({ title, lines, currency }) {
	const { t } = useWazenLocale();
	if (lines.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "wazen-label",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 divide-y divide-border/60 text-sm",
		children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "grid grid-cols-1 gap-2 py-3 min-[420px]:grid-cols-[minmax(0,1fr)_auto] min-[420px]:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-semibold",
					children: line.type === "cash" || line.type === "savings" ? t(line.label) : line.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block text-xs text-muted-foreground",
					children: [t(line.reason), line.detail ? ` · ${line.detail}` : ""]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 text-start min-[420px]:text-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-semibold",
					children: formatMoney(line.value, currency)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted-foreground",
					children: t(line.method)
				})]
			})]
		}, line.key))
	})] });
}
//#endregion
export { ZakatPage as component };
