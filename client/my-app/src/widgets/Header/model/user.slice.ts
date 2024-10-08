import { instance } from "@/shared";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  name: string;
  avatar: string;
  login: string;
  email: string;
  password: string;
  id: number
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
    id: 0
  },
  status: "idle",
  error: null,
};

interface IGetUserBySessionToken {
  session: string;
}

export const getUserBySessionToken = createAsyncThunk<
  IUser,
  IGetUserBySessionToken
>("user/getUserBySessionToken", async ({ session }, { rejectWithValue }) => {
  try {
    const response = await instance.post("/user/getUserBySession", {
      sessionToken: session,
    });
    return response.data;
  } catch (error) {
    const message =
      (error as any)?.response?.data?.message || "Что-то пошло не так";
    return rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (session: string) => {
    try {
      const response = await instance.post("/user/logout", { sessionToken: session });

      return response.data
    }catch(err) {
      console.error(err)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
            id: 0
          };
        }
      });
  },
});

export default userSlice.reducer;
