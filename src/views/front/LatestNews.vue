<template>
  <div class="container mt-5">
    <div class="text-center mb-4">
      <h4 class="section-title px-5">
        <span class="px-2">最新消息 / 文章</span>
      </h4>
    </div>
    <div
      class="card mb-3 position-relative"
      v-for="article in articles"
      :key="article.id"
      data-aos="fade-up"
    >
      <div class="row g-0" v-if="article.isPublic">
        <div class="col-md-8">
          <img
            :src="article.imageUrl"
            class="img-fluid rounded-start"
            alt="article"
            style="height: 400px; width: 1200px"
          />
        </div>
        <div class="col-md-4">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <div class="card-text" v-html="article.description"></div>
            <RouterLink
              :to="`/news/${article.id}`"
              v-if="article.isPublic"
              class="btn btn-outline-primary position-absolute bottom-0 end-0 m-4"
            >
              繼續閱讀
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
    };
  },
  components: { RouterLink },
  methods: {
    getArticles(page = 1) {
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/articles?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error.response, "錯誤訊息");
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
