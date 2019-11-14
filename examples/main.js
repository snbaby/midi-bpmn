import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 导入组件库
import midi_bpmn from './../packages/index'
// 注册组件库
Vue.use(midi_bpmn)
Vue.use(Antd);

Vue.config.productionTip = false



const service = axios.create({
    // baseURL: '/api', // api base_url
    timeout: 20000 // 请求超时时间
})

// response interceptor
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

Vue.prototype.axios = service

new Vue({
  render: h => h(App),
}).$mount('#app')
