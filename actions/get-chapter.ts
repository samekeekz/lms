import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";
import next from "next";

interface IGetChapterProps {
  userId: string;
  chapterId: string;
  courseId: string;
}
export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: IGetChapterProps) => {
  try {
    const isCreaterCourse = await db.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        userId: true,
      },
    });

    let purchase = null;
    if (isCreaterCourse?.userId !== userId) {
      purchase = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });
    }

    // const purchase = await db.purchase.findUnique({
    //   where: {
    //     userId_courseId: {
    //       userId,
    //       courseId,
    //     },
    //   },
    // });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
      include: {
        quiz: {
          where: {
            isPublished: true,
          },
          include: {
            questions: {
              include: {
                options: true,
              },
              orderBy: {
                position: "asc",
              },
            },
          },
        },
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    // if (purchase) {
    //   attachments = await db.attachment.findMany({
    //     where: {
    //       courseId: courseId,
    //     },
    //   });
    // }

    // if (chapter.isFree || purchase) {
    //   nextChapter = await db.chapter.findFirst({
    //     where: {
    //       courseId: courseId,
    //       isPublished: true,
    //       position: {
    //         gt: chapter?.position,
    //       },
    //     },
    //     orderBy: {
    //       position: "asc",
    //     },
    //   });
    // }

    if (isCreaterCourse?.userId === userId || purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || isCreaterCourse?.userId === userId || purchase) {
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    const quiz = chapter?.quiz || null;

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      quiz,
    };
  } catch (error) {
    console.log("Get chapter", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      quiz: null,
    };
  }
};
