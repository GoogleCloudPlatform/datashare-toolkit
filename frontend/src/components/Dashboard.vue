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
import {
  mdiAccountMultiple,
  mdiBadgeAccount,
  mdiBucketOutline,
  mdiDatabase,
  mdiDog,
  mdiViewGrid,
  mdiArrowRightBoldCircleOutline,
  mdiShopping,
  mdiBriefcaseAccount,
  mdiLifebuoy
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
        icon: mdiDatabase,
        path: 'datasets',
        description:
          'Datasets are top-level containers that are used to organize and control access to your tables and views.'
      },
      {
        title: 'Authorized Views',
        icon: mdiViewGrid,
        path: 'views',
        description:
          'An authorized view lets you share query results with particular users and groups without giving them access to the underlying tables.'
      },
      {
        title: 'Pub/Sub Topics',
        icon: mdiDog,
        path: 'topics',
        description:
          'A named resource to which messages are sent by publishers.'
      },
      {
        title: 'Storage Buckets',
        icon: mdiBucketOutline,
        path: 'buckets',
        description:
          'The Buckets resource represents a bucket in Cloud Storage.'
      },
      {
        title: 'Accounts',
        icon: mdiAccountMultiple,
        path: 'accounts',
        description:
          'Managed accounts that are provisioned access to GCP resources through Datashare policies.'
      },
      {
        title: 'Policies',
        icon: mdiBadgeAccount,
        path: 'policies',
        description:
          'Policies allow data publishers to manage groupings of Datasets/Tables/PubSub Topics/Cloud Storage Buckets.'
      },
      {
        title: 'Procurement Requests',
        icon: mdiShopping,
        path: 'procurements',
        description:
          'Manage procurements purchased through the GCP Marketplace.'
      },
      {
        title: 'My Products',
        icon: mdiBriefcaseAccount,
        path: 'myProducts',
        description:
          'View Datashare products that you have purchased through GCP Marketplace.'
      },
      {
        title: 'Links',
        icon: mdiLifebuoy,
        path: 'links',
        description: 'Find helpful Datashare links.'
      }
    ]
  })
};
</script>
