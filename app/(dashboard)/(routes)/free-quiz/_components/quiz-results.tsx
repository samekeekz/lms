"use client";

import { FreeQuiz, FreeQuizQuestion, FreeQuizOption } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type QuizWithQuestions = FreeQuiz & {
  questions: (FreeQuizQuestion & {
    options: FreeQuizOption[];
  })[];
};

interface QuizResultsProps {
  quiz: QuizWithQuestions;
  result: {
    score: number;
    passed: boolean;
    answers: Record<string, string[]>;
  };
  onRetry: () => void;
}

export function QuizResults({ quiz, result, onRetry }: QuizResultsProps) {
  const { score, passed, answers } = result;

  const questionResults = quiz.questions.map((question) => {
    const userAnswer = answers[question.id] || [];
    const correctOptions = question.options.filter((o) => o.isCorrect).map((o) => o.id);
    const isCorrect =
      userAnswer.length === correctOptions.length &&
      userAnswer.every((id) => correctOptions.includes(id));

    return {
      question,
      userAnswer,
      correctOptions,
      isCorrect,
    };
  });

  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const incorrectCount = questionResults.length - correctCount;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className={cn(
        "rounded-2xl p-8 mb-8 text-center",
        passed 
          ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white" 
          : "bg-gradient-to-br from-amber-500 to-orange-600 text-white"
      )}>
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
          {passed ? (
            <Trophy className="w-10 h-10" />
          ) : (
            <Target className="w-10 h-10" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {passed ? "Поздравляем! Тест пройден!" : "Почти получилось!"}
        </h1>
        <p className="text-white/80 mb-6">
          {passed 
            ? "Ты показал отличный результат. Продолжай в том же духе!" 
            : "Не расстраивайся, попробуй еще раз. Практика ведет к совершенству!"}
        </p>
        
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-5xl font-bold">{Math.round(score)}%</p>
            <p className="text-white/70 text-sm">Твой результат</p>
          </div>
          <div className="w-px bg-white/30" />
          <div className="text-center">
            <p className="text-5xl font-bold">{quiz.passingScore}%</p>
            <p className="text-white/70 text-sm">Проходной балл</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-700">{correctCount}</p>
          <p className="text-sm text-emerald-600">Правильных</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-700">{incorrectCount}</p>
          <p className="text-sm text-red-600">Неправильных</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button size="lg" variant="outline" className="flex-1" onClick={onRetry}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Пройти тест снова
        </Button>
        <Link href="/search" className="flex-1">
          <Button size="lg" className="w-full">
            Посмотреть курсы
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {quiz.showCorrectAnswers && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Разбор ответов</h2>
          
          {questionResults.map((qr, index) => (
            <div
              key={qr.question.id}
              className={cn(
                "border rounded-xl p-6",
                qr.isCorrect ? "bg-emerald-50/50 border-emerald-200" : "bg-red-50/50 border-red-200"
              )}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0",
                  qr.isCorrect ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                )}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {qr.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      qr.isCorrect ? "text-emerald-700" : "text-red-700"
                    )}>
                      {qr.isCorrect ? "Правильно" : "Неправильно"}
                    </span>
                  </div>
                  <p className="font-medium">{qr.question.question}</p>
                </div>
              </div>

              <div className="space-y-2 ml-11">
                {qr.question.options.map((option, optIndex) => {
                  const isSelected = qr.userAnswer.includes(option.id);
                  const isCorrect = option.isCorrect;
                  const optionLetter = String.fromCharCode(65 + optIndex);

                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg text-sm",
                        isCorrect && "bg-emerald-100 border border-emerald-300",
                        isSelected && !isCorrect && "bg-red-100 border border-red-300",
                        !isSelected && !isCorrect && "bg-muted/50"
                      )}
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                        isCorrect ? "bg-emerald-500 text-white" : 
                        isSelected ? "bg-red-500 text-white" : "bg-muted-foreground/20"
                      )}>
                        {optionLetter}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      {isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      {isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  );
                })}
              </div>

              {qr.question.explanation && (
                <div className="mt-4 ml-11 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Объяснение:</strong> {qr.question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

