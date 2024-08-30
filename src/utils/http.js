import axios from 'axios'
import cookie from 'js-cookie'

import { userStore } from '../stores/user'
import { ElMessage } from 'element-plus'

import { createPinia } from 'pinia'
export const pinia = createPinia()

const userInfo = userStore(pinia)

const http = axios.create({
    baseURL: 'https://flood.axtl.cn:520/api',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer yourToken'
    }
})

http.interceptors.request.use(config => {
    const token = cookie.get('X-Floodguard-Token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}` // 将 Token 添加到请求头
    }
    return config
}, error => {
    return Promise.reject(error)
})

http.interceptors.response.use(response => {
    const newToken = response.headers['x-floodguard-token']
    if (newToken) {
        cookie.set('X-Floodguard-Token',newToken)
    }
    return response
}, error => {
    if (error.response.status===401) {
        console.log('gg')
        cookie.remove('X-Floodguard-Token')
        ElMessage({
            message: error.response.data.msg,
            type: 'error',
            plain: true,
        })
        userInfo.logOut()
        // Vue.prototype.$Message.error(error.response.data.msg)
    }else{
        return Promise.reject(error)
    }
})

export default http