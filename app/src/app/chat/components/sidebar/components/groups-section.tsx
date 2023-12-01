const array =[1,2]
export default function GroupChats({search_query}:{search_query:string}) {
    return (
        <div className="my-2 w-full gap-8 flex flex-col scroll-smooth overflow-y-auto flex-grow">
            {array.map((item, index) => (
                <MessageCard key={index}/>
            ))}
        </div>
    )
}

const MessageCard = () => {
    return (
        <div className="flex w-full item-center justify-between px-2">
            <span className="flex items-center gap-3 ml-3">
                <span className="flex items-center justify-center">
                    <p className="uppercase font-extrabold ">#</p>
                </span>
                <p className="text-md font-sans text-gray-200 font-semibold">Jeremy Flrow</p>
            </span>
            <span className="w-6 h-4 flex items-center text-xs font-semibold justify-center rounded-lg bg-cyan-800 text-cyan-200 mt-1">
                1
            </span>
        </div>
    )
}