import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAllApplications,
  setAppliedJobs,
  setApplicantsForJob,
  setSingleApplication,
  setStatusUpdateMessage,
  clearStatusMessage,
} from "../features/Application/applicationSlice";
import {APPLICANTS_API_END_POINT} from "../utils/Host"

const API_URL = APPLICANTS_API_END_POINT; // 🔧 change base URL as needed

const useApplication = () => {
  const dispatch = useDispatch();
  const {
    allApplications,
    appliedJobs,
    applicantsForJob,
    singleApplication,
    statusUpdateMessage,
  } = useSelector((state) => state.application);

  // ==============================
  // USER SIDE
  // ==============================

  // Apply for a Job
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
      console.error("❌ Apply Job Error:", err.response?.data || err.message);
      dispatch(setStatusUpdateMessage(err.response?.data?.message || "Failed to apply"));
    }
  };

  // Get applied jobs for current user
  const getAppliedJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/my`, { withCredentials: true });
      dispatch(setAppliedJobs(res.data.applications || []));
    } catch (err) {
      console.error("❌ Get Applied Jobs Error:", err.response?.data || err.message);
    }
  };

  // ==============================
  // RECRUITER SIDE
  // ==============================

  // Get all applicants (for all jobs recruiter posted)
  const getAllApplicants = async () => {
    try {
      const res = await axios.get(`${API_URL}/recruiter/all`, { withCredentials: true });
      dispatch(setAllApplications(res.data.applications || []));
    } catch (err) {
      console.error("❌ Get All Applicants Error:", err.response?.data || err.message);
    }
  };

  // Get applicants for a specific job
  const getApplicantsForJob = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/applicants/${id}`, { withCredentials: true });
      console.log(res)
      dispatch(setApplicantsForJob(res.data.applications || []));
    } catch (err) {
      console.error("❌ Get Applicants For Job Error:", err.response?.data || err.message);
    }
  };

  // Update application status (applied → interview → offered → rejected)
  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const res = await axios.put(
        `${API_URL}/${applicationId}`,
        { status },
        { withCredentials: true }
      );
      dispatch(setStatusUpdateMessage(res.data.message));
      return res.data;
    } catch (err) {
      console.error("❌ Update Status Error:", err.response?.data || err.message);
      dispatch(setStatusUpdateMessage(err.response?.data?.message || "Failed to update status"));
    }
  };

  // ==============================
  // UTILS
  // ==============================
  const clearMessage = () => dispatch(clearStatusMessage());

  return {
    // state
    allApplications,
    appliedJobs,
    applicantsForJob,
    singleApplication,
    statusUpdateMessage,

    // actions
    applyJob,
    getAppliedJobs,
    getAllApplicants,
    getApplicantsForJob,
    updateApplicationStatus,
    clearMessage,
  };
};

export default useApplication;
