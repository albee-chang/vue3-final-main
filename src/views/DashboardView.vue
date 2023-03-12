<template>
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
            <RouterLink to="/admin/products" class="nav-link"
              >產品管理</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders" class="nav-link"
              >訂單管理</RouterLink
            >
          </li>

          <li class="nav-item">
            <RouterLink to="/admin/articles" class="nav-link"
              >文章管理</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">回到前台首頁</RouterLink>
          </li>
        </ul>
        <button
          class="btn btn-outline-primary m-3"
          type="submit"
          @click.prevent="logout"
        >
          登出
        </button>
      </div>
    </div>
  </nav>

  <div id="wrapper" class="row">
    <div class="d-flex flex-column">
      <div id="content">
        <div class="container-fluid">
          <div class="container" v-if="this.status == true">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Logout Modal-->
  <div
    class="modal fade"
    id="logoutModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          Select "Logout" below if you are ready to end your current session.
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">
            Cancel
          </button>
          <a class="btn btn-primary" href="login.html">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      status: false,
    };
  },
  components: [RouterView],
  methods: {
    logout() {
      document.cookie = `hexToken=;expires=${new Date()};`;
      this.$router.push("/login");
    },
    //確認是否為登入狀態
    checkLogin() {
      // 取出 Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common.Authorization = token;
      const url = `${VITE_APP_URL}/api/user/check`;
      this.$http.post(url).then((res) => {
        if (!res.data.success) {
          this.$router.push("/login");
        } else {
          this.status = true;
        }
      });
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
