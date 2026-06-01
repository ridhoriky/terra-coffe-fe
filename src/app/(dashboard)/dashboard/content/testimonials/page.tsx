"use client";

import { useTestimonials } from "@/features/dashboard/hooks/useTestimonials";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Star } from "lucide-react";
import type { Testimonial } from "@/features/landing/types";

export default function TestimonialsPage() {
  const { testimonials, loading, deleteTestimonial, createTestimonial } =
    useTestimonials();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    message: "",
    avatarUrl: "",
    sortOrder: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted successfully");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete testimonial";
      toast.error(message);
    }
  };

  const handleAdd = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await createTestimonial(formData);
      setIsAdding(false);
      setFormData({
        name: "",
        rating: 5,
        message: "",
        avatarUrl: "",
        sortOrder: 0,
      });
      toast.success("Testimonial added successfully!");
    } catch {
      toast.error("Failed to add testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && testimonials.length === 0) {
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
          Testimonials Management
        </h2>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form
              onSubmit={(e) => {
                void handleAdd(e);
              }}
            >
              <DialogHeader>
                <DialogTitle>Add New Testimonial</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    placeholder="Elara Vance"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Their brown sugar oat latte is transformative..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
                  <Input
                    id="avatarUrl"
                    placeholder="https://example.com/avatar.jpg"
                    value={formData.avatarUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, avatarUrl: e.target.value })
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
                        sortOrder: parseInt(e.target.value),
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
                  Save Testimonial
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
                <TableHead>Customer Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((item: Testimonial) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {item.rating}{" "}
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={item.message}>
                    {item.message}
                  </TableCell>
                  <TableCell>{item.sortOrder}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => {
                        if (confirm("Delete this testimonial?"))
                          void handleDelete(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {testimonials.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground h-24 text-center"
                  >
                    No testimonials found.
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
