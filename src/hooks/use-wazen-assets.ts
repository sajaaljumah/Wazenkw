import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-wazen-auth";
import type { Asset, AssetValuation } from "@/lib/assets";
import {
  listAssetsFn,
  listAssetValuationsFn,
  saveAssetFn,
  deleteAssetFn,
} from "@/lib/crud.functions";

/** Assets are private to their owner; MongoDB verified server-side. */
export function useAssets() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["assets", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<Asset[]> => {
      const data = await listAssetsFn({
        data: {
          authToken: session?.access_token,
        },
      });
      return (data ?? []) as unknown as Asset[];
    },
  });
}

/** Recorded value history for every asset the signed-in user owns. */
export function useAssetValuations() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["asset-valuations", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<AssetValuation[]> => {
      const data = await listAssetValuationsFn({
        data: {
          authToken: session?.access_token,
        },
      });
      return (data ?? []) as unknown as AssetValuation[];
    },
  });
}

export type AssetInput = {
  kind: Asset["kind"];
  name: string;
  symbol: string | null;
  currency: string;
  purchase_date: string;
  quantity: number;
  unit_cost: number;
  current_unit_value: number;
  purity: string | null;
  property_type: string | null;
  monthly_rent: number;
  holding_purpose: string | null;
  notes: string | null;
};

function useInvalidateAssets() {
  const queryClient = useQueryClient();
  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["assets"] }),
      queryClient.invalidateQueries({ queryKey: ["asset-valuations"] }),
    ]);
  };
}

export function useSaveAsset() {
  const { session } = useSession();
  const invalidate = useInvalidateAssets();
  return useMutation({
    mutationFn: async ({ id, input }: { id?: string | undefined; input: AssetInput }) => {
      const result = await saveAssetFn({
        data: {
          authToken: session?.access_token,
          id,
          input,
        },
      });
      return result.id;
    },
    onSuccess: invalidate,
  });
}

export function useDeleteAsset() {
  const { session } = useSession();
  const invalidate = useInvalidateAssets();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteAssetFn({
        data: {
          authToken: session?.access_token,
          id,
        },
      });
    },
    onSuccess: invalidate,
  });
}
