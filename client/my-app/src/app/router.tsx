import { Auth } from '@/pages/Auth/Auth'
import { Home } from '@/pages/Home/Home'
import { Registration } from '@/pages/Registration/Registration'
import { createBrowserRouter, useLocation } from 'react-router-dom'


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/:login'
  },
  {
    path: '/post/:login/:id'
  }
])
