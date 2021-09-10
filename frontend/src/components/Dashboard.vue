<template>
  <v-layout text-xs-center wrap>
    <!--https://stackoverflow.com/questions/52343526/center-content-vertically-on-vuetify-->
    <v-container fluid fill-height>
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
              xclass="mx-3 my-3"
              class="d-flex flex-column mx-3 my-3"
              width="300"
              height="250"
            >
              <v-row justify="center" align="center">
                <v-icon class="my-3" size="40">{{ card.icon }}</v-icon>
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
                  23
                </div>
                <v-spacer></v-spacer>
                <v-btn icon :to="{ path: card.path }">
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
  name: 'welcome',
  props: {
    msg: String
  },
  data: () => ({
    icons: {
      arrowRight: mdiArrowRightBoldCircleOutline
    }
  }),
  computed: {
    cards() {
      const list = this.$router.userDashboardCards();
      return list;
    }
  }
};
</script>
