import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses, getPublicCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

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

