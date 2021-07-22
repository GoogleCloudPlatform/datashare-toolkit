<template>
  <v-card class="px-4">
    <v-card-title>My Products</v-card-title>
    <v-banner v-if="moreInformationText" single-line>
      <v-icon slot="icon" size="25">
        {{ icons.information }}
      </v-icon>
      {{ moreInformationText }}
      <template v-slot:actions>
        <v-btn
          v-if="moreInformationButtonUrl"
          @click="navigateToMoreInformation()"
          text
          color="blue darken-1"
          >{{ moreInformationButtonText }}</v-btn
        >
      </template>
    </v-banner>
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
      <template v-slot:item.datasets="{ item }">
        <v-chip-group
          v-if="item.datasets && item.datasets.length > 0"
          multiple
          column
          active-class="primary--text"
        >
          <v-chip
            v-for="dataset in item.datasets.slice(0, 4)"
            :key="dataset.datasetId"
            @click="navigateToDataset(dataset.datasetId)"
          >
            {{ dataset.datasetId }}
          </v-chip>
          <v-chip v-if="item.datasets.length > 4" @click="showDetails(item)">
            ...
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
            <v-icon v-on="on" class="mr-2" @click="showDetails(item)">
              {{ icons.search }}
            </v-icon>
          </template>
          <span>Plan Details</span>
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
        v-if="showProductDetail"
        v-model="showProductDetail"
        max-width="650"
      >
        <v-card>
          <v-card-title class="headline"
            >Product Details
            <v-spacer></v-spacer>
            <v-btn @click="navigateToMarketplace(selectedItem)">
              <v-icon left>{{ icons.marketplace }}</v-icon>
              Marketplace
            </v-btn>
          </v-card-title>
          <v-card-text v-html="selectedItemSummary"></v-card-text>
          <form class="px-4">
            <v-expansion-panels multiple v-model="panel">
              <v-expansion-panel
                v-if="
                  this.selectedItem.datasets &&
                    this.selectedItem.datasets.length > 0 &&
                    this.selectedItem.isTableBased === false
                "
              >
                <v-expansion-panel-header
                  >Available Datasets</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-data-table
                    :headers="datasetHeaders"
                    :items="this.selectedItem.datasets"
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
                      <v-text-field
                        class="mb-4"
                        v-model="datasetSearch"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            v-on="on"
                            class="mr-2"
                            @click="navigateToDataset(item.datasetId)"
                          >
                            {{ icons.databaseSearch }}
                          </v-icon>
                        </template>
                        <span>Navigate to Dataset</span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            v-on="on"
                            small
                            class="mr-2"
                            @click="copyQueryToClipboard(item.datasetId)"
                          >
                            {{ icons.contentCopy }}
                          </v-icon>
                        </template>
                        <span>Copy Query to Clipboard</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel v-if="this.selectedItem.isTableBased === true">
                <v-expansion-panel-header
                  >Available Tables</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-data-table
                    :headers="tableHeaders"
                    :items="this.availableTables"
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
                      <v-text-field
                        class="mb-4"
                        v-model="tableSearch"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            v-on="on"
                            class="mr-2"
                            @click="
                              navigateToTable(item.datasetId, item.tableId)
                            "
                          >
                            {{ icons.tableHeadersEye }}
                          </v-icon>
                        </template>
                        <span>Navigate to Table</span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            v-on="on"
                            small
                            class="mr-2"
                            @click="
                              copyQueryToClipboard(item.datasetId, item.tableId)
                            "
                          >
                            {{ icons.contentCopy }}
                          </v-icon>
                        </template>
                        <span>Copy Query to Clipboard</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
                v-if="
                  this.selectedItem.rowAccessTags &&
                    this.selectedItem.rowAccessTags.length > 0
                "
              >
                <v-expansion-panel-header
                  >Available Row Filters</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-data-table
                    dense
                    :headers="rowAccessHeaders"
                    :items="this.selectedItem.rowAccessTags"
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
                      <v-text-field
                        class="mb-4"
                        v-model="rowAccessSearch"
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
          </form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.stop="closeDetailDialog()"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import {
  mdiShopping,
  mdiCardSearch,
  mdiDatabaseSearch,
  mdiTableHeadersEye,
  mdiInformation,
  mdiContentCopy
} from '@mdi/js';
import Dialog from '@/components/Dialog.vue';
import UrlHelper from '../urlHelper';
import authMixin from '../mixins/authMixin';
import config from './../config';

export default {
  mixins: [authMixin],
  components: {
    Dialog
  },
  data() {
    return {
      loading: false,
      policies: [],
      search: '',
      showDialog: false,
      selectedItem: null,
      headers: [
        {
          text: 'Marketplace Solution',
          value: 'marketplace.solutionId',
          tooltip: 'The GCP Marketplace Solution Id'
        },
        {
          text: 'Marketplace Plan',
          value: 'marketplace.planId',
          tooltip: 'The GCP Marketplace Plan Id that was subscribed to'
        },
        {
          text: 'Marketplace Provider Message',
          value: 'marketplace.message',
          tooltip: 'Provider-supplied message'
        },
        {
          text: 'Status',
          value: 'status',
          tooltip: 'The state of the product request'
        },
        { text: '', value: 'action', sortable: false }
      ],
      icons: {
        contentCopy: mdiContentCopy,
        information: mdiInformation,
        search: mdiCardSearch,
        marketplace: mdiShopping,
        databaseSearch: mdiDatabaseSearch,
        tableHeadersEye: mdiTableHeadersEye
      },
      showError: false,
      showProductDetail: false,
      panel: [0],
      datasetSearch: '',
      tableSearch: '',
      rowAccessSearch: '',
      moreInformationText: '',
      moreInformationButtonText: '',
      moreInformationButtonUrl: ''
    };
  },
  mounted() {
    this.performLogin().then(result => {
      if (result) {
        this.loadProducts();
      }
    });

    this.moreInformationText = config.myProductsMoreInformationText;
    this.moreInformationButtonText = config.myProductsMoreInformationButtonText;
    this.moreInformationButtonUrl = config.myProductsMoreInformationButtonUrl;
  },
  computed: {
    selectedItemSummary() {
      return `<b>Product</b>: ${this.selectedItem.marketplace.solutionId}<br/>
      <b>Plan</b>: ${this.selectedItem.marketplace.planId}<br/>
      <b>Status</b>: ${this.selectedItem.status}
      ${
        this.selectedItem.marketplace.name
          ? '<br/><b>Entitlement Name</b>: ' +
            this.selectedItem.marketplace.name
          : ''
      } `;
    },
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
    rowAccessHeaders() {
      let h = [{ text: 'Tag', value: 'tag' }];
      return h;
    },
    availableTables() {
      let list = [];
      if (
        this.selectedItem.isTableBased === true &&
        this.selectedItem.datasets &&
        this.selectedItem.datasets.length > 0
      ) {
        this.selectedItem.datasets.forEach(d => {
          if (d.tables && d.tables.length > 0) {
            d.tables.forEach(t => {
              list.push({ datasetId: d.datasetId, tableId: t.tableId });
            });
          }
        });
      }
      return list;
    }
  },
  methods: {
    showDetails(item) {
      this.selectedItem = item;
      this.showProductDetail = true;
    },
    closeDetailDialog(refresh) {
      this.selectedItem = null;
      this.showProductDetail = false;
      if (refresh) {
        this.loadProducts();
      }
    },
    loadProducts() {
      this.loading = true;
      this.$store.dispatch('getUserProducts').then(response => {
        if (response.success) {
          this.policies = response.data;
        } else {
          this.showError = true;
          this.errorDialogTitle = 'Error retrieving products';
          this.errorDialogText = response.errors.join(', ');
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
        config.projectId,
        item.marketplace.solutionId
      );
    },
    navigateToDataset(datasetId) {
      UrlHelper.navigateToDataset(config.projectId, datasetId);
    },
    navigateToTable(datasetId, tableId) {
      UrlHelper.navigateToTable(config.projectId, datasetId, tableId);
    },
    navigateToMoreInformation() {
      window.open(this.moreInformationButtonUrl, '_blank');
    },
    copyQueryToClipboard(datasetId, tableId) {
      const query = `SELECT * FROM \`${config.projectId}.${datasetId}.${
        tableId ? tableId : '[TABLE NAME HERE]'
      }\` LIMIT 10`;
      if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(query);
      } else {
        console.warn('Unable to copy, clipboard not available');
      }
    }
  }
};
</script>
