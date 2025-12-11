"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader2, User, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface GrantAccessFormProps {
  courses: {
    id: string;
    title: string;
    imageUrl: string | null;
  }[];
  users: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    imageUrl: string;
  }[];
}

interface UserCourse {
  id: string;
  course: {
    id: string;
    title: string;
    imageUrl: string | null;
  };
}

export const GrantAccessForm = ({ courses, users }: GrantAccessFormProps) => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingUserCourses, setLoadingUserCourses] = useState(false);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);

  const selectedUser = users.find((u) => u.id === userId);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!userId) {
        setUserCourses([]);
        setCourseId("");
        return;
      }

      try {
        setLoadingUserCourses(true);
        const response = await axios.get(`/api/admin/user-courses?userId=${userId}`);
        setUserCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch user courses", error);
        toast.error("Failed to load user's courses");
      } finally {
        setLoadingUserCourses(false);
      }
    };

    fetchUserCourses();
  }, [userId]);

  const userCourseIds = userCourses.map((uc) => uc.course.id);
  const availableCourses = courses.filter((course) => !userCourseIds.includes(course.id));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !courseId) {
      toast.error("Please select both user and course");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/admin/grant-access", {
        targetUserId: userId,
        courseId: courseId,
      });

      if (response.data.alreadyExists) {
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
      }

      // Reset course selection and refresh user's courses
      setCourseId("");

      // Refresh user's courses list
      const coursesResponse = await axios.get(`/api/admin/user-courses?userId=${userId}`);
      setUserCourses(coursesResponse.data);

      router.refresh();
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized - Admin access required");
      } else if (error.response?.status === 404) {
        toast.error("Course not found");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 border rounded-lg p-4">
      <div className="space-y-2">
        <Label htmlFor="user">Select User</Label>
        <Combobox
          options={users.map((user) => ({
            label: `${user.fullName} (${user.email})`,
            value: user.id,
          }))}
          value={userId}
          onChange={setUserId}
        />
        {selectedUser && (
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{selectedUser.fullName}</p>
              <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Total users available: {users.length}
        </p>
      </div>

      {userId && (
        <>
          {loadingUserCourses ? (
            <div className="flex items-center justify-center p-4 border rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-muted-foreground">Loading user&apos;s courses...</span>
            </div>
          ) : (
            <>
              {userCourses.length > 0 && (
                <div className="space-y-2">
                  <Label>User Already Has Access To:</Label>
                  <div className="border rounded-lg p-3 bg-green-50 space-y-2 max-h-[200px] overflow-y-auto">
                    {userCourses.map((uc) => (
                      <div
                        key={uc.id}
                        className="flex items-center gap-2 text-sm p-2 bg-white rounded border"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="flex-1">{uc.course.title}</span>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="course">
                  Select Course to Grant Access
                  {availableCourses.length === 0 && (
                    <span className="text-muted-foreground ml-2 text-xs">
                      (User has access to all courses)
                    </span>
                  )}
                </Label>
                {availableCourses.length > 0 ? (
                  <>
                    <Combobox
                      options={availableCourses.map((course) => ({
                        label: course.title,
                        value: course.id,
                      }))}
                      value={courseId}
                      onChange={setCourseId}
                    />
                    <p className="text-xs text-muted-foreground">
                      {availableCourses.length} course(s) available to grant
                    </p>
                  </>
                ) : (
                  <div className="p-3 border rounded-lg bg-slate-50 text-sm text-muted-foreground text-center">
                    This user already has access to all published courses
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {!userId && (
        <div className="p-4 border rounded-lg bg-slate-50 text-sm text-muted-foreground text-center">
          Select a user to see their current access and grant new access
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading || !userId || !courseId || availableCourses.length === 0}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Granting Access...
          </>
        ) : (
          "Grant Access"
        )}
      </Button>
    </form>
  );
};

