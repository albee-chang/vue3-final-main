import{_ as l,R as _,r as p,o as i,d as o,F as h,i as u,f as t,t as m,k as f,w as g,h as L,l as c}from"./index-79ae762a.js";import{S as P}from"./sweetalert2.all-b610ad7a.js";const{VITE_APP_URL:v,VITE_APP_PATH:x}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",BASE_URL:"/production-sub-path/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},b={data(){return{articles:[],isLoading:!1,isNew:!1,tempArticle:{}}},components:{RouterLink:_},methods:{getArticles(a=1){const n=`${v}/api/${x}/articles?page=${a}`;this.isLoading=!0,this.$http.get(n).then(e=>{this.articles=e.data.articles,this.pagination=e.data.pagination,this.isLoading=!1}).catch(e=>{this.isLoading=!1,P.fire(`${e.response}`)})}},created(){this.getArticles()}},k={class:"container mt-5"},A=t("div",{class:"text-center mb-4"},[t("h4",{class:"section-title px-5"},[t("span",{class:"px-2"},"最新消息 / 文章")])],-1),R={key:0,class:"row g-0"},T={class:"col-md-8"},$=["src"],w={class:"col-md-4"},E={class:"card-body"},V={class:"card-title"},y=["innerHTML"];function S(a,n,e,B,r,N){const d=p("RouterLink");return i(),o("div",k,[A,(i(!0),o(h,null,u(r.articles,s=>(i(),o("div",{class:"card mb-3 position-relative",key:s.id,"data-aos":"fade-up"},[s.isPublic?(i(),o("div",R,[t("div",T,[t("img",{src:s.imageUrl,class:"img-fluid rounded-start",alt:"article",style:{height:"400px",width:"1200px"}},null,8,$)]),t("div",w,[t("div",E,[t("h5",V,m(s.title),1),t("div",{class:"card-text",innerHTML:s.description},null,8,y),s.isPublic?(i(),f(d,{key:0,to:`/news/${s.id}`,class:"btn btn-outline-primary position-absolute bottom-0 end-0 m-4"},{default:g(()=>[L(" 繼續閱讀 ")]),_:2},1032,["to"])):c("",!0)])])])):c("",!0)]))),128))])}const I=l(b,[["render",S]]);export{I as default};