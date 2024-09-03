<template>
  <div :class="col ? `col-md-${col}` : ''">
    <div class="input_wrapper textarea">
      <v-textarea
        :rows="rows"
        :label="placeholder"
        :value="value"
        @input="updateValue($event)"
        :required="required"
      ></v-textarea>
    </div>

  </div>
</template>

<script>
export default {
  name: "BaseTextArea",

  props: {
    // ====== General Inputs Props
    value: {
      required: true,
    },
    rows: {
      required: false,
      type: String,
      default: "5"
    },
    placeholder: {
      required: true,
      type: String,
    },
    col: {
      required: false,
      type: String,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e);
    },
  },
};
</script>
