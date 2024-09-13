import { instance } from "@/shared";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IUser {
  name?: string;
  avatar?: string;
  login?: string;
  email?: string;
  password: string;
}

interface IInitialState {
  user: IUser;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IInitialState = {
  user: {
    name: "",
    password: "",
    avatar: "",
    login: "",
    email: "",
  },
  status: "idle",
  error: null,
  accessToken: null,
  refreshToken: null,
};

export const authApi = createAsyncThunk(
  "auth/authApi",
  async ({ login, email, password }: IUser, { rejectWithValue }) => {
    try {
      const response = await instance.post("/login", {
        login: login || undefined,
        email: email || undefined,
        password,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const refreshTokenApi = createAsyncThunk(
  "auth/refreshTokenApi",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await instance.post("/login/refresh", {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("accessToken", action.payload.access_token);
        localStorage.setItem("refreshToken", action.payload.refresh_token);
        state.user = action.payload;
      })
      .addCase(authApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(refreshTokenApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshTokenApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("accessToken", action.payload.access_token);
      })
      .addCase(refreshTokenApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
