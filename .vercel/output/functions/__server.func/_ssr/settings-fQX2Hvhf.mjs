import { o as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, T as useSignOut, a as cn, n as Button, w as useSession } from "./button-vAj4SDK8.mjs";
import { B as ProfileIcon, L as PlanBadge, N as LockedIcon, Ot as lifeStageForAge, Q as SpinnerIcon, X as SignOutIcon, ft as calculateAge, k as ICON_STROKE, lt as accountTypeFor, s as AppShell, t as ADULT_LIFE_STAGES, wt as firstNameOf, z as PremiumIcon } from "./AppShell-cdoNFpBj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useWazenLabels } from "./i18n-labels-DPVkAazE.mjs";
import { i as cacheTheme, n as applyTheme } from "./WazenTheme-D_qpriPK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-fQX2Hvhf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "wazen-field";
function SettingsPage() {
	const queryClient = useQueryClient();
	const signOut = useSignOut();
	const { user } = useSession();
	const { data: profile, isLoading } = useProfile();
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [lifeStage, setLifeStage] = (0, import_react.useState)("");
	const [language, setLanguage] = (0, import_react.useState)("ar");
	const [currency, setCurrency] = (0, import_react.useState)("KWD");
	const [theme, setTheme] = (0, import_react.useState)("light");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [pwBusy, setPwBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setFullName(profile.full_name);
		setLifeStage(profile.life_stage);
		setLanguage(profile.language);
		setCurrency(profile.base_currency);
		setTheme(profile.theme);
	}, [profile]);
	async function chooseTheme(next) {
		setTheme(next);
		applyTheme(next);
		if (user?.id) cacheTheme(user.id, next);
		if (!profile) return;
		const { error } = await supabase.from("profiles").update({ theme: next }).eq("id", profile.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["profile"] });
	}
	async function chooseLanguage(next) {
		setLanguage(next);
		if (!profile) return;
		const { error } = await supabase.from("profiles").update({ language: next }).eq("id", profile.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["profile"] });
	}
	if (isLoading || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" }) });
	const age = calculateAge(profile.date_of_birth);
	const stageLocked = lifeStageForAge(age) !== null;
	async function save() {
		if (!profile) return;
		if (fullName.trim().length < 2) {
			toast.error(t("enterFirstName"));
			return;
		}
		const stage = stageLocked ? profile.life_stage : lifeStage;
		setBusy(true);
		const { error } = await supabase.from("profiles").update({
			full_name: firstNameOf(fullName),
			life_stage: stage,
			account_type: accountTypeFor(stage),
			language,
			base_currency: currency,
			theme
		}).eq("id", profile.id);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["profile"] });
		toast.success(t("settingsSaved"));
	}
	async function changePassword() {
		if (newPassword.length < 8) {
			toast.error(t("passwordHint"));
			return;
		}
		setPwBusy(true);
		const { error } = await supabase.auth.updateUser({
			password: newPassword,
			...currentPassword ? { current_password: currentPassword } : {}
		});
		setPwBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		setCurrentPassword("");
		setNewPassword("");
		toast.success(t("passwordUpdated"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "wazen-label",
			children: t("accountControls")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "wazen-page-title",
				children: t("settings")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanBadge, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 max-w-3xl divide-y divide-border border-y border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsLink, {
				to: "/profile",
				icon: ProfileIcon,
				title: t("personalInformation"),
				body: t("personalInformationBody"),
				action: t("openLabel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsLink, {
				to: "/subscription",
				icon: PremiumIcon,
				title: t("subscriptionSection"),
				body: t("subscriptionSectionBody"),
				action: t("openLabel")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 max-w-3xl border-t border-border pt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl",
				children: t("account")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-label",
							children: t("firstName")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: cn(inputClass, "mt-2"),
							value: fullName,
							onChange: (e) => setFullName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locked, {
						label: t("email"),
						value: user?.email ?? ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locked, {
							label: t("dateOfBirth"),
							value: profile.date_of_birth
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locked, {
							label: t("gender"),
							value: labels.gender(profile.gender)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-label",
							children: t("lifeStageField")
						}), stageLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 rounded-lg border border-input bg-secondary/60 px-4 py-3 text-sm text-muted-foreground",
							children: [
								labels.lifeStage(profile.life_stage),
								" — ",
								t("stageFromAge"),
								" (",
								age,
								")."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: cn(inputClass, "mt-2"),
							value: lifeStage,
							onChange: (e) => setLifeStage(e.target.value),
							children: ADULT_LIFE_STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: stage,
								children: labels.lifeStage(stage)
							}, stage))
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl border-t border-border pt-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl",
					children: t("preferences")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wazen-label",
								children: t("language")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: cn(inputClass, "mt-2"),
								value: language,
								onChange: (e) => void chooseLanguage(e.target.value),
								children: labels.languageOptions.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: l.value,
									children: l.label
								}, l.value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-label",
							children: t("appearance")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2",
							children: ["light", "dark"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => void chooseTheme(value),
								variant: theme === value ? "default" : "outline",
								className: "flex-1",
								children: value === "light" ? t("lightMode") : t("darkMode")
							}, value))
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: save,
					disabled: busy,
					className: "mt-7",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("saveSettings")]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl border-t border-border pt-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl",
					children: t("security")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-label",
							children: t("currentPassword")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							autoComplete: "current-password",
							className: cn(inputClass, "mt-2"),
							value: currentPassword,
							onChange: (e) => setCurrentPassword(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wazen-label",
							children: t("newPassword")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							autoComplete: "new-password",
							className: cn(inputClass, "mt-2"),
							value: newPassword,
							onChange: (e) => setNewPassword(e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: changePassword,
						disabled: pwBusy,
						children: [pwBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("changePassword")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: signOut,
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutIcon, {
							className: "size-4",
							strokeWidth: ICON_STROKE
						}), t("signOut")]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl border-t border-border pt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl",
				children: t("notifications")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: t("notificationsBody")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl border-t border-border pt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl",
				children: t("privacy")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: t("privacyBody")
			})]
		})
	] });
}
function SettingsLink({ to, icon: Icon, title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex items-center gap-4 px-1 py-5 transition-colors hover:bg-secondary/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-5 shrink-0 text-primary",
				strokeWidth: ICON_STROKE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted-foreground",
					children: body
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-xs font-semibold text-primary",
				children: action
			})
		]
	});
}
function Locked({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "wazen-label flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedIcon, {
			className: "size-3",
			strokeWidth: ICON_STROKE
		}), label]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 rounded-lg border border-input bg-secondary/60 px-4 py-3 text-sm text-muted-foreground",
		children: value
	})] });
}
//#endregion
export { SettingsPage as component };
