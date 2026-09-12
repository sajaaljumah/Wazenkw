import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as useProfile, w as useSession } from "./button-vAj4SDK8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/WazenTheme-D_qpriPK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_PREFIX = "wazen-theme:";
var GUEST_KEY = "wazen-theme:guest";
function resolve(theme) {
	if (theme === "dark") return "dark";
	if (theme === "system") return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	return "light";
}
/** Applies the resolved theme to the document root. Safe to call repeatedly. */
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	const resolved = resolve(theme);
	const root = document.documentElement;
	root.classList.toggle("dark", resolved === "dark");
	root.style.colorScheme = resolved;
}
function cacheTheme(userId, theme) {
	try {
		localStorage.setItem(`${STORAGE_PREFIX}${userId}`, theme);
	} catch {}
}
function readCachedTheme(userId) {
	try {
		return localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
	} catch {
		return null;
	}
}
var resolveTheme = resolve;
/** Theme chosen on the public screens, before anyone is signed in. */
function cacheGuestTheme(theme) {
	try {
		localStorage.setItem(GUEST_KEY, theme);
	} catch {}
}
function readGuestTheme() {
	try {
		return localStorage.getItem(GUEST_KEY);
	} catch {
		return null;
	}
}
function clearGuestTheme() {
	try {
		localStorage.removeItem(GUEST_KEY);
	} catch {}
}
/**
* Single source of truth for the active theme.
* The preference belongs to the signed-in account: it is read from that
* account's profile row, cached under an account-scoped key to avoid a flash on
* reload, and reset to light whenever nobody is signed in — so one demo account
* never inherits another account's theme.
*/
function ThemeSync() {
	const { user, loading } = useSession();
	const { data: profile } = useProfile();
	const userId = user?.id ?? null;
	const profileTheme = profile?.theme ?? null;
	(0, import_react.useEffect)(() => {
		if (loading) return;
		if (!userId) {
			applyTheme(readGuestTheme() ?? "light");
			return;
		}
		applyTheme(readCachedTheme(userId) ?? readGuestTheme() ?? "light");
	}, [userId, loading]);
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		const guest = readGuestTheme();
		if (!guest) return;
		clearGuestTheme();
		cacheTheme(userId, guest);
		applyTheme(guest);
		supabase.from("profiles").update({ theme: guest }).eq("id", userId);
	}, [userId]);
	(0, import_react.useEffect)(() => {
		if (!userId || !profileTheme) return;
		if (readGuestTheme()) return;
		cacheTheme(userId, profileTheme);
		applyTheme(profileTheme);
	}, [userId, profileTheme]);
	(0, import_react.useEffect)(() => {
		if (profileTheme !== "system" || typeof window === "undefined") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme("system");
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, [profileTheme]);
	return null;
}
//#endregion
export { readGuestTheme as a, cacheTheme as i, applyTheme as n, resolveTheme as o, cacheGuestTheme as r, ThemeSync as t };
