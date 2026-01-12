"use client"

import * as React from "react"
import { format } from "date-fns"
import { 
  CalendarDays, 
  Users, 
  CreditCard, 
  Calendar as CalendarIcon, 
  Plus, 
  Minus,
  User,
  Loader2,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// NEW: Form Imports
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// NEW: Validation Schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required (min 2 chars)" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function BookingClient({ mainPkg }: { mainPkg: any }) {
  const router = useRouter()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  // NEW: Initialize Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  // Guest State
  const [guestCounts, setGuestCounts] = React.useState({
    adults: 1,
    youth: 0,
    children: 0
  })

  // Pricing Logic
  const adultPrice = Number(mainPkg.price)
  const youthPrice = adultPrice * 0.8
  const childPrice = adultPrice * 0.5
  const serviceFee = 15
  
  const totalGuests = guestCounts.adults + guestCounts.youth + guestCounts.children
  const totalPrice = (guestCounts.adults * adultPrice) + (guestCounts.youth * youthPrice) + (guestCounts.children * childPrice)

  const updateCount = (type: keyof typeof guestCounts, delta: number) => {
    setGuestCounts(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta)
    }))
  }

  // Submit to Laravel
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const payload = {
        package_id: mainPkg.id, 
        first_name: values.firstName, // Using values from form
        last_name: values.lastName,
        email: values.email,
        travel_date: date ? format(date, "yyyy-MM-dd") : null,
        adults: guestCounts.adults,
        youth: guestCounts.youth,
        children: guestCounts.children,
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        // If Laravel returns validation errors, apply them to Shadcn inputs
        if (data.errors) {
            if (data.errors.email) form.setError("email", { message: data.errors.email[0] });
            if (data.errors.first_name) form.setError("firstName", { message: data.errors.first_name[0] });
        }
        throw new Error(data.message || "Booking failed")
      }

      setStatus('success')
      toast.success("Your Booking Received Successfully")
      
      setTimeout(() => {
        router.push(`/booking/${data.booking_id}`)
      }, 2000)

    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
        <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
        <p className="text-muted-foreground">Redirecting you to your itinerary...</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto py-10 px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-600" /> Traveler Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Guest Selectors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" /> Travelers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { id: 'adults', label: 'Adults', sub: '18+', prc: adultPrice },
                    { id: 'youth', label: 'Youth', sub: '13-17', prc: youthPrice },
                    { id: 'children', label: 'Children', sub: '2-12', prc: childPrice }
                  ].map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold">{c.label} <span className="text-xs font-normal text-muted-foreground ml-2">(${c.prc})</span></p>
                        <p className="text-xs text-muted-foreground">{c.sub}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateCount(c.id as any, -1)}><Minus className="h-3 w-3" /></Button>
                        <span className="font-medium">{guestCounts[c.id as keyof typeof guestCounts]}</span>
                        <Button type="button" variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateCount(c.id as any, 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label>Travel Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className="w-full justify-start"><CalendarIcon className="mr-2 h-4 w-4" /> {date ? format(date, "PPP") : "Pick a date"}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} /></PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Side Panel */}
          <div className="md:col-span-1">
            <Card className="bg-muted/50 sticky top-6 border-2 border-emerald-100 shadow-lg">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                {date && <CardDescription>Trip on {format(date, "MMM dd")}</CardDescription>}
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2 border-b pb-4">
                  <div className="flex justify-between"><span>Adults x{guestCounts.adults}</span><span>${(guestCounts.adults * adultPrice).toLocaleString()}</span></div>
                  {guestCounts.youth > 0 && <div className="flex justify-between"><span>Youth x{guestCounts.youth}</span><span>${(guestCounts.youth * youthPrice).toLocaleString()}</span></div>}
                  {guestCounts.children > 0 && <div className="flex justify-between"><span>Children x{guestCounts.children}</span><span>${(guestCounts.children * childPrice).toLocaleString()}</span></div>}
                </div>
                <div className="flex justify-between"><span>Service Fee</span><span>${serviceFee}</span></div>
                <div className="pt-4 border-t-2 border-emerald-200 border-dashed">
                  <div className="flex justify-between items-center text-xl font-bold uppercase tracking-tight">
                    <span>Total</span>
                    <span className="text-emerald-700">${(totalPrice + serviceFee).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full bg-emerald-700 h-12 font-bold">
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <CreditCard className="mr-2" />} Confirm
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}