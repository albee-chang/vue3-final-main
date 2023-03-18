<template class="h-100">
  <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <a href="#">
        <img
          src="../assets/pictures/綠植工作坊logo.png"
          alt="logo"
          width="140"
          height="55"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" @click="() => navToggle()"></span>
      </button>
      <div class="collapse navbar-collapse" id="navCollapse">
        <ul class="navbar-nav mb-2 mb-lg-0 mx-auto fs-5 fw-bold">
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
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-6"
                >{{ carts.length }}
              </span>
            </i>
          </RouterLink>
        </button>
      </div>
    </div>
  </nav>
  <div class="min-h">
    <RouterView />
  </div>
  <!-- Footer Start -->
  <div class="container-fluid bg-light text-primary px-4 py-3 fw-bold footer">
    <h4 class="mb-3 fw-bold">聯絡我們</h4>
    <p>
      <i class="bi bi-chevron-right text-primary me-2 fs-6"></i> 客服時間 :
      週一至週五 9:00-18:00
    </p>
    <p>
      <i class="bi bi-chevron-right text-primary me-2 fs-6"></i>
      greenplant@gmail.com
    </p>
    <p>
      <i class="bi bi-chevron-right text-primary me-2 fs-6"></i> (02) 8899-8899
    </p>
    <p class="bi bi-chevron-right me-2 fs-6 fw-bold">
      歡迎來信，我們將盡快與您聯繫 !
    </p>
  </div>
  <!-- Footer End -->
</template>
<style>
i {
  font-size: 1.9rem;
}
</style>
<script>
import { RouterLink, RouterView } from "vue-router";
import { mapActions, mapState } from "pinia";
import cartStore from "../stores/cart";
import Collapse from "bootstrap/js/dist/collapse.js";
let navCollapse = "";
export default {
  data() {
    return {};
  },
  components: [RouterLink, RouterView],
  computed: {
    ...mapState(cartStore, ["carts"]), //購物車列表
  },
  methods: {
    ...mapActions(cartStore, ["getCartList"]),
    navToggle() {
      navCollapse.toggle();
    },
  },
  mounted() {
    this.getCartList();
    navCollapse = new Collapse(document.querySelector("#navCollapse"), {
      toggle: false,
    });
  },
};
</script>

<style>
.min-h {
  min-height: calc(100vh - 82px);
}
.footer {
  background-image: url("/src/assets/pictures/footer.jpg");
  background-position: right center;
  background-size: cover;
}
@media screen and (max-width: 450px) {
  .footer {
    background-image: none;
    background-color: black;
  }
}
</style>
