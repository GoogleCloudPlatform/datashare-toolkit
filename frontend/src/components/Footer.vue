<template>
  <v-footer dark color="#1876D2" app>
    Cloud FSI Solutions &copy; 2019-{{ new Date().getFullYear() }}
    <v-spacer></v-spacer>
    <v-avatar :tile="true" height="25" width="25">
      <img :src="require('@/assets/datashare-alpha-24px.svg')" alt="logo" />
    </v-avatar>
    v{{ appVersion }} | {{ projectLabel }} | {{ apiProjectLabel }}
  </v-footer>
</template>

<script>
import config from './../config';
import { version } from '../../package';
export default {
  data: () => ({
    appVersion: version
  }),
  computed: {
    projectId() {
      return config.apiProjectId;
    },
    apiProjectLabel() {
      if (this.projectId) {
        return `api projectId: ${this.projectId}`;
      }
      return null;
    },
    projectLabel() {
      if (config.projectId) {
        return `projectId: ${config.projectId}`;
      }
      return null;
    }
  }
};
</script>
