import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import saleService from "./saleService";

const initialState = {
  sales: [],
  editSale: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  isUpdated: false,
  message: "",
};

export const allSales = createAsyncThunk(
  "sales/all",
  async (data, thunkAPI) => {
    try {
      return await saleService.allSales();
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
export const createSales = createAsyncThunk(
  "sales/create",
  async (data, thunkAPI) => {
    try {
      return await saleService.createSales(data);
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
export const updateSales = createAsyncThunk(
  "sales/update",
  async (data, thunkAPI) => {
    try {
      return await saleService.updateSales(data);
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
export const deleteSales = createAsyncThunk(
  "sales/delete",
  async (data, thunkAPI) => {
    try {
      return await saleService.deleteSales(data);
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
export const saleSlice = createSlice({
  name: "saleState",
  initialState,
  reducers: {
    reset: (state) => {
      state.sales = null;
      state.editSale = null;
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
    updateSale: (state, action) => {
      state.editSale = action.payload;
    },
    resetUpdated:(state)=>{
      state.editSale={}
      state.isUpdated=false
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(allSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sales = action.payload;
      })
      .addCase(allSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = false;
        state.sales = [...state.sales,action.payload];
      })
      .addCase(createSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.isUpdated = true;
        state.sales = state.sales.map((data) =>
          data.id === action.payload.id ? action.payload : data
        );
      })
      .addCase(updateSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sales = state.sales.filter(
          (data) => data.id != action.payload
        );
      })
      .addCase(deleteSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetError, updateSale,resetUpdated } = saleSlice.actions;
export default saleSlice.reducer;
