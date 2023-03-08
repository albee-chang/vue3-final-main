<template>
  <div>
    <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="() => openModal(true)"
      >
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">圖片</th>
          <th width="60"></th>
          <th width="120">售價</th>
          <th width="100">原價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>
            <img
              :src="item.imageUrl"
              class="img-fluid w-100"
              style="height: 70px"
            />
          </td>
          <td></td>
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right fw-bold text-danger">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="() => openModal('edit', item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="() => openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="getData"></Pagination>
    <!-- ProductModal -->
    <ProductModal
      @update-product="updateProduct"
      :product="tempProduct"
      :status="status"
      ref="productModal"
    />
    <!-- DelModal -->
    <DelModal
      :item="tempProduct"
      ref="delModal"
      @del-item="delProduct"
    ></DelModal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import DelModal from "@/components/Modals/DelModal.vue";
import Pagination from "@/components/Modals/PaginationPage.vue";
import ProductModal from "@/components/Modals/ProductModal.vue";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isLoading: false,
      status: false, //預設的產品狀態，確認是編輯或新增所使用的
      modal: {
        editModal: "",
        delModal: "",
      },
      currentPage: 1,
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  methods: {
    //渲染所有產品至畫面上
    getData(page = 1) {
      this.isLoading = true;
      //參數 page 預設值
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products/?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log("後臺所有產品: ", res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
    openModal(status, product) {
      if (status === true) {
        //建立新的產品
        this.tempProduct = {
          imagesUrl: [],
          id: new Date().getTime(),
        };
        this.status = true;
        const productComponent = this.$refs.productModal;
        productComponent.openModal(); //打開動態視窗
      } else if (status === "edit") {
        //修改產品
        this.tempProduct = { ...product };
        this.status = false;
        const productComponent = this.$refs.productModal;
        productComponent.openModal(); //打開動態視窗
      } else if (status === "delete") {
        //刪除產品
        this.tempProduct = { ...product };
        const delComponent = this.$refs.delModal;
        delComponent.openModal();
      }
    },
    updateProduct() {
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`;
      let http = "post";
      //判斷是否為新的產品，如果不是就改成"put" => 編輯產品
      if (!this.status) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }

      this.$http[http](url, { data: this.tempProduct })
        .then((res) => {
          Swal.fire(`${res.data.message}`);
          const productComponent = this.$refs.productModal;
          productComponent.hideModal();
          this.getData(); //重新取得資料
          this.tempProduct = {};
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
    delProduct() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          Swal.fire(`${res.data.message}`);
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getData(this.currentPage);
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
