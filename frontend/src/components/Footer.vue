<template>
  <v-footer dark color="#1876D2" app>
    Cloud FSI Solutions &copy; 2019-{{ new Date().getFullYear() }}
    <v-spacer></v-spacer>
    <v-avatar :tile="true" height="25" width="25">
      <img :src="require('@/assets/datashare-alpha-24px.svg')" alt="logo" />
    </v-avatar>
    <v-spacer></v-spacer>
    {{ apiProjectLabel }}
  </v-footer>
</template>

<script>
import config from './../config';
export default {
  computed: {
    projectId() {
      return config.apiProjectId;
    },
    apiProjectLabel() {
      if (this.projectId) {
        return `api project: ${this.projectId}`;
      }
      return null;
    }
  }
};
</script>
