"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FaPlus, FaUpload, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

// --- VALIDATION IMPORTS ---
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

/* ---------------- TYPES & SCHEMA ---------------- */

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category_id: z.string().min(1, "Please select a category"),
  location: z.string().min(3, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  onAddEvent: () => void;
}

interface Option {
  id: number;
  name: string;
}

interface ImagePreview {
  file: File;
  preview: string;
  progress: number;
}

/* ---------------- COMPONENT ---------------- */

export function AddEvent({ onAddEvent }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [images, setImages] = useState<ImagePreview[]>([]);

  // 1. Initialize React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category_id: "",
      location: "",
      description: "",
    },
  });

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data = await res.json();
        setOptions(data.categories);
      } catch {
        toast.error("Failed to fetch categories");
      }
    }
    fetchOptions();
  }, []);

  /* ---------------- IMAGE HANDLERS ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: ImagePreview[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));

    setImages((prev) => [...prev, ...newImages]);

    newImages.forEach((_, idx) => {
      let value = 0;
      const interval = setInterval(() => {
        value += 10;
        setImages((prev) =>
          prev.map((img, i) =>
            i === prev.length - newImages.length + idx
              ? { ...img, progress: value }
              : img
          )
        );
        if (value >= 100) clearInterval(interval);
      }, 120);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (values: FormValues) => {
    if (images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category_id", values.category_id);
    formData.append("location", values.location);
    formData.append("description", values.description);

    images.forEach((img) => formData.append("images[]", img.file));

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("Event added successfully");
      form.reset();
      setImages([]);
      onAddEvent();
      setOpen(false);
    } catch {
      toast.error("Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-emerald-900">
          <FaPlus /> Add Event
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">Create a new event</AlertDialogTitle>
              <p className="text-sm text-muted-foreground">Upload images and event details</p>
            </AlertDialogHeader>

            {/* Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField 
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl className="w-full">
                      <Input placeholder="Event Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem >
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {options.map((option) => (
                            <SelectItem key={option.id} value={option.id.toString()}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Location of the event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description of the event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload box */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition">
              <FaUpload className="text-xl mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Upload event images</p>
              <p className="text-xs text-muted-foreground">Click to browse (multiple allowed)</p>
              <Input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
            </label>

            {/* Image previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative border rounded-lg overflow-hidden">
                    <img src={img.preview} alt="preview" className="h-28 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded"
                    >
                      <FaTimes size={10} />
                    </button>
                    <div className="h-1 bg-muted">
                      <div className="h-1 bg-emerald-600 transition-all" style={{ width: `${img.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading} type="button">
                Cancel
              </AlertDialogCancel>
              <Button disabled={loading} type="submit" className="bg-black text-white hover:bg-black/90">
                {loading ? "Saving..." : "Continue"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}