 
 interface Location {
   name: string;
   country: string;
 }
 
 
 export default interface Package {
  id: number;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  image_url: string;
  options: string[] | string;
  location: Location;
  category?: { name: string };
}