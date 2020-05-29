<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped temporary fixed>
      <v-list dense>
        <template v-for="(item, index) in navigationItems">
          <v-divider
            v-if="index > 0 && item.section"
            :key="'divider' + index"
          ></v-divider>
          <v-subheader v-if="item.section" :key="'subheader' + index">{{
            item.section.toUpperCase()
          }}</v-subheader>
          <!-- child menus -->
          <v-list-group prepend-icon="list" :key="index" v-if="item.children">
            <v-list-item slot="activator" :to="{ name: item.name }">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(child, idx) in item.children"
              :to="{ name: child.name }"
              :key="idx"
              class="pl-8"
            >
              <v-list-item-action>
                <v-icon v-html="child.icon"></v-icon>
              </v-list-item-action>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- parent menus -->
          <v-list-item :to="{ name: item.name }" :key="index" v-else>
            <v-list-item-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar height="48" color="#1876D2" clipped-left dark app>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <!-- Full: drawer = !drawer -->
          <!-- Mini: mini = !mini -->
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" dark v-on="on">
          </v-app-bar-nav-icon>
        </template>
        <span>Navigation menu</span>
      </v-tooltip>
      <v-toolbar-title>{{ toolbar.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            dark
            v-on="on"
            href="https://github.com/GoogleCloudPlatform/datashare-toolkit"
            target="_blank"
          >
            <v-icon>{{ icons.helpCircle }}</v-icon>
          </v-btn>
        </template>
        <span>Help</span>
      </v-tooltip>
      <!--
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <v-icon>{{ icons.bell }}</v-icon>
          </v-btn>
        </template>
        <span>Notifications</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <v-icon>{{ icons.verticalDots }}</v-icon>
          </v-btn>
        </template>
        <span>More items</span>
      </v-tooltip>
-->
      <v-tooltip bottom v-if="!user.loggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon @click.prevent="signIn" dark v-on="on">
            <v-icon title="login">{{ icons.login }}</v-icon>
          </v-btn>
        </template>
        <span>Login</span>
      </v-tooltip>
      <v-tooltip bottom v-if="user.loggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon @click.prevent="signOut" dark v-on="on">
            <v-icon title="login">{{ icons.logout }}</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
      <v-avatar v-if="user.loggedIn" size="28">
        <img
          v-if="user && user.data && user.data.photoURL"
          :src="user.data.photoURL"
          :alt="user.data.displayName"
        />
      </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
import {
  mdiAccountCircle,
  mdiBell,
  mdiDatabase,
  mdiDotsVertical,
  mdiHelpCircle,
  mdiLogin,
  mdiLogout,
  mdiAccountMultiple,
  mdiHome,
  mdiCog,
  mdiViewGrid,
  mdiApplicationImport,
  mdiHubspot,
  mdiBookOpen,
  mdiBadgeAccount,
  mdiPoliceBadge,
  mdiAccount,
  mdiShieldKey
} from '@mdi/js';

const firebase = require('firebase');
import { mapGetters } from 'vuex';

export default {
  name: 'app-header',
  data: () => ({
    drawer: false,
    mini: true,
    icons: {
      accountCircle: mdiAccountCircle,
      accountMultiple: mdiAccountMultiple,
      bell: mdiBell,
      database: mdiDatabase,
      import: mdiApplicationImport,
      helpCircle: mdiHelpCircle,
      home: mdiHome,
      hubSpot: mdiHubspot,
      settings: mdiCog,
      verticalDots: mdiDotsVertical,
      viewGrid: mdiViewGrid,
      login: mdiLogin,
      logout: mdiLogout,
      shieldKey: mdiShieldKey
    },
    toolbar: {
      title: 'Datashare'
    }
  }),
  mounted() {
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // console.log(`Token: ${token}`);
          // this.$router.replace({ name: 'Welcome' });
        }
        // The signed-in user info.
        // var user = result.user;
        // console.log(`Result: ${JSON.stringify(user, null, 3)}`);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        this.error = error.message;
        console.log(`${errorCode} ${errorMessage} ${email} ${credential}`);
      });
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: 'home'
          });
        });
    },
    canAccessRoute(navItem) {
      let routes = this.$router.options.routes;
      let route = routes.filter(item => {
        if (navItem.name === item.name) {
          return true;
        }
      });
      if (route === undefined) {
        return true;
      } else if (route[0].meta && route[0].meta.requiresAuth === true) {
        return this.isLoggedIn;
      } else {
        return true;
      }
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
      isLoggedIn: 'isLoggedIn'
    }),
    navigationItems() {
      let items = [
        {
          name: 'home',
          title: 'Home',
          icon: mdiHome
        },
        {
          section: 'Batch',
          name: 'datasets',
          title: 'Datasets',
          icon: mdiDatabase
        },
        {
          name: 'views',
          title: 'Authorized Views',
          icon: mdiViewGrid
        },
        {
          section: 'Entitlements',
          name: 'accounts',
          title: 'Accounts',
          icon: mdiAccountMultiple
        },
        {
          name: 'policies',
          title: 'Policies',
          icon: mdiBadgeAccount
        },
        {
          section: 'Ingestion',
          name: 'ingestion',
          title: 'Ingestion',
          icon: mdiApplicationImport,
          hidden: true
        },
        {
          section: 'Spot Fulfillment',
          name: 'spotFulfillment',
          title: 'Spot Fulfillment',
          icon: mdiHubspot,
          hidden: true
        },
        {
          name: 'spotFulfillment',
          title: 'Parameter Dictionary',
          icon: mdiBookOpen,
          hidden: true
        },
        {
          section: 'Application',
          subheader: 'Admin',
          name: 'admin',
          title: 'Admin',
          icon: mdiShieldKey
        },
        {
          subheader: 'Settings',
          name: 'settings',
          title: 'Settings',
          icon: mdiCog
        }
      ];
      // https://router.vuejs.org/api/#to
      // https://vuetifyjs.com/en/components/lists
      // Add a to variable to pass this instead so we can use the same views for certain things.
      return items.filter(item => {
        return this.canAccessRoute(item) && !item.hidden;
      });
    }
  },
  props: {
    source: String
  }
};
</script>
