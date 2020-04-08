<template>
  <v-app id="app">
    <Header></Header>
    <Notification></Notification>
    <v-content>
      <v-container fluid fill-height>
        <!--align-center-->
        <v-layout justify-center>
          <v-flex text-xs-center>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Notification from '@/components/Notification.vue';

export default {
  name: 'app',
  components: {
    Footer,
    Header,
    Notification
  },
  props: {
    source: String
  }
};
</script>
