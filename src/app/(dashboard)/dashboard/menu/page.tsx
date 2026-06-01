"use client";

import { useDashboardMenu } from "@/features/dashboard/hooks/useDashboardMenu";
import DataTable from "@/features/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  categoryName?: string;
  isAvailable: boolean;
}

export default function DashboardMenuPage() {
  const { fetchMenu, loading } = useDashboardMenu();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const fetched = useRef(false);

  const loadData = useCallback(async () => {
    const data = await fetchMenu();
    if (data && data.data) {
      setMenus(data.data as MenuItem[]);
    }
  }, [fetchMenu]);

  useEffect(() => {
    if (!fetched.current) {
      void loadData();
      fetched.current = true;
    }
  }, [loadData]);

  const columns = [
    { header: "Name", accessor: "name" },
    {
      header: "Price",
      render: (row: MenuItem) => `IDR ${row.price.toLocaleString()}`,
    },
    {
      header: "Category",
      render: (row: MenuItem) => row.categoryName || "-",
    },
    {
      header: "Availability",
      render: (row: MenuItem) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${row.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {row.isAvailable ? "Available" : "Sold Out"}
        </span>
      ),
    },
  ];

  if (loading && menus.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>
      <DataTable data={menus} columns={columns} />
    </div>
  );
}
