import { Vue, router, store } from './config/config'
import App from './components/app.vue'

new Vue({
  router,
  el: '#app',
  render: h => h(App),
  data() {
  	return {
  		store
  	};
  },
});
