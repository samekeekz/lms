import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses, getPublicCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface ISearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: ISearchPageProps) => {
  const { userId } = auth();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Use public courses if not authenticated, otherwise use authenticated courses
  const courses = userId
    ? await getCourses({
        userId,
        ...searchParams,
      })
    : await getPublicCourses({
        ...searchParams,
      });

  return (
    <>
      {/* Show sign-up prompt for non-authenticated users */}
      {!userId && (
        <div className="px-6 pt-6 pb-4 bg-[#f6f8f7] border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#111714] mb-2">Поиск курсов</h1>
              <p className="text-[#9eb7a8] text-sm md:text-base">
                Просматривайте доступные курсы. Зарегистрируйтесь, чтобы получить полный доступ к материалам.
              </p>
            </div>
            <Link href="/sign-up">
              <Button className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold whitespace-nowrap">
                <LogIn className="w-4 h-4 mr-2" />
                Зарегистрироваться
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;

