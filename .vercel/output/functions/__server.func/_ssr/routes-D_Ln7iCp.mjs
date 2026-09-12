import { o as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as useWazenLocale, a as cn, n as Button } from "./button-vAj4SDK8.mjs";
import { b as Moon, l as Sun } from "../_libs/lucide-react.mjs";
import { S as ForwardIcon, at as WazenLogo, c as BankIcon, k as ICON_STROKE, m as CheckIcon, o as AnalyticsIcon, ot as WazenMark, v as EmergencyFundIcon, x as FamilyIcon } from "./AppShell-cdoNFpBj.mjs";
import { t as LanguageToggle } from "./LanguageToggle-CnUrZzMI.mjs";
import { a as readGuestTheme, n as applyTheme, o as resolveTheme, r as cacheGuestTheme } from "./WazenTheme-D_qpriPK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_Ln7iCp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Theme switch for the public screens (landing, sign in, sign up).
* The choice applies immediately and is carried into the app once the visitor
* signs in, where it becomes that account's saved preference.
*/
function ThemeToggle({ className }) {
	const { t } = useWazenLocale();
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		setTheme(resolveTheme(readGuestTheme() ?? "light"));
	}, []);
	function toggle() {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		cacheGuestTheme(next);
		applyTheme(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "ghost",
		size: "sm",
		className: cn("gap-2", className),
		onClick: toggle,
		"aria-label": theme === "dark" ? t("lightMode") : t("darkMode"),
		children: [theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
			className: "size-4",
			strokeWidth: ICON_STROKE
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
			className: "size-4",
			strokeWidth: ICON_STROKE
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: theme === "dark" ? t("lightMode") : t("darkMode")
		})]
	});
}
var PILLARS = [
	{
		icon: FamilyIcon,
		title: "pillarStagesTitle",
		body: "pillarStagesBody"
	},
	{
		icon: EmergencyFundIcon,
		title: "pillarPrivacyTitle",
		body: "pillarPrivacyBody"
	},
	{
		icon: AnalyticsIcon,
		title: "pillarHabitsTitle",
		body: "pillarHabitsBody"
	}
];
function Landing() {
	const { t } = useWazenLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-20 border-b border-border/70 bg-card/85 backdrop-blur-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: "signin" },
								children: t("signIn")
							})
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-5 pb-20 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative grid items-center py-14 sm:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-y-6 end-0 hidden w-2/5 rounded-[2.5rem] bg-accent/60 lg:block",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-10 end-10 opacity-30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenLogo, { size: 110 })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-3xl wazen-enter",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "wazen-label",
								children: t("landingEyebrow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenLogo, { size: 92 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Wazen"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-2xl font-display text-3xl leading-tight sm:text-5xl",
								children: t("landingTagline")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-lg text-muted-foreground",
								children: t("landingBody")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										children: [t("createAccount"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForwardIcon, {
											className: "size-4",
											strokeWidth: ICON_STROKE
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										search: { mode: "signin" },
										children: t("exploreDemo")
									})
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid gap-4 sm:grid-cols-3",
					children: PILLARS.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "wazen-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-11 items-center justify-center rounded-2xl bg-accent text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									strokeWidth: ICON_STROKE
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-5 text-xl",
								children: t(title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: t(body)
							})
						]
					}, title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "wazen-card wazen-enter",
					"aria-labelledby": "future-heading",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-11 items-center justify-center rounded-2xl bg-accent text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankIcon, {
									className: "size-5",
									strokeWidth: ICON_STROKE
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "wazen-label",
									children: t("futureEyebrow")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "future-heading",
									className: "mt-1 text-xl",
									children: t("futureTitle")
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground",
							children: t("futureBody")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 wazen-label",
							children: t("futurePlanned")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-2.5 sm:grid-cols-2",
							children: [
								t("futureItem1"),
								t("futureItem2"),
								t("futureItem3"),
								t("futureItem4")
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
									className: "mt-0.5 size-4 shrink-0 text-primary",
									strokeWidth: ICON_STROKE
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/90",
									children: item
								})]
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 border-t border-border/70 pt-4 text-xs text-muted-foreground",
							children: t("futureDisclaimer")
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Landing as component };
