<script>
import { RouterView } from "vue-router";
import AOS from "aos";
import "aos/dist/aos.css";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      data: {},
      isLoading: false,
    };
  },
  components: {
    RouterView,
  },
  mounted() {
    AOS.init();
    this.$http
      .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
      .then((res) => {
        this.data = res.data.products;
      });
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "./assets/all";
// 推薦使用 CDN，因為 svg 不一定可以從 node_modules 導出
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css");
</style>
