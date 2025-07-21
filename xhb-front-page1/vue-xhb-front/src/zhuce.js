import { ref, computed } from 'vue'

// 響應式數據
export const registerData = ref({
  username: '',
  password: '',
  email: '',
  isLoading: false
})

// 表單驗證
export const isFormValid = computed(() => {
  return registerData.value.username.trim() !== '' && 
         registerData.value.password.trim() !== '' && 
         registerData.value.email.trim() !== '' &&
         !registerData.value.isLoading
})

// 處理註冊
export const handleRegister = async () => {
  if (!isFormValid.value) return
  
  registerData.value.isLoading = true
  
  try {
    // 這裡可以添加註冊邏輯
    console.log('註冊信息:', {
      username: registerData.value.username,
      password: registerData.value.password,
      email: registerData.value.email
    })
    
    // 模擬API調用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 註冊成功後跳轉到登錄頁面
    alert('註冊成功！')
    // 這裡可以添加路由跳轉邏輯
  } catch (error) {
    console.error('註冊失敗:', error)
    alert('註冊失敗，請重試')
  } finally {
    registerData.value.isLoading = false
  }
}

// 處理按鍵事件
export const handleKeyPress = (event) => {
  if (event.key === 'Enter' && isFormValid.value) {
    handleRegister()
  }
}

// 返回登錄頁面
export const handleBackToLogin = () => {
  // 觸發切換到登錄頁面的事件
  const event = new CustomEvent('switch-to-login')
  window.dispatchEvent(event)
}

// 頁面初始化
export const initRegisterPage = () => {
  // 重置表單數據
  registerData.value = {
    username: '',
    password: '',
    email: '',
    isLoading: false
  }
  
  console.log('註冊頁面已初始化')
} 