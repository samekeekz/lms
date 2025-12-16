import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { FreeQuizClient } from "./_components/free-quiz-client";

export default async function FreeQuizPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const freeQuiz = await db.freeQuiz.findFirst({
    where: {
      isActive: true,
      isPublished: true,
    },
    include: {
      questions: {
        include: {
          options: {
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const userAttempts = freeQuiz
    ? await db.freeQuizAttempt.findMany({
        where: {
          userId: userId,
          quizId: freeQuiz.id,
          isCompleted: true,
        },
        orderBy: {
          score: "desc",
        },
      })
    : [];

  const bestScore = userAttempts.length > 0 ? userAttempts[0].score || 0 : 0;

  return (
    <FreeQuizClient
      quiz={freeQuiz}
      userId={userId}
      userAttempts={userAttempts}
      bestScore={bestScore}
    />
  );
}
