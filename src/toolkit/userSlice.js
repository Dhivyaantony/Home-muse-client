// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userDetails: JSON.parse(localStorage.getItem('user')) ?? {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Update localStorage
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
 