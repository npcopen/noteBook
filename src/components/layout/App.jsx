import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import { router } from '../../router'
import '../../styles/app.css'

/**
 * 应用程序的根组件
 * 负责管理全局状态和布局结构
 */
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App 