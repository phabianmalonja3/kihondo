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

interface Hero {
  title: string;
  subtitle: string;
  image: string;
}

export function HeroDialog({ onSave }: { onSave: (hero: Hero) => void }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, subtitle, image });
    setTitle("");
    setSubtitle("");
    setImage("");
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
              id="hero-image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              required
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Hero</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
