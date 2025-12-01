<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(defineProps<{ msg?: string }>(), {
  msg: '页面不存在'
})

const { msg } = toRefs(props)
</script>

<template>
  <div class="container">
    <img class="error-img" src="/img/404.svg" alt="">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
.container {

  width: 100%;
  height: 100%;
  text-align: center;

  .error-img {
    width: 100%;
  }
}
</style>