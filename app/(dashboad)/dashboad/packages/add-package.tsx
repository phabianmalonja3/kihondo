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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
  onAddPackage: () => void;
}

interface Option {
  id: number;
  options: string;
}

interface Location {
  id: number;
  name: string;
}

interface ImagePreview {
  file: File;
  preview: string;
}

export function AddPackage({ onAddPackage }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImagePreview | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  /* Fetch initial data when dialog opens */
  useEffect(() => {
    async function fetchData() {
      try {
        const [optRes, locRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/options`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`)
        ]);

        if (!optRes.ok || !locRes.ok) throw new Error();

        const optData = await optRes.json();
        const locData = await locRes.json();

        setOptions(optData.options || []);
        setLocations(locData.locations || []);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load options or locations");
      }
    }
    if (open) fetchData();
  }, [open]);

  const toggleOption = (id: number) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (image) URL.revokeObjectURL(image.preview);

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeImage = () => {
    if (image) URL.revokeObjectURL(image.preview);
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      toast.error("Please select a location");
      return;
    }

    const formData = new FormData(e.currentTarget);

    // Append standard fields managed by state
    if (image) formData.append("image", image.file);
    formData.append("location_id", selectedLocation);
    
    // Append options as an array
    selectedOptions.forEach((id) => 
      formData.append("options[]", id.toString())
    );

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("Package added and saved to database");
      
      // Cleanup and Close
      setImage(null);
      setSelectedOptions([]);
      setSelectedLocation("");
      onAddPackage();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to add package");
    } finally {
      setLoading(false);
    }
  };

  const selectedNames = options
    .filter((o) => selectedOptions.includes(o.id))
    .map((o) => o.options)
    .join(", ");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800">
          <FaPlus /> Add Package
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md max-h-[95vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Travel Package</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details. These will be stored in your database to prevent manual re-entry later.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Package Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Name</label>
            <Input name="name" placeholder="e.g. Luxury Paradise Stay" required />
          </div>

          {/* Price, Days, and Nights Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Price</label>
              <Input type="number" name="price" placeholder="0.00" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Days</label>
              <Input type="number" name="days" placeholder="Days" min={0} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Nights</label>
              <Input type="number" name="nights" placeholder="Nights" min={0} required />
            </div>
          </div>

          {/* Location Selection */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Destinations</SelectLabel>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id.toString()}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Inclusions / Options */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Inclusions</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  type="button" // Prevents accidental form submission
                  className="w-full justify-start overflow-hidden text-left font-normal"
                >
                  <span className="truncate">{selectedNames || "Select what's included"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <div className="space-y-2 max-h-48 overflow-y-auto p-1">
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`opt-${option.id}`}
                        checked={selectedOptions.includes(option.id)}
                        onCheckedChange={() => toggleOption(option.id)}
                      />
                      <label htmlFor={`opt-${option.id}`} className="text-sm cursor-pointer select-none">
                        {option.options}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Custom Location/Address */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Address Detail</label>
            <Input name="location" placeholder="Specific resort or street" />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Cover Image</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition">
              <FaUpload className="text-xl mb-1 text-muted-foreground" />
              <p className="text-xs font-medium">Click to upload image</p>
              <Input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* Image Preview Window */}
          {image && (
            <div className="relative border rounded-lg overflow-hidden h-32 w-full bg-slate-100">
              <img src={image.preview} alt="preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition"
              >
                <FaTrash size={12} />
              </button>
            </div>
          )}

          <AlertDialogFooter className="pt-2">
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <Button 
              type="submit" 
              disabled={loading} 
              className="bg-emerald-700 hover:bg-emerald-600 text-white min-w-[100px]"
            >
              {loading ? "Saving..." : "Save Package"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}