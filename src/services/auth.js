import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    })
    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  } catch (error) {
    throw new Error(error.response?.data?.message || '登录失败')
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
} 