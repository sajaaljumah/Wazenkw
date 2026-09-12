import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-reveal-CLerR8q0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Reveals an element once it scrolls into view.
* Presentation-only: no data, routing or logic depends on it.
* Users with `prefers-reduced-motion: reduce` are revealed immediately.
*/
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
			setRevealed(true);
			return;
		}
		const reveal = () => {
			node.setAttribute("data-reveal-phase", "entering");
			setRevealed(true);
		};
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry?.isIntersecting) return;
			reveal();
			observer.disconnect();
		}, {
			root: null,
			rootMargin: "0px 0px -48px 0px",
			threshold: .01
		});
		node.setAttribute("data-reveal-phase", "waiting");
		observer.observe(node);
		return () => {
			observer.disconnect();
			node.removeAttribute("data-reveal-phase");
		};
	}, []);
	return {
		ref,
		revealed
	};
}
//#endregion
export { useReveal as t };
