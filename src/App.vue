<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useMainStore } from './store/index'
import { detectZoom } from './utils/ZoomUtil';
import { NDivider } from 'naive-ui';

const store = useMainStore()

// const mainWidth = 2560;
// const mainHeight = 1440;
// const ratio = detectZoom();

// const defaultZoom = window.screen.width / mainWidth * ratio;
// console.log(window.screen.width)
// console.log('ratio', ratio, defaultZoom);

// (document.body.style as any).zoom = defaultZoom;

</script>

<template>
  <div id="main" :style="{ '--header-height': store.headerHeight + 'px' }">
    <div id="header">
      <div style="flex: 1;"></div>
      <div id="menu"></div>
      <div style="flex: 1;"></div>
      <p id="title">{{ store.title }}</p>
    </div>
    <div id="body">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
#main {
  --header-height: 150px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: gray;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

#header {
  width: 100%;
  height: var(--header-height);
  padding: 10px;
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid black;
  transition: 1s;
}

#title {
  font-size: 64px;
  font-weight: bold;
  line-height: var(--header-height);
  margin: 0 100px 0 30px;
  font-style: italic;
  transition: 1s;
}

#menu {
  width: 20%;
  /* background-color: red; */

}

#body {
  flex: 1;
  overflow: hidden;
}
</style>
