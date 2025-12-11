import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
        <p className="text-sm text-slate-600">Loading course...</p>
      </div>
    </div>
  );
}

