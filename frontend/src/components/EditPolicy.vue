<template>
  <v-card>
    <v-card-title v-if="policy.policyId">
      Edit Policy
    </v-card-title>
    <v-card-title v-else>
      Create Policy
    </v-card-title>
    <v-card-subtitle v-if="policy.policyId">{{
      policy.policyId
    }}</v-card-subtitle>
    <form class="px-4">
      <ValidationObserver ref="policyFormObserver" v-slot="{}">
        <ValidationProvider
          v-slot="{ errors }"
          name="Policy Name"
          rules="required"
        >
          <v-text-field
            v-model="policy.name"
            :error-messages="errors"
            label="Policy Name"
            required
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Description"
          rules="required"
        >
          <v-textarea
            v-model="policy.description"
            :error-messages="errors"
            label="Description"
            required
          ></v-textarea>
        </ValidationProvider>
        <v-radio-group
          v-model="policy.isTableBased"
          row
          @change="accessTypeChanged"
        >
          <v-radio label="Dataset-based Access" :value="false"></v-radio>
          <v-radio label="Table-based Access" :value="true"></v-radio>
        </v-radio-group>
        <v-expansion-panels multiple v-model="panel">
          <v-expansion-panel v-if="!policy.isTableBased">
            <v-expansion-panel-header>Dataset Access</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                dense
                :headers="datasetHeaders"
                :items="policy.datasets"
                item-key="datasetId"
                :search="datasetSearch"
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
                  <v-toolbar flat color="white">
                    <v-text-field
                      class="mb-4"
                      width="40px"
                      v-model="datasetSearch"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click.stop="showAddDatasetDialog"
                      >Add Dataset</v-btn
                    >
                  </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon small @click="deleteDataset(item)">
                    delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel v-else>
            <v-expansion-panel-header>Table Access</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                dense
                :headers="tableHeaders"
                :items="formattedTables"
                :search="tableSearch"
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
                  <v-toolbar flat color="white">
                    <v-text-field
                      class="mb-4"
                      width="40px"
                      v-model="tableSearch"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click.stop="showAddTableDialog"
                      >Add Table</v-btn
                    >
                  </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon small @click="deleteTable(item)">
                    delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Row Access</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                dense
                :headers="tagHeaders"
                :items="policy.rowAccessTags"
                :search="rowAccessSearch"
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
                  <v-toolbar flat color="white">
                    <v-text-field
                      class="mb-4"
                      width="40px"
                      v-model="rowAccessSearch"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click.stop="showAddRowTagDialog"
                      >Add Row Tag</v-btn
                    >
                  </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon small @click="deleteRowTag(item)">
                    delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Marketplace</v-expansion-panel-header>
            <v-expansion-panel-content>
              <ValidationProvider
                v-slot="{ errors }"
                name="solutionId"
                rules="solution:@planId"
              >
                <v-text-field
                  v-model="policy.marketplace.solutionId"
                  :error-messages="errors"
                  label="Solution Id"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="planId"
                rules="plan:@solutionId"
              >
                <v-text-field
                  v-model="policy.marketplace.planId"
                  :error-messages="errors"
                  label="Plan Id"
                ></v-text-field>
              </ValidationProvider>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel v-if="editMode">
            <v-expansion-panel-header>Account Access</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                dense
                :headers="userHeaders"
                :items="accounts"
                :search="accountSearch"
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
                  <v-text-field
                    class="mb-4"
                    v-model="accountSearch"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    edit
                  </v-icon>
                  <v-icon small @click="deleteItem(item)">
                    delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </ValidationObserver>
    </form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="blue darken-1" @click.stop="cancel">Cancel</v-btn>
      <v-btn text color="green darken-1" class="mr-4" @click.stop="submit"
        >Save</v-btn
      >
    </v-card-actions>
    <v-row justify="center">
      <v-dialog
        v-show="showAddDataset"
        v-model="showAddDataset"
        persistent
        max-width="390"
      >
        <v-card>
          <v-card-title class="headline">Add Dataset</v-card-title>
          <ValidationObserver ref="datasetFormObserver" v-slot="{}">
            <v-form class="px-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Dataset Id"
                rules="required"
              >
                <v-select
                  :items="nonSelectedDatasets"
                  item-text="datasetId"
                  item-value="datasetId"
                  v-model="newDatasetId"
                  :error-messages="errors"
                  label="Dataset Id"
                  required
                ></v-select>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.stop="cancelDataset"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click.stop="addDataset"
              >Add</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-show="showAddTable"
        v-model="showAddTable"
        persistent
        max-width="390"
      >
        <v-card>
          <v-card-title class="headline">Add Table</v-card-title>
          <ValidationObserver ref="tableFormObserver" v-slot="{}">
            <v-form class="px-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Dataset Id"
                rules="required"
              >
                <v-select
                  :items="datasetsForTables"
                  item-text="datasetId"
                  item-value="datasetId"
                  v-model="newDatasetId"
                  :error-messages="errors"
                  label="Dataset Id"
                  required
                  @change="sourceDatasetChanged"
                ></v-select>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Table Id"
                rules="required"
              >
                <v-select
                  :items="nonSelectedTables"
                  item-text="tableId"
                  item-value="tableId"
                  v-model="newTableId"
                  :error-messages="errors"
                  label="Table Id"
                  required
                ></v-select>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.stop="cancelTable"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click.stop="addTable"
              >Add</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        ref="addRowTagForm"
        v-show="showAddRowTag"
        v-model="showAddRowTag"
        persistent
        max-width="390"
      >
        <v-card>
          <v-card-title class="headline">Add Row Access Tag</v-card-title>
          <ValidationObserver ref="rowAccessTagFormObserver" v-slot="{}">
            <v-form class="px-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Row Tag"
                rules="required"
              >
                <v-text-field
                  v-model="newRowTag"
                  :error-messages="errors"
                  label="Row Tag"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.stop="cancelRowTag"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click.stop="addRowTag"
              >Add</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <Dialog
      v-if="showError"
      v-model="showError"
      :title="errorDialogTitle"
      :text="errorDialogText"
      :cancelButtonEnabled="false"
      v-on:confirmed="showError = false"
    />
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

extend('plan', {
  params: ['target'],
  validate(value, { target }) {
    if (isPopulated(value) && !isPopulated(target)) {
      return false;
    } else if (!isPopulated(value) && isPopulated(target)) {
      return false;
    }
    return true;
  },
  message: 'You must provide a solutionId if a planId is provided'
});

extend('solution', {
  params: ['target'],
  validate(value, { target }) {
    if (isPopulated(value) && !isPopulated(target)) {
      return false;
    } else if (!isPopulated(value) && isPopulated(target)) {
      return false;
    }
    return true;
  },
  message: 'You must provide a planId if a solutionId is provided'
});

function isPopulated(value) {
  return value !== null && value !== undefined && value.trim() !== '';
}

import Dialog from '@/components/Dialog.vue';

Array.prototype.diff = function(a, key) {
  return this.filter(function(i) {
    // return a.indexOf(i) < 0;
    return a.find(element => element[key] != i[key]);
  });
};

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Dialog
  },
  props: {
    policyData: Object
  },
  data: () => ({
    editMode: false,
    showAddDataset: false,
    showAddTable: false,
    showAddRowTag: false,
    newDatasetId: null,
    newTableId: null,
    newRowTag: null,
    showError: false,
    panel: [0],
    id: null,
    accounts: [],
    policy: {
      rowId: null,
      policyId: null,
      name: null,
      description: null,
      isTableBased: false,
      datasets: [],
      rowAccessTags: [],
      initialDatasets: [],
      initialRowAccessTags: [],
      marketplace: { solutionId: null, planId: null }
    },
    datasetSearch: '',
    tableSearch: '',
    accountSearch: '',
    rowAccessSearch: '',
    componentKey: 0,
    referenceData: {
      datasets: [],
      tables: []
    },
    loading: false
  }),
  created() {
    this.loadDatasets();
    if (this.policyData) {
      this.editMode = true;
      this.policy.policyId = this.policyData.policyId;
      this.loadPolicy();
      this.loadPolicyAccounts();
    } else if (this.$route.query.policyId) {
      this.editMode = true;
      this.policy.policyId = this.$route.query.policyId;
      this.loadPolicy();
      this.loadPolicyAccounts();
    } else {
      this.policy.policyId = null;
    }
  },
  computed: {
    datasetHeaders() {
      let h = [
        { text: 'Dataset Id', value: 'datasetId' },
        { text: '', value: 'action', sortable: false }
      ];
      return h;
    },
    tableHeaders() {
      let h = [
        { text: 'Dataset Id', value: 'datasetId' },
        { text: 'Table Id', value: 'tableId' },
        { text: '', value: 'action', sortable: false }
      ];
      return h;
    },
    formattedTables() {
      let result = [];
      if (this.policy.datasets && this.policy.datasets.length > 0) {
        this.policy.datasets.forEach(d => {
          if (d.tables && d.tables.length > 0) {
            d.tables.forEach(t => {
              result.push({ datasetId: d.datasetId, tableId: t.tableId });
            });
          }
        });
      }
      return result;
    },
    tagHeaders() {
      let h = [
        { text: 'Tag', value: 'tag' },
        { text: '', value: 'action', sortable: false }
      ];
      return h;
    },
    userHeaders() {
      let h = [
        { text: 'Email', value: 'email' },
        { text: 'Email Type', value: 'emailType' }
      ];
      return h;
    },
    nonSelectedDatasets() {
      let d = [];
      this.referenceData.datasets.forEach(item => {
        const found = this.policy.datasets.find(
          element => element.datasetId === item.datasetId
        );
        if (!found) {
          d.push(item);
        }
      });
      return d.sort(function(a, b) {
        return a.datasetId
          .toLowerCase()
          .localeCompare(b.datasetId.toLowerCase());
      });
    },
    datasetsForTables() {
      let d = this.referenceData.datasets;
      return d.sort(function(a, b) {
        return a.datasetId
          .toLowerCase()
          .localeCompare(b.datasetId.toLowerCase());
      });
    },
    nonSelectedTables() {
      let datasetId = this.newDatasetId;
      const ds = this.policy.datasets.find(e => e.datasetId === datasetId);
      let t = [];
      if (!ds || !ds.tables) {
        t = this.referenceData.tables;
      } else if (
        this.referenceData.tables &&
        this.referenceData.tables.length > 0
      ) {
        this.referenceData.tables.forEach(item => {
          const found = ds.tables.find(e => e.tableId === item.tableId);
          if (!found) {
            t.push(item);
          }
        });
      }
      return t.sort(function(a, b) {
        return a.tableId.toLowerCase().localeCompare(b.tableId.toLowerCase());
      });
    },
    policyDatasets() {
      let d = [];
      this.policy.datasets.forEach(dataset => {
        d.push({ datasetId: dataset });
      });
      return d;
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$refs.policyFormObserver.validate().then(result => {
        if (result) {
          let addedDatasets = this.policy.datasets.diff(
            this.policy.initialDatasets,
            'datasetId'
          );
          let removedDatasets = this.policy.initialDatasets.diff(
            this.policy.datasets,
            'datasetId'
          );
          console.log(`Added datasets: ${JSON.stringify(addedDatasets)}`);
          console.log(`Removed datasets: ${JSON.stringify(removedDatasets)}`);
          if (addedDatasets.length === 0 && removedDatasets.length === 0) {
            console.log('No dataset changes made');
          } else {
            console.log('Dataset update required');
          }

          let addedRowTags = this.policy.rowAccessTags.diff(
            this.policy.initialRowAccessTags,
            'tag'
          );
          let removedRowTags = this.policy.initialRowAccessTags.diff(
            this.policy.rowAccessTags,
            'tag'
          );
          console.log(`Added tags: ${JSON.stringify(addedRowTags)}`);
          console.log(`Removed tags: ${JSON.stringify(removedRowTags)}`);
          if (addedRowTags.length === 0 && removedRowTags.length === 0) {
            console.log('No row tag changes made');
          } else {
            console.log('Row tag update required');
          }

          this.loading = true;
          let data = {};
          if (!this.policyData) {
            // New account
            data = {
              name: this.policy.name,
              description: this.policy.description,
              isTableBased: this.policy.isTableBased,
              datasets: this.policy.datasets,
              rowAccessTags: this.policy.rowAccessTags.map(t => t.tag)
            };
          } else {
            // Existing account
            data = {
              rowId: this.policy.rowId,
              policyId: this.policy.policyId,
              name: this.policy.name,
              description: this.policy.description,
              isTableBased: this.policy.isTableBased,
              datasets: this.policy.datasets,
              rowAccessTags: this.policy.rowAccessTags.map(t => t.tag)
            };
          }

          if (
            this.policy.marketplace &&
            this.policy.marketplace.solutionId &&
            this.policy.marketplace.planId
          ) {
            data.marketplace = {
              solutionId: this.policy.marketplace.solutionId,
              planId: this.policy.marketplace.planId
            };
          }

          this.$store.dispatch('savePolicy', data).then(result => {
            this.loading = false;
            if (!result.success) {
              this.errorDialogTitle = 'Error saving policy';
              this.errorDialogText = result.errors.join(', ');
              this.showError = true;
            } else {
              // Success
              this.$emit('close');
            }
          });
        }
      });
    },
    loadDatasets() {
      this.loading = true;
      this.$store
        .dispatch('getDatasets', {
          labelKey: 'cds_managed'
        })
        .then(response => {
          if (response.success) {
            this.referenceData.datasets = response.data;
          } else {
            this.referenceData.datasets = [];
          }
          this.loading = false;
        });
    },
    sourceDatasetChanged() {
      this.newTableId = null;
      return this.loadTables(this.newDatasetId);
    },
    loadTables(datasetId) {
      this.loading = true;
      return this.$store
        .dispatch('getTables', {
          datasetId: datasetId
        })
        .then(response => {
          if (response.success) {
            this.referenceData.tables = response.data;
          } else {
            this.referenceData.tables = [];
          }
          this.loading = false;
        });
    },
    loadPolicy() {
      this.loading = true;
      this.$store
        .dispatch('getPolicy', {
          policyId: this.policy.policyId
        })
        .then(response => {
          if (response.success) {
            const p = response.data;
            this.policy.rowId = p.rowId;
            this.policy.policyId = p.policyId;
            this.policy.name = p.name;
            this.policy.description = p.description;
            this.policy.isTableBased = p.isTableBased || false;
            this.policy.datasets = p.datasets;
            this.policy.rowAccessTags = p.rowAccessTags;
            this.policy.initialDatasets = p.datasets;
            this.policy.initialRowAccessTags = p.rowAccessTags;

            if (p.marketplace) {
              this.policy.marketplace = p.marketplace;
            } else {
              this.policy.marketplace = { solutionId: '', planId: '' };
            }
          }
          this.loading = false;
        });
    },
    loadPolicyAccounts() {
      this.loading = true;
      this.$store
        .dispatch('getPolicyAccounts', {
          policyId: this.policy.policyId
        })
        .then(response => {
          if (response.success) {
            this.accounts = response.data;
          } else {
            this.accounts = [];
          }
          this.loading = false;
        });
    },
    showAddDatasetDialog() {
      this.componentKey += 1;
      this.showAddDataset = true;
    },
    showAddTableDialog() {
      this.componentKey += 1;
      this.showAddTable = true;
    },
    addDataset() {
      this.$refs.datasetFormObserver.validate().then(result => {
        if (result) {
          this.policy.datasets.push({
            datasetId: this.newDatasetId
          });
          this.showAddDataset = false;
          this.newDatasetId = null;
        }
      });
    },
    cancelDataset() {
      this.showAddDataset = false;
      this.newDatasetId = null;
    },
    deleteDataset(item) {
      const index = this.policy.datasets.indexOf(item);
      if (index > -1) {
        this.policy.datasets.splice(index, 1);
      }
    },
    addTable() {
      this.$refs.tableFormObserver.validate().then(result => {
        if (result) {
          let ds = this.policy.datasets.find(
            e => e.datasetId === this.newDatasetId
          );
          if (!ds) {
            ds = { datasetId: this.newDatasetId, tables: [] };
            this.policy.datasets.push(ds);
          } else {
            if (!ds.tables) {
              ds.tables = [];
            }
          }
          let t = ds.tables.find(e => e.tableId === this.newTableId);
          if (!t) {
            ds.tables.push({ tableId: this.newTableId });
          }
          this.showAddTable = false;
          this.newDatasetId = null;
          this.newTableId = null;
        }
      });
    },
    deleteTable(item) {
      let datasetId = item.datasetId;
      let tableId = item.tableId;
      const ds = this.policy.datasets.find(e => e.datasetId === datasetId);
      const dsIndex = this.policy.datasets.indexOf(ds);
      if (ds) {
        let tb = ds.tables.find(e => e.tableId === tableId);
        let tbIndex = ds.tables.indexOf(tb);
        if (tb) {
          ds.tables.splice(tbIndex, 1);
          // Remove the dataset if no tables exist anymore
          if (ds.tables.length === 0) {
            this.policy.datasets.splice(dsIndex, 1);
          }
        }
      }
    },
    cancelTable() {
      this.showAddTable = false;
      this.newTableId = null;
    },
    showAddRowTagDialog() {
      this.componentKey += 1;
      this.showAddRowTag = true;
    },
    addRowTag() {
      this.$refs.rowAccessTagFormObserver.validate().then(result => {
        if (result) {
          let duplicate = false;
          for (const t of this.policy.rowAccessTags) {
            if (t.tag === this.newRowTag) {
              this.showError = true;
              this.errorDialogTitle = 'Duplicate tag';
              this.errorDialogText =
                'You have entered a tag value that already exists in the policy';
              duplicate = true;
              break;
            }
          }
          if (!duplicate) {
            this.policy.rowAccessTags.push({ tag: this.newRowTag });
            this.showAddRowTag = false;
            this.newRowTag = null;
          }
        }
      });
    },
    cancelRowTag() {
      this.showAddRowTag = false;
      this.newRowTag = null;
    },
    deleteRowTag(item) {
      const index = this.policy.rowAccessTags.indexOf(item);
      if (index > -1) {
        this.policy.rowAccessTags.splice(index, 1);
      }
    },
    accessTypeChanged() {
      /*console.log(
        `Permission type changed, isTableBased is ${this.policy.isTableBased}`
      );*/
    }
  }
};
</script>
