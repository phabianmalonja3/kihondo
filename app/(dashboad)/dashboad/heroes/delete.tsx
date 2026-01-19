"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  hero: string;
  onDelete: () => void;
  // Add these new props to satisfy TypeScript and control the state
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteHeroes({ hero, onDelete, open, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    // Prevent the event from bubbling if necessary
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes/${hero}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Hero deleted successfully");
        onDelete();
      } else {
        toast.error("Failed to delete hero");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    // We pass the controlled state here
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {/* Trigger is removed because it's now handled by the DropdownMenu 
         in the parent component.
      */}
      <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-slate-900">
            Confirm Delete
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500">
            Are you sure you want to delete this hero? This action cannot be undone and will remove it from the homepage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-xl border-slate-200 font-semibold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white hover:bg-red-700 rounded-xl font-semibold"
          >
            {loading ? "Deleting..." : "Delete Hero"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}