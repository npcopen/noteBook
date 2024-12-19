import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const authService = {
  /**
   * 用户登录
   * @param {string} username 用户名
   * @param {string} password 密码
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(username, password) {
    try {
      // 1. 验证用户
      const { data: users } = await axios.get(`${API_URL}/users`, {
        params: { username }
      });

      const user = users.find(u => u.username === username && u.password === password);
      
      if (!user) {
        throw new Error('用户名或密码错误');
      }

      // 2. 创建新的 token
      const token = `mock-token-${Math.random().toString(36).slice(2)}`;
      const tokenData = {
        user_id: user.id,
        token,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      await axios.post(`${API_URL}/user_tokens`, tokenData);

      // 3. 返回用户信息和token
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  /**
   * 用户注册
   * @param {object} userData 用户数据
   * @returns {Promise<{token: string, user: object}>}
   */
  async register(userData) {
    try {
      // 1. 检查用户名是否已存在
      const { data: existingUsers } = await axios.get(`${API_URL}/users`, {
        params: { username: userData.username }
      });

      if (existingUsers.length > 0) {
        throw new Error('用户名已存在');
      }

      // 2. 创建新用户
      const newUser = {
        ...userData,
        created_at: new Date().toISOString()
      };

      const { data: user } = await axios.post(`${API_URL}/users`, newUser);

      // 3. 创建token
      const token = `mock-token-${Math.random().toString(36).slice(2)}`;
      const tokenData = {
        user_id: user.id,
        token,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      await axios.post(`${API_URL}/user_tokens`, tokenData);

      // 4. 返回用户信息和token
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  /**
   * 获取用户信息
   * @param {string} token 
   * @returns {Promise<object>}
   */
  async getUserInfo(token) {
    try {
      // 1. 获取 token 信息
      const { data: tokens } = await axios.get(`${API_URL}/user_tokens`, {
        params: { token }
      });

      if (tokens.length === 0) {
        throw new Error('Invalid token');
      }

      const tokenData = tokens[0];

      // 2. 获取用户信息
      const { data: users } = await axios.get(`${API_URL}/users/${tokenData.user_id}`);
      
      // 3. 返回用户信息（不包含密码）
      const { password: _, ...userWithoutPassword } = users;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  },

  /**
   * 验证token
   * @param {string} token 
   * @returns {Promise<boolean>}
   */
  async validateToken(token) {
    try {
      const { data: tokens } = await axios.get(`${API_URL}/user_tokens`, {
        params: { token }
      });

      if (tokens.length === 0) {
        return false;
      }

      const tokenData = tokens[0];
      return new Date(tokenData.expires_at) > new Date();
    } catch (error) {
      return false;
    }
  },

  /**
   * 登出
   * @param {string} token 
   */
  async logout(token) {
    try {
      const { data: tokens } = await axios.get(`${API_URL}/user_tokens`, {
        params: { token }
      });

      if (tokens.length > 0) {
        await axios.delete(`${API_URL}/user_tokens/${tokens[0].id}`);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};

export default authService; 