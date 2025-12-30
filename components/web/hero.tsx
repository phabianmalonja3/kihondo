"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function HeroDialog({ onSave }: { onSave: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Correct validation
    if (!title || !subtitle || !image) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/heroes`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      // ✅ Success
      toast.success("Hero added successfully");
      onSave();

      // ✅ Reset form
      setTitle("");
      setSubtitle("");
      setImage(null);

      // ✅ Close dialog
      setOpen(false);
    } catch (error) {
      toast.error("Failed to upload hero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-emerald-800 text-white hover:bg-emerald-700"
        >
          + Add Hero
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Hero</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new hero section.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="hero-title">Title</Label>
            <Input
              id="hero-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          {/* Subtitle */}
          <div className="grid gap-2">
            <Label htmlFor="hero-subtitle">Subtitle</Label>
            <Input
              id="hero-subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle"
              required
            />
          </div>

          {/* Image */}
          <div className="grid gap-2">
            <Label htmlFor="hero-image">Hero Image</Label>
            <Input
              id="hero-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-600 text-white"
            >
              {loading ? "Saving..." : "Save Hero"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
