<script setup lang="ts">
import MainImg from '@/components/MainImg.vue'; // 主图区
import ButtonNav from '@/components/ButtonNav.vue'; // 导航按钮
import CardItem from '@/components/CardItem.vue'; // 商标卡片
</script>

<template>
  <div class="container">
    <!-- 首页 -->
    <!-- 大图区 使用波背景-->
    <MainImg class="main-img"></MainImg>

    <!-- 按钮导航区 -->
    <ButtonNav class="button-nav"></ButtonNav>

    <!-- 商标卡片区 -->
    <CardItem class="card-item"></CardItem>
  </div>
</template>

<style scoped>
.container {
  .main-img {
    width: 100%;
    height: 200px;
  }

  .button-nav {
    width: 100%;
    height: 75px;
  }

  .card-item {
    width: 100%;
    height: 100%;
    /* margin-top: 30px; */
  }
}
</style>