import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { LeadsList } from "./_components/leads-list";

const AdminLeadsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  if (!isAdmin(userId)) {
    return redirect("/");
  }

  const leads = await db.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin - Leads Management</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Total leads: {leads.length}
        </p>
      </div>

      <div className="space-y-4">
        <LeadsList leads={leads} />
      </div>
    </div>
  );
};

export default AdminLeadsPage;

