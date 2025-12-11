"use client";

import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const AuthLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoaded } = useAuth();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!isLoaded || isInitialLoad) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-slate-600" />
          <p className="text-sm text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

