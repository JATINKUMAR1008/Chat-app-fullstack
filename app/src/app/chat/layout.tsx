"use client"
import React, { useEffect } from "react";
import OptionBar from "./components/optionBar/optionbar";
import SideBar from "./components/sidebar/sidebar";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/websocket-hook";
import { QueryClientProvider,QueryClient } from "react-query";

export default function ChatViewLayout({children}:{children:React.ReactNode}) {
    const isAuth = useAppSelector((state)=>state.authReducer.authentication.isLoggedIn)
    const user = useAppSelector((state)=>state.authReducer.authentication.user)
    const router = useRouter()
    const queryClient = new QueryClient()
    useEffect(()=>{
        if(!isAuth || !localStorage.getItem('token')){
            router.push('/auth')
        }else{
            //useSocket(user?._id)
        }
    },[isAuth])
    useSocket(user?._id)
    return(
       
        <div className="flex w-full">
            <QueryClientProvider client={queryClient}>
            <OptionBar/><SideBar/>{children}
            </QueryClientProvider>
            </div>
        
    )
}