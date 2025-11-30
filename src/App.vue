<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';

</script>

<template>
  <!-- 头部标题栏 -->
  <header>
    <HeadNav />
  </header>

  <!-- 主题内容 -->
  <main>
    <RouterView />
  </main>

  <!-- 底部导航栏 -->
  <footer>
    <FootNav />
  </footer>

</template>

<style scoped>
header {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  z-index: 999;
}

main {
  margin: 50px 0 70px;
}

footer {
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
}
</style>
