import { instance } from "@/shared";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  name: string;
  avatar: string;
  login: string;
  email: string;
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
    avatar: '',
    login: "",
    email: "",
  },
  status: "idle",
  error: null,
};

interface IGetUserBySessionToken {
  session: string;
}

export const getUserBySessionToken = createAsyncThunk<IUser, IGetUserBySessionToken>(
  "user/getUserBySessionToken",
  async ({ session }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/session", {
        sessionToken: session,
      });
      return response.data;
    } catch (error) {
      const message =
        (error as any)?.response?.data?.message || "Что-то пошло не так";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserBySessionToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserBySessionToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserBySessionToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
