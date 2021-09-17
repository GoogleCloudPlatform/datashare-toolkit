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
import underscore from 'underscore';

import {
  mdiAccountMultiple,
  mdiBadgeAccount,
  mdiBriefcaseAccount,
  mdiBucketOutline,
  mdiDatabase,
  mdiDog,
  mdiShieldKey,
  mdiShopping,
  mdiViewDashboardOutline,
  mdiViewGrid
} from '@mdi/js';

const routerOptions = [
  {
    path: '/',
    name: 'dashboard',
    component: 'Dashboard',
    meta: {
      icon: mdiViewDashboardOutline,
      title: 'Dashboard',
      menu: {
        order: 1
      }
    }
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
      title: 'Datasets',
      menu: {
        order: 2,
        section: 'Channels'
      },
      dashboard: {
        description:
          'Datasets are top-level containers that are used to organize and control access to your tables and views.',
        order: 1,
        iconColor: 'light-blue'
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
      title: 'Authorized Views',
      menu: {
        order: 3
      },
      dashboard: {
        description:
          'An authorized view lets you share query results with particular users and groups without giving them access to the underlying tables.',
        order: 2,
        iconColor: 'light-blue'
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
      title: 'Pub/Sub Topics',
      menu: {
        order: 4
      },
      dashboard: {
        description:
          'A named resource to which messages are sent by publishers.',
        order: 3,
        iconColor: 'light-blue'
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
      title: 'Storage Buckets',
      menu: {
        order: 5
      },
      dashboard: {
        description:
          'The Buckets resource represents a bucket in Cloud Storage.',
        order: 4,
        iconColor: 'light-blue'
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
      title: 'Accounts',
      menu: {
        order: 6,
        section: 'Entitlements'
      },
      dashboard: {
        description:
          'Managed accounts that are provisioned access to GCP resources through Datashare policies.',
        order: 5,
        iconColor: 'red lighten-1'
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
      title: 'Policies',
      menu: {
        order: 7
      },
      dashboard: {
        description:
          'Policies allow data publishers to manage groupings of Datasets/Tables/PubSub Topics/Cloud Storage Buckets.',
        order: 6,
        iconColor: 'red lighten-1'
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
      title: 'Procurements',
      menu: {
        order: 8,
        section: 'Marketplace'
      },
      dashboard: {
        description:
          'Manage procurements purchased through the GCP Marketplace.',
        order: 7,
        iconColor: 'green lighten-1'
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
      title: 'My Products',
      menu: {
        order: 9
      },
      dashboard: {
        description:
          'View Datashare products that you have purchased through GCP Marketplace.',
        order: 8,
        iconColor: 'green lighten-1'
      }
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: 'Admin',
    meta: {
      requiresAuth: true,
      requiresDataProducer: true,
      icon: mdiShieldKey,
      title: 'Admin',
      menu: {
        order: 10,
        section: 'Application',
        subheader: 'Admin'
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

Router.prototype.userNavigableRoutes = function() {
  let routes = this.options.routes;
  let list = routes.filter(route => {
    if (route.meta) {
      if (
        route.meta.requiresMarketplaceIntegration === true &&
        config.marketplaceIntegrationEnabled === false
      ) {
        return false;
      }
      return this.canAccessRoute(route.name);
    }
    return false;
  });
  return list;
};

Router.prototype.userMenuItems = function() {
  let filtered = this.userNavigableRoutes().filter(route => {
    return route.meta && route.meta.menu && route.meta.menu.order;
  });
  let sorted = underscore.sortBy(filtered, function(route) {
    return route.meta.menu.order;
  });
  let items = sorted.map(route => {
    return {
      name: route.name,
      title: route.meta.menu.title || route.meta.title,
      icon: route.meta.icon,
      section: route.meta.menu.section,
      subheader: route.meta.menu.subheader
    };
  });
  return items;
};

Router.prototype.userDashboardCards = function() {
  let routes = this.userNavigableRoutes();
  let filtered = routes.filter(route => {
    return route.meta && route.meta.dashboard && route.meta.dashboard.order;
  });
  let sorted = underscore.sortBy(filtered, function(route) {
    return route.meta.dashboard.order;
  });
  let items = sorted.map(route => {
    return {
      title: route.meta.dashboard.title || route.meta.title,
      icon: route.meta.icon,
      iconColor: route.meta.dashboard.iconColor,
      name: route.name,
      description: route.meta.dashboard.description
    };
  });
  return items;
};

export default router;
