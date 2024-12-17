import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import LoginPage from '../pages/LoginPage'
import NotesPage from '../pages/NotesPage'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'notes',
        element: (
          <PrivateRoute>
            <NotesPage />
          </PrivateRoute>
        )
      }
    ]
  }
]) 