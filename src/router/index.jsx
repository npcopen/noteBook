import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import NotesPage from '../pages/NotesPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import RequireAuth from '../components/auth/RequireAuth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/notes" replace />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/',
    element: <RequireAuth><MainLayout /></RequireAuth>,
    children: [
      {
        path: 'notes',
        element: <NotesPage />
      }
    ]
  }
]) 