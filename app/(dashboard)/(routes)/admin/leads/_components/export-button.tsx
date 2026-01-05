"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
  telegramNickname: string | null;
  email: string | null;
  grade: string | null;
  createdAt: Date;
}

interface ExportButtonProps {
  leads: Lead[];
}

export const ExportButton = ({ leads }: ExportButtonProps) => {
  const handleExport = () => {
    // Преобразуем данные в формат для Excel
    const excelData = leads.map((lead) => ({
      "Имя": lead.name,
      "Телефон": lead.phoneNumber,
      "Telegram": lead.telegramNickname || "",
      "Дата создания": new Date(lead.createdAt).toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    // Создаем рабочую книгу
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Генерируем имя файла с текущей датой
    const fileName = `leads-${new Date().toISOString().split("T")[0]}.xlsx`;

    // Сохраняем файл
    XLSX.writeFile(workbook, fileName);
  };

  if (leads.length === 0) {
    return null;
  }

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="w-4 h-4 mr-2" />
      Export to Excel
    </Button>
  );
};

