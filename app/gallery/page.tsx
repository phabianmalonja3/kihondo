
import GalleryList from '@/components/ui/GalleryList';
import { ImageItem } from '@/lib/constants';

export default async function GalleryPage() {


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galleries`, {
          cache: "no-store",
        });
        const data = await res.json();



        return <GalleryList data={data.galleries.data} />


    };
    



