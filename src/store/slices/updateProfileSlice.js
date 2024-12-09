import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  isUpdated: false,
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    updateRequest(state) {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
    },
    updateSuccess(state) {
      state.loading = false;
      state.error = null;
      state.isUpdated = true;
    },
    updateFailed(state, action) {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
      state.isUpdated = false;
    },
    resetProfileState(state) {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateRequest());
  try {
    const response = await axios.put(
      "https://job-portal-grsh.onrender.com/api/v1/user/update/profile",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateProfileSlice.actions.updateSuccess());
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message || "Failed to update profile.";
    dispatch(updateProfileSlice.actions.updateFailed(errorMessage));
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateRequest());
  try {
    const response = await axios.put(
      "https://job-portal-grsh.onrender.com/api/v1/user/update/password",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(updateProfileSlice.actions.updateSuccess());
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.message || error.message || "Failed to update password.";
    dispatch(updateProfileSlice.actions.updateFailed(errorMessage));
  }
};


export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.resetProfileState());
};

export default updateProfileSlice.reducer;
