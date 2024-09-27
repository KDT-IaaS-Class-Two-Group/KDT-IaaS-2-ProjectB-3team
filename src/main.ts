import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./tailwind.css"; // 추가한 Tailwind CSS 파일

createApp(App).use(store).use(router).mount("#app");
