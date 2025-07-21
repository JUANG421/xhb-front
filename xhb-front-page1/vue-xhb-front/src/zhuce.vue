<script setup>
// 注册页面组件
import { 
  registerData, 
  isFormValid, 
  handleRegister, 
  handleKeyPress, 
  handleBackToLogin,
  initRegisterPage 
} from './zhuce.js'

// 页面初始化
initRegisterPage()
</script>

<template>
  <div class="page">
    <!-- 最底层背景图片，原始比例显示 -->
    <img class="register-bg-img" src="/Register.jpg" alt="注册背景" />
    <!-- 内容整体包裹，便于整体下移 -->
    <div class="content-wrapper">
      <!-- 上半部分：欢迎文字 -->
      <div class="top-section">
        <div class="welcome-text">
          <div class="welcome-line1">您好，</div>
          <div class="welcome-line2">欢迎使用心禾伴</div>
        </div>
      </div>
      <!-- 下半部分：注册表单 -->
      <div class="bottom-section">
        <div class="form-title">注册账号</div>
        <div class="form-tip">请设置密码，建议使用简单易记的密码</div>
        <!-- 账号输入框 -->
        <div class="input-label">账号</div>
        <div class="input-container">
          <input
            type="text"
            v-model="registerData.username"
            placeholder="请输入您的账号"
            class="input-field"
            @keyup="handleKeyPress"
            :disabled="registerData.isLoading"
          />
        </div>
        <!-- 密码输入框 -->
        <div class="input-label">密码</div>
        <div class="input-container">
          <input
            type="password"
            v-model="registerData.password"
            placeholder="请输入您的密码"
            class="input-field"
            @keyup="handleKeyPress"
            :disabled="registerData.isLoading"
          />
        </div>
        <!-- 邮箱输入框 -->
        <div class="input-label">邮箱</div>
        <div class="input-container">
          <input
            type="email"
            v-model="registerData.email"
            placeholder="请输入您的邮箱"
            class="input-field"
            @keyup="handleKeyPress"
            :disabled="registerData.isLoading"
          />
        </div>
        <!-- 注册按钮 -->
        <div 
          class="register-button"
          :class="{ 'disabled': !isFormValid }"
          @click="handleRegister"
        >
          <span class="register-text">
            {{ registerData.isLoading ? '注册中...' : '注册' }}
          </span>
        </div>
        <!-- 返回登录链接 -->
        <div class="back-to-login" @click="handleBackToLogin">
          已有账号？返回登录
        </div>
      </div>
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
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #fff;
}

/* ===== 上半部分：图片区域 ===== */
.top-section {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 180px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background: none;
  z-index: 1;
  pointer-events: none;
}

/* ===== 背景图片层 ===== */
.background-image {
  display: none;
}

/* ===== 欢迎文字 ===== */
.welcome-text {
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 2;
  color: #000000;
  font-family: AlibabaPuHuiTi, sans-serif;
  font-weight: 700;
  text-align: left;
  pointer-events: auto;
}

.welcome-line1 {
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 0.2rem;
}

.welcome-line2 {
  font-size: 3.5rem;
  line-height: 1.2;
}

/* ===== 下半部分：注册表单 ===== */
.bottom-section {
  position: relative;
  width: 100%;
  flex: 1;
  background: #ffffff;
  border-radius: 30px 30px 0 0;
  padding: 24px 20px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  z-index: 3;
}

/* ===== 表单标题 ===== */
.form-title {
  font-size: 1.3rem;
  font-family: AlibabaPuHuiTi, sans-serif;
  font-weight: 700;
  color: #000000;
  text-align: left;
  margin-bottom: 8px;
  margin-top: 0;
}

/* ===== 表单提示 ===== */
.form-tip {
  font-size: 0.95rem;
  font-family: AlibabaPuHuiTi, sans-serif;
  color: #999999;
  text-align: left;
  margin-bottom: 18px;
}

/* ===== 输入标签 ===== */
.input-label {
  font-size: 1rem;
  font-family: AlibabaPuHuiTi, sans-serif;
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
  margin-top: 10px;
  text-align: left;
}

/* ===== 输入框容器基础样式 ===== */
.input-container {
  width: 100%;
  max-width: 350px;
  margin-bottom: 0;
  padding: 0 0 10px 0;
  background: none;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #eee;
}

/* ===== 输入框样式 ===== */
.input-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-family: AlibabaPuHuiTi, sans-serif;
  color: #000000;
  padding: 8px 0;
  margin: 0;
  text-align: left;
}

.input-field::placeholder {
  color: #999999;
  font-size: 0.95rem;
}

.input-field:focus {
  outline: none;
}

.input-field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== 注册按钮 ===== */
.register-button {
  width: 100%;
  max-width: 350px;
  margin: 30px auto 20px auto;
  padding: 15px 0;
  background: #6366f1;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-text {
  font-size: 1.1rem;
  font-family: AlibabaPuHuiTi, sans-serif;
  font-weight: 600;
  color: #ffffff;
}

/* ===== 按钮禁用状态 ===== */
.register-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #cccccc;
}

.register-button:not(.disabled):hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

/* ===== 返回登录链接 ===== */
.back-to-login {
  text-align: left;
  font-size: 0.95rem;
  font-family: AlibabaPuHuiTi, sans-serif;
  color: #4A90E2;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 10px;
}

.back-to-login:hover {
  opacity: 0.8;
}

/* 新增：背景图片样式 */
.register-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

/* 新增：内容整体下移 30% */
.content-wrapper {
  position: relative;
  top: 30vh;
  width: 100%;
  z-index: 2;
}

/* ===== 响应式设计 ===== */
@media screen and (max-width: 768px) {
  .welcome-line1 {
    font-size: 1.2rem;
  }
  
  .welcome-line2 {
    font-size: 1rem;
  }
  
  .top-section {
    min-height: 120px;
  }
}

@media screen and (max-width: 480px) {
  .welcome-line1 {
    font-size: 1rem;
  }
  
  .welcome-line2 {
    font-size: 0.9rem;
  }
  
  .form-title {
    font-size: 1.1rem;
  }
  
  .top-section {
    min-height: 80px;
  }
}
</style> 