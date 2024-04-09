const routes = [
  {
    path: '/',
    name: 'start',
    component: () => {},
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../pages/index.vue'),
    redirect: '/index/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../pages/home/index.vue')
      }
    ]
  },
  {
    path: '/index/type',
    name: 'type',
    component: () => import('../pages/type/index.vue')
  },
  {
    path: '/index/orderDetail',
    name: 'orderDetail',
    component: () => import('../pages/orderForm/content/orderDetail.vue')
  },
  {
    path: '/index/orderCreate',
    name: 'orderCreate',
    component: () => import('../pages/orderForm/content/orderCreate.vue')
  },
  {
    path: '/index/shoppingCart',
    name: 'shoppingCart',
    component: () => import('../pages/shoppingCart/content/text.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'errorPage',
    component: () => import('../pages/errorPage.vue')
  }
]
export default routes
