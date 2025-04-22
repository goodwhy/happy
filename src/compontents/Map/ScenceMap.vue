<template>
  <div id="viewDiv">

  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import Map from '@arcgis/core/Map'
import SenceView from '@arcgis/core/views/SceneView'
import esriConfig from "@arcgis/core/config.js"
import { PictureRounded } from '@element-plus/icons-vue'
onMounted(() => {
  const map = new Map({
    basemap: 'topo-vector',
    ground: 'world-elevation'
  })
  const view = new SenceView({
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

</style>
