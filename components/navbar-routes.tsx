"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Shield } from "lucide-react";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { isAdmin } from "@/lib/admin";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isAdminPage = pathname?.startsWith("/admin");
  const isPlayerPage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage || isAdminPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <>
            {isAdmin(userId) && (
              <Link href="/admin/access">
                <Button size="sm" variant="ghost">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            {isTeacher(userId) && (
              <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">
                  Teacher mode
                </Button>
              </Link>
            )}
          </>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
