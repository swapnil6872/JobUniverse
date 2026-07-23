import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    allApplications: [],     // all applications (for recruiter)
    appliedJobs: [],         // jobs applied by user
    applicantsForJob: [],    // applicants of specific job
    singleApplication: null, // single application details 
    statusUpdateMessage: "", // success message after status update
  },
  reducers: {
    setAllApplications: (state, action) => {
      state.allApplications = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setApplicantsForJob: (state, action) => {
      state.applicantsForJob = action.payload;
    },
    setSingleApplication: (state, action) => {
      state.singleApplication = action.payload;
    },
    setStatusUpdateMessage: (state, action) => {
      state.statusUpdateMessage = action.payload;
    },
    clearStatusMessage: (state) => {
      state.statusUpdateMessage = "";
    },
  },
});

export const {
  setAllApplications,
  setAppliedJobs,
  setApplicantsForJob,
  setSingleApplication,
  setStatusUpdateMessage,
  clearStatusMessage,
} = applicationSlice.actions;

export default applicationSlice.reducer;
