<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <h5 class="text-center mb-5">進入後台頁面</h5>
      <div class="col-4">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              v-model="user.username"
              id="floatingInput"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {
        username: "", //HTML標籤中使用 v-model(雙向綁定) 會自動更新 username
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = `${VITE_APP_URL}/v2/admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          Swal.fire(`${res.data.message}`);
          this.$router.push("/admin/products");
        })
        .catch((err) => {
          Swal.fire(`${err.response.data.message}`);
        });
    },
  },
};
</script>
