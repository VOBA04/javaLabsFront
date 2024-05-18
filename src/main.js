import './assets/main.css';

import vClickOutside from 'v-click-outside';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

const { bind, unbind } = vClickOutside.directive;

app.directive('click-outside', {
  mounted(el, bindling) {
    bind(el, { value: bindling.value });
  },
  beforeUnmount(el) {
    unbind(el);
  },
});

app.mount('#app')