import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import NotesPage from '../pages/NotesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'notes',
        element: <NotesPage />
      }
    ]
  }
]) 