import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-wazen-auth";
import type {
  ActivityType,
  Difficulty,
  LearningChallenge,
  LearningProfile,
  LearningProgress,
} from "@/lib/learning";
import {
  getLearningProfileFn,
  listLearningProgressFn,
  listLearningChallengesFn,
  recordLearningActivityFn,
  startLearningChallengeFn,
  checkInLearningChallengeFn,
} from "@/lib/crud.functions";

export function useLearningProfile() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["learning-profile", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<LearningProfile | null> => {
      const data = await getLearningProfileFn({
        data: {
          authToken: session?.access_token,
        },
      });
      return (data ?? null) as LearningProfile | null;
    },
  });
}

export function useLearningProgress() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["learning-progress", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<LearningProgress[]> => {
      const data = await listLearningProgressFn({
        data: {
          authToken: session?.access_token,
        },
      });
      return (data ?? []) as unknown as LearningProgress[];
    },
  });
}

export function useLearningChallenges() {
  const { session, user, loading } = useSession();
  return useQuery({
    queryKey: ["learning-challenges", user?.id],
    enabled: !loading && !!user,
    queryFn: async (): Promise<LearningChallenge[]> => {
      const data = await listLearningChallengesFn({
        data: {
          authToken: session?.access_token,
        },
      });
      return (data ?? []) as unknown as LearningChallenge[];
    },
  });
}

function useInvalidateLearning() {
  const queryClient = useQueryClient();
  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["learning-profile"] }),
      queryClient.invalidateQueries({ queryKey: ["learning-progress"] }),
      queryClient.invalidateQueries({ queryKey: ["learning-challenges"] }),
    ]);
  };
}

export type ActivityResult = {
  activity_type: ActivityType;
  activity_key: string;
  topic: string;
  score: number;
  max_score: number;
  completed: boolean;
  difficulty?: Difficulty | undefined;
  xp: number;
};

/** Records a lesson, game or quiz result and keeps the best score. */
export function useRecordActivity() {
  const { session } = useSession();
  const invalidate = useInvalidateLearning();
  return useMutation({
    mutationFn: async (result: ActivityResult) => {
      await recordLearningActivityFn({
        data: {
          authToken: session?.access_token,
          result,
        },
      });
    },
    onSuccess: invalidate,
  });
}

export function useStartChallenge() {
  const { session } = useSession();
  const invalidate = useInvalidateLearning();
  return useMutation({
    mutationFn: async ({ key, targetDays }: { key: string; targetDays: number }) => {
      await startLearningChallengeFn({
        data: {
          authToken: session?.access_token,
          key,
          targetDays,
        },
      });
    },
    onSuccess: invalidate,
  });
}

/** One check-in per day; finishing the target completes the challenge. */
export function useCheckInChallenge() {
  const { session } = useSession();
  const invalidate = useInvalidateLearning();
  return useMutation({
    mutationFn: async (challenge: LearningChallenge) => {
      await checkInLearningChallengeFn({
        data: {
          authToken: session?.access_token,
          challengeId: challenge.id,
        },
      });
    },
    onSuccess: invalidate,
  });
}
