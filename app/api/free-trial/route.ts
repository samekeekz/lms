import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getFreeTrialAccess, grantFreeTrialAccess } from "@/actions/get-free-trial";

// GET - Check free trial status for current user
export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const freeTrialData = await getFreeTrialAccess(userId);

    return NextResponse.json({
      hasFreeTrial: freeTrialData?.hasFreeTrial || false,
      hasUsedFreeTrial: freeTrialData?.hasUsedFreeTrial || false,
      courseId: freeTrialData?.courseId || null,
      expiresAt: freeTrialData?.expiresAt || null,
      isExpired: freeTrialData?.isExpired || false,
    });
  } catch (error) {
    console.error("[FREE_TRIAL_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST - Grant free trial access to current user (self-service)
export async function POST() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user already has free trial
    const existingTrial = await getFreeTrialAccess(userId);
    
    if (existingTrial?.hasFreeTrial) {
      return NextResponse.json({
        success: true,
        message: "Free trial already active",
        data: existingTrial,
      });
    }

    // Grant free trial access
    const success = await grantFreeTrialAccess(userId);

    if (success) {
      const trialData = await getFreeTrialAccess(userId);
      return NextResponse.json({
        success: true,
        message: "Free trial access granted",
        data: trialData,
      });
    } else {
      return new NextResponse("Failed to grant free trial", { status: 500 });
    }
  } catch (error) {
    console.error("[FREE_TRIAL_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

