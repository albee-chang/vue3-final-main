import{_ as d,R as _,r as p,o,c as i,F as h,h as u,e as t,t as m,j as g,w as f,g as L,k as c}from"./index-f560c874.js";const{VITE_APP_URL:v,VITE_APP_PATH:P}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",VITE_TEXT:"這是產品的環境",BASE_URL:"/vue3-final-main/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},x={data(){return{articles:[],isLoading:!1,isNew:!1,tempArticle:{}}},components:{RouterLink:_},methods:{getArticles(a=1){const n=`${v}/api/${P}/articles?page=${a}`;this.isLoading=!0,this.$http.get(n).then(e=>{this.articles=e.data.articles,this.pagination=e.data.pagination,this.isLoading=!1}).catch(e=>{this.isLoading=!1,console.log(e.response,"錯誤訊息")})}},created(){this.getArticles()}},T={class:"container mt-5"},b=t("div",{class:"text-center mb-4"},[t("h4",{class:"section-title px-5"},[t("span",{class:"px-2"},"最新消息 / 文章")])],-1),k={key:0,class:"row g-0"},A={class:"col-md-8"},E=["src"],R={class:"col-md-4"},V={class:"card-body"},$={class:"card-title"},w=["innerHTML"];function y(a,n,e,B,r,I){const l=p("RouterLink");return o(),i("div",T,[b,(o(!0),i(h,null,u(r.articles,s=>(o(),i("div",{class:"card mb-3 position-relative",key:s.id,"data-aos":"fade-up"},[s.isPublic?(o(),i("div",k,[t("div",A,[t("img",{src:s.imageUrl,class:"img-fluid rounded-start",alt:"article",style:{height:"400px",width:"1200px"}},null,8,E)]),t("div",R,[t("div",V,[t("h5",$,m(s.title),1),t("div",{class:"card-text",innerHTML:s.description},null,8,w),s.isPublic?(o(),g(l,{key:0,to:`/news/${s.id}`,class:"btn btn-outline-primary position-absolute bottom-0 end-0 m-4"},{default:f(()=>[L(" 繼續閱讀 ")]),_:2},1032,["to"])):c("",!0)])])])):c("",!0)]))),128))])}const D=d(x,[["render",y]]);export{D as default};