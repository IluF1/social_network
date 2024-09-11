import { authSlice } from '@/pages/Auth/model/auth.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
  auth: authSlice.reducer,
})

export const store = configureStore({
  reducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
