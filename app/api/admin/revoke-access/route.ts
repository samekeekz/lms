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

    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: targetUserId,
          courseId: courseId,
        },
      },
    });

    if (!existingPurchase) {
      return NextResponse.json({
        message: "User does not have access to this course",
        notFound: true,
      });
    }

    await db.purchase.delete({
      where: {
        userId_courseId: {
          userId: targetUserId,
          courseId: courseId,
        },
      },
    });

    return NextResponse.json({
      message: "Access revoked successfully",
      notFound: false,
    });
  } catch (error) {
    console.log("[REVOKE_ACCESS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

