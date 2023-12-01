import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API?process.env.NEXT_PUBLIC_API:"http://localhost:4000",{
    autoConnect: false
})
export default socket