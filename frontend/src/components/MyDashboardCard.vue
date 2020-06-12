<template>
  <v-card class="px-4">
    <v-card-title>My Products</v-card-title>
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
        </v-toolbar>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ toLocalTime(item.createdAt) }}
      </template>
      <template v-slot:item.datasets="{ item }">
        <v-chip-group multiple column active-class="primary--text">
          <v-chip
            v-for="dataset in item.datasets"
            :key="dataset.datasetId"
            @click="navigateToDataset(dataset.datasetId)"
          >
            {{ dataset.datasetId }}
          </v-chip>
        </v-chip-group>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mr-2" @click="navigateToMarketplace(item)">
              {{ icons.marketplace }}
            </v-icon>
          </template>
          <span>Marketplace Page</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mr-2" @click="viewPlan(item)">
              {{ icons.search }}
            </v-icon>
          </template>
          <span>Plan Details</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="showCreatePolicy" persistent max-width="700px">
      <EditPolicy
        :key="componentKey"
        :policyData="selectedItem"
        v-on:close="editCompleted(true)"
        v-on:cancel="editCompleted(false)"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import EditPolicy from '@/components/EditPolicy';
import { mdiShopping, mdiCardSearch } from '@mdi/js';

export default {
  components: {
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
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Marketplace Solution', value: 'marketplace.solutionId' },
        { text: 'Marketplace Plan', value: 'marketplace.planId' },
        { text: 'Datasets', value: 'datasets', sortable: false },
        { text: '', value: 'viewAction', sortable: false },
        { text: '', value: 'action', sortable: false }
      ],
      icons: {
        search: mdiCardSearch,
        marketplace: mdiShopping
      }
    };
  },
  created() {
    this.loadPolicies();
  },
  computed: {
    deleteDialogTitle() {
      return `Delete policy '${this.selectedItem.name}'?`;
    },
    deleteDialogText() {
      return `Please click 'Delete' to confirm that you want to delete policy '${this.selectedItem.name}'. Deleting the policy will revoke all associated account permissions.`;
    }
  },
  methods: {
    viewPlan(item) {
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
    loadPolicies() {
      this.loading = true;
      this.$store.dispatch('getUserProducts').then(response => {
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
      const url = `https://console.cloud.google.com/marketplace/details/${this.$store.state.settings.projectId}/${item.marketplace.solutionId}`;
      window.open(url, '_blank');
    },
    navigateToDataset(item) {
      const url = `https://console.cloud.google.com/bigquery?project=${this.$store.state.settings.projectId}&p=${this.$store.state.settings.projectId}&d=${item}`;
      window.open(url, '_blank');
    }
  }
};
</script>
