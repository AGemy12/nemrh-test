<template>
  <section class="crete_campaign_page_wrapper">
    <div class="container">
      <!-- ========== Start:: Page Header ========== -->
      <div class="page_header_wrapper">
        <h1 class="section_title">
          {{ $t('TITLES.CompaniesAndCampaignsForms.title') }}
        </h1>
        <p class="section_desc">
          {{ $t('TITLES.CompaniesAndCampaignsForms.desc') }}
        </p>
      </div>
      <!-- ========== End:: Page Header ========== -->

      <!-- ========== Start:: Campaign Forms ========== -->
      <div class="campaigns_forms_wrapper">
        <v-stepper v-model="currentStep" class="p-0" flat>
          <v-stepper-items>
            <v-stepper-content step="packageStep">
              <SelectPackageStep
                @fireNavigateToNextStep="handelNextStepNavigation"
              />
            </v-stepper-content>

            <v-stepper-content step="detailsStep">
              <CampaignDetailsStep
                @fireNavigateToPreviousStep="currentStep = 'packageStep'"
                @fireStepsSubmit="handleStepsSubmit"
                :isWaitingApiResponse="isWaitingApiResponse"
                :selectedPackageName="selectedPackageName"
                :period="durationLimit"
                :website="adLink"
                :advertisementImage="adImage"
                :originalPrice="originalPrice"
                @fireClick="submitForm"
              />
            </v-stepper-content>
            <v-stepper-content step="previewStep">
              <CampaignPreviewStep
                @fireNavigateToPreviousStep="currentStep = 'detailsStep'"
                :isWaitingApiResponse="isWaitingApiResponse"
                :selectedPackageName="selectedPackageName"
                @fireStepsSubmit="submitForm"
                :details="campaignDetails"
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
import SelectPackageStep from '@/components/steps/campaign/SelectPackageStep.vue'
import CampaignDetailsStep from '@/components/steps/campaign/CampaignDetailsStep.vue'
import CampaignPreviewStep from '~/components/steps/campaign/CampaignPreviewStep.vue'

export default {
  name: 'CreateCampaign',

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
    CampaignPreviewStep,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Current Form Step Data
      currentStep: 'packageStep',
      // End:: Current Form Step Data

      // Start:: Title Of Package Selected
      selectedPackageName: '',
      // End:: Title Of Package Selected
      // Start:: Duration Limit
      durationLimit: '',
      adLink: '',
      adImage: '',
      // End:: Duration Limit

      // Start:: Crete Campaign Data
      data: {
        package: null,
      },
      // End:: Crete Campaign Data
      campaignDetails: {},
    }
  },

  methods: {
    // Start:: Handel Next Step Navigation
    handelNextStepNavigation(
      selectedPackage,
      selectedPackageTitle,
      adPrice,
      advertisementPosition,
      companyId
    ) {
      this.data.package = selectedPackage
      this.selectedPackageName = selectedPackageTitle
      this.originalPrice = adPrice
      this.advertisementPosition = advertisementPosition
      this.companyId = companyId
      this.currentStep = 'detailsStep'
    },
    // End:: Handel Next Step Navigation

    // Start:: Handel Steps Submit
    handleStepsSubmit(submitData) {
      // console.log('Received Submit Data:', submitData)

      if (submitData && submitData.price) {
        this.selectedPackagePrice = submitData.price
        this.campaignDetails = submitData

        this.durationLimit = submitData.period
        this.adLink = submitData.website
        this.adImage = submitData.advertisementImage
        this.adImage = this.selectedPackageImage
        // console.log('Received Image Object:', this.adImage)

        this.currentStep = 'previewStep'
      } else {
        console.error('Price data is missing.')
      }
    },
    // End  :: Handel Steps Submit

    async submitForm() {
      // console.log('company_id:', this.companyId)
      // console.log('duration_limit:', this.durationLimit)
      // console.log('ad_title:', this.selectedPackageName)
      // console.log('ad_link:', this.adLink)
      // console.log('image:', this.adImage)

      this.$cookies.set('company_id', this.$route.params.companyId)
      this.$cookies.set('duration_limit', this.durationLimit)
      this.$cookies.set('ad_title', this.selectedPackageName)
      this.$cookies.set('ad_link', this.adLink)
      this.$cookies.set('image', this.adImage)
      this.$cookies.set('ad_desc[ar]', '.')
      this.$cookies.set('ad_desc[en]', '.')
      this.$cookies.set('ad_notes', '.')

      // console.log('company_id:', this.$cookies.get('company_id'))
      // console.log('duration_limit:', this.$cookies.get('duration_limit'))
      // console.log('ad_title:', this.$cookies.get('ad_title'))
      // console.log('ad_link:', this.$cookies.get('ad_link'))
      // console.log('image:', this.$cookies.get('image'))
      // console.log('ad_desc[ar]:', this.$cookies.get('ad_desc[ar]'))
      // console.log('ad_desc[en]:', this.$cookies.get('ad_desc[en]'))
      // console.log('ad_notes:', this.$cookies.get('ad_notes'))

      if (!this.data.package) {
        console.error('Package not selected')
        return
      }
      if (!this.selectedPackagePrice) {
        console.error('Price not available')
        return
      }

      this.$router.replace({
        path: this.localePath(`/checkout/${this.data.package}`),
        query: {
          subscription_type: 'campaign_subscription',
          companyId: this.companyId,
        },
      })
    },
  },
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
