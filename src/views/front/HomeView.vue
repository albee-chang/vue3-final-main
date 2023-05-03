<template>
  <div class="home" id="home">
    <img
      src="../../assets/pictures/banner-ok-1.jpg"
      class="d-block bannerImg w-100"
      alt="banner"
      data-aos="fade-up"
    />
    <!-- about -->
    <div class="container-fluid bg-light" style="height: 20%">
      <div class="row justify-content-md-center py-5 px-xl-5">
        <div class="col-md-6 col-12 py-5">
          <div class="text-center mb-2 pb-2">
            <h2 class="section-title px-5 mb-3">
              <span class="px-2 fw-bold">「 觀葉植物專賣店 」</span>
            </h2>
            <p class="fw-bold fs-5 text-primary lh-lg" data-aos="fade-up">
              「接觸植物帶給我很大的改變，讓我覺得平靜，我想把這份力量傳遞給其他人」<br />
              懷抱著「讓植物成為日常生活的一部份」的初衷，<br />我們希望藉由平易近人且富有季節感的綠植，<br />讓植物的美好進駐更多人的生活。
              期待點綴每一個日常中的重要時刻。<br />
              觀葉植物在台灣爆紅，和疫情有密不可分的關係。<br />外型姣好的觀葉植物，百看不膩，替漫長的居家時光增添樂趣。<br />而且相較傳統花木，觀葉植物不需要大量光照，很適合沒有花園的都市人。<br />
              在這裡，初學者也能安心選購，我們有知識豐富的專員為您解說，<br />
              協助您挑選最適合您照護的植物，以及教導您養植技巧。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- shop Start -->
    <div class="container-fluid pt-5">
      <div class="text-center mb-4">
        <h2 class="section-title px-5">
          <span class="px-2">網路商城</span>
        </h2>
      </div>
      <div class="row px-xl-5 pb-3">
        <div
          class="col-lg-4 col-md-6 pb-1 mb-3"
          v-for="product in products"
          :key="product.id"
          id="products"
          data-aos="fade-up"
        >
          <div class="border product-item">
            <img
              :src="product.imageUrl"
              class="productImage w-100 mb-2"
              style="height: 450px"
              alt=""
            />
            <div class="productsItemTitle px-2">
              <h4 class="fw-bold">{{ product.title }}</h4>
              <h5>
                <span class="badge bg-primary">{{ product.category }}</span>
              </h5>
            </div>
            <div
              class="h5 fw-bold text-primary px-2"
              v-if="product.origin_price == product.price"
            >
              {{ product.origin_price }} 元
            </div>
            <div v-else>
              <del class="h6 text-warning px-2"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h5 fw-bold text-primary mb-2 px-2">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <button
              class="btn btn-primary add-to-cart-button"
              @click.prevent="() => addToCart(product.id)"
            >
              <i class="bi bi-cart-check fs-5"></i> 加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- shop End -->

    <!-- Articles Start -->
    <div class="container-fluid pt-5">
      <div class="text-center mb-4">
        <h2 class="section-title px-5">
          <span class="px-2">最新消息</span>
        </h2>
      </div>
      <div class="row g-0 px-xl-5 pb-3">
        <div
          class="example-2 card mb-5"
          v-for="article in articles"
          :key="article.id"
        >
          <div
            class="wrapper"
            :style="{
              backgroundImage: 'url(' + article.imageUrl + ')',
            }"
            style="width: 100%; height: 100%; background-size: cover"
          >
            <div class="header">
              <div class="date">
                <span class="day">12</span>
                <span class="month">Aug</span>
                <span class="year">2023</span>
              </div>
              <ul class="menu-content">
                <li>
                  <a href="#" class="fa fa-bookmark-o"></a>
                </li>
                <li>
                  <a href="#" class="fa fa-heart-o"><span>18</span></a>
                </li>
                <li>
                  <a href="#" class="fa fa-comment-o"><span>3</span></a>
                </li>
              </ul>
            </div>
            <div class="data">
              <div class="content">
                <span class="author">GREEN HOUSE</span>
                <h1 class="title">
                  <a href="#">{{ article.title }}</a>
                </h1>
                <p class="text">
                  {{ article.description }}
                </p>
                <RouterLink
                  :to="`/news/${article.id}`"
                  v-if="article.isPublic"
                  class="btn btn-outline-primary m-4 ms-auto text-nowrap"
                >
                  繼續閱讀
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Articles End -->

    <!-- Back to Top -->
    <div class="text-end">
      <a href="#" class="btn"
        ><i class="bi bi-arrow-up-circle-fill text-primary backTop"></i
      ></a>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import cartStore from "../../stores/cart";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
import Swal from "sweetalert2";
export default {
  data() {
    return {
      products: [],
      isHovering: false,
      articles: [],
    };
  },
  computed: {
    ...mapState(cartStore, ["carts"]), //購物車列表
  },
  methods: {
    getProductList() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
    getArticles(page = 1) {
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/articles?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.articles = res.data.articles;
        })
        .catch((err) => {
          Swal.fire(`${err.data.message}`);
        });
    },
    ...mapActions(cartStore, ["getCartList"]),
    ...mapActions(cartStore, ["addToCart"]),
  },
  mounted() {
    this.getProductList();
    this.getArticles();
  },
};
</script>

<style>
.bannerImg {
  max-height: 800px;
  object-fit: cover;
}
i {
  margin-top: 2rem;
}

.product-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.productImage {
  object-fit: cover;
  height: 100%;
}
.productsItemTitle {
  display: flex;
  justify-content: space-between;
}
.backTop {
  margin-top: 2rem;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 3rem;
}
</style>
