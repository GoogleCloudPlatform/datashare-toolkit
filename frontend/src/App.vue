<template>
  <v-app id="app">
    <Header></Header>
    <Notification></Notification>
    <v-main>
      <v-container fluid fill-height>
        <!--align-center-->
        <v-layout justify-center>
          <v-flex text-xs-center>
            <SetupBanner></SetupBanner>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import SetupBanner from '@/components/SetupBanner.vue';
import Notification from '@/components/Notification.vue';

export default {
  name: 'app',
  components: {
    Footer,
    Header,
    Notification,
    SetupBanner
  },
  props: {
    source: String
  }
};
</script>
