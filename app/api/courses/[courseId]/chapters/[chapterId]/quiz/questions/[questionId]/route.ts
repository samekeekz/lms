import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

// PATCH - Update question
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; questionId: string } }
) {
  try {
    const { userId } = auth();
    const values = await req.json();

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
      },
    });

    if (!chapter || chapter.course.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Handle options update if provided
    if (values.options) {
      // Delete existing options
      await db.questionOption.deleteMany({
        where: {
          questionId: params.questionId,
        },
      });

      // Create new options
      await db.questionOption.createMany({
        data: values.options.map((option: any, index: number) => ({
          questionId: params.questionId,
          text: option.text,
          isCorrect: option.isCorrect || false,
          position: index,
        })),
      });
    }

    const question = await db.question.update({
      where: {
        id: params.questionId,
      },
      data: {
        question: values.question,
        type: values.type,
        points: values.points,
        explanation: values.explanation,
      },
      include: {
        options: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.log("[QUESTION_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE - Delete question
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; questionId: string } }
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
      },
    });

    if (!chapter || chapter.course.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedQuestion = await db.question.delete({
      where: {
        id: params.questionId,
      },
    });

    return NextResponse.json(deletedQuestion);
  } catch (error) {
    console.log("[QUESTION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

