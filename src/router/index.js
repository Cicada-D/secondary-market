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
router.beforeEach(async (to ) => {
  // console.log(LoginOrNot())
  // console.log(to)
  if ( to.name !== 'login' && to.name !== 'home'){
    if (LoginOrNot()){
      console.log(1)

    }else {
      console.log(2)
      return {name: 'home'}
    }
  }else{
    console.log(3)

  }
})
function LoginOrNot(){
  if(localStorage.getItem('token') == 1){
    return 1
  }else {
    return 0
  }
}
export default router
