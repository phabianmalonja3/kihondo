import React from 'react'

export default function TableSkeleton() {
  return (
    <div className='bg-white rounded-xl shadow overflow-hidden animate-pulse'>
        <div className="h-12 bg-gray-100 border-b">
            {[...Array(5)].map((_,i)=>(
                <div key={i} className='flex items-center px-6 py-4 border-b space-x-4'>
                    <div className="w-12 h-12 rounded-full bg-gray-200">
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded-full w-1/4 "></div>
                            <div className="h-3 bg-gray-100 rounded-full w-1/3 "></div>
                        </div>
                    </div>
                    <div className="w-20 h-6 bg-gray-200 rounded-full"></div>

                </div>
            ))}

        </div>
    </div>
  )
}
