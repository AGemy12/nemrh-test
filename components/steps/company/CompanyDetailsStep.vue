<template>
  <section class="company_details_form_step_wrapper">
    <div class="step_title_wrapper">
      <span class="step_number"> 1 </span>
      <h2 class="step_title">
        {{ $t('TITLES.CompaniesAndCampaignsForms.companyDetails') }}
      </h2>
    </div>

    <v-form
      class="w-100 mt-8"
      ref="companyDetailsForm"
      v-model="formIsValid"
      lazy-validation
    >
      <div class="row">
        <!-- Start:: Company Name Input -->
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.companyNameAr') + '*'"
          :validationRules="validationSchema.nameRules"
          :serverSideErrorMessage="data.nameAr.error"
          @clearServerSideErrorMessage="data.nameAr.error = null"
          v-model.trim="data.nameAr.value"
          required
        />
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.companyNameEn') + '*'"
          :validationRules="validationSchema.nameRules"
          :serverSideErrorMessage="data.nameEn.error"
          @clearServerSideErrorMessage="data.nameEn.error = null"
          v-model.trim="data.nameEn.value"
          required
        />
        <!-- End:: Company Name Input -->

        <!-- Start:: Company Service Input -->
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.companyServiceAr') + '*'"
          :validationRules="validationSchema.serviceRules"
          :serverSideErrorMessage="data.serviceAr.error"
          @clearServerSideErrorMessage="data.serviceAr.error = null"
          v-model.trim="data.serviceAr.value"
          required
        />
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.companyServiceEn') + '*'"
          :validationRules="validationSchema.serviceRules"
          :serverSideErrorMessage="data.serviceEn.error"
          @clearServerSideErrorMessage="data.serviceEn.error = null"
          v-model.trim="data.serviceEn.value"
          required
        />
        <!-- End:: Company Service Input -->

        <!-- Start:: Work Field Input -->
        <base-select-input
          v-if="categories.length > 0"
          static
          :staticItems="categories"
          :placeholder="$t('FORMS.Placeholders.workField') + '*'"
          :validationRules="validationSchema.workFieldRules"
          :serverSideErrorMessage="data.workField.error"
          @clearServerSideErrorMessage="data.workField.error = null"
          v-model="data.workField.value"
        />
        <!-- End:: Work Field Input -->
      </div>
    </v-form>

    <div class="btns_wrapper">
      <base-button
        :btnText="$t('BUTTONS.next')"
        styleType="primary_btn"
        @fireClick="navigateToSecondStep"
        :disabled="!formIsValid"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompanyDetailsStep',

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

      // Start:: Company Details Data
      data: {
        nameAr: {
          value: this.companyDetails?.title_ar || null,
          error: null,
        },
        nameEn: {
          value: this.companyDetails?.title_en || null,
          error: null,
        },
        serviceAr: {
          value: this.companyDetails?.main_service_ar || null,
          error: null,
        },
        serviceEn: {
          value: this.companyDetails?.main_service_en || null,
          error: null,
        },
        workField: {
          value: null,
          error: null,
        },
        aboutCompanyAr: {
          value: this.companyDetails?.desc_ar || null,
          error: null,
        },
        aboutCompanyEn: {
          value: this.companyDetails?.desc_en || null,
          error: null,
        },
      },
      // End:: Company Details Data

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        nameRules: [(val) => !!val || this.$t('FORMS.Validation.name')],
        serviceRules: [(val) => !!val || this.$t('FORMS.Validation.service')],
        workFieldRules: [
          (val) => !!val || this.$t('FORMS.Validation.workField'),
        ],
        aboutCompanyRules: [
          (val) => !!val || this.$t('FORMS.Validation.aboutCompany'),
        ],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Get Categories
    async getCategories() {
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'categories',
        })
        // ********** End:: Implement Request ********** //
        this.categories = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.title,
          }
        })
      } catch (err) {
        console.log(err.response.data.message)
      }
    },
    // End:: Get Categories

    // Start:: Pass Selected Package Data To Parent Component
    async navigateToSecondStep() {
      await this.$refs.companyDetailsForm.validate()

      if (this.formIsValid) {
        this.$emit('fireNavigateToSecondStep', {
          nameAr: this.data.nameAr.value,
          nameEn: this.data.nameEn.value,
          serviceAr: this.data.serviceAr.value,
          serviceEn: this.data.serviceEn.value,
          workField: this.data.workField.value,
          aboutCompanyAr: this.data.aboutCompanyAr.value,
          aboutCompanyEn: this.data.aboutCompanyEn.value,
        })
      }
    },
    // End:: Pass Selected Package Data To Parent Component
  },

  created() {
    // Start:: Fire Methods
    this.getCategories()
    // End:: Fire Methods
  },
}
</script>

<style lang="scss" scoped>
.company_details_form_step_wrapper {
  .step_title_wrapper {
    margin-block: 1rem;
    @include flex(flex-start, center);
    column-gap: 0.8rem;
    .step_number {
      @include flex(center, center);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--main_theme_clr);
      font-size: 0.8rem;
      color: var(--white);
    }

    .step_title {
      width: calc(100% - 20px + 0.8rem);
      margin-block-end: 0 !important;
      font-size: 1rem;
      font-family: $bold_font;
      line-height: 1.8;
    }
  }

  .btns_wrapper {
    @include flex(flex-end, center);
    column-gap: 0.5rem;
  }
}
</style>
