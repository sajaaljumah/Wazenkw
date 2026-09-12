/**
 * Wazen TanStack Start Server Functions for MongoDB CRUD.
 *
 * Runs strictly server-side.
 * Serves as the RPC bridge between client React hooks and MongoDB collections.
 * Enforces server-side authentication and user ownership.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type {
  TransactionDoc,
  RecurringItemDoc,
  BudgetDoc,
  SavingsGoalDoc,
  AssetDoc,
  LearningProgressDoc,
  ChallengeProgressDoc,
} from "@/lib/mongodb.server";

async function resolveUser(data: {
  authToken?: string | null | undefined;
  userId?: string | undefined;
}): Promise<string> {
  const { getAuthenticatedUserId } = await import("@/lib/server-auth");
  if (data.authToken) {
    return getAuthenticatedUserId(data.authToken);
  }
  try {
    return await getAuthenticatedUserId();
  } catch (err) {
    if (data.userId && process.env.NODE_ENV === "test") {
      return data.userId;
    }
    throw err;
  }
}

/* ================================================================== 1. TRANSACTIONS */

export const listTransactionsFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: TransactionDoc[] }> => {
    const userId = await resolveUser(data);
    const { listTransactions } = await import("@/lib/crud.server");
    const res = await listTransactions(userId);
    return { success: true, data: res };
  });

export const createTransactionFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        kind: z.enum(["income", "expense", "saving", "refund"]),
        category: z.string().min(1),
        merchant: z.string().nullable().optional(),
        amount: z.number(),
        currency: z.string().default("KWD"),
        occurred_on: z.string(),
        note: z.string().nullable().optional(),
        payment_method: z.string().nullable().optional(),
        goal_id: z.string().nullable().optional(),
        paid_by_parent: z.boolean().optional(),
        deducted_from_child: z.boolean().optional(),
        beneficiary_user_id: z.string().nullable().optional(),
        linked_transaction_id: z.string().nullable().optional(),
        original_amount: z.number().nullable().optional(),
        original_currency: z.string().nullable().optional(),
        converted_amount: z.number().nullable().optional(),
        exchange_rate: z.number().nullable().optional(),
        rate_date: z.string().nullable().optional(),
        id: z.string().optional(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: TransactionDoc }> => {
    const userId = await resolveUser(data);
    const { createTransaction } = await import("@/lib/crud.server");
    const res = await createTransaction(userId, data);
    return { success: true, data: res };
  });

export const updateTransactionFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        updates: z.record(z.unknown()),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: TransactionDoc | null }> => {
    const userId = await resolveUser(data);
    const { updateTransaction } = await import("@/lib/crud.server");
    const res = await updateTransaction(userId, data.id, data.updates as Partial<TransactionDoc>);
    return { success: true, data: res };
  });

export const deleteTransactionFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const userId = await resolveUser(data);
    const { deleteTransaction } = await import("@/lib/crud.server");
    const res = await deleteTransaction(userId, data.id);
    return { success: res };
  });

export const refundTransactionFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        reason: z.string().optional(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: TransactionDoc }> => {
    const userId = await resolveUser(data);
    const { refundTransaction } = await import("@/lib/crud.server");
    const res = await refundTransaction(userId, data.id, data.reason);
    return { success: true, data: res };
  });

export const listParentPaidForMeFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: TransactionDoc[] }> => {
    const userId = await resolveUser(data);
    const { listParentPaidForMe } = await import("@/lib/crud.server");
    const res = await listParentPaidForMe(userId);
    return { success: true, data: res };
  });

export const addParentPaidExpenseFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        childUserId: z.string(),
        amount: z.number(),
        category: z.string(),
        merchant: z.string().nullable(),
        occurredOn: z.string(),
        paymentMethod: z.string().nullable(),
        currency: z.string(),
        deductFromChild: z.boolean(),
        note: z.string().nullable().optional(),
        originalAmount: z.number().nullable().optional(),
        originalCurrency: z.string().nullable().optional(),
        convertedAmount: z.number().nullable().optional(),
        exchangeRate: z.number().nullable().optional(),
        rateDate: z.string().nullable().optional(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      success: boolean;
      data: { parentTx: TransactionDoc; childTx?: TransactionDoc | undefined };
    }> => {
      const userId = await resolveUser(data);
      const { addParentPaidExpense } = await import("@/lib/crud.server");
      const res = await addParentPaidExpense(userId, data);
      return { success: true, data: res };
    },
  );

/* ================================================================== 2. RECURRING ITEMS */

export const listRecurringItemsFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        activeOnly: z.boolean().optional(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: RecurringItemDoc[] }> => {
    const userId = await resolveUser(data);
    const { listRecurringItems } = await import("@/lib/crud.server");
    const res = await listRecurringItems(userId, data.activeOnly);
    return { success: true, data: res };
  });

export const saveRecurringItemFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string().optional(),
        kind: z.enum(["income", "expense", "saving"]),
        name: z.string().min(1),
        merchant: z.string().nullable().optional(),
        category: z.string(),
        amount: z.number(),
        currency: z.string().default("KWD"),
        frequency: z.enum(["weekly", "monthly", "yearly"]),
        day_of_month: z.number(),
        start_date: z.string(),
        ends_on: z.string().nullable().optional(),
        note: z.string().nullable().optional(),
        active: z.boolean().default(true),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: RecurringItemDoc }> => {
    const userId = await resolveUser(data);
    const { saveRecurringItem } = await import("@/lib/crud.server");
    const res = await saveRecurringItem(userId, data);
    return { success: true, data: res };
  });

export const toggleRecurringItemFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        active: z.boolean(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const userId = await resolveUser(data);
    const { toggleRecurringItem } = await import("@/lib/crud.server");
    const res = await toggleRecurringItem(userId, data.id, data.active);
    return { success: res };
  });

export const deleteRecurringItemFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const userId = await resolveUser(data);
    const { deleteRecurringItem } = await import("@/lib/crud.server");
    const res = await deleteRecurringItem(userId, data.id);
    return { success: res };
  });

/* ================================================================== 3. BUDGETS & GOALS */

export const getMonthlyBudgetFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        periodMonth: z.string(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: BudgetDoc | null }> => {
    const userId = await resolveUser(data);
    const { getMonthlyBudget } = await import("@/lib/crud.server");
    const res = await getMonthlyBudget(userId, data.periodMonth);
    return { success: true, data: res };
  });

export const upsertMonthlyBudgetFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        periodMonth: z.string(),
        amount: z.number(),
        currency: z.string().default("KWD"),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: BudgetDoc }> => {
    const userId = await resolveUser(data);
    const { upsertMonthlyBudget } = await import("@/lib/crud.server");
    const res = await upsertMonthlyBudget(userId, data.periodMonth, data.amount, data.currency);
    return { success: true, data: res };
  });

export const listGoalsFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: SavingsGoalDoc[] }> => {
    const userId = await resolveUser(data);
    const { listGoals } = await import("@/lib/crud.server");
    const res = await listGoals(userId);
    return { success: true, data: res };
  });

export const createGoalFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        name: z.string().min(1),
        kind: z.enum(["goal", "emergency_fund"]).default("goal"),
        target_amount: z.number(),
        target_date: z.string().nullable().optional(),
        currency: z.string().default("KWD"),
        id: z.string().optional(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: SavingsGoalDoc }> => {
    const userId = await resolveUser(data);
    const { createGoal } = await import("@/lib/crud.server");
    const res = await createGoal(userId, data);
    return { success: true, data: res };
  });

export const updateGoalFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        updates: z.record(z.unknown()),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: SavingsGoalDoc | null }> => {
    const userId = await resolveUser(data);
    const { updateGoal } = await import("@/lib/crud.server");
    const res = await updateGoal(userId, data.id, data.updates as Partial<SavingsGoalDoc>);
    return { success: true, data: res };
  });

export const deleteGoalFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const userId = await resolveUser(data);
    const { deleteGoal } = await import("@/lib/crud.server");
    const res = await deleteGoal(userId, data.id);
    return { success: res };
  });

/* ================================================================== 4. ASSETS */

export const listAssetsFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: AssetDoc[] }> => {
    const userId = await resolveUser(data);
    const { listAssets } = await import("@/lib/crud.server");
    const res = await listAssets(userId);
    return { success: true, data: res };
  });

export const listAssetValuationsFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      success: boolean;
      data: Array<{ id: string; asset_id: string; valued_on: string; unit_value: number }>;
    }> => {
      const userId = await resolveUser(data);
      const { listAssetValuations } = await import("@/lib/crud.server");
      const res = await listAssetValuations(userId);
      return { success: true, data: res };
    },
  );

export const saveAssetFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string().optional(),
        input: z.object({
          kind: z.enum(["stock", "gold", "silver", "real_estate"]),
          name: z.string(),
          symbol: z.string().nullable(),
          currency: z.string(),
          purchase_date: z.string(),
          quantity: z.number(),
          unit_cost: z.number(),
          current_unit_value: z.number(),
          purity: z.string().nullable(),
          property_type: z.string().nullable(),
          monthly_rent: z.number(),
          holding_purpose: z.string().nullable(),
          notes: z.string().nullable(),
        }),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; id: string }> => {
    const userId = await resolveUser(data);
    const { saveAsset } = await import("@/lib/crud.server");
    const res = await saveAsset(userId, data.input, data.id);
    return { success: true, id: res };
  });

export const deleteAssetFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const userId = await resolveUser(data);
    const { deleteAsset } = await import("@/lib/crud.server");
    const res = await deleteAsset(userId, data.id);
    return { success: res };
  });

/* ================================================================== 5. LEARNING */

export const getLearningProfileFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      success: boolean;
      data: {
        user_id: string;
        xp: number;
        current_streak: number;
        longest_streak: number;
        last_activity_on: string | null;
      };
    }> => {
      const userId = await resolveUser(data);
      const { getLearningProfile } = await import("@/lib/crud.server");
      const res = await getLearningProfile(userId);
      return { success: true, data: res };
    },
  );

export const listLearningProgressFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: LearningProgressDoc[] }> => {
    const userId = await resolveUser(data);
    const { listLearningProgress } = await import("@/lib/crud.server");
    const res = await listLearningProgress(userId);
    return { success: true, data: res };
  });

export const listLearningChallengesFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: ChallengeProgressDoc[] }> => {
    const userId = await resolveUser(data);
    const { listLearningChallenges } = await import("@/lib/crud.server");
    const res = await listLearningChallenges(userId);
    return { success: true, data: res };
  });

export const recordLearningActivityFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        activity_type: z.enum(["lesson", "game", "quiz"]),
        activity_key: z.string(),
        topic: z.string(),
        score: z.number(),
        max_score: z.number(),
        completed: z.boolean(),
        difficulty: z.string().optional(),
        xp: z.number(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: LearningProgressDoc }> => {
    const userId = await resolveUser(data);
    const { recordLearningActivity } = await import("@/lib/crud.server");
    const res = await recordLearningActivity(userId, data);
    return { success: true, data: res };
  });

export const startLearningChallengeFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        key: z.string(),
        targetDays: z.number(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: ChallengeProgressDoc }> => {
    const userId = await resolveUser(data);
    const { startLearningChallenge } = await import("@/lib/crud.server");
    const res = await startLearningChallenge(userId, data.key, data.targetDays);
    return { success: true, data: res };
  });

export const checkInLearningChallengeFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        challengeId: z.string(),
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      success: boolean;
      data: { completed: boolean; daysCompleted: number };
    }> => {
      const userId = await resolveUser(data);
      const { checkInLearningChallenge } = await import("@/lib/crud.server");
      const res = await checkInLearningChallenge(userId, data.challengeId);
      return {
        success: res.success,
        data: { completed: res.completed, daysCompleted: res.daysCompleted },
      };
    },
  );

/* ================================================================== 6. FAMILY DATA */

export const getFamilySummaryFn = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        authToken: z.string().nullable().optional(),
        userId: z.string().optional(),
      })
      .parse(data),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      success: boolean;
      data: Array<{
        profile: Record<string, unknown>;
        canFund: boolean;
        canMonitor: boolean;
        transactions: TransactionDoc[];
        goals: SavingsGoalDoc[];
      }>;
    }> => {
      const userId = await resolveUser(data);
      const { getFamilySummary } = await import("@/lib/crud.server");
      const res = await getFamilySummary(userId);
      return { success: true, data: res as never };
    },
  );
