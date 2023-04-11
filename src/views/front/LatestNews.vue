<template>
  <div class="container-fluid pt-5 mx-5">
      <div class="text-center mb-4">
        <h2 class="section-title px-5">
          <span class="px-2">最新消息</span>
        </h2>
      </div>
      <div class="row g-0 px-xl-5 articlesList">
        <div
          class="card mb-3 col-6 col-md-4  mx-2"
          v-for="article in articles"
          :key="article.id"
          data-aos="fade-up"
        >
          <div v-if="article.isPublic">
            <img
              :src="article.imageUrl"
              class="img-fluid w-100 rounded-start article-image"
              alt="article"
            />
            <div class="card-body">
              <h5 class="card-title fw-bold text-primary fs-3">
                <i class="bi bi-tree-fill"></i>
                {{ article.title }}
              </h5>
              <div class="card-text">
                <i class="bi bi-caret-right-fill fs-6"></i
                >{{ article.description }}
              </div>
              <RouterLink
                :to="`/news/${article.id}`"
                v-if="article.isPublic"
                class="btn btn-outline-primary mt-3 text-nowrap justify-content-end"
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
import Swal from "sweetalert2";
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
        .catch((err) => {
          this.isLoading = false;
          Swal.fire(`${err.response}`);
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
<style>
 .card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.articlesList {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>