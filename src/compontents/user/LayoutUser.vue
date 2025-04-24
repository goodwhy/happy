<template>
  <div v-loading="isloading">
    我是个人中心
  </div>
</template>
<script setup>
import { ref } from 'vue'
const isloading = ref(true)
setTimeout(() => {
  isloading.value = false
}, 3000)
</script>
<style scoped>

</style>
