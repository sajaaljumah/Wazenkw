/**
 * Server-side authentication and authorization verification.
 * Validates Supabase JWT session tokens server-side.
 * Ensures that user IDs can never be forged or spoofed by client requests.
 */

/**
 * Extracts and verifies the authenticated user ID from a Bearer token or HTTP Authorization header.
 * Throws an Error if unauthenticated or token is invalid.
 */
export async function getAuthenticatedUserId(explicitToken?: string | null): Promise<string> {
  let token = explicitToken?.replace(/^Bearer\s+/i, "").trim();

  // Try HTTP Authorization header from TanStack Start server context
  if (!token) {
    try {
      const { getRequest } = await import("@tanstack/react-start/server");
      const req = getRequest();
      const authHeader = req?.headers?.get("authorization");
      if (authHeader) {
        token = authHeader.replace(/^Bearer\s+/i, "").trim();
      }
    } catch {
      // In non-HTTP context (e.g. server-side unit tests)
    }
  }

  if (!token) {
    throw new Error("UNAUTHORIZED: Missing session token.");
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("SERVER_CONFIG_ERROR: Supabase environment variables are missing.");
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user?.id) {
    throw new Error("UNAUTHORIZED: Invalid or expired session token.");
  }

  return data.user.id;
}

export const validateServerAuthToken = getAuthenticatedUserId;
