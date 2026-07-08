import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  step: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.role = action.payload.role; // Update user property
      state.step = action.payload.step; // Update step property
    },
    clearUser: (state) => {
      state.role = null;
      state.step = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
