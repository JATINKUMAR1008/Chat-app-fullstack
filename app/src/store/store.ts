import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/global/global.states"
import tabReducer from "../reducers/sidebar/sidebar.state"
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({
    reducer:{
        authReducer,
        tabReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector