"use client";

import { useState } from "react";
import { FreeQuiz, FreeQuizQuestion, FreeQuizOption } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Users,
  Award,
  Settings,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { QuestionEditor } from "./question-editor";
import { cn } from "@/lib/utils";

type QuizWithDetails = FreeQuiz & {
  questions: (FreeQuizQuestion & {
    options: FreeQuizOption[];
  })[];
  _count: {
    attempts: number;
  };
};

interface FreeQuizAdminProps {
  quizzes: QuizWithDetails[];
}

export function FreeQuizAdmin({ quizzes }: FreeQuizAdminProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<QuizWithDetails | null>(null);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateQuiz = async () => {
    if (!newQuizTitle.trim()) {
      toast.error("Введите название теста");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("/api/admin/free-quiz", {
        title: newQuizTitle,
      });
      toast.success("Тест создан");
      setNewQuizTitle("");
      setIsCreating(false);
      router.refresh();
    } catch (error) {
      toast.error("Ошибка при создании теста");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublish = async (quiz: QuizWithDetails) => {
    try {
      await axios.patch(`/api/admin/free-quiz/${quiz.id}`, {
        isPublished: !quiz.isPublished,
      });
      toast.success(quiz.isPublished ? "Тест снят с публикации" : "Тест опубликован");
      router.refresh();
    } catch (error) {
      toast.error("Ошибка при обновлении теста");
    }
  };

  const handleToggleActive = async (quiz: QuizWithDetails) => {
    try {
      await axios.patch(`/api/admin/free-quiz/${quiz.id}`, {
        isActive: !quiz.isActive,
      });
      toast.success(quiz.isActive ? "Тест деактивирован" : "Тест активирован");
      router.refresh();
    } catch (error) {
      toast.error("Ошибка при обновлении теста");
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот тест?")) return;

    try {
      await axios.delete(`/api/admin/free-quiz/${quizId}`);
      toast.success("Тест удален");
      router.refresh();
    } catch (error) {
      toast.error("Ошибка при удалении теста");
    }
  };

  if (editingQuiz) {
    return (
      <QuestionEditor
        quiz={editingQuiz}
        onBack={() => {
          setEditingQuiz(null);
          router.refresh();
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Управление бесплатным тестом</h1>
          <p className="text-muted-foreground">
            Создавайте и редактируйте бесплатный тест для новых пользователей
          </p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Создать тест
          </Button>
        )}
      </div>

      {isCreating && (
        <div className="bg-card border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Новый тест</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Название теста</Label>
              <Input
                id="title"
                value={newQuizTitle}
                onChange={(e) => setNewQuizTitle(e.target.value)}
                placeholder="Например: Пробный тест NUET"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateQuiz} disabled={isLoading}>
                {isLoading ? "Создание..." : "Создать"}
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-xl">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Нет тестов</h2>
          <p className="text-muted-foreground mb-4">
            Создайте первый бесплатный тест для пользователей
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={cn(
                "bg-card border rounded-xl p-6",
                quiz.isActive && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                    {quiz.isActive && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        Активный
                      </span>
                    )}
                    {quiz.isPublished ? (
                      <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                        Опубликован
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                        Черновик
                      </span>
                    )}
                  </div>
                  {quiz.description && (
                    <p className="text-sm text-muted-foreground">{quiz.description}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{quiz.questions.length}</p>
                  <p className="text-xs text-muted-foreground">Вопросов</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{quiz._count.attempts}</p>
                  <p className="text-xs text-muted-foreground">Попыток</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{quiz.passingScore}%</p>
                  <p className="text-xs text-muted-foreground">Проходной</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{quiz.timeLimit || "∞"}</p>
                  <p className="text-xs text-muted-foreground">Минут</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingQuiz(quiz)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Редактировать вопросы
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTogglePublish(quiz)}
                >
                  {quiz.isPublished ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Снять с публикации
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Опубликовать
                    </>
                  )}
                </Button>
                <Button
                  variant={quiz.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleActive(quiz)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {quiz.isActive ? "Активен" : "Сделать активным"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteQuiz(quiz.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

