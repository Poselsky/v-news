import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueFormulate from "@braid/vue-formulate";
import VModal from "vue-js-modal/dist/index.nocss.js";
import "vue-js-modal/dist/styles.css";

import "./style.scss";

Vue.config.productionTip = false;

Vue.use(VueFormulate);
Vue.use(VModal);
new Vue({
	store,
	render: (h) => h(App),
}).$mount("#app");
