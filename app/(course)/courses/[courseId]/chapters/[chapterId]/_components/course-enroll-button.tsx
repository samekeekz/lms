"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";

interface ICourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: ICourseEnrollButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get Telegram username from environment variable or use default
  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "samekee";
  const telegramLink = `https://t.me/${telegramUsername}`;

  return (
    <>
      <Button 
        size="sm" 
        className="w-full md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Enroll for {formatPrice(price)}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Купить курс</DialogTitle>
            <DialogDescription className="pt-4">
              Если вы хотите купить этот курс, напишите{" "}
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                {telegramUsername}
              </a>
              {" "}в Telegram
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Закрыть
            </Button>
            <Button
              onClick={() => {
                window.open(telegramLink, "_blank", "noopener,noreferrer");
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Написать в Telegram
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
