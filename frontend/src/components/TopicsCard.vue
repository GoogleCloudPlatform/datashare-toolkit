<template>
  <v-card class="px-4">
    <v-card-title>Topics</v-card-title>
    <v-data-table
      :headers="headers"
      :items="topics"
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
          <v-btn color="primary" dark @click.stop="presentTopicDialog()"
            >Create Topic</v-btn
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
            <v-icon v-on="on" class="mr-2" @click="navigateToTopic(item)">
              {{ icons.dog }}
            </v-icon>
          </template>
          <span>View in Pub/Sub</span>
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
                >Delete Topic</v-list-item-title
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
      v-on:confirmed="deleteTopic(selectedItem)"
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
        v-if="showCreateTopic"
        v-model="showCreateTopic"
        persistent
        max-width="390"
      >
        <v-card>
          <v-card-title class="headline">{{
            !this.dialogTopic.editing ? 'Create Topic' : 'Edit Topic'
          }}</v-card-title>
          <ValidationObserver ref="observer" v-slot="{}">
            <v-form class="px-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Name"
                rules="required|pubSubNameRule"
              >
                <v-text-field
                  :readonly="dialogTopic.editing === true"
                  v-model="dialogTopic.topicId"
                  :error-messages="errors"
                  :counter="255"
                  label="Topic Id"
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
              @click.stop="showCreateTopic = false"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click.stop="saveTopic">{{
              !this.dialogTopic.editing ? 'Create' : 'Update'
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
          @click="presentTopicDialog()"
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

extend('pubSubNameRule', value => {
  // Must be 3-255 characters, start with a letter, and contain only the following characters:
  // letters, numbers, dashes (-), periods (.), underscores (_), tildes (~), percents (%) or plus signs (+).
  // Cannot start with goog.
  if (value.length < 3) {
    return `Topic name '${value}' is smaller than minimum allowable length of 3: ${value.length}}`;
  } else if (value.length > 255) {
    return `Topic name '${value}' exceeds maximum allowable length of 255: ${value.length}}`;
  } else if (!value.match(/^(?!goog)[A-Za-z]+[A-Za-z0-9\-._~%+]*$/g)) {
    return `Topic '${value}' name is invalid. Must be 3-255 characters, start with a letter, and contain only the following characters: letters, numbers, dashes (-), periods (.), underscores (_), tildes (~), percents (%) or plus signs (+). Cannot start with goog.`;
  }
  return true;
});

import {
  mdiBucketOutline,
  mdiDog,
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
    topics: [],
    showDialog: false,
    showError: false,
    showCreateTopic: false,
    dialogTopic: { editing: false },
    selectedItem: null,
    icons: {
      bucket: mdiBucketOutline,
      dog: mdiDog,
      dotsVertical: mdiDotsVertical,
      pencil: mdiPencil,
      plus: mdiPlus
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100, 200],
    itemsPerPage: 50,
    headers: [
      {
        text: 'Id',
        value: 'topicId',
        tooltip: 'The topic id'
      },
      {
        text: 'Name',
        value: 'topicName',
        tooltip: 'The topic name'
      },
      {
        text: 'View in Pub/Sub',
        value: 'viewAction',
        sortable: false,
        tooltip: 'View topic in the Pub/Sub console'
      },
      { text: '', value: 'action', sortable: false }
    ]
  }),
  computed: {
    deleteDialogTitle() {
      return `Delete topic '${this.selectedItem.topicId}'?`;
    },
    deleteDialogText() {
      return `Please click 'Delete' to confirm that you want to delete topic '${this.selectedItem.topicId}'.`;
    }
  },
  created() {
    this.loadTopics();
  },
  methods: {
    presentTopicDialog(selectedItem) {
      this.dialogTopic = { editing: false };
      if (selectedItem) {
        this.dialogTopic.topicId = selectedItem.topicId;
      }
      this.showCreateTopic = true;
    },
    presentDeleteDialog(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    deleteTopic(item) {
      this.showDialog = false;
      this.loading = true;
      this.$store
        .dispatch('deleteTopic', {
          topicId: encodeURIComponent(item.topicId)
        })
        .then(() => {
          this.loading = false;
          this.loadTopics();
        });
    },
    saveTopic() {
      this.$refs.observer
        .validate()
        .then(result => {
          if (result) {
            if (this.dialogTopic.editing === false) {
              this.$store
                .dispatch('createTopic', {
                  name: this.dialogTopic.topicId
                })
                .then(result => {
                  this.loading = false;
                  if (!result.success) {
                    this.showError = true;
                    this.errorDialogTitle = 'Error creating topic';
                    this.errorDialogText = result.errors.join(', ');
                  } else {
                    this.showCreateTopic = false;
                    this.loadTopics();
                  }
                })
                .catch(error => {
                  console.error(`Error creating topic: ${error}`);
                });
            } else {
              this.$store
                .dispatch('updateTopic', {
                  name: this.dialogTopic.topicId
                })
                .then(result => {
                  this.loading = false;
                  if (result.error) {
                    this.showError = true;
                    this.errorDialogTitle = 'Error updating topic';
                    this.errorDialogText = result.error;
                  } else {
                    this.showCreateTopic = false;
                    this.loadBuckets();
                  }
                })
                .catch(error => {
                  console.error(`Error updating topic: ${error}`);
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
    loadTopics() {
      this.loading = true;
      this.$store.dispatch('getTopics', {}).then(response => {
        if (response.success) {
          this.topics = response.data;
        } else {
          this.topics = [];
        }
        this.loading = false;
      });
    },
    toLocalTime(str) {
      let d = new Date(str);
      return d.toLocaleString();
    },
    navigateToTopic(item) {
      UrlHelper.navigateToTopic(config.projectId, item.topicId);
    }
  }
};
</script>
