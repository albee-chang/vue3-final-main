<template>
  <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-primary': !item.is_paid }">
          <td>{{ formattedDate(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`${item.id}`"
                v-model="item.is_paid"
                @change="() => updatePaid(item)"
              />
              <label class="form-check-label" :for="`${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="() => openModal(item)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="() => openDelOrderModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal
    :order="tempOrder"
    ref="orderModal"
    @update-paid="updatePaid"
  ></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <PaginationPage :pages="pagination" @emitPages="getOrders"></PaginationPage>
</template>

<script>
import DelModal from "@/components/Modals/DelModal.vue";
import OrderModal from "@/components/Modals/OrderModal.vue";
import PaginationPage from "@/components/Modals/PaginationPage.vue";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
import Swal from "sweetalert2";
export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: { DelModal, OrderModal, PaginationPage },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http
        .get(url, this.tempOrder)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire(`${err.data.message}`);
        });
    },
    openModal(item) {
      this.tempOrder = { ...item };
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.openModal();
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http
        .put(api, { data: paid })
        .then((res) => {
          this.isLoading = false;
          const orderComponent = this.$refs.orderModal;
          orderComponent.hideModal();
          this.getOrders(this.currentPage);
          Swal.fire(`${res.data.message}`);
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire(`${err.data.message}`);
        });
    },
    delOrder() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then(() => {
          this.isLoading = false;
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getOrders(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire(`${err}`);
        });
    },
    formattedDate(timestamp) {
      const date = new Date(timestamp * 1000); // 將秒數轉換為毫秒數
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("zh-TW", options).format(date);
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
