import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-wazen-auth";
import type { RecurringFrequency, RecurringItem, RecurringKind } from "@/lib/finance";
import {
  listRecurringItemsFn,
  saveRecurringItemFn,
  toggleRecurringItemFn,
  deleteRecurringItemFn,
} from "@/lib/crud.functions";

/** Every recurring commitment, paused ones included, served from MongoDB Atlas. */
export function useAllRecurringItems() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["recurring-all", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<RecurringItem[]> => {
      const res = await listRecurringItemsFn({
        data: {
          activeOnly: false,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to load recurring items from MongoDB.");
      return (res.data ?? []) as unknown as RecurringItem[];
    },
  });
}

export type RecurringInput = {
  id?: string | undefined;
  kind: RecurringKind;
  name: string;
  merchant: string | null;
  category: string;
  amount: number;
  currency: string;
  frequency: RecurringFrequency;
  day_of_month: number;
  start_date: string;
  ends_on: string | null;
  note: string | null;
  active: boolean;
};

function useInvalidateRecurring() {
  const queryClient = useQueryClient();
  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurring-all"] }),
      queryClient.invalidateQueries({ queryKey: ["recurring"] }),
    ]);
  };
}

export function useSaveRecurringItem() {
  const { session, user } = useSession();
  const invalidate = useInvalidateRecurring();
  return useMutation({
    mutationFn: async (input: RecurringInput) => {
      const res = await saveRecurringItemFn({
        data: {
          id: input.id,
          kind: input.kind,
          name: input.name,
          merchant: input.merchant,
          category: input.category,
          amount: input.amount,
          currency: input.currency,
          frequency: input.frequency,
          day_of_month: input.day_of_month,
          start_date: input.start_date,
          ends_on: input.ends_on,
          note: input.note,
          active: input.active,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to save recurring item to MongoDB.");
      return res.data;
    },
    onSuccess: invalidate,
  });
}

export function useToggleRecurringItem() {
  const { session, user } = useSession();
  const invalidate = useInvalidateRecurring();
  return useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const res = await toggleRecurringItemFn({
        data: {
          id,
          active,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to toggle recurring item in MongoDB.");
    },
    onSuccess: invalidate,
  });
}

export function useDeleteRecurringItem() {
  const { session, user } = useSession();
  const invalidate = useInvalidateRecurring();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteRecurringItemFn({
        data: {
          id,
          authToken: session?.access_token,
          userId: user?.id,
        },
      });
      if (!res.success) throw new Error("Failed to delete recurring item from MongoDB.");
    },
    onSuccess: invalidate,
  });
}
