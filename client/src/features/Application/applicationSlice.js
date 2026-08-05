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

    // --- Real-Time Update Reducers ---
    removeApplicationFromStore: (state, action) => {
      const applicationId = action.payload;
      state.applicantsForJob = state.applicantsForJob.filter(
        (app) => app._id !== applicationId
      );
      state.allApplications = state.allApplications.filter(
        (app) => app._id !== applicationId
      );
      state.appliedJobs = state.appliedJobs.filter(
        (app) => app._id !== applicationId
      );
    },

    updateApplicationStatusInStore: (state, action) => {
      const { applicationId, status } = action.payload;
      const updateItem = (app) =>
        app._id === applicationId ? { ...app, status } : app;

      state.applicantsForJob = state.applicantsForJob.map(updateItem);
      state.allApplications = state.allApplications.map(updateItem);
      state.appliedJobs = state.appliedJobs.map(updateItem);
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
  removeApplicationFromStore,
  updateApplicationStatusInStore,
} = applicationSlice.actions;

export default applicationSlice.reducer;
