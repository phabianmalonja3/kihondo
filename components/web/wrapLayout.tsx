
"use client"
import React from 'react'

import Nav from './nav'
import { usePathname } from 'next/navigation'

export default function WrapNav() {

    const pathName = usePathname();
    if(pathName.startsWith("/dashboad")){
        return null;
    }
  return <Nav />
}
