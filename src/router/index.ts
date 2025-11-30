import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ConsultView from "@/views/ConsultView.vue";
import TrademarkInfo from "@/views/TrademarkInfoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Consult",
      name: "Consult",
      // component: () => import('../views/AboutView.vue'),
      component: ConsultView,
    },
    {
      path: "/TrademarkInfo/:id",
      name: "TrademarkInfo",
      component: TrademarkInfo,
      props: true,
    },
  ],
  // 保留 history 回退恢复滚动，但特定页面强制顶部
  scrollBehavior(to, from, savedPosition) {
    if (to.name === "Consult") {
      return { top: 0 };
    }
    // 如果是浏览器前进/后退，就使用 savedPosition
    if (savedPosition) {
      return savedPosition;
    }

    // 否则正常跳转返回顶部
    return { top: 0 };
  },
});

export default router;
