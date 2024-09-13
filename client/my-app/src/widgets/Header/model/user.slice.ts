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
    avatar:
      "  https://i.pinimg.com/564x/36/72/fa/3672fae383c1cbabe5bf4408c9e4ef2b.jpg",
    login: "",
    email: "",
  },
  status: "idle",
  error: null,
};

interface IGetUserByRefreshArgs {
  refreshToken: string;
}

export const getUserByRefresh = createAsyncThunk<IUser, IGetUserByRefreshArgs>(
  "user/getUserByRefresh",
  async ({ refreshToken }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/refreshToken", {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error) {
      // Убедитесь, что error имеет правильную структуру
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
      .addCase(getUserByRefresh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByRefresh.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null; // Сбрасываем ошибку при успешном выполнении
      })
      .addCase(getUserByRefresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Сохраняем сообщение об ошибке
      });
  },
});

// Экспортируем действия и редьюсер
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
