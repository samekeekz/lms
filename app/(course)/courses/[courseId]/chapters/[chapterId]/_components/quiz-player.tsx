"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Brain,
  AlertCircle
} from "lucide-react";

interface QuizPlayerProps {
  courseId: string;
  chapterId: string;
  quiz: any;
}

export const QuizPlayer = ({
  courseId,
  chapterId,
  quiz,
}: QuizPlayerProps) => {
  const [attempt, setAttempt] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [markedForReview, setMarkedForReview] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showReview, setShowReview] = useState(false);
  const router = useRouter();

  // Initialize answers and marks
  useEffect(() => {
    setAnswers({});
    setMarkedForReview(new Array(quiz.questions.length).fill(false));
  }, [quiz]);

  // Start quiz attempt
  const startQuiz = async () => {
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/quiz/attempt`
      );
      setAttempt(response.data);

      if (quiz.timeLimit) {
        setTimeRemaining(quiz.timeLimit * 60);
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to start quiz");
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || result || showReview) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, result, showReview]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestionData = quiz.questions[currentQuestion];

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleMarkForReview = () => {
    const newMarked = [...markedForReview];
    newMarked[currentQuestion] = !newMarked[currentQuestion];
    setMarkedForReview(newMarked);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formattedAnswers = quiz.questions.map((q: any) => ({
        questionId: q.id,
        selectedOptions: Array.isArray(answers[q.id])
          ? answers[q.id]
          : answers[q.id]
          ? [answers[q.id]]
          : [],
        textAnswer: typeof answers[q.id] === "string" ? answers[q.id] : null,
      }));

      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/quiz/attempt/${attempt.id}/submit`,
        { answers: formattedAnswers }
      );

      setResult(response.data);
      setShowResults(true);
      toast.success("Quiz submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  // REVIEW SCREEN
  if (showReview) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Review Your Answers</h1>
              <div className="flex items-center gap-4">
                {timeRemaining !== null && (
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="size-4" />
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Section Summary</h2>
                <p className="text-slate-600">
                  Review your answers before submitting. Click on any question to return to it.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quiz.questions.map((q: any, index: number) => {
                  const answered = answers[q.id] !== null && answers[q.id] !== undefined;
                  const marked = markedForReview[index];

                  return (
                    <Button
                      key={q.id}
                      variant="outline"
                      className={`h-16 text-base font-medium ${
                        answered ? "bg-slate-100 border-slate-300" : "border-red-500 text-red-600"
                      } ${marked ? "border-sky-500" : ""}`}
                      onClick={() => {
                        setShowReview(false);
                        setCurrentQuestion(index);
                      }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>Question {index + 1}</span>
                        <div className="flex items-center gap-1 text-xs">
                          {answered && <span className="text-slate-500">Answered</span>}
                          {!answered && <span>Unanswered</span>}
                          {marked && <Flag className="size-3 text-sky-600 fill-sky-600" />}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-100 rounded-lg">
                <div className="flex-1 text-sm">
                  <div className="font-medium mb-1">
                    Questions answered:{" "}
                    {Object.keys(answers).filter((k) => answers[k] !== null && answers[k] !== undefined).length} of{" "}
                    {quiz.questions.length}
                  </div>
                  <div className="text-slate-600">
                    Questions marked: {markedForReview.filter(Boolean).length}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setShowReview(false)}>
                  Return to Quiz
                </Button>
                <Button onClick={handleSubmit} size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (showResults && result) {
    const score = result.answers.filter((a: any) => a.isCorrect).length;
    const percentage = result.score || 0;
    const timeSpent = quiz.timeLimit ? (quiz.timeLimit * 60 - (timeRemaining || 0)) : (result.timeSpent || 0);

    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="mx-auto">
                  {result.isPassed ? (
                    <CheckCircle2 className="size-20 text-emerald-600 mx-auto" />
                  ) : (
                    <XCircle className="size-20 text-red-600 mx-auto" />
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {result.isPassed ? "Congratulations!" : "Keep Practicing!"}
                </h1>
                <p className="text-xl text-slate-600">
                  {result.isPassed ? "You passed the quiz!" : "You didn't pass this time"}
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="p-8 bg-slate-50 rounded-2xl">
                  <div className="space-y-4">
                    <div className="text-6xl font-bold text-sky-700">{score}</div>
                    <div className="text-lg text-slate-600">
                      out of {quiz.questions.length} correct
                    </div>
                    <div className="text-3xl font-semibold">{percentage.toFixed(0)}%</div>
                    <div className="text-sm text-slate-500">
                      Passing Score: {quiz.passingScore}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-6 rounded-xl bg-slate-50 space-y-2">
                  <div className="text-3xl font-bold text-emerald-600">{score}</div>
                  <div className="text-sm text-slate-600">Correct</div>
                </div>
                <div className="p-6 rounded-xl bg-slate-50 space-y-2">
                  <div className="text-3xl font-bold text-red-600">
                    {quiz.questions.length - score}
                  </div>
                  <div className="text-sm text-slate-600">Incorrect</div>
                </div>
                <div className="p-6 rounded-xl bg-slate-50 space-y-2">
                  <div className="text-3xl font-bold text-slate-700">
                    {formatTime(timeSpent)}
                  </div>
                  <div className="text-sm text-slate-600">Time Taken</div>
                </div>
              </div>

              {quiz.showCorrectAnswers && (
                <div className="space-y-6 mt-12 text-left">
                  <h3 className="text-2xl font-bold text-center">Review Answers</h3>
                  {result.answers.map((answer: any, index: number) => {
                    const question = answer.question;
                    return (
                      <div
                        key={answer.id}
                        className="border rounded-xl p-6 bg-white shadow-sm"
                      >
                        <div className="flex items-start gap-x-3 mb-4">
                          {answer.isCorrect ? (
                            <CheckCircle2 className="size-6 text-emerald-600 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="size-6 text-red-600 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-500 mb-2">
                              QUESTION {index + 1}
                            </div>
                            <p className="text-xl font-medium mb-2">{question.question}</p>
                            <p className="text-sm text-slate-600">
                              Points: {answer.pointsEarned} / {question.points}
                            </p>
                          </div>
                        </div>

                        {question.type !== "SHORT_ANSWER" && (
                          <div className="ml-9 space-y-2">
                            {question.options.map((option: any, optIndex: number) => {
                              const isSelected = answer.selectedOptions.includes(option.id);
                              const isCorrect = option.isCorrect;
                              const letter = String.fromCharCode(65 + optIndex);

                              return (
                                <div
                                  key={option.id}
                                  className={`p-4 rounded-lg border-2 ${
                                    isCorrect
                                      ? "border-emerald-500 bg-emerald-50"
                                      : isSelected
                                      ? "border-red-500 bg-red-50"
                                      : "border-slate-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`size-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                                        isCorrect
                                          ? "bg-emerald-600 text-white"
                                          : isSelected
                                          ? "bg-red-600 text-white"
                                          : "bg-slate-200 text-slate-600"
                                      }`}
                                    >
                                      {letter}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-lg">{option.text}</p>
                                      {isCorrect && (
                                        <span className="text-sm text-emerald-600 font-semibold">
                                          ✓ Correct Answer
                                        </span>
                                      )}
                                      {isSelected && !isCorrect && (
                                        <span className="text-sm text-red-600 font-semibold">
                                          ✗ Your Answer
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {question.explanation && (
                          <div className="ml-9 mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => router.refresh()}>
                  Back to Chapter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // START SCREEN
  if (!attempt) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="size-20 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto">
                  <Brain className="size-10 text-sky-700" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-center">{quiz.title}</h1>
                {quiz.description && (
                  <p className="text-lg text-slate-600 text-center leading-relaxed">
                    {quiz.description}
                  </p>
                )}
              </div>

              <div className="space-y-3 p-6 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-x-3 text-sm">
                  <Brain className="size-5 text-sky-700" />
                  <span className="font-medium">{quiz.questions.length} questions</span>
                </div>
                <div className="flex items-center gap-x-3 text-sm">
                  <AlertCircle className="size-5 text-emerald-600" />
                  <span className="font-medium">Passing score: {quiz.passingScore}%</span>
                </div>
                {quiz.timeLimit && (
                  <div className="flex items-center gap-x-3 text-sm">
                    <Clock className="size-5 text-purple-600" />
                    <span className="font-medium">Time limit: {quiz.timeLimit} minutes</span>
                  </div>
                )}
                {quiz.maxAttempts && (
                  <div className="flex items-center gap-x-3 text-sm">
                    <AlertCircle className="size-5 text-red-600" />
                    <span className="font-medium">Maximum attempts: {quiz.maxAttempts}</span>
                  </div>
                )}
              </div>

              <Button onClick={startQuiz} size="lg" className="w-full text-base">
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ IN PROGRESS
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{quiz.title}</h1>
            <div className="flex items-center gap-4">
              {timeRemaining !== null && (
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="size-4" />
                  <span className={timeRemaining < 60 ? "text-red-600" : ""}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowReview(true)}>
                Review
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - Question Navigator */}
        <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white p-4">
          <div className="sticky top-20">
            <h2 className="font-semibold mb-4 text-sm text-slate-500 uppercase tracking-wide">
              Questions
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {quiz.questions.map((q: any, index: number) => {
                const answered = answers[q.id] !== null && answers[q.id] !== undefined;
                const marked = markedForReview[index];
                const isCurrent = currentQuestion === index;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square rounded-lg text-sm font-medium transition-colors relative ${
                      isCurrent
                        ? "bg-sky-700 text-white"
                        : answered
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "border-2 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {index + 1}
                    {marked && (
                      <Flag className="size-3 absolute -top-1 -right-1 text-sky-600 fill-sky-600" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded bg-sky-700" />
                <span className="text-slate-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded bg-slate-100 border-2 border-slate-200" />
                <span className="text-slate-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded border-2 border-slate-200" />
                <span className="text-slate-600">Unanswered</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Question Counter - Mobile */}
            <div className="lg:hidden mb-6 p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6 md:p-10">
              <div className="space-y-8">
                {/* Question Number and Mark Button */}
                <div className="flex items-start justify-between">
                  <div className="text-sm font-semibold text-slate-500">
                    QUESTION {currentQuestion + 1}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkForReview}
                    className={markedForReview[currentQuestion] ? "text-sky-700" : ""}
                  >
                    <Flag
                      className={`size-4 mr-2 ${markedForReview[currentQuestion] ? "fill-sky-700" : ""}`}
                    />
                    {markedForReview[currentQuestion] ? "Marked" : "Mark for Review"}
                  </Button>
                </div>

                {/* Question Text */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium leading-relaxed">
                    {currentQuestionData.question}
                  </h2>
                  {currentQuestionData.points && (
                    <p className="text-sm text-slate-500 mt-2">
                      {currentQuestionData.points} point{currentQuestionData.points > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestionData.type === "MULTIPLE_CHOICE" ||
                  currentQuestionData.type === "TRUE_FALSE" ? (
                    currentQuestionData.options.map((option: any, index: number) => {
                      const isSelected = answers[currentQuestionData.id] === option.id;
                      const letter = String.fromCharCode(65 + index);

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleAnswerChange(currentQuestionData.id, option.id)}
                          className={`w-full p-5 text-left rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-sky-700 bg-sky-50"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`size-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                                isSelected
                                  ? "bg-sky-700 text-white"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {letter}
                            </div>
                            <span className="text-lg">{option.text}</span>
                          </div>
                        </button>
                      );
                    })
                  ) : currentQuestionData.type === "MULTIPLE_SELECT" ? (
                    currentQuestionData.options.map((option: any, index: number) => {
                      const selectedOptions = answers[currentQuestionData.id] || [];
                      const isSelected = selectedOptions.includes(option.id);
                      const letter = String.fromCharCode(65 + index);

                      return (
                        <div
                          key={option.id}
                          className={`p-5 rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-sky-700 bg-sky-50"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                const current = answers[currentQuestionData.id] || [];
                                if (checked) {
                                  handleAnswerChange(currentQuestionData.id, [...current, option.id]);
                                } else {
                                  handleAnswerChange(
                                    currentQuestionData.id,
                                    current.filter((id: string) => id !== option.id)
                                  );
                                }
                              }}
                            />
                            <div
                              className={`size-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                                isSelected
                                  ? "bg-sky-700 text-white"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {letter}
                            </div>
                            <span className="text-lg flex-1">{option.text}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Textarea
                      value={answers[currentQuestionData.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(currentQuestionData.id, e.target.value)
                      }
                      placeholder="Type your answer here..."
                      rows={6}
                      className="text-base"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                size="lg"
              >
                <ChevronLeft className="size-4 mr-2" />
                Previous
              </Button>

              <div className="hidden sm:block text-sm text-slate-600">
                {currentQuestion + 1} / {quiz.questions.length}
              </div>

              {currentQuestion < quiz.questions.length - 1 ? (
                <Button onClick={handleNext} size="lg">
                  Next
                  <ChevronRight className="size-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => setShowReview(true)} size="lg">
                  Review Answers
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

