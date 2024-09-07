<template>
  <section class="company_identity_form_step_wrapper">
    <div class="step_title_wrapper">
      <span class="step_number"> 3 </span>
      <h2 class="step_title">
        {{ $t('TITLES.CompaniesAndCampaignsForms.companyIdentity') }}
      </h2>
    </div>

    <v-form
      class="w-100 mt-8"
      ref="companyIdentityForm"
      v-model="formIsValid"
      lazy-validation
    >
      <!-- Start:: Logo Input -->
      <base-document-upload-input
        class="mb-8"
        identifier="company_logo"
        :placeholder="$t('FORMS.Placeholders.companyLogo') + '*'"
        accept=".jpg, .png, .svg, .bmp, .webp, .jpeg"
        @selectDocument="selectDocument"
        @clearErrors="data.logo.error = null"
        :errorMessage="data.logo.error"
        required
      />
      <!-- End:: Logo Input -->

      <!-- Start:: Commercial Register Input -->
      <base-document-upload-input
        class="my-6"
        identifier="company_commercial_register"
        :placeholder="$t('FORMS.Placeholders.commercialRegister') + '*'"
        @selectDocument="selectDocument"
        @clearErrors="data.commercialRegister.error = null"
        :errorMessage="data.commercialRegister.error"
        required
      />
      <!-- End:: Commercial Register Input -->
    </v-form>

    <div class="btns_wrapper">
      <base-button
        :btnText="$t('BUTTONS.previous')"
        styleType="text_btn"
        @fireClick="$emit('fireNavigateToPreviousStep')"
      />

      <base-button
        :btnText="$t('BUTTONS.submit')"
        styleType="primary_btn"
        @fireClick="submitForm"
        :isLoading="isWaitingApiResponse"
        :disabled="isWaitingApiResponse || !formIsValid"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompanyIdentityStep',

  emits: ['fireNavigateToPreviousStep', 'submitForm'],

  props: {
    isWaitingApiResponse: {
      type: Boolean,
      required: true,
      default: true,
    },
  },

  data() {
    return {
      // Start:: Company Details Data
      data: {
        logo: {
          value: null,
          error: null,
        },
        commercialRegister: {
          value: null,
          error: null,
        },
      },
      // End:: Company Details Data

      // Start:: Validation Schema
      formIsValid: true,
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Select Upload Document
    selectDocument(selectedDocument) {
      if (selectedDocument.identifier === 'company_logo') {
        this.formIsValid = true
        this.data.logo.value = selectedDocument
      } else if (
        selectedDocument.identifier === 'company_commercial_register'
      ) {
        this.formIsValid = true
        this.data.commercialRegister.value = selectedDocument
      }
    },
    // End:: Select Upload Document

    // Start:: Pass Selected Package Data To Parent Component
    submitForm() {
      if (!this.data.logo.value) {
        this.data.logo.error = this.$t('FORMS.Validation.companyLogo')
        this.formIsValid = false
        return
      } else if (!this.data.commercialRegister.value) {
        this.data.commercialRegister.error = this.$t(
          'FORMS.Validation.commercialRegister'
        )
        this.formIsValid = false
        return
      } else {
        if (this.formIsValid) {
          this.$emit('submitForm', {
            logo: this.data.logo.value,
            commercialRegister: this.data.commercialRegister.value,
          })
        }
      }
    },
    // End:: Pass Selected Package Data To Parent Component
  },
}
</script>

<style lang="scss" scoped>
.company_identity_form_step_wrapper {
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
    margin-block-start: 4rem;
    @include flex(flex-end, center);
    column-gap: 0.5rem;
  }
}
</style>
