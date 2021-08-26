<template>
  <v-card class="px-4">
    <v-card-title>Accounts</v-card-title>
    <v-card-subtitle v-if="this.datasetId">{{
      this.datasetId
    }}</v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="entitlements"
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
          <v-divider
            v-if="showAddAccountButton"
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-btn
            v-if="showAddAccountButton"
            color="primary"
            dark
            @click.stop="addAccount"
            >Add Account</v-btn
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
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ toLocalTime(item.createdAt) }}
      </template>
      <template v-slot:[`item.policies`]="{ item }">
        <v-chip-group max="0" multiple column active-class="primary--text">
          <v-chip
            v-for="policy in item.policies.slice(0, 4)"
            :key="policy.policyId"
            :color="chipColor(policy)"
            :text-color="chipTextColor(policy)"
          >
            {{ policy.name }}
          </v-chip>
          <v-chip
            v-if="item.policies.length > 4 && showAddAccountButton"
            @click="editItem(item)"
          >
            ...
          </v-chip>
          <v-chip v-else-if="item.policies.length > 4">
            ...
          </v-chip>
        </v-chip-group>
      </template>
      <template
        v-if="this.showAddAccountButton"
        v-slot:[`item.action`]="{ item }"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small class="mr-2" @click="editItem(item)">
              edit
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small class="mr-2" @click="deleteItem(item)">
              delete
            </v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip top v-if="config.marketplaceIntegrationEnabled === true">
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              v-if="
                item.marketplaceActivated === true &&
                  item.marketplaceSynced === false
              "
              small
              @click="syncMarketplaceItem(item)"
            >
              {{ icons.sync }}
            </v-icon>
          </template>
          <span>Sync Marketplace Entitlements</span>
        </v-tooltip>
        <v-tooltip top v-if="config.marketplaceIntegrationEnabled === true">
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              v-if="item.marketplaceActivated === true"
              small
              @click="resetItem(item)"
            >
              {{ icons.reset }}
            </v-icon>
          </template>
          <span>Reset Marketplace Account</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="showCreateAccount" persistent max-width="700px">
      <EditAccount
        :key="componentKey"
        :userData="selectedItem"
        v-on:close="editCompleted(true)"
        v-on:cancel="editCompleted(false)"
      />
    </v-dialog>
    <Dialog
      v-if="showDeleteDialog"
      v-model="showDeleteDialog"
      :title="deleteDialogTitle"
      :text="deleteDialogText"
      v-on:confirmed="deleteAccount(selectedItem)"
      v-on:canceled="deleteCompleted"
      confirmButtonColor="red darken-1"
      confirmButtonText="Delete"
    />
    <Dialog
      v-if="showResetDialog"
      v-model="showResetDialog"
      :title="resetDialogTitle"
      :text="resetDialogText"
      v-on:confirmed="resetAccount(selectedItem)"
      v-on:canceled="resetCompleted"
      confirmButtonColor="red darken-1"
      confirmButtonText="Reset"
    />
    <Dialog
      v-if="showMarketplaceSyncDialog"
      v-model="showMarketplaceSyncDialog"
      :title="marketplaceSyncDialogTitle"
      :text="marketplaceSyncDialogText"
      v-on:confirmed="syncMarketplace(selectedItem)"
      v-on:canceled="syncMarketplaceCompleted"
      confirmButtonColor="red darken-1"
      confirmButtonText="Sync"
    />
    <v-card-text
      style="height: 100px; position: relative"
      v-if="showAddAccountButton"
    >
      <v-fab-transition>
        <v-btn
          color="pink"
          dark
          absolute
          bottom
          right
          fab
          @click="addAccount()"
        >
          <v-icon>{{ icons.plus }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-card>
</template>

<script>
import EditAccount from '@/components/EditAccount';
import Dialog from '@/components/Dialog.vue';
import _config from './../config';
import {
  mdiChevronRight,
  mdiForward,
  mdiDotsVertical,
  mdiPlus,
  mdiReplay,
  mdiSync
} from '@mdi/js';

export default {
  components: {
    EditAccount,
    Dialog
  },
  props: {
    selectedDataset: Object
  },
  data() {
    return {
      showAddAccountButton: true,
      entitlements: [],
      componentKey: 0,
      loading: false,
      selectedItem: null,
      selectedItems: [],
      icons: {
        chevronRight: mdiChevronRight,
        forward: mdiForward,
        verticalDots: mdiDotsVertical,
        plus: mdiPlus,
        reset: mdiReplay,
        sync: mdiSync
      },
      search: '',
      showCreateAccount: false,
      showDeleteDialog: false,
      showResetDialog: false,
      showMarketplaceSyncDialog: false
    };
  },
  computed: {
    config() {
      return _config;
    },
    datasetId() {
      if (this.selectedDataset && this.selectedDataset.datasetId) {
        return this.selectedDataset.datasetId;
      }
      return null;
    },
    headers() {
      let h = [
        { text: 'Email', value: 'email', tooltip: 'The account email address' },
        {
          text: 'Email Type',
          value: 'emailType',
          tooltip: 'The email type of the account'
        },
        {
          text: 'Policies',
          value: 'policies',
          tooltip: 'The policies that the account is entitled to'
        },
        {
          text: 'Policy Search String',
          value: 'policySearchString',
          align: ' d-none'
        }
      ];

      if (!this.selectedDataset) {
        if (this.config.marketplaceIntegrationEnabled === true) {
          h.push(
            {
              text: 'Marketplace Activated',
              value: 'marketplaceActivated',
              tooltip:
                'Indicates if the account has been activated with Datashare via GCP Marketplace'
            },
            {
              text: 'Marketplace In Sync',
              value: 'marketplaceSynced',
              tooltip:
                'Indicates if the Datashare policies a user is entitled to are in sync with the entitlements they have purchased in GCP Marketplace'
            }
          );
        }
        h.push(
          {
            text: 'Modified At',
            value: 'createdAt',
            tooltip: 'The last modified time for the account'
          },
          {
            text: 'Modified By',
            value: 'createdBy',
            tooltip: 'The last user that modified the account'
          },
          { text: '', value: 'action', sortable: false }
        );
      }

      return h;
    },
    deleteDialogTitle() {
      return 'Delete accounts?';
    },
    deleteDialogText() {
      return `Please click 'Delete' to confirm that you want to delete the selected account.`;
    },
    resetDialogTitle() {
      return 'Reset marketplace account?';
    },
    resetDialogText() {
      return `Please click 'Reset' to confirm that you want to delete the marketplace account(s) for ${this.selectedItem.email}.`;
    },
    marketplaceSyncDialogTitle() {
      return 'Sync marketplace entitlements?';
    },
    marketplaceSyncDialogText() {
      return `Please click 'Sync' to confirm that you want to sync marketplace entitlements for ${this.selectedItem.email}.`;
    }
  },
  created() {
    if (this.selectedDataset) {
      this.showAddAccountButton = false;
    } else if (this.$route.query.datasetId) {
      // eslint-disable-next-line vue/no-mutating-props
      this.selectedDataset = { datasetId: this.$route.query.datasetId };
    }
    this.loadAccounts();
  },
  methods: {
    addAccount() {
      this.componentKey += 1;
      this.selectedItem = null;
      this.selectedItems = [];
      this.showCreateAccount = true;
    },
    editItem(item) {
      this.componentKey += 1;
      this.selectedItem = item;
      this.showCreateAccount = true;
    },
    deleteCompleted() {
      this.selectedItem = null;
      this.selectedItems = [];
      this.showDeleteDialog = false;
    },
    editCompleted(refresh) {
      this.selectedItem = null;
      this.selectedItems = [];
      this.showCreateAccount = false;
      if (refresh) {
        this.loadAccounts();
      }
    },
    deleteItem(item) {
      this.selectedItem = item;
      this.selectedItems = [item];
      this.showDeleteDialog = true;
    },
    deleteItems() {
      this.showDeleteDialog = true;
    },
    loadAccounts() {
      this.loading = true;
      this.$store
        .dispatch('getAccounts', {
          datasetId: this.datasetId
        })
        .then(response => {
          if (response.success) {
            let data = response.data;
            data.forEach(function(element) {
              if (element.policies && element.policies.length > 0) {
                element.policies.sort((x, y) => {
                  return x.marketplaceEntitlementActive ===
                    y.marketplaceEntitlementActive
                    ? 0
                    : x.marketplaceEntitlementActive
                    ? 1
                    : -1;
                });
                element.policySearchString = element.policies
                  .map(e => e.name)
                  .join('');
              } else {
                element.policySearchString = null;
              }
            });
            this.entitlements = data;
          } else {
            this.entitlements = [];
          }
          this.loading = false;
        });
    },
    deleteAccount(item) {
      this.loading = true;
      this.$store
        .dispatch('deleteAccount', {
          rowId: item.rowId,
          accountId: item.accountId
        })
        .then(() => {
          this.loadAccounts();
          this.loading = false;
        });
    },
    resetItem(item) {
      this.selectedItem = item;
      this.showResetDialog = true;
    },
    resetCompleted() {
      this.showResetDialog = false;
      this.selectedItem = null;
    },
    resetAccount() {
      this.$store
        .dispatch('submitProcurementAccountReset', {
          projectId: this.config.projectId,
          accountId: this.selectedItem.accountId
        })
        .then(result => {
          this.loading = false;
          if (!result.success) {
            this.showError = true;
            this.errorDialogTitle = 'Error resetting accounts';
            this.errorDialogText = result.errors.join(', ');
          } else {
            this.showError = false;
            this.loadAccounts();
            this.resetCompleted();
          }
        })
        .catch(error => {
          console.error(`Error submitting approval change: ${error}`);
        });
    },
    syncMarketplaceItem(item) {
      this.selectedItem = item;
      this.showMarketplaceSyncDialog = true;
    },
    syncMarketplaceCompleted() {
      this.showMarketplaceSyncDialog = false;
      this.selectedItem = null;
    },
    syncMarketplace() {
      this.$store
        .dispatch('syncMarketplaceEntitlements', {
          projectId: this.config.projectId,
          accountId: this.selectedItem.accountId
        })
        .then(result => {
          this.loading = false;
          if (!result.success) {
            this.showError = true;
            this.errorDialogTitle = 'Error syncing marketplace entitlements';
            this.errorDialogText = result.errors.join(', ');
          } else {
            this.showError = false;
            this.loadAccounts();
            this.syncMarketplaceCompleted();
          }
        })
        .catch(error => {
          console.error(`Error syncing marketplace entitlements: ${error}`);
        });
    },
    toLocalTime(epoch) {
      let d = new Date(epoch);
      return d.toLocaleString();
    },
    chipColor(policy) {
      if (
        this.config.marketplaceIntegrationEnabled === true &&
        this.marketplaceActivated(policy) === true
      ) {
        if (policy.marketplaceEntitlementActive === true) {
          return 'green';
        } else {
          return 'orange';
        }
      }
      return '';
    },
    chipTextColor(policy) {
      if (
        this.config.marketplaceIntegrationEnabled === true &&
        this.marketplaceActivated(policy) === true
      ) {
        if (policy.marketplaceEntitlementActive === true) {
          return 'white';
        } else {
          return '';
        }
      }
      return '';
    },
    marketplaceActivated(policy) {
      if (
        policy.solutionId &&
        policy.planId &&
        policy.solutionId.length > 0 &&
        policy.planId.length > 0
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>
