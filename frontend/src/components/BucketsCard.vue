<template>
  <v-card class="px-4">
    <v-card-title>Buckets</v-card-title>
    <v-data-table
      :headers="headers"
      :items="buckets"
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
          <v-btn color="primary" dark @click.stop="presentBucketDialog()"
            >Create Bucket</v-btn
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
            <v-icon v-on="on" class="mr-2" @click="navigateToBucket(item)">
              {{ icons.bucket }}
            </v-icon>
          </template>
          <span>View in Cloud Storage</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">{{ icons.dotsVertical }}</v-icon>
          </template>
          <v-list>
            <v-list-item key="delete" @click="presentDeleteDialog(item)">
              <v-list-item-title style="color:red"
                >Delete Bucket</v-list-item-title
              >
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
      v-on:confirmed="deleteBucket(selectedItem)"
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
        v-if="showCreateBucket"
        v-model="showCreateBucket"
        persistent
        max-width="390"
      >
        <v-card>
          <v-card-title class="headline">{{
            !this.dialogBucket.editing ? 'Create Bucket' : 'Edit Bucket'
          }}</v-card-title>
          <ValidationObserver ref="observer" v-slot="{}">
            <v-form class="px-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Name"
                rules="required|bucketNameRule"
              >
                <v-text-field
                  :readonly="dialogBucket.editing === true"
                  v-model="dialogBucket.bucketName"
                  :error-messages="errors"
                  :counter="222"
                  label="Bucket Name"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click.stop="showCreateBucket = false"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click.stop="saveBucket">{{
              !this.dialogBucket.editing ? 'Create' : 'Update'
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
          @click="presentBucketDialog()"
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

extend('bucketNameRule', value => {
  if (value.length < 3) {
    return `Bucket name '${value}' is smaller than minimum allowable length of 3: ${value.length}}`;
  } else if (value.length > 222) {
    return `Bucket '${value}' exceeds maximum allowable length of 222: ${value.length}}`;
  } else if (!value.match(/^(?!goog)[a-z0-9]+[a-z0-9\-._]*$/g)) {
    return `Bucket '${value}' name is invalid. Use only lowercase letters, numbers, hyphens (-), and underscores (_). Dots (.) may be used to form a valid domain name. See https://cloud.google.com/storage/docs/naming-buckets for further information.`;
  }
  return true;
});

import { mdiBucketOutline, mdiDotsVertical, mdiPencil, mdiPlus } from '@mdi/js';
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
    buckets: [],
    showDialog: false,
    showError: false,
    showCreateBucket: false,
    dialogBucket: { editing: false },
    selectedItem: null,
    icons: {
      bucket: mdiBucketOutline,
      dotsVertical: mdiDotsVertical,
      pencil: mdiPencil,
      plus: mdiPlus
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100, 200],
    itemsPerPage: 50,
    headers: [
      {
        text: 'Name',
        value: 'bucketName',
        tooltip: 'The bucket name'
      },
      {
        text: 'Modified At',
        value: 'modifiedAt',
        tooltip: 'The last modified time for the dataset'
      },
      {
        text: 'View in Cloud Storage',
        value: 'viewAction',
        sortable: false,
        tooltip: 'View bucket in the Cloud Storage console'
      },
      { text: '', value: 'action', sortable: false }
    ]
  }),
  computed: {
    deleteDialogTitle() {
      return `Delete bucket '${this.selectedItem.bucketName}'?`;
    },
    deleteDialogText() {
      return `Please click 'Delete' to confirm that you want to delete bucket '${this.selectedItem.bucketName}'. Deleting the bucket will delete all child objects.`;
    }
  },
  created() {
    this.loadBuckets();
  },
  methods: {
    presentBucketDialog(selectedItem) {
      this.dialogBucket = { editing: false };
      if (selectedItem) {
        this.dialogBucket.bucketName = selectedItem.bucketName;
      }
      this.showCreateBucket = true;
    },
    presentDeleteDialog(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    deleteBucket(item) {
      this.showDialog = false;
      this.loading = true;
      this.$store
        .dispatch('deleteBucket', {
          name: encodeURIComponent(item.bucketName)
        })
        .then(() => {
          this.loading = false;
          this.loadBuckets();
        });
    },
    saveBucket() {
      this.$refs.observer
        .validate()
        .then(result => {
          if (result) {
            if (this.dialogBucket.editing === false) {
              this.$store
                .dispatch('createBucket', {
                  name: this.dialogBucket.bucketName
                })
                .then(result => {
                  this.loading = false;
                  if (!result.success) {
                    this.showError = true;
                    this.errorDialogTitle = 'Error creating bucket';
                    this.errorDialogText = result.errors.join(', ');
                  } else {
                    this.showCreateBucket = false;
                    this.loadBuckets();
                  }
                })
                .catch(error => {
                  console.error(`Error creating bucket: ${error}`);
                });
            } else {
              this.$store
                .dispatch('updateBucket', {
                  name: this.dialogBucket.bucketName
                })
                .then(result => {
                  this.loading = false;
                  if (result.error) {
                    this.showError = true;
                    this.errorDialogTitle = 'Error updating bucket';
                    this.errorDialogText = result.error;
                  } else {
                    this.showCreateBucket = false;
                    this.loadBuckets();
                  }
                })
                .catch(error => {
                  console.error(`Error updating bucket: ${error}`);
                });
            }
          }
        })
        .catch(error => {
          alert(`Validation failed: ${error}`);
        });
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
    loadBuckets() {
      this.loading = true;
      this.$store.dispatch('getBuckets', {}).then(response => {
        if (response.success) {
          this.buckets = response.data;
        } else {
          this.buckets = [];
        }
        this.loading = false;
      });
    },
    toLocalTime(str) {
      let d = new Date(str);
      return d.toLocaleString();
    },
    navigateToBucket(item) {
      UrlHelper.navigateToBucket(config.projectId, item.bucketName);
    }
  }
};
</script>
