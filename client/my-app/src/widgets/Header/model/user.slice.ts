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
    avatar: "",
    login: "",
    email: "",
  },
  status: "idle",
  error: null,
};

interface IGetUserBySessionToken {
  session: string;
}

// Запрос пользователя по токену сессии
export const getUserBySessionToken = createAsyncThunk<
  IUser,
  IGetUserBySessionToken
>("user/getUserBySessionToken", async ({ session }, { rejectWithValue }) => {
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
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = {
        name: "",
        password: "",
        avatar: "",
        login: "",
        email: "",
      };
      state.status = "idle";
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

        if (
          state.error?.includes("Unauthorized") ||
          state.error?.includes("Not Found")
        ) {
          state.user = {
            name: "",
            password: "",
            avatar: "",
            login: "",
            email: "",
          };
        }
      });
  },
});

export const { clearError, logout } = userSlice.actions;
export default userSlice.reducer;
