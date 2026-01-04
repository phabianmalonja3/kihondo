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
import { FaTrash, FaUpload } from "react-icons/fa";


interface ImagePreview {
  file: File;
  preview: string;
  progress: number;
}
export function HeroDialog({ onSave }: { onSave: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
   const [image, setImage] = useState<ImagePreview | null>(null);
 
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
    formData.append("image", image.file);

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

  
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return ;

    if (image) {
      URL.revokeObjectURL(image.preview)
      
    }

    const newImage :ImagePreview={
      file,
      preview:URL.createObjectURL(file),
      progress:0
    }


    setImage(newImage);

   
  };


  const removeImage = () => {

    if(image){

      URL.revokeObjectURL(image.preview)

    }
    setImage(null);
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
       <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition my-3">
                                       <FaUpload className="text-xl mb-2 text-muted-foreground" />
                                       <p className="text-sm font-medium">Upload event image</p>
                                       <p className="text-xs text-muted-foreground">Click to browse </p>
                                       <Input type="file" accept="image/*"  className="hidden" onChange={handleImageChange} />
                         </label>
                          {image  && (
                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                               
                                 <div  className="relative border rounded-lg overflow-hidden">
                                   <img src={image.preview} alt="preview" className="h-28 w-full object-cover" />
                                   <button
                                     type="button"
                                     onClick={() => removeImage()}
                                     className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded"
                                   >
                                     <FaTrash size={10} />
                                   </button>
                                   <div className="h-1 bg-muted">
                                     <div className="h-1 bg-emerald-600 transition-all" style={{ width: `${image.progress}%` }} />
                                   </div>
                                 </div>
                              
                             </div>
                           )}

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
