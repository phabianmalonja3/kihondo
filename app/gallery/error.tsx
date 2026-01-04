"use client"

import React, { useEffect } from 'react'
interface PropType{
    error:Error,
    digest?:string,
    reset:()=>void
}
export default function error({error,reset}:PropType) {

    useEffect(()=>{


        console.log("error ...")

    },[error])
  return (
    <div>
        <h1>someting Went wrong</h1>
        <button onClick={()=>reset()}> Try</button>
    </div>
  )
}
