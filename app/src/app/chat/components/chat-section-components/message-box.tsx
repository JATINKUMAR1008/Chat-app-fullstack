import { IoIosAttach } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ChangeEvent, FormEvent, useState } from "react";
import socket from "@/services/webhooks/connection";
import { useAppSelector } from "@/store/store";
export default function MessageBox({ chatId }: { chatId: string }) {
    const [input, setInput] = useState("");
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }
    const user = useAppSelector((state) => state.authReducer.authentication.user)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            senderId: user?._id,
            receiverId: chatId,
            text: input,
        }
        socket.emit('sendChatMessage', data)
    }
    return (
        <div className="w-full min-h-fit max-h-[200px] flex items-center justify-center">
            <div className="w-[90%] h-full px-10 shadow-lg mb-4 py-5 gap-4 rounded-lg bg-[#3a3a3b] flex items-center">
                <span className="flex items-center justify-center gap-4  h-full">
                    <IoIosAttach size={20} className="text-gray-200" />
                    <FaRegSmile size={20} className="text-gray-200" />
                </span>
                <form onSubmit={handleSubmit} className="w-full h-full flex items-center justify-center">
                    <span className="w-full flex items-center justify-between">
                        <textarea cols={1} rows={1} value={input} onChange={handleChange} className="w-full text-md resize-none outline-none h-full bg-transparent text-white" placeholder="Type your message here..." />
                        <button type="submit">
                            <FiSend size={20} className="text-gray-200" />
                        </button>
                    </span>
                </form>


            </div>
        </div>
    )
}