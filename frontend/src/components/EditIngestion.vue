<template>
  <v-card class="px-4 py-4">
    <v-card-title v-if="editMode">
      Edit Ingestion
    </v-card-title>
    <v-card-title v-else>
      Create Ingestion
    </v-card-title>
    <v-card-subtitle v-if="config.datasetId && config.tableId">{{
      config.datasetId + ':' + config.tableId
    }}</v-card-subtitle>
    <ValidationObserver ref="observer" v-slot="{}">
      <form>
        <ValidationProvider
          v-slot="{ errors }"
          name="Dataset Id"
          rules="required|max:1024"
        >
          <v-combobox
            label="Dataset Id"
            :readonly="editMode"
            v-model="config.datasetId"
            :items="datasets"
            item-text="datasetId"
            item-value="datasetId"
            v-on:change="loadTables"
            :error-messages="errors"
            required
          ></v-combobox>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Table Id"
          rules="required|max:1024"
        >
          <v-combobox
            label="Table Id"
            :readonly="editMode"
            v-model="config.tableId"
            :items="tables"
            item-text="tableId"
            item-value="tableId"
            :error-messages="errors"
            required
          ></v-combobox>
        </ValidationProvider>
        <v-switch v-model="config.truncate" label="Truncate destination table">
        </v-switch>
        <ValidationProvider
          v-slot="{ errors }"
          name="Metadata"
          rules="metadataRule"
        >
          <v-textarea
            label="Metadata"
            v-model="config.metadata"
            style="font-family: monospace; font-size: 12px;"
            :error-messages="errors"
            hint="Define the metadata"
          ></v-textarea>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Transformation SQL"
          rules="required"
        >
          <v-textarea
            style="font-family: monospace; font-size: 12px;"
            label="Transformation SQL"
            v-model="config.transformSql"
            :error-messages="errors"
            hint="Define the SQL transformation query"
            required
          ></v-textarea>
        </ValidationProvider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue darken-1" @click.stop="cancel">Cancel</v-btn>
          <v-btn
            v-if="config.tableExists"
            text
            color="purple darken-1"
            @click.stop="cancel"
          >
            Validate
          </v-btn>
          <v-btn text color="green darken-1" class="mr-4" @click.stop="submit"
            >Save</v-btn
          >
        </v-card-actions>
      </form>
    </ValidationObserver>
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

extend('metadataRule', value => {
  if (isValidJson(value)) {
    return true;
  }
  return 'Metadata must be a valid json dictionary';
});

function isValidJson(value) {
  try {
    JSON.parse(value);
    if (value) {
      return JSON.parse(value).constructor == Object;
    }
    return true;
  } catch {
    return false;
  }
}

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    ingestionData: Object
  },
  data: () => ({
    editMode: false,
    datasets: [],
    tables: [],
    config: {
      datasetId: null,
      tableId: null,
      truncate: false,
      metadata: null,
      transformSql: '*',
      tableExists: false
    }
  }),
  created() {
    if (this.ingestionData) {
      this.editMode = true;
      this.config.datasetId = this.ingestionData.datasetId;
      this.config.tableId = this.ingestionData.tableId;
      this.loadIngestion();
    } else if (this.$route.query.datasetId && this.$route.query.tableId) {
      this.editMode = true;
      this.config.datasetId = this.$route.query.datasetId;
      this.config.tableId = this.$route.query.tableId;
      this.loadIngestion();
    } else {
      this.config.datasetId = null;
      this.config.tableId = null;
    }
    this.loadDatasets();
  },
  methods: {
    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          this.loading = true;
          this.$store
            .dispatch('saveIngestion', {
              bucketName: this.$store.state.settings.storageBucket,
              datasetId: this.config.datasetId,
              tableId: this.config.tableId,
              transformConfig: this.config.transformSql,
              schemaConfig: {
                metadata: JSON.parse(this.config.metadata),
                truncate: this.config.truncate
              }
            })
            .then(() => {
              this.loading = false;
              this.$emit('close');
            });
        }
      });
    },
    cancel() {
      this.$emit('cancel');
    },
    loadDatasets() {
      this.loading = true;
      this.$store
        .dispatch('getDatasets', {
          projectId: config.projectId
        })
        .then(datasets => {
          this.datasets = datasets;
          this.tables = [];
          this.loading = false;
        });
    },
    loadTables() {
      this.loading = true;
      this.$store
        .dispatch('getTables', {
          projectId: config.projectId,
          datasetId: this.config.datasetId,
          labelKey: 'cds_ingestion_managed'
        })
        .then(tables => {
          this.tables = tables;
          this.loading = false;
        });
    },
    loadIngestion() {
      this.loading = true;
      this.$store
        .dispatch('getIngestion', {
          bucketName: this.$store.state.settings.storageBucket,
          datasetId: this.config.datasetId,
          tableId: this.config.tableId
        })
        .then(ingestion => {
          if (ingestion.length === 1) {
            const i = ingestion[0];
            this.config.datasetId = i.datasetId;
            this.config.tableId = i.tableId;
            this.config.truncate = i.schemaConfig && i.schemaConfig.truncate;
            if (i.schemaConfig && i.schemaConfig.metadata) {
              this.config.metadata = JSON.stringify(
                i.schemaConfig.metadata,
                null,
                3
              );
            }
            this.config.transformSql = i.transformConfig || '*';
          }
          this.loading = false;
        });
    }
  }
};
</script>
