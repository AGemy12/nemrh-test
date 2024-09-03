<template>
  <div :class="col ? `col-md-${col}` : ''">
    <!-- Start:: Select Input -->
    <div class="input_wrapper select">
      <v-autocomplete
        :chips="multiple"
        :deletable-chips="multiple"
        :small-chips="multiple"
        :multiple="multiple"
        :items="isStatic ? _staticItems : items"
        item-value="id"
        item-text="name"
        :rules="validationRules"
        :error-messages="serverSideErrorMessage"
        :return-object="returnObject"
        :value="value"
        :label="placeholder"
        :solo="soloPlaceholder"
        append-icon="fa-solid fa-chevron-down"
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        :required="required"
        :disabled="disabled"
        flat
        ></v-autocomplete>
      <span class="spinnerIcon">
        <i v-if="isStatic && loading" class="fas fa-spinner"></i>
      </span>
      <transition name="fadeIn">
        <p class="validationErr" v-if="showAlert">{{ validationMessage }}</p>
      </transition>
    </div>
    <!-- End:: Select Input -->
  </div>
</template>

<script>
export default {
  name: 'BaseSelectInput',

  emits: ["clearServerSideErrorMessage"],

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    staticItems: {
      required: false,
      type: Array,
    },
    returnObject: {
      required: false,
      type: Boolean,
      default: true,
    },
    static: {
      required: false,
      type: Boolean,
      default: false,
    },
    getUrl: {
      required: false,
      type: String,
    },
    value: {
      required: true,
    },
    placeholder: {
      required: true,
      type: String,
    },
    soloPlaceholder: {
      required: false,
      type: Boolean,
      default: false,
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
    multiple: {
      required: false,
      type: Boolean,
      default: false,
    },
    disabled: {
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
      // Validation Alert
      showAlert: false,
      validationMessage: 'errer',

      items: [],
    }
  },

  computed: {
    _staticItems() {
      return this.staticItems
    },

    isStatic() {
      return this.static
    },
  },

  methods: {
    updateValue(e) {
      this.$emit('input', e)
    },

    clearServerSideErrorMessage() {
      if(this.serverSideErrorMessage) {
        this.$emit("clearServerSideErrorMessage");
      }
    },

    getSelectItems() {
      if (this.static) {
        // this.items = [...this._staticItems];

        return
      }

      this.$axiosRequest({
        method: 'GET',
        url: `${this.getUrl}`,
      })
        .then((res) => {
          this.items = res.data.data.map((item) => {
            return {
              id: item.id,
              name: item.name,
            }
          })
        })
        .catch((err) => {
          // console.log(err)
          this.items = [
            { id: 1, name: 'Item Default 1' },
            { id: 2, name: 'Item Default 2' },
          ]
        })
    },
  },

  created() {
    this.getSelectItems()
  },
}
</script>

<style scoped lang="scss"></style>
