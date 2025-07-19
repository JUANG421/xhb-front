<script setup>
// 登录页面组件
import { 
  loginData, 
  isFormValid, 
  handleLogin, 
  handleKeyPress, 
  handleForgotPassword, 
  handleRegister,
  initLoginPage 
} from './denglu.js'

// 页面初始化
initLoginPage()
</script>

<template>
  <div class="page">
    <!-- 背景图片 -->
    <div class="background-image"></div>
    
    <!-- 内容容器 -->
    <div class="content-container">
      <!-- 欢迎文字 -->
      <div class="welcome-text">您好，欢迎登录！</div>
      
      <!-- 账号输入框 -->
      <div class="input-container account-input">
        <input
          type="text"
          v-model="loginData.username"
          placeholder="请输入账号"
          class="input-field"
          @keyup="handleKeyPress"
          :disabled="loginData.isLoading"
        />
      </div>
      
      <!-- 密码输入框 -->
      <div class="input-container password-input">
        <input
          type="password"
          v-model="loginData.password"
          placeholder="请输入密码"
          class="input-field"
          @keyup="handleKeyPress"
          :disabled="loginData.isLoading"
        />
      </div>
      
      <!-- 登录按钮 -->
      <div 
        class="login-button"
        :class="{ 'disabled': !isFormValid }"
        @click="handleLogin"
      >
        <span class="login-text">
          {{ loginData.isLoading ? '登录中...' : '登录' }}
        </span>
      </div>
      
      <!-- 底部链接 -->
      <span class="forgot-password" @click="handleForgotPassword">忘记密码？|</span>
      <span class="register-account" @click="handleRegister">注册账号</span>
    </div>
  </div>
</template>

<style scoped lang="css">
/* ===== 全局重置 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 100vw;
  min-height: 100vh;
}
/* ===== 主容器样式 ===== */
.page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  filter: drop-shadow(0rem 0.13rem 0.13rem #00000040);
  background-image: url('https://ide.code.fun/api/image?token=6879c3d1797f850011081d0b&name=8801da88d4d88fa0eb315a5e16dd90fc.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* ===== 背景图片层 ===== */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url('https://ide.code.fun/api/image?token=6879c3d1797f850011081d0b&name=8801da88d4d88fa0eb315a5e16dd90fc.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  margin: 0;
  padding: 0;
}

/* ===== 手机端响应式样式 ===== */
@media screen and (max-width: 768px) {
  .page {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  .background-image {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}

@media screen and (max-width: 480px) {
  .page {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  .background-image {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}

/* ===== 横屏手机适配 ===== */
@media screen and (max-width: 768px) and (orientation: landscape) {
  .page {
    background-size: cover;
    background-position: center;
    margin: 0;
    padding: 0;
  }
  
  .background-image {
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}

/* ===== 确保背景在所有设备上正确显示 ===== */
@media screen and (max-width: 320px) {
  .page {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  .background-image {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}

/* ===== 内容容器 ===== */
.content-container {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
}

/* ===== 欢迎文字 "您好，欢迎登录！" ===== */
.welcome-text {
  position: absolute;
  color: #000000;
  font-size: 1.5rem;
  font-family: AlibabaPuHuiTi;
  font-weight: 700;
  line-height: 1.42;
  z-index: 2;
  bottom: 31%;
  left: 35%;
  transform: translateX(-50%);
}

/* ===== 输入框容器基础样式 ===== */
.input-container {
  position: absolute;
  width: calc(100% - 3rem);
  max-width: 350px;
  padding: 0.45rem 1.13rem 0.45rem;
  background-color: #faf7ef;
  border-radius: 1.25rem;
  z-index: 2;
  display: flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
}

/* ===== 账号输入框容器 ===== */
.account-input {
  bottom: 25%;
}

/* ===== 账号输入框内的文字标签 ===== */
.account-input .input-label {
  font-size: 1rem;
  font-family: AlibabaPuHuiTi;
  line-height: 0.9;
  color: #000000;
}

/* ===== 输入框样式 ===== */
.input-field {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-family: AlibabaPuHuiTi;
  color: #000000;
  padding: 0;
  margin: 0;
}

.input-field::placeholder {
  color: #999999;
  font-size: 0.9rem;
}

.input-field:focus {
  outline: none;
}

.input-field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== 密码输入框容器 ===== */
.password-input {
  padding: 0.45rem 1.13rem 0.45rem;
  display: flex;
  align-items: center;
  bottom: 20%;
}



/* ===== 登录按钮容器 ===== */
.login-button {
  position: absolute;
  width: calc(100% - 3rem);
  max-width: 350px;
  padding: 0.75rem 0 0.25rem;
  background-image: linear-gradient(90deg, #ffde66 0%, #caf5fd 100%);
  border-radius: 9.94rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
}

/* ===== 登录按钮内的文字 ===== */
.login-text {
  font-size: 1rem;
  font-family: AlibabaPuHuiTi;
  line-height: 1.1;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== 登录按钮禁用状态 ===== */
.login-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image: linear-gradient(90deg, #cccccc 0%, #e0e0e0 100%);
}

.login-button:not(.disabled):hover {
  transform: translateX(-50%) scale(1.02);
  transition: transform 0.2s ease;
}

/* ===== 底部 "忘记密码？" 链接 ===== */
.forgot-password {
  position: absolute;
  font-size: 0.88rem;
  font-family: AlibabaPuHuiTi;
  color: transparent;
  background-image: linear-gradient(90deg, #75e8fa 0%, #faf2f2 100%);
  -webkit-background-clip: text;
  text-shadow: 0rem 0.13rem 0.25rem #00000040, 0rem 0.13rem 0.25rem #00000040;
  line-height: 0.89;
  z-index: 2;
  bottom: 10%;
  left: 42%;
  transform: translateX(-50%);
}

/* ===== 底部 "注册账号" 链接 ===== */
.register-account {
  position: absolute;
  font-size: 0.88rem;
  font-family: AlibabaPuHuiTi;
  color: transparent;
  background-image: linear-gradient(90deg, #75e8fa 0%, #faf2f2 100%);
  -webkit-background-clip: text;
  text-shadow: 0rem 0.13rem 0.25rem #00000040, 0rem 0.13rem 0.25rem #00000040;
  line-height: 0.8;
  z-index: 2;
  bottom: 10%;
  left: 45%;
  transform: translateX(50%);
}

/* ===== 底部链接点击样式 ===== */
.forgot-password,
.register-account {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.forgot-password:hover,
.register-account:hover {
  opacity: 0.8;
}

.forgot-password:active,
.register-account:active {
  opacity: 0.6;
}
</style>