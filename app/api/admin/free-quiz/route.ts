import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quizzes = await db.freeQuiz.findMany({
      include: {
        questions: {
          include: {
            options: {
              orderBy: { position: "asc" },
            },
          },
          orderBy: { position: "asc" },
        },
        _count: {
          select: { attempts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("[FREE_QUIZ_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, description } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const quiz = await db.freeQuiz.create({
      data: {
        title,
        description,
        passingScore: 70,
        isPublished: false,
        isActive: false,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("[FREE_QUIZ_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

