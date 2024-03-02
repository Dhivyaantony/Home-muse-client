import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Constants/constants';

const initialState = {
  tasks: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasks',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await AxiosInstance.get('/tasks/getAllTasks', config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define an async thunk for updating a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (updatedTask) => {
    try {
      const response = await AxiosInstance.put(`/tasks/${updatedTask._id}`, updatedTask); // Corrected URL
      console.log('Updated Task:', response.data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);


export const createTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/tasks/addTask', taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    try {
      await AxiosInstance.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllTasks.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.tasks = action.payload; // Update tasks state with the fetched tasks
      state.error = null; // Reset error to null on successful fetch
    })
    .addCase(fetchAllTasks.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.message; // Set error message from action payload
      console.error('Fetch all tasks failed:', action.payload); // Log the error payload
    })
    
    .addCase(updateTask.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateTask.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.tasks = state.tasks.map(task => (task._id === action.payload._id ? action.payload : task));
    })
    .addCase(updateTask.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message; // Assuming action.error.message contains the error message
    })
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addMatcher(
        action => [fetchAllTasks.pending, createTask.pending, deleteTask.pending].includes(action.type),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        action => [fetchAllTasks.rejected, createTask.rejected, deleteTask.rejected].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload.message;
        }
      );
  },
});

export default tasksSlice.reducer;
