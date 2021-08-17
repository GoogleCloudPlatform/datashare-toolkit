/**
 * Copyright 2020-2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import config from './config';

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
      requiresDataProducer: true,
      requiresMarketplaceIntegration: true
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
      requiresAuth: true,
      requiresMarketplaceIntegration: true
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
    path: '/topics',
    name: 'topics',
    component: 'Topics',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true
    }
  },
  {
    path: '/buckets',
    name: 'buckets',
    component: 'Buckets',
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
  } else if (
    to.matched.some(record => record.meta.requiresMarketplaceIntegration) &&
    config.marketplaceIntegrationEnabled === false
  ) {
    next({ path: '/restricted' });
    return;
  } else if (to.matched.some(record => record.meta.requiresDataProducer)) {
    if (store.getters.isLoggedIn && store.getters.isDataProducer) {
      next();
      return;
    } else {
      next({ path: '/restricted' });
      return;
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    } else if (to.name === 'myProducts' || to.name === 'activation') {
      next();
      return;
    } else {
      next({ path: '/restricted' });
      return;
    }
  } else {
    next();
    return;
  }
});

export default router;
