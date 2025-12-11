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
    const courseId = searchParams.get("courseId");

    const purchases = await db.purchase.findMany({
      where: courseId ? { courseId } : undefined,
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
    console.log("[GET_PURCHASES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

