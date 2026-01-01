import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default  function  proxy(req:NextRequest){

    const token = req.cookies.get("token")?.value;

    if(!token){
return NextResponse.redirect(
    new URL("/login",req.url)
)
    }

    return NextResponse.next();

}

export const config ={
    matcher: ['/dashboad/:path*']
}