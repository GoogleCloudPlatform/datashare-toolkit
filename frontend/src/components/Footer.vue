<template>
  <v-footer dark color="#1876D2" app>
    Cloud FSI &copy; {{ new Date().getFullYear() }}
    <v-spacer></v-spacer>
    {{ settings.projectId }}:{{ settings.storageBucket }}
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
  }),
  computed: {
    ...mapGetters({
      settings: 'settings'
    })
  }
};
</script>
