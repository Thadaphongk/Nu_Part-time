import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register'
import Login from './views/Login'
import Registerowner from './views/Registeronwer'
import Loginowner from './views/Loginonwer'
import Pagejob from './views/Pagejob'
import jobdetail from './views/jobdetail'
import jobhistory from './views/job/jobhistory'
import JobList from './views/job/jobList'
import JobForm from './views/job/jobForm'
import ApplyJobList from './views/apply/ApplyJobList'
import ApplyHistoryList from './views/apply/ApplyHistoryList'
import ApplyManageList from './views/apply/ApplyManageList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
   
  
  
    // For ower
    { path: '/job', name: 'job-list', component: JobList, meta: {outh: ['owner'] } },
   { path: '/job/form', name: 'job-form', component: JobForm, meta: { outh: ['owner'] } },
   {path: '/Apply/manage', name: 'apply-manage', component: ApplyManageList, meta: {outh: ['owner'] } },
   { path: '/jobhistory', name: 'jobhistory', component: jobhistory,meta: {outh: ['owner'] } },
   
   // For user
   { path: '/Apply/job', name: 'apply-job', component: ApplyJobList, meta: { auth: true } },
   { path: '/Apply/history', name: 'apply-history', component:ApplyHistoryList, meta: { auth: true } },
   

//for user not login
{ path: '/Pagejob', name: 'Pagejob', component: Pagejob },
{ path: '/jobdetail/:itemId', name: 'jobdetail',component: jobdetail },





// For login
   { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/registerowner', name: 'registerowner', component: Registerowner },
    { path: '/loginowner', name: 'loginowner', component: Loginowner },
    
    
  ]
})

// ตรวจสอบสิทธิ์การเข้าถึงหน้า ผู้หางาน
router.beforeEach((to, from, next) => {
  const auth = to.meta.auth;
  if (!auth) return next();
  router.app.$store.dispatch('get_user_login')
    .then(() => {
      if (!Array.isArray(auth)) return next();
      const userLogin = router.app.$store.state.user;
      if (auth.indexOf(userLogin.u_role) >= 0) return next();
    })
    .catch(() => next({ name: 'Pagejob' }));
})



// ตรวจสอบสิทธิ์การเข้าถึงหน้า เจ้าของร้าน
router.beforeEach((to, from, next) => {
  const outh = to.meta.outh;
  if (!outh) return next();
  router.app.$store.dispatch('get_owner_login')
    .then(() => {
      if (!Array.isArray(outh)) return next();
      const ownerLogin = router.app.$store.state.owner;
      if (outh.indexOf(ownerLogin.o_role) >= 0) return next();
    })
    .catch(() => next({ name: 'Pagejob' }));
})


export default router;