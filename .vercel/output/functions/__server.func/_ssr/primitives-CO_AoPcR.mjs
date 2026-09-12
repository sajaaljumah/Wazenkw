import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as useWazenLocale, a as cn, c as formatMoney } from "./button-vAj4SDK8.mjs";
import { k as ICON_STROKE, y as ExpandIcon } from "./AppShell-cdoNFpBj.mjs";
import { t as useReveal } from "./use-reveal-CLerR8q0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-CO_AoPcR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardHeader({ name, subtitle, eyebrow, today, avatar }) {
	const { t } = useWazenLocale();
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const greeting = hour < 12 ? t("goodMorning") : hour < 18 ? t("goodAfternoon") : t("goodEvening");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "wazen-masthead",
		"data-tour": "welcome",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5 sm:flex-row sm:items-center",
			children: [avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: avatar
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "wazen-label",
						children: [
							today,
							" · ",
							eyebrow
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 text-3xl sm:text-4xl",
						children: [
							greeting,
							", ",
							name,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-muted-foreground",
						children: subtitle
					})
				]
			})]
		})
	});
}
/**
* Primary balance statement.
* One dominant number with supporting figures on a divided rail — the hierarchy
* a banking app leads with, instead of four equal cards.
*/
function BalanceHero({ label, amount, currency, hint, items, action }) {
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		"data-revealed": revealed,
		className: "wazen-balance wazen-reveal",
		"data-tour": "balance",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "wazen-balance-grid"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wazen-label text-primary-foreground/65",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wazen-number mt-3 break-words text-3xl leading-none min-[375px]:text-4xl sm:text-5xl",
						children: formatMoney(amount, currency)
					}),
					hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-primary-foreground/70",
						children: hint
					}) : null,
					action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: action
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-primary-foreground/15 min-[390px]:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 bg-transparent px-3 py-4 sm:px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[0.68rem] tracking-[0.14em] uppercase text-primary-foreground/60",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: cn("wazen-number mt-2 break-words text-sm sm:text-base", item.tone === "positive" ? "wazen-balance-pos" : item.tone === "negative" ? "wazen-balance-neg" : item.tone === "gold" ? "wazen-balance-gold" : "text-primary-foreground"),
						children: formatMoney(item.amount, currency)
					})]
				}, item.label))
			})]
		})]
	});
}
function StatCard({ label, amount, currency, tone = "neutral", hint, icon, className }) {
	const toneClass = tone === "positive" ? "text-chart-2" : tone === "negative" ? "text-destructive" : tone === "gold" ? "text-gold" : "text-foreground";
	const rule = tone === "positive" ? "before:bg-chart-2" : tone === "negative" ? "before:bg-destructive" : tone === "gold" ? "before:bg-gold" : "before:bg-border";
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		"data-revealed": revealed,
		className: cn("wazen-stat wazen-reveal", rule, className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wazen-label",
					children: label
				}), icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground/80",
					children: icon
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("wazen-number mt-2.5 text-xl sm:text-2xl", toneClass),
				children: formatMoney(amount, currency)
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function Panel({ title, action, children, className }) {
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		"data-revealed": revealed,
		className: cn("wazen-card wazen-reveal min-w-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "min-w-0 text-xl sm:text-2xl",
				children: title
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children
		})]
	});
}
function JourneySection({ eyebrow, title, description, action, children, className, id }) {
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		id,
		"data-revealed": revealed,
		className: cn("wazen-journey wazen-reveal", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wazen-label wazen-journey-eyebrow",
						children: eyebrow
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: cn("text-xl sm:text-2xl", eyebrow && "mt-2"),
						children: title
					}),
					description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: description
					}) : null
				]
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children
		})]
	});
}
function InsightStrip({ icon, label, children }) {
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		ref,
		"data-revealed": revealed,
		className: "wazen-insight wazen-reveal",
		"aria-label": label,
		children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-primary",
			children: icon
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wazen-label",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm leading-relaxed text-foreground",
				children
			})]
		})]
	});
}
function DisclosurePanel({ title, summary, children, defaultOpen = false, className }) {
	const { ref, revealed } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		ref,
		"data-revealed": revealed,
		className: cn("wazen-disclosure wazen-reveal group", className),
		open: defaultOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-4 focus-visible:outline-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-base font-semibold sm:text-lg",
					children: title
				}), summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted-foreground sm:text-sm",
					children: summary
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "wazen-disclosure-control flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all group-open:rotate-180 group-open:bg-accent group-open:text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandIcon, {
					className: "size-4",
					strokeWidth: ICON_STROKE
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 border-t border-border/70 pt-5",
			children
		})]
	});
}
function EmptyState({ title, description, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/50 px-6 py-10 text-center",
		children: [
			icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 text-muted-foreground",
				children: icon
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground",
				children: description
			})
		]
	});
}
function ProgressBar({ value, max, tone = "gold", className }) {
	const percent = max > 0 ? Math.min(Math.max(value / max * 100, 0), 100) : 0;
	const { ref, revealed } = useReveal();
	const [visiblePercent, setVisiblePercent] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!revealed) return;
		const frame = window.requestAnimationFrame(() => setVisiblePercent(percent));
		return () => window.cancelAnimationFrame(frame);
	}, [percent, revealed]);
	const fill = tone === "sage" ? "bg-chart-2" : tone === "charcoal" ? "bg-primary" : "bg-gold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("wazen-progress-track h-2 w-full overflow-hidden rounded-full bg-secondary", className),
		"data-complete": percent >= 100 ? "true" : void 0,
		role: "progressbar",
		"aria-valuenow": Math.round(percent),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("wazen-progress-fill h-full rounded-full transition-[width] duration-700 ease-out", fill),
			style: { width: `${visiblePercent}%` }
		})
	});
}
function percentOf(value, max) {
	if (max <= 0) return 0;
	return Math.min(Math.round(value / max * 100), 100);
}
//#endregion
export { InsightStrip as a, ProgressBar as c, EmptyState as i, StatCard as l, DashboardHeader as n, JourneySection as o, DisclosurePanel as r, Panel as s, BalanceHero as t, percentOf as u };
