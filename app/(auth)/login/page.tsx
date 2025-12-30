
import { Metadata } from 'next'

import ClientLogin from "./client-login"


export const metadata:Metadata={
    title:"Login | Safaris "
}
export default async function page() {
  return <ClientLogin />
}
