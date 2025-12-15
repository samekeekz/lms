"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Brain } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface QuizFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  passingScore: z.coerce.number().min(0).max(100),
  timeLimit: z.coerce.number().optional(),
  maxAttempts: z.coerce.number().optional(),
  shuffleQuestions: z.boolean().default(false),
  showCorrectAnswers: z.boolean().default(true),
});

export const QuizForm = ({ initialData, courseId, chapterId }: QuizFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      passingScore: 70,
      timeLimit: null,
      maxAttempts: null,
      shuffleQuestions: false,
      showCorrectAnswers: true,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/quiz`,
          values
        );
      } else {
        await axios.post(
          `/api/courses/${courseId}/chapters/${chapterId}/quiz`,
          values
        );
      }
      toast.success("Quiz updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-2">
          <Brain className="size-5 text-sky-700" />
          <span className="text-lg">Quiz Settings</span>
        </div>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : initialData ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Quiz
            </>
          )}
        </Button>
      </div>

      {!isEditing && initialData && (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-xl">{initialData.title}</p>
            {initialData.description && (
              <p className="text-slate-600 mt-2 leading-relaxed">
                {initialData.description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="p-4 rounded-lg bg-white border">
              <div className="text-2xl font-bold text-sky-700">{initialData.passingScore}%</div>
              <div className="text-sm text-slate-500">Passing Score</div>
            </div>
            {initialData.timeLimit && (
              <div className="p-4 rounded-lg bg-white border">
                <div className="text-2xl font-bold text-emerald-700">{initialData.timeLimit}</div>
                <div className="text-sm text-slate-500">Minutes</div>
              </div>
            )}
            {initialData.maxAttempts && (
              <div className="p-4 rounded-lg bg-white border">
                <div className="text-2xl font-bold text-purple-700">{initialData.maxAttempts}</div>
                <div className="text-sm text-slate-500">Max Attempts</div>
              </div>
            )}
          </div>
        </div>
      )}

      {!isEditing && !initialData && (
        <p className="text-sm text-slate-500">No quiz created yet. Create one to get started.</p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Chapter 1 Assessment'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Brief description of what this quiz covers..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="passingScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Score (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="70"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum score to pass (0-100)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Limit (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="30"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty for no limit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="maxAttempts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Attempts</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="3"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Leave empty for unlimited attempts
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="shuffleQuestions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Shuffle Questions</FormLabel>
                      <FormDescription>
                        Randomize question order for each student
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showCorrectAnswers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Show Correct Answers</FormLabel>
                      <FormDescription>
                        Display correct answers after quiz submission
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit" size="lg">
                {isSubmitting ? "Saving..." : "Save Quiz Settings"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

