"use client";





export default function DestinationsPage() {

useEffect(() => {


  
     

  


  try {
     const fetchImages = async () => {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
        cache: "no-store", // 
      });
  
      const data = await res.json();

      console.log(data.destinations.data ?? data);
    
      setDestinations(data.destinations.data ?? data);

      setLoading(false)
     
  
    };

     fetchImages();
    
  } catch (error) {
    
  }finally{
    setLoading(false)
  }
     
  
   
    }
    , []);

    if(loading){
      return <DestinationSkeleton />
    }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      
      <div className="bg-emerald-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Destinations</h1>
        <p className="mt-3 text-gray-200">
          Discover the top destinations in Tanzania
        </p>
      </div>

      {/* Destinations Grid */}
      <Suspense fallback={<p>Loading ... </p>}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <Link href={`/destinations/${dest.id}`} key={dest.id}>
<div
            
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <Image
              src={dest.image_url ?? "/images/bg.jpg"}
              alt={dest.name}
              width={600}
              height={400}
              unoptimized
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-semibold">{dest.name.toString()}</h3>

            
              <p className="text-gray-200 text-sm mt-1">{dest.location}</p>
            </div>
          </div>
          </Link>
          
        ))}
      </div>
      </Suspense>
    </div>
  );
}

 function DestinationSkeleton() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
      <Skeleton className="h-10 w-64 mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}