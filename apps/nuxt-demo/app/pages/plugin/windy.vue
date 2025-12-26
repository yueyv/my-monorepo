<template>
  <div class="windy-container">
    <iframe
      src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=°C&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=32.1033&lon=119.252&detailLat=32.059&detailLon=118.774&detail=true&message=true"
      class="windy-iframe"
      frameborder="0"
      allow="fullscreen"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Windy',
  icon: ElIconWindPower,
});
</script>

<style scoped lang="scss">
.windy-container {
  width: 100%;
  height: $content-height;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h1 {
    margin: 0;
    padding: 1rem;
    background-color: #f5f5f5;
  }

  .windy-iframe {
    flex: 1;
    width: 100%;
    border: none;
  }
}
</style>
