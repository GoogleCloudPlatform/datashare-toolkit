<template>
  <v-card class="px-4">
    <v-card-title>Activation</v-card-title>
    <v-card-subtitle v-if="1 === 2">Test</v-card-subtitle>
    <v-card-text v-html="userSummary"></v-card-text>
  </v-card>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'activation',
  props: {
    msg: String
  },
  data: () => ({
    user: null,
    activated: false
  }),
  created() {
    const user = firebase.auth().currentUser;
    this.user = user;
    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          this.approveAccount();
        });
    } else {
      this.approveAccount();
    }
  },
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
          projectId: this.$store.state.settings.projectId,
          email: this.user.email,
          'x-gcp-marketplace-token': this.jwtToken
        })
        .then(response => {
          if (response.success) {
            this.activated = true;
            this.$router.replace({
              name: 'myDashboard'
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
      return `<b>Display Name</b>: ${this.user.displayName}<br/>
      <b>Email</b>: ${this.user.email}<br/>
      <b>Token</b>: ${this.jwtToken}<br/>
      <b>Activation Status: ${this.activated}</b>`;
    },
    jwtToken() {
      return this.getCookie('gmt') || this.$route.query.gmt;
    }
  },
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
  }
};
</script>
