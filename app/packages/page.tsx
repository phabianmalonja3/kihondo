import React from 'react';
import type { Metadata } from "next";
import PackagesPage from "@/app/packages/client-packages";


export const metadata: Metadata = {
  title: "Mikumi Safari | Pacakges",
  description: "This is the mikumi safari Packages",
};

function Page() {
    return <PackagesPage />
}

export default Page;