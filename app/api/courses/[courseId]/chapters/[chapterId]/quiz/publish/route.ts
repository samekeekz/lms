import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      include: {
        course: true,
        quiz: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!chapter || chapter.course.userId !== userId || !chapter.quiz) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Validation: Must have at least one question
    if (chapter.quiz.questions.length === 0) {
      return new NextResponse("Cannot publish quiz without questions", {
        status: 400,
      });
    }

    const quiz = await db.quiz.update({
      where: {
        chapterId: params.chapterId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZ_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

