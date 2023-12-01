"use client"

import { useAppSelector } from "@/store/store"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const isAuth = useAppSelector((state)=>state.authReducer.authentication.isLoggedIn)
    const router = useRouter()
    useEffect(()=>{
        if(isAuth || localStorage.getItem('token')){
            router.back()
        }
    },[isAuth])
    return(<>
    {children}</>)
}