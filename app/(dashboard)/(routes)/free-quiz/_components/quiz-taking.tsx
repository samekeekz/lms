"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { FreeQuiz, FreeQuizQuestion, FreeQuizOption } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, Flag, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

type QuizWithQuestions = FreeQuiz & {
  questions: (FreeQuizQuestion & {
    options: FreeQuizOption[];
  })[];
};

interface QuizTakingProps {
  quiz: QuizWithQuestions;
  userId: string;
  onComplete: (result: { score: number; passed: boolean; answers: Record<string, string[]> }) => void;
  onCancel: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizTaking({ quiz, userId, onComplete, onCancel }: QuizTakingProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => {
    if (quiz.shuffleQuestions) {
      return shuffleArray(quiz.questions);
    }
    return quiz.questions;
  }, [quiz.id]);
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (timeRemaining === null) return;
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId: string) => {
    const questionId = currentQuestion.id;
    const currentAnswers = answers[questionId] || [];

    if (currentQuestion.type === "MULTIPLE_SELECT") {
      if (currentAnswers.includes(optionId)) {
        setAnswers({
          ...answers,
          [questionId]: currentAnswers.filter((id) => id !== optionId),
        });
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentAnswers, optionId],
        });
      }
    } else {
      setAnswers({
        ...answers,
        [questionId]: [optionId],
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let correctAnswers = 0;
      let totalPoints = 0;
      let earnedPoints = 0;

      questions.forEach((question) => {
        totalPoints += question.points;
        const userAnswer = answers[question.id] || [];
        const correctOptions = question.options.filter((o) => o.isCorrect).map((o) => o.id);

        const isCorrect =
          userAnswer.length === correctOptions.length &&
          userAnswer.every((id) => correctOptions.includes(id));

        if (isCorrect) {
          correctAnswers++;
          earnedPoints += question.points;
        }
      });

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      const passed = score >= quiz.passingScore;

      await axios.post("/api/free-quiz/attempt", {
        quizId: quiz.id,
        answers: answers,
        score: score,
        passed: passed,
        timeSpent: quiz.timeLimit ? quiz.timeLimit * 60 - (timeRemaining || 0) : null,
      });

      onComplete({ score, passed, answers });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Ошибка при отправке теста");
      setIsSubmitting(false);
    }
  }, [answers, quiz, questions, timeRemaining, isSubmitting, onComplete]);

  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentAnswers = answers[currentQuestion.id] || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">{quiz.title}</h1>
          <p className="text-sm text-muted-foreground">
            Вопрос {currentQuestionIndex + 1} из {totalQuestions}
          </p>
        </div>
        {timeRemaining !== null && (
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg",
            timeRemaining < 60 ? "bg-destructive/10 text-destructive" : "bg-muted"
          )}>
            <Clock className="w-5 h-5" />
            {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Отвечено: {answeredCount} из {totalQuestions}
        </p>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-6">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
            {currentQuestionIndex + 1}
          </span>
          <div className="flex-1">
            <p className="text-lg font-medium">{currentQuestion.question}</p>
            {currentQuestion.type === "MULTIPLE_SELECT" && (
              <p className="text-sm text-muted-foreground mt-1">
                Выберите все правильные ответы
              </p>
            )}
            {currentQuestion.imageUrl && (
              <div className="mt-4 relative w-full max-w-2xl h-64 border rounded-lg overflow-hidden bg-muted">
                <Image
                  src={currentQuestion.imageUrl}
                  alt="Question image"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = currentAnswers.includes(option.id);
            const optionLetter = String.fromCharCode(65 + index);

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium shrink-0",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {optionLetter}
                </span>
                <span className="flex-1">{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {questions.map((q, index) => {
          const isAnswered = answers[q.id]?.length > 0;
          const isCurrent = index === currentQuestionIndex;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={cn(
                "w-8 h-8 rounded-full text-xs font-medium transition-all",
                isCurrent
                  ? "bg-primary text-primary-foreground"
                  : isAnswered
                  ? "bg-emerald-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Отмена
          </Button>
          
          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Flag className="w-4 h-4 mr-2" />
              {isSubmitting ? "Отправка..." : "Завершить тест"}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Далее
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {answeredCount < totalQuestions && (
        <div className="mt-6 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>
            Вы ответили на {answeredCount} из {totalQuestions} вопросов
          </span>
        </div>
      )}
    </div>
  );
}

