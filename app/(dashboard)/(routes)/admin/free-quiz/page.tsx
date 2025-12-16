import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { FreeQuizAdmin } from "./_components/free-quiz-admin";

export default async function AdminFreeQuizPage() {
  const { userId } = auth();

  if (!userId || !isTeacher(userId)) {
    return redirect("/");
  }
  
  const freeQuizzes = await db.freeQuiz.findMany({
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
      _count: {
        select: {
          attempts: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <FreeQuizAdmin quizzes={freeQuizzes} />
    </div>
  );
}

