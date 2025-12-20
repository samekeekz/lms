import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

// GET - Fetch quiz for a chapter
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

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZ_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST - Create a quiz
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

    // Verify chapter exists and user owns the course
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

    // Check if quiz already exists
    const existingQuiz = await db.quiz.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });

    if (existingQuiz) {
      return new NextResponse("Quiz already exists for this chapter", {
        status: 400
      });
    }

    const quiz = await db.quiz.create({
      data: {
        chapterId: params.chapterId,
        title: values.title || "Untitled Quiz",
        description: values.description,
        passingScore: values.passingScore || 70,
        timeLimit: values.timeLimit ?? 30,
        maxAttempts: values.maxAttempts ?? 3,
        shuffleQuestions: values.shuffleQuestions || false,
        showCorrectAnswers: values.showCorrectAnswers !== false,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZ_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH - Update quiz
export async function PATCH(
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
      },
    });

    if (!chapter || chapter.course.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const quiz = await db.quiz.update({
      where: {
        chapterId: params.chapterId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZ_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE - Delete quiz
export async function DELETE(
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
      },
    });

    if (!chapter || chapter.course.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedQuiz = await db.quiz.delete({
      where: {
        chapterId: params.chapterId,
      },
    });

    return NextResponse.json(deletedQuiz);
  } catch (error) {
    console.log("[QUIZ_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

