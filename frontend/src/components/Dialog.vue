<template>
  <v-row justify="center">
    <v-dialog v-if="show" v-model="show" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="cancelButtonEnabled === true"
            :color="cancelButtonColor"
            text
            @click.stop="cancelClicked"
            >{{ cancelButtonText }}</v-btn
          >
          <v-btn :color="confirmButtonColor" text @click.stop="okClicked">{{
            confirmButtonText
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    text: String,
    object: Object,
    cancelButtonEnabled: {
      default: true,
      type: Boolean
    },
    cancelButtonText: {
      default: 'Cancel',
      type: String
    },
    confirmButtonText: {
      default: 'OK',
      type: String
    },
    cancelButtonColor: {
      default: 'blue darken-1',
      type: String
    },
    confirmButtonColor: {
      default: 'green darken-1',
      type: String
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    okClicked() {
      this.show = false;
      // https://vuejs.org/v2/guide/components-custom-events.html
      if (this.object) {
        this.$emit('confirmed', this.object);
      } else {
        this.$emit('confirmed');
      }
    },
    cancelClicked() {
      this.show = false;
      if (this.object) {
        this.$emit('canceled', this.object);
      } else {
        this.$emit('canceled');
      }
    }
  }
};
</script>
