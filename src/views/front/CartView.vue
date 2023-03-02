<template>
  <div class="my-2 text-primary">
    <i class="bi bi-arrow-right-circle-fill fs-6"></i> 購物車內容
  </div>
  <div class="text-end mt-5">
    <button
      class="btn btn-outline-danger"
      type="button"
      @click="deleteAllCart()"
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
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCartItem(item)"
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
</template>

<script>
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
          console.log("購物車列表: ", res.data.data);
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
        .then((res) => {
          console.log("更新購物車: ", res.data);
          this.getCartList();
          this.loadingItem = "";
        });
    },
    deleteCartItem(item) {
      this.loadingItem = item.id;
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          console.log("刪除單一品項: ", res.data);
          this.getCartList();
          this.loadingItem = "";
        });
    },
    deleteAllCart() {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          console.log("刪除單一品項: ", res.data);
          this.getCartList();
        });
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>
