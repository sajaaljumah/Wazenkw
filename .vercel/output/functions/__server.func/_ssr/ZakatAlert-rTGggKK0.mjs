import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as useWazenLocale, a as cn, c as formatMoney } from "./button-vAj4SDK8.mjs";
import { S as ForwardIcon, Y as ScheduledIcon, ct as ZakatIcon, k as ICON_STROKE, m as CheckIcon } from "./AppShell-cdoNFpBj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ZakatAlert-rTGggKK0.js
var import_jsx_runtime = require_jsx_runtime();
/**
* "حان وقت زكاتك" appears only when the wealth reached nisab AND a full Hijri
* year has passed. Every other state explains precisely what is missing.
*/
function ZakatAlert({ result, currency, compact = false, className }) {
	const { t } = useWazenLocale();
	const due = result.status === "due";
	const recorded = result.status === "recorded";
	const title = due ? t("zakatDueTitle") : recorded ? t("zakatRecorded") : t("zakatNotDueTitle");
	const body = due ? t("zakatDueBody") : recorded ? t("zakatRecordedBody") : result.needsStartDate ? t("zakatNeedsStartDate") : result.status === "below_nisab" ? t("zakatBelowNisab") : t("zakatHawlIncomplete");
	const Icon = due ? ZakatIcon : recorded ? CheckIcon : ScheduledIcon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("wazen-card flex flex-wrap items-center gap-4 p-5", due ? "border-primary/45 bg-primary/[0.06]" : "", className),
		role: due ? "alert" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-10 shrink-0 place-items-center rounded-full", due ? "bg-primary/12 text-primary" : "bg-muted text-muted-foreground"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-5",
					strokeWidth: ICON_STROKE
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("text-base font-semibold", due && "text-primary"),
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: body
					}),
					due ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm font-semibold",
						children: [
							t("zakatRemaining"),
							": ",
							formatMoney(result.remaining, currency)
						]
					}) : null
				]
			}),
			compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/zakat",
				className: "inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline",
				children: [t("zakat"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForwardIcon, {
					className: "size-4",
					strokeWidth: ICON_STROKE
				})]
			}) : null
		]
	});
}
//#endregion
export { ZakatAlert as t };
