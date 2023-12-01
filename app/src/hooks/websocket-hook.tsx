import { setFriends } from "@/reducers/global/global.states";
import socket from "@/services/webhooks/connection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function useSocket(user_id: string | undefined){
    const dispatch = useDispatch()
    useEffect(()=>{
        socket.io.opts.query = {
            user_id
        }
        socket.disconnect().connect()
        socket.on("connect_error",()=>{
            console.log("connect_error")
        })
        socket.on("friends",(data)=>{
            dispatch(setFriends(data.friends))
            console.log(data)
        })
        return ()=>{
            socket.off("connect_error")
        }
    },[])
}