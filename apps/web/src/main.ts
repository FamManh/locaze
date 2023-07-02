import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './style.css';
import './colors.css';
import App from './App.vue';
import router from './router';

const store = createPinia();
const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
