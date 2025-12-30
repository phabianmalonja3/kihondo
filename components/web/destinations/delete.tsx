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

interface Props{
    destination: string,
    onDelete: () => void
}

export function DeleteDestination( {destination, onDelete}: Props) {
  
  const [loading, setLoading] = useState(false);
  
    const handleDelete = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/destinations/${destination}`, {
          method: "DELETE",
        });                 

        if (res.ok) {
         
        toast.success("destination deleted successfully");
          onDelete();
        }
        } catch (error) {
            
            toast.error("Failed to delete destination");
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
            Are you sure you want to delete this destination? This action cannot be undone.
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
