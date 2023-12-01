import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import DirectChats from "./components/direct-chats";
import GroupChats from "./components/groups-section";
import { useAppSelector } from "@/store/store";
import { ChangeEvent, useEffect, useState } from "react";
import socket from "@/services/webhooks/connection";
export default function SideBar() {
    const [input,setInput] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }
    return (
        <>
        <div className="min-w-[320px] h-screen bg-[#050507] flex flex-col items-center text-[#58595C] py-3">
            <div className="flex flex-col h-[20%] w-full my-1 items-center">

            <div className="w-[80%] mt-5 mb-4 h-5 py-5 flex items-center rounded-md gap-2 px-4 bg-[#212122]">
                <IoSearch size={20} className="" />
                <input className="bg-transparent text-gray-100 w-full outline-none font-extralight" placeholder="Search" type="text" value={input} onChange={handleChange}/>
            </div>
            <div className="w-[80%] flex flex-col items-center mt-2s">
                <span className="w-full flex items-center justify-between my-2">
                    <h1 className="text-left w-full text-gray-400 font-semibold uppercase font-sans text-sm">Favourites</h1>
                    <FaPlus className="text-gray-100 cursor-pointer" />
                </span>

                <span className="bg-[#212122] gap-2 flex items-center px-3 w-full h-3 py-5 my-2 rounded-md">
                    # <p className="text-gray-100">Pelican room</p>
                </span>
            </div>
            </div>
        
        <div className="mt-2 w-[80%] h-fit max-h-[30%] flex flex-col items-center">
                <span className="w-full flex items-center justify-between my-2">
                    <h1 className="text-left w-full text-gray-400 font-semibold uppercase font-sans text-sm">Direct messages</h1>
                    <FaPlus className="text-gray-100 cursor-pointer" />
                </span>
                
                    <DirectChats search_query={input}/>
                
            </div>
           <div className="mt-4 w-[80%] h-fit max-h-[50%] flex flex-col items-center">
                <span className="w-full flex items-center justify-between my-2">
                    <h1 className="text-left w-full text-gray-400 font-semibold uppercase font-sans text-sm">ROOMS</h1>
                    <FaPlus className="text-gray-100 cursor-pointer" />
                </span>
                <GroupChats search_query = {input}/>
            </div> 
            
            </div>
        </>
    )
}