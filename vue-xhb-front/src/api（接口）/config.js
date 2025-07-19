// API配置文件

// 环境配置
const ENV = process.env.NODE_ENV || 'development'

// API基础URL配置
export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000
  },
  production: {
    baseURL: 'https://your-production-api.com/api',
    timeout: 15000
  },
  test: {
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
  }
}

// 当前环境的API配置
export const CURRENT_API_CONFIG = API_CONFIG[ENV]

// API端点配置
export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    CHECK_STATUS: '/auth/check-status',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    USER_INFO: '/auth/user-info'
  },
  
  // 用户相关
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update-profile',
    CHANGE_PASSWORD: '/user/change-password',
    UPLOAD_AVATAR: '/user/upload-avatar'
  },
  
  // 其他模块可以在这里添加
  // MODULE_NAME: {
  //   ENDPOINT: '/module/endpoint'
  // }
}

// 请求状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  TIMEOUT_ERROR: '请求超时，请稍后重试',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNAUTHORIZED: '登录已过期，请重新登录',
  FORBIDDEN: '权限不足，无法访问',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION_ERROR: '输入数据有误，请检查后重试'
}

// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  LOGIN_STATUS: 'loginStatus',
  REMEMBER_LOGIN: 'rememberLogin',
  THEME: 'theme',
  LANGUAGE: 'language'
} 