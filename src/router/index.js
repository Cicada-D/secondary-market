import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(async (to) => {
  if (to.name !== 'login' && to.name !== 'home') {
    if (LoginOrNot()) {
      if (to.name == 'pushGoods') {
        if (sellerOrNot()) {
          console.log(4)
        } else {
          return {name: 'salePending', query:{changeToken: 1}}
        }
      } 
    } else {
      console.log(2)
      return { name: 'home' }
    }
  } else {
    console.log(3)
  }
})
function LoginOrNot() {
  if (localStorage.getItem('token') == 1 || localStorage.getItem('token') == 2) {
    return 1
  } else {
    return 0
  }
}

function sellerOrNot() {
  if (localStorage.getItem('token') == 2) return 1
  else return 0
}
export default router
