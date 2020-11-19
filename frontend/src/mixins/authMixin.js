import Vue from 'vue';

export default {
  methods: {
    performLogin() {
      return Vue.GoogleAuth.then(auth2 => {
        if (auth2.isSignedIn.get() === true) {
          return true;
        } else {
          return auth2
            .signIn()
            .then(result => {
              return this.onAuthSuccess(result);
            })
            .catch(err => {
              return this.onAuthFailure(err);
            });
        }
      });
    },
    onAuthSuccess(googleUser) {
      if (googleUser) {
        const profile = googleUser.getBasicProfile();
        const user = {
          displayName: profile.getName(),
          email: profile.getEmail(),
          photoURL: profile.getImageUrl()
        };
        return this.$store.dispatch('fetchUser', user).then(() => {
          return true;
        });
      } else {
        return this.$store.dispatch('fetchUser', null).then(() => {
          this.redirectHome();
          return false;
        });
      }
    },
    onAuthFailure(error) {
      console.error(error);
      return this.$store.dispatch('fetchUser', null).then(() => {
        this.redirectHome();
        return false;
      });
    },
    redirectHome() {
      const name = 'home';
      if (this.$route.name !== name) {
        this.$router.replace({
          name: name
        });
      }
    }
  }
};
