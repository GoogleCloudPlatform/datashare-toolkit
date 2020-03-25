<template>
  <v-card :loading="loading" class="px-4">
    <v-card-title v-if="view.authorizedViewId">
      Edit Authorized View
    </v-card-title>
    <v-card-title v-else>
      Create Authorized View
    </v-card-title>
    <v-card-subtitle v-if="view.name">{{ view.name }}</v-card-subtitle>
    <form>
      <ValidationObserver ref="observer" v-slot="{}">
        <ValidationProvider
          v-slot="{ errors }"
          name="View Name"
          vid="name"
          rules="required|bigQueryTableIdRule"
        >
          <v-text-field
            v-model="view.name"
            :error-messages="errors"
            :counter="1024"
            label="View Name"
            required
            hint="View name"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Description"
          vid="description"
          rules="required"
        >
          <v-textarea
            v-model="view.description"
            :error-messages="errors"
            label="Description"
            required
            hint="Description of the view content"
          ></v-textarea>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Dataset Id"
          vid="datasetId"
          rules="required"
        >
          <v-select
            v-model="view.datasetId"
            :items="referenceData.datasets"
            item-text="datasetId"
            item-value="datasetId"
            :error-messages="errors"
            vid="datasetId"
            label="Dataset Id"
            hint="The dataset in which to create the view"
            required
          ></v-select>
        </ValidationProvider>
        <v-radio-group
          v-model="isCustomQuery"
          row
          @change="viewQueryTypeChanged"
        >
          <v-radio label="Source-based" :value="false"></v-radio>
          <v-radio label="Custom" :value="true"></v-radio>
        </v-radio-group>
        <v-expansion-panels multiple v-model="sourcePanel">
          <v-expansion-panel v-if="!isCustomQuery">
            <v-expansion-panel-header>Source</v-expansion-panel-header>
            <v-expansion-panel-content>
              <ValidationProvider
                v-slot="{ errors }"
                name="Dataset Id"
                rules="required"
              >
                <v-select
                  v-model="view.source.datasetId"
                  :items="referenceData.datasets"
                  item-text="datasetId"
                  item-value="datasetId"
                  :error-messages="errors"
                  label="Dataset Id"
                  vid="source.datasetId"
                  hint="The dataset containing the source table"
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
                  v-model="view.source.tableId"
                  :items="referenceData.tables"
                  item-text="tableId"
                  item-value="tableId"
                  :error-messages="errors"
                  label="Table Id"
                  vid="source.tableId"
                  hint="The source table"
                  required
                  @change="sourceTableChanged"
                ></v-select>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Query Filter"
                rules=""
                vid="source.queryFilter"
              >
                <v-text-field
                  v-model="view.source.queryFilter"
                  label="Query Filter"
                  hint="The SQL query filter"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
              <v-expansion-panels multiple v-model="sourceOptionsPanel">
                <v-expansion-panel>
                  <v-expansion-panel-header>Columns</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-switch
                      label="Include All"
                      v-model="includeAllColumns"
                      @change="allColumnsChanged"
                    ></v-switch>
                    <v-list v-if="!includeAllColumns">
                      <v-list-item-group multiple>
                        <template
                          v-for="(item, i) in referenceData.availableColumns"
                        >
                          <v-divider
                            v-if="!item"
                            :key="`divider-${i}`"
                          ></v-divider>
                          <v-list-item v-else :key="`item-${i}`" :value="item">
                            <template v-slot:default="{}">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="item"
                                ></v-list-item-title>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-checkbox
                                  :value="item"
                                  v-model="view.source.visibleColumns"
                                ></v-checkbox>
                              </v-list-item-action>
                            </template>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    >Row Level Access</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-switch
                      label="Enabled"
                      v-model="view.source.accessControl.enabled"
                    ></v-switch>
                    <ValidationProvider
                      v-if="
                        view.source.accessControl &&
                          view.source.accessControl.enabled
                      "
                      v-slot="{ errors }"
                      name="Label Column"
                      rules="required"
                      vid="source.accessControl.labelColumn"
                    >
                      <v-select
                        :items="referenceData.availableColumns"
                        v-model="view.source.accessControl.labelColumn"
                        :error-messages="errors"
                        label="Label Column"
                        required
                      ></v-select>
                    </ValidationProvider>
                    <v-text-field
                      v-if="
                        view.source.accessControl &&
                          view.source.accessControl.enabled
                      "
                      v-model="view.source.accessControl.labelColumnDelimiter"
                      hint="If column field contains multiple delimited values, what is the delimiter?"
                      label="Label Column Delimiter"
                    ></v-text-field>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    >Public Access</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-switch
                      label="Enabled"
                      v-model="view.source.publicAccess.enabled"
                    ></v-switch>
                    <ValidationProvider
                      v-if="
                        view.source.publicAccess &&
                          view.source.publicAccess.enabled
                      "
                      v-slot="{ errors }"
                      name="Query Filter"
                      rules="required"
                      vid="source.publicAccess.queryFilter"
                    >
                      <v-text-field
                        v-model="view.source.publicAccess.queryFilter"
                        :error-messages="errors"
                        label="Query Filter"
                        hint="The public query filter"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      v-if="
                        view.source.publicAccess &&
                          view.source.publicAccess.enabled
                      "
                      v-slot="{ errors }"
                      name="Row Limit"
                      rules="required"
                    >
                      <v-text-field
                        label="Row Limit"
                        v-model="view.source.publicAccess.limit"
                        :error-messages="errors"
                        required
                        hint="Limit the number of rows returned by the public access query"
                        type="number"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel v-else>
            <v-expansion-panel-header>Custom</v-expansion-panel-header>
            <v-expansion-panel-content>
              <ValidationProvider
                v-slot="{ errors }"
                name="Custom Query"
                rules="required"
                vid="custom.query"
              >
                <v-textarea
                  v-model="view.custom.query"
                  :error-messages="errors"
                  label="Query"
                  required
                  hint="SQL based custom query"
                ></v-textarea>
              </ValidationProvider>
              <v-subheader>Authorized from Dataset Id's</v-subheader>
              <v-data-table
                dense
                :headers="datasetHeaders"
                :items="view.custom.authorizeFromDatasetIds"
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
          <v-expansion-panel>
            <v-expansion-panel-header>Expiration</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-switch
                label="Enabled"
                v-model="view.expiration.enabled"
              ></v-switch>
              <v-switch
                label="Delete upon expiration"
                v-if="view.expiration.enabled"
                v-model="view.expiration.delete"
              ></v-switch>
              <v-row v-if="view.expiration.enabled">
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menuExpirationDate"
                    v-model="menuExpirationDate"
                    :close-on-content-click="false"
                    :return-value.sync="expirationDate"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Date"
                        rules="required"
                        vid="expiration.time"
                      >
                        <v-text-field
                          v-model="expirationDate"
                          :error-messages="errors"
                          label="Select Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker v-model="expirationDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menuExpirationDate = false"
                        >Cancel</v-btn
                      >
                      <v-btn text color="primary" @click="setExpirationDate()"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menuExpirationTime"
                    v-model="menuExpirationTime"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="expirationTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Time"
                        rules="required"
                      >
                        <v-text-field
                          v-model="expirationTime"
                          :error-messages="errors"
                          label="Select Time"
                          prepend-icon="access_time"
                          v-on="on"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-time-picker
                      v-if="menuExpirationTime"
                      v-model="expirationTime"
                      full-width
                      format="ampm"
                      @click:minute="setExpirationTime()"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </ValidationObserver>
    </form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red darken-1" text @click.stop="cancel">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click.stop="showConfig = true">
        JSON
      </v-btn>
      <v-btn text color="purple darken-1" @click.stop="validate">
        Validate
      </v-btn>
      <v-btn text color="green darken-1" @click.stop="save">
        Save
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="showConfig" max-width="700px">
      <v-card class="px-4 py-4">
        <v-card-title primary-title>
          JSON Configuration
        </v-card-title>
        <v-card-text>
          Raw View:
          <pre>{{ `${JSON.stringify(this.view, null, 3)}` }}</pre>
          Sanitized View:
          <pre>{{ `${JSON.stringify(this.sanitizedView, null, 3)}` }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showConfig = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-show="showAddDataset"
      v-model="showAddDataset"
      persistent
      max-width="390"
    >
      <v-card>
        <v-card-title class="headline">Add Authorized Dataset</v-card-title>
        <v-form class="px-4">
          <ValidationObserver ref="datasetFormObserver" v-slot="{}">
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
          </ValidationObserver>
        </v-form>
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
    <Dialog
      v-if="showDialog"
      v-model="showDialog"
      :title="dialogTitle"
      :text="dialogText"
      :cancelButtonEnabled="false"
      v-on:confirmed="showDialog = false"
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

extend('bigQueryTableIdRule', value => {
  if (value.length > 1024) {
    return `Destination tableId '${value}' exceeds maximum allowable length of 1024: ${value.length}}`;
  } else if (!value.match(/^[A-Za-z0-9_]+$/g)) {
    return `Destination tableId '${value}' name is invalid. See https://cloud.google.com/bigquery/docs/tables for further information.`;
  }
  return true;
});

import Dialog from '@/components/Dialog.vue';
import moment from 'moment';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Dialog
  },
  props: {
    viewData: Object
  },
  data: () => ({
    sourcePanel: [],
    sourceOptionsPanel: [0],
    isCustomQuery: false,
    componentKey: 0,
    showDialog: false,
    loading: false,
    showConfig: false,
    menuExpirationDate: false,
    expirationDate: null,
    menuExpirationTime: false,
    expirationTime: null,
    includeAllColumns: true,
    referenceData: {
      datasets: [],
      tables: [],
      availableColumns: []
    },
    view: {
      datasetId: null,
      source: {
        datasetId: null,
        tableId: null,
        visibleColumns: [],
        accessControl: {
          enabled: false
        },
        publicAccess: {
          enabled: false
        }
      },
      custom: {
        query: '',
        authorizeFromDatasetIds: []
      },
      expiration: {
        enabled: false
      }
    },
    showAddDataset: false,
    newDatasetId: null,
    datasetSearch: ''
  }),
  created() {
    if (this.viewData && this.viewData.authorizedViewId) {
      this.loadView();
    } else {
      this.loadDatasets();
    }
  },
  computed: {
    expirationDateTime() {
      if (this.expirationDate && this.expirationTime) {
        return new Date(this.expirationDate + ' ' + this.expirationTime);
      } else if (this.expirationDate) {
        return new Date(this.expirationDate);
      }
      return null;
    },
    nonSelectedDatasets() {
      let d = [];
      this.referenceData.datasets.forEach(item => {
        const found = this.view.custom.authorizeFromDatasetIds.find(
          element => element.datasetId === item.datasetId
        );
        if (!found) {
          d.push(item);
        }
      });
      return d;
    },
    datasetHeaders() {
      let h = [
        { text: 'Dataset Id', value: 'datasetId' },
        { text: '', value: 'action', sortable: false }
      ];
      return h;
    },
    sanitizedView() {
      let copy = JSON.parse(JSON.stringify(this.view));

      if (!copy.datasetId) {
        delete copy.datasetId;
      }

      if (!this.isCustomQuery) {
        // Source-based
        delete copy.custom;

        if (!copy.source.datasetId) {
          delete copy.source.datasetId;
        }

        if (!copy.source.tableId) {
          delete copy.source.tableId;
        }

        if (
          copy.source &&
          copy.source.accessControl &&
          !copy.source.accessControl.enabled
        ) {
          delete copy.source.accessControl;
        }

        if (
          copy.source &&
          copy.source.publicAccess &&
          !copy.source.publicAccess.enabled
        ) {
          delete copy.source.publicAccess;
        } else if (copy.source.publicAccess.limit) {
          copy.source.publicAccess.limit = Number(
            copy.source.publicAccess.limit
          );
        }

        if (
          copy.source.visibleColumns &&
          copy.source.visibleColumns.length === 0
        ) {
          delete copy.source.visibleColumns;
        }
      } else {
        // Custom-based
        delete copy.source;

        if (
          copy.custom.authorizeFromDatasetIds &&
          copy.custom.authorizeFromDatasetIds.length === 0
        ) {
          delete copy.custom.authorizeFromDatasetIds;
        } else if (copy.custom.authorizeFromDatasetIds.length > 0) {
          copy.custom.authorizeFromDatasetIds = copy.custom.authorizeFromDatasetIds.map(
            d => d.datasetId
          );
        }
      }

      if (copy.expiration && !copy.expiration.enabled) {
        delete copy.expiration;
      } else if (this.expirationDateTime) {
        copy.expiration.time = this.expirationDateTime.getTime();
      }

      copy.projectId = this.$store.state.settings.projectId;
      copy.createdBy = this.$store.state.user.data.email;

      return copy;
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    validate() {
      // First do client side validation
      this.$refs.observer.validate().then(result => {
        if (result) {
          console.log(
            'Client side data is valid, will do server side validation'
          );
          this.loading = true;
          this.$store
            .dispatch('validateView', this.sanitizedView)
            .then(result => {
              this.loading = false;

              if (result.error && result.error === 'STALE') {
                this.dialogTitle = 'View data is stale';
                this.dialogText =
                  'This view has been updated since you last refreshed the page, please reload the page to make changes.';
                this.showDialog = true;
              } else if (result.error) {
                this.dialogTitle = 'Error validating view';
                this.dialogText =
                  'Failed to validate view. Please reload and try again.';
                this.showDialog = true;
              } else {
                if (result.isValid === false) {
                  console.log(
                    `Setting errors to ${JSON.stringify(result.issues)}`
                  );
                  this.$refs.observer.setErrors(result.issues);
                } else {
                  console.log('Validation passed');
                  this.dialogTitle = 'Validation Status';
                  this.dialogText = 'The view configuration is valid.';
                  this.showDialog = true;
                }
              }
            });
        } else {
          console.log('Client side data is invalid');
        }
      });
    },
    save() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          console.log(
            'Client side data is valid, will do server side validation and save'
          );
          this.loading = true;
          this.$store.dispatch('saveView', this.sanitizedView).then(result => {
            this.loading = false;

            if (result.error && result.error === 'STALE') {
              this.dialogTitle = 'View data is stale';
              this.dialogText =
                'This view has been updated since you last refreshed the page, please reload the page to make changes.';
              this.showDialog = true;
            } else if (result.error) {
              this.dialogTitle = 'Error saving view';
              this.dialogText =
                'Failed to save view. Please reload and try again.';
              this.showDialog = true;
            } else {
              if (result.isValid === false) {
                console.log(
                  `Setting errors to ${JSON.stringify(result.issues)}`
                );
                this.$refs.observer.setErrors(result.issues);
              } else {
                console.log('Validation passed');
                // Success
                this.$emit('close');
              }
            }
          });
        } else {
          console.log('View is not valid');
        }
      });
    },
    loadView() {
      this.loading = true;
      this.$store
        .dispatch('getView', {
          projectId: this.$store.state.settings.projectId,
          authorizedViewId: this.viewData.authorizedViewId
        })
        .then(view => {
          /*console.log(
            `Updating view response: ${JSON.stringify(view, null, 3)}`
          );*/
          this.isCustomQuery = view.custom != null;

          this.loadDatasets().then(() => {
            console.log(`Datasets loaded, setting datasetId`);
          });

          if (view.source && view.source.datasetId) {
            this.loadTables(view.source.datasetId).then(() => {
              console.log(`Tables loaded, setting datasetId`);
            });
            this.loadTableColumns(
              view.source.datasetId,
              view.source.tableId
            ).then(() => {
              console.log(`Table Columns loaded, setting datasetId`);
              this.includeAllColumns = view.source.visibleColumns.length === 0;
            });
          }
          if (!view.custom) {
            view.custom = {};
            view.custom.authorizeFromDatasetIds = [];
          }
          if (view.custom.authorizeFromDatasetIds.length > 0) {
            let a = [];
            view.custom.authorizeFromDatasetIds.forEach(ds => {
              a.push({ datasetId: ds });
            });
            view.custom.authorizeFromDatasetIds = a;
          }
          if (!view.source) {
            view.source = {};
          }
          if (!view.source.datasetId) {
            view.source.datasetId = null;
          }
          if (
            !view.source.accessControl ||
            view.source.accessControl === null
          ) {
            view.source.accessControl = { enabled: false };
          }
          if (!view.source.publicAccess || view.source.publicAccess === null) {
            view.source.publicAccess = { enabled: false };
          }
          if (!view.expiration || view.expiration === null) {
            view.expiration = { enabled: false };
          } else if (view.expiration.time) {
            // v-time-picker handles the value format: Time picker model (ISO 8601 format, 24hr hh:mm)
            // https://vuetifyjs.com/en/components/time-pickers/
            const formattedDate = moment(view.expiration.time).format(
              'YYYY-MM-DDTHH:mm'
            );
            const expirationStr = formattedDate.split('T');
            if (expirationStr.length === 2) {
              this.expirationDate = expirationStr[0];
              this.expirationTime = expirationStr[1];
            }
          }
          // console.log(`Setting this.view to: ${JSON.stringify(view, null, 3)}`);
          this.view = view;
          this.loading = false;
        });
    },
    isItemSelected(item) {
      console.log(`Checking item: ${item}`);
      if (this.view.source && this.view.source.visibleColumns) {
        console.log(
          `Visible Columns: ${JSON.stringify(this.view.source.visibleColumns)}`
        );
        let found = this.view.source.visibleColumns.filter(col => item === col);
        console.log(`Found Visible Columns: ${JSON.stringify(found)}`);
        return found.length === 1;
      }
      return false;
    },
    allColumnsChanged() {
      if (this.includeAllColumns) {
        this.view.source.visibleColumns = this.referenceData.availableColumns;
      }
    },
    setExpirationDate() {
      this.$refs.menuExpirationDate.save(this.expirationDate);
      this.setExpirationTimestamp();
    },
    setExpirationTime() {
      this.$refs.menuExpirationTime.save(this.expirationTime);
      this.setExpirationTimestamp();
    },
    setExpirationTimestamp() {
      if (this.view.expirationTime) {
        this.view.expiration.time = this.expirationDateTime.getTime();
      } else {
        this.view.expiration.time = null;
      }
    },
    showAddDatasetDialog() {
      this.componentKey += 1;
      this.showAddDataset = true;
    },
    addDataset() {
      this.$refs.datasetFormObserver.validate().then(result => {
        if (result) {
          this.view.custom.authorizeFromDatasetIds.push({
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
      console.log(`Removing dataset ${JSON.stringify(item)}`);
      const index = this.view.custom.authorizeFromDatasetIds.indexOf(item);
      if (index > -1) {
        this.view.custom.authorizeFromDatasetIds.splice(index, 1);
      }
    },
    loadDatasets() {
      this.loading = true;
      return this.$store
        .dispatch('getDatasets', {
          projectId: this.$store.state.settings.projectId
        })
        .then(datasets => {
          this.referenceData.datasets = datasets;
          this.loading = false;
        });
    },
    sourceDatasetChanged() {
      this.view.source.tableId = null;
      this.referenceData.availableColumns = [];
      return this.loadTables(this.view.source.datasetId);
    },
    sourceTableChanged() {
      this.referenceData.availableColumns = [];
      return this.loadTableColumns(
        this.view.source.datasetId,
        this.view.source.tableId
      );
    },
    loadTables(datasetId) {
      this.loading = true;
      return this.$store
        .dispatch('getTables', {
          projectId: this.$store.state.settings.projectId,
          datasetId: datasetId
        })
        .then(tables => {
          this.referenceData.tables = tables;
          this.loading = false;
        });
    },
    loadTableColumns(datasetId, tableId) {
      if (!tableId) {
        this.referenceData.availableColumns = [];
        return;
      }
      this.loading = true;
      return this.$store
        .dispatch('getTableColumns', {
          projectId: this.$store.state.settings.projectId,
          datasetId: datasetId,
          tableId: tableId
        })
        .then(columns => {
          this.referenceData.availableColumns = columns;
          this.loading = false;
        });
    },
    viewQueryTypeChanged() {
      console.log(
        `View query type changed, isCustomQuery is ${this.isCustomQuery}`
      );
      if (this.isCustomQuery === true) {
        if (!this.view.hasOwnProperty('custom')) {
          console.log('adding view.custom');
          this.view.custom = {};
        }
        if (!this.view.custom.hasOwnProperty('authorizeFromDatasetIds')) {
          console.log('adding view.custom.authorizeFromDatasetIds');
          this.view.custom.authorizeFromDatasetIds = [];
        }
      }
    }
  }
};
</script>
