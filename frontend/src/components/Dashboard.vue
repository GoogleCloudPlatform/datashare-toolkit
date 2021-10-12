<template>
  <v-layout text-xs-center wrap>
    <!--https://stackoverflow.com/questions/52343526/center-content-vertically-on-vuetify-->
    <v-container fluid fill-height>
      <v-row
        justify="center"
        align="center"
        v-if="this.$store.getters.isLoggedIn === true"
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
            <!--https://github.com/vuetifyjs/vuetify/pull/12216/files-->
            <v-card
              v-if="true === true"
              :elevation="hover ? 16 : 2"
              class="d-flex flex-column mx-3 my-3"
              :class="{ 'on-hover': hover }"
              width="300"
              height="250"
              :to="card.name"
            >
              <v-container>
                <v-row>
                  <div>
                    <v-row no-gutters>
                      <v-icon
                        class="ml-4 mt-5"
                        size="40"
                        :color="card.iconColor"
                        >{{ card.icon }}</v-icon
                      >
                      <v-card-title
                        class="mt-2"
                        v-text="card.title"
                      ></v-card-title>
                      <v-spacer></v-spacer>
                      <v-card-subtitle class="dark--text mr-2 mt-3">
                        {{ card.count }}
                      </v-card-subtitle>
                    </v-row>
                    <v-row no-gutters>
                      <v-card-subtitle
                        v-text="card.description"
                        class="grey--text mx-6"
                      ></v-card-subtitle>
                    </v-row>
                  </div>
                </v-row>
              </v-container>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mb-2 mr-2" icon :to="{ path: card.name }">
                  <v-icon>{{ icons.arrowRight }} </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card
              v-else
              :elevation="hover ? 16 : 2"
              class="d-flex flex-column mx-3 my-3"
              :class="{ 'on-hover': hover }"
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
                <div class="dark--text ms-4">{{ card.count }}</div>
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

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.1)
  >.v-card__text
    color: #000
</style>

<script>
import { mdiArrowRightBoldCircleOutline } from '@mdi/js';

export default {
  name: 'dashboard',
  created() {
    if (this.isLoggedIn) {
      this.loadCounts();
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
            c.count = this.counts[c.name];
          }
        });
      }
      return list;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    isLoggedIn(newValue, oldValue) {
      if (newValue === true) {
        this.loadCounts();
      } else {
        this.counts = {};
      }
    }
  },
  methods: {
    loadCounts() {
      this.loading = true;
      this.$store.dispatch('getDashboard').then(response => {
        if (response.success) {
          const data = response.data;
          this.counts = data;
        }
        this.loading = false;
      });
    }
  }
};
</script>
