import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized - Admin access required", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId");

    if (!targetUserId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const purchases = await db.purchase.findMany({
      where: {
        userId: targetUserId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(purchases);
  } catch (error) {
    console.log("[GET_USER_COURSES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

