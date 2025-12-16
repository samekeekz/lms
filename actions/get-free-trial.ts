import { db } from "@/lib/db";

export interface FreeTrialData {
  hasFreeTrial: boolean;
  hasUsedFreeTrial: boolean;
  courseId: string | null;
  expiresAt: Date | null;
  isExpired: boolean;
}

export const getFreeTrialAccess = async (userId: string): Promise<FreeTrialData | null> => {
  try {
    const freeTrialAccess = await db.freeTrialAccess.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!freeTrialAccess) {
      return null;
    }

    const isExpired = freeTrialAccess.expiresAt 
      ? new Date() > freeTrialAccess.expiresAt 
      : false;

    return {
      hasFreeTrial: true,
      hasUsedFreeTrial: freeTrialAccess.hasUsedFreeTrial,
      courseId: freeTrialAccess.courseId,
      expiresAt: freeTrialAccess.expiresAt,
      isExpired,
    };
  } catch (error) {
    console.error("[GET_FREE_TRIAL_ACCESS]", error);
    return null;
  }
};

export const grantFreeTrialAccess = async (
  userId: string, 
  email?: string,
  courseId?: string
): Promise<boolean> => {
  try {
    const existingAccess = await db.freeTrialAccess.findUnique({
      where: { userId },
    });

    if (existingAccess) {
      console.log(`User ${userId} already has free trial access`);
      return true;
    }

    const freeTrialCourseId = courseId || process.env.FREE_TRIAL_COURSE_ID;

    await db.freeTrialAccess.create({
      data: {
        userId,
        email,
        courseId: freeTrialCourseId || null,
        hasUsedFreeTrial: false,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    if (freeTrialCourseId) {
      const course = await db.course.findUnique({
        where: { id: freeTrialCourseId },
      });

      if (course) {
        const existingPurchase = await db.purchase.findUnique({
          where: {
            userId_courseId: {
              userId,
              courseId: freeTrialCourseId,
            },
          },
        });

        if (!existingPurchase) {
          await db.purchase.create({
            data: {
              userId,
              courseId: freeTrialCourseId,
            },
          });
        }
      }
    }

    return true;
  } catch (error) {
    console.error("[GRANT_FREE_TRIAL_ACCESS]", error);
    return false;
  }
};

export const markFreeTrialUsed = async (userId: string): Promise<boolean> => {
  try {
    await db.freeTrialAccess.update({
      where: { userId },
      data: { hasUsedFreeTrial: true },
    });
    return true;
  } catch (error) {
    console.error("[MARK_FREE_TRIAL_USED]", error);
    return false;
  }
};

