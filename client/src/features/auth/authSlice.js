import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        active:null,
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setActive:(state, action) => {
            state.active = action.payload;
        }
    }
});
export const {setLoading, setUser ,setActive} = authSlice.actions;

export default authSlice.reducer;