
"use client"
import { Button } from '@/components/ui/button'
import React from 'react'


export default function error({error,reset}:{error:Error  &{digest?: string},reset:()=>void}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 rounded-xl border border-red-200'>
        <h2 className="text-xl font-bold text-red-800 mb-2">
            Something went Wrong,
        </h2>
        <p className='text-red-600 mb-6 text-center'>
            {error.message || "Failed To Fetch data"}
        </p>
        <Button onClick={()=>reset()}>Try Again</Button>

    </div>
  )
}
