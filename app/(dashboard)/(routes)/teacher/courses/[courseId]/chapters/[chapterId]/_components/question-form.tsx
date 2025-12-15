"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionFormProps {
  courseId: string;
  chapterId: string;
}

const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean().default(false),
});

const formSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  type: z.enum(["MULTIPLE_CHOICE", "MULTIPLE_SELECT", "TRUE_FALSE", "SHORT_ANSWER"]),
  points: z.coerce.number().min(1),
  explanation: z.string().optional(),
  options: z.array(optionSchema).min(2, "At least 2 options required"),
});

export const QuestionForm = ({
  courseId,
  chapterId,
}: QuestionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      type: "MULTIPLE_CHOICE",
      points: 1,
      explanation: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const { isSubmitting, isValid } = form.formState;
  const questionType = form.watch("type");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Validate at least one correct answer for non-short-answer questions
      if (values.type !== "SHORT_ANSWER") {
        const hasCorrectAnswer = values.options.some((opt) => opt.isCorrect);
        if (!hasCorrectAnswer) {
          toast.error("Please mark at least one correct answer");
          return;
        }
      }

      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/quiz/questions`,
        values
      );
      toast.success("Question created");
      form.reset();
      setIsCreating(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Show TRUE/FALSE options automatically
  const shouldShowOptions = questionType !== "SHORT_ANSWER";

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Add Question
        <Button
          variant="ghost"
          onClick={() => setIsCreating((prev) => !prev)}
        >
          {isCreating ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a question
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="What is...?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <select
                      disabled={isSubmitting}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                      <option value="MULTIPLE_SELECT">Multiple Select</option>
                      <option value="TRUE_FALSE">True/False</option>
                      <option value="SHORT_ANSWER">Short Answer</option>
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Explain the correct answer..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {shouldShowOptions && (
              <div className="space-y-2">
                <FormLabel>Answer Options</FormLabel>
                {questionType === "TRUE_FALSE" ? (
                  <>
                    <FormField
                      control={form.control}
                      name="options.0.isCorrect"
                      render={({ field }) => (
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label className="text-sm font-medium">True is correct</label>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="options.1.isCorrect"
                      render={({ field }) => (
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label className="text-sm font-medium">False is correct</label>
                        </div>
                      )}
                    />
                  </>
                ) : (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-x-2">
                        <FormField
                          control={form.control}
                          name={`options.${index}.text`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  placeholder={`Option ${index + 1}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`options.${index}.isCorrect`}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 pt-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm !mt-0">Correct</FormLabel>
                            </FormItem>
                          )}
                        />
                        {fields.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ text: "", isCorrect: false })}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </>
                )}
              </div>
            )}

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create Question
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

