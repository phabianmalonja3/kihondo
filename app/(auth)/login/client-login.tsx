
"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { FormEvent } from 'react';
import { signInSchema } from './loginSchema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export  default  function ClientLogin() {
  
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
const router = useRouter()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
       

        e.preventDefault()
        setError("")
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")
        const password = formData.get("password")
        signInSchema.safeParse({email,password})
        

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
        
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(async (response) => {
            setLoading(false)
            if (response.ok) {
                 
                
                // Login successful
                console.log('Login successful');
                const data = await response.json();
                console.log(data.access_token);

                localStorage.setItem("access_token",data.access_token)
  document.cookie=`token=${data.access_token}; path=/;`;


                toast.success("Login successful")
                router.push("/dashboad/overview")
                // You can redirect the user or update the UI accordingly
            } else {
                // Login failed
                console.log('Login failed');
                const errorData = await response.json();

                setError(errorData.error)

                toast.error("Eror: " + errorData.error)
                console.log(errorData.error);
                // Show error message to the user
            }       
        }).catch((error) => {
            setLoading(false)
            setError(error)
            console.error('Error during login:', error);
            // Show error message to the user
        });
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-700 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Welcome Back
                </h2>
                <p className="text-center text-sm text-gray-500 mt-2">
                    Login to continue your journey
                </p>

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit} method='POST'>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-600 focus:ring-emerald-600 outline-none"
                        />
                         {error && (<p className='text-red-500 text-sm font-semibold'>  {error}</p>)}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-600 focus:ring-emerald-600 outline-none"
                        />
                    </div>

                   

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            Remember me
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-emerald-700 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Button */}
                    {!isLoading ? <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-700 py-2.5 text-white font-semibold  hover:bg-emerald-800 transition"
                    >
                        Login
                    </button> : <button disabled
                        type="submit"
                        className="w-full rounded-lg bg-emerald-700 py-2.5 text-white font-semibold  hover:bg-emerald-800 transition items-center"
                    >
                        <div className='h-5 w-5 animate-spin rounded-full border-4 text-white  border-t-transparent text-center mx-auto'></div>
                    </button>}

                </form>


            </div>
        </div>
    );
}
