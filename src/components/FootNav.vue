<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HomeSvg from './icons/HomeSvg..vue';
import ConsultSvg from './icons/ConsultSvg.vue';
</script>

<template>
  <div class="container">

    <router-link class="router" to="/">
      <HomeSvg class="svg"></HomeSvg>
      首页
    </router-link>

    <router-link class="router" to="/consult">
      <ConsultSvg class="svg"></ConsultSvg>
      查价
    </router-link>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: var(--background-white);
  box-shadow: 0 -0.5rem 0.75rem -0.25rem rgba(39, 48, 54, 0.05);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .router {
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: var(--text-mute);
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 3px;

    .svg {
      width: 25px;
      height: 25px;
      align-self: end;
      /* filter: drop-shadow(0 0 1px var(--text-mute)); */
    }
  }

  /* 点击后状态 */
  .router-active,
  .router.router-link-active,
  .router.router-link-exact-active,
  .router-active .svg,
  .router.router-link-active .svg,
  .router.router-link-exact-active .svg {
    color: var(--text-black);
    /* animation: jello-horizontal 0.9s both; */
  }

  /* svg增加动画效果 */
  .router-active .svg,
  .router.router-link-active .svg,
  .router.router-link-exact-active .svg {
    /* color: var(--text-black); */
    animation: jello-horizontal 0.9s both;
  }
}
</style>