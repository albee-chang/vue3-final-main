import{S as c}from"./sweetalert2.all-61932d1b.js";import{_ as f,b as _,m as h,r as d,o as v,d as V,e as a,w as g,f as e,p as n,n as y,q as x}from"./index-8a41e741.js";import{c as u}from"./cart-9eaddd08.js";const{VITE_APP_URL:w,VITE_APP_PATH:P}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",BASE_URL:"/production-sub-path/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},E={data(){return{cart:{},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{createOrder(){this.$http.post(`${w}/v2/api/${P}/order`,{data:this.form}).then(o=>{c.fire(`${o.data.message}`),this.$refs.form.resetForm(),this.$router.push("/")}).catch(o=>{c.fire(`${o.data.message}`)})},..._(u,["getCartList"])},computed:{...h(u,["carts"])},mounted(){this.getCartList()}},S={class:"my-5 row justify-content-center"},k=e("h5",{class:"text-center fw-bold text-primary"},"填寫訂購表單",-1),A=e("div",{style:{width:"60vw"},class:"my-5"},[e("div",{class:"position-relative m-4"},[e("div",{class:"progress",style:{height:"1px"}},[e("div",{class:"progress-bar",role:"progressbar",style:{width:"50%"},"aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"})]),e("button",{type:"button",class:"position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"bi bi-bag-check-fill fs-5"})]),e("button",{type:"button",class:"position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"bi bi-card-checklist fs-5"})]),e("button",{type:"button",class:"position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"bi bi-box2-heart-fill fs-5"})])])],-1),U={class:"mb-3"},T=e("label",{for:"email",class:"form-label"},"Email",-1),C={class:"mb-3"},q=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),F={class:"mb-3"},L=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),R={class:"mb-3"},B=e("label",{for:"address",class:"form-label"},"收件人地址",-1),D={class:"mb-3"},I=e("label",{for:"message",class:"form-label"},"留言",-1),O=e("div",{class:"text-end"},[e("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function H(o,s,M,N,t,p){const r=d("VueField"),i=d("error-message"),b=d("VueForm");return v(),V("div",S,[k,A,a(b,{ref:"form",class:"col-md-6",onSubmit:p.createOrder},{default:g(({errors:m})=>[e("div",U,[T,a(r,{id:"email",name:"email",type:"email",class:n(["form-control",{"is-invalid":m.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:t.form.user.email,"onUpdate:modelValue":s[0]||(s[0]=l=>t.form.user.email=l)},null,8,["class","modelValue"]),a(i,{name:"email",class:"invalid-feedback"})]),e("div",C,[q,a(r,{id:"name",name:"姓名",type:"text",class:n(["form-control",{"is-invalid":m.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:t.form.user.name,"onUpdate:modelValue":s[1]||(s[1]=l=>t.form.user.name=l)},null,8,["class","modelValue"]),a(i,{name:"姓名",class:"invalid-feedback"})]),e("div",F,[L,a(r,{id:"tel",name:"電話",type:"tel",class:n(["form-control",{"is-invalid":m.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10",modelValue:t.form.user.tel,"onUpdate:modelValue":s[2]||(s[2]=l=>t.form.user.tel=l)},null,8,["class","modelValue"]),a(i,{name:"電話",class:"invalid-feedback"})]),e("div",R,[B,a(r,{id:"address",name:"地址",type:"text",class:n(["form-control",{"is-invalid":m.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:t.form.user.address,"onUpdate:modelValue":s[3]||(s[3]=l=>t.form.user.address=l)},null,8,["class","modelValue"]),a(i,{name:"地址",class:"invalid-feedback"})]),e("div",D,[I,y(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":s[4]||(s[4]=l=>t.form.message=l)},null,512),[[x,t.form.message]])]),O]),_:1},8,["onSubmit"])])}const J=f(E,[["render",H]]);export{J as default};
