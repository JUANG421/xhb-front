<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DengluPage from './denglu.vue'
import ZhucePage from './zhuce.vue'

// 當前頁面狀態
const currentPage = ref('login') // 'login' 或 'register'

// 切換到註冊頁面
const goToRegister = () => {
  currentPage.value = 'register'
}

// 切換到登錄頁面
const goToLogin = () => {
  currentPage.value = 'login'
}

// 事件監聽器
const handleSwitchToRegister = () => {
  goToRegister()
}

const handleSwitchToLogin = () => {
  goToLogin()
}

// 組件掛載時添加事件監聽器
onMounted(() => {
  window.addEventListener('switch-to-register', handleSwitchToRegister)
  window.addEventListener('switch-to-login', handleSwitchToLogin)
})

// 組件卸載時移除事件監聽器
onUnmounted(() => {
  window.removeEventListener('switch-to-register', handleSwitchToRegister)
  window.removeEventListener('switch-to-login', handleSwitchToLogin)
})
</script>

<template>
  <DengluPage v-if="currentPage === 'login'" />
  <ZhucePage v-else-if="currentPage === 'register'" />
</template>

<style>
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

body {
  font-family: 'Microsoft YaHei', sans-serif;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 100vw;
  min-height: 100vh;
}
</style> 