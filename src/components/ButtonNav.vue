<script setup lang="ts">

</script>

<template>
  <div class="container">
    <!-- 商标介绍 商标使用 -->
    <router-link class="item" to="/consult">
      <img src="@/assets/img/icon-introduce.png" alt="">商标介绍
    </router-link>
    <router-link class="item" to="/consult">
      <img src="@/assets/img/icon-use.png" alt="">商标使用
    </router-link>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  background-image: linear-gradient(#c60c60, var(--background));

  .item {
    width: 100%;
    height: inherit;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 18px;
    border-radius: 0.8rem;
    box-shadow: var(--box-shadow);
    background-color: var(--background-white);
    font-size: var(--font-size-normal);
    font-weight: bold;

    img {
      height: 100%;
      animation: jello-horizontal 0.9s both;
    }
  }

}
</style>