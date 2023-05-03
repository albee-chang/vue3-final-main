<template>
  <div class="mx-5 my-5 text-primary">
    <i class="bi bi-arrow-right-circle-fill fs-6"></i> 單一產品頁面
  </div>
  <div class="wrapper">
    <div>
      <img class="productImage" :src="product.imageUrl" alt="productImage" />
    </div>
    <div class="productInfo mx-5">
      <h2 class="card-title mb-5 text-primary fw-bold">
        {{ product.title }}
      </h2>
      <div class="card-body">
        <h5 class="card-title fw-bold"><span class="text-primary fw-bold border mx-3"> 產品名稱: </span>{{ product.title }}</h5>
        <br>
        <div class="card-text"><span class="text-primary fw-bold border mx-3"> 產品敘述: </span>{{ product.description }}</div>
        <hr />
      <div class="card-text"><span class="text-primary fw-bold border mx-3"> 產品細節 </span>{{ product.content }}</div>
        
      </div>

      <div>
        <a
          href="#"
          class="btn btn-primary w-100"
          @click.prevent="() => addToCart(product.id)"
        >
          加入購物車
        </a>
      </div>
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
.wrapper {
  display: flex;
  justify-content: space-around;
}
img {
  object-fit: cover;
}
.productImage {
  height: 600px;
}
.productInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
