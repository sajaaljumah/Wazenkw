import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, a as cn, n as Button } from "./button-vAj4SDK8.mjs";
import { Ot as lifeStageForAge, Q as SpinnerIcon, S as ForwardIcon, ft as calculateAge, k as ICON_STROKE, lt as accountTypeFor, m as CheckIcon, ot as WazenMark, t as ADULT_LIFE_STAGES, wt as firstNameOf } from "./AppShell-cdoNFpBj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useWazenLabels } from "./i18n-labels-DPVkAazE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-EgRrEDAi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "wazen-field";
function Onboarding() {
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const STEPS = [
		t("stepBasics"),
		t("stepLifeStage"),
		t("stepPreferences")
	];
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: profile, isLoading } = useProfile();
	const [step, setStep] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [lifeStage, setLifeStage] = (0, import_react.useState)("");
	const [language, setLanguage] = (0, import_react.useState)("ar");
	const [currency, setCurrency] = (0, import_react.useState)("KWD");
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setFullName(profile.full_name);
		setLifeStage(profile.life_stage);
		setLanguage(profile.language);
		setCurrency(profile.base_currency);
	}, [profile]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenteredSpinner, {});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wazen-panel max-w-md p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl",
				children: t("profileMissing")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: t("profileMissingBody")
			})]
		})
	});
	const age = calculateAge(profile.date_of_birth);
	const autoStage = lifeStageForAge(age);
	const effectiveStage = autoStage ?? lifeStage;
	async function saveAndFinish() {
		if (!effectiveStage) {
			toast.error(t("selectLifeStage"));
			return;
		}
		setBusy(true);
		const { error } = await supabase.from("profiles").update({
			full_name: firstNameOf(fullName),
			life_stage: effectiveStage,
			account_type: accountTypeFor(effectiveStage),
			language,
			base_currency: currency,
			onboarding_completed: true
		}).eq("id", profile.id);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["profile"] });
		setStep(3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "mx-auto flex h-20 max-w-3xl items-center px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenMark, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 pb-24 sm:px-6",
			children: [step < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex items-center gap-2",
				children: STEPS.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex size-7 items-center justify-center rounded-md text-xs", index <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
							children: index < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "size-3.5" }) : index + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs text-muted-foreground sm:inline",
							children: label
						}),
						index < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }) : null
					]
				}, label))
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-y border-border py-8 sm:py-10",
				children: [
					step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl",
							children: t("basicInfoTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: t("basicInfoBody")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 space-y-5",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-5 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyRow, {
										label: t("dateOfBirth"),
										value: profile.date_of_birth
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyRow, {
										label: t("gender"),
										value: labels.gender(profile.gender)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyRow, {
									label: t("age"),
									value: `${age} ${t("yearsOld")}`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextButton, {
							onClick: () => {
								if (fullName.trim().length < 2) {
									toast.error(t("enterFirstNameError"));
									return;
								}
								setStep(1);
							},
							children: t("continueLabel")
						})
					] }) : null,
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl",
							children: t("lifeStageTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								t("lifeStageAgeBody"),
								" ",
								age,
								" ",
								t("yearsOld"),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-7",
							children: autoStage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-input bg-secondary/60 p-5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "font-normal",
										children: labels.lifeStage(autoStage)
									}),
									" —",
									" ",
									t("autoStageNote"),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 block text-xs text-muted-foreground",
										children: t("guardianLinkNote")
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: ADULT_LIFE_STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: () => setLifeStage(stage),
									variant: lifeStage === stage ? "default" : "outline",
									className: "h-auto justify-start p-5 text-start",
									children: labels.lifeStage(stage)
								}, stage))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {
								onClick: () => setStep(0),
								label: t("backLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextButton, {
								inline: true,
								onClick: () => setStep(2),
								children: t("continueLabel")
							})]
						})
					] }) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl",
							children: t("preferencesTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: t("preferencesBody")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 grid gap-5 sm:grid-cols-2",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {
								onClick: () => setStep(1),
								label: t("backLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextButton, {
								inline: true,
								busy,
								onClick: saveAndFinish,
								children: t("finishSetup")
							})]
						})
					] }) : null,
					step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "wazen-label",
								children: t("allSet")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 text-2xl min-[375px]:text-3xl sm:text-5xl",
								children: [
									t("welcomeToWazen"),
									"، ",
									firstNameOf(fullName)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-4 max-w-md text-muted-foreground",
								children: labels.welcomeMessage(effectiveStage)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => navigate({ to: "/dashboard" }),
								className: "mt-9",
								children: [t("goToDashboard"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForwardIcon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								})]
							})
						]
					}) : null
				]
			})]
		})]
	});
}
function ReadOnlyRow({ label, value, capitalize }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "wazen-label",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-2 rounded-lg border border-input bg-secondary/60 px-4 py-3 text-sm text-muted-foreground", capitalize && "capitalize"),
		children: value
	})] });
}
function NextButton({ onClick, children, busy, inline }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		onClick,
		disabled: busy,
		className: cn(inline ? "flex-1" : "mt-8 w-full sm:w-auto"),
		children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, children]
	});
}
function BackButton({ onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		onClick,
		variant: "outline",
		children: label
	});
}
function CenteredSpinner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" })
	});
}
//#endregion
export { Onboarding as component };
