"use client"
import { IoLogoStencil } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { GoBell } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TiLocationArrowOutline } from "react-icons/ti";
import { CiSearch, CiUser } from "react-icons/ci"
import { IoMdSettings } from "react-icons/io"
import { PiHandshakeLight } from "react-icons/pi"
import { useDispatch } from "react-redux";
import { setTab } from "@/reducers/sidebar/sidebar.state";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import AccountDropDownMenu from "./components/account-dialog";
import { useRouter } from "next/navigation";
import SettingDropDownMenu from "./components/setting-dropdown";
import { FiLogOut } from "react-icons/fi";
import { logOut } from "@/reducers/global/global.states";
import SearchDialog from "./components/search-dialog";
export default function OptionBar() {
    const router = useRouter()
    const optionArray = [
        {
            icon: <SlOptions size={20} />,
        },
        {
            icon: <GoBell size={20} />,
        },{
            icon: <HiOutlineUserGroup size={20} />,
        },{
            icon: <TiLocationArrowOutline size={20} />,
        },{
            icon: <PiHandshakeLight size={20} />,
        }
    ]
    const dispatch =useDispatch()
    const handleTabClick = (key: number) => {
        dispatch(setTab({
            tab: key
        }))
    }
    return (
        <div className="min-w-[70px] h-screen bg-[#0c0c0c] flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
                <div className="my-5 text-white">
                    <IoLogoStencil size={40} />
                </div>
                <SearchDialog>
                <div className="my-5 font-extrabold text-white">
                    <CiSearch size={30} />
                </div>
                </SearchDialog>
                <div className="my-7 text-[#97989B]">
                    <ul className="flex flex-col items-center gap-8">
                        {optionArray.map((option, index) => (
                            <li key={index} className="cursor-pointer" onClick={()=>handleTabClick(index)}>{option.icon}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center gap-5 py-2">
                <button onClick={()=>dispatch(logOut())}>
                    <FiLogOut size={30}/>
                </button>
                <AccountDropDownMenu>
                <button>
                    <div className="relative w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                        <CiUser size={30} className="text-black"/>
                        <div className="absolute w-3 h-3 bg-green-300 rounded-full bottom-0 right-0"></div>
                    </div>
                </button>
                </AccountDropDownMenu>
                <SettingDropDownMenu>
                <button className="text-white">
                    <IoMdSettings size={30}/>
                </button>
                </SettingDropDownMenu>
                
            </div>
        </div>
    )
}