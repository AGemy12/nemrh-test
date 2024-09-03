<template>
  <div :class="col ? `col-md-${col}` : ''">
    <div class="flagged_phone_content_wrapper" v-if="selectedCountry">
      <!-- Start:: Flag & Country Key -->
      <div class="wrapper position-relative">
        <!-- ********** Start:: Selected Flag & Key ********** -->
        <button
          type="button"
          class="selected_flag_wrapper"
          @click.stop="toggleCountriesKeysMenu"
        >
          <!-- <span class="selected_country_key">
            {{ selectedCountry.key }}
          </span> -->
          <img
            class="selected_country_flg"
            :src="selectedCountry.flag"
            alt="country flag"
            width="30"
            height="22"
          />
        </button>
        <!-- ********** End:: Selected Flag & Key ********** -->

        <!-- ********** Start:: Flags & Keys List ********** -->
        <transition name="fadeInUp">
          <ul class="keys_and_flags_list p-0" v-if="countriesKeysMenuIsOpen">
            <li
              v-for="item in countriesKeys"
              :key="item.id"
              @click.stop="selectKey(item)"
              class="list_item"
            >
              <img
                class="country_flg"
                :src="item.flag"
                alt="country flag"
                width="30"
                height="22"
              />
              <!-- <span class="country_key">
                {{ item.key }}
              </span> -->
            </li>
          </ul>
        </transition>
        <!-- ********** End:: Flags & Keys List ********** -->
      </div>
      <!-- End:: Flag & Country Key -->

      <!-- Start:: Phone Input -->
      <div class="input_wrapper">
        <v-text-field
          type="number"
          :label="placeholder"
          :value="value"
          @blur="validateInput(value)"
          @input="updateValue($event)"
          :required="required"
        >
        </v-text-field>
        <!-- <transition name="fadeIn">
          <p class="validationErr" v-if="showAlert">{{ validationMessage }}</p>
        </transition> -->
      </div>
      <!-- End:: Phone Input -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCountryFlagPhoneInput',

  props: {
    // ====== General Inputs Props
    value: {
      required: true,
    },
    placeholder: {
      required: true,
      type: String,
      required: true,
      type: String,
    },
    col: {
      required: false,
      type: String,
    },
    preSelectedPhoneCode: {
      required: false,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // Validation Alert
      showAlert: false,
      validationMessage: 'error',
      countriesKeys: [
        {
          id: 1,
          key: "02",
          flag: require("@/assets/media/icons/flags/ar.png")
        },
        {
          id: 2,
          key: "9665",
          flag: require("@/assets/media/icons/flags/en.png")
        }
      ],

      // Start:: Controle Countries Keys Menu Data
      countriesKeysMenuIsOpen: false,
      // End:: Controle Countries Keys Menu Data

      // Start:: Selected Country Data
      selectedCountry: null,
      // End:: Selected Country Data

      // Start:: Front End Input Validation
      frontEndInputValidation: {
        inputValue: [(val) => (val || '').length > 0 || this.validationHint],
      },
      // End:: Front End Input Validation
    }
  },

  methods: {
    // Start:: Update Input Value
    updateValue(e) {
      this.$emit('input', e)
    },
    // End:: Update Input Value

    // Start:: Toggle Countries Keys Menu
    toggleCountriesKeysMenu() {
      this.countriesKeysMenuIsOpen = !this.countriesKeysMenuIsOpen
    },
    // End:: Toggle Countries Keys Menu

    // Start:: Update Selected Country Key Value
    updateSelectedCountryKeyValue() {
      // this.$emit("changeKey", this.selectedCountry.key);
      this.$emit('changeKey', this.selectedCountry)
    },
    // End:: Update Selected Country Key Value

    // Start:: Select Country Key
    selectKey(country) {
      this.selectedCountry = country
      this.updateSelectedCountryKeyValue()
      this.toggleCountriesKeysMenu()
    },
    // End:: Select Country Key

    validateInput(value) {
      let valid = true

      if (!value) {
        this.validationMessage = this.$t('validation.empty')
        valid = false
      }

      this.showAlert = !valid
    },

    getCountryKeys() {
      this.selectedCountry = this.preSelectedPhoneCode;

      // this.$axiosRequest({
      //   method: 'GET',
      //   url: `countries`,
      // })
      //   .then((res) => {
      //     this.countriesKeys = res.data.data.map((item) => {
      //       return {
      //         id: item.id,
      //         key: item.phone_code,
      //         // flag: item.flag,
      //       }
      //     })

      //     // ********** Start:: Set Initial Selected Key **********

      //     if (this.preSelectedPhoneCode) {
      //       this.selectedCountry = this.countriesKeys.find(
      //         (country) => country.key == this.preSelectedPhoneCode
      //       )
      //       this.updateSelectedCountryKeyValue()
      //     } else {
      //       this.selectKey(this.countriesKeys[0])
      //       this.toggleCountriesKeysMenu()
      //     }

      //     // ********** End:: Set Initial Selected Key **********
      //   })
      //   .catch((err) => {
      //     // console.log(err)
      //   })
    },
  },
  watch: {
    preSelectedPhoneCode() {
      if (
        typeof this.preSelectedPhoneCode != 'object' &&
        this.preSelectedPhoneCode
      ) {
        this.selectedCountry = this.countriesKeys.find(
          (country) => country.key == this.preSelectedPhoneCode
        )
        this.updateSelectedCountryKeyValue()
      } else {
        this.selectedCountry = this.countriesKeys[0]
        this.updateSelectedCountryKeyValue()
      }
    },
  },
  created() {
    // Start:: Fire Methods
    this.getCountryKeys()
    if (process.client) {
      window.addEventListener('click', () => {
        this.countriesKeysMenuIsOpen = false
      })
    }
    // End:: Fire Methods
  },
}
</script>
