import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { GrantAccessForm } from "./_components/grant-access-form";
import { AccessList } from "./_components/access-list";

const AdminAccessPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  if (!isAdmin(userId)) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  const { data: clerkUsers } = await clerkClient.users.getUserList({
    limit: 500,
    orderBy: "-created_at",
  });

  const users = clerkUsers.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || "No email",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "No name",
    imageUrl: user.imageUrl,
  }));

  const purchases = await db.purchase.findMany({
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin - Course Access Management</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Total users: {users.length} | Total courses: {courses.length} | Total access grants: {purchases.length}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Grant Course Access</h2>
          <GrantAccessForm courses={courses} users={users} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Access Grants</h2>
          <AccessList purchases={purchases} users={users} />
        </div>
      </div>
    </div>
  );
};

export default AdminAccessPage;

