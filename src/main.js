import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

import router from "./router";
import "./router/permission";
import "./assets/styles/style.css";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
