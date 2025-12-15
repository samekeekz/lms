import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST - Submit quiz answers
export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; attemptId: string } }
) {
  try {
    const { userId } = auth();
    const { answers } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify attempt belongs to user
    const attempt = await db.quizAttempt.findUnique({
      where: {
        id: params.attemptId,
        userId,
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!attempt || attempt.isCompleted) {
      return new NextResponse("Invalid or already completed attempt", {
        status: 400
      });
    }

    let totalPoints = 0;
    let earnedPoints = 0;

    // Process each answer
    for (const answer of answers) {
      const question = attempt.quiz.questions.find(
        (q) => q.id === answer.questionId
      );

      if (!question) continue;

      totalPoints += question.points;

      let isCorrect: boolean | null = false;
      let pointsEarned = 0;

      // Grade based on question type
      switch (question.type) {
        case "MULTIPLE_CHOICE":
        case "TRUE_FALSE": {
          const correctOption = question.options.find((o) => o.isCorrect);
          isCorrect = answer.selectedOptions?.[0] === correctOption?.id;
          pointsEarned = isCorrect ? question.points : 0;
          break;
        }

        case "MULTIPLE_SELECT": {
          const correctOptionIds = question.options
            .filter((o) => o.isCorrect)
            .map((o) => o.id)
            .sort();

          const selectedIds = (answer.selectedOptions || []).sort();

          isCorrect =
            correctOptionIds.length === selectedIds.length &&
            correctOptionIds.every((id, index) => id === selectedIds[index]);

          pointsEarned = isCorrect ? question.points : 0;
          break;
        }

        case "SHORT_ANSWER": {
          // Manual grading required
          isCorrect = null;
          pointsEarned = 0;
          break;
        }
      }

      earnedPoints += pointsEarned;

      // Save user answer
      await db.userAnswer.create({
        data: {
          userId,
          questionId: question.id,
          attemptId: params.attemptId,
          selectedOptions: answer.selectedOptions || [],
          textAnswer: answer.textAnswer,
          isCorrect,
          pointsEarned,
        },
      });
    }

    // Calculate score percentage
    const scorePercentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const isPassed = scorePercentage >= attempt.quiz.passingScore;

    // Calculate time spent
    const timeSpent = Math.floor(
      (new Date().getTime() - new Date(attempt.startedAt).getTime()) / 1000
    );

    // Update attempt
    const updatedAttempt = await db.quizAttempt.update({
      where: {
        id: params.attemptId,
      },
      data: {
        isCompleted: true,
        completedAt: new Date(),
        score: scorePercentage,
        isPassed,
        timeSpent,
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
        quiz: true,
      },
    });

    return NextResponse.json(updatedAttempt);
  } catch (error) {
    console.log("[QUIZ_SUBMIT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

