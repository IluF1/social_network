import { instance } from "@/shared";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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
     if (response.data.sessionToken) {
       Cookies.set("sessionToken", response.data.sessionToken, { expires: 7 });
     }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Что-то пошло не так"
      );
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(authApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
  },
});



export default authSlice.reducer;
