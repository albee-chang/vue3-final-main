import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
//加入環境變數
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

//目前這環境不屬於 Vue
const cartStore = defineStore("cart", {
  // 建立 state, actions, getters
  state: () => {
    return {
      carts: [],
      total: 0,
      final_total: 0,
    };
  },
  actions: {
    //取得購物車列表
    getCartList() {
      axios.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`).then((res) => {
        this.carts = res.data.data.carts;
        this.total = res.data.data.total;
        this.final_total = res.data.data.final_total;
      });
    },
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      axios
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          Swal.fire(`${res.data.message}`);
          this.getCartList();
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
  },
  getters: {},
});

export default cartStore;
