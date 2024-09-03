<template>
  <div :class="col ? `col-md-${col}` : ''">
    <!-- Start:: Text || Number || Tel || Email || Date Input -->
    <div
      class="input_wrapper"
      v-if="
        type == 'text' ||
        type == 'number' ||
        type == 'tel' ||
        type == 'email' ||
        type == 'search' ||
        type == 'date'
      "
    >
      <v-text-field
        :type="type"
        :label="placeholder"
        :placeholder="staticPlaceholder"
        :value="value"
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        @blur="fireBlur"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :rules="validationRules"
        :error-messages="serverSideErrorMessage"
        :loading="inputIsLoading"
        loader-height="3"
        loader-color="yellow darken-2"
      >
      </v-text-field>
    </div>
    <!-- End:: Text || Number || Tel || Email || Date Input -->

    <!-- Start:: Password Input -->
    <div class="input_wrapper" v-else-if="type == 'password'">
      <v-text-field
        :type="passwordIsVisible ? 'text' : 'password'"
        :label="placeholder"
        :placeholder="staticPlaceholder"
        :required="required"
        :value="value"
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        :rules="validationRules"
        :error-messages="serverSideErrorMessage"
      >
        <template slot="append">
          <button type="button" @click="passwordIsVisible = !passwordIsVisible">
            <span v-show="passwordIsVisible">
              <i class="fa-solid fa-eye-slash"></i>
            </span>
            <span v-show="!passwordIsVisible">
              <i class="fa-solid fa-eye"></i>
            </span>
          </button>
        </template>
      </v-text-field>
    </div>
    <!-- End:: Password Input -->

    <!-- Start:: Textarea Input -->
    <div class="input_wrapper" v-else-if="type == 'textarea'">
      <v-textarea
        :label="placeholder"
        :placeholder="staticPlaceholder"
        :value="value"
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        :required="required"
        :rows="rows"
        :rules="validationRules"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="serverSideErrorMessage"
      ></v-textarea>
    </div>
    <!-- End:: Textarea Input -->

    <!-- Start:: CKEditor Input -->
    <template v-else-if="type == 'ckeditor'">
      <label class="v-label">{{ placeholder }}</label>
      <ckeditor
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        :value="value"
      ></ckeditor>
    </template>
    <!-- End:: CKEditor Input -->
  </div>
</template>

<script>
export default {
  name: 'base-input',

  emits: ['input', 'fireBlur', 'clearServerSideErrorMessage'],

  props: {
    value: {
      required: true,
    },
    type: {
      required: true,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    staticPlaceholder: {
      required: false,
      type: String,
    },
    col: {
      required: false,
      type: String,
    },
    readonly: {
      required: false,
      type: Boolean,
      default: false,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
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
      type: String,
    },
    inputIsLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    rows: {
      required: false,
      type: String,
      default: '4',
    },
  },

  data() {
    return {
      passwordIsVisible: false,
    }
  },

  methods: {
    updateValue(e) {
      this.$emit('input', e)
    },

    fireBlur() {
      this.$emit('fireBlur')
    },

    clearServerSideErrorMessage() {
      if (this.serverSideErrorMessage) {
        this.$emit('clearServerSideErrorMessage')
      }
    },
  },
}
</script>
