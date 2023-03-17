import{S as i}from"./sweetalert2.all-61932d1b.js";import{_ as l,o as _,d as h,f as t,t as a,j as u,F as m}from"./index-8a41e741.js";const{VITE_APP_URL:d,VITE_APP_PATH:n}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",BASE_URL:"/production-sub-path/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},f={data(){return{product:{}}},methods:{addToCart(s,e=1){const o={product_id:s,qty:e};this.$http.post(`${d}/v2/api/${n}/cart`,{data:o}).then(r=>{i.fire(`${r.data.message}!`)}).catch(r=>{i.fire(`${r.message}!`)})},getCartList(){this.$http.get(`${d}/v2/api/${n}/cart`).then(s=>{this.cart=s.data.data})}},mounted(){const{id:s}=this.$route.params,e=`${d}/v2/api/${n}/product/${s}`;this.$http.get(e).then(o=>{this.product=o.data.product}).catch(o=>{i.fire(`${o.message}!`)})}},g=t("div",null,"單一產品頁面",-1),P={class:"card",height:"300px"},v={class:"card-title my-3 text-primary fw-bold"},$=["src"],x={class:"card-body"},w={class:"card-title fw-bold"},y={class:"card-text"},E=t("hr",null,null,-1),T={class:"card-text"};function V(s,e,o,r,c,p){return _(),h(m,null,[g,t("div",P,[t("h2",v,a(c.product.title),1),t("img",{class:"card-img-top",src:c.product.imageUrl,style:{width:"50vw"},alt:"productImage"},null,8,$),t("div",x,[t("h5",w,a(c.product.title),1),t("p",y,a(c.product.description),1),E,t("p",T,a(c.product.content),1),t("a",{href:"#",class:"btn btn-primary",onClick:e[0]||(e[0]=u(()=>p.addToCart(c.product.id),["prevent"]))}," 加入購物車 ")])])],64)}const S=l(f,[["render",V]]);export{S as default};
