import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function GET(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quiz = await db.freeQuiz.findUnique({
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

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("[FREE_QUIZ_GET_ONE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    if (values.isActive === true) {
      await db.freeQuiz.updateMany({
        where: {
          id: { not: params.quizId },
        },
        data: {
          isActive: false,
        },
      });
    }

    const quiz = await db.freeQuiz.update({
      where: { id: params.quizId },
      data: {
        ...values,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("[FREE_QUIZ_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.freeQuiz.delete({
      where: { id: params.quizId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[FREE_QUIZ_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

