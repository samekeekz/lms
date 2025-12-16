import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { quizId, answers, score, passed, timeSpent } = await req.json();

    if (!quizId) {
      return new NextResponse("Quiz ID is required", { status: 400 });
    }

    // Verify quiz exists
    const quiz = await db.freeQuiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    // Create the attempt
    const attempt = await db.freeQuizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        isPassed: passed,
        isCompleted: true,
        completedAt: new Date(),
        timeSpent,
      },
    });

    // Save individual answers
    const answerPromises = Object.entries(answers).map(
      async ([questionId, selectedOptions]) => {
        const question = quiz.questions.find((q) => q.id === questionId);
        if (!question) return null;

        const correctOptions = question.options
          .filter((o) => o.isCorrect)
          .map((o) => o.id);
        
        const selectedArray = selectedOptions as string[];
        const isCorrect =
          selectedArray.length === correctOptions.length &&
          selectedArray.every((id) => correctOptions.includes(id));

        return db.freeQuizAnswer.create({
          data: {
            userId,
            questionId,
            attemptId: attempt.id,
            selectedOptions: selectedArray,
            isCorrect,
            pointsEarned: isCorrect ? question.points : 0,
          },
        });
      }
    );

    await Promise.all(answerPromises.filter(Boolean));

    return NextResponse.json({
      attemptId: attempt.id,
      score,
      passed,
    });
  } catch (error) {
    console.error("[FREE_QUIZ_ATTEMPT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

