import { instance } from '@/shared'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  login: string
  email: string
  password: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

interface IUser {
  login?: string
  email?: string
  password: string
}

const initialState: IInitialState = {
  login: '',
  email: '',
  password: '',
  status: 'idle',
  error: null,
}

export const authApi = createAsyncThunk(
  'auth/authApi',
  async ({ login, email, password }: IUser, { rejectWithValue }) => {
    try {
      const response = await instance.post('/auth', {
        login: login || undefined,
        email: email || undefined,
        password,
      })
      return response.data
    }
    catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Something went wrong',
      )
    }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authApi.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(authApi.fulfilled, (state) => {
        state.status = 'succeeded'
      })
  },
})

export const { clearError } = authSlice.actions

export default authSlice.reducer
