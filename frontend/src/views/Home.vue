<template>
  <div id="welcome">
    <v-img
      :src="require('../assets/ds-architecture.png')"
      contain
      height="300"
    ></v-img>
    <Welcome msg="Welcome to the Datashare UI" />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome';

export default {
  name: 'home',
  components: {
    Welcome
  }
};
</script>

<!-- https://g3doc.corp.google.com/fonts/g3doc/overview.md?cl=head -->
<style>
@import url('//fonts.googleapis.com/css?family=Open+Sans:300, 400&lang=en');

@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans'), local('OpenSans'),
    url(https://.../opensans/v7/foo.woff) format('woff');
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#welcome {
  text-align: center;
}
</style>
