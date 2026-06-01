"use client";

import DataTable from "@/features/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function DashboardCategoriesPage() {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Menu Count", render: () => "0" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Categories Management
        </h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <DataTable data={[] as Category[]} columns={columns} />
    </div>
  );
}
