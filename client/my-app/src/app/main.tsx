import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router'
import { store } from './store'
import './assets/styles/reset.css'
import './assets/styles/index.css'
import { Header } from '@/widgets/Header/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <Header/>
      <Sidebar/>
      <RouterProvider router={Router} />
  </Provider>,
)
