<template>
  <div class="advertisements_first_step" id="advertisementsSecondStep">
    <h3 class="advertisements_first_step_head">
      {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepOneTitle') }}
    </h3>
    <h4>
      {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepTwoSubTitle') }}
    </h4>
    <div class="advertisement_price_container">
      <span v-html="$t('FORMS.Placeholders.advertisementPrice')"> </span>
      <span class="advertisement_price"> 1000 {{ $t('OTHERS.Ryal') }} </span>
    </div>
    <div class="advertisements_second_step_content">
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
          <!-- <base-input
            col="6"
            type="text"
            :placeholder="$t('FORMS.Placeholders.advertisementPeriod') + '*'"
            :validationRules="validationSchema.periodRules"
            :serverSideErrorMessage="data.period.error"
            @clearServerSideErrorMessage="data.period.error = null"
            v-model.trim="data.period.value"
            required
          /> -->
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

          <!-- Start:: Advertisement Period Input -->

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
            type="date"
            :placeholder="$t('FORMS.Placeholders.advertisementEnd') + '*'"
            :validationRules="validationSchema.dateRules"
            :serverSideErrorMessage="data.endDate.error"
            @clearServerSideErrorMessage="data.endDate.error = null"
            v-model.trim="data.endDate.value"
            required
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
          <!-- Start:: Advertisement Link Input -->

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
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvertisementsSecondStep',

  emits: ['fireNavigateToSecondStep'],

  props: {
    companyDetails: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      // Start::Categories Data
      categories: [],
      // End::Categories Data

      // Start Ads Duration Data
      categories: [30, 60, 90, 120, 150, 180],
      // End Ads Duration Data

      // Start:: Company Details Data
      data: {
        advertisementName: {
          value: this.companyDetails?.title_en || null,
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
        period: {
          value: null,
          error: null,
        },
        website: {
          value: this.companyContactInfo?.link || null,
          error: null,
        },
        advertisementImage: {
          value: null,
          error: null,
        },
      },
      // End:: Company Details Data

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        priceRules: [
          (val) => !!val || this.$t('FORMS.Validation.price'),
          (val) => /^\d+$/.test(val) || this.$t('FORMS.Validation.onlyNumbers'),
          (val) =>
            (val && val.length <= 3) ||
            this.$t('FORMS.Validation.maxThreeDigits'),
        ],
        periodRules: [
          (val) => !!val || this.$t('FORMS.Validation.advertisementPeriod'),
        ],
        // periodRules: [
        //   (val) => !!val || this.$t('FORMS.Validation.advertisementPeriod'),
        //   (val) =>
        //     /^\d+$/.test(val) ||
        //     this.$t('FORMS.Validation.advertisementPeriodNums'),
        // ],
        dateRules: [(val) => !!val || this.$t('FORMS.Validation.date')],
        websiteRules: [
          (val) => !!val || this.$t('FORMS.Validation.advertisementLink'),
        ],
        // platformRules: [
        //   (val) => !!val || this.$t('FORMS.Validation.socialPlatform'),
        // ],
        // linkRules: [(val) => !!val || this.$t('FORMS.Validation.link')],
        addressRules: [(val) => !!val || this.$t('FORMS.Validation.address')],
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
    },
    // End:: Watchers to calculate endDate based on startDate and period
  },

  methods: {
    // Start:: Select Upload Document
    selectDocument(selectedDocument) {
      if (selectedDocument.identifier === 'company_logo') {
        this.formIsValid = true
        this.data.advertisementImage.value = selectedDocument
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

    // Start:: Get Categories

    validateForm() {
      let isValid = true

      if (!this.data.startDate.value) {
        this.data.startDate.error = this.$t('FORMS.Validation.date')
        isValid = false
      } else {
        this.data.startDate.error = null
      }

      if (!this.data.endDate.value) {
        this.data.endDate.error = this.$t('FORMS.Validation.date')
        isValid = false
      } else {
        this.data.endDate.error = null
      }

      if (!this.data.period.value) {
        this.data.period.error = this.$t('FORMS.Validation.advertisementPeriod')
        isValid = false
      } else {
        this.data.period.error = null
      }

      if (!this.data.website.value) {
        this.data.website.error = this.$t('FORMS.Validation.advertisementLink')
        isValid = false
      } else {
        this.data.website.error = null
      }

      if (!this.data.advertisementImage.value) {
        this.data.advertisementImage.error = this.$t(
          'FORMS.Validation.required'
        )
        isValid = false
      } else {
        this.data.advertisementImage.error = null
      }

      if (isValid) {
        this.$emit('formSubmitted', {
          advertisementName: this.data.advertisementName.value,
          startDate: this.data.startDate.value,
          endDate: this.data.endDate.value,
          period: this.data.period.value,
          website: this.data.website.value,
        })
      }

      return isValid
    },

    // async getCategories() {
    //   try {
    //     // ********** Start:: Implement Request ********** //
    //     let res = await this.$axiosRequest({
    //       method: 'GET',
    //       url: 'categories',
    //     })
    //     // ********** End:: Implement Request ********** //
    //     this.categories = res.data.data.map((item) => {
    //       return {
    //         id: item.id,
    //         name: item.title,
    //       }
    //     })
    //   } catch (err) {
    //     console.log(err.response.data.message)
    //   }
    // },
    // End:: Get Categories

    // Start:: Pass Selected Package Data To Parent Component
    // async navigateToSecondStep() {
    //   await this.$refs.companyDetailsForm.validate()

    //   if (this.formIsValid) {
    //     this.$emit('fireNavigateToSecondStep', {
    //       nameAr: this.data.nameAr.value,
    //       nameEn: this.data.nameEn.value,
    //       serviceAr: this.data.serviceAr.value,
    //       serviceEn: this.data.serviceEn.value,
    //       workField: this.data.workField.value,
    //     })
    //   }
    // },
    // End:: Pass Selected Package Data To Parent Component
  },

  // created() {
  //   // Start:: Fire Methods
  //   this.getCategories()
  //   // End:: Fire Methods
  // },
}
</script>

<style lang="scss" scoped>
.advertisements_first_step {
  display: flex;
  gap: 20px;
  flex-direction: column;
  h3 {
    color: var(--white);
    width: fit-content;
    margin: 10px auto;
    padding: 10px;
    background-color: var(--main_theme_clr);
    font-size: 22px;
    text-transform: capitalize;
    border-radius: 5px;
    @media (max-width: 450px) {
      font-size: 20px;
    }
  }
  h4 {
    width: fit-content;
    margin-right: 0;
    font-size: 20px;
    text-transform: capitalize;
    @media (max-width: 450px) {
      font-size: 18px;
    }
  }
  .advertisement_price_container {
    width: fit-content;
    margin: 30px auto !important;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    @include flex(center, center, row, 10px);
    text-transform: capitalize;
    .advertisement_price {
      padding: 5px 8px !important;
      border: 2px solid var(--main_theme_clr);
      background-color: var(--main_theme_clr);
      border-radius: 5px;
      color: var(--white);
    }
  }
}
</style>
