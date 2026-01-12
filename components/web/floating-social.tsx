
"use client"
import SocialLinks from "./social-links";
import { usePathname } from 'next/navigation'
export function FloatingSocials() {
const pathname = usePathname()

if(pathname.startsWith("/dashboad")) return null;

return <SocialLinks />




 
}