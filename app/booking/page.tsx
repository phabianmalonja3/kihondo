"use client";

import { useState } from "react";

const tours = [
  { id: 1, name: "Serengeti Safari", price: 200 },
  { id: 2, name: "Zanzibar Beach Tour", price: 150 },
  { id: 3, name: "Mount Kilimanjaro Trek", price: 300 },
  { id: 4, name: "Ngorongoro Crater Tour", price: 180 },
];

export default function BookingPage() {
const [form, setForm] = useState({
  tour_id: tours[0].id,
  user_name: "",
  email: "",
  phone: "",
  date_from: "",
  date_to: "",
  adults: 1,
  children: 0,
  youth: 0,
});


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Booking successful! ✅");
        setForm({
          tour_id: tours[0].id,
          user_name: "",
          email: "",
          phone: "",
          date_from: "",
          date_to: "",
          people: 1,
        });
      } else {
        setMessage("Booking failed. Please try again.");
      }
    } catch (err) {
      setMessage("Error submitting booking.");
    } finally {
      setLoading(false);
    }
  };

  const selectedTour = tours.find((t) => t.id == form.tour_id);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-emerald-900 text-center mb-6">
          Book Your Tour
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Select Tour */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Tour</label>
            <select
              name="tour_id"
              value={form.tour_id}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-700"
            >
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.name} - ${tour.price}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="date"
                name="date_from"
                value={form.date_from}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-700"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="date"
                name="date_to"
                value={form.date_to}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-700"
                required
              />
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+255 7XX XXX XXX"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-700"
              required
            />
          </div>

         
<div className="space-y-4">
  <label className="block text-sm font-medium text-gray-700">Number of People</label>

  {/* Adults */}
  <div className="flex items-center justify-between">
    <span>Adults (18+)</span>
    <input
      type="number"
      name="adults"
      value={form.adults}
      onChange={handleChange}
      min="0"
      className="w-20 text-center border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-700"
    />
  </div>

  {/* Children */}
  <div className="flex items-center justify-between">
    <span>Children (3-12)</span>
    <input
      type="number"
      name="children"
      value={form.children}
      onChange={handleChange}
      min="0"
      className="w-20 text-center border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-700"
    />
  </div>

  {/* Youth */}
  <div className="flex items-center justify-between">
    <span>Youth (13-17)</span>
    <input
      type="number"
      name="youth"
      value={form.youth}
      onChange={handleChange}
      min="0"
      className="w-20 text-center border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-700"
    />
  </div>

  {/* Total People */}
  <div className="mt-2 text-gray-700 font-medium">
    Total People: {form.adults + form.children + form.youth}
  </div>
</div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-900 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-gray-700 mt-2 font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
