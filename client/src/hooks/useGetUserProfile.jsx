import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, logout } from "../features/auth/authSlice";
import { USER_API_END_POINT } from "../utils/Host";

const useGetUserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true,
        });

        if (res.data.success && res.data.user) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        // If session cookie expired or invalid, reset user state
        dispatch(logout());
      }
    };

    fetchUserProfile();
  }, [dispatch]);
};

export default useGetUserProfile;