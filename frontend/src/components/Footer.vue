<template>
  <v-footer dark color="#1876D2" app>
    Cloud FSI Solutions &copy; {{ new Date().getFullYear() }}
    <v-spacer></v-spacer>
    {{ settings.projectId }}
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      settings: 'settings'
    })
  }
};
</script>
