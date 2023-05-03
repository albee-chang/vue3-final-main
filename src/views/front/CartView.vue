<template>
  <div class="mx-5 my-5 row justify-content-center" v-if="!cart.carts">
    <div class="my-2 text-primary">
      <i class="bi bi-arrow-right-circle-fill fs-6"></i> 購物車內容
    </div>
    <div style="width: 60vw" class="my-5">
      <div class="position-relative m-4">
        <div class="progress" style="height: 1px">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 0%"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <button
          type="button"
          class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="bi bi-bag-check-fill fs-5"></i>
        </button>
        <button
          type="button"
          class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="bi bi-card-checklist fs-5"></i>
        </button>
        <button
          type="button"
          class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="bi bi-box2-heart-fill fs-5"></i>
        </button>
      </div>
    </div>
    <div class="text-end mt-5">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="() => deleteAllCart()"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template>
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="() => deleteCartItem(item)"
              >
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group">
                  <select
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.qty"
                    @change="updateCart(item)"
                  >
                    <option :value="i" v-for="i in 10" :key="i + 'inCart'">
                      {{ i }}
                    </option>
                  </select>
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td>
              <span>{{ item.product.price }}</span>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              {{ item.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="text-end my-5">
      <button class="btn btn-primary" type="button">
        <RouterLink to="/charge" class="text-white text-decoration-none"
          >付款結帳</RouterLink
        >
      </button>
    </div>
  </div>
  <div
    class="mx-5 my-5 row d-flex justify-content-center align-items-center"
    v-else
  >
  <div class="mt-5 text-center text-primary h1 fw-bold">購物車內無商品</div>
    <div class="mt-5 text-center text-primary h3 fw-bold">
      <RouterLink to="/" class="btn text-primary text-decoration-none"
        >回到首頁</RouterLink
      >
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
      productId: "",
      cart: {},
      loadingItem: "",
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    getCartList() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
        });
    },
    updateCart(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.loadingItem = item.id;
      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, {
          data,
        })
        .then(() => {
          this.getCartList();
          this.loadingItem = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCartItem(item) {
      this.loadingItem = item.id;
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then(() => {
          this.getCartList();
          this.loadingItem = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteAllCart() {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then(() => {
          this.getCartList();
          Swal.fire(`購物車已清空`);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>