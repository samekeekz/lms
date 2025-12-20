import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

// PUT - Replace all questions for a quiz
export async function PUT(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { questions } = await req.json();

    // Verify quiz exists
    const quiz = await db.freeQuiz.findUnique({
      where: { id: params.quizId },
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    // Delete all existing questions (cascade will delete options and answers)
    await db.freeQuizQuestion.deleteMany({
      where: { quizId: params.quizId },
    });

    // Create new questions with options
    for (const question of questions) {
      await db.freeQuizQuestion.create({
        data: {
          quizId: params.quizId,
          question: question.question,
          type: question.type,
          points: question.points || 1,
          position: question.position,
          explanation: question.explanation || null,
          imageUrl: question.imageUrl || null,
          options: {
            create: question.options.map((option: any) => ({
              text: option.text,
              isCorrect: option.isCorrect,
              position: option.position,
            })),
          },
        },
      });
    }

    // Fetch and return updated quiz
    const updatedQuiz = await db.freeQuiz.findUnique({
      where: { id: params.quizId },
      include: {
        questions: {
          include: {
            options: {
              orderBy: { position: "asc" },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.error("[FREE_QUIZ_QUESTIONS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

