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
import { PackageSchema } from "@/lib/schema";
import { FormControl, FormField } from "@/components/ui/form";



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
  progress: number;
}


export function AddPackage({ onAddPackage }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImagePreview | null>();
  const [options, setOptions] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  /* Fetch options */
  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/options`
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setOptions(data.options);
      } catch {
        toast.error("Failed to fetch options");
      }
    }

     async function fetchLocations() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/locations`
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setLocations(data.locations);
      } catch {
        toast.error("Failed to fetch Locations");
      }
    }


    fetchOptions();
    fetchLocations();
  }, []);

  /* Toggle option */
  const toggleOption = (id: number) => {
    setSelectedOptions((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formData = new FormData(e.currentTarget);

    const schema = PackageSchema.safeParse(formData)




    if (image) {
      formData.append("image", image.file);
    }



    selectedOptions.forEach((id) =>
      formData.append("options[]", id.toString())
    );

    try {
      setLoading(true);





      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/packages`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Package added successfully");
      onAddPackage();
      setOpen(false);
    } catch {
      toast.error("Failed to add package");
    } finally {
      setLoading(false);
    }
  };

  const selectedNames = options
    .filter((o) => selectedOptions.includes(o.id))
    .map((o) => o.options)
    .join(", ");



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (image) {
      URL.revokeObjectURL(image.preview)

    }

    const newImage: ImagePreview = {
      file,
      preview: URL.createObjectURL(file),
      progress: 0
    }


    setImage(newImage);


  };


  const removeImage = () => {

    if (image) {

      URL.revokeObjectURL(image.preview)

    }
    setImage(null);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-emerald-900">
          <FaPlus /> Add Package
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Package</AlertDialogTitle>
            <AlertDialogDescription>
              Upload image and package details.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Input name="name" placeholder="Package name" className="mb-2" />
          <Input
            type="number"
            name="price"
            placeholder="Price"
            className="mb-2"
          />

           
                    {/* Add the width utility to the Select component wrapper if needed, 
    but the Trigger is the key element */}
{/* Add name and onValueChange */}
<Select name="locationId" onValueChange={setSelectedLocation}>
  <SelectTrigger className="w-full my-2"> 
    <SelectValue placeholder="Select Locations" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Locations</SelectLabel>
      {locations.map((loc) => (
        <SelectItem key={loc.id} value={loc.id.toString()}>
          {loc.name}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>

{/* This hidden input ensures the value is included in FormData */}
<input type="hidden" name="location_id" value={selectedLocation} />
           
            

          {/* Multi-select */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start mb-2"
              >
                {selectedNames || "Select options"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-64 ">
              <div className="space-y-2 ">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-2 "
                  >
                    <Checkbox
                      checked={selectedOptions.includes(option.id)}
                      onCheckedChange={() =>
                        toggleOption(option.id)
                      }
                    />
                    <span className="text-sm ">{option.options}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Input
            name="location"
            placeholder="Location"
            className="mb-2"
          />

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition my-3">
            <FaUpload className="text-xl mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Upload event image</p>
            <p className="text-xs text-muted-foreground">Click to browse </p>
            <Input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          {image && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

              <div className="relative border rounded-lg overflow-hidden">
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
            <Button disabled={loading} color="bg-emerald-700" className="bg-emerald-700 hover:bg-emerald-600 text-white">
              {loading ? "Saving..." : "Save"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
