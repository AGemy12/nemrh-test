<template>
  <div :class="col ? `col-md-${col}` : ''">
    <div class="input_wrapper otp_wrapper" dir="ltr">
      <v-otp-input
        ref="otpInput"
        type="text"
        :length="otpLength"
        :value="value"
        @input="updateValue($event)"
        @blur="handelCustomErrorMessages"
        :rules="validationRules"
        :error-messages="serverSideErrorMessage"
      />
      <span class="error_message" v-if="serverSideErrorMessage"> {{serverSideErrorMessage}} </span>
      <span class="error_message" v-if="customErrorMessage && value.length != 4"> {{customErrorMessage}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseOtpInput",

  props: {
    // ====== General Inputs Props
    otpLength: {
      required: true,
      type: String,
    },
    value: {
      required: true,
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
    validationRules: {
      required: false,
      type: Array,
    },
    serverSideErrorMessage: {
      required: false,
    },
  },

  data() {
    return {
      // Start:: Error Text Data Depends On Rules Prop
      customErrorMessage: null,
      // End:: Error Text Data Depends On Rules Prop
    }
  },

  methods: {
    handelCustomErrorMessages() {
      var otpInputElement = this.$refs.otpInput;
      this.customErrorMessage = otpInputElement.messagesToDisplay[0];
    },

    updateValue(e) {
      this.$emit("input", e);
      this.handelCustomErrorMessages();
    },
  },
};
</script>
