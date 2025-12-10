"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface ICourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: ICourseEnrollButtonProps) => {
  return (
    <Button size="sm" className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
