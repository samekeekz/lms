import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChapterVideoPlayer } from "./_components/chapter-video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File, Download, ExternalLink } from "lucide-react";
import { CourseProgressButton } from "./_components/course-progress-button";
import { QuizPlayer } from "./_components/quiz-player";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
    quiz,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          label="You already completed this chapter"
          variant={"success"}
        />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to access this chapter"
          variant={"warning"}
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <ChapterVideoPlayer
            chapterVideoUrl={chapter.videoUrl!}
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && !isLocked && (
            <>
              <Separator />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <File className="w-5 h-5" />
                  Прикрепленные материалы
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {attachments.map((attachment) => {
                    const fileExtension = attachment.name.split('.').pop()?.toLowerCase() || '';
                    const isPdf = fileExtension === 'pdf';
                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
                    const isDocument = ['doc', 'docx', 'txt'].includes(fileExtension);
                    
                    return (
                      <a
                        href={attachment.url}
                        key={attachment.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg hover:border-sky-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-sky-100 group-hover:bg-sky-200 flex items-center justify-center transition-colors">
                          {isPdf ? (
                            <File className="w-6 h-6 text-red-600" />
                          ) : isImage ? (
                            <File className="w-6 h-6 text-emerald-600" />
                          ) : isDocument ? (
                            <File className="w-6 h-6 text-blue-600" />
                          ) : (
                            <File className="w-6 h-6 text-sky-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate group-hover:text-sky-700 transition-colors">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 uppercase">
                            {fileExtension || 'File'}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <Download className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quiz Section */}
        {/* {quiz && !isLocked && (
          <div className="mt-8">
            <Separator />
            <QuizPlayer
              courseId={params.courseId}
              chapterId={params.chapterId}
              quiz={quiz}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ChapterIdPage;
