<!-- 商标卡片 -->
<script setup lang="ts">
import LazyImage from "./tool/LazyImage.vue";
import trademarkDataJson from "@/data/trademark.json"
import { computed } from "vue";
import { useRouter } from "vue-router";

// 用于控制是否显示已售卖商标的状态量
const porps = withDefaults(defineProps<{ noSell?: boolean }>(), {
  noSell: false
})



// 跳转路由
const router = useRouter()
const goInfo = (key: string) => {
  router.push({ name: "TrademarkInfo", params: { id: key } })
}

const trademarkData = computed(() => {
  if (porps.noSell) {
    return trademarkDataJson.filter(el => el.tags.isSell === false)
  }
  return trademarkDataJson
})

</script>

<template>

  <!-- 图片 名称 20 家具类 基本信息 效果展示 使用循环展示 数据使用本地json-->
  <!-- 增加使用懒加载组件 -->
  <div class="container">
    <div class="item" v-for="item in trademarkData" :key="item.id">
      <div class="card" :class="{ 'rare-badge': item.tags.isRare, 'hot': item.tags.isHot, 'sell': item.tags.isSell }">
        <!-- <div class="img" @click="goInfo(item.id)"><img :src=item.src alt=""></div> -->
        <LazyImage :src=item.src alt="" class="img" @click="goInfo(item.id)" />
        <h1>{{ item.name }}</h1>
        <span>{{ item.kind }}类&nbsp;{{ item.kindName }}&nbsp;{{ item.registrationNumber }}</span>
        <div class="bottom">
          <button class="info" @click="goInfo(item.id)">基本信息</button>
          <button class="show">我想要</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding: 10px;
  gap: 5px;

  /* 开启3D */
  /* transform-style: preserve-3d; */
  /* perspective: 1000px; */

  .item {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    /* background-color: var(--background-white); */
    background: var(--background-gradient);
    padding: 10px;

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;

    position: relative;

    animation: flip-in-ver-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

    /* 稀有图标 */
    .rare-badge::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 50px;
      height: 50px;
      background: url('/img/rare.svg');
      background-size: contain;
      background-position: 0 -10px;
      background-repeat: no-repeat;
      animation: flicker 5s infinite;
    }

    /*hot图标 */
    .hot::before {
      content: '';
      position: absolute;
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      background: url('/img/hot.svg');
      background-size: contain;
      background-repeat: no-repeat;
      animation: rise 2s infinite;
    }

    /* sell蒙层 */
    .sell::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      /* background-color: #8888; */
      backdrop-filter: blur(3px);
      background-image: url('/img/sell.svg');
      background-size: 80px;
      background-position: center;
      border-radius: 10px;
      background-repeat: no-repeat;
    }

    .card {
      width: 100%;
      height: 100%;

      .img {
        width: 100%;
        height: 120px;
        border-radius: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          /* 完整显示，可能留白 */
          display: block;
          /* 去掉图片默认空隙 */
        }
      }

      h1 {

        font-size: var(--font-size-normal);
        font-weight: bold;
      }

      span {
        color: var(--text-mute);
        font-size: var(--font-size-small);
        /* font-weight: bold; */
      }

      .bottom {
        width: 100%;
        height: 40px;
        margin-top: 8px;
        border: 2px solid var(--main);
        border-radius: 10px;
        overflow: hidden;
        background-image: linear-gradient(#e82539, #fb4849, #ef234c);

        display: flex;
        justify-content: center;
        align-items: center;

        .info {
          width: 100%;
          height: 100%;
          color: var(--main);
        }

        .show {
          width: 100%;
          height: 100%;
          color: var(--text-white-soft);
          background-color: transparent;

        }
      }
    }

  }

}
</style>