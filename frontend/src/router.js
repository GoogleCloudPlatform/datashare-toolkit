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

import {
  mdiAccountMultiple,
  mdiBadgeAccount,
  mdiBriefcaseAccount,
  mdiBucketOutline,
  mdiDatabase,
  mdiDog,
  mdiLifebuoy,
  mdiShopping,
  mdiViewGrid
} from '@mdi/js';

const routerOptions = [
  {
    path: '/',
    name: 'dashboard',
    component: 'Dashboard'
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
      requiresDataProducer: true,
      icon: mdiDatabase,
      dashboard: {
        title: 'Datasets',
        description:
          'Datasets are top-level containers that are used to organize and control access to your tables and views.',
        enabled: true,
        order: 1
      }
    }
  },
  {
    path: '/views',
    name: 'views',
    component: 'Views',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true,
      icon: mdiViewGrid,
      dashboard: {
        title: 'Authorized Views',
        description:
          'An authorized view lets you share query results with particular users and groups without giving them access to the underlying tables.',
        enabled: true,
        order: 2
      }
    }
  },
  {
    path: '/topics',
    name: 'topics',
    component: 'Topics',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true,
      icon: mdiDog,
      dashboard: {
        title: 'Pub/Sub Topics',
        description:
          'A named resource to which messages are sent by publishers.',
        enabled: true,
        order: 3
      }
    }
  },
  {
    path: '/buckets',
    name: 'buckets',
    component: 'Buckets',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true,
      icon: mdiBucketOutline,
      dashboard: {
        title: 'Storage Buckets',
        description:
          'The Buckets resource represents a bucket in Cloud Storage.',
        enabled: true,
        order: 4
      }
    }
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: 'Accounts',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true,
      icon: mdiAccountMultiple,
      dashboard: {
        title: 'Accounts',
        description:
          'Managed accounts that are provisioned access to GCP resources through Datashare policies.',
        enabled: true,
        order: 5
      }
    }
  },
  {
    path: '/policies',
    name: 'policies',
    component: 'Policies',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true,
      icon: mdiBadgeAccount,
      dashboard: {
        title: 'Policies',
        description:
          'Policies allow data publishers to manage groupings of Datasets/Tables/PubSub Topics/Cloud Storage Buckets.',
        enabled: true,
        order: 6
      }
    }
  },
  {
    path: '/procurements',
    name: 'procurements',
    component: 'Procurements',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true,
      requiresMarketplaceIntegration: true,
      icon: mdiShopping,
      dashboard: {
        title: 'Procurement Requests',
        description:
          'Manage procurements purchased through the GCP Marketplace.',
        enabled: true,
        order: 7
      }
    }
  },
  {
    path: '/myProducts',
    name: 'myProducts',
    component: 'MyProducts',
    meta: {
      requiresAuth: true,
      requiresMarketplaceIntegration: true,
      icon: mdiBriefcaseAccount,
      dashboard: {
        title: 'My Products',
        description:
          'View Datashare products that you have purchased through GCP Marketplace.',
        enabled: true,
        order: 8
      }
    }
  },
  {
    path: '/links',
    name: 'links',
    component: 'Links',
    meta: {
      icon: mdiLifebuoy,
      dashboard: {
        title: 'Links',
        description: 'Find helpful Datashare links.',
        enabled: true,
        order: 9
      }
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
    path: '/editPolicy',
    name: 'editPolicy',
    component: 'EditPolicy',
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

Router.prototype.canAccessRoute = function(name) {
  let routes = this.options.routes;
  let route = routes.filter(item => {
    if (name === item.name) {
      return true;
    }
  });
  if (route === undefined || route.length === 0) {
    return true;
  } else if (route[0].meta && route[0].meta.requiresAuth === true) {
    if (route[0].meta.requiresDataProducer === true) {
      return store.getters.isLoggedIn && store.getters.isDataProducer;
    } else {
      return store.getters.isLoggedIn;
    }
  } else {
    return true;
  }
};

export default router;
