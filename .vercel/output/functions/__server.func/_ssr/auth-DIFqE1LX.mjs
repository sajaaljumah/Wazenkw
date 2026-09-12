import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DIFqE1LX.js
var $$splitComponentImporter = () => import("./auth-CCErGLMd.mjs");
var Route = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in or join Wazen" },
		{
			name: "description",
			content: "Sign in to Wazen or create an account to start building healthier financial habits."
		},
		{
			property: "og:title",
			content: "Sign in or join Wazen"
		},
		{
			property: "og:description",
			content: "Access your Wazen personal finance account."
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
	validateSearch: (search) => ({ mode: search["mode"] === "signup" ? "signup" : "signin" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
