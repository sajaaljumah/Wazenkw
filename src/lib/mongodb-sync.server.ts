/**
 * MongoDB Data Sync / Migration Utility for Wazen.
 *
 * Safely and idempotently synchronizes application data from Supabase to MongoDB.
 * Never migrates authentication secrets, passwords, or tokens.
 * Running repeatedly does not create duplicate entries (uses upserts by ID).
 * Never logs sensitive user data.
 */
import { getMongoDb, CollectionName } from "@/lib/mongodb.server";
import { supabase } from "@/integrations/supabase/client";
import { parseFxSnapshot } from "@/lib/currency";

export type SyncResult = {
  success: boolean;
  imported: Record<string, number>;
  errors?: string[] | undefined;
};

/**
 * Idempotently syncs Wazen application tables into MongoDB.
 */
export async function syncSupabaseToMongo(dbName: string = "Wazen"): Promise<SyncResult> {
  const db = await getMongoDb(dbName);
  const imported: Record<string, number> = {};
  const errors: string[] = [];

  // 1. Sync Profiles
  try {
    const { data: profiles, error } = await supabase.from("profiles").select("*");
    if (error) throw error;
    if (profiles && profiles.length > 0) {
      const col = db.collection("profiles");
      for (const p of profiles) {
        await col.updateOne(
          { _id: p.id },
          {
            $set: {
              _id: p.id,
              user_id: p.id,
              full_name: (p as { full_name?: string }).full_name || null,
              role: (p as { role?: string }).role || "member",
              currency: (p as { currency?: string }).currency || "KWD",
              created_at: p.created_at,
              updated_at: p.updated_at,
            },
          },
          { upsert: true },
        );
      }
      imported["profiles"] = profiles.length;
    } else {
      imported["profiles"] = 0;
    }
  } catch (err: unknown) {
    errors.push(`Profiles sync: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  // 2. Sync Transactions (preserving FX snapshots)
  try {
    const { data: transactions, error } = await supabase.from("transactions").select("*");
    if (error) throw error;
    if (transactions && transactions.length > 0) {
      const col = db.collection("transactions");
      for (const t of transactions) {
        const parsed = parseFxSnapshot(t.note);
        const raw = t as Record<string, unknown>;

        await col.updateOne(
          { _id: t.id },
          {
            $set: {
              _id: t.id,
              id: t.id,
              user_id: t.user_id,
              kind: t.kind,
              category: t.category,
              merchant: t.merchant,
              amount: Number(t.amount) || 0,
              currency: t.currency || "KWD",
              occurred_on: t.occurred_on,
              note: parsed.cleanNote,
              goal_id: t.goal_id,
              paid_by_parent: Boolean(t.paid_by_parent),
              deducted_from_child: Boolean(t.deducted_from_child),
              beneficiary_user_id: t.beneficiary_user_id,
              payment_method: t.payment_method,
              linked_transaction_id: t.linked_transaction_id,
              // Preserved FX snapshot
              original_amount:
                parsed.snapshot?.original_amount ??
                (raw["original_amount"] as number | null) ??
                null,
              original_currency:
                parsed.snapshot?.original_currency ??
                (raw["original_currency"] as string | null) ??
                null,
              converted_amount:
                parsed.snapshot?.converted_amount ??
                (raw["converted_amount"] as number | null) ??
                null,
              exchange_rate:
                parsed.snapshot?.exchange_rate ?? (raw["exchange_rate"] as number | null) ?? null,
              rate_date: parsed.snapshot?.rate_date ?? (raw["rate_date"] as string | null) ?? null,
              created_at: t.created_at,
            },
          },
          { upsert: true },
        );
      }
      imported["transactions"] = transactions.length;
    } else {
      imported["transactions"] = 0;
    }
  } catch (err: unknown) {
    errors.push(`Transactions sync: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  // 3. Sync Recurring Items
  try {
    const { data: items, error } = await supabase.from("recurring_items").select("*");
    if (error) throw error;
    if (items && items.length > 0) {
      const col = db.collection("recurring_items");
      for (const item of items) {
        const parsed = parseFxSnapshot(item.note);
        await col.updateOne(
          { _id: item.id },
          {
            $set: {
              _id: item.id,
              id: item.id,
              user_id: item.user_id,
              kind: item.kind,
              name: item.name,
              merchant: item.merchant,
              category: item.category,
              amount: Number(item.amount) || 0,
              currency: item.currency || "KWD",
              frequency: item.frequency,
              day_of_month: item.day_of_month,
              start_date: item.start_date,
              ends_on: item.ends_on,
              note: parsed.cleanNote,
              is_active: item.is_active,
              original_amount: parsed.snapshot?.original_amount ?? null,
              original_currency: parsed.snapshot?.original_currency ?? null,
              converted_amount: parsed.snapshot?.converted_amount ?? null,
              exchange_rate: parsed.snapshot?.exchange_rate ?? null,
              rate_date: parsed.snapshot?.rate_date ?? null,
              created_at: item.created_at,
              updated_at: item.updated_at,
            },
          },
          { upsert: true },
        );
      }
      imported["recurring_items"] = items.length;
    } else {
      imported["recurring_items"] = 0;
    }
  } catch (err: unknown) {
    errors.push(`Recurring items sync: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  // 4. Sync Budgets
  try {
    const { data: budgets, error } = await supabase.from("budgets").select("*");
    if (error) throw error;
    if (budgets && budgets.length > 0) {
      const col = db.collection("budgets");
      for (const b of budgets) {
        await col.updateOne(
          { _id: b.id },
          {
            $set: {
              _id: b.id,
              id: b.id,
              user_id: b.user_id,
              period_month: b.period_month,
              amount: Number(b.amount) || 0,
              currency: b.currency || "KWD",
              created_at: b.created_at,
              updated_at: b.updated_at,
            },
          },
          { upsert: true },
        );
      }
      imported["budgets"] = budgets.length;
    } else {
      imported["budgets"] = 0;
    }
  } catch (err: unknown) {
    errors.push(`Budgets sync: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  // 5. Sync Savings Goals
  try {
    const { data: goals, error } = await supabase.from("goals").select("*");
    if (error) throw error;
    if (goals && goals.length > 0) {
      const col = db.collection("savings_goals");
      for (const g of goals) {
        await col.updateOne(
          { _id: g.id },
          {
            $set: {
              _id: g.id,
              id: g.id,
              user_id: g.user_id,
              name: g.name,
              kind: g.kind || "goal",
              target_amount: Number(g.target_amount) || 0,
              target_date: g.target_date,
              currency: g.currency || "KWD",
              created_at: g.created_at,
              updated_at: g.updated_at,
            },
          },
          { upsert: true },
        );
      }
      imported["savings_goals"] = goals.length;
    } else {
      imported["savings_goals"] = 0;
    }
  } catch (err: unknown) {
    errors.push(`Goals sync: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  // 6. Sync Assets
  try {
    const { data: assets, error } = await supabase.from("assets").select("*");
    if (error) throw error;
    if (assets && assets.length > 0) {
      const col = db.collection("assets");
      for (const a of assets) {
        await col.updateOne(
          { _id: a.id },
          {
            $set: {
              _id: a.id,
              id: a.id,
              user_id: a.user_id,
              kind: a.kind,
              name: a.name,
              symbol: a.symbol,
              quantity: Number(a.quantity) || 0,
              unit_cost: Number(a.unit_cost) || 0,
              current_unit_value: Number(a.current_unit_value) || 0,
              currency: a.currency || "KWD",
              purity: a.purity,
              property_type: a.property_type,
              monthly_rent: Number(a.monthly_rent) || 0,
              purchase_date: a.purchase_date,
              notes: a.notes,
              created_at: a.created_at,
              updated_at: a.updated_at,
            },
          },
          { upsert: true },
        );
      }
      imported["assets"] = assets.length;
    } else {
      imported["assets"] = 0;
    }
  } catch (err: unknown) {
    errors.push(`Assets sync: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  return {
    success: errors.length === 0,
    imported,
    errors: errors.length > 0 ? errors : undefined,
  };
}
