import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'font-awesome/css/font-awesome.css'

Vue.prototype.$http = axios
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading:'./assets/load.gif'
})
Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'main',
    },
    {
      path:'/main',
      name:"main",
      component: (resolve) => require(['../components/main/main.vue'], resolve),

    },
    {
      path: '/classfliy',
      name: '漫画分类',
      component: (resolve) => require(['../beas/classfily/classfily.vue'], resolve),
    },
    {
      path: '/newday',
      name: '今日更新',
      component: (resolve) => require(['../components/newday/newday.vue'], resolve),
    },
    {
      path: '/closed',
      name: '完结作品',
      component: (resolve) => require(['../components/closed/closed.vue'], resolve),
    },
    {
      path: '/view',
      name: '搜索结果',
      component: (resolve) => require(['../beas/view/view.vue'], resolve),
    },
    {
      path: '/detail',
      name: '漫画详情',
      component: (resolve) => require(['../components/detail/detail.vue'], resolve),
    },
    {
      path: '/detailCont',
      name: '漫画详情',
      component: (resolve) => require(['../components/detailCont/cont.vue'], resolve),
    }
  ]
})
