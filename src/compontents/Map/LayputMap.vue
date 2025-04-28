<template>
  <div id="viewDiv"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from '@arcgis/core/config.js'
esriConfig.apiKey =
  'AAPTxy8BH1VEsoebNVZXo8HurMvK7DSS7UETawwAOvI84A1Y1ebCR6Fv-VcdRKlkvBsFPBowsyF6u_VoN3SHsMRRt7B2zSzQQKYNTyo6aWm38gyU5AqWJ1MTnbhnQ-TUh3BzbrbVozQVvc2iurjDVaJymeYQH0nf0qOa0mAk2SLS-0xVVqq3RJU8JZEHNRBgP5TmUB9CyZEZ98PYON3zI-YfpHZcze7qloTWD0ePmQVFl5o.AT1_Oo8znb3N'

onMounted(() => {
  const map = new Map({
    basemap: 'streets-vector',
  })

  const view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [0, 0], // Longitude, latitude
    zoom: 2, // Zoom level
  })
})
</script>
<style scoped>
#viewDiv {
  width: 100vw;
  height: 100vh;
}
</style>
