import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST - Start a new quiz attempt
export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quiz = await db.quiz.findUnique({
      where: {
        chapterId: params.chapterId,
        isPublished: true,
      },
    });

    if (!quiz) {
      return new NextResponse("Quiz not found or not published", { status: 404 });
    }

    // Check max attempts
    if (quiz.maxAttempts) {
      const previousAttempts = await db.quizAttempt.count({
        where: {
          quizId: quiz.id,
          userId,
        },
      });

      if (previousAttempts >= quiz.maxAttempts) {
        return new NextResponse("Maximum attempts reached", { status: 400 });
      }
    }

    // Check if there's an incomplete attempt
    const incompleteAttempt = await db.quizAttempt.findFirst({
      where: {
        quizId: quiz.id,
        userId,
        isCompleted: false,
      },
    });

    if (incompleteAttempt) {
      return NextResponse.json(incompleteAttempt);
    }

    // Create new attempt
    const attempt = await db.quizAttempt.create({
      data: {
        quizId: quiz.id,
        userId,
      },
    });

    return NextResponse.json(attempt);
  } catch (error) {
    console.log("[QUIZ_ATTEMPT_START]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

