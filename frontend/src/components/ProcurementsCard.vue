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
      <template v-slot:item.email="{ item }">
        {{ item.email || item.account }}
      </template>
      <template v-slot:item.createTime="{ item }">
        {{ toLocalTime(item.createTime) }}
      </template>
      <template v-slot:item.updateTime="{ item }">
        {{ toLocalTime(item.updateTime) }} </template
      ><template v-slot:item.action="{ item }">
        <v-tooltip top v-if="item.state !== 'ENTITLEMENT_CANCELLED'">
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
        <v-tooltip top v-if="item.state !== 'ENTITLEMENT_CANCELLED'">
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              class="mr-2"
              color="amber"
              @click="commentItem(item)"
            >
              {{ icons.comment }}
            </v-icon>
          </template>
          <span>Comment</span>
        </v-tooltip>
        <v-tooltip
          top
          v-if="
            item.activated === true &&
              item.state === 'ENTITLEMENT_ACTIVATION_REQUESTED'
          "
        >
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
                <v-radio
                  v-if="selectedItem.state !== 'ENTITLEMENT_CANCELLED'"
                  label="Reject"
                  value="reject"
                  color="red"
                ></v-radio>
                <v-radio
                  v-if="selectedItem.state !== 'ENTITLEMENT_CANCELLED'"
                  label="Comment"
                  value="comment"
                  color="amber"
                ></v-radio>
                <v-radio
                  v-if="
                    selectedItem.activated === true &&
                      selectedItem.state === 'ENTITLEMENT_ACTIVATION_REQUESTED'
                  "
                  label="Approve"
                  value="approve"
                  color="green"
                ></v-radio>
              </v-radio-group>
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
            <v-btn color="green darken-1" text @click.stop="submitApproval"
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

import { mdiCancel, mdiCheck, mdiCommentOutline } from '@mdi/js';
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
      check: mdiCheck,
      comment: mdiCommentOutline
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100, 200],
    itemsPerPage: 50,
    headers: [
      { text: 'Policy', value: 'policy.name' },
      { text: 'Product', value: 'product' },
      { text: 'Plan', value: 'plan' },
      { text: 'Entitlement Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Activated', value: 'activated' },
      { text: 'Status Message', value: 'messageToUser' },
      { text: 'State', value: 'state' },
      { text: 'Created At', value: 'createTime' },
      { text: 'Modified At', value: 'updateTime' },
      { text: '', value: 'action', sortable: false }
    ]
  }),
  created() {
    this.loadProcurementRequests();
  },
  computed: {
    selectedItemSummary() {
      return `<b>Product</b>: ${this.selectedItem.product}<br/>
      <b>Plan</b>: ${this.selectedItem.plan}<br/>
      <b>Account</b>: ${this.selectedItem.email ||
        this.selectedItem.account}<br/>
      <b>Created At</b>: ${this.toLocalTime(this.selectedItem.createTime)}`;
    }
  },
  methods: {
    resetApprovalDialogData() {
      this.approvalDialogData = {
        approvalStatus: '',
        comment: ''
      };
    },
    presentApprovalDialog(selectedItem, approvalStatus) {
      this.selectedItem = selectedItem;
      this.resetApprovalDialogData();
      this.approvalDialogData.approvalStatus = approvalStatus;
      this.approvalDialogData.comment = selectedItem.messageToUser;
      this.showReviewProcurement = true;
    },
    closeApprovalDialog() {
      this.showReviewProcurement = false;
      this.selectedItem = null;
      this.resetApprovalDialogData();
    },
    submitApproval() {
      this.$refs.observer
        .validate()
        .then(result => {
          if (result) {
            this.$store
              .dispatch('submitProcurementEntitlementApproval', {
                projectId: this.$store.state.settings.projectId,
                name: this.selectedItem.name,
                status: this.approvalDialogData.approvalStatus,
                reason: this.approvalDialogData.comment,
                accountId: this.selectedItem.accountId,
                policyId: this.selectedItem.policy.policyId
              })
              .then(result => {
                this.loading = false;
                if (!result.success) {
                  this.showError = true;
                  this.errorDialogTitle = 'Error setting approval state';
                  this.errorDialogText = result.errors.join(', ');
                } else {
                  this.showError = false;
                  this.loadProcurementRequests();
                  this.closeApprovalDialog();
                }
              })
              .catch(error => {
                console.error(`Error submitting approval change: ${error}`);
              });
          }
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
    toLocalTime(str) {
      let d = new Date(str);
      return d.toLocaleString();
    },
    rejectItem(item) {
      this.presentApprovalDialog(item, 'reject');
    },
    commentItem(item) {
      this.presentApprovalDialog(item, 'comment');
    },
    approveItem(item) {
      this.presentApprovalDialog(item, 'approve');
    }
  }
};
</script>
