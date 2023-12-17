import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

import router from "./router";
import "./router/permission";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

import "./assets/tailwind.css";

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(ToastPlugin).mount("#app");
