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
import loading from '../../app/(dashboad)/dashboad/destinations/loading';


export function HeroDialog({ onSave }: { onSave: () => void }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !location || !setSubtitle) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("subtitle", subtitle);
    formData.append("title", title);
 

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes`, {
        method: "POST",
        body: formData,
      });

      
      console.log(res.body)

      if (!res.ok) throw new Error("Upload failed" );

      onSave()
      toast.success("Image uploaded successfully");


      setImage(null);
   setTitle("")
   setSubtitle("")
        // onAddDestination(); // Notify parent to refresh gallery
    } catch (error) {
      toast.error("Failed to upload image " +error );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 hover:text-white">+ Add Hero</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Add New Hero</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new hero section for the website.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-3">
            <Label htmlFor="hero-title">Title</Label>
            <Input
              id="hero-title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="hero-subtitle">Subtitle</Label>
            <Input
              id="hero-subtitle"
              name="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="hero-image">Image URL</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border rounded-md p-2 text-sm mb-2"
          />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"> Save Hero</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
