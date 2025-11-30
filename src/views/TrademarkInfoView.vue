<script setup lang="ts">
import trademarkData from "@/data/trademark.json"
import PosterImg from "@/components/PosterImg.vue"
import ExchangeProcess from "@/components/ExchangeProcess.vue"
import { onMounted, ref } from "vue"
// 获取路由参数
const data = defineProps(['id'])
// 寻找符合条件的对象
const item = trademarkData.find((el) => {
  return el.id === data.id
}
)

const tags = ref('') // 设置徽章等级
if (item) {
  if (item.tags.isRare) {
    tags.value = '稀有'
  } else if (item.tags.isHot) {
    tags.value = '精品'
  }
}
// 动态数据列表
const lastNameList = ['王', '刘', '张', '赵', '孙', '李', '周', '蒋', '陈', '杨', '黄', '吴',]
const genderList = ['女士', '先生', '先生']
const opList = ['浏览', '浏览', '分享', '分享', '咨询']
const notice = ref()
const src = ref()
const time = ref(1)
// 组合对象
const makeNotice = () => {
  const lastname = ref(lastNameList[Math.floor(Math.random() * lastNameList.length)])
  const gender = ref(genderList[Math.floor(Math.random() * genderList.length)])
  const op = ref(opList[Math.floor(Math.random() * opList.length)])
  // 根据性别设置头像
  if (gender.value === '女士') {
    src.value = '/src/assets/img/female.svg'
  } else {
    src.value = '/src/assets/img/male.svg'
  }
  // 设置随机时间,大于60不再增加
  time.value = Math.floor(Math.random() * 15) + time.value
  if (time.value > 60) {
    time.value = 60
  }
  notice.value = { lastname, gender, op, src, time }
}

// 先执行一次
makeNotice()
// 间隔3s执行
onMounted(
  () => {
    setInterval(() => {
      makeNotice()
    }, 3000)
  }
)

// 传给海报组件的数据
const myInfo = {
  src: item?.src,
  kind: item?.kind,
  kindName: item?.kindName,
  services: item?.services,
  tags: item?.tags
}
</script>

<template>

  <!-- 这里应该加一个是否获取到数据的判断,以切换相应提示 -->
  <div class="container" v-if="item">
    <!-- <div class="poster-right">
      <PosterImg :user-info="myInfo" />
    </div> -->
    <!-- 头图 -->
    <div class="img">
      <img :src=item.src alt="">

      <!-- 动态循环 -->
      <!-- <div class="consulting-info" :class="{ 'consulting-animate': true }"
        v-for="(value, index) in notices" :key="value.text" :style="{ animationDelay: index * 4 + 's' }">
        <img :src=value.src>
        {{ value.text }}
        <span>{{ value.time }}</span>
      </div> -->
      <div class="consulting-info">
        <img :src="notice.src" />
        {{ notice.lastname }}{{ notice.gender }}{{ notice.op }}了此商标
        <span>{{ notice.time }}分钟前</span>
      </div>
    </div>


    <div class="card">

      <!-- 标题 -->
      <div class="head">
        <div class="top">
          <div class="money">
            <span>¥</span>
            <span>1.49</span>
            <span>万</span>
          </div>
          <span>12人想要</span>
        </div>
        <h1>{{ item.name }}</h1>
        <div class="content kind">
          类别
          <span>{{ item.kind }}类-{{ item.kindName }}</span>
          <span>{{ tags }}</span>
        </div>
        <!-- <div class="content number">注册号
          <span>{{ item.registrationNumber }}</span>
        </div> -->
      </div>

      <!-- 基本信息 -->
      <div class="table">
        <div class="trsdemark-head">
          <span class="info-title">基本信息</span>
          <!-- 海报生成 -->
          <PosterImg :user-info="myInfo" />
        </div>

        <div class="main">

          <div class="grid">
            <div class="content">
              <span>注册号</span><br>
              <span>{{ item.registrationNumber }}</span>
            </div>
            <div class="content">
              <span>注册公告日期</span><br>
              <span>{{ item.dedicatedPeriod.start }}</span>
            </div>
            <div class="content">
              <span>商标类型</span><br>
              <span>中文</span>
            </div>
            <div class="content">
              <span>到期时间</span><br>
              <span>{{ item.dedicatedPeriod.end }}</span>
            </div>
          </div>

          <div class="info">
            <div class="ground">类似群组</div>
            <div><span>{{ item.effectiveGroup.toString() }}</span></div>

            <div class="scope">注册范围</div>
            <div v-for="value in item.services" :key="value.group">
              <span>{{ value.group }} : {{ value.items.toString() }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <ExchangeProcess />
  </div>
  <div v-else>
    <h1>页面不存在</h1>
  </div>

</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;

  .poster-right {
    display: flex;
    justify-content: flex-end;
  }

  .img {
    width: 100%;
    /* background-color: var(--background-white); */
    border-radius: var(--border-radius);
    position: relative;

    img {
      width: 100%;
      height: 230px;
      object-fit: contain;
      display: block;
      padding-bottom: 20px;
    }

    .consulting-info {
      position: absolute;
      bottom: 3px;
      left: 0;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 1.6rem;
      padding: 3px 4px;
      background: rgba(0, 0, 0, .2);
      border-radius: var(--border-radius);
      font-size: var(--font-size-small);
      font-weight: 600;
      color: #fff;
      letter-spacing: 1px;
      animation: up 3s ease-in forwards infinite;
      opacity: 0;


      img {
        width: 18px;
        height: 18px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 0;
      }

      span {
        background: rgba(0, 0, 0, .1);
        padding: 1px 5px;
        border-radius: var(--border-radius);
      }
    }
  }

  .card {

    width: 100%;

    line-height: 1.3rem;

    .head {
      padding: 20px;
      background-color: var(--background-white);

      color: var(--text-mute);
      border-radius: var(--border-radius);

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ed3f32;
        font-size: var(--font-size-small);

        .money {
          span {
            font-size: var(--font-size-normal);
          }

          span:nth-child(2) {
            font-size: calc(var(--font-size-small) * 2);
            font-weight: bold;
          }
        }
      }

      h1 {
        margin-top: 10px;
        color: var(--text-soft);
        font-size: var(--font-size-big);
        font-weight: bold;
      }

      .content {
        display: flex;
        align-items: center;
        font-size: var(--font-size-smallmax);
      }

      .kind {
        margin-top: 10px;
        font-weight: bold;

        span {
          padding: .0625rem .625rem;
          color: #ff5548;
          background: #ffedef;
          border-radius: .3125rem;
          margin-left: .625rem;
          font-weight: bold;
          font-size: var(--font-size-small);
        }
      }

      .number {
        margin-top: 10px;
        font-weight: bold;

        span {
          margin-left: 2.6667vw;
          font-weight: bold;
        }
      }
    }

    .table {
      margin-top: 10px;
      padding: 10px;
      background-color: var(--background-white);
      border-radius: var(--border-radius);
      color: #2447af;

      .trsdemark-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .info-title {
          color: #2447af;
          font-weight: bold;
        }
      }

      .main {
        padding: 10px;
        border-radius: var(--border-radius);
        background: linear-gradient(135deg, #fbfcff, #f5f8ff);
        font-size: var(--font-size-smallmax);

        .grid {
          margin-top: 10px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;

          .content {

            span {
              font-weight: 600;
            }

            span:first-child {
              color: var(--text-mute);
            }
          }
        }

        .info {

          .ground {
            color: var(--text-mute);
            margin-top: 10px;
            font-weight: 600;
          }

          .scope {
            color: var(--text-mute);
            margin-top: 10px;
            font-weight: 600;
          }
        }
      }


    }
  }
}
</style>