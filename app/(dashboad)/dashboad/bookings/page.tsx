"use client";

export default function BookingFormStatic() {
  return (
    <form className="space-y-4 p-6 bg-white rounded-lg shadow">
      <div>
        <label>Date From:</label>
        <input
          type="date"
          defaultValue="2025-12-30"
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label>Date To:</label>
        <input
          type="date"
          defaultValue="2026-01-05"
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="flex gap-4">
        <div>
          <label>Adults:</label>
          <input
            type="number"
            min={0}
            defaultValue={1}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Children:</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Youth:</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      <p>Total People: 1</p>

      <button
        type="button"
        className="bg-emerald-700 text-white px-6 py-2 rounded"
      >
        Book Now
      </button>

      <p className="mt-2 text-gray-500">This is a static preview of the form.</p>
    </form>
  );
}
