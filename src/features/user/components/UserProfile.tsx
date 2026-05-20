"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfile } from "../hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function UserProfile() {
  const { profile, isLoading, isUpdating, error, success, updateProfile } =
    useProfile();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      avatarUrl: "",
    },
  });

  // Populate form values when profile fetches successfully
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("avatarUrl", profile.avatarUrl || "");
    }
  }, [profile, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    await updateProfile({
      name: data.name,
      avatarUrl: data.avatarUrl || "",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Get initial letters for avatar placeholder
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-2xl rounded-3xl border border-neutral-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] md:p-10"
    >
      <div className="mb-8 flex flex-col items-center border-b border-neutral-100 pb-8 text-center md:flex-row md:items-start md:text-left">
        <div className="relative mb-4 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#F7F5F0] text-2xl font-bold text-[#C4622D] shadow-inner md:mr-6 md:mb-0">
          {profile?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="h-full w-full rounded-2xl object-cover"
              onError={(e) => {
                // If avatar fails to load, fallback to initials
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : null}
          <span className="absolute">{initials}</span>
        </div>

        <div className="grow">
          <h2 className="font-heading text-espresso-dark text-2xl font-semibold">
            {profile?.name}
          </h2>
          <p className="mt-1 flex items-center justify-center text-sm text-neutral-500 md:justify-start">
            <Mail className="mr-1.5 h-4 w-4" /> {profile?.email}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800">
              Role:{" "}
              <span className="ml-1 font-semibold uppercase">
                {profile?.role}
              </span>
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                profile?.isVerified
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700",
              )}
            >
              {profile?.isVerified ? (
                <>
                  <CheckCircle className="mr-1 h-3 w-3" /> Verified
                </>
              ) : (
                "Unverified"
              )}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#F7F5F0] px-2.5 py-0.5 text-xs font-medium text-[#C4622D]">
              <Award className="mr-1 h-3 w-3" /> Provider:{" "}
              <span className="ml-1 font-semibold uppercase">
                {profile?.authProvider}
              </span>
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="font-heading text-espresso-dark text-lg font-medium">
          Edit Profile Information
        </h3>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
            Profile updated successfully!
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-neutral-700"
            >
              Display Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              className={cn(
                "focus:ring-primary focus:border-primary h-12 rounded-xl border-neutral-200 transition-all",
                errors.name && "border-red-500 focus:ring-red-500",
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="avatarUrl"
              className="text-sm font-medium text-neutral-700"
            >
              Avatar Image URL
            </Label>
            <Input
              id="avatarUrl"
              placeholder="https://example.com/avatar.jpg"
              {...register("avatarUrl")}
              className={cn(
                "focus:ring-primary focus:border-primary h-12 rounded-xl border-neutral-200 transition-all",
                errors.avatarUrl && "border-red-500 focus:ring-red-500",
              )}
            />
            {errors.avatarUrl && (
              <p className="text-xs text-red-500">{errors.avatarUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-neutral-400"
            >
              Email Address (Cannot be changed)
            </Label>
            <Input
              id="email"
              value={profile?.email || ""}
              disabled
              className="h-12 cursor-not-allowed rounded-xl border-neutral-200 bg-neutral-50 text-neutral-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isUpdating || !isDirty}
            className="h-12 rounded-xl bg-[#C4622D] px-8 font-medium text-white shadow-lg shadow-[#C4622D]/20 transition-all hover:bg-[#C4622D]/90 disabled:opacity-50"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
