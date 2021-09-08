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
            <v-card :elevation="hover ? 16 : 2" class="mx-3 my-3" width="300">
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
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
import { mdiDatabase, mdiViewGrid } from '@mdi/js';

export default {
  name: 'welcome',
  props: {
    msg: String
  },
  data: () => ({
    cards: [
      {
        title: 'Datasets',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        flex: 12,
        icon: mdiDatabase
      },
      {
        title: 'Authorized Views',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6,
        icon: mdiViewGrid
      },
      {
        title: 'Pub/Sub Topics',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      },
      {
        title: 'Storage Buckets',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      },
      {
        title: 'Accounts',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      },
      {
        title: 'Policies',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      }
    ]
  })
};
</script>
