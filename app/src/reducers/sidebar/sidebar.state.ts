import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tab: 0
}

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers:{
        setTab:(state, action)=>{
            state.tab = action.payload
        }
    }
})

export const {setTab} = tabSlice.actions
export default tabSlice.reducer