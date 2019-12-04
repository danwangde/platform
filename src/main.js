import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import './mock/mockServer'
import 'font-awesome/css/font-awesome.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from './utils/utils'
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  if (!getToken('Token')) {
    if (whiteList.indexOf(to.path) !== -1) {
      // 点击退出时,会定位到这里
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
const filters = {
  dateFormat (dataStr) {
    var dt = new Date(dataStr)
    // yyyy-mm-dd
    let y = dt.getFullYear()
    let m = dt.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = dt.getDate()
    d = d < 10 ? '0' + d : d
    let hh = dt.getHours()
    hh = hh < 10 ? '0' + hh : hh
    let mm = dt.getMinutes()
    mm = mm < 10 ? '0' + mm : mm
    let ss = dt.getSeconds()
    ss = ss < 10 ? '0' + ss : ss

    return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss
  },
  dateYY (dataStr) {
    var dt = new Date(dataStr)
    // yyyy-mm-dd
    let y = dt.getFullYear()
    let m = dt.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = dt.getDate()
    d = d < 10 ? '0' + d : d
    let hh = dt.getHours()
    hh = hh < 10 ? '0' + hh : hh
    let mm = dt.getMinutes()
    mm = mm < 10 ? '0' + mm : mm
    let ss = dt.getSeconds()
    ss = ss < 10 ? '0' + ss : ss

    return y + '-' + m + '-' + d
  },
  dateHH (dataStr) {
    var dt = new Date(dataStr)
    // yyyy-mm-dd
    let y = dt.getFullYear()
    let m = dt.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = dt.getDate()
    d = d < 10 ? '0' + d : d
    let hh = dt.getHours()
    hh = hh < 10 ? '0' + hh : hh
    let mm = dt.getMinutes()
    mm = mm < 10 ? '0' + mm : mm
    let ss = dt.getSeconds()
    ss = ss < 10 ? '0' + ss : ss

    return hh + ':' + mm + ':' + ss
  }
}
for (let key in filters) {
  Vue.filter(key, filters[key])
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
