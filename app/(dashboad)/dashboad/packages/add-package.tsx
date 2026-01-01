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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { PackageSchema } from "@/lib/schema";



interface Props {
  onAddPackage: () => void;
}

interface Option {
  id: number;
  options: string;
}

export function AddPackage({ onAddPackage }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
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

    fetchOptions();
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


// if (!schema.success) {

//   toast.error("error :" +schema.error.flatten())
//   return null
  
// }

    if (image) {
      formData.append("image", image);
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

          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="mb-2"
          />

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
