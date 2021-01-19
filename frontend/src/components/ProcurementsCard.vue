<template>
  <v-card class="px-4">
    <v-card-title>Marketplace Procurement Requests</v-card-title>
    <v-data-table
      :headers="headers"
      :items="procurementRequests"
      :search="search"
      :loading="loading"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
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
          <v-select
            v-model="selectedEntitlementStates"
            :items="entitlementStates"
            item-text="name"
            item-value="value"
            :menu-props="{ maxHeight: '400' }"
            label="State"
            multiple
            hint="Procurement State filter"
            persistent-hint
            @change="entitlementStateChanged"
          ></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="primary" dark @click.stop="loadProcurementRequests()"
            ><v-icon>{{ icons.refresh }}</v-icon></v-btn
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
      <template v-slot:item.email="{ item }">
        {{ item.email || item.account }}
      </template>
      <template v-slot:item.createTime="{ item }">
        {{ toLocalTime(item.createTime) }}
      </template>
      <template v-slot:item.updateTime="{ item }">
        {{ toLocalTime(item.updateTime) }} </template
      ><template v-slot:item.action="{ item }">
        <v-tooltip
          top
          v-if="
            item.state === 'ENTITLEMENT_ACTIVATION_REQUESTED' ||
              item.state === 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL'
          "
        >
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
        <v-tooltip top v-if="item.state === 'ENTITLEMENT_ACTIVATION_REQUESTED'">
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
              (item.state === 'ENTITLEMENT_ACTIVATION_REQUESTED' ||
                item.state === 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL')
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
                  v-if="
                    selectedItem.state !== 'ENTITLEMENT_CANCELLED' &&
                      selectedItem.state !==
                        'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL'
                  "
                  label="Comment"
                  value="comment"
                  color="amber"
                ></v-radio>
                <v-radio
                  v-if="
                    selectedItem.activated === true &&
                      (selectedItem.state ===
                        'ENTITLEMENT_ACTIVATION_REQUESTED' ||
                        selectedItem.state ===
                          'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL')
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
                v-if="
                  approvalDialogData.approvalStatus == 'comment' ||
                    approvalDialogData.approvalStatus == 'reject'
                "
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

import config from './../config';
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

import { mdiCancel, mdiCheck, mdiCommentOutline, mdiRefresh } from '@mdi/js';
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
      comment: mdiCommentOutline,
      refresh: mdiRefresh
    },
    search: '',
    itemsPerPageOptions: [20, 50, 100, 200],
    itemsPerPage: 50,
    headers: [
      {
        text: 'Policy',
        value: 'policy.name',
        tooltip: 'The policy name associated to the procurement request'
      },
      {
        text: 'Product',
        value: 'product',
        tooltip: 'The GCP Marketplace Solution Id'
      },
      {
        text: 'Plan',
        value: 'plan',
        tooltip: 'The GCP Marketplace Plan Id that was subscribed to'
      },
      {
        text: 'New Pending Plan',
        value: 'newPendingPlan',
        tooltip:
          'The GCP Marketplace Pending Plan Id in the event that user has requested a plan change'
      },
      {
        text: 'Entitlement Name',
        value: 'name',
        tooltip: 'The Cloud Commerce Procurement entitlement resource name'
      },
      {
        text: 'Email',
        value: 'email',
        tooltip: 'The email address of the subscriber'
      },
      {
        text: 'User Activated',
        value: 'activated',
        tooltip:
          'Indicates it he subscriber has performed the registration and activation steps'
      },
      {
        text: 'Message to User',
        value: 'messageToUser',
        tooltip: 'Provider-supplied message that is displayed to the subscriber'
      },
      { text: 'State', value: 'state', tooltip: 'The state of the request' },
      {
        text: 'Created At',
        value: 'createTime',
        tooltip: 'The created time for the request'
      },
      {
        text: 'Modified At',
        value: 'updateTime',
        tooltip: 'The last modified time for the request'
      },
      { text: '', value: 'action', sortable: false }
    ],
    entitlementStates: [
      {
        name: 'Activation Requested',
        value: 'ENTITLEMENT_ACTIVATION_REQUESTED'
      },
      {
        name: 'Active',
        value: 'ENTITLEMENT_ACTIVE'
      },
      {
        name: 'Pending Cancellation',
        value: 'ENTITLEMENT_PENDING_CANCELLATION'
      },
      {
        name: 'Cancelled',
        value: 'ENTITLEMENT_CANCELLED'
      },
      {
        name: 'Pending Plan Change',
        value: 'ENTITLEMENT_PENDING_PLAN_CHANGE'
      },
      {
        name: 'Pending Plan Change Approval',
        value: 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL'
      },
      {
        name: 'Suspended',
        value: 'ENTITLEMENT_SUSPENDED'
      }
    ],
    selectedEntitlementStates: [
      'ENTITLEMENT_ACTIVATION_REQUESTED',
      'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL'
    ],
    sortBy: 'updateTime',
    sortDesc: true
  }),
  created() {
    this.loadProcurementRequests();
  },
  computed: {
    selectedItemSummary() {
      return `<b>Product</b>: ${this.selectedItem.product}<br/>
      <b>Plan</b>: ${this.selectedItem.plan}<br/>
      <b>New Pending Plan</b>: ${this.selectedItem.newPendingPlan}<br/>
      <b>Account</b>: ${this.selectedItem.email ||
        this.selectedItem.account}<br/>
      <b>Created At</b>: ${this.toLocalTime(this.selectedItem.createTime)}`;
    },
    entitlementStateStringFilter() {
      if (this.selectedEntitlementStates.length > 0) {
        return this.selectedEntitlementStates.join(',');
      }
      return null;
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
            let policyId = this.selectedItem.policy
              ? this.selectedItem.policy.policyId
              : null;
            this.$store
              .dispatch('submitProcurementEntitlementApproval', {
                projectId: config.projectId,
                name: this.selectedItem.name,
                status: this.approvalDialogData.approvalStatus,
                reason: this.approvalDialogData.comment
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
          projectId: config.projectId,
          stateFilter: this.entitlementStateStringFilter
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
    },
    entitlementStateChanged() {
      this.loadProcurementRequests();
    }
  }
};
</script>
