import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import App from './App.vue';
import router from './router';
import store from './store';
import { io } from 'socket.io-client';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const socket = io('http://localhost:3002', { transports: ['websocket'] });
store.commit('SET_SOCKET', socket)

createApp(App).use(store).use(ToastService).use(PrimeVue)
  .use(router)
  .mount('#app');
