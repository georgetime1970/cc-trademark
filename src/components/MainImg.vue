<!-- 大图区 -->
<script setup lang="ts">
import RedSvg from './waves/RedSvg.vue';
import PurplrSvg from './waves/PurplrSvg.vue';
import OrangeSvg from './waves/OrangeSvg.vue';
import SkyblueSvg from './waves/SkyblueSvg.vue';
import BlueSvg from './waves/BlueSvg.vue';


</script>

<template>
  <div class="container">


    <SkyblueSvg class="skyblue" style="--i:1"></SkyblueSvg>
    <blue-svg class="blue" style="--i:2"></blue-svg>
    <OrangeSvg class="orange" style="--i:3"></OrangeSvg>
    <RedSvg class="red" style="--i:4"></RedSvg>
    <PurplrSvg class="purple" style="--i:5"></PurplrSvg>

    <div class="content">
      <span>家具类长城系列珍稀商标</span>
      <img src="@/assets/image/cc.png" alt="">
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;

  .content {
    /* font-size: var(--font-size-big); */
    color: var(--text-white-soft);
    text-align: center;
    z-index: 1;
    transform-style: preserve-3d;
    perspective: 500px;

    span {
      font-size: var(--font-size-normal);
      text-shadow: 1px 1px 1px rgba(39, 48, 54, 0.5);
    }

    img {
      width: 80%;
      animation: slide-in-bck-center 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
  }

  /* 波浪位置以及动画 */
  .skyblue,
  .blue,
  .orange,
  .red,
  .purple {
    position: absolute;
    left: 0px;
    animation: move calc(3s * var(--i)) cubic-bezier(0.42, 0, 0.58, 1) alternate-reverse infinite;
    /* animation-delay: calc(0.3s * var(--i)) */
  }

  .blue {
    top: 0;
  }

  .skyblue {
    top: 0;
  }

  .orange {
    top: 10px;
  }

  .red {
    top: -100px;

  }

  .purple {
    top: 30px;
  }
}

/* 波浪动画 */
@keyframes move {
  from {
    transform: translateX(-500px)
  }

  to {
    transform: translateX(0px);
  }
}

/* 标题动画 */
@keyframes slide-in-bck-center {
  0% {
    transform: translateZ(600px);
    opacity: 0;
  }

  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>
