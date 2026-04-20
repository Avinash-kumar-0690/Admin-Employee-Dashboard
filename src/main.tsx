import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {routes} from './routes'
import "./index.css"
import App from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './hooks/useAuth';


const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes}/>
    </QueryClientProvider>
    </AuthProvider>

  </StrictMode>,
)
