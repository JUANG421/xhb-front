// 登录页面交互功能
import { reactive, ref, computed, nextTick, onMounted } from 'vue'

// 响应式数据
export const loginData = reactive({
  username: '',
  password: '',
  showPassword: false,
  isLoading: false,
  isSubmitted: false,
  errorMessage: '',
  successMessage: ''
})



// 本地存储键名
const STORAGE_KEYS = {
  LOGIN_STATUS: 'loginStatus',
  USERNAME: 'savedUsername',
  REMEMBER_LOGIN: 'rememberLogin'
}

// 计算属性：表单是否有效
export const isFormValid = computed(() => {
  return loginData.username.trim() !== '' && 
         loginData.password.trim() !== '' && 
         !loginData.isLoading
})

// 切换密码显示/隐藏
export function togglePassword() {
  loginData.showPassword = !loginData.showPassword
}

// 表单验证
export function validateForm() {
  return loginData.username.trim() !== '' && loginData.password.trim() !== ''
}

// 清空表单
export function clearForm() {
  loginData.username = ''
  loginData.password = ''
  loginData.showPassword = false
  loginData.errorMessage = ''
  loginData.successMessage = ''
}

// 清空密码
export function clearPassword() {
  loginData.password = ''
}

// 保存登录状态到本地存储
export function saveLoginStatus(username) {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGIN_STATUS, 'true')
    localStorage.setItem(STORAGE_KEYS.USERNAME, username)
    localStorage.setItem(STORAGE_KEYS.REMEMBER_LOGIN, 'true')
  } catch (error) {
    console.error('保存登录状态失败:', error)
  }
}

// 检查登录状态
export function checkLoginStatus() {
  try {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.LOGIN_STATUS) === 'true'
    const savedUsername = localStorage.getItem(STORAGE_KEYS.USERNAME)
    
    if (isLoggedIn && savedUsername) {
      loginData.username = savedUsername
      return true
    }
  } catch (error) {
    console.error('检查登录状态失败:', error)
  }
  return false
}

// 清除登录状态
export function clearLoginStatus() {
  try {
    localStorage.removeItem(STORAGE_KEYS.LOGIN_STATUS)
    localStorage.removeItem(STORAGE_KEYS.USERNAME)
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_LOGIN)
  } catch (error) {
    console.error('清除登录状态失败:', error)
  }
}

// 显示错误提示
export function showError(message) {
  alert(message)
}

// 显示成功提示
export function showSuccess(message) {
  alert(message)
}

// 模拟登录API调用
async function callLoginAPI(username, password) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // 模拟登录验证（这里可以替换为真实的API调用）
  if (username === 'admin' && password === '123456') {
    return {
      success: true,
      data: {
        token: 'mock_token_' + Date.now(),
        user: {
          id: 1,
          username: username,
          nickname: '管理员'
        }
      }
    }
  } else {
    throw new Error('账号或密码错误')
  }
}

// 主要登录函数
export async function handleLogin() {
  // 防止重复提交
  if (loginData.isLoading) {
    return
  }
  
  // 表单验证
  if (!validateForm()) {
    showError('请填写完整的账号和密码')
    return
  }
  
  // 设置加载状态
  loginData.isLoading = true
  
  try {
    // 调用登录API
    const response = await callLoginAPI(loginData.username, loginData.password)
    
    if (response.success) {
      // 登录成功
      showSuccess('登录成功！')
      
      // 保存登录状态
      saveLoginStatus(loginData.username)
      
      // 模拟跳转到首页
      setTimeout(() => {
        console.log('跳转到首页...')
        alert('登录成功！即将跳转到首页...')
      }, 1000)
      
    } else {
      throw new Error('登录失败')
    }
    
  } catch (error) {
    console.error('登录失败:', error)
    
    // 显示错误信息
    const errorMsg = error.message || '登录失败，请检查网络连接'
    showError(errorMsg)
    
    // 清空密码
    clearPassword()
    
  } finally {
    // 重置状态
    loginData.isLoading = false
  }
}

// 处理回车键提交
export function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    handleLogin()
  }
}

// 处理忘记密码
export function handleForgotPassword() {
  showError('忘记密码功能正在开发中...')
}

// 处理注册账号
export function handleRegister() {
  // 觸發切換到註冊頁面的事件
  const event = new CustomEvent('switch-to-register')
  window.dispatchEvent(event)
}

// 页面初始化
export function initLoginPage() {
  // 检查是否已登录
  if (checkLoginStatus()) {
    console.log('检测到已登录状态')
    // 可以在这里直接跳转到首页
  }
  
  // 自动聚焦到用户名输入框
  nextTick(() => {
    const usernameInput = document.querySelector('.account-input input')
    if (usernameInput) {
      usernameInput.focus()
    }
  })
}

// 网络错误处理
export function handleNetworkError() {
  showError('网络连接失败，请检查网络设置')
}

// 防抖函数
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 导出防抖的登录函数
export const debouncedLogin = debounce(handleLogin, 300)

// 导出节流的登录函数
export const throttledLogin = throttle(handleLogin, 1000)
