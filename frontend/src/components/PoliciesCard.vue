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
        <v-icon small class="mr-2" @click="editItem(item)">
          edit
        </v-icon>
        <v-icon small @click="presentDeleteDialog(item)">
          delete
        </v-icon>
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
import { mdiPlus } from '@mdi/js';

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
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Account Usage', value: 'accountCount' },
        { text: 'Modified At', value: 'createdAt' },
        { text: 'Modified By', value: 'createdBy' },
        // { text: 'Version', value: 'version' },
        { text: '', value: 'action', sortable: false }
      ],
      icons: {
        plus: mdiPlus
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
    }
  }
};
</script>
