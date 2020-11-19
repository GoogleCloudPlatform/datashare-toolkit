<template>
  <v-footer dark color="#1876D2" app>
    Cloud FSI Solutions &copy; {{ new Date().getFullYear() }}
    <v-spacer></v-spacer>
    {{ projectId }}
  </v-footer>
</template>

<script>
import config from './../config';
export default {
  data: () => ({
    projectId: config.projectId
  })
};
</script>
