"use client";

import { useGallery } from "@/features/dashboard/hooks/useGallery";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { GalleryItem } from "@/features/landing/types";

export default function GalleryPage() {
  const { galleries, loading, deleteGallery, createGallery } = useGallery();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    altText: "",
    sortOrder: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteGallery(id);
      toast.success("Image deleted successfully");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete image";
      toast.error(message);
    }
  };

  const handleAdd = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await createGallery(formData);
      setIsAdding(false);
      setFormData({ imageUrl: "", altText: "", sortOrder: 0 });
      toast.success("Image added successfully!");
    } catch {
      toast.error("Failed to add image");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && galleries.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Gallery Management
        </h2>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </DialogTrigger>
          <DialogContent>
            <form
              onSubmit={(e) => {
                void handleAdd(e);
              }}
            >
              <DialogHeader>
                <DialogTitle>Add New Gallery Image</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="altText">Alt Text</Label>
                  <Input
                    id="altText"
                    placeholder="Description of the image"
                    value={formData.altText}
                    onChange={(e) =>
                      setFormData({ ...formData, altText: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sortOrder: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save Image
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Alt Text</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleries.map((item: GalleryItem) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="bg-muted relative h-12 w-12 overflow-hidden rounded-md border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.altText || ""}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/100x100?text=Error";
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.altText || "-"}
                  </TableCell>
                  <TableCell>{item.sortOrder}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => {
                        if (confirm("Delete this image?"))
                          void handleDelete(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {galleries.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-muted-foreground h-24 text-center"
                  >
                    No gallery items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
