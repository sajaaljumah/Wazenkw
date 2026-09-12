/**
 * Wazen MongoDB Server Functions (RPC Gateway).
 *
 * Bridge between client UI and MongoDB backend service.
 * Runs exclusively on the server.
 * Never exposes the MongoDB URI or credentials to the client bundle.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Checks whether MongoDB is configured on the server without returning credentials.
 */
export const checkMongoConfiguredFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ configured: boolean }> => {
    const { isMongoConfigured } = await import("@/lib/mongodb.server");
    return { configured: isMongoConfigured() };
  },
);

/**
 * Pings the MongoDB database server-side.
 */
export const pingMongoDbFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ success: boolean; database?: string; error?: string }> => {
    const { isMongoConfigured, pingDatabase } = await import("@/lib/mongodb.server");
    if (!isMongoConfigured()) {
      return { success: false, error: "MongoDB is not configured on the server." };
    }
    return pingDatabase();
  },
);

/**
 * Triggers safe and idempotent data sync from Supabase to MongoDB.
 */
export const syncDataToMongoFn = createServerFn({ method: "POST" }).handler(
  async (): Promise<{
    success: boolean;
    imported?: Record<string, number>;
    error?: string;
  }> => {
    const { isMongoConfigured } = await import("@/lib/mongodb.server");
    if (!isMongoConfigured()) {
      return { success: false, error: "MongoDB is not configured on the server." };
    }
    const { syncSupabaseToMongo } = await import("@/lib/mongodb-sync.server");
    const res = await syncSupabaseToMongo();
    return {
      success: res.success,
      imported: res.imported,
      error: res.errors ? res.errors.join("; ") : undefined,
    };
  },
);

/**
 * Ensures required indexes across MongoDB collections.
 */
export const ensureMongoIndexesFn = createServerFn({ method: "POST" }).handler(
  async (): Promise<{
    success: boolean;
    created?: Record<string, string[]>;
    error?: string;
  }> => {
    const { isMongoConfigured, ensureIndexes } = await import("@/lib/mongodb.server");
    if (!isMongoConfigured()) {
      return { success: false, error: "MongoDB is not configured on the server." };
    }
    try {
      const created = await ensureIndexes();
      return { success: true, created };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to ensure indexes.",
      };
    }
  },
);
