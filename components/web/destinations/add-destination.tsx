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
import { FaPlus, FaTimes, FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "sonner";
import { useRefresh } from "@/context/RefreshContext";
interface Props {
  onAddDestination: () => void;
}

interface ImagePreview {
  file: File;
  preview: string;
  progress: number;
}
export function AddDestination({ onAddDestination }: Props) {
  const [open, setOpen] = useState(false);

  const {refreshData} = useRefresh()

  const [image, setImage] = useState<ImagePreview | null>(null);
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
    formData.append("image", image.file);
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

      refreshData()
      // onAddDestination(); // refresh list
      setOpen(false); // ✅ CLOSE dialog
    } catch (error) {
      toast.error("Failed to upload destination");
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
