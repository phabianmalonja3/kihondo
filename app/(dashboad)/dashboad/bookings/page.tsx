import BookingClient from "./booking-client";

// This function fetches data from your Laravel Backend
async function getBookings(page: string = "1") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?page=${page}`, {
    cache: 'no-store', // Ensures we get fresh data every time
  });

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  return res.json();
}

export default async function Bookings({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Wait for searchParams and extract the current page
  const page = (await searchParams).page || "1";
  
  // Fetch the paginated data
  const bookingsData = await getBookings(page);

 

  return <BookingClient bookings={bookingsData} />

}