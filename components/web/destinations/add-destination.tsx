"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
  onAddDestination: () => void;
}

export function AddDestination({ onAddDestination }: Props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !name || !location) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("location", location);

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Destination added successfully");

      // reset form
      setImage(null);
      setName("");
      setLocation("");

      onAddDestination(); // refresh list
      setOpen(false); // ✅ CLOSE dialog
    } catch (error) {
      toast.error("Failed to upload destination");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-900 text-white hover:bg-emerald-800"
        >
          <FaPlus />
          Add Destination
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Destination</AlertDialogTitle>
            <AlertDialogDescription>
              Upload image and destination details.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Image */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mb-2"
          />

          {/* Name */}
          <Input
            value={name}
            placeholder="Destination name"
            onChange={(e) => setName(e.target.value)}
            className="mb-2"
          />

          {/* Location */}
          <Input
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            className="mb-2"
          />

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
              Cancel
            </AlertDialogCancel>

            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-600 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
