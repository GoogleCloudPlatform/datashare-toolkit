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
              <v-icon class="my-3" size="45">{{ card.icon }}</v-icon>
              <v-row justify="center" align="center">
                <v-card-title
                  v-text="card.title"
                  justify="center"
                  align="center"
                ></v-card-title>
                <v-card-subtitle
                  v-text="card.description"
                  class="grey--text"
                ></v-card-subtitle>
              </v-row>
              <v-card-actions>
                <div class="black--text ms-4">
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
import {
  mdiAccountMultiple,
  mdiBadgeAccount,
  mdiBucketOutline,
  mdiDatabase,
  mdiDog,
  mdiViewGrid,
  mdiArrowRightBoldCircleOutline
} from '@mdi/js';

export default {
  name: 'welcome',
  props: {
    msg: String
  },
  data: () => ({
    icons: {
      arrowRight: mdiArrowRightBoldCircleOutline
    },
    cards: [
      {
        title: 'Datasets',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        flex: 12,
        icon: mdiDatabase,
        path: 'datasets',
        description: 'the description goes here sdfdsf sdf  '
      },
      {
        title: 'Authorized Views',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6,
        icon: mdiViewGrid,
        path: 'views',
        description: 'the description goes heresdf dsf sdf '
      },
      {
        title: 'Pub/Sub Topics',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6,
        icon: mdiDog,
        path: 'topics',
        description: 'the description goes here sdf sdf sdf '
      },
      {
        title: 'Storage Buckets',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6,
        icon: mdiBucketOutline,
        path: 'buckets',
        description: 'the description goes here sdfd sdf  dfsdfdsf sfddf'
      },
      {
        title: 'Accounts',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6,
        icon: mdiAccountMultiple,
        path: 'accounts',
        description: 'the description goes here sdf sdf dfd df'
      },
      {
        title: 'Policies',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6,
        icon: mdiBadgeAccount,
        path: 'policies',
        description: 'the description goes here sdfds dsf sdf '
      }
    ]
  })
};
</script>
