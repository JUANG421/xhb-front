<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="page-content-center">
      <div class="header-section logo-top">
        <div class="main-title">
          <span class="main-shadow">心禾伴</span>
        </div>
        <div class="slogan">以“心灵”为原点，以“陪伴”为纽带，以“成长”为目标</div>
      </div>
      <div class="content-layer form-bottom">
        <div class="login-form-section">
          <h2 class="welcome-text">您好, 欢迎登录!</h2>
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="input-group">
              <label class="input-label">账号</label>
              <div class="input-container">
                <input 
                  v-model="formData.username" 
                  type="text" 
                  class="input-field"
                  placeholder="请输入账号"
                  required
                />
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">密码</label>
              <div class="input-container">
                <input 
                  v-model="formData.password" 
                  :type="showPassword.value ? 'text' : 'password'" 
                  class="input-field"
                  placeholder="请输入密码"
                  required
                />
                <button 
                  type="button" 
                  class="password-toggle"
                  @click="togglePassword"
                >
                  <i class="eye-icon" :class="showPassword.value ? 'eye-open' : 'eye-closed'"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="login-button" :disabled="!isFormValid">
              登录
            </button>
          </form>
          <div class="bottom-links">
            <a href="#" class="link" @click.prevent="handleForgotPassword">忘记密码?</a>
            <span class="separator">|</span>
            <a href="#" class="link" @click.prevent="handleRegister">注册账号</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const formData = reactive({
  username: '',
  password: ''
})
const showPassword = reactive({ value: false })
const isFormValid = computed(() => formData.username.trim() && formData.password.trim())

function togglePassword() {
  showPassword.value = !showPassword.value
}
function handleForgotPassword() {
  alert('忘记密码功能待实现')
}
function handleRegister() {
  alert('注册功能待实现')
}
async function handleLogin() {
  if (!isFormValid.value) {
    alert('请填写完整的账号和密码')
    return
  }
  try {
    // TODO: 这里需要和后端联调
    console.log('登录信息:', formData)
    // 模拟登录成功
    alert('登录成功！')
    // TODO: 跳转到后续页面
    // this.$router.push('/dashboard')
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试')
  }
}
</script>

<style>
:global(body), :global(html), :global(#app) {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #b3e5fc;
}
.login-container {
  position: fixed;
  left: 0; top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Microsoft YaHei', sans-serif;
  overflow: hidden;
  z-index: 0;
}
.background-image {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: #b3e5fc;
  z-index: 1;
  pointer-events: none;
}
.page-content-center {
  position: relative;
  z-index: 2;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.logo-top {
  margin-top: 13vh;
  margin-bottom: 0;
  flex: 0 0 auto;
}
.form-bottom {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
.header-section {
  text-align: center;
  z-index: 3;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.08);
  pointer-events: auto;
}
.main-title {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 54px;
  font-weight: bold;
  letter-spacing: 0;
  margin-bottom: 10px;
  gap: 18px;
}
.heart-icon {
  font-size: 38px;
  margin-right: 2px;
  margin-bottom: 6px;
}
.main-text {
  color: #fff;
  font-size: 60px;
  font-weight: bold;
  margin-right: 2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
  letter-spacing: 0;
}
.main-shadow {
  color: #fff;
  font-size: 54px;
  font-weight: bold;
  text-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12);
  margin-left: 2px;
  letter-spacing: 8px;
}
.trademark {
  font-size: 18px;
  margin-left: 6px;
  color: #fff;
  opacity: 0.7;
  margin-bottom: 8px;
}
.slogan {
  color: #4a6a7b;
  font-size: 16px;
  margin: 0 0 10px 0;
  line-height: 1.4;
  text-align: center;
  text-shadow: none;
}
.content-layer {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}
.login-form-section {
  width: 100%;
  max-width: 370px;
  background: rgba(255,255,255,0.88);
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding: 28px 24px 22px 24px;
  pointer-events: auto;
  z-index: 4;
  margin: 0 auto;
}
.welcome-text {
  color: #222;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 18px;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.input-label {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}
.input-container {
  position: relative;
  display: flex;
  align-items: center;
}
.input-field {
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 16px;
  background: #F5F5DC;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}
.input-field:focus {
  background: #FFF8DC;
  box-shadow: 0 0 0 2px rgba(135, 206, 235, 0.2);
}
.password-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 3px;
}
.eye-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  position: relative;
}
.eye-closed::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  border: 2px solid #666;
  border-radius: 50%;
}
.eye-closed::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 16px;
  background: #666;
  transform: translate(-50%, -50%) rotate(45deg);
}
.eye-open::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  border: 2px solid #666;
  border-radius: 50%;
}
.eye-open::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 7px;
  height: 7px;
  background: #666;
  border-radius: 50%;
}
.login-button {
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(90deg, #FFD700, #87CEEB);
  color: #333;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}
.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.bottom-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}
.link {
  color: #228B22;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s ease;
}
.link:hover {
  color: #32CD32;
}
.separator {
  color: #228B22;
  font-size: 13px;
}
@media (max-width: 480px) {
  .main-title {
    font-size: 32px;
    gap: 8px;
  }
  .main-text {
    font-size: 36px;
  }
  .main-shadow {
    font-size: 32px;
    letter-spacing: 2px;
  }
  .login-form-section {
    max-width: 98vw;
    padding: 8px 2vw 8px 2vw;
  }
  .welcome-text {
    font-size: 15px;
  }
}
</style> 