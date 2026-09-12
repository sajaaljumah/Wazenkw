import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as useWazenLocale, a as cn, n as Button } from "./button-vAj4SDK8.mjs";
import { j as LanguageIcon, k as ICON_STROKE } from "./AppShell-cdoNFpBj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LanguageToggle-CnUrZzMI.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Language switch for the public screens. Signed-in users change their saved
* preference in Settings, which always wins over this device-level choice.
*/
function LanguageToggle({ className }) {
	const { language, setLanguage, t } = useWazenLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "ghost",
		size: "sm",
		className: cn("gap-2", className),
		onClick: () => setLanguage(language === "ar" ? "en" : "ar"),
		"aria-label": t("language"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageIcon, {
			className: "size-4",
			strokeWidth: ICON_STROKE
		}), language === "ar" ? t("english") : t("arabic")]
	});
}
//#endregion
export { LanguageToggle as t };
