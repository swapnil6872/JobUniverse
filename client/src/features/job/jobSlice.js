import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    
    // --- REAL-TIME DELETION REDUCER ---
    removeJobFromStore: (state, action) => {
      const jobId = action.payload;
      state.allAdminJobs = state.allAdminJobs.filter((job) => job._id !== jobId);
      state.allJobs = state.allJobs.filter((job) => job._id !== jobId);
      if (state.singleJob?._id === jobId) {
        state.singleJob = null;
      }
    },
  },
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setSingleJob,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  removeJobFromStore,
} = jobSlice.actions;

export default jobSlice.reducer;