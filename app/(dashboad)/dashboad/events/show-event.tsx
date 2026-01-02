"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MapPin, Tag, Calendar } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface EventProps {
  event: {
    id: string | number;
    title: string;
    descriptions: string;
    location: string;
    images: string[];
    category?: { name: string };
    created_at?: string;
  };
}

export function ShowEvent({ event }: EventProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
          <Eye className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
              <Tag className="mr-1 h-3 w-3" /> {event.category?.name || "Event"}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar className="mr-1 h-3 w-3" /> 
              {event.created_at ? new Date(event.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-zinc-900 leading-tight">
            {event.title}
          </AlertDialogTitle>
          <div className="flex items-center text-sm text-zinc-500 mt-1">
            <MapPin className="mr-1 h-3 w-3 text-emerald-500" /> {event.location}
          </div>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* IMAGE GALLERY */}
          <div>
            <p className="text-sm font-semibold mb-3 text-zinc-700">Event Gallery</p>
            <ScrollArea className="w-full whitespace-nowrap rounded-xl border border-zinc-100 p-2">
              <div className="flex w-max space-x-4">
                {event.images.map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border bg-zinc-100">
                    <Image
                      src={img}
                      alt={`${event.title}-${index}`}
                      width={300}
                      height={200}
                      unoptimized
                      className="aspect-video h-40 w-auto object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-700">Description</p>
            <AlertDialogDescription className="text-zinc-600 leading-relaxed whitespace-pre-wrap text-base">
              {event.descriptions}
            </AlertDialogDescription>
          </div>
        </div>

        <AlertDialogFooter className="border-t pt-4">
          <AlertDialogAction className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl px-8">
            Close View
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}