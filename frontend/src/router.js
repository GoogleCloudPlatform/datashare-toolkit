import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

const routerOptions = [
  {
    path: '/',
    name: 'home',
    component: 'Home'
  },
  {
    path: '/restricted',
    name: 'restricted',
    component: 'Restricted'
  },
  {
    path: '/config',
    name: 'config',
    component: 'Config',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/datasets',
    name: 'datasets',
    component: 'Datasets',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/views',
    name: 'views',
    component: 'Views',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/ingestion',
    name: 'ingestion',
    component: 'Ingestion',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: 'Accounts',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/editView',
    name: 'editView',
    component: 'EditView',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/editIngestion',
    name: 'editIngestion',
    component: 'EditIngestion',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/editAccount',
    name: 'editAccount',
    component: 'EditAccount',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/policies',
    name: 'policies',
    component: 'Policies',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/editPolicy',
    name: 'editPolicy',
    component: 'EditPolicy',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/procurements',
    name: 'procurements',
    component: 'Procurements',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/activation',
    name: 'activation',
    component: 'Activation',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/myDashboard',
    name: 'myDashboard',
    component: 'MyDashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/spotFulfillment',
    name: 'spotFulfillment',
    component: 'SpotFulfillment',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: 'Admin',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  }
];

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.component}.vue`)
  };
});

Vue.use(Router);

let router = new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
});

// https://github.com/christiannwamba/vuex-auth-jwt/blob/master/src/router.js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    // Redirect to login page: next('/login')
    // For now putting next() to avoid issue because we're not persisting auth properly.
    next();
  } else {
    next();
  }
});

export default router;
