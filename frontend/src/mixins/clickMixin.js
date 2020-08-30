export default {
  methods: {
    clicked(value) {
      // alert(value);
      this.$emit('authCompleted', 'test');
    }
  }
};
