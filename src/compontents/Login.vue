<template>
  <el-card style="max-width: 400px">
    <el-form :model="form">
      <el-form-item>
        <div class="text">登录</div>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>
      <el-form-item> <el-button class="button" type="primary">登录</el-button></el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
const form = ref({
  username: '',
  password: '',
})
</script>
<style scoped lang="scss">
.button {
  width: 100%;
}
.text {
  font-size: 30px;

  font-weight: bold;
  display: flex;
  justify-content: center;
}
</style>
