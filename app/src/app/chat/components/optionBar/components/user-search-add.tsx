import Loader from "@/app/loader";
import { getUsers } from "@/services/user-service";
import socket from "@/services/webhooks/connection";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";


interface UserData {
    users: User[];
    
}
interface User{
    _id: string;
    name: string;
}
export default function UserAddAndSearch() {
    const [input, setInput] = useState('')
    const [array, setArray] = useState<User[]>([])
    const [filteredData, setFilteredData] = useState<User[]>([])

    const { isLoading, data } = useQuery<UserData>({
        queryFn: () => getUsers(),
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: 100 * 60 * 10
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        if (data) {
            const filterDataArray = data.users.filter((obj) => obj.name.toLowerCase().includes(input.toLowerCase()))
            setFilteredData(filterDataArray)
        }

    }, [input || array])
    if (input.length === 0) {
        return !data ? (<Loader />) : (
            <div className="w-full flex flex-col items-center">
                <input className="w-full py-2 px-3 bg-transparent outline outline-1 outline-gray-500 rounded-md" placeholder="Search" value={input} onChange={handleChange} />
                <div className="flex flex-col h-fit w-full max-h-[200px] py-2 items-center overflow-y-auto">
                    {data ? data.users.map((user, index) => (
                        <UserCard userData={user} key={index} />
                    )): (<></>)}
                </div>
            </div>
        )
    } else {
        if (filteredData.length != 0) {
            return (
                <div className="w-full flex flex-col items-center">
                    <input className="w-full py-2 px-3 bg-transparent outline outline-1 outline-gray-500 rounded-md" placeholder="Search" value={input} onChange={handleChange} />
                    <div className="flex w-full flex-col h-fit max-h-[200px] py-2 overflow-y-auto">
                        {filteredData.map((user, index) => (
                            <UserCard userData={user} key={index} />
                        ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="w-full flex flex-col items-center">
                    <input className="w-full py-2 px-3 bg-transparent outline outline-1 outline-gray-500 rounded-md" placeholder="Search" value={input} onChange={handleChange} />
                    <div className="flex w-full flex-col items-center my-2 h-fit max-h-[200px] py-2 overflow-y-auto">
                        No User find.
                    </div>
                </div>
            )

        }

    }

}

const UserCard = ({ userData }: { userData: User }) => {
    return (
        <div className="px-2 w-full my-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-full">
                    11
                </div>
                <p>{userData.name}</p>
            </div>
            <div className="text-xl font-bold cursor-pointer" onClick={()=>{
                socket.emit('add_friend',userData._id)
            }}>
                +
            </div>

        </div>
    )
}