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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "sonner";

import { useRefresh } from "@/context/RefreshContext";

interface Category {
  id: number;
  name: string;
}

interface AddImageProps {
  onImageAdded: () => void;
}

interface ImagePreview {
  file: File;
  preview: string;
  progress: number;
}

export function AddImage({ onImageAdded }: AddImageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
   const [image, setImage] = useState<ImagePreview | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId || !image || !description) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("image", image.file);
    formData.append("description", description);

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/galleries`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Image uploaded successfully");

      // reset form
      setCategoryId("");
      setImage(null);
      setDescription("");

      onImageAdded(); // refresh gallery
      setOpen(false); // ✅ CLOSE dialog
    } catch (error) {
      toast.error("Failed to upload image");
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
          Add Image
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

          {/* Category */}
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Image */}
          

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description..."
            className="w-full border rounded-md p-2 text-sm resize-none mb-2"
            rows={3}
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
