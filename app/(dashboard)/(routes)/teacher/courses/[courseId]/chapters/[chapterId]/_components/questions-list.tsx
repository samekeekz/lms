"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  question: string;
  type: string;
  points: number;
  position: number;
}

interface QuestionsListProps {
  items: Question[];
  courseId: string;
  chapterId: string;
}

export const QuestionsList = ({
  items,
  courseId,
  chapterId,
}: QuestionsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [questions, setQuestions] = useState(items);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setQuestions(items);
  }, [items]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedQuestions = items.slice(startIndex, endIndex + 1);

    setQuestions(items);

    const bulkUpdateData = updatedQuestions.map((question) => ({
      id: question.id,
      position: items.findIndex((item) => item.id === question.id),
    }));

    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/quiz/questions/reorder`,
        { list: bulkUpdateData }
      );
      toast.success("Questions reordered");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/quiz/questions/${id}`
      );
      toast.success("Question deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <div className="flex-1 py-3">
                      <p className="font-medium">{question.question}</p>
                      <div className="flex gap-x-2 mt-1">
                        <Badge variant="outline">{question.type}</Badge>
                        <Badge variant="secondary">{question.points} pts</Badge>
                      </div>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Trash
                        onClick={() => onDelete(question.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition text-red-600"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

