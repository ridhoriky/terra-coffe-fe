"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  header: string;
  accessor?: keyof T | string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.length > 0 ? (
              columns.map((col, i) => (
                <TableHead key={i} className="font-bold">
                  {col.header}
                </TableHead>
              ))
            ) : (
              <TableHead>No Columns Defined</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => {
                  let content: React.ReactNode = "-";
                  if (col.render) {
                    content = col.render(row);
                  } else if (col.accessor) {
                    content = (row as Record<string, unknown>)[
                      col.accessor as string
                    ] as React.ReactNode;
                  }
                  return <TableCell key={colIndex}>{content}</TableCell>;
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length || 1}
                className="text-muted-foreground h-24 text-center"
              >
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
