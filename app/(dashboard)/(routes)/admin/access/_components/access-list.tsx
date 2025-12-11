"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { Trash2, Loader2, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};

interface AccessListProps {
  purchases: {
    id: string;
    userId: string;
    courseId: string;
    createdAt: Date;
    course: {
      id: string;
      title: string;
      imageUrl: string | null;
    };
  }[];
  users: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
  }[];
}

export const AccessList = ({ purchases, users }: AccessListProps) => {
  const router = useRouter();
  const [revoking, setRevoking] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getUserInfo = (userId: string) => {
    return users.find((u) => u.id === userId);
  };

  const onRevoke = async (userId: string, courseId: string, purchaseId: string) => {
    if (!confirm("Are you sure you want to revoke access for this user?")) {
      return;
    }

    try {
      setRevoking(purchaseId);
      await axios.post("/api/admin/revoke-access", {
        targetUserId: userId,
        courseId: courseId,
      });

      toast.success("Access revoked successfully");
      router.refresh();
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized - Admin access required");
      } else {
        toast.error("Failed to revoke access");
      }
    } finally {
      setRevoking(null);
    }
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const user = getUserInfo(purchase.userId);
    const searchLower = searchTerm.toLowerCase();
    return (
      purchase.userId.toLowerCase().includes(searchLower) ||
      purchase.course.title.toLowerCase().includes(searchLower) ||
      user?.email.toLowerCase().includes(searchLower) ||
      user?.fullName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by user name, email, or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredPurchases.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            {searchTerm ? "No matching access grants found" : "No access grants yet"}
          </p>
        ) : (
          filteredPurchases.map((purchase) => {
            const user = getUserInfo(purchase.userId);
            return (
              <div
                key={purchase.id}
                className="flex items-start gap-3 justify-between p-3 border rounded-lg hover:bg-slate-50 transition"
              >
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center mt-1 flex-shrink-0">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-sm">{purchase.course.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      Active
                    </Badge>
                  </div>
                  {user ? (
                    <p className="text-sm text-muted-foreground">
                      {user.fullName} ({user.email})
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      User ID: <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{purchase.userId}</code>
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Granted {getTimeAgo(purchase.createdAt)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={revoking === purchase.id}
                  onClick={() => onRevoke(purchase.userId, purchase.courseId, purchase.id)}
                  className="flex-shrink-0"
                >
                  {revoking === purchase.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

