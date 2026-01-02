"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FaCalendarCheck } from "react-icons/fa";
import { AddEvent } from "./add-event";
import { DeleteEvent } from "./delete";
import { ShowEvent } from "./show-event";


interface Event {
  id: string;
  title: string;
  descriptions: string;
  images: string[];      // <-- array from backend
  category_id: string;
  location: string;
  created_at: string;
}
export default function Events() {
  const [refresh, setRefresh] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events`,
          { cache: "no-store" }
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error("Failed to fetch events");
          return;
        }

        setEvents(data.events);
      } catch (error) {
        toast.error("Server error while fetching events");
      }
    }

    fetchEvents();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarCheck className="text-emerald-700 text-3xl" />
        <h1 className="text-3xl font-bold text-emerald-900">
          Events & Activities
        </h1>
      </div>

      {/* Add Event */}
      <div className="flex justify-end mb-4">
        <AddEvent onAddEvent={() => setRefresh(prev => !prev)} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Images</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            <Suspense fallback={<tr><td>Loading...</td></tr>}>
              {events.map(event => (
                <tr
                  key={event.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {event.title}
                  </td>

                  <td className="px-6 py-4">
                    {event.location}
                  </td>

                  {/* IMAGES PREVIEW */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {event.images?.length > 0 ? (
                        event.images.slice(0, 3).map((img, index) => (
                          <Image
                            key={index}
                            src={img}
                            alt={event.title}
                            width={60}
                            height={60}
                            unoptimized
                            className="rounded-md object-cover"
                          />
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No images
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 line-clamp-2 max-w-xs">
                    {event.descriptions}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(event.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
<ShowEvent event={event} />
                    <DeleteEvent id={event.id} onDelete={() => setRefresh(prev => !prev)} />
                    {/* Edit / Delete buttons later */}
                  </td>
                </tr>
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}
