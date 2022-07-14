import axios from 'axios'
// import Element from 'element-ui'
// import router from './router'
// import store from './store'

axios.defaults.baseURL = 'http://10.1.79.81:2022'
// axios.defaults.baseURL = 'http://localhost:2022'

// 设置前置拦截
// axios.interceptors.request.use(config => {
//     return config
// })
//
// axios.interceptors.response.use(response => {
//         let res = response.data
//
//         console.log("==============")
//         console.log(res)
//         console.log("==============")
//
//         if (res.code === 200) {
//             return response
//         } else {
//             Element.Message.error('登录失败', {duration: 1 * 1000})
//
//             return Promise.reject(reponse.data.msg)
//         }
//     },
//     error => {
//
//         if (error.response.data){
//             error.message = error.response.data.msg
//         }
//         if (error.response.status == 401) {
//             store.commit("REMOVE_INFO")
//             router.push("/login")
//         }
//         Element.Message.error(error.message)
//         return Promise.reject(error)
//     })
