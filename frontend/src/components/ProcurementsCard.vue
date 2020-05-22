<template>
  <v-card class="px-4">
    <v-card-title>Marketplace Procurement Requests</v-card-title>
    <v-data-table
      :headers="headers"
      :items="procurementRequests"
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
        </v-toolbar>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ toLocalTime(item.createdAt) }} </template
      ><template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              class="mr-2"
              color="red"
              @click="rejectItem(item)"
            >
              {{ icons.cancel }}
            </v-icon>
          </template>
          <span>Reject</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              class="mr-2"
              color="green"
              @click="approveItem(item)"
            >
              {{ icons.check }}
            </v-icon>
          </template>
          <span>Approve</span>
        </v-tooltip>
      </template>
    </v-data-table>
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
        v-if="showReviewProcurement"
        v-model="showReviewProcurement"
        persistent
        max-width="450"
      >
        <v-card>
          <v-card-title class="headline"
            >Review Procurement Request</v-card-title
          >
          <v-card-text v-html="selectedItemSummary"></v-card-text>
          <ValidationObserver ref="observer" v-slot="{}">
            <v-form class="px-4">
              <v-radio-group
                v-model="approvalDialogData.approvalStatus"
                :mandatory="false"
              >
                <v-radio label="Reject" value="reject" color="red"></v-radio>
                <v-radio
                  label="Approve"
                  value="approve"
                  color="green"
                ></v-radio>
              </v-radio-group>
              <ValidationProvider
                v-if="approvalDialogData.approvalStatus === 'approve'"
                v-slot="{ errors }"
                name="Accounts"
              >
                <v-text-field
                  v-model="approvalDialogData.accounts"
                  :error-messages="errors"
                  label="Accounts"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Comment"
                rules="required"
              >
                <v-textarea
                  v-model="approvalDialogData.comment"
                  :error-messages="errors"
                  label="Comment"
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
              @click.stop="closeApprovalDialog()"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click.stop="saveDataset"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import Vue from 'vue';

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

import { mdiCancel, mdiCheck } from '@mdi/js';
import Dialog from '@/components/Dialog.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Dialog
  },
  data: () => ({
    loading: false,
    componentKey: 0,
    showAccounts: false,
    procurementRequests: [],
    showError: false,
    showReviewProcurement: false,
    approvalDialogData: { approvalStatus: '', comment: '' },
    selectedItem: null,
    icons: {
      cancel: mdiCancel,
      check: mdiCheck
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100, 200],
    itemsPerPage: 50,
    headers: [
      { text: 'Solution Id', value: 'solutionId' },
      { text: 'Plan Id', value: 'planId' },
      { text: 'Requestor Account Id', value: 'accountId' },
      { text: 'Requested At', value: 'createdAt' },
      { text: '', value: 'action', sortable: false }
    ]
  }),
  created() {
    this.loadProcurementRequests();
  },
  computed: {
    selectedItemSummary() {
      return `<b>Solution Id</b>: ${this.selectedItem.solutionId}<br/>
      <b>Requestor Account Id</b>: ${this.selectedItem.accountId}<br/>
      <b>Requested At</b>: ${this.toLocalTime(this.selectedItem.createdAt)}`;
    }
  },
  methods: {
    resetApprovalDialogData() {
      this.approvalDialogData = {
        approvalStatus: '',
        comment: '',
        accounts: ''
      };
    },
    presentApprovalDialog(selectedItem, approvalStatus) {
      this.selectedItem = selectedItem;
      this.resetApprovalDialogData();
      this.approvalDialogData.approvalStatus = approvalStatus;
      this.showReviewProcurement = true;
    },
    closeApprovalDialog() {
      this.showReviewProcurement = false;
      this.selectedItem = null;
      this.resetApprovalDialogData();
    },
    saveDataset() {
      this.$refs.observer
        .validate()
        .then(result => {
          if (result) {
            console.log('Validation passed');
          }
          this.closeApprovalDialog();
        })
        .catch(error => {
          alert(`Validation failed: ${error}`);
        });
    },
    loadProcurementRequests() {
      this.loading = true;
      this.$store
        .dispatch('getProcurementRequests', {
          projectId: this.$store.state.settings.projectId
        })
        .then(response => {
          if (response.success) {
            this.procurementRequests = response.data;
          } else {
            this.procurementRequests = [];
          }
          this.loading = false;
        });
    },
    toLocalTime(epoch) {
      let d = new Date(0);
      d.setUTCMilliseconds(epoch);
      return d.toLocaleString();
    },
    approveItem(item) {
      console.log(`Approve called with item: ${JSON.stringify(item)}`);
      this.presentApprovalDialog(item, 'approve');
    },
    rejectItem(item) {
      console.log(`Reject called with item: ${JSON.stringify(item)}`);
      this.presentApprovalDialog(item, 'reject');
    }
  }
};
</script>
