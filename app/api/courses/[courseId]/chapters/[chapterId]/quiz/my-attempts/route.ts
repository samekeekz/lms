import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Get student's own attempts
export async function GET(
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
      },
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    const attempts = await db.quizAttempt.findMany({
      where: {
        quizId: quiz.id,
        userId,
      },
      include: {
        answers: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(attempts);
  } catch (error) {
    console.log("[MY_ATTEMPTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

