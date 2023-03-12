<template>
  <div>單一產品頁面</div>
  <div class="card" height="300px">
    <h2 class="card-title my-3 text-primary fw-bold">
      {{ product.title }}
    </h2>
    <img
      class="card-img-top"
      :src="product.imageUrl"
      style="width: 50vw"
      alt="productImage"
    />
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <hr />
      <p class="card-text">{{ product.content }}</p>
      <a
        href="#"
        class="btn btn-primary"
        @click.prevent="() => addToCart(product.id)"
      >
        加入購物車
      </a>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          Swal.fire(`${res.data.message}!`);
        })
        .catch((err) => {
          Swal.fire(`${err.message}!`);
        });
    },
    getCartList() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
        });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    const url = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`;
    this.$http
      .get(url)
      .then((res) => {
        this.product = res.data.product;
      })
      .catch((err) => {
        Swal.fire(`${err.message}!`);
      });
  },
};
</script>

<style>
img {
  object-fit: cover;
}
</style>
