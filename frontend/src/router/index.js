import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home'
// import About from '../views/About'

Vue.use(VueRouter);

const routes = [
  {
    path: '/mail',
    component: () => import('@/views/Mail')
  },
  {
    path: '/upload',
    component: () => import('@/views/Upload')
  },
  {
    path: '/show-pdf',
    component: () => import('@/views/ShowPdf')
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "AdminHome" */ "../views/admin/Layout"),
    children: [
      {
        path: "/",
        name:"admin_home",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Home")
      },
      {
        path: "post",
        name: "post_di_admin",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Post")
      },
      {
        path: "users",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Users")
      },
      {
        path: "setting",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Setting")
      }
    ]
  },
  {
    path: "*",
    component: () => import(/*webpackChunkName: "404" */ "../views/404")
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login')
  },
  {
    path: "/",
    name: "home",
    // component: Home          //normal
    component: () => import("../views/Home")
  },
  {
    path: "/about",
    name: "about",
    // component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    const auth = Cookies.get('auth')

    if (!auth) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
