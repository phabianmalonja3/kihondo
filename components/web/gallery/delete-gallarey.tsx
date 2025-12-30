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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export function DeleteGallery( {gallery, onDelete}: {gallery: string, onDelete?: () => void}) {
  
  const [loading, setLoading] = useState(false);
  
    const handleDelete = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galleries/${gallery}`, {
          method: "DELETE",
        });                 

        if (res.ok) {
         
            toast.success("Gallery deleted successfully");
            if(onDelete) onDelete();
        }
        } catch (error) {
            
            toast.error("Failed to delete gallery");
        }
        setLoading(false);
    };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
       <button className="text-red-600 hover:text-red-800">
                              <FaTrash />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this gallery? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-400">

            {loading ? "Deleting..." : "Delete"}
            
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
