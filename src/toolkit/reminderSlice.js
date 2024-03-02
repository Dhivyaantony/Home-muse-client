import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Constants/constants';

// Define the initial state for reminders
const initialState = {
  reminders: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Define an async thunk for creating a reminder
export const createReminder = createAsyncThunk(
  'reminders/createReminder',
  async (reminderData, thunkAPI) => {
    try {
      const response = await AxiosInstance.post('/api/reminders', reminderData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for reminders
const reminderSlice = createSlice({
  name: 'reminders',
  initialState, // Set the initial state
  reducers: {}, // No additional reducers defined
  extraReducers: (builder) => {
    builder
      .addCase(createReminder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReminder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reminders.push(action.payload); // Add the new reminder to the reminders array
        state.error = null;
      })
      .addCase(createReminder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message; // Set error message in case of failure
      });
  },
});

export default reminderSlice.reducer;
