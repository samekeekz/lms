import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, phoneNumber, telegramNickname, email, grade } = await req.json();

    if (!name || !phoneNumber) {
      return new NextResponse("Name and phone number are required", { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        name,
        phoneNumber,
        telegramNickname: telegramNickname || null,
        email: email || null,
        grade: grade || null,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.log("Leads", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

