import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// 导入组件库
import midi_bpmn from './../packages/index'
// 注册组件库
Vue.use(midi_bpmn)

Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
