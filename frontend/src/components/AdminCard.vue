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
          @click.stop="sync('PERMISSIONS')"
          >Sync BigQuery Permissions</v-btn
        >
      </div>
      <div class="my-2">
        <v-btn :disabled="loading" color="primary" @click.stop="sync('VIEWS')"
          >Sync BigQuery Views</v-btn
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
  </v-card>
</template>

<script>
import Vue from 'vue';

import { setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

import Dialog from '@/components/Dialog.vue';

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
    showError: false
  }),
  methods: {
    initSchema() {
      this.dialogObject = { type: 'initSchema' };
      console.log('Init schema clicked');
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
        console.log('Sync all clicked');
        this.dialogTitle = 'Sync All?';
        this.dialogText =
          'Are you sure you want sync all BigQuery objects from Datashare?';
      } else if (type === 'PERMISSIONS') {
        console.log('Sync permissions clicked');
        this.dialogTitle = 'Sync BigQuery Permissions?';
        this.dialogText =
          'Are you sure you want to sync all BigQuery permissions from Datashare?';
      } else if (type === 'VIEWS') {
        console.log('Sync views clicked');
        this.dialogTitle = 'Sync BigQuery Views?';
        this.dialogText =
          'Are you sure you want to sync all BigQuery views from Datashare?';
      }
      this.showDialog = true;
    },
    dialogConfirmed(object) {
      console.log(`object returned from dialog is ${JSON.stringify(object)}`);
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
            } else if (object.syncType === 'PERMISSIONS') {
              this.dialogTitle = 'Sync Permissions';
              this.dialogText = 'Sync all permissions has completed.';
            } else if (object.syncType === 'VIEWS') {
              this.dialogTitle = 'Sync Views';
              this.dialogText = 'Sync all views completed.';
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
      console.log(
        `cancel clicked for dialog object: ${JSON.stringify(object)}`
      );
    }
  }
};
</script>
