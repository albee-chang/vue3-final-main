import { createApp } from "vue";
import { createPinia } from "pinia";
//表單驗證
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

import App from "./App.vue";
import router from "./router";
//axios、VueAxios 套件
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/all.scss";
//sweetalert2 套件
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

//Loading 套件
import Loading from "vue-loading-overlay";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
//載入 Bootstrap5 icon
import "bootstrap-icons/font/bootstrap-icons.css";

//載入CKEditor套件
import CKEditor from "@ckeditor/ckeditor5-vue";

//匯入全部規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
//設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), //載入繁體中文語系
  validateOnInput: true, //當輸入任何內容直接進行驗證
});
//設定預設語系
setLocale("zh_TW");

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faUserSecret);

const app = createApp(App);

app.component("VueLoading", Loading);

app.component("VueForm", Form);
app.component("VueField", Field);
app.component("ErrorMessage", ErrorMessage);

/* add font awesome icon component */
app.component("font-awesome-icon", FontAwesomeIcon);
app.config.productionTip = false;

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(LoadingPlugin, {});
app.use(VueSweetalert2);
app.use(CKEditor);

app.mount("#app");
