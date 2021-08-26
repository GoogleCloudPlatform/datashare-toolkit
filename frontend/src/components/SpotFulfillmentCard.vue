<template>
  <v-card class="px-4">
    <v-card-title>Spot Fulfillment</v-card-title>
    <v-card-subtitle v-if="datasetId">{{ this.datasetId }}</v-card-subtitle>
    <v-data-iterator
      :items="views"
      :items-per-page.sync="itemsPerPage"
      :footer-props="{ itemsPerPageOptions }"
      :search="search"
      :loading="loading"
    >
      <template v-slot:loading>
        <v-row justify="center" align="center">
          <div class="text-center ma-12">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-row>
      </template>
      <template v-slot:header>
        <v-toolbar dark color="#1876D2" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
          <div class="mx-2 ml-5">
            <v-btn
              class="mr-2"
              light
              depressed
              @click.stop="showCreateSku = true"
              >Parameter Dictionary</v-btn
            >
            <v-btn light depressed @click.stop="showCreateSku = true"
              >Create SKU</v-btn
            >
          </div>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2">
                <v-card-title>
                  <v-icon>{{ icons.viewGrid }}</v-icon>
                  <v-spacer></v-spacer>
                  <h4>{{ item.name }}</h4>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-menu bottom offset-y>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">{{ icons.dotsVertical }}</v-icon>
                    </template>
                    <v-list>
                      <v-list-item @click="navigateEditIngestion(item)">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteIngestion(item)">
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
                <v-divider></v-divider>
                <v-list>
                  <v-list-item>
                    <v-list-item-content
                      >Destination Dataset:</v-list-item-content
                    >
                    <v-list-item-content class="align-end">{{
                      item.sourceDatasetId
                    }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Destination Table:</v-list-item-content
                    >
                    <v-list-item-content class="align-end">{{
                      item.sourceTableId
                    }}</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <v-dialog v-model="showCreateSku" max-width="700px">
      <v-card class="px-4 py-4">
        <EditIngestion />
        <v-card-actions>
          <v-btn color="primary" text @click="showCreateSku = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import EditIngestion from '@/components/EditIngestion';
import { mdiDotsVertical, mdiPencil, mdiViewGrid } from '@mdi/js';
import config from './../config';

export default {
  components: {
    EditIngestion
  },
  data: () => ({
    views: [],
    loading: false,
    showCreateSku: false,
    icons: {
      viewGrid: mdiViewGrid,
      dotsVertical: mdiDotsVertical,
      pencil: mdiPencil
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100],
    itemsPerPage: 20
  }),
  computed: {
    datasetId() {
      return this.$route.query.datasetId;
    }
  },
  created() {
    this.loadViews();
  },
  methods: {
    navigateEditIngestion(item) {
      this.$router.push({
        path: 'editSpotFullfillment',
        query: { datasetId: item.sourceDatasetId, tableId: item.sourceTableId }
      });
    },
    deleteIngestion() {},
    loadViews() {
      this.loading = true;
      this.$store
        .dispatch('getTables', {
          datasetId: this.$route.query.datasetId
        })
        .then(tables => {
          this.views = tables;
          this.loading = false;
        });
    }
  }
};
</script>
