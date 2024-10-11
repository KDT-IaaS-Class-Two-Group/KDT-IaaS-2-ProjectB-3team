import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "primevue/resources/themes/saga-purple/theme.css"; // 원하는 테마 CSS
import "primevue/resources/primevue.min.css"; // PrimeVue 기본 스타일
import "primeicons/primeicons.css"; // PrimeIcons 스타일
import "./tailwind.css";

createApp(App).use(store).use(router).mount("#app");
