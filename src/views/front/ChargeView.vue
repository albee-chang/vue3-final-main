<template>
  <div class="my-5 row justify-content-center">
    <h5 class="text-center fw-bold text-primary">填寫訂購表單</h5>
    <div style="width: 60vw" class="my-5">
      <div class="position-relative m-4">
        <div class="progress" style="height: 1px">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 50%"
            aria-valuenow="50"
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
          class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"
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
    <VueForm
      ref="form"
      class="col-md-6"
      v-slot="{ errors }"
      @submit="createOrder"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VueField
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="form.user.email"
        ></VueField>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <VueField
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></VueField>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <VueField
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required|min:8|max:10"
          v-model="form.user.tel"
        ></VueField>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <VueField
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></VueField>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </VueForm>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { mapActions, mapState } from "pinia";
import cartStore from "../../stores/cart";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    createOrder() {
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, {
          data: this.form,
        })
        .then((res) => {
          Swal.fire(`${res.data.message}`);
          this.$refs.form.resetForm();
          this.$router.push("/");
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
    ...mapActions(cartStore, ["getCartList"]),
  },
  computed: {
    ...mapState(cartStore, ["carts"]), //購物車列表
  },
  mounted() {
    this.getCartList();
  },
};
</script>
