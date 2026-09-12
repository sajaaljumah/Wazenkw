import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as useWazenLocale, a as cn, n as Button } from "./button-vAj4SDK8.mjs";
import { Ot as lifeStageForAge, Q as SpinnerIcon, ft as calculateAge, k as ICON_STROKE, lt as accountTypeFor, ot as WazenMark, t as ADULT_LIFE_STAGES, wt as firstNameOf, z as PremiumIcon } from "./AppShell-cdoNFpBj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-DIFqE1LX.mjs";
import { t as useWazenLabels } from "./i18n-labels-DPVkAazE.mjs";
import { n as DEMO_PASSWORD, t as DEMO_ACCESS_ACCOUNTS } from "./demo-accounts-Ba1ysXXf.mjs";
import { t as LanguageToggle } from "./LanguageToggle-CnUrZzMI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CCErGLMd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Schemas are built per render so validation messages follow the chosen language. */
function makeSchemas(t) {
	const tr = t;
	const email = stringType().trim().email(tr("invalidEmail"));
	const password = stringType().min(8, tr("passwordMin"));
	return {
		signIn: objectType({
			email,
			password
		}),
		signUp: objectType({
			full_name: stringType().trim().min(2, tr("enterFirstNameError")).max(80),
			email,
			password,
			date_of_birth: stringType().min(1, tr("selectDobError")),
			gender: enumType(["female", "male"], { message: tr("selectGenderError") }),
			life_stage: stringType().min(1, tr("selectLifeStage")),
			language: stringType().min(1),
			base_currency: stringType().min(1)
		})
	};
}
var inputClass = "wazen-field placeholder:text-muted-foreground/70";
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "wazen-label",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1.5 block text-xs text-destructive",
				children: error
			}) : null
		]
	});
}
function AuthPage() {
	const { mode } = Route.useSearch();
	const navigate = useNavigate();
	const { t } = useWazenLocale();
	const labels = useWazenLabels();
	const { signIn: signInSchema, signUp: signUpSchema } = makeSchemas(t);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		password: "",
		date_of_birth: "",
		gender: "",
		life_stage: "",
		language: "ar",
		base_currency: "KWD"
	});
	const set = (key, value) => setForm((prev) => ({
		...prev,
		[key]: value
	}));
	const age = form.date_of_birth ? calculateAge(form.date_of_birth) : null;
	const autoStage = age === null ? null : lifeStageForAge(age);
	async function handleSignIn(event) {
		event.preventDefault();
		const parsed = signInSchema.safeParse({
			email: form.email,
			password: form.password
		});
		if (!parsed.success) {
			setErrors(fieldErrors(parsed.error));
			return;
		}
		setErrors({});
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword(parsed.data);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		navigate({ to: "/dashboard" });
	}
	async function handleSignUp(event) {
		event.preventDefault();
		const lifeStage = autoStage ?? form.life_stage;
		const parsed = signUpSchema.safeParse({
			...form,
			life_stage: lifeStage
		});
		if (!parsed.success) {
			setErrors(fieldErrors(parsed.error));
			return;
		}
		if (age !== null && age < 3) {
			setErrors({ date_of_birth: t("invalidDob") });
			return;
		}
		setErrors({});
		setBusy(true);
		const { data, error } = await supabase.auth.signUp({
			email: parsed.data.email,
			password: parsed.data.password,
			options: {
				emailRedirectTo: window.location.origin,
				data: { wazen_walkthrough_eligible: true }
			}
		});
		if (error) {
			setBusy(false);
			toast.error(error.message);
			return;
		}
		if (!data.session) {
			setBusy(false);
			toast.success(t("confirmEmailSent"));
			navigate({
				to: "/auth",
				search: { mode: "signin" }
			});
			return;
		}
		const stage = lifeStage;
		const { error: profileError } = await supabase.from("profiles").insert({
			id: data.user.id,
			full_name: firstNameOf(parsed.data.full_name),
			date_of_birth: parsed.data.date_of_birth,
			gender: parsed.data.gender,
			life_stage: stage,
			language: parsed.data.language,
			base_currency: parsed.data.base_currency,
			account_type: accountTypeFor(stage)
		});
		setBusy(false);
		if (profileError) {
			toast.error(profileError.message);
			return;
		}
		navigate({ to: "/onboarding" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex h-20 max-w-6xl items-center justify-between border-b border-border px-5 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenMark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 sm:gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					search: { mode: mode === "signin" ? "signup" : "signin" },
					className: "text-sm text-muted-foreground underline-offset-4 hover:underline",
					children: mode === "signin" ? t("createAccount") : t("haveAccount")
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-6xl px-5 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-10 lg:border-e lg:border-border lg:pe-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl sm:text-4xl",
						children: mode === "signin" ? t("welcomeBack") : t("createWazenAccount")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: mode === "signin" ? t("signinSub") : t("signupSub")
					}),
					mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSignIn,
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("email"),
								error: errors["email"],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									autoComplete: "email",
									className: inputClass,
									value: form.email,
									onChange: (e) => set("email", e.target.value),
									placeholder: "you@example.com"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("password"),
								error: errors["password"],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									autoComplete: "current-password",
									className: inputClass,
									value: form.password,
									onChange: (e) => set("password", e.target.value),
									placeholder: "••••••••"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/forgot-password",
									className: "text-sm text-muted-foreground underline-offset-4 hover:underline",
									children: t("forgotPassword")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
								busy,
								children: t("signIn")
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSignUp,
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("firstName"),
								error: errors["full_name"],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									value: form.full_name,
									onChange: (e) => set("full_name", e.target.value),
									placeholder: t("firstNamePlaceholder")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("email"),
									error: errors["email"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										autoComplete: "email",
										className: inputClass,
										value: form.email,
										onChange: (e) => set("email", e.target.value),
										placeholder: "you@example.com"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("password"),
									error: errors["password"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										autoComplete: "new-password",
										className: inputClass,
										value: form.password,
										onChange: (e) => set("password", e.target.value),
										placeholder: t("passwordHint")
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
									label: t("dateOfBirth"),
									error: errors["date_of_birth"],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
										className: inputClass,
										value: form.date_of_birth,
										onChange: (e) => set("date_of_birth", e.target.value)
									}), age !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1.5 block text-xs text-muted-foreground",
										children: [
											t("age"),
											" ",
											age,
											" — ",
											t("ageAuto")
										]
									}) : null]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("genderField"),
									error: errors["gender"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-2",
										children: ["female", "male"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											onClick: () => set("gender", value),
											variant: form.gender === value ? "default" : "outline",
											className: cn("flex-1", form.gender === value ? "" : ""),
											children: t(value)
										}, value))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("lifeStageField"),
								error: errors["life_stage"],
								children: autoStage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-input bg-secondary/60 px-4 py-3 text-sm",
									children: [
										labels.lifeStage(autoStage),
										" — ",
										t("setFromAge"),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-xs text-muted-foreground",
											children: t("guardianNote")
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: inputClass,
									value: form.life_stage,
									onChange: (e) => set("life_stage", e.target.value),
									disabled: age === null,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: age === null ? t("selectDobFirst") : t("selectLifeStage")
									}), ADULT_LIFE_STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: stage,
										children: labels.lifeStage(stage)
									}, stage))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("preferredLanguage"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: inputClass,
										value: form.language,
										onChange: (e) => set("language", e.target.value),
										children: labels.languageOptions.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: l.value,
											children: l.label
										}, l.value))
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("baseCurrency"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: inputClass,
										value: form.base_currency,
										onChange: (e) => set("base_currency", e.target.value),
										children: labels.currencyOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.value,
											children: c.label
										}, c.value))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
								busy,
								children: t("createAccount")
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "py-10 lg:ps-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumIcon, {
							className: "size-4 text-gold",
							strokeWidth: ICON_STROKE
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg",
							children: t("exploreWazen")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: t("demoPickerHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 wazen-rule-list border-y border-border",
						children: DEMO_ACCESS_ACCOUNTS.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => {
								setForm((prev) => ({
									...prev,
									email: account.email,
									password: DEMO_PASSWORD
								}));
								setErrors({});
								if (mode !== "signin") navigate({
									to: "/auth",
									search: { mode: "signin" }
								});
								toast.success(`${account.name} — ${t("demoLoaded")}`);
							},
							variant: "ghost",
							className: "h-auto w-full min-w-0 justify-start rounded-none px-1 py-3.5 text-start text-sm font-normal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [account.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-muted-foreground",
									children: [
										labels.lifeStage(account.life_stage),
										" · ",
										labels.demoNote(account.note)
									]
								})]
							})
						}, account.email))
					})
				]
			})]
		})]
	});
}
function SubmitButton({ busy, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "submit",
		disabled: busy,
		size: "lg",
		className: "w-full",
		children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, children]
	});
}
function fieldErrors(error) {
	const out = {};
	for (const issue of error.issues) {
		const key = String(issue.path[0] ?? "form");
		if (!out[key]) out[key] = issue.message;
	}
	return out;
}
//#endregion
export { AuthPage as component };
