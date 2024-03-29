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
          <v-list-item
            :to="{ name: item.name }"
            :key="index"
            v-else-if="item.name && item.title"
          >
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
      <v-spacer v-if="!projectSelectorEnabled"></v-spacer>
      <v-divider
        class="mx-4"
        inset
        vertical
        v-if="projectSelectorEnabled"
      ></v-divider>
      <v-select
        v-if="projectSelectorEnabled"
        class="mt-7"
        dense
        style="maxWidth: 200px;"
        :readonly="!projectSelectorChangeable"
        v-model="projectId"
        :items="managedProjects"
        label="GCP Project ID"
        required
        @change="projectIdChanged(true)"
        :loading="loading"
      ></v-select>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on" @click="toggleLightDarkMode">
            <v-icon>{{ icons.themeLightDark }}</v-icon>
          </v-btn>
        </template>
        <span>Toggle Light/Dark Mode</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            dark
            v-on="on"
            :href="config.userGuideUrl"
            target="_blank"
          >
            <v-icon>{{ icons.helpCircle }}</v-icon>
          </v-btn>
        </template>
        <span>Help</span>
      </v-tooltip>
      <v-tooltip bottom v-if="this.isLoggedIn === false">
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on" @click="login">
            <v-icon title="login">{{ icons.login }}</v-icon>
          </v-btn>
        </template>
        <span>Login</span>
      </v-tooltip>
      <v-tooltip bottom v-if="this.isLoggedIn === true">
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on" @click="logout">
            <v-icon title="logout">{{ icons.logout }}</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
      <v-avatar v-if="this.isLoggedIn === true" size="28">
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
  mdiDog,
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
  mdiShieldKey,
  mdiThemeLightDark
} from '@mdi/js';

import { mapGetters } from 'vuex';
import _config from '../config';
import authManager from '../mixins/authManager';

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
      dog: mdiDog,
      import: mdiApplicationImport,
      helpCircle: mdiHelpCircle,
      home: mdiHome,
      hubSpot: mdiHubspot,
      settings: mdiCog,
      themeLightDark: mdiThemeLightDark,
      verticalDots: mdiDotsVertical,
      viewGrid: mdiViewGrid,
      login: mdiLogin,
      logout: mdiLogout,
      shieldKey: mdiShieldKey
    },
    toolbar: {
      title: 'Datashare'
    },
    params: {},
    projectId: null,
    loading: false
  }),
  created() {
    this.initLightDarkMode();
    this.loading = true;
    // Loads the managed project list. If the user isn't signed in, the list will initially return as empty.
    // Once the user signs in, the onAuthSuccess function will load this list.
    _config.reloadManagedProjects().then(result => {
      if (_config.projectId === null) {
        if (this.managedProjects.length > 0) {
          this.projectId = this.managedProjects[0];
          this.projectIdChanged(false);
        }
      } else {
        this.projectId = _config.projectId;
        this.projectIdChanged(false);
      }
      this.loading = false;
    });
  },
  methods: {
    login() {
      return authManager.login();
    },
    logout() {
      return authManager.logout();
    },
    projectIdChanged(reload) {
      _config.projectId = this.projectId;
      if (reload === true) {
        this.$router.go();
      }
    },
    initLightDarkMode() {
      const dark = localStorage.getItem('darkMode') === 'true';
      this.$vuetify.theme.dark = dark;

      const _vm = this;
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', event => {
          if (event.matches) {
            // dark mode
            _vm.$vuetify.theme.dark = true;
          } else {
            // light mode
            _vm.$vuetify.theme.dark = false;
          }
          localStorage.setItem('darkMode', _vm.$vuetify.theme.dark);
        });
    },
    toggleLightDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('darkMode', this.$vuetify.theme.dark);
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
      isLoggedIn: 'isLoggedIn',
      isDataProducer: 'isDataProducer',
      managedProjects: 'managedProjects'
    }),
    config() {
      return _config;
    },
    projectSelectorEnabled() {
      if (this.isLoggedIn === false) {
        return false;
      } else if (this.managedProjects) {
        return this.managedProjects.length > 1;
      }
      return false;
    },
    projectSelectorChangeable() {
      return this.projectSelectorEnabled && this.isDataProducer;
    },
    navigationItems() {
      return this.$router.userMenuItems();
    }
  },
  props: {
    source: String
  }
};
</script>
