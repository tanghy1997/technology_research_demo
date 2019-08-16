import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store'

Vue.config.productionTip = false

Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
