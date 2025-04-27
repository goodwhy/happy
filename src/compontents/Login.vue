<template>
  <div class="auth-container">
    <!-- Left side - Image Gallery -->
    <div class="gallery-section">
      <div class="gallery-content">
        <h1>栖境智观</h1>
        <p class="subtitle">——多源数据驱动的生态协同分析平台</p>
        <p>
          融合鸟类分布、空气质量、地形与城市功能数据，以深度学习解码生态环境交互奥秘，用动态可视化呈现城市生态智慧，助力可持续发展决策。
        </p>
      </div>

      <!-- 图片画廊部分 -->
      <div class="image-gallery">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="gallery-image"
          :style="{ backgroundImage: `url(${image})` }"
          @mouseenter="setActiveImage(index)"
          @mouseleave="startAutoPlay()"
          :class="{ active: activeImageIndex === index }"
        ></div>
      </div>
    </div>

    <!-- Right side - Auth Forms -->
    <div class="form-section">
      <el-card class="auth-card">
        <!-- Register Form -->
        <el-form :model="formModel" :rules="rules" ref="form" v-if="isRegister">
          <el-form-item>
            <div class="auth-title">注 册</div>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="formModel.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkpassword">
            <el-input
              v-model="formModel.checkpassword"
              type="password"
              placeholder="请确认密码"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="formModel.email"
              placeholder="请输入邮箱"
              :prefix-icon="Message"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="auth-button" type="primary" @click="registerButton"> 注册 </el-button>
          </el-form-item>
          <el-form-item>
            <el-link type="info" :underline="false" @click="isRegister = false">
              返回登录 →
            </el-link>
          </el-form-item>
        </el-form>

        <!-- Login Form -->
        <el-form :model="formModel" :rules="rules" ref="form" v-else>
          <el-form-item>
            <div class="auth-title">登 录</div>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="formModel.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="auth-button" type="primary" @click="submitButton"> 登录 </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { register, login } from '@/api/user'
import { ElMessage } from 'element-plus'
import image1 from '@/assets/2S.jpg'
import image2 from '@/assets/3D.jpg'

const images = ref([image1, image2])
// 禁用滚动
const disableScroll = () => {
  document.body.style.overflow = 'hidden'
}
onMounted(() => {
  document.body.style.overflow = 'hidden' // 禁用滚动
  startAutoPlay() // 新增
})
// 组件卸载时清除定时器（重要！避免内存泄漏）
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const userStore = useUserStore()
const formModel = ref({
  username: '',
  password: '',
  checkpassword: '',
  email: '',
})

const form = ref()
const isRegister = ref(true)

//const imageUrl = new URL('@/assets/2S.jpg', import.meta.url).href;
const activeImageIndex = ref(0)
let intervalId = null // 用于存储定时器ID
const setActiveImage = (index) => {
  activeImageIndex.value = index
}
// 自动轮播函数
const startAutoPlay = () => {
  intervalId = setInterval(() => {
    activeImageIndex.value = (activeImageIndex.value + 1) % images.value.length
  }, 10000) // 3秒切换一次
}

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' }, //非空校验
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }, //长度校验
    { pattern: /^[a-zA-Z0-9]+$/, message: '只能包含字母和数字', trigger: 'change' }, //规则校验
  ],
  checkpassword: [
    { required: true, message: '请确认密码', trigger: 'change' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '只能包含字母和数字', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    }, //自定义校验
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'change' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'change' },
  ],
})

const registerButton = async () => {
  console.log(formModel.value)
  await form.value.validate() //表单的校验成功
  ElMessage.success('注册成功')
  const res = await register({
    username: formModel.value.username,
    password: formModel.value.password,
    email: formModel.value.email,
  })
  localStorage.setItem('token', res.data.token)
  console.log(res)
  isRegister.value = false
}
const submitButton = async () => {
  await form.value.validate() //表单的校验成功
  ElMessage.success('登陆成功')
  console.log()
  const res = await login({
    username: formModel.value.username,
    password: formModel.value.password,
  })
  localStorage.setItem('token', res.data.token)
  console.log(res)
}
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    checkpassword: '',
    email: '',
  }
})
</script>

<style scoped>
h1 {
  text-align: center;
}
.auth-container {
  display: flex;
  height: 100vh;
  width: 98vw;
  margin: 0px auto;
  background-image: url('@/assets/BG.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.gallery-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.gallery-content {
  padding: 30px;
  margin-left: 100px;
  border-radius: 4px;
  text-align: center;
}

.gallery-content h1 {
  line-height: 1;
  color: #333;
  font-size: 32px;
  /*margin-bottom: 30px;*/
}

.gallery-content .subtitle {
  margin-left: 270px;
  font-size: 14px;
  line-height: 1;
}
.gallery-image {
  margin-left: 230px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.gallery-image.active {
  opacity: 1;
}
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* 表单卡片统一样式 */
.auth-card {
  width: 100%;
  max-width: 480px; /* 增加最大宽度 */
  min-width: 300px; /* 设置最小宽度 */
  height: 500px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 50px 40px; /* 调整内边距 */
  margin: 0 auto; /* 居中 */
}
/* 表单元素统一间距 */
.el-form-item {
  margin-bottom: 24px; /* 增加表单项间距 */
}

/* 输入框统一高度 */
.el-input {
  height: 48px;
  line-height: 48px;
}

/* 按钮统一高度 */
.auth-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  margin-top: 10px;
}
/* 确保左右两栏高度一致 */
.gallery-section,
.form-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 图片区域自适应高度 */
.image-gallery {
  position: relative;
  flex: 1;
  max-width: 500px;
  max-height: 480px;
  min-height: 200px; /* 确保最小高度 */
}
.auth-title {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  width: 100%; /* 确保占据全部宽度 */
  display: flex; /* 启用flex布局 */
  justify-content: center; /* 水平居中 */
}
.flex {
  display: flex;
  justify-content: center;
}
</style>
