import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }

  // Handle the webhook event
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const primaryEmail = email_addresses?.[0]?.email_address;

    console.log(`New user created: ${id}, Email: ${primaryEmail}`);

    try {
      // Find the free trial course (you can configure this via env variable or database)
      const freeTrialCourseId = process.env.FREE_TRIAL_COURSE_ID;

      // Create free trial access record
      await db.freeTrialAccess.create({
        data: {
          userId: id,
          email: primaryEmail,
          courseId: freeTrialCourseId || null,
          hasUsedFreeTrial: false,
          // Set expiration to 30 days from now
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      // If there's a designated free trial course, automatically create a purchase
      // so the user has access to it
      if (freeTrialCourseId) {
        // Check if the course exists
        const course = await db.course.findUnique({
          where: { id: freeTrialCourseId },
        });

        if (course) {
          // Create a purchase record for the free trial course
          await db.purchase.create({
            data: {
              userId: id,
              courseId: freeTrialCourseId,
            },
          });

          console.log(`Free trial access granted to user ${id} for course ${freeTrialCourseId}`);
        }
      }

      return NextResponse.json({ 
        message: "User created and free trial access granted",
        userId: id 
      });
    } catch (error) {
      console.error("Error creating free trial access:", error);
      // Don't fail the webhook even if there's an error
      return NextResponse.json({ 
        message: "User created but free trial access failed",
        error: String(error)
      });
    }
  }

  // Handle user deletion (cleanup)
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      // Clean up free trial access record
      await db.freeTrialAccess.deleteMany({
        where: { userId: id },
      });

      console.log(`Cleaned up free trial access for deleted user: ${id}`);
    } catch (error) {
      console.error("Error cleaning up free trial access:", error);
    }

    return NextResponse.json({ message: "User deletion handled" });
  }

  return NextResponse.json({ message: "Webhook received" });
}

