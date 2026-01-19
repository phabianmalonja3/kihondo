"use client";

import Image from "next/image";
import { Hero } from "@/lib/heros";
import { useEffect, useState } from "react";
import { HeroDialog } from "@/components/web/hero";
import { DeleteHeroes } from "./delete";
import { MoreVertical, Edit3, Trash2, ShieldCheck, ShieldAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes`, {
          cache: "no-store",
        });
        const data = await res.json();
        setHeroes(data.heroes.data ?? data);
      } catch (error) {
        console.error("Failed to fetch heroes", error);
      }
    };

    fetchImages();
  }, [refresh]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hero Section</h1>
          <p className="text-slate-500 text-sm mt-1">Manage the main website banners and slides.</p>
        </div>
        <HeroDialog onSave={() => setRefresh((prev) => !prev)} />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Image</th>
              <th className="text-left p-4 font-semibold text-slate-600">Content</th>
              <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              <th className="text-right p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {heroes.map((hero) => (
              <tr key={hero.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="relative w-32 h-16 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                    <Image
                      src={hero.image_url}
                      alt={hero.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{hero.title}</span>
                    <span className="text-slate-500 text-xs truncate max-w-[250px]">{hero.subtitle}</span>
                  </div>
                </td>

                <td className="p-4">
                  {hero.active ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-full border border-emerald-100">
                      <ShieldCheck size={12} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 w-fit px-2.5 py-1 rounded-full border border-slate-200">
                      <ShieldAlert size={12} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Inactive</span>
                    </div>
                  )}
                </td>

                <td className="p-4 text-right">
                  <HeroRowActions hero={hero} setRefresh={setRefresh} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Sub-component for Hero Actions
 */
function HeroRowActions({ hero, setRefresh }: { hero: Hero; setRefresh: any }) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
            <MoreVertical className="h-4 w-4 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-slate-200">
          <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer py-2">
            <Edit3 className="mr-2 h-4 w-4 text-blue-600" />
            <span>Edit Slide</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => setShowDelete(true)} 
            className="cursor-pointer py-2 text-red-600 focus:text-red-700 focus:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logic for Delete Modal */}
      {showDelete && (
        <DeleteHeroes 
          hero={hero.id} 
          open={showDelete}
          onOpenChange={setShowDelete}
          onDelete={() => {
            setRefresh((prev: boolean) => !prev);
            setShowDelete(false);
          }} 
        />
      )}
    </>
  );
}