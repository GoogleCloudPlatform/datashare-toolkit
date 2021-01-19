<template>
  <v-banner v-if="isBannerVisible" single-line color="red">
    <v-icon slot="icon" size="25" color="white">
      {{ icons.alertOctagon }}
    </v-icon>
    <strong class="white--text text--lighten-1">
      The Datashare environment has missing configuration(s)
    </strong>
    <template v-slot:actions>
      <v-btn @click="navigateToSetupIssues()" text color="white"
        ><strong>Get Help</strong></v-btn
      >
    </template>
  </v-banner>
</template>

<script>
import config from './../config';
import { mdiAlertOctagon } from '@mdi/js';

export default {
  data: () => ({
    isBannerVisible: false,
    icons: {
      alertOctagon: mdiAlertOctagon
    }
  }),
  mounted() {
    this.isBannerVisible = config.isValid() === false;
  },
  methods: {
    navigateToSetupIssues() {
      window.open(config.userGuideUrl, '_blank');
    }
  }
};
</script>
