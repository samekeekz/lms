import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar = ({ onItemClick }: SidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes onItemClick={onItemClick} />
      </div>
    </div>
  );
};
