<template>
  <v-card class="pa-4" :loading="loading">
    <form>
      <v-card-title primary-title>
        Admin
      </v-card-title>
      <div class="my-2">
        <v-btn :disabled="loading" color="primary" @click.stop="initSchema()"
          >Initialize Schema</v-btn
        >
      </div>
      <div class="my-2">
        <v-btn
          :disabled="loading"
          color="primary"
          @click.stop="sync('BIGQUERY_PERMISSIONS')"
          >Sync BigQuery Permissions</v-btn
        >
      </div>
      <div class="my-2">
        <v-btn
          :disabled="loading"
          color="primary"
          @click.stop="sync('BIGQUERY_VIEWS')"
          >Sync BigQuery Views</v-btn
        >
      </div>
      <div class="my-2">
        <v-btn
          :disabled="loading"
          color="primary"
          @click.stop="sync('STORAGE_BUCKET_PERMISSIONS')"
          >Sync Storage Bucket Permissions</v-btn
        >
      </div>
      <div class="my-2">
        <v-btn
          :disabled="loading"
          color="primary"
          @click.stop="sync('TOPIC_PERMISSIONS')"
          >Sync PubSub Topic Permissions</v-btn
        >
      </div>
      <div
        class="my-2"
        v-if="this.config.marketplaceIntegrationEnabled === true"
      >
        <v-btn
          :disabled="loading"
          color="primary"
          @click.stop="sync('MARKETPLACE')"
          >Sync Marketplace Entitlements</v-btn
        >
      </div>
      <div class="my-2">
        <v-btn :disabled="loading" color="primary" @click.stop="sync('ALL')"
          >Sync All</v-btn
        >
      </div>
    </form>
    <Dialog
      v-if="showDialog"
      v-model="showDialog"
      :title="dialogTitle"
      :text="dialogText"
      :confirmButtonText="dialogButtonConfirmText"
      :cancelButtonText="dialogButtonCancelText"
      :cancelButtonEnabled="dialogCancelButtonEnabled"
      :object="dialogObject"
      v-on:confirmed="dialogConfirmed"
      v-on:canceled="dialogCanceled"
    />
    <v-card-title primary-title>
      Authenticated Users
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="applicationUsers"
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
      <template v-slot:[`item.photoURL`]="{ item }">
        <v-avatar color="primary" size="40" rounded>
          <v-img :src="item.photoURL"></v-img>
        </v-avatar>
      </template>
      <template v-slot:[`item.customClaims`]="{ item }">
        <v-chip-group max="0" multiple column active-class="primary--text">
          <!--, index-->
          <v-chip v-for="(value, key) in item.customClaims" :key="key">
            {{ key }}: {{ value }}
          </v-chip>
        </v-chip-group>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import _config from './../config';
import { setInteractionMode } from 'vee-validate';
import Dialog from '@/components/Dialog.vue';

setInteractionMode('eager');

export default {
  components: {
    Dialog
  },
  data: () => ({
    loading: false,
    showDialog: false,
    dialogTitle: '',
    dialogText: '',
    dialogButtonConfirmText: '',
    dialogButtonCancelText: '',
    dialogCancelButtonEnabled: true,
    dialogObject: {},
    showError: false,
    applicationUsers: [],
    search: '',
    headers: [
      {
        text: 'UID',
        value: 'uid',
        tooltip: 'The IDP uid'
      },
      {
        text: 'Email',
        value: 'email',
        tooltip: 'The account email address'
      },
      {
        text: 'Email Verified',
        value: 'emailVerified',
        tooltip: 'Denotes if the email address is verified'
      },
      {
        text: 'Disabled',
        value: 'disabled',
        tooltip: 'Indicates if the account is disabled'
      },
      {
        text: 'Custom Claims',
        value: 'customClaims',
        tooltip: 'The account custom claims'
      },
      {
        text: 'Last Sign In Time',
        value: 'lastSignInTime',
        tooltip: 'The last sign in time for the account'
      },
      {
        text: 'Creation Time',
        value: 'creationTime',
        tooltip: 'The creation time for the account'
      },
      {
        text: 'Photo URL',
        value: 'photoURL',
        tooltip: 'The account photo url'
      }
    ]
  }),
  mounted() {
    this.loadApplicationUsers();
  },
  computed: {
    config() {
      return _config;
    }
  },
  methods: {
    initSchema() {
      this.dialogObject = { type: 'initSchema' };
      console.debug('Init schema clicked');
      this.dialogButtonConfirmText = 'Yes, Proceed';
      this.dialogButtonCancelText = 'No, Cancel';
      this.dialogCancelButtonEnabled = true;
      this.dialogTitle = 'Initialize Datashare Schema?';
      this.dialogText =
        'Are you sure you want to initialize the Datashare schema? This will wipe out any existing Datashare data.';
      this.showDialog = true;
    },
    sync(type) {
      this.dialogObject = { type: 'sync', syncType: type };
      this.dialogButtonConfirmText = 'Yes, Proceed';
      this.dialogButtonCancelText = 'No, Cancel';
      this.dialogCancelButtonEnabled = true;
      if (type === 'ALL') {
        console.debug('Sync all clicked');
        this.dialogTitle = 'Sync All?';
        this.dialogText =
          'Are you sure you want sync all Datashare managed objects?';
      } else if (type === 'BIGQUERY_PERMISSIONS') {
        console.debug('Sync BigQuery permissions clicked');
        this.dialogTitle = 'Sync BigQuery Permissions?';
        this.dialogText =
          'Are you sure you want to sync all BigQuery permissions managed by Datashare?';
      } else if (type === 'BIGQUERY_VIEWS') {
        console.debug('Sync BigQuery views clicked');
        this.dialogTitle = 'Sync BigQuery Views?';
        this.dialogText =
          'Are you sure you want to sync all BigQuery views managed by Datashare?';
      } else if (type === 'STORAGE_BUCKET_PERMISSIONS') {
        console.debug('Sync Storage Bucket permissions clicked');
        this.dialogTitle = 'Sync Storage Bucket Permissions?';
        this.dialogText =
          'Are you sure you want to sync all Storage Bucket permissions managed by Datashare?';
      } else if (type === 'TOPIC_PERMISSIONS') {
        console.debug('Sync Pub/Sub Topic permissions clicked');
        this.dialogTitle = 'Sync Pub/Sub Topic Permissions?';
        this.dialogText =
          'Are you sure you want to sync all Pub/Sub Topic permissions managed by Datashare?';
      } else if (type === 'MARKETPLACE') {
        console.debug('Sync marketplace entitlements clicked');
        this.dialogTitle = 'Sync Marketplace Entitlements?';
        this.dialogText =
          'Are you sure you want to sync all Marketplace entitlements managed by Datashare?';
      }
      this.showDialog = true;
    },
    dialogConfirmed(object) {
      console.debug(`object returned from dialog is ${JSON.stringify(object)}`);
      if (object.type === 'sync') {
        this.loading = true;
        this.$store
          .dispatch('syncResources', { type: object.syncType })
          .then(result => {
            this.dialogButtonConfirmText = 'Ok';
            this.dialogCancelButtonEnabled = false;

            if (object.syncType === 'ALL') {
              this.dialogTitle = 'Sync All';
              this.dialogText = 'Sync all has completed.';
            } else if (object.syncType === 'BIGQUERY_PERMISSIONS') {
              this.dialogTitle = 'Sync BigQuery Permissions';
              this.dialogText = 'Sync all BigQuery permissions has completed.';
            } else if (object.syncType === 'BIGQUERY_VIEWS') {
              this.dialogTitle = 'Sync BigQuery Views';
              this.dialogText = 'Sync all BigQuery views completed.';
            } else if (object.syncType === 'STORAGE_BUCKET_PERMISSIONS') {
              this.dialogTitle = 'Sync Storage Bucket Permissions';
              this.dialogText =
                'Sync all Storage Bucket permissions has completed.';
            } else if (object.syncType === 'TOPIC_PERMISSIONS') {
              this.dialogTitle = 'Sync Pub/Sub Topic Permissions';
              this.dialogText =
                'Sync all Pub/Sub Topic permissions has completed.';
            } else if (object.syncType === 'MARKETPLACE') {
              this.dialogTitle = 'Sync Marketplace Entitlements';
              this.dialogText = 'Sync Marketplace Entitlements completed.';
            }

            if (!result.success) {
              this.dialogTitle += ' Failed';
              this.dialogText = result.errors.join(', ');
            }

            this.dialogObject = { type: 'finalConfirm' };
            this.showDialog = true;
            this.loading = false;
          });
      } else if (object.type === 'initSchema') {
        this.loading = true;
        this.$store.dispatch('initSchema').then(result => {
          this.dialogButtonConfirmText = 'Ok';
          this.dialogCancelButtonEnabled = false;
          this.dialogTitle = 'Initialize Schema';
          this.dialogText = 'Initialize schema has completed.';

          if (!result.success) {
            this.dialogTitle += ' Failed';
            this.dialogText = result.errors.join(', ');
          }

          this.dialogObject = { type: 'finalConfirm' };
          this.showDialog = true;
          this.loading = false;
        });
      }
    },
    dialogCanceled(object) {
      console.debug(
        `cancel clicked for dialog object: ${JSON.stringify(object)}`
      );
    },
    loadApplicationUsers() {
      this.loading = true;
      this.$store.dispatch('getApplicationUsers').then(response => {
        if (response.success) {
          this.applicationUsers = response.data;
        } else {
          this.applicationUsers = [];
        }
        this.loading = false;
      });
    }
  }
};
</script>
