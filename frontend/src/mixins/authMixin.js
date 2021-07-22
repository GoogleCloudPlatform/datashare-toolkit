import authManager from './authManager';

export default {
  methods: {
    performLogin() {
      return authManager.performLogin();
    },
    onAuthSuccess(googleUser) {
      return authManager.onAuthSuccess(googleUser).then(result => {
        if (result === false) {
          this.redirectHome();
        }
      });
    },
    onAuthFailure(error) {
      return authManager.onAuthFailure(error).then(result => {
        if (result === false) {
          this.redirectHome();
        }
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
