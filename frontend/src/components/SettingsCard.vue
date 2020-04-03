<template>
  <v-progress-circular
    v-if="loading"
    indeterminate
    color="primary"
  ></v-progress-circular>
  <v-card class="px-4" v-else>
    <v-card-title primary-title>
      Settings
    </v-card-title>
    <v-card-subtitle>
      <p class="text-right">Session Id: {{ $session.id() }}</p></v-card-subtitle
    >
    <v-card-text>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="update">
          <ValidationProvider
            v-slot="{ errors }"
            name="API Key"
            rules="required"
          >
            <v-text-field
              v-model="settings.apiKey"
              label="API Key"
              :error-messages="errors"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Auth Domain"
            rules="required"
          >
            <v-text-field
              v-model="settings.authDomain"
              label="Auth Domain"
              :error-messages="errors"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Project Id"
            rules="required"
          >
            <v-text-field
              v-model="settings.projectId"
              label="Project Id"
              :error-messages="errors"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Storage Bucket"
            rules="required|max:222"
          >
            <v-text-field
              v-model="settings.storageBucket"
              label="Storage Bucket"
              :counter="222"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="App Id"
            rules="required"
          >
            <v-text-field
              v-model="settings.appId"
              label="App Id"
              :error-messages="errors"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Measurement Id"
            rules="required"
          >
            <v-text-field
              v-model="settings.measurementId"
              label="Measurement Id"
              :error-messages="errors"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="API Base URL"
            rules="required|max:2000"
          >
            <v-text-field
              v-model="settings.apiBaseUrl"
              :placeholder="settings.apiBaseUrl"
              label="API Base URL"
              :counter="2000"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <v-btn class="mr-4" :disabled="invalid" @click="update">update</v-btn>
          <v-btn @click="reset">reset</v-btn>
        </form>
      </ValidationObserver>
    </v-card-text>
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

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    loading: false
  }),
  computed: {
    settings() {
      return this.$store.state.settings;
    },
    isFormDirty() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
    }
  },
  created() {
    this.loadConfig();
  },
  methods: {
    loadConfig() {
      this.loading = true;
      this.$store.dispatch('getSettings').then(() => {
        this.loading = false;
      });
    },
    update() {
      this.$refs.observer.validate().then(result => {
        console.log(this.settings);
        if (result) {
          this.loading = true;
          this.$store.dispatch('updateSettings', this.settings).then(() => {
            this.loading = false;
            console.log(this.$store.state.settings);
          });
          return;
        }
      });
    },
    reset() {
      this.loading = true;
      this.$store.dispatch('resetSettings').then(() => {
        this.loading = false;
      });
    }
  }
};
</script>
