import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAllApplications,
  setAppliedJobs,
  setApplicantsForJob,
  setSingleApplication,
  setStatusUpdateMessage,
  clearStatusMessage,
  removeApplicationFromStore, 
  updateApplicationStatusInStore,  
} from "../features/Application/applicationSlice";

import { APPLICANTS_API_END_POINT } from "../utils/Host";

const API_URL = APPLICANTS_API_END_POINT;

const useApplication = () => {
  const dispatch = useDispatch();
  const {
    allApplications,
    appliedJobs,
    applicantsForJob,
    singleApplication,
    statusUpdateMessage,
  } = useSelector((state) => state.application);

  // USER SIDE

  const applyJob = async (jobId, resumeAtApply) => {
    try {
      const res = await axios.post(
        `${API_URL}/apply`,
        { jobId, resumeAtApply },
        { withCredentials: true }
      );
      dispatch(setStatusUpdateMessage(res.data.message));
      return res.data;
    } catch (err) {
      console.error("Apply Job Error:", err.response?.data || err.message);
      dispatch(
        setStatusUpdateMessage(err.response?.data?.message || "Failed to apply")
      );
    }
  };

  const getAppliedJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/applied`, {
        withCredentials: true,
      });
      dispatch(setAppliedJobs(res.data.applications || []));
    } catch (err) {
      console.error("Get Applied Jobs Error:", err.response?.data || err.message);
    }
  };

  // RECRUITER SIDE

  const getAllApplicants = async () => {
    try {
      const res = await axios.get(`${API_URL}/recruiter/all`, {
        withCredentials: true,
      });
      dispatch(setAllApplications(res.data.applications || []));
    } catch (err) {
      console.error("Get All Applicants Error:", err.response?.data || err.message);
    }
  };

  const getApplicantsForJob = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/applicants/${id}`, {
        withCredentials: true,
      });
      dispatch(setApplicantsForJob(res.data.applications || []));
    } catch (err) {
      console.error("Get Applicants Error:", err.response?.data || err.message);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const res = await axios.patch(
        `${API_URL}/status/${applicationId}`,
        { status },
        { withCredentials: true }
      );

      // Instantly update Redux state
      dispatch(updateApplicationStatusInStore({ applicationId, status }));
      dispatch(setStatusUpdateMessage(res.data.message));
      return res.data;
    } catch (err) {
      console.error("Update Status Error:", err.response?.data || err.message);
      dispatch(
        setStatusUpdateMessage(
          err.response?.data?.message || "Failed to update status"
        )
      );
      throw err;
    }
  };

  const deleteApplication = async (applicationId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/applicants/${applicationId}`,
        { withCredentials: true }
      );

      // Instantly purge item from Redux state
      dispatch(removeApplicationFromStore(applicationId));
      dispatch(setStatusUpdateMessage(res.data.message));
      return res.data;
    } catch (err) {
      console.error("Delete Application Error:", err.response?.data || err.message);
      dispatch(
        setStatusUpdateMessage(
          err.response?.data?.message || "Failed to delete application"
        )
      );
      throw err;
    }
  };

  // UTILS
  
  const clearMessage = () => dispatch(clearStatusMessage());

  return {
    allApplications,
    appliedJobs,
    applicantsForJob,
    singleApplication,
    statusUpdateMessage,
    applyJob,
    getAppliedJobs,
    getAllApplicants,
    getApplicantsForJob,
    updateApplicationStatus,
    deleteApplication,
    clearMessage,
  };
};

export default useApplication;