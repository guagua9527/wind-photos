<script setup lang="ts">
import { useMainStore } from './store/index'
// import { NGradientText } from 'naive-ui'

const store = useMainStore()

</script>

<template>
  <div id="main">
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
}

#header {
  width: 100%;
  height: var(--header-height);
  padding: 10px;
  display: flex;
  overflow: hidden;
}

#title {
  font-size: 64px;
  font-weight: bold;
  line-height: var(--header-height);
  margin: 0 100px 0 30px;
  font-style: italic;
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
