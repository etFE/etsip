import axios from 'axios'
import qs from 'qs'
import { notification, message } from 'antd'
import { routerRedux } from 'dva/router'
import store from '../index'

const isDevelopment = process.env.NODE_ENV === 'development'
const devBaseUrl = 'http://localhost:3000/etsip'
const prodBaseUrl = '/etsip'

// 实例化axios
const instance = axios.create({
    baseURL: isDevelopment ? devBaseUrl : prodBaseUrl,
    timeout: 100000,
})

// 请求拦截器 可以用于token
instance.interceptors.request.use((config) => {
    if (config.data && typeof config.data === 'object') {
        config.data = qs.stringify(config.data)
    }

    return config
}, error => {
    notification.error({
        message: '参数错误？',
        description: error,
    })
    Promise.reject(error)
})

// 响应拦截器 用于请求失败时，拦截触发错误通知？
instance.interceptors.response.use((res) => {
    if (res.data.ok === false || res.data.error) {
        message.error(res.data.msg || '操作失败')
    }
    return res.data
}, (error) => {
    message.error(`${error.response.status} ${error.response.statusText}`)
    Promise.reject(error)
})

const createAPI = (url, method, config) => {
    const cfg = config || {}
    return instance({
        url,
        method,
        ...cfg,
    })
}

export default createAPI
