"use client";

import { useState } from "react";
import { FreeQuiz, FreeQuizQuestion, FreeQuizOption, QuestionType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Check,
  X,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";

type QuizWithQuestions = FreeQuiz & {
  questions: (FreeQuizQuestion & {
    options: FreeQuizOption[];  
  })[];
};

interface QuestionEditorProps {
  quiz: QuizWithQuestions;
  onBack: () => void;
}

interface EditableQuestion {
  id?: string;
  question: string;
  type: QuestionType;
  points: number;
  position: number;
  explanation: string;
  imageUrl?: string | null;
  options: {
    id?: string;
    text: string;
    isCorrect: boolean;
    position: number;
  }[];
  isNew?: boolean;
  isModified?: boolean;
}

export function QuestionEditor({ quiz, onBack }: QuestionEditorProps) {
  const [questions, setQuestions] = useState<EditableQuestion[]>(
    quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      type: q.type,
      points: q.points,
      position: q.position,
      explanation: q.explanation || "",
      imageUrl: q.imageUrl || null,
      options: q.options.map((o) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
        position: o.position,
      })),
    }))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    title: quiz.title,
    description: quiz.description || "",
    passingScore: quiz.passingScore,
    timeLimit: quiz.timeLimit || "",
    shuffleQuestions: quiz.shuffleQuestions,
    showCorrectAnswers: quiz.showCorrectAnswers,
  });

  const addQuestion = () => {
    const newQuestion: EditableQuestion = {
      question: "",
      type: "MULTIPLE_CHOICE",
      points: 1,
      position: questions.length,
      explanation: "",
      imageUrl: null,
      options: [
        { text: "", isCorrect: true, position: 0 },
        { text: "", isCorrect: false, position: 1 },
        { text: "", isCorrect: false, position: 2 },
        { text: "", isCorrect: false, position: 3 },
      ],
      isNew: true,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, updates: Partial<EditableQuestion>) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], ...updates, isModified: true };
    setQuestions(updated);
  };

  const deleteQuestion = (index: number) => {
    if (!confirm("Удалить этот вопрос?")) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addOption = (questionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options.push({
      text: "",
      isCorrect: false,
      position: updated[questionIndex].options.length,
    });
    updated[questionIndex].isModified = true;
    setQuestions(updated);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    updates: Partial<EditableQuestion["options"][0]>
  ) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = {
      ...updated[questionIndex].options[optionIndex],
      ...updates,
    };
    updated[questionIndex].isModified = true;
    setQuestions(updated);
  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options = updated[questionIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    updated[questionIndex].isModified = true;
    setQuestions(updated);
  };

  const toggleCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    const question = updated[questionIndex];

    if (question.type === "MULTIPLE_SELECT") {
      question.options[optionIndex].isCorrect = !question.options[optionIndex].isCorrect;
    } else {
      question.options.forEach((opt, i) => {
        opt.isCorrect = i === optionIndex;
      });
    }
    question.isModified = true;
    setQuestions(updated);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.question.trim()) {
          toast.error(`Вопрос ${i + 1}: введите текст вопроса`);
          return;
        }
        if (q.options.length < 2) {
          toast.error(`Вопрос ${i + 1}: добавьте минимум 2 варианта ответа`);
          return;
        }
        if (!q.options.some((o) => o.isCorrect)) {
          toast.error(`Вопрос ${i + 1}: выберите правильный ответ`);
          return;
        }
        for (let j = 0; j < q.options.length; j++) {
          if (!q.options[j].text.trim()) {
            toast.error(`Вопрос ${i + 1}: заполните все варианты ответов`);
            return;
          }
        }
      }

      await axios.patch(`/api/admin/free-quiz/${quiz.id}`, {
        title: quizSettings.title,
        description: quizSettings.description,
        passingScore: quizSettings.passingScore,
        timeLimit: quizSettings.timeLimit || null,
        shuffleQuestions: quizSettings.shuffleQuestions,
        showCorrectAnswers: quizSettings.showCorrectAnswers,
      });

      await axios.put(`/api/admin/free-quiz/${quiz.id}/questions`, {
        questions: questions.map((q, index) => ({
          id: q.id,
          question: q.question,
          type: q.type,
          points: q.points,
          position: index,
          explanation: q.explanation,
          imageUrl: q.imageUrl || null,
          options: q.options.map((o, oIndex) => ({
            id: o.id,
            text: o.text,
            isCorrect: o.isCorrect,
            position: oIndex,
          })),
        })),
      });

      toast.success("Изменения сохранены");
      onBack();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-xl font-bold">Редактирование теста</h1>
            <p className="text-sm text-muted-foreground">{questions.length} вопросов</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Настройки теста</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Название</Label>
            <Input
              value={quizSettings.title}
              onChange={(e) =>
                setQuizSettings({ ...quizSettings, title: e.target.value })
              }
            />
          </div>
          <div className="col-span-2">
            <Label>Описание</Label>
            <Input
              value={quizSettings.description}
              onChange={(e) =>
                setQuizSettings({ ...quizSettings, description: e.target.value })
              }
              placeholder="Краткое описание теста"
            />
          </div>
          <div>
            <Label>Проходной балл (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={quizSettings.passingScore}
              onChange={(e) =>
                setQuizSettings({
                  ...quizSettings,
                  passingScore: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <Label>Лимит времени (минуты)</Label>
            <Input
              type="number"
              min={0}
              value={quizSettings.timeLimit}
              onChange={(e) =>
                setQuizSettings({
                  ...quizSettings,
                  timeLimit: e.target.value ? parseInt(e.target.value) : "",
                })
              }
              placeholder="Без ограничения"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="shuffle"
              checked={quizSettings.shuffleQuestions}
              onChange={(e) =>
                setQuizSettings({
                  ...quizSettings,
                  shuffleQuestions: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
            <Label htmlFor="shuffle" className="cursor-pointer">
              Перемешивать вопросы
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showAnswers"
              checked={quizSettings.showCorrectAnswers}
              onChange={(e) =>
                setQuizSettings({
                  ...quizSettings,
                  showCorrectAnswers: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
            <Label htmlFor="showAnswers" className="cursor-pointer">
              Показывать правильные ответы
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {qIndex + 1}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={question.type}
                  onChange={(e) =>
                    updateQuestion(qIndex, { type: e.target.value as QuestionType })
                  }
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="MULTIPLE_CHOICE">Один ответ</option>
                  <option value="MULTIPLE_SELECT">Несколько ответов</option>
                  <option value="TRUE_FALSE">Да/Нет</option>
                </select>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => deleteQuestion(qIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <Label>Вопрос</Label>
              <Input
                value={question.question}
                onChange={(e) => updateQuestion(qIndex, { question: e.target.value })}
                placeholder="Введите текст вопроса"
              />
            </div>

            <div className="mb-4">
              <Label>Изображение (опционально)</Label>
              {question.imageUrl ? (
                <div className="mt-2 space-y-2">
                  <div className="relative w-full max-w-md h-48 border rounded-lg overflow-hidden">
                    <Image
                      src={question.imageUrl}
                      alt="Question image"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex gap-2">
                    <FileUpload
                      endpoint="quizQuestionImage"
                      onChange={(url) => {
                        if (url) {
                          updateQuestion(qIndex, { imageUrl: url });
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuestion(qIndex, { imageUrl: null })}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Удалить изображение
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <FileUpload
                    endpoint="quizQuestionImage"
                    onChange={(url) => {
                      if (url) {
                        updateQuestion(qIndex, { imageUrl: url });
                      }
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <Label>Варианты ответов</Label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCorrectAnswer(qIndex, oIndex)}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      option.isCorrect
                        ? "bg-emerald-500 text-white"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {option.isCorrect ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {String.fromCharCode(65 + oIndex)}
                      </span>
                    )}
                  </button>
                  <Input
                    value={option.text}
                    onChange={(e) =>
                      updateOption(qIndex, oIndex, { text: e.target.value })
                    }
                    placeholder={`Вариант ${String.fromCharCode(65 + oIndex)}`}
                    className="flex-1"
                  />
                  {question.options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteOption(qIndex, oIndex)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addOption(qIndex)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить вариант
              </Button>
            </div>

            <div>
              <Label>Объяснение (опционально)</Label>
              <Input
                value={question.explanation}
                onChange={(e) =>
                  updateQuestion(qIndex, { explanation: e.target.value })
                }
                placeholder="Объяснение правильного ответа"
              />
            </div>
          </div>
        ))}
      </div>
        
      <Button variant="outline" className="w-full" onClick={addQuestion}>
        <Plus className="w-4 h-4 mr-2" />
        Добавить вопрос
      </Button>
    </div>
  );
}

