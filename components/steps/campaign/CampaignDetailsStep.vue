<template>
  <section class="campaign_details_step_wrapper">
    <div class="step_title_wrapper">
      <span class="step_number"> 2 </span>
      <h2 class="step_title"> {{ $t("TITLES.CompaniesAndCampaignsForms.campaignDetailsStep") }} </h2>
    </div>

    <v-form
      class="w-100"
      ref="campaignDetailsForm"
      v-model="formIsValid"
      @submit.prevent="submitForm"
      lazy-validation
    >
      <div class="row">
        <!-- Start:: Features Input -->
        <base-input
          col="6"
          type="textarea"
          rows="6"
          :placeholder="$t('FORMS.Placeholders.featuresAr')"
          :serverSideErrorMessage="data.featuresAr.error"
          @clearServerSideErrorMessage="data.featuresAr.error = null"
          v-model.trim="data.featuresAr.value"
          required
        />
        <base-input
          col="6"
          type="textarea"
          rows="6"
          :placeholder="$t('FORMS.Placeholders.featuresEn')"
          :serverSideErrorMessage="data.featuresEn.error"
          @clearServerSideErrorMessage="data.featuresEn.error = null"
          v-model.trim="data.featuresEn.value"
          required
        />
        <!-- End:: Features Input -->

        <!-- Start:: Notes Input -->
        <base-input
          type="textarea"
          rows="6"
          :placeholder="$t('FORMS.Placeholders.otherNotes')"
          :serverSideErrorMessage="data.notes.error"
          @clearServerSideErrorMessage="data.notes.error = null"
          v-model.trim="data.notes.value"
          required
        />
        <!-- End:: Notes Input -->
      </div>
    </v-form>

    <div class="form_btns_wrapper">
      <base-button
        :btnText="$t('BUTTONS.previous')"
        styleType="text_btn"
        @fireClick="$emit('fireNavigateToPreviousStep')"
      />

      <base-button
        :btnText="$t('BUTTONS.submit')"
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
  name: "CampaignDetailsStep",

  emits: ['fireNavigateToPreviousStep', 'fireStepsSubmit'],

  props: {
    isWaitingApiResponse: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // Start:: Data Collection To Send
      data: {
        featuresAr: {
          value: null,
          error: null,
        },
        featuresEn: {
          value: null,
          error: null,
        },
        notes: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        featuresRules: [(val) => !!val || this.$t('FORMS.Validation.features')],
        notesRules: [(val) => !!val || this.$t('FORMS.Validation.notes')],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Fire Steps Submit
    async submitForm() {
      await this.$refs.campaignDetailsForm.validate(); 

      if (this.formIsValid){
        this.$emit("fireStepsSubmit", {
          featuresAr: this.data.featuresAr.value,
          featuresEn: this.data.featuresEn.value,
          notes: this.data.notes.value
        });
      }
    }
    // End:: Fire Steps Submit
  },
}
</script>

<style lang="scss" scoped>
.campaign_details_step_wrapper {
  .step_title_wrapper {
    margin-block-end: 2rem;
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