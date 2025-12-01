<!-- components/LazyImage.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue'
import error from '@/assets/image/404.svg'

withDefaults(defineProps<{
  src: string
  alt?: string
  placeholder?: string
}>(), {
  placeholder: error
})

const imgRef = useTemplateRef('imgRef')
const loaded = ref(false)
let observer: IntersectionObserver | null = null

// 创建原生 IntersectionObserver
const createObserver = () => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting && !loaded.value) {
          loaded.value = true
          observer?.unobserve(entry!.target)
        }
      },
      { threshold: 0.1 }  // 提前 10% 加载
    )
  }
}

// 挂载时观察
onMounted(() => {
  createObserver()
  if (observer && imgRef.value) {
    observer.observe(imgRef.value)
  }
})

// 卸载时清理
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div ref="imgRef">
    <img v-if="loaded" :src="src" :alt="alt" class="lazy-img" loading="lazy" />
    <img v-else :src="placeholder" :alt="alt" class="lazy-placeholder" />
  </div>
</template>

<style scoped>
.lazy-img,
.lazy-placeholder {
  width: 100%;
  height: 100%;
  transition: 3s ease-in-out;
}

/* .lazy-placeholder {
  opacity: 0.5;
  filter: blur(2px);
} */
</style>