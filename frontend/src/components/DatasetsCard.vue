<template>
  <v-card class="px-4">
    <v-card-title>Datasets</v-card-title>
    <v-data-table
      :headers="headers"
      :items="datasets"
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
          <v-btn color="primary" dark @click.stop="presentDatasetDialog()"
            >Create Dataset</v-btn
          >
        </v-toolbar>
      </template>
      <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }">
        <v-tooltip bottom v-bind:key="h.value">
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ h.text }}</span>
          </template>
          <span v-if="header.tooltip">{{ header.tooltip }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.modifiedAt`]="{ item }">
        {{ toLocalTime(item.modifiedAt) }} </template
      ><template v-slot:[`item.viewAction`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mr-2" @click="navigateToDataset(item)">
              {{ icons.databaseSearch }}
            </v-icon>
          </template>
          <span>View in BigQuery</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">{{ icons.dotsVertical }}</v-icon>
          </template>
          <v-list>
            <v-list-item key="edit" @click="presentDatasetDialog(item)">
              <v-list-item-title>Edit Dataset</v-list-item-title>
            </v-list-item>
            <v-list-item key="delete" @click="presentDeleteDialog(item)">
              <v-list-item-title style="color:red"
                >Delete Dataset</v-list-item-title
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item key="accounts" @click="showAccountsDialog(item)">
              <v-list-item-title>Accounts</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="false"
              key="ingestion"
              @click="navigateIngestion(item.datasetId)"
            >
              <v-list-item-title>Ingestion</v-list-item-title>
            </v-list-item>
            <v-list-item key="views" @click="navigateView(item.datasetId)">
              <v-list-item-title>Views</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <Dialog
      v-if="showDialog"
      v-model="showDialog"
      :title="deleteDialogTitle"
      :text="deleteDialogText"
      v-on:confirmed="deleteDataset(selectedItem)"
      confirmButtonColor="red darken-1"
      confirmButtonText="Delete"
    />
    <Dialog
      v-if="showError"
      v-model="showError"
      :title="errorDialogTitle"
      :text="errorDialogText"
      :cancelButtonEnabled="false"
      v-on:confirmed="showError = false"
    />
    <v-row justify="center">
      <v-dialog
        v-if="showCreateDataset"
        v-model="showCreateDataset"
        persistent
        max-width="390"
      >
        <v-card>
          <v-card-title class="headline">{{
            !this.dialogDataset.editing ? 'Create Dataset' : 'Edit Dataset'
          }}</v-card-title>
          <ValidationObserver ref="observer" v-slot="{}">
            <v-form class="px-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Dataset Id"
                rules="required|bigQueryTableIdRule"
              >
                <v-text-field
                  :readonly="dialogDataset.editing === true"
                  v-model="dialogDataset.datasetId"
                  :error-messages="errors"
                  :counter="1024"
                  label="Dataset Id"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Description"
                rules="required|max:1024"
              >
                <v-textarea
                  v-model="dialogDataset.description"
                  :error-messages="errors"
                  label="Description"
                  required
                ></v-textarea>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click.stop="showCreateDataset = false"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click.stop="saveDataset">{{
              !this.dialogDataset.editing ? 'Create' : 'Update'
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="showAccounts">
      <v-card>
        <AccountsCard
          :key="componentKey"
          :selectedDataset="selectedItem"
          v-on:close="accountsClosed()"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.stop="closeAccountsDialog"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
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
          @click="presentDatasetDialog()"
        >
          <v-icon>{{ icons.plus }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue';
import UrlHelper from '../urlHelper';
import { required, max } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
});

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
});

extend('bigQueryTableIdRule', value => {
  if (value.length > 1024) {
    return `DatasetId '${value}' exceeds maximum allowable length of 1024: ${value.length}}`;
  } else if (!value.match(/^[A-Za-z0-9_]+$/g)) {
    return `DatasetId '${value}' name is invalid. See https://cloud.google.com/bigquery/docs/datasets for further information.`;
  }
  return true;
});

import {
  mdiDatabase,
  mdiDatabaseSearch,
  mdiDotsVertical,
  mdiPencil,
  mdiPlus
} from '@mdi/js';
import Dialog from '@/components/Dialog.vue';
import AccountsCard from '@/components/AccountsCard.vue';
import config from './../config';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Dialog,
    AccountsCard
  },
  data: () => ({
    loading: false,
    componentKey: 0,
    showAccounts: false,
    datasets: [],
    showDialog: false,
    showError: false,
    showCreateDataset: false,
    dialogDataset: { editing: false },
    selectedItem: null,
    icons: {
      database: mdiDatabase,
      dotsVertical: mdiDotsVertical,
      pencil: mdiPencil,
      plus: mdiPlus,
      databaseSearch: mdiDatabaseSearch
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100, 200],
    itemsPerPage: 50,
    headers: [
      {
        text: 'Dataset Id',
        value: 'datasetId',
        tooltip: 'The BigQuery datasetId'
      },
      {
        text: 'Description',
        value: 'description',
        tooltip: 'Description of the dataset'
      },
      {
        text: 'Modified At',
        value: 'modifiedAt',
        tooltip: 'The last modified time for the dataset'
      },
      {
        text: 'View in BigQuery',
        value: 'viewAction',
        sortable: false,
        tooltip: 'View dataset in the BigQuery console'
      },
      { text: '', value: 'action', sortable: false }
    ]
  }),
  computed: {
    deleteDialogTitle() {
      return `Delete dataset '${this.selectedItem.datasetId}'?`;
    },
    deleteDialogText() {
      return `Please click 'Delete' to confirm that you want to delete dataset '${this.selectedItem.datasetId}'. Deleting the dataset will delete all child tables.`;
    }
  },
  created() {
    this.loadDatasets();
  },
  methods: {
    presentDatasetDialog(selectedItem) {
      this.dialogDataset = { editing: false };
      if (selectedItem) {
        this.dialogDataset.editing = true;
        this.dialogDataset.datasetId = selectedItem.datasetId;
        this.dialogDataset.description = selectedItem.description;
      }
      this.showCreateDataset = true;
    },
    presentDeleteDialog(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    deleteDataset(item) {
      this.showDialog = false;
      this.loading = true;
      this.$store
        .dispatch('deleteDataset', {
          projectId: config.projectId,
          datasetId: item.datasetId
        })
        .then(() => {
          this.loading = false;
          this.loadDatasets();
        });
    },
    saveDataset() {
      this.$refs.observer
        .validate()
        .then(result => {
          if (result) {
            if (this.dialogDataset.editing === false) {
              this.$store
                .dispatch('createDataset', {
                  projectId: config.projectId,
                  datasetId: this.dialogDataset.datasetId,
                  description: this.dialogDataset.description
                })
                .then(result => {
                  this.loading = false;
                  if (!result.success) {
                    this.showError = true;
                    this.errorDialogTitle = 'Error creating dataset';
                    this.errorDialogText = result.errors.join(', ');
                  } else {
                    this.showCreateDataset = false;
                    this.loadDatasets();
                  }
                })
                .catch(error => {
                  console.error(`Error creating dataset: ${error}`);
                });
            } else {
              this.$store
                .dispatch('updateDataset', {
                  projectId: config.projectId,
                  datasetId: this.dialogDataset.datasetId,
                  description: this.dialogDataset.description
                })
                .then(result => {
                  this.loading = false;
                  if (result.error) {
                    this.showError = true;
                    this.errorDialogTitle = 'Error updating dataset';
                    this.errorDialogText = result.error;
                  } else {
                    this.showCreateDataset = false;
                    this.loadDatasets();
                  }
                })
                .catch(error => {
                  console.error(`Error updating dataset: ${error}`);
                });
            }
          }
        })
        .catch(error => {
          alert(`Validation failed: ${error}`);
        });
    },
    navigateView(item) {
      this.$router.push({ path: 'views', query: { datasetId: item } });
    },
    showAccountsDialog(item) {
      this.componentKey += 1;
      this.selectedItem = item;
      this.showAccounts = true;
    },
    closeAccountsDialog() {
      this.selectedItem = null;
      this.showAccounts = false;
    },
    navigateIngestion(item) {
      this.$router.push({ path: 'ingestion', query: { datasetId: item } });
    },
    loadDatasets() {
      this.loading = true;
      this.$store
        .dispatch('getDatasets', {
          projectId: config.projectId
        })
        .then(response => {
          if (response.success) {
            this.datasets = response.data;
          } else {
            this.datasets = [];
          }
          this.loading = false;
        });
    },
    toLocalTime(epoch) {
      let d = new Date(0);
      d.setUTCMilliseconds(epoch);
      return d.toLocaleString();
    },
    navigateToDataset(item) {
      UrlHelper.navigateToDataset(config.projectId, item.datasetId);
    }
  }
};
</script>
