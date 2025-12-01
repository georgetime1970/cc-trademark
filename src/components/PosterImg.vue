<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
// @ts-expect-error 暂无官方声明包
import domtoimage from 'dom-to-image-more'
// @ts-expect-error 暂无官方声明包
import QRCode from 'qrcode'

// 定义数据接口
interface Props {
  userInfo: {
    src: string;
    kind: number;
    kindName: string;
    services: {
      group: string;
      items: string[];
    }[];
    tags: {
      isRare: boolean;
      isHot: boolean;
      isSell: boolean;
    }
  }
}



const { userInfo } = defineProps<Props>() // 获取数据


const posterNode = useTemplateRef('posterNode') // 获取posterNode节点
const visible = ref(false) // 海报图片是否可见
const posterUrl = ref('') // 海报base64数据
const tags = ref('') // 徽章图片
// 根据徽章设置相应图片
if (userInfo.tags.isRare) {
  tags.value = '/img/rare.svg'
} else if (userInfo.tags.isHot) {
  tags.value = '/img/good.svg'
}


//#region 图片无圆角方法
// const generate = async () => {
//   if (!posterNode.value) return
//   try {
//     // alert('海报生成中...')
//     const node = posterNode.value
//     const dataUrl = await domtoimage.toPng(node, {
//       quality: 1,
//       width: node.offsetWidth * 2,
//       height: node.offsetHeight * 2,
//       style: {
//         transform: "scale(2)",
//         transformOrigin: "top left",


//       },
//       bgcolor: '#fff',
//       // 关键选项：解决跨域图片不显示
//       imagePlaceholder: 'data:,',
//       cacheBust: true,
//       // 过滤掉你不想生成的元素
//       // filter: (el) => {
//       //   return !el.classList?.contains('no-poster')
//       // }
//     })

//     posterUrl.value = dataUrl
//     visible.value = true
//     // alert('生成成功，快去分享吧~')
//   } catch (err) {
//     console.error(err)
//     // alert('生成失败，请重试')
//   }
// }
//#endregion

/**
 * 图片带圆角方法
 */
const generate = async () => {
  if (!posterNode.value) return
  try {
    // 1. 先用 domtoimage 生成一个方形的图片（不加任何 border-radius）
    const dataUrl = await domtoimage.toPng(posterNode.value, {
      quality: 1,
      width: posterNode.value.offsetWidth * 3,
      height: posterNode.value.offsetHeight * 3,
      style: {
        transform: 'scale(3)',
        transformOrigin: 'top left'
      },
      bgcolor: '#ffffff',
      imagePlaceholder: 'data:,',
      cacheBust: true
    })

    // 2. 创建图片对象
    const img = new Image()
    img.crossOrigin = 'anonymous'  // 如果有跨域图片建议加上
    img.src = dataUrl

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })

    // 3. 用 canvas 画圆角
    const cornerRadius = 16  // 2倍图下 20px → 40px，你可以自行调整
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!

    // 开始路径 + 圆角矩形
    ctx.beginPath()
    ctx.moveTo(cornerRadius, 0)
    ctx.lineTo(canvas.width - cornerRadius, 0)
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, cornerRadius)
    ctx.lineTo(canvas.width, canvas.height - cornerRadius)
    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height)
    ctx.lineTo(cornerRadius, canvas.height)
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - cornerRadius)
    ctx.lineTo(0, cornerRadius)
    ctx.quadraticCurveTo(0, 0, cornerRadius, 0)
    ctx.closePath()

    // 剪裁 + 绘制图片
    ctx.clip()
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // 4. 转成最终带圆角的 dataURL
    const finalDataUrl = canvas.toDataURL('image/png', 1.0)

    posterUrl.value = finalDataUrl
    visible.value = true

  } catch (err) {
    console.error('海报生成失败', err)
  }
}
const onImgLoad = () => {
  // 可选：图片加载完后稍微延迟关闭 loading 更丝滑
}

const currentUrl = ref('')
const qrcodeUrl = ref('')
onMounted(() => {
  // 获取当前页面完整 URL（包含查询参数）
  currentUrl.value = window.location.href
  // 生成图片URL
  QRCode.toDataURL(currentUrl.value)
    .then((url: string) => {
      qrcodeUrl.value = url
    })
    .catch((e: Error) => console.error(e))
})

</script>
<template>

  <!-- 点击按钮触发生成 -->
  <button @click="generate" class="generate-btn">海报分享<img src="@/assets/image/share.svg" alt=""></button>
  <!-- 弹出层 -->
  <div class="poster" v-if="visible" @click="visible = false">
    <img :src="posterUrl" class="poster-img" @load="onImgLoad" />
    <!-- <img :src="posterUrl" class="poster-img" @load="onImgLoad" /> -->
  </div>
  <!-- 隐藏的真实模板（重点！） -->
  <div class="content" ref="posterNode">
    <div class="bg"><img src="@/assets/image/postrBackground.svg" /></div>
    <div class="img-box">
      <div class="img"><img :src="userInfo.src" /></div>
      <div class="name">
        <span>第{{ userInfo.kind }}类-{{ userInfo.kindName }}</span>
        <img :src=tags alt="">
      </div>
      <div class="service">适用范围<br>
        <span v-for="value in userInfo.services" :key="value.group">{{ value.items.toString() }};</span>
      </div>
      <!-- <div class="invite-code">邀请码：{{ userInfo.code }}</div> -->
      <div class="qrcode">
        <div class="left">
          <!-- 生成二维码 -->
          <!-- <img :src="userInfo.qrcode" class="" /> -->
          <img :src="qrcodeUrl" alt="二维码" />
        </div>
        <div class="right">
          <p>长按识别二维码</p>
          <p>查看商标详情</p>
        </div>
      </div>
      <div class="save">长按保存图片</div>
    </div>
  </div>
</template>



<style scoped>
/* 海报生成按钮 */
.generate-btn {
  margin-bottom: 5px;
  padding: 5px 5px;
  border-radius: 5px;
  background-image: linear-gradient(90deg, #0051fa, #3e79f9);
  color: var(--text-white);
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  transition: 0.1s ease-in-out;

  img {
    width: 18px;
  }
}

.generate-btn:active {
  transform: scale(0.9);
}

/* 弹出层 */
.poster {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 1;
  background-color: #0008;

  display: grid;
  justify-content: center;
  align-items: center;
  /* transform-style: preserve-3d; */
  perspective: 300px;

  .poster-img {
    width: 80vw;
    border-radius: var(--border-radius);
    /* animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; */
    animation: flip-in-ver-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
}

/* 隐藏的真实模板  */
.content {
  top: 0;
  left: 0;
  width: 80%;
  position: absolute;
  overflow: hidden;
  color: var(--text-soft);
  top: -9999px;
  /* z-index: 999; */

  /* outline: 1px solid red; */

  .bg {
    position: relative;


    img {
      width: 100%;
      display: block;
    }
  }

  .img-box {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 10px;

    .img {
      width: 100%;
      text-align: center;

      img {
        height: 120px;
      }


    }

    .name {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -30px;
      gap: 10px;

      span {
        padding: 2px 5px;
        color: #ff5548;
        background: #ffedef;
        border-radius: .3125rem;
        font-weight: bold;
        font-size: var(--font-size-smallmax);
        display: inline-block;
        /* 关键：变成可设置宽高的元素 */
        height: 1.875rem;
        /* 你想要的总高度 */
        line-height: 1.875rem;
        /* 和 height 完全相等 */
      }


      img {
        width: 50px;
        display: block;
      }
    }

    .service {

      font-size: var(--font-size-small);
      font-weight: 500px;
      margin-top: -10px;
      line-height: 15px;

      span {
        font-size: var(--font-size-smallmin);
      }
    }

    .qrcode {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      gap: 10px;

      .left {

        overflow: hidden;

        img {
          width: 60px;
          border-radius: 5px;

        }
      }

      .right {

        /* display: grid;
        justify-items: center;
        align-items: center; */
        /* padding: 20px 0; */
        p {
          font-size: var(--font-size-small);
        }
      }

    }

    .save {
      text-align: center;
      font-size: var(--font-size-normal);
      color: var(--text-white);
    }
  }


}
</style>