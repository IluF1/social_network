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

export const registrationApi = createAsyncThunk(
  'registration/registrationApi',
  async ({ login, email, password }: IUser, { rejectWithValue }) => {
    try {
      const response = await instance.post('/registration', {
        login,
        email,
        password,
      })
      return response.data
    }
    catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error || 'Something went wrong',
      )
    }
  },
)

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationApi.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registrationApi.fulfilled, (state) => {
        state.status = 'succeeded'
      })
  },
})

export const { clearError } = registrationSlice.actions

export default registrationSlice.reducer
