import axios from 'axios'
import {domain} from '@/config'
import storage from './storage'

axios.defaults.withCredentials = true

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const instance = axios.create({
    baseURL: 'http://192.168.3.60:9998/index.php/home'
})

// instance.defaults.headers['Content-Type'] = 'application/json'

instance.interceptors.request.use(
    config => {
        console.log('设置头部')
        console.log(config)
        // config.headers['Content-Type'] = 'application/json'
        config.headers['X-Token'] = storage.get('accessToken')
        // console.log('请求')
        // let token = storage.get('accessToken')
        // if (token) {
        //     console.log('有' + token)
        //     config.headers['Content-Type'] = 'application/json'
        //     config.headers.Authorization = token
        // }
        // return config
        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        return config
    },
    err => {
        console.log('错误')
        return Promise.reject(err)
    })
//
// instance.interceptors.response.use(
//     response => {
//         console.log('响应')
//         console.log(response.data)
//         return response
//     },
//     error => {
//         console.log('错误')
//         // if (error.response) {
//         //     switch (error.response.status) {
//         //         case 401: // 旌旗  灵医 , 只用[授权] 旌旗的医生 才是 灵医
//         //
//         //             // 返回 401 清除token信息并跳转到登录页面
//         //             store.commit(types.LOGOUT)
//         //             router.replace({
//         //                 path: 'login',
//         //                 query: {redirect: router.currentRoute.fullPath}
//         //             })
//         //     }
//         // }
//         return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//     })
//
instance.interceptors.response.use(function (response) {
// 对响应数据做点什么
    return response;
}, function (err) {
    if (err && err.response) {
        console.log(err.response.data.message)
        // alert(err.response.data.message)
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
        err.message = '连接服务器失败!'
    }
    storage.set('requestError', err.message)
    console.log(err.message)
    return Promise.reject(err);
});

export default instance
