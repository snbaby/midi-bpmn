import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '@/router'
import systemConfig from '@/config/systemConfig.js'

// 创建 axios 实例
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

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }
