<template>
  <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
  <div class="row">
    <!-- Sidebar -->
    <ul class="col-2 navbar-nav p-3 mb-2 d-none d-lg-block">
      <li>
        <h5 class="text-primary fw-bold">
          <i class="bi bi-tags fs-5 me-2"></i>分類
        </h5>
      </li>
      <hr />
      <button type="button" class="btn" @click="() => getProducts()">
        全部商品
      </button>
      <hr />
      <button type="button" class="btn" @click="() => getCategory('觀葉植物')">
        觀葉植物
      </button>
      <hr />
      <button type="button" class="btn" @click="() => getCategory('手作商品')">
        手作商品
      </button>
      <hr />
      <button type="button" class="btn" @click="() => getCategory('養護材料')">
        養護材料
      </button>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div class="col-10 d-flex flex-column mt-2">
      <!-- Page Heading -->
      <div class="container">
        <div class="row g-0">
          <h5 class="fw-bold text-primary mt-2">
            {{ this.title }}
            <i class="bi bi-arrow-down-right-square-fill fs-5"></i>
          </h5>
          <div
            class="col-12 col-md-3 card mb-2 me-2"
            v-for="product in products"
            :key="product.id"
            data-aos="fade-up"
          >
            <img
              :src="product.imageUrl"
              class="card-img-top productImg w-100"
              alt="productTitle"
            />
            <div class="card-body">
              <h6 class="card-title">
                {{ product.title }}
              </h6>
              <span class="float-end text-danger fw-bolder"
                >$ {{ toCurrency(product.price) }} 元</span
              >
            </div>
            <div class="card-body text-center">
              <a
                href="#"
                class="btn btn-outline-primary w-100 mb-1"
                @click.prevent="() => addToCart(product.id)"
                ><i class="bi bi-cart-check fs-5"></i> 加入購物車</a
              >
              <button class="btn btn-success w-100" type="button">
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
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
</template>
<script>
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";
import Pagination from "../../components/Modals/PaginationPage.vue";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      cart: {},
      title: "",
      pagination: {},
      currentPage: 1,
      isLoading: false,
    };
  },
  components: {
    RouterLink,
    Pagination,
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
    toCurrency(num) {
      if (num === undefined || num === null) {
        return "";
      }
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getCategory(category, page = 1) {
      this.isLoading = true;
      this.$http
        .get(
          `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products??page=${page}&category=${category}`
        )
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
          this.title = `${category}`;
          this.isLoading = false;
        });
    },
    getProducts(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.getCartList();
          this.isLoading = false;
          this.title = "全部商品";
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style>
.productImg {
  object-fit: cover;
  height: 250px;
}
</style>
