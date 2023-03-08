import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "about",
          component: () => import("../views/front/AboutView.vue"),
        },
        {
          path: "cart",
          component: () => import("../views/front/CartView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/front/ProductsView.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/front/ProductView.vue"),
        },
        {
          path: "charge",
          component: () => import("../views/front/ChargeView.vue"),
        },
        {
          path: "login",
          component: () => import("../views/front/LoginView.vue"),
        },
        {
          path: "news",
          component: () => import("../views/front/LatestNews.vue"),
        },

        {
          path: "news/:id",
          component: () => import("../views/front/ArticleView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/DashboardView.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/admin/AdminProducts.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/AdminOrders.vue"),
        },

        {
          path: "articles",
          component: () => import("../views/admin/AdminArticle.vue"),
        },
      ],
    },
  ],
  linkActiveClass: "active",
});

export default router;
