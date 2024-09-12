import { instance } from '@/shared'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  login: string
  email: string
  name: string
  password: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

interface IUser {
  login?: string
  email?: string
  name?: string
  password: string
}

const initialState: IInitialState = {
  login: '',
  email: '',
  password: '',
  status: 'idle',
  error: null,
  name: '',
}

export const registrationApi = createAsyncThunk(
  'registration/registrationApi',
  async ({ login, email, password, name }: IUser, { rejectWithValue }) => {
    try {
      const response = await instance.post('/registration', {
        login,
        name,
        email,
        password,
      })
      return response.data
    }
    catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error || 'Что-то пошло не так',
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
      .addCase(registrationApi.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const { clearError } = registrationSlice.actions

export default registrationSlice.reducer
