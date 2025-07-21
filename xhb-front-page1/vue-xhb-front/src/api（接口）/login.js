// 登录相关API接口
import axios from 'axios'

// API基础配置
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api'

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 添加token到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('权限不足')
          break
        case 404:
          console.error('接口不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error('网络错误')
      }
    }
    return Promise.reject(error)
  }
)

/**
 * 用户登录
 * @param {Object} loginData - 登录数据
 * @param {string} loginData.username - 用户名
 * @param {string} loginData.password - 密码
 * @returns {Promise} 登录结果
 */
export async function login(loginData) {
  try {
    const response = await apiClient.post('/auth/login', {
      username: loginData.username,
      password: loginData.password
    })
    return response
  } catch (error) {
    throw error
  }
}

/**
 * 用户登出
 * @returns {Promise} 登出结果
 */
export async function logout() {
  try {
    const response = await apiClient.post('/auth/logout')
    // 清除本地存储的token
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    return response
  } catch (error) {
    throw error
  }
}

/**
 * 获取用户信息
 * @returns {Promise} 用户信息
 */
export async function getUserInfo() {
  try {
    const response = await apiClient.get('/auth/user-info')
    return response
  } catch (error) {
    throw error
  }
}

/**
 * 刷新token
 * @returns {Promise} 新的token
 */
export async function refreshToken() {
  try {
    const response = await apiClient.post('/auth/refresh-token')
    return response
  } catch (error) {
    throw error
  }
}

/**
 * 检查登录状态
 * @returns {Promise} 登录状态
 */
export async function checkLoginStatus() {
  try {
    const response = await apiClient.get('/auth/check-status')
    return response
  } catch (error) {
    throw error
  }
}

/**
 * 忘记密码
 * @param {string} email - 邮箱地址
 * @returns {Promise} 发送结果
 */
export async function forgotPassword(email) {
  try {
    const response = await apiClient.post('/auth/forgot-password', {
      email: email
    })
    return response
  } catch (error) {
    throw error
  }
}

/**
 * 重置密码
 * @param {Object} resetData - 重置密码数据
 * @param {string} resetData.token - 重置token
 * @param {string} resetData.newPassword - 新密码
 * @returns {Promise} 重置结果
 */
export async function resetPassword(resetData) {
  try {
    const response = await apiClient.post('/auth/reset-password', resetData)
    return response
  } catch (error) {
    throw error
  }
}

/**
 * 用户注册
 * @param {Object} registerData - 注册数据
 * @param {string} registerData.username - 用户名
 * @param {string} registerData.email - 邮箱
 * @param {string} registerData.password - 密码
 * @returns {Promise} 注册结果
 */
export async function register(registerData) {
  try {
    const response = await apiClient.post('/auth/register', registerData)
    return response
  } catch (error) {
    throw error
  }
}

// 导出API客户端实例（用于其他模块使用）
export { apiClient } 