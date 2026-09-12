//#region node_modules/.nitro/vite/services/ssr/assets/server-auth-Fk0MqaBh.js
/**
* Server-side authentication and authorization verification.
* Validates Supabase JWT session tokens server-side.
* Ensures that user IDs can never be forged or spoofed by client requests.
*/
/**
* Extracts and verifies the authenticated user ID from a Bearer token or HTTP Authorization header.
* Throws an Error if unauthenticated or token is invalid.
*/
async function getAuthenticatedUserId(explicitToken) {
	let token = explicitToken?.replace(/^Bearer\s+/i, "").trim();
	if (!token) try {
		const { getRequest } = await import("./server-DuGX_xsT.mjs").then((n) => n.i).then((n) => n.t);
		const authHeader = getRequest()?.headers?.get("authorization");
		if (authHeader) token = authHeader.replace(/^Bearer\s+/i, "").trim();
	} catch {}
	if (!token) throw new Error("UNAUTHORIZED: Missing session token.");
	const SUPABASE_URL = process.env.SUPABASE_URL;
	const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) throw new Error("SERVER_CONFIG_ERROR: Supabase environment variables are missing.");
	const { createClient } = await import("../_libs/supabase__supabase-js.mjs").then((n) => n.n);
	const { data, error } = await createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } }).auth.getUser(token);
	if (error || !data?.user?.id) throw new Error("UNAUTHORIZED: Invalid or expired session token.");
	return data.user.id;
}
//#endregion
export { getAuthenticatedUserId };
