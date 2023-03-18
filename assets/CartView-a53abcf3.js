import{_ as x,R as b,r as C,o as d,d as c,f as t,F as h,i as p,l as m,t as o,e as v,w as y,h as u,n as f,v as $}from"./index-79ae762a.js";const{VITE_APP_URL:i,VITE_APP_PATH:r}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",BASE_URL:"/production-sub-path/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},I={data(){return{products:[],productId:"",cart:{},loadingItem:""}},components:{RouterLink:b},methods:{getCartList(){this.$http.get(`${i}/v2/api/${r}/cart`).then(e=>{this.cart=e.data.data})},updateCart(e){const a={product_id:e.product.id,qty:e.qty};this.loadingItem=e.id,this.$http.put(`${i}/v2/api/${r}/cart/${e.id}`,{data:a}).then(()=>{this.getCartList(),this.loadingItem=""})},deleteCartItem(e){this.loadingItem=e.id,this.$http.delete(`${i}/v2/api/${r}/cart/${e.id}`).then(()=>{this.getCartList(),this.loadingItem=""})},deleteAllCart(){this.$http.delete(`${i}/v2/api/${r}/carts`).then(()=>{this.getCartList()})}},mounted(){this.getCartList()}},L=t("div",{class:"my-2 text-primary"},[t("i",{class:"bi bi-arrow-right-circle-fill fs-6"}),u(" 購物車內容 ")],-1),V={class:"text-end mt-5"},k={class:"table align-middle"},P=t("thead",null,[t("tr",null,[t("th"),t("th",null,"品名"),t("th",{style:{width:"150px"}},"數量/單位"),t("th",null,"單價"),t("th")])],-1),A=["onClick"],R=t("div",{class:"text-success"},"已套用優惠券",-1),E={class:"input-group input-group-sm"},w={class:"input-group"},T=["onUpdate:modelValue","onChange"],D=["value"],S={class:"input-group-text",id:"basic-addon2"},U={class:"text-end"},q=t("small",{class:"text-success"},"折扣價：",-1),B=t("td",null,null,-1),N=t("td",{colspan:"3",class:"text-end"},"總計",-1),F={class:"text-end"},H=t("td",null,null,-1),M=t("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),O={class:"text-end text-success"},j={class:"text-end my-5"},z={class:"btn btn-primary",type:"button"};function G(e,a,J,K,l,_){const g=C("RouterLink");return d(),c(h,null,[L,t("div",V,[t("button",{class:"btn btn-outline-danger",type:"button",onClick:a[0]||(a[0]=()=>_.deleteAllCart())}," 清空購物車 ")]),t("table",k,[P,t("tbody",null,[l.cart.carts?(d(!0),c(h,{key:0},p(l.cart.carts,s=>(d(),c("tr",{key:s.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:n=>_.deleteCartItem(s)}," x ",8,A)]),t("td",null,[u(o(s.product.title)+" ",1),R]),t("td",null,[t("div",E,[t("div",w,[f(t("select",{name:"",id:"",class:"form-control","onUpdate:modelValue":n=>s.qty=n,onChange:n=>_.updateCart(s)},[(d(),c(h,null,p(10,n=>t("option",{value:n,key:n+"inCart"},o(n),9,D)),64))],40,T),[[$,s.qty]]),t("span",S,o(s.product.unit),1)])])]),t("td",null,[t("span",null,o(s.product.price),1)]),t("td",U,[q,u(" "+o(s.total),1)])]))),128)):m("",!0)]),t("tfoot",null,[t("tr",null,[B,N,t("td",F,o(l.cart.total),1)]),t("tr",null,[H,M,t("td",O,o(l.cart.final_total),1)])])]),t("div",j,[t("button",z,[v(g,{to:"/charge",class:"text-white text-decoration-none"},{default:y(()=>[u("付款結帳")]),_:1})])])],64)}const W=x(I,[["render",G]]);export{W as default};