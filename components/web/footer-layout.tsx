
"use client"
import React from 'react'

import Nav from './nav'
import { usePathname } from 'next/navigation'
import Footer from './footer';

export default function FooterLayout() {

    const pathName = usePathname();
    if(pathName.startsWith("/dashboad")){
        return null;
    }
  return <Footer />
}
