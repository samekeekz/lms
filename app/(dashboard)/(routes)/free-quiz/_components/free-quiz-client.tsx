"use client";

import { useState } from "react";
import { FreeQuiz, FreeQuizQuestion, FreeQuizOption, FreeQuizAttempt } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Award, ArrowRight, Play, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { QuizTaking } from "./quiz-taking";
import { QuizResults } from "./quiz-results";

type QuizWithQuestions = FreeQuiz & {
  questions: (FreeQuizQuestion & {
    options: FreeQuizOption[];
  })[];
};

interface FreeQuizClientProps {
  quiz: QuizWithQuestions | null;
  userId: string;
  userAttempts: FreeQuizAttempt[];
  bestScore: number;
}

export function FreeQuizClient({
  quiz,
  userId,
  userAttempts,
  bestScore,
}: FreeQuizClientProps) {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    passed: boolean;
    answers: Record<string, string[]>;
  } | null>(null);

  const hasAttempted = userAttempts.length > 0;
  const hasPassed = bestScore >= (quiz?.passingScore || 70);
  const totalQuestions = quiz?.questions?.length || 0;

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    setQuizResult(null);
  };

  const handleQuizComplete = (result: { score: number; passed: boolean; answers: Record<string, string[]> }) => {
    setQuizResult(result);
    setIsQuizStarted(false);
  };

  const handleRetry = () => {
    setQuizResult(null);
    setIsQuizStarted(true);
  };

  if (quizResult && quiz) {
    return (
      <QuizResults
        quiz={quiz}
        result={quizResult}
        onRetry={handleRetry}
      />
    );
  }

  if (isQuizStarted && quiz) {
    return (
      <QuizTaking
        quiz={quiz}
        userId={userId}
        onComplete={handleQuizComplete}
        onCancel={() => setIsQuizStarted(false)}
      />
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Бесплатный пробный тест NUET</h1>
        <p className="text-muted-foreground">
          Проверь свои знания и оцени формат подготовки к NUET
        </p>
      </div>

      {quiz ? (
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                {quiz.description && (
                  <p className="text-muted-foreground mb-4">{quiz.description}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{totalQuestions} вопросов</span>
                  </div>
                  {quiz.timeLimit && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{quiz.timeLimit} минут</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Проходной балл: {quiz.passingScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {hasAttempted && (
            <div className={`border rounded-xl p-6 ${hasPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                {hasPassed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Clock className="w-6 h-6 text-amber-600" />
                )}
                <h3 className="font-semibold">
                  {hasPassed ? 'Тест пройден!' : 'Попробуй еще раз'}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Лучший результат</p>
                  <p className="text-2xl font-bold">{Math.round(bestScore)}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Попыток</p>
                  <p className="text-2xl font-bold">{userAttempts.length}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1" onClick={handleStartQuiz}>
              <Play className="w-4 h-4 mr-2" />
              {hasAttempted ? 'Пройти тест снова' : 'Начать тест'}
            </Button>
            <Link href="/search" className="flex-1">
              <Button size="lg" variant="outline" className="w-full">
                Посмотреть все курсы
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="bg-muted/30 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Что включено в бесплатный доступ:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Пробный тест в формате NUET</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Подробный разбор ответов после прохождения</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Рекомендации по темам для подготовки</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Неограниченное количество попыток</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-xl">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Бесплатный тест скоро будет доступен</h2>
          <p className="text-muted-foreground mb-6">
            Мы готовим для тебя пробный тест в формате NUET. Следи за обновлениями!
          </p>
          <Link href="/search">
            <Button>
              Посмотреть доступные курсы
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

