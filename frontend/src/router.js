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
    path: '/myProducts',
    name: 'myProducts',
    component: 'MyProducts',
    meta: {
      requiresAuth: true
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
  },
  {
    path: '/404',
    name: '404',
    component: '404'
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
  if (to.matched.length === 0) {
    next({ path: '/404' });
    return;
  }
  if (to.matched.some(record => record.meta.requiresDataProducer)) {
    if (store.getters.isLoggedIn && store.getters.isDataProducer) {
      next();
      return;
    } else {
      router.replace('/restricted');
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    } else if (to.name === 'myProducts' || to.name === 'activation') {
      next();
      return;
    } else {
      router.replace('/restricted');
    }
  } else {
    next();
  }
});

export default router;
