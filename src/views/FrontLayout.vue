<template>
  <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <img
        src="../assets/pictures/綠植工作坊logo.png"
        alt=""
        width="140"
        height="55"
      />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link">網路商城</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <RouterLink to="/news" class="nav-link">最新消息</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">關於我們</RouterLink>
          </li>
        </ul>
        <button type="button" class="btn">
          <RouterLink to="/login">
            <i class="bi bi-person-fill"></i>
          </RouterLink>
        </button>
        <button type="button" class="btn">
          <RouterLink to="/cart">
            <i class="bi bi-cart4 position-relative">
              <span
                v-if="cart.carts"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-6"
                >{{ cart.carts.length }}
              </span>
              <span
                v-else
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-6"
                >0
              </span>
            </i>
          </RouterLink>
        </button>
      </div>
    </div>
  </nav>
  <div>
    <RouterView></RouterView>
  </div>
  <!-- Footer Start -->
  <div class="container-fluid bg-secondary text-dark p-5">
    <h4 class="font-weight-semi-bold">聯絡我們</h4>
    <p>
      <i class="bi bi-map text-primary mr-3 fs-5"></i> 客服時間 : 週一至週五
      9:00-18:00
    </p>
    <p>
      <i class="bi bi-envelope text-primary mr-3 fs-5"></i>
      greenplant@gmail.com
    </p>
    <p><i class="bi bi-phone text-primary mr-3 fs-5"></i> (02) 8899-8899</p>
    <h5>歡迎來信，我們將盡快與您聯繫 !</h5>
  </div>
  <!-- Footer End -->
</template>
<style>
i {
  font-size: 1.9rem;
}
a {
  color: primary;
  border-bottom: 2px solid transparent;
}
a:hover {
  border-bottom: 2px solid rgb(98, 145, 132);
  transition-delay: 0.2s;
}
</style>
<script>
import { RouterLink, RouterView } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      cart: {},
    };
  },
  components: [RouterLink, RouterView],
  methods: {
    getCartList() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          console.log("購物車列表: ", res.data.data);
          this.cart = res.data.data;
        });
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>
