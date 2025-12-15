import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { list } = await req.json();

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

    // Update positions
    for (let item of list) {
      await db.question.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER_QUESTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

