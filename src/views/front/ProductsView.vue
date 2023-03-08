<template>
  <div class="row">
    <!-- Sidebar -->
    <ul class="col-2 navbar-nav p-3 mb-5">
      <li><h5>分類</h5></li>
      <hr />
      <div>觀葉植物</div>
      <hr />
      <div>手作商品</div>
      <hr />
      <div>養護材料</div>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div class="col-10 d-flex flex-column">
      <!-- Page Heading -->
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-md-3 card mb-2 me-2"
            v-for="product in products"
            :key="product.id"
          >
            <img
              :src="product.imageUrl"
              class="card-img-top productImg"
              alt="product.title"
            />
            <div class="card-body">
              <h6 class="card-title">
                {{ product.title }}
              </h6>
              <span class="float-end text-danger fw-bolder"
                >$ {{ product.price }} 元</span
              >
            </div>
            <div class="card-body text-center">
              <a
                href="#"
                class="btn btn-outline-primary w-100 mb-1"
                @click.prevent="() => addToCart(product.id)"
                ><i class="bi bi-cart-check fs-5"></i> 加入購物車</a
              >
              <button class="btn btn-success w-100">
                <RouterLink
                  :to="`/product/${product.id}`"
                  class="text-white text-decoration-none"
                >
                  <i class="bi bi-info-circle fs-5"></i>
                  查看產品細節
                </RouterLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      cart: {},
    };
  },
  components: {
    RouterLink,
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
          this.getCartList();
          Swal.fire(`${res.data.message}!`);
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
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
    this.$http
      .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
      .then((res) => {
        this.products = res.data.products;
        this.getCartList();
      })
      .catch((err) => {
        Swal.fire(`${err.data.message}`);
      });
  },
};
</script>

<style>
.productImg {
  object-fit: cover;
  height: 250px;
}
</style>
