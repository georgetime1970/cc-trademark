<script setup lang="ts">

withDefaults(defineProps<{ msg?: string }>(), {
  msg: '页面不存在'
})
</script>

<template>
  <div class="container">
    <img class="error-img" src="@/assets/image/404.svg" alt="">
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