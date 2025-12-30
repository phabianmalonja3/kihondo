"use client";

import { useState } from "react";

interface BookingForm {
  date_from: string;
  date_to: string;
  adults: number;
  children: number;
  youth: number;
}

export default function BookingFormComponent() {
  const [form, setForm] = useState<BookingForm>({
    date_from: "",
    date_to: "",
    adults: 1,
    children: 0,
    youth: 0,
  });

  const [message, setMessage] = useState("");

  // Compute total people dynamically
  const totalPeople = form.adults + form.children + form.youth;

  const handleChange = (field: keyof BookingForm, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookingData = {
      ...form,
      people: totalPeople, // send total people to API
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Booking failed");

      setMessage("Booking successful!");
      // Reset form
      setForm({
        date_from: "",
        date_to: "",
        adults: 1,
        children: 0,
        youth: 0,
      });
    } catch (err) {
      setMessage("Booking failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <div>
        <label>Date From:</label>
        <input
          type="date"
          value={form.date_from}
          onChange={(e) => handleChange("date_from", e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label>Date To:</label>
        <input
          type="date"
          value={form.date_to}
          onChange={(e) => handleChange("date_to", e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="flex gap-4">
        <div>
          <label>Adults:</label>
          <input
            type="number"
            min={0}
            value={form.adults}
            onChange={(e) => handleChange("adults", Number(e.target.value))}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Children:</label>
          <input
            type="number"
            min={0}
            value={form.children}
            onChange={(e) => handleChange("children", Number(e.target.value))}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Youth:</label>
          <input
            type="number"
            min={0}
            value={form.youth}
            onChange={(e) => handleChange("youth", Number(e.target.value))}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      <p>Total People: {totalPeople}</p>
      <button type="submit" className="bg-emerald-700 text-white px-6 py-2 rounded">
        Book Now
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </form>
  );
}
