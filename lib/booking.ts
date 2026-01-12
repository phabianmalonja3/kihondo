
export type BookingStatus = "pending" | "confirmed" | "cancelled";



 export interface Booking {
  id: number;
  package_id: number;
  first_name: string;
  last_name: string;
  email: string;
  travel_date: string;
  total_price: number;
  status: BookingStatus;
  guest_counts: {
    adults: number;
    youth: number;
    children: number;
  };
}
export interface Bookings{
  bookings?:Booking[]
}