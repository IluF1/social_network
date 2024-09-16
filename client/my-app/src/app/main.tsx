import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router'
import { store } from './store'
import './assets/styles/reset.css'
import './assets/styles/index.css'
import { Header } from '@/widgets/Header/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import { HideComponentOnPage } from '@/shared/Helpers/HideComponentOnPage'
import { ThemeProvider } from '@/shared/ui/ThemeProvider'

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HideComponentOnPage>
        <Header />
        <Sidebar />
      </HideComponentOnPage>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </Provider>
);
