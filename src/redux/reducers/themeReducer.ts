import {createSlice} from "@reduxjs/toolkit"

export const slice = createSlice({
    name: "theme",
    initialState: {
        themeStatus: "light",
        themeColor: "bg-indigo-50"
    },
    reducers: {
        setTheme: (state, action)=>{
            state.themeStatus = action.payload
        }
    }
})


export const {setTheme} = slice.actions
export default slice.reducer