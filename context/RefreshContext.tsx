"use client"
import { useRouter } from 'next/navigation'
import React, { createContext, useContext } from 'react'


const RefreshContext = createContext({
refreshData:()=>{}
})
export default function RefreshProvider({children}:{children:React.ReactNode}) {

  const router = useRouter();

  const refreshData = ()=>{
    router.refresh();
  }
  return <RefreshContext.Provider value={{refreshData}}>

    {children}

  </RefreshContext.Provider>


  
}

export const useRefresh = ()=>useContext(RefreshContext)