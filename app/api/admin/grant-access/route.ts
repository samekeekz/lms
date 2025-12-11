import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized - Admin access required", { status: 401 });
    }

    const { targetUserId, courseId } = await req.json();

    if (!targetUserId || !courseId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: targetUserId,
          courseId: courseId,
        },
      },
    });

    if (existingPurchase) {
      return NextResponse.json({
        message: "User already has access to this course",
        purchase: existingPurchase,
        alreadyExists: true,
      });
    }

    const purchase = await db.purchase.create({
      data: {
        userId: targetUserId,
        courseId: courseId,
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Access granted successfully",
      purchase,
      alreadyExists: false,
    });
  } catch (error) {
    console.log("[GRANT_ACCESS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

