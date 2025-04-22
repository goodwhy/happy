<template>
  <el-card style="max-width: 420px">
    <el-form :model="formModel" :rules="rules" ref="form" v-if="isRegister">
      <el-form-item>
        <div class="text">注册</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="formModel.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
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
        <el-input v-model="formModel.email" placeholder="请输入邮箱" :prefix-icon="Message"></el-input>
      </el-form-item>
      <el-form-item> <el-button class="button" type="primary" @click="registerButton">注册</el-button></el-form-item>

      <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = false">
            返回 →
          </el-link>
        </el-form-item>
    </el-form>
    <el-form :model="formModel" :rules="rules" ref="form" v-else>
      <el-form-item>
        <div class="text">登录</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="formModel.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>
      <el-form-item> <el-button class="button" type="primary" @click="submitButton">登录</el-button></el-form-item>
      <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister=true">
            注册 →
          </el-link>
        </el-form-item>
    </el-form>






  </el-card>
</template>
<script setup>
import { User, Lock ,Message} from '@element-plus/icons-vue'
import { ref ,watch} from 'vue'
import { useUserStore } from '@/stores/user'
import { register, login } from '@/api/user'
import { ElMessage } from 'element-plus'

import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()
const formModel = ref({
  username: '',
  password: '',
  checkpassword: '',
  email: ''
})

const form = ref()
const isRegister = ref(true)


const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },//非空校验
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' },//长度校验
    { pattern: /^[a-zA-Z0-9]+$/, message: '只能包含字母和数字', trigger: 'change' }//规则校验

  ],
  checkpassword: [
    { required: true, message: '请确认密码', trigger: 'change' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '只能包含字母和数字', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if(value!==formModel.value.password){
          callback(new Error('两次密码不一致'))
        }else{
          callback()
        }

    }, trigger: 'blur'}//自定义校验
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'change' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'change' }
  ],

})
const registerButton = async () => {
  console.log(formModel.value)
  await form.value.validate()//表单的校验成功

  const res = await register({
    username: formModel.value.username,
    password: formModel.value.password,
    email: formModel.value.email
  })
  localStorage.setItem("token", res.data.token)
  console.log(res)
  if(res.data.code == 201){
    ElMessage.success('注册成功')
  }else{
    ElMessage.error('注册失败')
  }
  isRegister.value=false


}
const submitButton = async() => {
  await form.value.validate()//表单的校验成功

  console.log()
  const res = await login({
    username: formModel.value.username,
    password: formModel.value.password
  })
  localStorage.setItem("token", res.data.token)
  if (res.data.code == 201) {
    ElMessage.success('登陆成功')

  }else{
    ElMessage.error('登陆失败')
  }

  console.log(res)
  router.push('/home')

}
watch(isRegister,()=>{
  formModel.value = {
    username: '',
    password: '',
    checkpassword: '',
    email: ''
  }
})









</script>
<style scoped lang="scss">
body{
  z-index: 0;
}

.text {
  font-size: 30px;

  font-weight: bold;
  display: flex;
  justify-content: center;
}
.button {
  width: 100%;
    }


</style>
