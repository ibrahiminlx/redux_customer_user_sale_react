import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
  customers: [],
  editCustomer: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  isUpdated: false,
  message: "",
};
export const allCustomers = createAsyncThunk(
  "customer/all",
  async (data, thunkAPI) => {
    try {
      return await customerService.allCustomers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createCustomer = createAsyncThunk(
  "customer/create",
  async (data, thunkAPI) => {
    try {
      return await customerService.createCustomer(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (data, thunkAPI) => {
    try {
      return await customerService.updateCustomer(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (data, thunkAPI) => {
    try {
      return await customerService.deleteCustomer(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const customerSlice = createSlice({
  name: "customerState",
  initialState,
  reducers: {
    reset: (state) => {
      state.customers = null;
      state.editCustomer = null;
      state.isUpdated = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetError: (state) => {
      state.isError = false;
      state.message = "";
    },
    updateCustomerState: (state, action) => {
      state.editCustomer = action.payload;
    },
    resetUpdated:(state)=>{
        state.editCustomer={}
        state.isUpdated=false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(allCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(allCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = false;
        state.customers = [...state.customers,action.payload];
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.isUpdated = true;
        state.customers = state.customers.map((data) =>
          data.id === action.payload.id ? action.payload : data
        );
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = state.customers.filter(
          (data) => data.id != action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {reset,resetError,updateCustomerState,resetUpdated}=customerSlice.actions
export default customerSlice.reducer