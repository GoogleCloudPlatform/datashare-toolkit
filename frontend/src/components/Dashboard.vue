<template>
  <v-layout text-xs-center wrap>
    <!--https://stackoverflow.com/questions/52343526/center-content-vertically-on-vuetify-->
    <v-container fluid fill-height>
      <v-row
        justify="center"
        align="center"
        v-if="this.$store.getters.isLoggedIn === false"
      >
        <v-container style="width: 80px;">
          <v-progress-linear
            rounded
            indeterminate
            :active="loading"
          ></v-progress-linear>
        </v-container>
      </v-row>
      <v-col>
        <v-row justify="center" align="center">
          <v-hover
            v-for="card in cards"
            :key="card.title"
            v-slot="{ hover }"
            open-delay="200"
          >
            <v-card
              :elevation="hover ? 16 : 2"
              class="d-flex flex-column mx-3 my-3"
              width="300"
              height="250"
            >
              <v-row justify="center" align="center">
                <v-icon class="my-3" size="40" :color="card.iconColor">{{
                  card.icon
                }}</v-icon>
                <v-card-title
                  v-text="card.title"
                  justify="center"
                  align="center"
                ></v-card-title>
                <v-card-subtitle
                  v-text="card.description"
                  class="grey--text mx-6"
                ></v-card-subtitle>
              </v-row>
              <v-card-actions class="mb-2">
                <div class="dark--text ms-4">
                  {{ card.count }}
                </div>
                <v-spacer></v-spacer>
                <v-btn icon :to="{ path: card.name }">
                  <v-icon>{{ icons.arrowRight }} </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-row>
      </v-col>
    </v-container>
  </v-layout>
</template>

<script>
import { mdiArrowRightBoldCircleOutline } from '@mdi/js';

export default {
  name: 'dashboard',
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.loading = true;
      this.$store.dispatch('getDashboard').then(response => {
        if (response.success) {
          const data = response.data;
          this.counts = data;
        }
        this.loading = false;
      });
    }
  },
  data: () => ({
    loading: false,
    icons: {
      arrowRight: mdiArrowRightBoldCircleOutline
    },
    counts: {}
  }),
  computed: {
    cards() {
      let list = this.$router.userDashboardCards();
      if (this.counts && Object.keys(this.counts).length > 0) {
        list.forEach(c => {
          if (c.name in this.counts) {
            const num = this.counts[c.name];
            if (num !== 0) {
              c.count = this.counts[c.name];
            }
          }
        });
      }
      return list;
    }
  }
};
</script>
