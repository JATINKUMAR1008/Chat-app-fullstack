"use client"

import { IoSearch } from "react-icons/io5";
import DirectChats from "./direct-chats";
import GroupChats from "./groups-section";
import { FaPlus } from "react-icons/fa";

export default function TabSelector ({tab}:{tab:number}) {
    console.log(tab)
    switch (tab) {
        case 0:
            return <DirectChats />
            break;
        case 1:
            return <GroupChats />
            break;
        default:
            return <DirectChats />
    }
}
