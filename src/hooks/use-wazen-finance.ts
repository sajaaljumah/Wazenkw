import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-wazen-auth";
import { firstOfMonth } from "@/lib/finance";
import type { Budget, Goal, RecurringItem, Transaction } from "@/lib/finance";
import type { Profile } from "@/lib/wazen";
import { enrichTransactionWithFx, attachFxSnapshot } from "@/lib/currency";
import { convertCurrencyFn } from "@/lib/currency.functions";
import {
  listTransactionsFn,
  createTransactionFn,
  updateTransactionFn,
  deleteTransactionFn,
  refundTransactionFn,
  listGoalsFn,
  createGoalFn,
  updateGoalFn,
  deleteGoalFn,
  getMonthlyBudgetFn,
  upsertMonthlyBudgetFn,
  listRecurringItemsFn,
  listParentPaidForMeFn,
  addParentPaidExpenseFn,
  getFamilySummaryFn,
} from "@/lib/crud.functions";

/** All queries are scoped to the signed-in user and served from MongoDB Atlas. */
export function useTransactions() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["transactions", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<Transaction[]> => {
      const res = await listTransactionsFn({
        data: { authToken: session?.access_token, userId: user?.id },
      });
      if (!res.success) throw new Error("Failed to load transactions from MongoDB.");
      return (res.data ?? []).map((row) => enrichTransactionWithFx(row as unknown as Transaction));
    },
  });
}

export function useGoals() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["goals", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<Goal[]> => {
      const res = await listGoalsFn({
        data: { authToken: session?.access_token, userId: user?.id },
      });
      if (!res.success) throw new Error("Failed to load goals from MongoDB.");
      return (res.data ?? []) as unknown as Goal[];
    },
  });
}

export function useMonthlyBudget() {
  const { session, user, loading } = useSession();
  const period = firstOfMonth();
  return useQuery({
    queryKey: ["budget", user?.id, period],
    enabled: !loading && !!user,
    queryFn: async (): Promise<Budget | null> => {
      const res = await getMonthlyBudgetFn({
        data: { periodMonth: period, authToken: session?.access_token, userId: user?.id },
      });
      if (!res.success) throw new Error("Failed to load monthly budget from MongoDB.");
      return (res.data ?? null) as unknown as Budget | null;
    },
  });
}

export function useRecurringItems() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["recurring", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<RecurringItem[]> => {
      const res = await listRecurringItemsFn({
        data: { activeOnly: true, authToken: session?.access_token, userId: user?.id },
      });
      if (!res.success) throw new Error("Failed to load recurring items from MongoDB.");
      return (res.data ?? []).map((row) =>
        enrichTransactionWithFx(row as unknown as RecurringItem),
      );
    },
  });
}

export type FamilyMemberSummary = {
  profile: Profile;
  canFund: boolean;
  canMonitor: boolean;
  transactions: Transaction[];
  goals: Goal[];
};

/**
 * Parents only: linked children/teenagers they are permitted to see.
 * Reads rely entirely on the family permissions stored in MongoDB.
 */
export function useFamilySummary(enabled: boolean) {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["family-summary", user?.id],
    enabled: enabled && !loading && !!user,
    queryFn: async (): Promise<FamilyMemberSummary[]> => {
      const res = await getFamilySummaryFn({
        data: { authToken: session?.access_token, userId: user?.id },
      });
      if (!res.success) throw new Error("Failed to load family summary from MongoDB.");
      return (res.data ?? []).map((member) => ({
        profile: member.profile as unknown as Profile,
        canFund: member.canFund,
        canMonitor: member.canMonitor,
        transactions: (member.transactions ?? []).map((t) =>
          enrichTransactionWithFx(t as unknown as Transaction),
        ),
        goals: (member.goals ?? []) as unknown as Goal[],
      }));
    },
  });
}

/**
 * Spending a parent recorded for the signed-in child/teenager.
 */
export function useParentPaidForMe() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["parent-paid", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<Transaction[]> => {
      const res = await listParentPaidForMeFn({
        data: { authToken: session?.access_token, userId: user?.id },
      });
      if (!res.success) throw new Error("Failed to load parent paid records from MongoDB.");
      return (res.data ?? []).map((row) => enrichTransactionWithFx(row as unknown as Transaction));
    },
  });
}

export type ParentPaidExpenseInput = {
  childUserId: string;
  amount: number;
  category: string;
  merchant: string | null;
  occurredOn: string;
  paymentMethod: string | null;
  currency: string;
  deductFromChild: boolean;
};

/**
 * Records an expense a parent paid for a linked child or teenager into MongoDB.
 */
export function useAddParentPaidExpense() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ParentPaidExpenseInput) => {
      let finalAmount = input.amount;
      let parentNote: string | null = null;
      let snapshotData: Record<string, unknown> = {};

      if (input.currency !== "KWD") {
        const fxRes = await convertCurrencyFn({
          data: {
            amount: input.amount,
            from: input.currency,
            to: "KWD",
            date: input.occurredOn,
          },
        });
        if (fxRes.success) {
          finalAmount = fxRes.converted_amount;
          const snapshot = {
            original_amount: fxRes.original_amount,
            original_currency: fxRes.original_currency,
            converted_amount: fxRes.converted_amount,
            exchange_rate: fxRes.exchange_rate,
            rate_date: fxRes.rate_date,
          };
          parentNote = attachFxSnapshot(parentNote, snapshot);
          snapshotData = snapshot;
        }
      }

      await addParentPaidExpenseFn({
        data: {
          childUserId: input.childUserId,
          amount: finalAmount,
          category: input.category,
          merchant: input.merchant,
          occurredOn: input.occurredOn,
          paymentMethod: input.paymentMethod,
          currency: input.currency,
          deductFromChild: input.deductFromChild,
          note: parentNote,
          originalAmount: (snapshotData["original_amount"] as number) ?? null,
          originalCurrency: (snapshotData["original_currency"] as string) ?? null,
          convertedAmount: (snapshotData["converted_amount"] as number) ?? null,
          exchangeRate: (snapshotData["exchange_rate"] as number) ?? null,
          rateDate: (snapshotData["rate_date"] as string) ?? null,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
        queryClient.invalidateQueries({ queryKey: ["parent-paid"] }),
      ]);
    },
  });
}

/**
 * Mutation hooks for standard Transaction CRUD in MongoDB.
 */
export function useCreateTransaction() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Parameters<typeof createTransactionFn>[0]["data"]) => {
      const res = await createTransactionFn({
        data: {
          ...input,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to create transaction in MongoDB.");
      return res.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
        queryClient.invalidateQueries({ queryKey: ["budget"] }),
      ]);
    },
  });
}

export function useUpdateTransaction() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, unknown> }) => {
      const res = await updateTransactionFn({
        data: {
          id,
          updates,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to update transaction in MongoDB.");
      return res.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
      ]);
    },
  });
}

export function useDeleteTransaction() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteTransactionFn({
        data: {
          id,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to delete transaction from MongoDB.");
      return res.success;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
      ]);
    },
  });
}

export function useRefundTransaction() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => {
      const res = await refundTransactionFn({
        data: {
          id,
          reason,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to refund transaction in MongoDB.");
      return res.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
      ]);
    },
  });
}

/**
 * Mutation hooks for Goals & Budgets in MongoDB.
 */
export function useCreateGoal() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Parameters<typeof createGoalFn>[0]["data"]) => {
      const res = await createGoalFn({
        data: {
          ...input,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to create goal in MongoDB.");
      return res.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goals"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
      ]);
    },
  });
}

export function useUpdateGoal() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, unknown> }) => {
      const res = await updateGoalFn({
        data: {
          id,
          updates,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to update goal in MongoDB.");
      return res.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goals"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
      ]);
    },
  });
}

export function useDeleteGoal() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteGoalFn({
        data: {
          id,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to delete goal from MongoDB.");
      return res.success;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goals"] }),
        queryClient.invalidateQueries({ queryKey: ["family-summary"] }),
      ]);
    },
  });
}

export function useUpsertMonthlyBudget() {
  const { session, user } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      periodMonth,
      amount,
      currency,
    }: {
      periodMonth: string;
      amount: number;
      currency?: string;
    }) => {
      const res = await upsertMonthlyBudgetFn({
        data: {
          periodMonth,
          amount,
          currency: currency || "KWD",
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to update monthly budget in MongoDB.");
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });
}
