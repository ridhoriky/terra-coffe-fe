"use client";

import { useSettings } from "@/features/dashboard/hooks/useSettings";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import type { SiteSettings } from "@/features/landing/types";

export default function SettingsPage() {
  const { settings, loading, error, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    locationText: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [prevSettings, setPrevSettings] = useState<SiteSettings | null>(null);

  // Sync formData with settings during render to avoid cascading renders and satisfy linter
  if (settings && settings !== prevSettings) {
    setPrevSettings(settings);
    setFormData({
      heroTitle: settings.heroTitle || "",
      heroSubtitle: settings.heroSubtitle || "",
      aboutText: settings.aboutText || "",
      locationText: settings.locationText || "",
      contactEmail: settings.contactEmail || "",
      contactPhone: settings.contactPhone || "",
    });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateSettings(formData);
      toast.success(
        "Settings updated successfully and landing page revalidated!",
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update settings";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && !settings) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-md border p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Site Content Settings
        </h2>
      </div>

      <Card>
        <form
          onSubmit={(e) => {
            void handleSave(e);
          }}
        >
          <CardHeader>
            <CardTitle>Landing Page Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  name="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  placeholder="Rooted in Every Sip"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  name="heroSubtitle"
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  rows={3}
                  placeholder="A sanctuary from the city's pace..."
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="aboutText">About Us Content</Label>
                <Textarea
                  id="aboutText"
                  name="aboutText"
                  value={formData.aboutText}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Terra Coffee was born from a simple desire..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="locationText">Location Address</Label>
                <Input
                  id="locationText"
                  name="locationText"
                  value={formData.locationText}
                  onChange={handleChange}
                  placeholder="124 Artisanal Lane, Heritage District"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="hello@terracoffee.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="(212) 555-0198"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
