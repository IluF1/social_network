import { ThemeProvider } from '@/shared'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router'
import { store } from './store'
import './assets/styles/reset.css'
import './assets/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Router} />
    </ThemeProvider>
  </Provider>,
)
