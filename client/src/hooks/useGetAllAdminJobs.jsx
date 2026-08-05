import { setAllAdminJobs, removeJobFromStore } from '../features/job/jobSlice';
import { JOBS_API_END_POINT } from '../utils/Host';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  const fetchAllAdminJobs = async () => {
    try {
      const res = await axios.get(`${JOBS_API_END_POINT}/getadminjobs`, {
        withCredentials: true,
      });
      dispatch(setAllAdminJobs(res.data.success ? res.data.jobs : []));
    } catch (error) {
      dispatch(setAllAdminJobs([]));
      console.error("Fetch Admin Jobs Error:", error);
    }
  };

  useEffect(() => {
    fetchAllAdminJobs();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOBS_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // directly from Redux for immediate UI removal
        dispatch(removeJobFromStore(jobId));
        return res.data;
      }
    } catch (error) {
      console.error("Delete Job Error:", error.response?.data || error.message);
      throw error;
    }
  };

  return { fetchAllAdminJobs, deleteJob };
};

export default useGetAllAdminJobs;