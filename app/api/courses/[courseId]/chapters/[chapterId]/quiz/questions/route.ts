import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

// POST - Create a question
export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify ownership
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      include: {
        course: true,
        quiz: true,
      },
    });

    if (!chapter || chapter.course.userId !== userId || !chapter.quiz) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Get last position
    const lastQuestion = await db.question.findFirst({
      where: {
        quizId: chapter.quiz.id,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuestion ? lastQuestion.position + 1 : 0;

    const question = await db.question.create({
      data: {
        quizId: chapter.quiz.id,
        question: values.question,
        type: values.type || "MULTIPLE_CHOICE",
        points: values.points || 1,
        position: newPosition,
        explanation: values.explanation,
        options: {
          create: values.options?.map((option: any, index: number) => ({
            text: option.text,
            isCorrect: option.isCorrect || false,
            position: index,
          })) || [],
        },
      },
      include: {
        options: true,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.log("[QUESTION_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

