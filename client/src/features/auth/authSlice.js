import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if available on app startup
const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: initialUser,
    active: 0,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
        sessionStorage.clear();
      }
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      sessionStorage.clear();
    },
  },
});

export const { setLoading, setUser, setActive, logout } = authSlice.actions;

export default authSlice.reducer;