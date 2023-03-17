import{m as L,D as w}from"./modalMixin-b2d40697.js";import{_ as k,o as l,d,f as t,t as n,l as y,F as _,i as O,n as P,x,r as p,e as m,p as T}from"./index-8a41e741.js";import{P as V}from"./PaginationPage-1a1e89b9.js";import{S as f}from"./sweetalert2.all-61932d1b.js";import"./base-component-bf69f97d.js";const E={props:{order:{type:Object,default(){return{}}}},data(){return{status:{},modal:"",tempOrder:{},isPaid:!1,DateTimeFormat:""}},emits:["update-paid"],mixins:[L],methods:{formattedDate(s){const o=new Date(s*1e3),a={year:"numeric",month:"numeric",day:"numeric"};return new Intl.DateTimeFormat("zh-TW",a).format(o)}},watch:{order(){this.tempOrder=this.order,this.DateTimeFormat=this.formattedDate(this.tempOrder.create_at)}}},A={class:"modal fade",id:"orderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},I={class:"modal-dialog modal-xl",role:"document"},U={class:"modal-content border-0"},F=t("div",{class:"modal-header bg-dark text-white"},[t("h5",{class:"modal-title"},[t("span",null,"訂單細節")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),S={class:"modal-body"},N={class:"row"},R={class:"col-md-4"},z=t("h3",null,"用戶資料",-1),B={class:"table"},j={key:0},q=t("th",{style:{width:"100px"}},"姓名",-1),H=t("th",null,"Email",-1),W=t("th",null,"電話",-1),G=t("th",null,"地址",-1),J={class:"col-md-8"},K=t("h3",null,"訂單細節",-1),Q={class:"table"},X=t("th",{style:{width:"100px"}},"訂單編號",-1),Y=t("th",null,"下單時間",-1),Z=t("th",null,"付款狀態",-1),tt={key:0,class:"text-success"},et={key:1,class:"text-muted"},st=t("th",null,"總金額",-1),ot=t("h3",null,"選購商品",-1),nt={class:"table"},lt=t("thead",null,[t("tr")],-1),dt={class:"text-end"},rt={class:"d-flex justify-content-end"},at={class:"form-check"},it={class:"form-check-label",for:"flexCheckDefault"},ct={key:0},ut={key:1},ht={class:"modal-footer"},_t=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function pt(s,o,a,u,e,c){return l(),d("div",A,[t("div",I,[t("div",U,[F,t("div",S,[t("div",N,[t("div",R,[z,t("table",B,[e.tempOrder.user?(l(),d("tbody",j,[t("tr",null,[q,t("td",null,n(e.tempOrder.user.name),1)]),t("tr",null,[H,t("td",null,n(e.tempOrder.user.email),1)]),t("tr",null,[W,t("td",null,n(e.tempOrder.user.tel),1)]),t("tr",null,[G,t("td",null,n(e.tempOrder.user.address),1)])])):y("",!0)])]),t("div",J,[K,t("table",Q,[t("tbody",null,[t("tr",null,[X,t("td",null,n(e.tempOrder.id),1)]),t("tr",null,[Y,t("td",null,n(e.DateTimeFormat),1)]),t("tr",null,[Z,t("td",null,[e.tempOrder.is_paid?(l(),d("strong",tt,"已付款")):(l(),d("span",et,"尚未付款"))])]),t("tr",null,[st,t("td",null,n(e.tempOrder.total),1)])])]),ot,t("table",nt,[lt,t("tbody",null,[(l(!0),d(_,null,O(e.tempOrder.products,i=>(l(),d("tr",{key:i.id},[t("th",null,n(i.product.title),1),t("td",null,n(i.qty)+" / "+n(i.product.unit),1),t("td",dt,n(i.final_total),1)]))),128))])]),t("div",rt,[t("div",at,[P(t("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":o[0]||(o[0]=i=>e.tempOrder.is_paid=i)},null,512),[[x,e.tempOrder.is_paid]]),t("label",it,[e.tempOrder.is_paid?(l(),d("span",ct,"已付款")):(l(),d("span",ut,"未付款"))])])])])])]),t("div",ht,[_t,t("button",{type:"button",class:"btn btn-primary",onClick:o[1]||(o[1]=()=>s.$emit("update-paid",e.tempOrder))}," 修改付款狀態 ")])])])],512)}const mt=k(E,[["render",pt]]),{VITE_APP_URL:b,VITE_APP_PATH:g}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",BASE_URL:"/production-sub-path/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},ft={data(){return{orders:{},isNew:!1,pagination:{},isLoading:!1,tempOrder:{},currentPage:1}},components:{DelModal:w,OrderModal:mt,PaginationPage:V},methods:{getOrders(s=1){this.currentPage=s;const o=`${b}/api/${g}/admin/orders?page=${s}`;this.isLoading=!0,this.$http.get(o,this.tempOrder).then(a=>{this.orders=a.data.orders,this.pagination=a.data.pagination,this.isLoading=!1}).catch(a=>{this.isLoading=!1,f.fire(`${a.data.message}`)})},openModal(s){this.tempOrder={...s},this.isNew=!1,this.$refs.orderModal.openModal()},openDelOrderModal(s){this.tempOrder={...s},this.$refs.delModal.openModal()},updatePaid(s){this.isLoading=!0;const o=`${b}/api/${g}/admin/order/${s.id}`,a={is_paid:s.is_paid};this.$http.put(o,{data:a}).then(u=>{this.isLoading=!1,this.$refs.orderModal.hideModal(),this.getOrders(this.currentPage),f.fire(`${u.data.message}`)}).catch(u=>{this.isLoading=!1,f.fire(`${u.data.message}`)})},delOrder(){const s=`${b}/api/${g}/admin/order/${this.tempOrder.id}`;this.isLoading=!0,this.$http.delete(s).then(()=>{this.isLoading=!1,this.$refs.delModal.hideModal(),this.getOrders(this.currentPage)}).catch(o=>{this.isLoading=!1,f.fire(`${o}`)})},formattedDate(s){const o=new Date(s*1e3),a={year:"numeric",month:"numeric",day:"numeric"};return new Intl.DateTimeFormat("zh-TW",a).format(o)}},mounted(){this.getOrders()}},bt={class:"table mt-4"},gt=t("thead",null,[t("tr",null,[t("th",null,"購買時間"),t("th",null,"Email"),t("th",null,"購買款項"),t("th",null,"應付金額"),t("th",null,"是否付款"),t("th",null,"編輯")])],-1),yt=["textContent"],Ot={class:"list-unstyled"},kt={class:"text-right"},Pt={class:"form-check form-switch"},xt=["id","onUpdate:modelValue","onChange"],Dt=["for"],Mt={key:0},Ct={key:1},vt={class:"btn-group"},$t=["onClick"],Lt=["onClick"];function wt(s,o,a,u,e,c){const i=p("VueLoading"),D=p("OrderModal"),M=p("DelModal"),C=p("PaginationPage");return l(),d(_,null,[m(i,{active:e.isLoading,"z-index":1060},null,8,["active"]),t("table",bt,[gt,t("tbody",null,[(l(!0),d(_,null,O(e.orders,(r,v)=>(l(),d(_,{key:v},[e.orders.length?(l(),d("tr",{key:0,class:T({"text-primary":!r.is_paid})},[t("td",null,n(c.formattedDate(r.create_at)),1),t("td",null,[r.user?(l(),d("span",{key:0,textContent:n(r.user.email)},null,8,yt)):y("",!0)]),t("td",null,[t("ul",Ot,[(l(!0),d(_,null,O(r.products,(h,$)=>(l(),d("li",{key:$},n(h.product.title)+" 數量："+n(h.qty)+" "+n(h.product.unit),1))),128))])]),t("td",kt,n(r.total),1),t("td",null,[t("div",Pt,[P(t("input",{class:"form-check-input",type:"checkbox",id:`${r.id}`,"onUpdate:modelValue":h=>r.is_paid=h,onChange:()=>c.updatePaid(r)},null,40,xt),[[x,r.is_paid]]),t("label",{class:"form-check-label",for:`${r.id}`},[r.is_paid?(l(),d("span",Mt,"已付款")):(l(),d("span",Ct,"未付款"))],8,Dt)])]),t("td",null,[t("div",vt,[t("button",{class:"btn btn-outline-primary btn-sm",type:"button",onClick:()=>c.openModal(r)}," 檢視 ",8,$t),t("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:()=>c.openDelOrderModal(r)}," 刪除 ",8,Lt)])])],2)):y("",!0)],64))),128))])]),m(D,{order:e.tempOrder,ref:"orderModal",onUpdatePaid:c.updatePaid},null,8,["order","onUpdatePaid"]),m(M,{item:e.tempOrder,ref:"delModal",onDelItem:c.delOrder},null,8,["item","onDelItem"]),m(C,{pages:e.pagination,onEmitPages:c.getOrders},null,8,["pages","onEmitPages"])],64)}const Ut=k(ft,[["render",wt]]);export{Ut as default};
