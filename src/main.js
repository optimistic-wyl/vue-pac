import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import { Button, Row, Col } from 'element-ui'

Vue.use(ElementUI)
/* Vue.use(Button)
Vue.use(Row)
Vue.use(Col) */
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
