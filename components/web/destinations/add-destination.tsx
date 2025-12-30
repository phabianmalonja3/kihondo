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

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";


interface Props{
onAddDestination: ()=>void
}


export function AddDestination({onAddDestination}: Props) {
 
  const [image, setImage] = useState<File | null>(null);
  
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !location || !name) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("location", location);
 

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/api/destinations", {
        method: "POST",
        body: formData,
      });

      
      console.log(res.body)

      if (!res.ok) throw new Error("Upload failed" );

      toast.success("Image uploaded successfully");


      setImage(null);
    setLocation('')
    setName('')
        onAddDestination(); // Notify parent to refresh gallery
    } catch (error) {
      toast.error("Failed to upload image " +error );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-emerald-800">
          <FaPlus />
          Add Destination
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Image</AlertDialogTitle>
            <AlertDialogDescription>
              Select category, image and add description.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* Image */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border rounded-md p-2 text-sm mb-2"
          />
          <Input value={name} placeholder="Destination Name" onChange={(e) => setName(e.target.value)} className="mb-2"/>
          <Input value={location} placeholder="Location Name" onChange={(e) => setLocation(e.target.value)} className="mb-2"/>
          
         

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
              Cancel
            </AlertDialogCancel>

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
