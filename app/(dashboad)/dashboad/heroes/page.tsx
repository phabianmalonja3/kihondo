"use client"

import Image from "next/image"
import { Hero } from "@/lib/heros"
import { useState } from "react";
import { HeroDialog } from "@/components/web/hero";

const heroes: Hero[] = [
  {
    id: 1,
    title: "Discover Tanzania",
    subtitle: "Wildlife, Beaches & Culture",
    image: "/images/serengeti.jpg",
    active: true,
  },
  {
    id: 2,
    title: "Explore Zanzibar",
    subtitle: "White sand beaches & blue ocean",
    image: "/images/zanzibar.jpg",
    active: false,
  },
]

export default function HeroesPage() {

   const [heroes, setHeroes] = useState<Hero[]>([]);

  const handleSaveHero = (hero: Hero) => {
    setHeroes([...heroes, hero]);
    console.log("New Hero Added:", hero);
  };
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Heroes</h1>
   

        <HeroDialog onSave={handleSaveHero} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Subtitle</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {heroes.map((hero) => (
              <tr key={hero.id} className="border-t">
                <td className="p-4">
                  <Image
                    src={hero.image}
                    alt={hero.title}
                    width={120}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </td>

                <td className="p-4 font-medium">{hero.title}</td>
                <td className="p-4 text-gray-600">{hero.subtitle}</td>

                <td className="p-4">
                  {hero.active ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="p-4 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
