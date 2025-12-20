"use client";

import { BarChart, Compass, Layout, List, Shield, Award, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Award,
    label: "Free Quiz",
    href: "/free-quiz",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const adminRoutes = [
  {
    icon: Shield,
    label: "Manage Access",
    href: "/admin/access",
  },
  {
    icon: Award,
    label: "Free Quiz",
    href: "/admin/free-quiz",
  },
  {
    icon: Users,
    label: "Leads",
    href: "/admin/leads",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");

  const routes = isAdminPage ? adminRoutes : isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.label}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
