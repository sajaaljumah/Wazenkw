import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, a as cn, n as Button } from "./button-vAj4SDK8.mjs";
import { L as PlanBadge, N as LockedIcon, Q as SpinnerIcon, ft as calculateAge, it as WazenAvatar, k as ICON_STROKE, s as AppShell, wt as firstNameOf } from "./AppShell-cdoNFpBj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useWazenLabels } from "./i18n-labels-DPVkAazE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CVuecl1-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "wazen-field";
function ProfilePage() {
	const queryClient = useQueryClient();
	const { data: profile, isLoading } = useProfile();
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	const [language, setLanguage] = (0, import_react.useState)("ar");
	const [currency, setCurrency] = (0, import_react.useState)("KWD");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setFullName(profile.full_name);
		setAvatarUrl(profile.avatar_url ?? "");
		setLanguage(profile.language);
		setCurrency(profile.base_currency);
	}, [profile]);
	if (isLoading || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" }) });
	async function save() {
		if (!profile) return;
		if (firstNameOf(fullName).length < 2) {
			toast.error(t("enterFirstName"));
			return;
		}
		setBusy(true);
		const { error } = await supabase.from("profiles").update({
			full_name: firstNameOf(fullName),
			avatar_url: avatarUrl.trim() || null,
			language,
			base_currency: currency
		}).eq("id", profile.id);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["profile"] });
		toast.success(t("profileSaved"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "wazen-label",
			children: t("yourIdentity")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "wazen-page-title",
				children: t("profile")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanBadge, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 flex flex-col items-center gap-5 border-y border-border py-7 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenAvatar, {
				fullName: profile.full_name,
				gender: profile.gender,
				lifeStage: profile.life_stage,
				avatarUrl: profile.avatar_url,
				size: 80
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center sm:text-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl",
					children: firstNameOf(profile.full_name)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						labels.lifeStage(profile.life_stage),
						" · ",
						labels.accountType(profile.account_type)
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 grid border-y border-border sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedField, {
					label: t("dateOfBirth"),
					value: profile.date_of_birth
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedField, {
					label: t("ageCalculated"),
					value: `${calculateAge(profile.date_of_birth)} ${t("years")}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedField, {
					label: t("gender"),
					value: labels.gender(profile.gender)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedField, {
					label: t("accountType"),
					value: labels.accountType(profile.account_type)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl border-t border-border pt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl",
				children: t("editableDetails")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: t("firstName")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: cn(inputClass, "mt-2"),
								value: fullName,
								onChange: (e) => setFullName(e.target.value),
								placeholder: t("firstNamePlaceholder")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1.5 block text-xs text-muted-foreground",
								children: t("firstNameHint")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-label",
							children: t("photoUrl")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: cn(inputClass, "mt-2"),
							value: avatarUrl,
							onChange: (e) => setAvatarUrl(e.target.value),
							placeholder: "https://…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: t("language")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: cn(inputClass, "mt-2"),
								value: language,
								onChange: (e) => setLanguage(e.target.value),
								children: labels.languageOptions.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: l.value,
									children: l.label
								}, l.value))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: t("baseCurrency")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: cn(inputClass, "mt-2"),
								value: currency,
								onChange: (e) => setCurrency(e.target.value),
								children: labels.currencyOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.value,
									children: c.label
								}, c.value))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: save,
						disabled: busy,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("saveChanges")]
					})
				]
			})]
		})
	] });
}
function LockedField({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border px-1 py-5 odd:sm:border-e odd:sm:pe-6 even:sm:ps-6 sm:[&:nth-last-child(-n+2)]:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "wazen-label flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedIcon, {
				className: "size-3",
				strokeWidth: ICON_STROKE
			}), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-lg",
			children: value
		})]
	});
}
//#endregion
export { ProfilePage as component };
