<template>
  <v-card class="px-4">
    <v-card-title>Authorized Views</v-card-title>
    <v-card-subtitle v-if="datasetId">{{ this.datasetId }}</v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="views"
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
        <v-toolbar flat color="white" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="primary" dark @click.stop="createView()"
            >Create Authorized View</v-btn
          >
        </v-toolbar>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ toLocalTime(item.createdAt) }}
      </template>
      <template v-slot:item.viewAction="{ item }">
        <v-icon class="mr-2" @click="navigateToTable(item)">
          {{ icons.tableHeadersEye }}
        </v-icon>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          edit
        </v-icon>
        <v-icon small @click="presentDeleteDialog(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
    <v-data-iterator
      v-if="1 === 3"
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
        <v-toolbar flat color="white" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn @click.stop="showCreateView = true" color="primary" dark
            >Create Authorized View</v-btn
          >
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.datasetId + item.tableId"
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
                  <h3>{{ item.tableId }}</h3>
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
                      <v-list-item
                        key="delete"
                        @click="presentDeleteDialog(item)"
                      >
                        <v-list-item-title style="color:red"
                          >Delete View</v-list-item-title
                        >
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item @click="navigateEditView(item)">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
                <v-divider></v-divider>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>Dataset:</v-list-item-content>
                    <v-list-item-content class="align-end">{{
                      item.datasetId
                    }}</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <Dialog
      v-if="showDialog"
      v-model="showDialog"
      :title="deleteDialogTitle"
      :text="deleteDialogText"
      v-on:confirmed="deleteView(selectedItem)"
      confirmButtonColor="red darken-1"
      confirmButtonText="Delete"
    />
    <Dialog
      v-if="showError"
      v-model="showError"
      :title="errorDialogTitle"
      :text="errorDialogText"
      cancelButtonEnabled="false"
      v-on:confirmed="showError = false"
    />
    <v-dialog v-model="showCreateView" persistent max-width="700px">
      <EditView
        :key="componentKey"
        :viewData="selectedItem"
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
          @click="createView()"
        >
          <v-icon>{{ icons.plus }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-card>
</template>

<script>
import EditView from '@/components/EditView';
import Dialog from '@/components/Dialog.vue';
import {
  mdiDotsVertical,
  mdiPencil,
  mdiViewGrid,
  mdiPlus,
  mdiTableHeadersEye
} from '@mdi/js';

export default {
  components: {
    EditView,
    Dialog
  },
  data: () => ({
    loading: false,
    componentKey: 0,
    views: [],
    showCreateView: false,
    showDialog: false,
    showError: false,
    selectedItem: null,
    icons: {
      viewGrid: mdiViewGrid,
      dotsVertical: mdiDotsVertical,
      pencil: mdiPencil,
      plus: mdiPlus,
      tableHeadersEye: mdiTableHeadersEye
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100],
    itemsPerPage: 20
  }),
  computed: {
    datasetId() {
      return this.$route.query.datasetId;
    },
    deleteDialogTitle() {
      return `Delete view '${this.selectedItem.datasetId}.${this.selectedItem.name}'?`;
    },
    deleteDialogText() {
      return `Please click 'Delete' to confirm that you want to delete view '${this.selectedItem.datasetId}.${this.selectedItem.name}'.`;
    },
    headers() {
      let h = [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Dataset Id', value: 'datasetId' },
        { text: 'Modified At', value: 'createdAt' },
        { text: 'Modified By', value: 'createdBy' },
        // { text: 'Version', value: 'version' },
        { text: '', value: 'viewAction', sortable: false },
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
    this.loadViews();
  },
  methods: {
    createView() {
      this.componentKey += 1;
      this.selectedItem = null;
      this.showCreateView = true;
    },
    editItem(item) {
      this.componentKey += 1;
      this.selectedItem = item;
      this.showCreateView = true;
    },
    editCompleted(refresh) {
      this.selectedItem = null;
      this.showCreateView = false;
      if (refresh) {
        this.loadViews();
      }
    },
    presentDeleteDialog(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    deleteView(item) {
      this.showDialog = false;
      this.loading = true;
      this.$store
        .dispatch('deleteView', {
          rowId: item.rowId,
          datasetId: item.datasetId,
          authorizedViewId: item.authorizedViewId
        })
        .then(() => {
          this.loading = false;
          this.loadViews();
        });
    },
    loadViews() {
      this.loading = true;
      this.$store
        .dispatch('getViews', {
          datasetId: this.$route.query.datasetId
        })
        .then(response => {
          if (response) {
            this.views = response.data;
          } else {
            this.views = [];
          }
          this.loading = false;
        });
    },
    toLocalTime(epoch) {
      let d = new Date(epoch);
      return d.toLocaleString();
    },
    navigateToTable(item) {
      const url = `https://console.cloud.google.com/bigquery?project=${this.$store.state.settings.projectId}&p=${this.$store.state.settings.projectId}&d=${item.datasetId}&t=${item.name}&page=table`;
      window.open(url, '_blank');
    }
  }
};
</script>
