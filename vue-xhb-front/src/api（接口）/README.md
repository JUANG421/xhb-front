# API接口规范文档

## 目录结构

```
src/api/
├── index.js          # API统一导出
├── config.js         # API配置文件
├── login.js          # 登录相关API
└── README.md         # 本文档
```

## 接口规范

### 1. 基础配置

所有API接口都通过 `axios` 进行HTTP请求，基础配置在 `config.js` 中定义：

- **开发环境**: `http://localhost:3000/api`
- **生产环境**: `https://your-production-api.com/api`
- **超时时间**: 开发环境10秒，生产环境15秒

### 2. 请求拦截器

自动添加以下功能：
- 请求头添加 `Content-Type: application/json`
- 自动添加 `Authorization: Bearer {token}` 到请求头
- 统一的错误处理

### 3. 响应拦截器

自动处理以下情况：
- 401: 未授权，自动清除token并跳转登录页
- 403: 权限不足
- 404: 接口不存在
- 500: 服务器错误

## 登录相关接口

### 用户登录
```javascript
import { login } from './api/login.js'

const response = await login({
  username: 'admin',
  password: '123456'
})
```

**请求参数:**
- `username`: 用户名
- `password`: 密码

**响应格式:**
```javascript
{
  success: true,
  code: 200,
  message: "登录成功",
  data: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    user: {
      id: 1,
      username: "admin",
      nickname: "管理员",
      email: "admin@example.com"
    }
  }
}
```

### 用户登出
```javascript
import { logout } from './api/login.js'

const response = await logout()
```

### 获取用户信息
```javascript
import { getUserInfo } from './api/login.js'

const response = await getUserInfo()
```

### 检查登录状态
```javascript
import { checkLoginStatus } from './api/login.js'

const response = await checkLoginStatus()
```

### 忘记密码
```javascript
import { forgotPassword } from './api/login.js'

const response = await forgotPassword('user@example.com')
```

### 重置密码
```javascript
import { resetPassword } from './api/login.js'

const response = await resetPassword({
  token: 'reset_token',
  newPassword: 'new_password'
})
```

### 用户注册
```javascript
import { register } from './api/login.js'

const response = await register({
  username: 'newuser',
  email: 'newuser@example.com',
  password: 'password123'
})
```

## 错误处理

### 错误消息常量
```javascript
import { ERROR_MESSAGES } from './api/config.js'

console.log(ERROR_MESSAGES.NETWORK_ERROR)  // "网络连接失败，请检查网络设置"
console.log(ERROR_MESSAGES.UNAUTHORIZED)    // "登录已过期，请重新登录"
```

### 状态码常量
```javascript
import { HTTP_STATUS } from './api/config.js'

console.log(HTTP_STATUS.OK)                 // 200
console.log(HTTP_STATUS.UNAUTHORIZED)       // 401
console.log(HTTP_STATUS.FORBIDDEN)          // 403
```

## 本地存储键名

```javascript
import { STORAGE_KEYS } from './api/config.js'

// 存储token
localStorage.setItem(STORAGE_KEYS.TOKEN, 'your_token')

// 存储用户信息
localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo))

// 存储登录状态
localStorage.setItem(STORAGE_KEYS.LOGIN_STATUS, 'true')
```

## 使用示例

### 在组件中使用API
```javascript
// 在 denglu.js 中的使用示例
import { login, logout, getUserInfo } from './api/login.js'
import { ERROR_MESSAGES } from './api/config.js'

// 登录
try {
  const response = await login({
    username: loginData.username,
    password: loginData.password
  })
  
  if (response.success) {
    // 登录成功处理
    saveLoginStatus(loginData.username, response.data.token, response.data.user)
  }
} catch (error) {
  // 错误处理
  showError(error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR)
}
```

## 备用方案

当真实API不可用时，系统会自动使用模拟登录：

- **测试账号**: `admin`
- **测试密码**: `123456`
- **模拟延迟**: 1.5秒

## 环境变量配置

在项目根目录创建 `.env` 文件：

```env
# 开发环境
VUE_APP_API_BASE_URL=http://localhost:3000/api

# 生产环境
VUE_APP_API_BASE_URL=https://your-production-api.com/api
```

## 扩展新接口

1. 在 `src/api/` 目录下创建新的API文件（如 `user.js`）
2. 在 `src/api/index.js` 中导出新模块
3. 在 `src/api/config.js` 中添加新的端点配置

```javascript
// 示例：添加用户相关接口
// src/api/user.js
export async function updateProfile(userData) {
  return await apiClient.put('/user/profile', userData)
}

// src/api/index.js
export * from './user.js'

// src/api/config.js
USER: {
  UPDATE_PROFILE: '/user/profile'
}
```

## 注意事项

1. **错误处理**: 所有API调用都应该使用 try-catch 包装
2. **加载状态**: 在API调用期间显示加载状态
3. **用户反馈**: 成功/失败都要给用户明确的反馈
4. **Token管理**: 自动处理token的添加和清除
5. **网络错误**: 提供备用方案（如模拟登录） 