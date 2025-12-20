"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, User, MessageSquare, Mail, Calendar } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
  telegramNickname: string | null;
  email: string | null;
  grade: string | null;
  createdAt: Date;
}

interface LeadsListProps {
  leads: Lead[];
}

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

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const LeadsList = ({ leads }: LeadsListProps) => {
  if (leads.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No leads yet. Leads will appear here when users submit the form on the landing page.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <Card key={lead.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">{lead.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Added {formatDate(lead.createdAt)} ({getTimeAgo(lead.createdAt)})
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                New Lead
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{lead.phoneNumber}</p>
                </div>
              </div>

              {lead.telegramNickname && (
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telegram</p>
                    <p className="text-sm font-medium">{lead.telegramNickname}</p>
                  </div>
                </div>
              )}

              {lead.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{lead.email}</p>
                  </div>
                </div>
              )}

              {lead.grade && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Grade</p>
                    <p className="text-sm font-medium">{lead.grade}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

