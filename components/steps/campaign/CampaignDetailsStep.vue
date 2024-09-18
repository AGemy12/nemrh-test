<template>
  <section class="campaign_details_step_wrapper">
    <div class="step_title_wrapper">
      <h2 class="step_title">{{ selectedPackageName }}</h2>
      <h4 class="step_subtitle">
        {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepTwoSubTitle') }}
      </h4>
    </div>

    <div class="advertisement_price_container">
      <div class="advertisement_price">
        <span v-html="$t('FORMS.Placeholders.advertisementPrice')"> </span>
        <span class="advertisement_price_value">
          {{ discountedPrice }} {{ $t('OTHERS.Ryal') }}
        </span>
      </div>
      <div class="advertisement_disc">
        <span v-html="$t('FORMS.Placeholders.advertisementPrecDisc')"> </span>
        <span class="advertisement_discount_prec">
          {{ discountPercentage }}%
        </span>
      </div>
    </div>

    <v-form
      class="w-100 mt-8"
      ref="companyDetailsForm"
      v-model="formIsValid"
      lazy-validation
    >
      <div class="row">
        <!-- Start:: Advertisement Name And Price Input -->
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.advertisementTitle') + '*'"
          v-model.trim="data.advertisementName.value"
        />
        <!-- End:: Advertisement Name And Price Input -->

        <!-- Start:: Advertisement Period Input -->
        <base-select-input
          col="6"
          static
          :staticItems="categories"
          :placeholder="$t('FORMS.Placeholders.advertisementPeriod') + '*'"
          :validationRules="validationSchema.periodRules"
          :serverSideErrorMessage="data.period.error"
          @clearServerSideErrorMessage="data.period.error = null"
          v-model="data.period.value"
          required
        />
        <!-- End:: Advertisement Period Input -->

        <!-- Start:: Advertisement Date Input -->
        <base-input
          col="6"
          type="date"
          :placeholder="$t('FORMS.Placeholders.advertisementStart') + '*'"
          :validationRules="validationSchema.dateRules"
          :serverSideErrorMessage="data.startDate.error"
          @clearServerSideErrorMessage="data.startDate.error = null"
          v-model.trim="data.startDate.value"
          required
        />
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.advertisementEnd')"
          v-model="data.endDate.value"
          disabled
        />
        <!-- End:: Advertisement Date Input -->

        <!-- Start:: Advertisement Link Input -->
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.advertisementLink') + '*'"
          :validationRules="validationSchema.websiteRules"
          :serverSideErrorMessage="data.website.error"
          @clearServerSideErrorMessage="data.website.error = null"
          v-model.trim="data.website.value"
          required
        />
        <!-- End:: Advertisement Link Input -->

        <!-- Start:: Advertisement Image Input -->
        <base-document-upload-input
          col="6"
          class="mb-8"
          identifier="company_logo"
          :placeholder="$t('FORMS.Placeholders.advertisementImage') + '*'"
          accept=".jpg, .jpeg, .png, .svg, .webp"
          @selectDocument="selectDocument"
          @clearErrors="data.advertisementImage.error = null"
          :errorMessage="data.advertisementImage.error"
          required
        />
        <!-- End:: Advertisement Image Input -->
      </div>
    </v-form>

    <div class="form_btns_wrapper">
      <base-button
        :btnText="$t('BUTTONS.previous')"
        styleType="text_btn"
        @fireClick="$emit('fireNavigateToPreviousStep')"
      />

      <base-button
        :btnText="$t('BUTTONS.next')"
        styleType="primary_btn"
        :isLoading="isWaitingApiResponse"
        :disabled="!formIsValid || isWaitingApiResponse"
        @fireClick="submitForm"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CampaignDetailsStep',

  emits: ['fireNavigateToPreviousStep', 'fireStepsSubmit'],

  props: {
    isWaitingApiResponse: {
      type: Boolean,
      default: false,
    },
    selectedPackageName: {
      type: String,
      default: '',
    },
    period: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    advertisementImage: {
      type: Object,
      default: () => null,
    },
  },

  data() {
    return {
      // Start:: Data Collection To Send
      data: {
        advertisementName: {
          value: null,
          error: null,
        },
        period: {
          value: null,
          error: null,
        },
        startDate: {
          value: null,
          error: null,
        },
        endDate: {
          value: null,
          error: null,
        },
        website: {
          value: null,
          error: null,
        },
        advertisementImage: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Categories Data
      categories: [30, 90, 180, 365],
      // End:: Categories Data

      discountedPrice: this.originalPrice,
      discountPercentage: 0,

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        periodRules: [
          (val) => !!val || this.$t('FORMS.Validation.advertisementPeriod'),
        ],
        dateRules: [
          (val) => !!val || this.$t('FORMS.Validation.date'),
          (val) => {
            const today = new Date().toISOString().split('T')[0]
            return (
              val >= today ||
              this.$t('FORMS.Validation.advertisementStartInFuture')
            )
          },
        ],
        websiteRules: [
          (val) => !!val || this.$t('FORMS.Validation.advertisementLink'),
        ],
      },
      // End:: Validation Schema
    }
  },

  watch: {
    // Start:: Watchers to calculate endDate based on startDate and period
    'data.startDate.value'(newVal) {
      this.calculateEndDate()
    },
    'data.period.value'(newVal) {
      this.calculateEndDate()
      this.applyDiscount()
    },
    // End:: Watchers to calculate endDate based on startDate and period
    originalPrice(newVal) {
      this.discountedPrice = newVal
      this.applyDiscount()
    },
  },

  methods: {
    // Start:: Select Upload Document
    selectDocument(selectedDocument) {
      if (selectedDocument.identifier === 'company_logo') {
        this.formIsValid = true
        const reader = new FileReader()

        reader.onload = (event) => {
          const imageBase64 = event.target.result

          // تخزين الصورة في localStorage
          localStorage.setItem('adImage', imageBase64)
        }
        reader.readAsDataURL(selectedDocument.file) // تحويل الملف إلى Base64
      }
    },
    // End:: Select Upload Document

    calculateEndDate() {
      if (this.data.startDate.value && this.data.period.value) {
        const startDate = new Date(this.data.startDate.value)
        startDate.setDate(
          startDate.getDate() + parseInt(this.data.period.value)
        )
        this.data.endDate.value = startDate.toISOString().split('T')[0]
      }
    },
    // Start :: Discount Operations

    applyDiscount() {
      const period = this.data.period.value
      const originalPrice = this.originalPrice
      let discountRate = 0

      if (period === 90) {
        discountRate = 0.15
        this.$set(
          this,
          'discountedPrice',
          3 * originalPrice - originalPrice * discountRate * 3
        )
      } else if (period === 180) {
        discountRate = 0.2
        this.$set(
          this,
          'discountedPrice',
          6 * originalPrice - originalPrice * discountRate * 6
        )
      } else if (period === 365) {
        discountRate = 0.3
        this.$set(
          this,
          'discountedPrice',
          12 * originalPrice - originalPrice * discountRate * 12
        )
      } else {
        this.$set(this, 'discountedPrice', originalPrice)
      }

      this.discountPercentage = discountRate * 100
    },
    // Start :: Discount Operations

    // Start :: Submit Form
    async submitForm() {
      await this.$refs.companyDetailsForm.validate()

      const today = new Date().toISOString().split('T')[0]

      if (this.data.startDate.value < today) {
        this.data.startDate.error = this.$t(
          'FORMS.Validation.advertisementStartInFuture'
        )
        return
      }

      if (this.formIsValid) {
        this.$emit('fireStepsSubmit', {
          advertisementName: this.data.advertisementName.value,
          startDate: this.data.startDate.value,
          endDate: this.data.endDate.value,
          period: this.data.period.value,
          website: this.data.website.value,
          advertisementImage: this.data.advertisementImage.value,
          price: this.discountedPrice || 0,
          discountPercentage: this.discountPercentage || 0,
          advertisementPosition: this.selectedPackageName,
        })
      }
    },
    // End   :: Submit Form
  },
  created() {
    console.log('Original Price:', this.originalPrice)
    this.discountedPrice = this.originalPrice
  },
}
</script>

<style lang="scss" scoped>
.campaign_details_step_wrapper {
  .step_title_wrapper {
    margin-block-end: 2rem;
    .step_title {
      color: var(--white);
      width: fit-content;
      margin: 10px auto;
      padding: 10px;
      background-color: var(--main_theme_clr);
      font-size: 22px;
      border-radius: 5px;
      @media (max-width: 450px) {
        font-size: 20px;
      }
    }
    .step_subtitle {
      width: fit-content;
      margin-right: 0;
      font-size: 20px;
      text-transform: capitalize;
      @media (max-width: 450px) {
        font-size: 18px;
      }
    }
  }
  .advertisement_price_container {
    width: fit-content;
    margin: 30px auto !important;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    @include flex(center, center, row, 20px);
    text-transform: capitalize;

    .advertisement_price {
      @include flex(center, center, row, 10px);
    }
    .advertisement_price_value {
      padding: 5px 8px !important;
      border: 2px solid var(--main_theme_clr);
      background-color: var(--main_theme_clr);
      border-radius: 5px;
      color: var(--white);
    }
  }
  .form_btns_wrapper {
    @include flex(flex-end, center);
    column-gap: 0.5rem;
    .text_btn {
      min-width: unset;
      font-family: $semi_bold_font;
    }
  }
}
</style>
