import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthProvider>
      <AppProvider>
        <App />
        <Toaster />
      </AppProvider>
    </AuthProvider>
  </ThemeProvider>
);