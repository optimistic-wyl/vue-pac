// import Vue from 'vue'
// import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// // import { Button, Row, Col } from 'element-ui'

// Vue.use(ElementUI)
// /* Vue.use(Button)
// Vue.use(Row)
// Vue.use(Col) */
// Vue.config.productionTip = false

// const v = new Vue({
//   render: h => h(App),
// }).$mount('#app')

// console.log(v.$options.render)

import Vue from "vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import { Button, Row, Col } from 'element-ui'
import App from "./App.vue";
import { createRouter } from "./router";
// 导出Vue实例⼯⼚函数，为每次请求创建独⽴实例
// 上下⽂⽤于给vue实例传递参数
export function createApp(context) {
  const router = createRouter();
  Vue.use(ElementUI)
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  });
  return { app, router };
}