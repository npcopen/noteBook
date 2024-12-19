import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 如果正在加载，显示加载状态
  if (loading) {
    return <div>Loading...</div>;
  }

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    // 保存当前路径，登录后可以重定向回来
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果用户已登录，显示受保护的内容
  return children;
}

export default RequireAuth; 