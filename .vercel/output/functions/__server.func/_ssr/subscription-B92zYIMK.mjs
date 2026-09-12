import { o as __toESM } from "../_runtime.mjs";
import { c as formatMoney, i as PREMIUM_FEATURES, l as formatPlanDate, o as computeFamilyTotal, s as findPrice } from "./subscription-fUSurh1V.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { E as useWazenLocale, a as cn, n as Button } from "./button-vAj4SDK8.mjs";
import { Q as SpinnerIcon, a as AlertIcon, ht as cancelPremiumSubscription, k as ICON_STROKE, m as CheckIcon, nn as useSubscriptionAccess, s as AppShell, tn as useServerFn, x as FamilyIcon, yt as createCheckoutSessionFn, z as PremiumIcon } from "./AppShell-cdoNFpBj.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CU7WH-S6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useWazenLabels } from "./i18n-labels-DPVkAazE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subscription-B92zYIMK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PremiumBadge({ className }) {
	const { t } = useWazenLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-md border border-gold/25 bg-gold/10 px-2.5 py-1 text-xs text-gold", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
			className: "size-3.5",
			strokeWidth: ICON_STROKE
		}), t("premium")]
	});
}
function UpgradeCheckoutDialog({ open, onOpenChange, kind, billingPeriod, total, currency, kindLabel }) {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const [stage, setStage] = (0, import_react.useState)("review");
	const createCheckout = useServerFn(createCheckoutSessionFn);
	(0, import_react.useEffect)(() => {
		if (open) setStage("review");
	}, [open]);
	async function handleContinueToPayment() {
		setStage("redirecting");
		try {
			const res = await createCheckout({ data: {
				kind,
				billingPeriod
			} });
			if (res?.url) {
				window.location.href = res.url;
				return;
			}
			setStage("not-connected");
		} catch {
			setStage("not-connected");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-w-md",
			children: stage === "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto flex size-11 items-center justify-center rounded-full bg-gold/15 text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
							className: "size-5",
							strokeWidth: ICON_STROKE
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-center",
						children: t("upgradeConfirmTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-center",
						children: t("upgradeConfirmBody")
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wazen-panel space-y-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-label",
							children: t("planSummary")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: t("premium")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium",
									children: kindLabel
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: labels.billingPeriod(billingPeriod)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium",
									children: [
										formatMoney(total, currency),
										" / ",
										labels.billingPeriod(billingPeriod)
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
								className: "size-4 shrink-0 text-chart-2",
								strokeWidth: ICON_STROKE
							}), t("premiumFeaturesIncluded")]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center justify-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
						className: "size-3.5 text-gold",
						strokeWidth: ICON_STROKE
					}), t("stripeSecureNote")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: t("cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleContinueToPayment,
					children: t("continueToPayment")
				})] })
			] }) : stage === "redirecting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, {
						className: "size-8 animate-spin text-gold",
						strokeWidth: ICON_STROKE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl",
						children: t("redirectingToStripe")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
							className: "size-3.5 text-gold",
							strokeWidth: ICON_STROKE
						}), t("stripeSecureNote")]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 py-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-full bg-gold/15 text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertIcon, {
							className: "size-5",
							strokeWidth: ICON_STROKE
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl",
						children: t("stripeNotConnectedTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "max-w-sm",
						children: t("stripeNotConnectedBody")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						className: "w-full sm:justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: t("closeLabel")
						})
					})
				]
			})
		})
	});
}
function SubscriptionPage() {
	const { entitlements, isPremium, isLoading, refetch, canSubscribe, canManageBilling, family } = useSubscriptionAccess();
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const cancel = useServerFn(cancelPremiumSubscription);
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [checkoutOpen, setCheckoutOpen] = (0, import_react.useState)(false);
	const isFamily = entitlements.subscriptionKind === "family" || !!family;
	const individualPrice = findPrice(entitlements.prices, "individual", "monthly");
	const familyPrice = findPrice(entitlements.prices, "family", "monthly");
	const additionalChildren = Math.max(0, (family?.childCount ?? 0) - (family?.includedChildCount ?? 0));
	const familyMoney = computeFamilyTotal(familyPrice, additionalChildren);
	/** Refreshes every place the plan status is shown (header, profile, settings). */
	async function refreshPlanEverywhere() {
		await queryClient.invalidateQueries({ queryKey: ["entitlements"] });
		await refetch();
	}
	async function handleManage() {
		setBusy("manage");
		try {
			await cancel({ data: void 0 });
			toast.success(t("premiumCancelledToast"), { description: t("premiumCancelledToastBody") });
		} catch {
			toast.error(t("cancelFailed"));
		} finally {
			setBusy(null);
			await refreshPlanEverywhere();
		}
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10 wazen-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-b border-border pb-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wazen-label",
						children: t("yourPlan")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl sm:text-4xl",
								children: isPremium ? t("premium") : t("free")
							}),
							isPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumBadge, {}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("rounded-md px-2.5 py-1 text-xs font-medium", entitlements.needsAttention ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"),
								children: labels.subscriptionStatus(entitlements.status)
							}),
							entitlements.subscriptionKind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground",
								children: labels.subscriptionKind(entitlements.subscriptionKind)
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-muted-foreground",
						children: !canSubscribe ? isPremium ? t("familyCoveredBody") : t("guardianManagedBody") : isPremium ? entitlements.isCancelling ? t("cancellingBody") : t("premiumFullBody") : t("freePlanBody")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-7 grid gap-5 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "wazen-label",
								children: t("started")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm",
								children: formatPlanDate(entitlements.startedAt)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "wazen-label",
								children: t("renews")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm",
								children: formatPlanDate(entitlements.renewalAt)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "wazen-label",
								children: t("trialEnds")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm",
								children: formatPlanDate(entitlements.trialEndsAt)
							})] })
						]
					}),
					canSubscribe ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: isPremium ? canManageBilling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleManage,
							disabled: busy === "manage",
							variant: "outline",
							children: busy === "manage" ? "…" : t("manageSubscription")
						}) : null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setCheckoutOpen(true),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								}),
								t("upgradeToPremium"),
								" —",
								" ",
								formatMoney(isFamily ? familyMoney.total : individualPrice?.amount ?? 0, isFamily ? familyMoney.currency : individualPrice?.currency ?? "KWD"),
								"/",
								labels.billingPeriod(entitlements.billingPeriod ?? "monthly")
							]
						})
					}) : null
				]
			}),
			family ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-y border-border py-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyIcon, {
							className: "size-4 text-muted-foreground",
							strokeWidth: ICON_STROKE
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-label",
							children: t("familySubscriptionLabel")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 grid gap-5 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "wazen-label",
								children: t("parentsLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-2 text-sm",
								children: [
									family.parentCount,
									" ",
									t("ofWord"),
									" ",
									family.includedParentCount,
									" ",
									t("includedWord")
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "wazen-label",
								children: t("childrenTeensLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-2 text-sm",
								children: [
									family.childCount,
									" ",
									t("ofWord"),
									" ",
									family.includedChildCount,
									" ",
									t("includedWord")
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "wazen-label",
								children: t("extraChildrenLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm",
								children: family.additionalChildCount
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "wazen-label",
								children: t("freePlacesLeft")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm",
								children: family.remainingIncludedChildSeats
							})] })
						]
					}),
					canManageBilling ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-1 border-t border-border pt-6 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("baseFamilySubscription"),
								" —",
								" ",
								formatMoney(familyMoney.base, familyMoney.currency),
								t("perMonth")
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								additionalChildren,
								" ",
								additionalChildren === 1 ? t("extraChildWord") : t("extraChildrenWord"),
								" ×",
								" ",
								formatMoney(familyPrice?.additional_child_amount ?? 0, familyMoney.currency),
								" —",
								" ",
								formatMoney(familyMoney.additional, familyMoney.currency),
								t("perMonth")
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-foreground",
								children: [
									t("totalLabel"),
									" — ",
									formatMoney(familyMoney.total, familyMoney.currency),
									t("perMonth")
								]
							})
						]
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid border-y border-border lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-b border-border py-7 lg:border-b-0 lg:border-e lg:pe-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-label",
							children: t("free")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-xl",
							children: t("freePlanTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-3 text-sm text-muted-foreground",
							children: labels.freeHighlights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
									className: "mt-0.5 size-4 shrink-0 text-chart-2",
									strokeWidth: ICON_STROKE
								}), item]
							}, item))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-7 lg:ps-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "wazen-label",
								children: t("premium")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumBadge, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-xl",
							children: t("premiumPlanTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-4 text-sm",
							children: PREMIUM_FEATURES.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
									className: "mt-0.5 size-4 shrink-0 text-gold",
									strokeWidth: ICON_STROKE
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: labels.featureLabel(feature)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-muted-foreground",
									children: labels.featureDescription(feature)
								})] })]
							}, feature))
						})
					]
				})]
			}),
			canSubscribe ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid border-y border-border lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-b border-border py-7 lg:border-b-0 lg:border-e lg:pe-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-label",
							children: t("individualLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-3 text-xl",
							children: [formatMoney(individualPrice?.amount ?? 0, individualPrice?.currency ?? "KWD"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [" ", t("perMonth")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-3 text-sm text-muted-foreground",
							children: labels.individualHighlights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
									className: "mt-0.5 size-4 shrink-0 text-chart-2",
									strokeWidth: ICON_STROKE
								}), item]
							}, item))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-7 lg:ps-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wazen-label",
							children: t("familyLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-3 text-xl",
							children: [formatMoney(familyPrice?.amount ?? 0, familyPrice?.currency ?? "KWD"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [" ", t("perMonth")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-3 text-sm text-muted-foreground",
							children: labels.familyHighlights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
									className: "mt-0.5 size-4 shrink-0 text-chart-2",
									strokeWidth: ICON_STROKE
								}), item]
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 text-xs text-muted-foreground",
							children: [
								t("extraChildNoteStart"),
								" ",
								familyPrice?.included_child_count ?? 4,
								" ",
								t("extraChildNoteMiddle"),
								" ",
								formatMoney(familyPrice?.additional_child_amount ?? 0, familyPrice?.currency ?? "KWD"),
								" ",
								t("extraChildNoteEnd")
							]
						})
					]
				})]
			}) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeCheckoutDialog, {
		open: checkoutOpen,
		onOpenChange: setCheckoutOpen,
		kind: isFamily ? "family" : "individual",
		billingPeriod: "monthly",
		total: isFamily ? familyMoney.total : individualPrice?.amount ?? 0,
		currency: isFamily ? familyMoney.currency : individualPrice?.currency ?? "KWD",
		kindLabel: labels.subscriptionKind(isFamily ? "family" : "individual")
	})] });
}
//#endregion
export { SubscriptionPage as component };
