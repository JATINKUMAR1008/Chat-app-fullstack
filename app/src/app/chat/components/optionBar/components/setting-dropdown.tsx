import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOut } from "@/reducers/global/global.states"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"
export default function SettingDropDownMenu({children}:{children: React.ReactNode}) {
    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="ml-10">
                <DropdownMenuLabel>Seetings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>router.push('/chat/settings')}>account</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(logOut())}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}