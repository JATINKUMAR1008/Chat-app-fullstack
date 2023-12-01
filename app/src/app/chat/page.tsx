"use client"
import { useRouter, useSearchParams } from "next/navigation";
import MessageBox from "./components/chat-section-components/message-box";
import TopBar from "./components/chat-section-components/top-bar";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { stat } from "fs";
import socket from "@/services/webhooks/connection";
interface Messages {
    senderId: string,
    text: string
}
export default function ChatPage() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const chatId = searchParams.get("chatId");
    const [state, setState] = useState(false)
    const user = useAppSelector((state) => state.authReducer.authentication.user)
    const [messages, setMessages] = useState<Messages[] | null>(null)
    useEffect(() => {
        if (chatId) {
            setState(true)
            socket.emit('subscribeToChat', chatId)
        }
        socket.on('chatMessage', (data) => {
            console.log(data)
            const chatHistory = data.map((jsonString: string) => JSON.parse(jsonString));
            setMessages(chatHistory)
        })

    }, [chatId])

    return chatId ? (
        <div className="w-full h-screen bg-[#212122] flex border border-[#323233] flex-col items-center">
            <div className="w-full h-[15%]">
                <TopBar />
            </div>
            {messages && (
                <div className="w-full h-[80%] px-10 py-3">
                    <ShowMessages data={messages} />
                </div>
            )}
            <div className="w-full h-[10%]">
                <MessageBox chatId={chatId} />
            </div>
        </div>
    ) : (
        <>
            <div className="w-full h-screen bg-[#212122] flex border border-[#323233] flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold capitalize">
                    {user?.name} Start chatting now 😝.
                </h1>
            </div>
        </>
    )
}

const ShowMessages = ({ data }: { data: Messages[] }) => {
    const user = useAppSelector((state) => state.authReducer.authentication.user)
    return (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
            {data.map((value, index) => {
                if (value.senderId != user?._id) {
                    return (

                        <div className="w-full h-fit " key={index}>
                            <p className="py-2 px-1 bg-slate-400 text-gray-900 w-fit rounded-md">{value.text}</p>
                        </div>
                    )
                } else {
                    return (
                        <div className="w-full h-fit " key={index}>
                            <p className="py-2 px-3 float-right bg-slate-800 text-white w-fit rounded-md">{value.text}</p>
                        </div>
                    )
                }
            })}                                                                                                                                                                                              >

        </div>
    )
}