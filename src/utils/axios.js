import axios from 'axios'
import {Toast} from "vant"
import router from "../router";

//设置axios请求地址
axios.defaults.baseURL = process.env.NODE_ENV === 'development'? 'http://localhost:8899/he_ma_api' : 'http://www.hema.sale:8899/he_ma_api'
//跨域请求是否携带cookie
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
//设置请求头(携带token)
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
//post请求时发送JSON形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'
//请求拦截器,拦截请求处理数据
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object'){
        Toast.fail('服务器端异常!')
        return Promise.reject(res)
    }
    if (res.data.resultCode != 200){
        if (res.data.message){
            Toast.fail(res.data.message)
        }
        //用户未登录，跳转到登录页面
        if (res.data.resultCode == 416){
            router.push({path: '/login'})
        }
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios