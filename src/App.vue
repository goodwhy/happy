<script setup>
// import { onMounted, onUnmounted, ref } from 'vue';
// import ArcGISMap from '@arcgis/core/Map';
// import MapView from '@arcgis/core/views/MapView';
// import esriConfig from '@arcgis/core/config.js';
// esriConfig.apiKey='AAPTxy8BH1VEsoebNVZXo8HurMvK7DSS7UETawwAOvI84A1Y1ebCR6Fv-VcdRKlkvBsFPBowsyF6u_VoN3SHsMRRt7B2zSzQQKYNTyo6aWm38gyU5AqWJ1MTnbhnQ-TUh3BzbrbVozQVvc2iurjDVaJymeYQH0nf0qOa0mAk2SLS-0xVVqq3RJU8JZEHNRBgP5TmUB9CyZEZ98PYON3zI-YfpHZcze7qloTWD0ePmQVFl5o.AT1_Oo8znb3N'
// // 定义地图容器引用
// const mapContainer = ref(null);
// let view = null;

// onMounted(() => {
//   if (!mapContainer.value) return;

//   // 1. 创建地图实例
//   const map = new ArcGISMap({
//     basemap: 'streets-vector' // 使用矢量底图
//   });

//   // 2. 创建地图视图
//   view = new MapView({
//     container: mapContainer.value,
//     map: map,
//     center: [116.4, 39.9], // 初始中心点（北京）
//     zoom: 10
//   });
// });

// onUnmounted(() => {
//   // 销毁视图以释放资源
//   if (view) {
//     view.destroy();
//     view = null;
//   }
// });
</script>

<template>
  <router-view />
</template>

<style scoped></style>
