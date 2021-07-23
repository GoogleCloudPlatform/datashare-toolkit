<template>
  <v-card class="px-4">
    <v-card-title>Activation</v-card-title>
    <v-card-subtitle v-if="1 === 2">Test</v-card-subtitle>
    <v-card-text v-html="userSummary"></v-card-text>
  </v-card>
</template>

<script>
import authMixin from '../mixins/authMixin';
import config from './../config';

export default {
  name: 'activation',
  mixins: [authMixin],
  props: {
    msg: String
  },
  data: () => ({
    user: null,
    activated: false,
    jwtToken: null
  }),
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return parts
          .pop()
          .split(';')
          .shift();
    },
    approveAccount() {
      this.loading = true;
      this.$store
        .dispatch('submitProcurementAccountApproval', {
          projectId: config.projectId,
          email: this.user.email,
          'x-gcp-marketplace-token': this.jwtToken
        })
        .then(response => {
          if (response.success) {
            this.activated = true;
            this.$router.replace({
              name: 'myProducts'
            });
          } else {
            this.activated = false;
          }
          this.loading = false;
        });
    }
  },
  computed: {
    userSummary() {
      return `<b>Display Name</b>: ${
        this.user ? this.user.displayName : ''
      }<br/>
      <b>Email</b>: ${this.user ? this.user.email : ''}<br/>
      <b>Activation Status: ${this.activated}</b>`;
    }
  },
  mounted() {
    const token = this.$route.query.gmt || this.getCookie('gmt');
    if (token) {
      this.jwtToken = token;
      sessionStorage.setItem('gmt', token);
    } else {
      this.jwtToken = sessionStorage.getItem('gmt');
      sessionStorage.removeItem('gmt');
    }

    this.performLogin().then(result => {
      if (result) {
        this.user = {
          email: this.$store.state.user.data.email,
          displayName: this.$store.state.user.data.displayName
        };
        this.approveAccount();
      }
    });
  }
};
</script>
