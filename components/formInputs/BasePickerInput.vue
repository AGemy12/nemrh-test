<template>
  <div :class="col ? `col-md-${col}` : ''">
    <!-- Start:: Date Picker Input -->
    <div class="input_wrapper picker" v-if="type == 'date'">
      <v-dialog
        ref="dialog"
        persistent
        v-model="DateModalIsActive"
        :return-value.sync="value"
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="value"
            @input="updateValue($event)"
            :label="placeholder"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
          <span
            @click="$emit('emptyData')"
            :class="{ show: value }"
            class="closeIcon"
            ><i class="fas fa-times-circle"></i
          ></span>
        </template>
        <v-date-picker :value="value" @input="updateValue($event)" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="DateModalIsActive = false">
            {{ $t("BUTTONS.cancel") }}
          </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(value)">
            {{ $t("BUTTONS.select") }}
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </div>
    <!-- End:: Date Picker Input -->

    <!-- Start:: Time Picker Input -->
    <div class="input_wrapper" v-else-if="type == 'time'">
      <v-dialog
        ref="dialog"
        v-model="timeModalIsActive"
        :return-value.sync="value"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="value"
            @input="updateValue($event)"
            :label="placeholder"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timeModalIsActive"
          :value="value"
          @input="updateValue($event)"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="timeModalIsActive = false">
            {{ $t("BUTTONS.cancel") }}
          </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(value)">
            {{ $t("BUTTONS.select") }}
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </div>
    <!-- End:: Time Picker Input -->
  </div>
</template>

<script>
export default {
  name: "BasePickerInput",

  props: {
    type: {
      required: true,
      type: String,
    },
    value: {
      required: true,
    },
    placeholder: {
      required: true,
      type: String,
    },
    validationHint: {
      required: false,
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

  data() {
    return {
      // Start:: Modals Apperance Data
      DateModalIsActive: false,
      timeModalIsActive: false,
      // End:: Modals Apperance Data

      // Start:: Front End Input Validation
      // frontEndInputValidation: {
      //   inputValue: value => !!value || '*Item is required',
      // },
      // End:: Front End Input Validation
    };
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e);
    },
  },
};
</script>
