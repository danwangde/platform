import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login = () => import('../pages/Login/Login')
const Facility = () => import('../pages/Many/Facility/Facility')
const Admin = () => import('../pages/Many/Account/Account')
const Chart = () => import('../pages/index')
const Many = () => import('../components/many/layout')
const Single = () => import('../components/single/layout')
export default new Router({
 /* mode: 'history', // 去掉url中的#*/
  routes: [
    {
      path: '/login',
      name: 'Login',
      rName: '登录',
      component: Login
    },
    {
      path: '/map',
      name: 'map',
      rName: '地图',
      component: () => import ('@/pages/Map/Map1')
    },
    {
      path: '/scroll',
      name: 'scroll',
      rName: '滚动',
      component: () => import ('@/pages/Map/scroll')
    },
    {
      path: '/pic',
      name: 'pic',
      rName: '抓拍',
      component: () => import ('@/pages/Map/Picture')
    },
    {
      path: '/more',
      name: 'More',
      rName: '多项目首页',
      component: () => import('@/pages/MoreProject/MoreProject')
    },
    {
      path: '/only',
      name: 'Only',
      rName: '单项目首页',
      component: () => import('@/pages/OnlyProject/OnlyProject')
    },
    {
      path: '/',
      redirect: '/login'
    },
    /*{
      path: '/single',
      name: 'single',
      rName: '测试',
      component: Single,
      redirect: '/single/trend',
      children: [
        {
          path: '/single/trend',
          name: 'trend',
          rName: '数据趋势',
          component: () => import ('@/pages/single/Trend/Trend')
        },
        {
          path: '/single/detail',
          name: 'detail',
          rName: '报警详情',
          component: () => import ('@/pages/single/Alarm/Detail')
        },
        {
          path: '/single/threshold',
          name: 'threshold',
          rName: '阈值配置',
          component: () => import ('@/pages/single/Alarm/Threshold')
        },
        {
          path: '/single/push',
          name: 'push',
          rName: '报警推送',
          component: () => import ('@/pages/single/Alarm/Push')
        },
        {
          path: '/single/video',
          name: 'video',
          rName: '视频中心',
          component: () => import ('@/pages/single/Video/Video')
        },
        {
          path: '/single/relevance',
          name: 'relevance',
          rName: '关联性分析',
          component: () => import ('@/pages/single/Data/relevance')
        },
        {
          path: '/single/vibration',
          name: 'vibration',
          rName: '振动分析',
          component: () => import ('@/pages/single/Data/Vibration')
        },
        {
          path: '/single/temperature',
          name: 'temperature',
          rName: '温度效应',
          component: () => import ('@/pages/single/Data/Temperature')
        },
        {
          path: '/single/vehicle',
          name: 'vehicle',
          rName: '车流量统计',
          component: () => import ('@/pages/single/Data/Vehicle')
        },
        {
          path: '/single/more',
          name: 'more',
          rName: '更多',
          component: () => import ('@/pages/single/Data/more')
        },
        {
          path: '/single/reports',
          name: 'reports',
          rName: '报表管理',
          component: () => import ('@/pages/single/Reports/Reports')
        },
        {
          path: '/single/config',
          name: 'config',
          rName: '配置管理',
          component: () => import ('@/pages/single/Config/Config')
        },
        {
          path: '/single/inspection',
          name: 'inspection',
          rName: '智能巡检',
          component: () => import ('@/pages/single/Inspection/Inspection')
        }
      ]
    },*/
    {
      path: '/many',
      name: 'many',
      rName: '配置中心',
      component: Many,
      redirect: '/many/admin',
      children: [
        {
          path: '/many/admin',
          name: 'admin',
          rName: '用户管理',
          component: Admin,
          meta: {
            title: '测试'
          }
        },
        {
          path: '/many/config',
          name: 'config',
          rName: '项目配置',
          component: Facility
        },
        {
          path: '/many/journal',
          name: 'journal',
          rName: '日志管理',
          component: () => import('@/pages/Many/Dialog/Dialog')
        },
        {
          path: '/many/base',
          name: 'base',
          rName: '基础库管理',
          component: () => import('@/pages/Many/Base/Base')
        },
        {
          path: '/many/download',
          name: 'download',
          rName: '下载管理',
          component: () => import('@/pages/Many/Download/Download')
        },
        {
          path: '/many/chart',
          name: 'chart',
          rName: '数据趋势/选项2',
          component: Chart
        },
        {
          path: '/many/data',
          name: 'data',
          rName: '数据',
          component: () => import('@/pages/Data/Data')
        },
        {
          path: '/many/health',
          name: 'health',
          rName: '健康监测',
          component: () => import('@/pages/Many/Health/Health'),
          redirect: '/many/health/trend',
          children: [
            {
              path: '/many/health/trend',
              name: 'trend',
              rName: '数据趋势',
              component: () => import ('@/pages/single/Trend/Trend')
            },
            {
              path: '/many/health/detail',
              name: 'detail',
              rName: '报警详情',
              component: () => import ('@/pages/single/Alarm/Detail')
            },
            {
              path: '/many/health/threshold',
              name: 'threshold',
              rName: '阈值配置',
              component: () => import ('@/pages/single/Alarm/Threshold')
            },
            {
              path: '/many/health/push',
              name: 'push',
              rName: '报警推送',
              component: () => import ('@/pages/single/Alarm/Push')
            },
            {
              path: '/many/health/video',
              name: 'video',
              rName: '视频中心',
              component: () => import ('@/pages/single/Video/Video')
            },
            {
              path: '/many/health/relevance',
              name: 'relevance',
              rName: '关联性分析',
              component: () => import ('@/pages/single/Data/relevance')
            },
            {
              path: '/many/health/vibration',
              name: 'vibration',
              rName: '振动分析',
              component: () => import ('@/pages/single/Data/Vibration')
            },
            {
              path: '/many/health/temperature',
              name: 'temperature',
              rName: '温度效应',
              component: () => import ('@/pages/single/Data/Temperature')
            },
            {
              path: '/many/health/vehicle',
              name: 'vehicle',
              rName: '车流量统计',
              component: () => import ('@/pages/single/Data/Vehicle')
            },
            {
              path: '/many/health/more',
              name: 'more',
              rName: '更多',
              component: () => import ('@/pages/single/Data/more')
            },
            {
              path: '/many/health/reports',
              name: 'reports',
              rName: '报表管理',
              component: () => import ('@/pages/single/Reports/Reports')
            },
            {
              path: '/many/health/config',
              name: 'config',
              rName: '配置管理',
              component: () => import ('@/pages/single/Config/Config')
            },
            {
              path: '/many/health/inspection',
              name: 'inspection',
              rName: '智能巡检',
              component: () => import ('@/pages/single/Inspection/Inspection')
            }
          ]
        }
      ]
    }
  ]
})
