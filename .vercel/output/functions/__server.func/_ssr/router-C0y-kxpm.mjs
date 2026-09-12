import { o as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { E as useWazenLocale, a as cn, n as Button, t as AppLocaleProvider } from "./button-vAj4SDK8.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$15 } from "./auth-DIFqE1LX.mjs";
import { t as ThemeSync } from "./WazenTheme-D_qpriPK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C0y-kxpm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CqY_PP1R.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)"
		},
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
/** Global Wazen footer — subtle, consistent across every screen. */
function WazenFooter({ className }) {
	const { isArabic } = useWazenLocale();
	const copyright = isArabic ? "© سجى الجمعه" : "© Saja Aljumah";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: cn("px-6 pb-24 pt-10 text-center sm:pb-8", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-wide text-muted-foreground",
			dir: "auto",
			children: copyright
		})
	});
}
function NotFoundComponent() {
	const { t } = useWazenLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md border-y border-border py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wazen-label",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-4xl text-foreground",
					children: t("notFoundTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("notFoundBody")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: t("goHome")
						})
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	const { t } = useWazenLocale();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md border-y border-border py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl text-foreground",
					children: t("pageErrorTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("pageErrorBody")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							router.invalidate();
							reset();
						},
						children: t("tryAgain")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							children: t("goHome")
						})
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Wazen — Personal Finance & Financial Education" },
			{
				name: "description",
				content: "Wazen helps you and your family build healthier financial habits at every life stage."
			},
			{
				property: "og:title",
				content: "Wazen"
			},
			{
				property: "og:description",
				content: "Personal finance and financial education for every life stage."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		dir: "ltr",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function AuthSync({ queryClient }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		let active = true;
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			queueMicrotask(() => {
				if (!active) return;
				router.invalidate();
				if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
			});
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, [router, queryClient]);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSync, { queryClient }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLocaleProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WazenFooter, {})
			] })
		]
	});
}
var $$splitComponentImporter$13 = () => import("./routes-D_Ln7iCp.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Wazen — Personal Finance & Financial Education" },
		{
			name: "description",
			content: "Wazen helps families and individuals build healthier financial habits, with guidance tailored to every life stage."
		},
		{
			property: "og:title",
			content: "Wazen — Personal Finance & Financial Education"
		},
		{
			property: "og:description",
			content: "Balance your money with confidence. Wazen adapts to children, teens, students, employees and the self-employed."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./route-Di7iQBCH.mjs");
var Route$12 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({
			to: "/auth",
			search: { mode: "signin" }
		});
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./forgot-password-D_FBU6-S.mjs");
var Route$11 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [
		{ title: "Reset your Wazen password" },
		{
			name: "description",
			content: "Request a password reset link for your Wazen account."
		},
		{
			property: "og:title",
			content: "Reset your Wazen password"
		},
		{
			property: "og:description",
			content: "Request a password reset link for your Wazen account."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./reset-password-BFWPL3l0.mjs");
var Route$10 = createFileRoute("/reset-password")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Choose a new Wazen password" },
		{
			name: "description",
			content: "Set a new password for your Wazen account."
		},
		{
			property: "og:title",
			content: "Choose a new Wazen password"
		},
		{
			property: "og:description",
			content: "Set a new password for your Wazen account."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./assets-sBcIw-vM.mjs");
var Route$9 = createFileRoute("/_authenticated/assets")({
	head: () => ({ meta: [
		{ title: "Assets & portfolio — Wazen" },
		{
			name: "description",
			content: "Track the shares, gold, silver and property you own in Wazen, with purchase prices, current value, gain or loss and rental income."
		},
		{
			property: "og:title",
			content: "Assets & portfolio — Wazen"
		},
		{
			property: "og:description",
			content: "Track the shares, gold, silver and property you own in Wazen, with purchase prices, current value, gain or loss and rental income."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./dashboard-Ce87zssC.mjs");
var Route$8 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — Wazen" },
		{
			name: "description",
			content: "Your Wazen money overview: available money, budget, savings goals and upcoming cash flow."
		},
		{
			property: "og:title",
			content: "Dashboard — Wazen"
		},
		{
			property: "og:description",
			content: "Your Wazen money overview: available money, budget, savings goals and upcoming cash flow."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./documents-Bn4nhfmk.mjs");
var Route$7 = createFileRoute("/_authenticated/documents")({
	head: () => ({ meta: [
		{ title: "Financial documents — Wazen" },
		{
			name: "description",
			content: "Upload invoices, gold and silver purchases, investment confirmations and property contracts, then review and save their details."
		},
		{
			property: "og:title",
			content: "Financial documents — Wazen"
		},
		{
			property: "og:description",
			content: "Upload invoices, gold and silver purchases, investment confirmations and property contracts, then review and save their details."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./learn-BOrsMGeV.mjs");
var Route$6 = createFileRoute("/_authenticated/learn")({
	head: () => ({ meta: [
		{ title: "Learn — Wazen" },
		{
			name: "description",
			content: "Wazen's child money school: short lessons, playable games, quizzes, challenges and badges."
		},
		{
			property: "og:title",
			content: "Learn — Wazen"
		},
		{
			property: "og:description",
			content: "Short financial lessons, real games, quizzes and challenges for children."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./onboarding-EgRrEDAi.mjs");
var Route$5 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [
		{ title: "Account setup — Wazen" },
		{
			name: "description",
			content: "Complete your Wazen account setup and preferences."
		},
		{
			property: "og:title",
			content: "Account setup — Wazen"
		},
		{
			property: "og:description",
			content: "Complete your Wazen account setup and preferences."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./profile-CVuecl1-.mjs");
var Route$4 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Profile — Wazen" },
		{
			name: "description",
			content: "Manage your Wazen identity and personal preferences."
		},
		{
			property: "og:title",
			content: "Profile — Wazen"
		},
		{
			property: "og:description",
			content: "Manage your Wazen identity and personal preferences."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./recurring-CRKe8XXU.mjs");
var Route$3 = createFileRoute("/_authenticated/recurring")({
	head: () => ({ meta: [
		{ title: "Recurring commitments — Wazen" },
		{
			name: "description",
			content: "Track subscriptions, bills and recurring saving transfers with their amount, frequency and next payment date."
		},
		{
			property: "og:title",
			content: "Recurring commitments — Wazen"
		},
		{
			property: "og:description",
			content: "Track subscriptions, bills and recurring saving transfers with their amount, frequency and next payment date."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-fQX2Hvhf.mjs");
var Route$2 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "Settings — Wazen" },
		{
			name: "description",
			content: "Manage Wazen language, appearance, security and account controls."
		},
		{
			property: "og:title",
			content: "Settings — Wazen"
		},
		{
			property: "og:description",
			content: "Manage Wazen language, appearance, security and account controls."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./subscription-B92zYIMK.mjs");
var Route$1 = createFileRoute("/_authenticated/subscription")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [
		{ title: "Your Wazen plan — Individual & Family" },
		{
			name: "description",
			content: "Review your Wazen plan, subscription status and renewal date, and see what the Individual and Family subscriptions include."
		},
		{
			property: "og:title",
			content: "Your Wazen plan — Individual & Family"
		},
		{
			property: "og:description",
			content: "Manage your Wazen subscription, family seats and premium access."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] })
});
var $$splitComponentImporter = () => import("./zakat-Yhx2XGQQ.mjs");
var Route = createFileRoute("/_authenticated/zakat")({
	head: () => ({ meta: [
		{ title: "Zakat — Wazen" },
		{
			name: "description",
			content: "Calculate your zakat in Wazen from your recorded money, savings, gold, silver, shares and property, with a dynamic nisab and Hijri hawl tracking."
		},
		{
			property: "og:title",
			content: "Zakat — Wazen"
		},
		{
			property: "og:description",
			content: "Zakat in Wazen: dynamic nisab from the current gold gram price, Hijri hawl tracking and recorded zakat payments."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AuthenticatedRouteRoute = Route$12.update({
	id: "/_authenticated",
	getParentRoute: () => Route$14
});
var AuthRoute = Route$15.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$14
});
var ForgotPasswordRoute = Route$11.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$14
});
var ResetPasswordRoute = Route$10.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$14
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAssetsRoute: Route$9.update({
		id: "/assets",
		path: "/assets",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardRoute: Route$8.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDocumentsRoute: Route$7.update({
		id: "/documents",
		path: "/documents",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedLearnRoute: Route$6.update({
		id: "/learn",
		path: "/learn",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedOnboardingRoute: Route$5.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedProfileRoute: Route$4.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedRecurringRoute: Route$3.update({
		id: "/recurring",
		path: "/recurring",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedSettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedSubscriptionRoute: Route$1.update({
		id: "/subscription",
		path: "/subscription",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedZakatRoute: Route.update({
		id: "/zakat",
		path: "/zakat",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ForgotPasswordRoute,
	ResetPasswordRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
