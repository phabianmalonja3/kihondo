
import { Metadata } from 'next'

import ClientLogin from "./client-login"


export const metadata:Metadata={
    title:"Login | mikumi experiance safari's ",
    description:"Login for the adminstration"
}
export default async function page() {
  return <ClientLogin />
}
