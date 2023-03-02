import{S as l}from"./sweetalert2.all-98914c49.js";import{_,o as p,c as h,d as t,t as r,k as u,F as m}from"./index-703dcbb1.js";const{VITE_APP_URL:i,VITE_APP_PATH:n}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",VITE_TEXT:"這是產品的環境",BASE_URL:"/vue3-final-main/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},f={data(){return{product:{}}},methods:{addToCart(o,e=1){const s={product_id:o,qty:e};this.$http.post(`${i}/v2/api/${n}/cart`,{data:s}).then(a=>{l.fire(`${a.data.message}!`)}).catch(a=>{console.log(a)})},getCartList(){this.$http.get(`${i}/v2/api/${n}/cart`).then(o=>{this.cart=o.data.data})}},mounted(){const{id:o}=this.$route.params,e=`${i}/v2/api/${n}/product/${o}`;this.$http.get(e).then(s=>{this.product=s.data.product,console.log(s)}).catch(s=>{console.log(s)})}},g=t("div",null,"單一產品頁面",-1),v={class:"card",height:"300px"},P={class:"card-title mt-2"},T=["src"],E={class:"card-body"},$={class:"card-title fw-bold"},V={class:"card-text"},x=t("hr",null,null,-1),A={class:"card-text"};function S(o,e,s,a,c,d){return p(),h(m,null,[g,t("div",v,[t("h2",P,r(c.product.title),1),t("img",{class:"card-img-top",src:c.product.imageUrl,alt:""},null,8,T),t("div",E,[t("h5",$,r(c.product.title),1),t("p",V,r(c.product.description),1),x,t("p",A,r(c.product.content),1),t("a",{href:"#",class:"btn btn-primary",onClick:e[0]||(e[0]=u(b=>d.addToCart(c.product.id),["prevent"]))}," 加入購物車 ")])])],64)}const I=_(f,[["render",S]]);export{I as default};
