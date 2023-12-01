import socket from "@/services/webhooks/connection";
import { createSlice } from "@reduxjs/toolkit";

interface User{
    name: string,
    email: string,
    verified: boolean,
    _v: number,
    _id: string
}

const initialState = {
    authentication:{
        isLoggedIn: false,
        user: <User | null>{
            name: "",
            email: "",
            verified: false,
            _v: 0,
            _id: ""
        }
    },
    userFriends: <string[]|null> null
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logIn:(state,action)=>{
            state.authentication = action.payload
        },
        logOut: (state)=>{
            state.authentication = initialState.authentication
            localStorage.removeItem('token')
            socket.disconnect()
        },
        setFriends:(state, action)=>{
            state.userFriends = action.payload
        }
    }
})

export const {logIn, logOut, setFriends} = authSlice.actions
export default authSlice.reducer