<template>
  <v-card class="px-4">
    <v-card-title>Ingestion</v-card-title>
    <v-card-subtitle v-if="datasetId">{{ this.datasetId }}</v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="ingestion"
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
      <template v-slot:top>
        <v-toolbar flat class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="primary" dark @click.stop="addIngestion()"
            >Create Ingestion</v-btn
          >
        </v-toolbar>
      </template>
      <template v-slot:[`item.schemaFileFound`]="{ item }">
        {{ item.schemaFileFound ? item.schemaFileFound : false }}
      </template>
      <template v-slot:[`item.transformFileFound`]="{ item }">
        {{ item.transformFileFound ? item.transformFileFound : false }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-2" @click="navigateEditIngestion(item)">
          edit
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="showCreateIngestion" persistent max-width="700px">
      <EditIngestion
        :key="componentKey"
        :ingestionData="selectedItem"
        v-on:close="editCompleted(true)"
        v-on:cancel="editCompleted(false)"
      />
    </v-dialog>
    <v-card-text style="height: 100px; position: relative">
      <v-fab-transition>
        <v-btn
          color="pink"
          dark
          absolute
          bottom
          right
          fab
          @click="addIngestion()"
        >
          <v-icon>{{ icons.plus }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-card>
</template>

<script>
import EditIngestion from '@/components/EditIngestion';
import {
  mdiDotsVertical,
  mdiPencil,
  mdiViewGrid,
  mdiTable,
  mdiPlus
} from '@mdi/js';

export default {
  components: {
    EditIngestion
  },
  data: () => ({
    ingestion: [],
    componentKey: 0,
    loading: false,
    showCreateIngestion: false,
    selectedItem: null,
    icons: {
      viewGrid: mdiViewGrid,
      dotsVertical: mdiDotsVertical,
      pencil: mdiPencil,
      table: mdiTable,
      plus: mdiPlus
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100],
    itemsPerPage: 20
  }),
  computed: {
    datasetId() {
      return this.$route.query.datasetId;
    },
    headers() {
      let h = [
        { text: 'Dataset Id', value: 'datasetId' },
        { text: 'Table Id', value: 'tableId' },
        { text: 'Custom Config', value: 'schemaFileFound' },
        { text: 'Custom Transformation', value: 'transformFileFound' },
        { text: '', value: 'action', sortable: false }
      ];

      return h.filter(item => {
        if (this.$route.query.datasetId == null) {
          return true;
        } else if (item.value !== 'datasetId') {
          return true;
        }
      });
    }
  },
  created() {
    this.loadIngestion();
  },
  methods: {
    addIngestion() {
      this.componentKey += 1;
      this.selectedItem = null;
      this.showCreateIngestion = true;
    },
    navigateEditIngestion(item) {
      this.componentKey += 1;
      this.selectedItem = item;
      this.showCreateIngestion = true;
    },
    editCompleted(refresh) {
      this.selectedItem = null;
      this.showCreateIngestion = false;
      if (refresh) {
        setTimeout(() => {
          // TODO: Fix and remove delay.
          this.loadIngestion();
        }, 1000);
      }
    },
    deleteIngestion() {},
    loadIngestion() {
      this.loading = true;
      this.$store
        .dispatch('getIngestion', {
          bucketName: this.$store.state.settings.storageBucket,
          datasetId: this.$route.query.datasetId,
          tableId: this.$route.query.tableId
        })
        .then(result => {
          this.ingestion = result;
          this.loading = false;
        });
    }
  }
};
</script>
