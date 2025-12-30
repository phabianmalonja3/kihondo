export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: number;
  customer: string;
  destination: string;
  date: string;
  status: BookingStatus;
}

 export const bookings: Booking[] = [
  {
    id: 1,
    customer: "John Doe",
    destination: "Serengeti Safari",
    date: "2025-01-10",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Amina Hassan",
    destination: "Zanzibar Beach",
    date: "2025-01-15",
    status: "pending",
  },
  {
    id: 3,
    customer: "Peter James",
    destination: "Mount Kilimanjaro",
    date: "2025-02-01",
    status: "cancelled",
  },
];