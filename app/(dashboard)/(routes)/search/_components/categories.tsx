"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcGlobe,
  FcMultipleDevices,
  FcPuzzle,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface ICategoriesProps {
  items: Category[];
}

export const Categories = ({ items }: ICategoriesProps) => {
  const iconMap: Record<Category["name"], IconType> = {
    // "Computer Science": FcMultipleDevices,
    Math: FcEngineering,
    "Critical Thinking": FcPuzzle,
    English: FcGlobe,
  };

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
