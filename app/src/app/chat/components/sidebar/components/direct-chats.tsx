import { getUsers } from "@/services/user-service";
import socket from "@/services/webhooks/connection";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react"
import { useQuery } from "react-query";

const array = [
    {
        _id: '65676b0de7d52e59243b49b5',
        name: 'Jatin',
        email: 'test@xyz.com',
        verified: false,
        __v: 0,
    },
    {
        _id: '65676b0de7d52e59243b49b5',
        name: 'Abhi',
        email: 'test@xyz.com',
        verified: false,
        __v: 0,
    },
    // ... other user data
]
interface UserData {
    _id: string;
    name: string;
}
interface Users {
    users: UserData[]
}
export default function DirectChats({ search_query }: { search_query: string }) {
    const [firendsIdArray, setArray] = useState<UserData[]>([])
    console.log(array)
    const [filterData, setFilterData] = useState<UserData[]>([])
    const firendList = useAppSelector((state) => state.authReducer.userFriends)
    const { isLoading, data } = useQuery<Users>({
        queryFn: () => getUsers(),
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: 100 * 60 * 10
    })
    useEffect(() => {
        if (data) {
            const filterDataArray = data?.users.filter((obj) => obj.name.toLowerCase().includes(search_query.toLowerCase()))
            setFilterData(filterDataArray)
        }

        console.log("friendList", firendList)
    }, [search_query || data || firendList])
    if (search_query.length === 0) {
        return data && (
            <div className="my-2 w-full gap-6 flex flex-col scroll-smooth overflow-y-auto flex-grow">
                {data.users.map((item, index) => (
                    <MessageCard key={index} userData={item} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="my-2 w-full flex flex-col scroll-smooth overflow-y-auto flex-grow">
                {filterData.map((item, index) => (
                    <MessageCard key={index} userData={item} />
                ))}
            </div>
        )
    }
}

const MessageCard = ({ userData }: { userData: UserData }) => {
    return (
        <Link href={`/chat?chatId=${userData._id}`}>
            <div className="flex w-full item-center justify-between px-2 h-full text-gray-200 cursor-pointer hover:text-white duration-100 ease-in-out rounded-md">
                <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-cyan-300 flex items-center justify-center">
                        <p className="uppercase text-cyan-800">jf</p>
                    </span>
                    <p className="text-md font-sans ">{userData.name}</p>
                </span>
                <span className="w-6 h-4 flex items-center text-xs font-semibold justify-center rounded-lg bg-cyan-800 text-cyan-200 mt-1">
                    1
                </span>
            </div>
        </Link>
    )
}