import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, CreditCard } from "lucide-react";
import BookingClient from './client-book';
import { toast } from 'sonner';



export default async function BookingPage({ params }:  { params: Promise<{id:string}> } ) {

    const {id}= await params

  

    

        // 1. Fetch Single Package
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages/${id}`);
        const data = await res.json();
        const mainPkg = data.package ?? data;

        console.log(mainPkg)
        
   
 
  return <BookingClient mainPkg={mainPkg} />
}