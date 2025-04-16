import { useUserStore } from '@/stores/user'
import { ElementPlus } from '@element-plus/icons-vue/dist/types'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { router } from 'vue-router'
const myAxios = axios.create({
  baseURL: 'https://localhost:8000/api/',
  timeout: 1000,
  withCredentials: true,
})
// 添加请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    const userStore = useUserStore()
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = `Token ${userStore.Token}`
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (res) {
    return res
  },
  function (error) {
    if (response.data.status == 401) {
      router.push('/login')
      return res
    }
    ElMessage.error('登录过期，请重新登录')
    const userStore = useUserStore()
    userStore.deleteToken()
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)
export default myAxios
