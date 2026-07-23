import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setSingleJob } from "../features/job/jobSlice";
import { JOBS_API_END_POINT } from "../utils/Host"

const useGetJobById = (id) => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector((state) => state.job);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${JOBS_API_END_POINT}/${id}`);
        if (data.success) {
          dispatch(setSingleJob(data.job));
          console.log("Fetched job:", data.job);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load job");
      }
    };

    if (id) fetchJob();
  }, [id, dispatch]);

  return { singleJob };
};

export default useGetJobById;
