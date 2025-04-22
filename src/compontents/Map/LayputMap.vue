<template>
  <div id="viewDiv">
    <el-tooltip content="3D" placement="bottom" effect="dark">
    <el-icon class="map-Scenceicon" @click="changeScence"><PictureRounded /></el-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import { PictureRounded } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from "@arcgis/core/config.js"
import { useRouter } from 'vue-router'
esriConfig.apiKey = 'AAPTxy8BH1VEsoebNVZXo8HurMvK7DSS7UETawwAOvI84A1Y1ebCR6Fv-VcdRKlkvBsFPBowsyF6u_VoN3SHsMRRt7B2zSzQQKYNTyo6aWm38gyU5AqWJ1MTnbhnQ-TUh3BzbrbVozQVvc2iurjDVaJymeYQH0nf0qOa0mAk2SLS-0xVVqq3RJU8JZEHNRBgP5TmUB9CyZEZ98PYON3zI-YfpHZcze7qloTWD0ePmQVFl5o.AT1_Oo8znb3N'
const router = useRouter()
const changeScence = () => {
  router.push('/scence')
  }
onMounted(() => {
  const map = new Map({
    basemap: 'streets-vector'
  })

  const view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [0, 0], // Longitude, latitude
    zoom: 2 // Zoom level
  })
  view.ui.remove(["attribution","zoom"])

})
</script>
<style scoped>
#viewDiv {

  width: 100vw;
  height: 100vh;
  position: relative;

}

.map-Scenceicon {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  /* 初始状态样式 */
  color: #0c0b0b; /* 图标颜色 */
  transform: translateY(0);
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;

}

.map-Scenceicon:hover {
  transform: translateY(-3px); /* 向上位移 3px */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15)); /* 添加投影 */
  color: #409eff; /* 悬停时改变颜色 */

  /* 如果需要放大效果可以添加 */
  /* transform: translateY(-3px) scale(1.05); */
}

/* 如果需要更明显的立体效果 */
.map-Scenceicon:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s;
}

.map-Scenceicon:hover::after {
  opacity: 1;
}
</style>
