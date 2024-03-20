import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // children: [
    //   // 默认二级路由 车辆密度点云图
    //   {
    //     path: '',
    //     name: "pointCloud",
    //     component: () => import('../components/maps/PointCloudMap.vue'),
    //   },
    //   // 连接线
    //   {
    //     path: '/link',
    //     name: 'link',
    //     component: () => import('../components/maps/LinkMap.vue'),
    //   },
    //   // 多边形区域划片
    //   {
    //     path: '/polygon',
    //     name: 'polygon',
    //     component: () => import('../components/maps/PolygonMap.vue'),
    //   },
    // ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
