import { postId, postIdSlice } from '@/entities/Post/model/post.slice'
import { authSlice } from '@/pages/Auth/model/auth.slice'
import { registrationSlice } from '@/pages/Registration/model/registration.slice'
import  userSlice  from '@/widgets/Header/model/user.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
  auth: authSlice.reducer,
  registration: registrationSlice.reducer,
  user: userSlice,
  post: postId
})

export const store = configureStore({
  reducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
