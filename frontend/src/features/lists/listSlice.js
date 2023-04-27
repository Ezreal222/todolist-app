import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listService from './listService';

const initialState = {
  lists: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Fetch lists
export const fetchLists = createAsyncThunk('lists/fetchLists', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await listService.getLists(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new list
export const createList = createAsyncThunk('lists/createList', async (name, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await listService.addList(name, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete list
export const removeList = createAsyncThunk('lists/removeList', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await listService.deleteList(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch tasks for a specific list
export const fetchListTasks = createAsyncThunk('lists/fetchListTasks', async (listId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await listService.getListTasks(listId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists.filter((list) => list._id !== action.payload._id);
      })
      .addCase(removeList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    .addCase(fetchListTasks.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchListTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const list = state.lists.find((list) => list._id === action.meta.arg);
      if (list) {
        list.tasks = action.payload;
      }
    })
    .addCase(fetchListTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = listSlice.actions;
export default listSlice.reducer;
