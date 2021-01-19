<template>
  <v-card class="px-4">
    <v-card-title>Policies</v-card-title>
    <v-data-table
      :headers="headers"
      :items="policies"
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
          <v-btn color="primary" dark @click.stop="createPolicy()"
            >Create Policy</v-btn
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
      <template v-slot:item.createdAt="{ item }">
        {{ toLocalTime(item.createdAt) }}
      </template>
      <template v-slot:item.datasetAccess="{ item }">
        <v-chip-group multiple column active-class="primary--text">
          <v-chip v-for="tag in item.datasetAccess" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small v-on="on" class="mr-2" @click="editItem(item)">
              edit
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              v-on="on"
              class="mr-2"
              @click="presentDeleteDialog(item)"
            >
              delete
            </v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip
          top
          v-if="
            config.marketplaceIntegrationEnabled === true &&
              item.marketplace &&
              item.marketplace.solutionId &&
              item.marketplace.planId
          "
        >
          <template v-slot:activator="{ on }">
            <v-icon
              small
              v-on="on"
              class="mr-2"
              @click="navigateToMarketplace(item)"
            >
              {{ icons.marketplace }}
            </v-icon>
          </template>
          <span>Marketplace Page</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <Dialog
      v-if="showDialog"
      v-model="showDialog"
      :title="deleteDialogTitle"
      :text="deleteDialogText"
      v-on:confirmed="deletePolicy(selectedItem)"
      confirmButtonColor="red darken-1"
      confirmButtonText="Delete"
    />
    <v-dialog v-model="showCreatePolicy" persistent max-width="700px">
      <EditPolicy
        :key="componentKey"
        :policyData="selectedItem"
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
          @click="createPolicy()"
        >
          <v-icon>{{ icons.plus }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-card>
</template>

<script>
import Dialog from '@/components/Dialog.vue';
import EditPolicy from '@/components/EditPolicy';
import UrlHelper from '../urlHelper';
import { mdiPlus, mdiShopping } from '@mdi/js';
import _config from './../config';

export default {
  components: {
    Dialog,
    EditPolicy
  },
  data() {
    return {
      loading: false,
      componentKey: 0,
      policies: [],
      search: '',
      showDialog: false,
      showCreatePolicy: false,
      selectedItem: null,
      icons: {
        marketplace: mdiShopping,
        plus: mdiPlus
      }
    };
  },
  created() {
    this.loadPolicies();
  },
  computed: {
    config() {
      return _config;
    },
    headers() {
      let h = [
        { text: 'Name', value: 'name', tooltip: 'Name of the policy' },
        {
          text: 'Description',
          value: 'description',
          tooltip: 'Description of the policy'
        },
        {
          text: 'Account Usage',
          value: 'accountCount',
          tooltip: 'The # of accounts using this policy'
        }
      ];

      if (this.config.marketplaceIntegrationEnabled === true) {
        h.push(
          {
            text: 'Marketplace Solution',
            value: 'marketplace.solutionId',
            tooltip: 'The associated GCP Marketplace Solution Id'
          },
          {
            text: 'Marketplace Plan',
            value: 'marketplace.planId',
            tooltip: 'The associated GCP Marketplace Plan Id'
          }
        );
      }

      h.push(
        {
          text: 'Modified At',
          value: 'createdAt',
          tooltip: 'The last modified time for the policy'
        },
        {
          text: 'Modified By',
          value: 'createdBy',
          tooltip: 'The last user that modified the policy'
        },
        { text: '', value: 'action', sortable: false }
      );

      return h;
    },
    deleteDialogTitle() {
      return `Delete policy '${this.selectedItem.name}'?`;
    },
    deleteDialogText() {
      return `Please click 'Delete' to confirm that you want to delete policy '${this.selectedItem.name}'. Deleting the policy will revoke all associated account permissions.`;
    }
  },
  methods: {
    createPolicy() {
      this.componentKey += 1;
      this.selectedItem = null;
      this.showCreatePolicy = true;
    },
    editItem(item) {
      this.componentKey += 1;
      this.selectedItem = item;
      this.showCreatePolicy = true;
    },
    editCompleted(refresh) {
      this.selectedItem = null;
      this.showCreatePolicy = false;
      if (refresh) {
        this.loadPolicies();
      }
    },
    presentDeleteDialog(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    deletePolicy(item) {
      console.log(`Deleting item ${JSON.stringify(item)}`);
      this.loading = true;
      this.$store
        .dispatch('deletePolicy', {
          rowId: item.rowId,
          policyId: item.policyId
        })
        .then(() => {
          this.loadPolicies();
          this.loading = false;
        });
    },
    loadPolicies() {
      this.loading = true;
      this.$store.dispatch('getPolicies', {}).then(response => {
        if (response.success) {
          this.policies = response.data;
        } else {
          this.policies = [];
        }
        this.loading = false;
      });
    },
    toLocalTime(epoch) {
      let d = new Date(epoch);
      return d.toLocaleString();
    },
    navigateToMarketplace(item) {
      UrlHelper.navigateToMarketplace(
        this.config.projectId,
        item.marketplace.solutionId
      );
    }
  }
};
</script>
