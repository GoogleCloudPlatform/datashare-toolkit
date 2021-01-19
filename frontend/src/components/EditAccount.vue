<template>
  <v-card class="px-4 py-4">
    <v-card-title v-if="userData">
      Edit Account
    </v-card-title>
    <v-card-title v-else>
      Add Account
    </v-card-title>
    <v-card-subtitle v-if="user.email">{{ user.email }}</v-card-subtitle>
    <ValidationObserver ref="observer" v-slot="{}">
      <form>
        <ValidationProvider
          v-slot="{ errors }"
          name="Email Type"
          rules="required"
        >
          <v-select
            :readonly="userData != null"
            v-model="user.emailType"
            :error-messages="errors"
            :items="emailTypes"
            label="Email Type"
            required
          ></v-select>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Email"
          rules="required|email"
        >
          <v-text-field
            :readonly="userData != null"
            v-model="user.email"
            :error-messages="errors"
            label="Email"
            required
          ></v-text-field>
        </ValidationProvider>
        <v-row justify="center" align="center" v-if="loading">
          <div class="text-center ma-12">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-row>
        <v-subheader>Policies</v-subheader>
        <v-list dense>
          <v-list-item-group multiple>
            <template v-for="(item, i) in policies">
              <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
              <v-list-item v-else :key="`item-${i}`" :value="item">
                <template v-slot:default="{}">
                  <v-list-item-content>
                    <v-list-item-title
                      :style="policyTitleColor(item.policyId)"
                      v-text="item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="item.description"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :value="item.policyId"
                      v-model="user.policies"
                      :color="policyCheckboxColor(item.policyId)"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue darken-1" @click.stop="cancel">Cancel</v-btn>
          <v-btn
            text
            color="green darken-1"
            class="mr-4"
            @click.stop="submit"
            :disabled="!hasPolicyChanges"
            >Save</v-btn
          >
        </v-card-actions>
      </form>
    </ValidationObserver>
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

import { required, email, max } from 'vee-validate/dist/rules';
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

extend('email', {
  ...email,
  message: 'Email must be valid'
});

import Dialog from '@/components/Dialog.vue';
import config from '../config';

Array.prototype.diff = function(a) {
  return this.filter(function(i) {
    return a.indexOf(i) < 0;
  });
};

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Dialog
  },
  props: {
    userData: Object
  },
  data: () => ({
    policies: [],
    loading: false,
    initialSelectedPolicies: [],
    marketplacePurchasedPolicies: [],
    user: {
      rowId: null,
      accountId: null,
      emailType: null,
      email: null,
      policies: [],
      marketplace: [],
      marketplaceActivated: null
    },
    emailTypes: ['user', 'group', 'serviceAccount'],
    showError: false
  }),
  created() {
    if (this.userData) {
      this.user.rowId = this.userData.rowId;
      this.user.accountId = this.userData.accountId;
      this.user.emailType = this.userData.emailType;
      this.user.email = this.userData.email;
      this.user.policies = this.userData.policies;
      this.user.marketplace = this.userData.marketplace;
      this.initialSelectedPolicies = this.userData.policies;
      this.loadAccount();
    }
    this.loadPolicies();
  },
  computed: {
    hasPolicyChanges() {
      const _initialSelectedPolicies = JSON.parse(
        JSON.stringify(this.initialSelectedPolicies)
      );
      const _userPolicies = JSON.parse(JSON.stringify(this.user.policies));

      console.log(this.user.policies);
      console.log(_initialSelectedPolicies);
      console.log(_userPolicies);

      let added = [];
      let removed = [];
      if (_initialSelectedPolicies && _initialSelectedPolicies.length > 0) {
        added = _userPolicies.diff(_initialSelectedPolicies);
        removed = _initialSelectedPolicies.diff(_userPolicies);
      } else {
        // New record, handle all as added
        added = _userPolicies;
      }
      console.log(`Added: ${JSON.stringify(added)}`);
      console.log(`Removed: ${JSON.stringify(removed)}`);
      if (this.user.accountId && added.length === 0 && removed.length === 0) {
        console.log('No policy changes made');
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          // https://vuejs.org/v2/guide/components-custom-events.html
          if (this.hasPolicyChanges) {
            this.loading = true;
            let data = {};
            if (!this.userData) {
              // New account
              data = {
                email: this.user.email,
                emailType: this.user.emailType,
                policies: this.user.policies
              };
            } else {
              // Existing account
              data = {
                rowId: this.user.rowId,
                accountId: this.user.accountId,
                email: this.user.email,
                emailType: this.user.emailType,
                policies: this.user.policies,
                marketplace: this.user.marketplace
              };
            }

            this.$store.dispatch('saveAccount', data).then(result => {
              this.loading = false;
              if (!result.success) {
                this.errorDialogTitle = 'Error saving account';
                this.errorDialogText = result.errors.join(', ');
                this.showError = true;
              } else {
                // Success
                this.$emit('close');
              }
            });
          }
        }
      });
    },
    cancel() {
      this.$emit('cancel');
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
    loadAccount() {
      this.loading = true;
      this.$store
        .dispatch('getAccount', {
          accountId: this.user.accountId
        })
        .then(response => {
          if (response.success) {
            const account = response.data;
            this.user.rowId = account.rowId;
            this.user.accountId = account.accountId;
            this.user.emailType = account.emailType;
            this.user.email = account.email;

            let policies = [];
            if (account.policies && account.policies.length > 0) {
              policies = account.policies.map(p => p.policyId);
            }
            this.user.policies = policies;
            this.user.marketplace = account.marketplace;
            this.initialSelectedPolicies = policies;
            this.user.marketplaceActivated = account.marketplaceActivated;
            this.marketplacePurchasedPolicies = account.policies
              .filter(p => p.marketplaceEntitlementActive === true)
              .map(p => p.policyId);
          }
          this.loading = false;
        });
    },
    policyCheckboxColor(policyId) {
      if (
        config.marketplaceIntegrationEnabled === true &&
        this.user.marketplaceActivated === true
      ) {
        if (this.marketplacePurchasedPolicies.includes(policyId)) {
          return 'green';
        } else {
          return 'orange';
        }
      }
      return '';
    },
    policyTitleColor(policyId) {
      if (
        config.marketplaceIntegrationEnabled === true &&
        this.user.marketplaceActivated === true
      ) {
        const cbColor = this.policyCheckboxColor(policyId);
        if (cbColor != '') {
          return `color:${cbColor}`;
        }
      }
      return '';
    }
  }
};
</script>
