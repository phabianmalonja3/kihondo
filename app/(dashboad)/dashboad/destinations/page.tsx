
import DestinationList from "@/components/web/destinations/DestinationList";

export default  async function DestinationsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
        cache: "no-store", // 
      });

      if(!res.ok) throw new Error(`Failed to Fetch  ${res.statusText}`)

      const data = await res.json();



  return <DestinationList destinations={data.destinations.data || data}/>
}
