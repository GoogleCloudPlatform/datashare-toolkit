import Vue from 'vue';
import config from '../config';

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
      console.log('auth success called');
      if (googleUser) {
        const profile = googleUser.getBasicProfile();
        const user = {
          displayName: profile.getName(),
          email: profile.getEmail(),
          photoURL: profile.getImageUrl()
        };
        return this.$store.dispatch('fetchUser', user).then(() => {
          config.reloadAllProjectConfigData().then(result => {
            return true;
          });
        });
      } else {
        return this.$store.dispatch('fetchUser', null).then(() => {
          this.redirectHome();
          return false;
        });
      }
    },
    onAuthFailure(error) {
      console.log('auth failed called');
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
