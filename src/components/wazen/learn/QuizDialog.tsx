import { useEffect, useMemo, useState } from "react";
import { AiIcon, CheckIcon, ICON_STROKE, RetryIcon, SpinnerIcon } from "@/components/wazen/icons";
import { Feedback, LearnButton, LearnDialog, LearnProgressBar, useLearnCopy } from "./primitives";
import { useRecordActivity } from "@/hooks/use-wazen-learning";
import { useGenerateQuiz } from "@/hooks/use-wazen-ai";
import { useWazenLocale } from "@/components/wazen/WazenLocale";
import {
  DIFFICULTY_LABEL,
  buildQuiz,
  nextQuizDifficulty,
  weakTopics,
  type LearningProgress,
  type QuizQuestion,
} from "@/lib/learning";

/**
 * Personalised quiz: powered by OpenRouter AI when available, targeting the
 * topics the child scored lowest in, with seamless fallback to static question bank.
 */
export function QuizDialog({
  open,
  onClose,
  progress,
  age,
}: {
  open: boolean;
  onClose: () => void;
  progress: LearningProgress[];
  age: number | null;
}) {
  const { lc, s } = useLearnCopy();
  const { isArabic } = useWazenLocale();
  const isAr = isArabic;
  const record = useRecordActivity();
  const aiQuizMutation = useGenerateQuiz();

  const difficulty = useMemo(() => nextQuizDifficulty(progress), [progress]);
  const staticQuestions = useMemo(
    () => buildQuiz({ difficulty, weak: weakTopics(progress), age }),
    [difficulty, progress, age],
  );

  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Trigger AI quiz generation on open for child/teen
  useEffect(() => {
    if (!open) {
      setAiQuestions(null);
      setIndex(0);
      setPicked(null);
      setScore(0);
      setFinished(false);
      return;
    }

    const topic = weakTopics(progress)[0] ?? "saving";
    const lifeStage = age && age >= 13 ? "teenager" : "child";

    aiQuizMutation.mutate(
      {
        topic,
        lifeStage,
        language: isAr ? "ar" : "en",
        questionCount: 3,
      },
      {
        onSuccess: (res) => {
          if (res?.questions && res.questions.length > 0) {
            const mapped: QuizQuestion[] = res.questions.map((q, qIndex) => ({
              id: `ai-${qIndex}`,
              topic: (res.topic || topic) as QuizQuestion["topic"],
              difficulty,
              prompt: { ar: q.question, en: q.question },
              options: q.options.map((opt) => ({ ar: opt, en: opt })),
              answer: q.answerIndex,
              explanation: { ar: q.explanation, en: q.explanation },
            }));
            setAiQuestions(mapped);
          }
        },
        onError: () => {
          // Automatic safe fallback to static question bank
          setAiQuestions(null);
        },
      },
    );
  }, [open]);

  const questions = aiQuestions && aiQuestions.length > 0 ? aiQuestions : staticQuestions;
  const isAiQuiz = Boolean(aiQuestions && aiQuestions.length > 0);
  const question = questions[index];

  const answer = (option: number) => {
    if (picked !== null || !question) return;
    setPicked(option);
    if (option === question.answer) setScore((value) => value + 1);
  };

  const advance = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setPicked(null);
      return;
    }
    setFinished(true);
    record.mutate({
      activity_type: "quiz",
      activity_key: isAiQuiz ? `ai-quiz-${difficulty}` : `quiz-${difficulty}`,
      topic: question?.topic ?? "saving",
      score,
      max_score: questions.length,
      completed: score >= Math.ceil(questions.length * 0.6),
      difficulty,
      xp: score * 10,
    });
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const close = () => {
    restart();
    onClose();
  };

  if (!open) return null;

  return (
    <LearnDialog
      open={open}
      onClose={close}
      title={lc("quiz")}
      description={`${lc("quizIntro")} · ${lc("difficulty")}: ${s(DIFFICULTY_LABEL[difficulty])}${isAiQuiz ? " · ✨ الذكاء الاصطناعي" : ""}`}
    >
      {aiQuizMutation.isPending && !aiQuestions ? (
        <div className="flex flex-col items-center justify-center space-y-3 py-10 text-center">
          <SpinnerIcon className="size-6 animate-spin text-gold" />
          <p className="text-sm text-muted-foreground">
            {isAr
              ? "وازِن يجهز اختباراً مخصصاً لك بالذكاء الاصطناعي..."
              : "Wazen AI is crafting your personalized quiz..."}
          </p>
        </div>
      ) : finished || !question ? (
        <div className="space-y-5 text-center">
          <p className="text-sm text-muted-foreground">{lc("yourResult")}</p>
          <p className="text-4xl tabular-nums">
            {score}/{questions.length}
          </p>
          <p className="text-sm">
            {score >= questions.length / 2 ? lc("winBody") : lc("tryAgainBody")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LearnButton onClick={restart}>
              <RetryIcon className="size-4" strokeWidth={ICON_STROKE} />
              {lc("playAgain")}
            </LearnButton>
            <LearnButton variant="soft" onClick={close}>
              {lc("done")}
            </LearnButton>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-2">
            <LearnProgressBar
              percent={((index + (picked === null ? 0 : 1)) / questions.length) * 100}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {lc("question")} {index + 1} {lc("stepOf")} {questions.length}
              </span>
              <span className="tabular-nums">
                {lc("score")}: {score}
              </span>
            </div>
          </div>

          <p className="text-base sm:text-lg">{s(question.prompt)}</p>

          <ul className="space-y-3">
            {question.options.map((option, optionIndex) => {
              const isAnswer = optionIndex === question.answer;
              const chosen = picked === optionIndex;
              return (
                <li key={optionIndex}>
                  <button
                    type="button"
                    onClick={() => answer(optionIndex)}
                    disabled={picked !== null}
                    className={[
                      "kid-press w-full rounded-2xl border px-4 py-3 text-start text-sm transition-colors",
                      picked === null
                        ? "border-kid-soft bg-kid-tint hover:bg-kid-soft/60"
                        : isAnswer
                          ? "border-kid-mid bg-kid-soft/70"
                          : chosen
                            ? "border-border bg-secondary/60"
                            : "border-border bg-card opacity-70",
                    ].join(" ")}
                  >
                    {s(option)}
                  </button>
                </li>
              );
            })}
          </ul>

          {picked !== null ? (
            <>
              <Feedback
                state={picked === question.answer ? "correct" : "wrong"}
                message={`${picked === question.answer ? lc("correct") : lc("wrong")} — ${s(question.explain)}`}
              />
              <LearnButton onClick={advance}>
                {index + 1 < questions.length ? lc("next") : lc("finish")}
                <CheckIcon className="size-4" strokeWidth={ICON_STROKE} />
              </LearnButton>
            </>
          ) : null}
        </div>
      )}
    </LearnDialog>
  );
}
