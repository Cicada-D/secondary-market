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
    component: () => import('../pages/type/index.vue'),
    children: [
      {
        path: 'clothing',
        name: 'clothing',
        component: () => import('../pages/type/content/clothing.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../pages/type/content/cart.vue')
      },
      {
        path: 'digitalEquipment',
        name: 'digitalEquipment',
        component: () => import('../pages/type/content/digitalEquipment.vue')
      },
      {
        path: 'other',
        name: 'other',
        component: () => import('../pages/type/content/other.vue')
      },
    ]
  },
  {
    path: '/index/order',
    name: 'order',
    redirect: '/index/order/allorder',
    component: () => import('../pages/orderForm/index.vue'),
    children: [
      {
        path: 'allorder',
        name: 'allorder',
        component: () => import('../pages/orderForm/content/allOrder.vue')
      },
      {
        path: 'salePending',
        name: 'salePending',
        component: () => import('../pages/orderForm/content/salePending.vue')
      },
      {
        path: 'pushGoods',
        name: 'pushGoods',
        component: () => import('../pages/orderForm/content/pushGoods.vue')
      },
      {
        path: 'completeOrder',
        name: 'completeOrder',
        component: () => import('../pages/orderForm/content/completeOrder.vue')
      },
      {
        path: 'unfiledOrder',
        name: 'unfiledOrder',
        component: () => import('../pages/orderForm/content/unfiledOrder.vue')
      }
    ]
  },
  {
    path: '/index/goodsDetail/:gid',
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
    component: () => import('../pages/shoppingCart/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'errorPage',
    component: () => import('../pages/errorPage.vue')
  }
]
export default routes
