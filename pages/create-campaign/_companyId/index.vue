<template>
  <section class="crete_campaign_page_wrapper">
    <div class="container">
      <!-- ========== Start:: Page Header ========== -->
      <div class="page_header_wrapper">
        <h1 class="section_title"> {{ $t('TITLES.CompaniesAndCampaignsForms.title') }} </h1>
        <p class="section_desc"> {{ $t("TITLES.CompaniesAndCampaignsForms.desc") }} </p>
      </div>
      <!-- ========== End:: Page Header ========== -->

      <!-- ========== Start:: Campaign Forms ========== -->
      <div class="campaigns_forms_wrapper">
        <v-stepper
          v-model="currentStep" 
          class="p-0"
          flat
        >
          <v-stepper-items>
            <v-stepper-content step="packageStep">
              <SelectPackageStep 
                @fireNavigateToNextStep="handelNextStepNavigation"
              />
            </v-stepper-content>

            <v-stepper-content step="detailsStep">
              <CampaignDetailsStep
                @fireNavigateToPreviousStep="currentStep = 'packageStep'"
                @fireStepsSubmit="handelLastStepSubmit"
                :isWaitingApiResponse="isWaitingApiResponse"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
      <!-- ========== End:: Campaign Forms ========== -->
    </div>
  </section>
</template>

<script>
  import SelectPackageStep from "@/components/steps/campaign/SelectPackageStep.vue";
  import CampaignDetailsStep from "@/components/steps/campaign/CampaignDetailsStep.vue";

  export default {
    name: "CreateCampaign",

    transition: {
      name: 'fadeInUp',
      mode: 'out-in',
    },

    head() {
      return {
        title: this.$t('TITLES.CompaniesAndCampaignsForms.title'),
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: this.$t('TITLES.CompaniesAndCampaignsForms.title'),
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.$t('TITLES.CompaniesAndCampaignsForms.title'),
          },
          {
            hid: 'description',
            name: 'description',
            content: 'Home Page Description',
          },
        ],
      }
    },

    components: {
      SelectPackageStep,
      CampaignDetailsStep,
    },

    data () {
      return {
        // Start:: Loaders Controlling Data
        isWaitingApiResponse: false,
        // End:: Loaders Controlling Data

        // Start:: Current Form Step Data
        currentStep: "packageStep",
        // End:: Current Form Step Data

        // Start:: Crete Campaign Data
        data: {
          package: null,
          featuresAr: null,
          featuresEn: null,
          notes: null,
        },
        // End:: Crete Campaign Data
      }
    },

    methods: {
      // Start:: Handel Next Step Navigation
      handelNextStepNavigation(selectedPackage) {
        this.data.package = selectedPackage;
        this.currentStep = 'detailsStep'
      },
      // End:: Handel Next Step Navigation

      // Start:: Handel Steps Submit
      handelLastStepSubmit(campaignDetails) {
        this.data.featuresAr = campaignDetails.featuresAr;
        this.data.featuresEn = campaignDetails.featuresEn;
        this.data.notes = campaignDetails.notes;

        this.submitForm();
      },
      async submitForm() {
        // Start:: Cach Data To Us It In Checkout Page Data
        this.$cookies.set('company_id', this.$route.params.companyId);
        this.$cookies.set('ad_desc[ar]', this.data.featuresAr);
        this.$cookies.set('ad_desc[en]', this.data.featuresEn);
        this.$cookies.set('ad_notes', this.data.notes);
        // End:: Cach Data To Us It In Checkout Page Data

        this.$router.replace({
          path: this.localePath(`/checkout/${this.data.package}`), 
          query: {subscription_type: 'campaign_subscription'},
        });
      },
      // Start:: Handel Steps Submit
    }
  }
</script>

<style lang="scss">
.crete_campaign_page_wrapper {
  padding-block: $section_block_padding * 1.5 $section_block_padding;
  background: radial-gradient(
    circle,
    rgba(177, 162, 204, 0.5) 0%,
    var(--theme_second_bg) 100%
  );

  .page_header_wrapper {
    @include flex(center, center, column);
    .section_title {
      @include font($bold_font, 1.8rem);
      text-transform: capitalize;
      @include flex(center, center);
      column-gap: 0.8rem;
    }
  
    .section_desc {
      margin-block: 1rem 3rem !important;
      color: var(--gray_theme_clr);
      font-size: 1.1rem;
      text-align: center;
      max-width: 45%;
    }
  }

  .campaigns_forms_wrapper {
    padding: 2rem;
    background-color: var(--theme_main_bg);
    border-radius: 8px;

    .v-stepper {
      .v-stepper__content {
        padding: 0;
      }
    }
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.5;
    .page_header_wrapper {
      .section_title {
        font-size: 1.4rem;
        line-height: 1.6;
        flex-wrap: wrap;
        row-gap: 1rem;
        text-align: center;
  
        span {
          padding: 0.2rem 1.2rem;
          font-size: 1.1rem;
        }
      }
    
      .section_desc {
        max-width: 95%;
      }
    }
  }
}
</style>