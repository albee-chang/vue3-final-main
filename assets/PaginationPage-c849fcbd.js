import{_,o as s,c as n,d as t,n as l,k as c,F as g,g as p,t as d}from"./index-49bdb029.js";const u={props:["pages"],methods:{updatePage(o){this.$emit("emitPages",o)}}},h={"aria-label":"Page navigation example"},k={class:"pagination justify-content-center"},m=t("span",{"aria-hidden":"true"},"«",-1),f=[m],v={key:0,class:"page-link"},P=["onClick"],x=t("span",{"aria-hidden":"true"},"»",-1),b=[x];function y(o,i,a,C,B,r){return s(),n("nav",h,[t("ul",k,[t("li",{class:l([{disabled:!a.pages.has_pre},"page-item"])},[t("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:i[0]||(i[0]=c(e=>r.updatePage(a.pages.current_page-1),["prevent"]))},f)],2),(s(!0),n(g,null,p(a.pages.total_pages,e=>(s(),n("li",{class:l(["page-item",{active:a.pages.current_page===e}]),key:e},[e===a.pages.current_page?(s(),n("span",v,d(e),1)):(s(),n("a",{key:1,class:"page-link",href:"#",onClick:c(F=>r.updatePage(e),["prevent"])},d(e),9,P))],2))),128)),t("li",{class:l(["page-item",{disabled:!a.pages.has_next}])},[t("a",{class:"page-link",href:"#","aria-label":"Next",onClick:i[1]||(i[1]=c(e=>r.updatePage(a.pages.current_page+1),["prevent"]))},b)],2)])])}const j=_(u,[["render",y]]);export{j as P};
