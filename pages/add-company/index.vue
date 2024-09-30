<template>
  <section class="add_company_page_content_wrapper">
    <div class="container" v-if="!requestIsCompleted">
      <!-- ========== Start:: Page Header ========== -->
      <div class="page_header_wrapper">
        <h1 class="section_title">
          {{ $t('TITLES.CompaniesAndCampaignsForms.addCompanyTitle') }}
        </h1>
        <p class="section_desc">
          {{ $t('TITLES.CompaniesAndCampaignsForms.desc') }}
        </p>
      </div>
      <!-- ========== End:: Page Header ========== -->

      <!-- ========== Start:: Company Forms ========== -->
      <div class="company_forms_wrapper">
        <div class="row justify-content-between">
          <!-- Start:: Page Image -->
          <div class="col-lg-5 d-none d-lg-block">
            <img
              class="page_image"
              src="@/assets/media/images/add_company_bg.svg"
              width="100"
              height="200"
              :alt="$t('TITLES.CompaniesAndCampaignsForms.addCompanyTitle')"
              loading="lazy"
            />
          </div>
          <!-- End:: Page Image -->

          <!-- Start:: Forms -->
          <div class="col-lg-7">
            <v-stepper v-model="currentStep" class="p-0" flat>
              <v-stepper-items>
                <v-stepper-content step="companyDetailsStep">
                  <CompanyDetailsStep
                    @fireNavigateToSecondStep="handelSecondStepNavigation"
                  />
                </v-stepper-content>

                <v-stepper-content step="contactDetailsStep">
                  <CompanyContactInfoStep
                    @fireNavigateToPreviousStep="
                      currentStep = 'companyDetailsStep'
                    "
                    @fireNavigateToThirdStep="handelThirdStepNavigation"
                  />
                </v-stepper-content>

                <v-stepper-content step="companyIdentityStep">
                  <CompanyIdentityStep
                    :isWaitingApiResponse="isWaitingApiResponse"
                    @fireNavigateToPreviousStep="
                      currentStep = 'contactDetailsStep'
                    "
                    @submitForm="handelLastStep"
                  />
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </div>
          <!-- End:: Forms -->
        </div>
      </div>
      <!-- ========== End:: Company Forms ========== -->
    </div>

    <div class="container" v-else>
      <div class="completed_request_message">
        <img
          class="request_completed"
          src="@/assets/media/images/add_company_request_completed.svg"
          width="220"
          height="220"
          :alt="$t('TITLES.CompaniesAndCampaignsForms.addCompanyTitle')"
          loading="lazy"
        />

        <h3 class="message_body">
          {{ $t('TITLES.CompaniesAndCampaignsForms.requestSent') }}
        </h3>

        <nuxt-link :to="localePath('/')">
          {{ $t('BUTTONS.backToHome') }}
        </nuxt-link>
      </div>
    </div>
    <!-- ========= Start:: Banner ========= -->
    <BannerUnderPage
      :bannerImage="
        BannerUnderPageDetails?.bottom_ad_companies?.ad_image || null
      "
      :companySiteLink="
        BannerUnderPageDetails?.bottom_ad_companies?.ad_link || null
      "
    />
    <!-- ========= End:: Banner ========= -->
  </section>
</template>

<script>
import CompanyDetailsStep from '@/components/steps/company/CompanyDetailsStep.vue'
import CompanyContactInfoStep from '@/components/steps/company/CompanyContactInfoStep.vue'
import CompanyIdentityStep from '@/components/steps/company/CompanyIdentityStep.vue'
import BannerUnderPage from '~/components/banners/BannerUnderPage.vue'

export default {
  name: 'AddCompany',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.CompaniesAndCampaignsForms.addCompanyTitle'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.CompaniesAndCampaignsForms.addCompanyTitle'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.CompaniesAndCampaignsForms.addCompanyTitle'),
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('TITLES.CompaniesAndCampaignsForms.desc'),
        },
      ],
    }
  },

  middleware: 'notAuthedUserMiddleware',

  components: {
    CompanyDetailsStep,
    CompanyContactInfoStep,
    CompanyIdentityStep,
    BannerUnderPage,
  },

  data() {
    return {
      // Start:: Current Form Step Data
      currentStep: 'companyDetailsStep',
      // End:: Current Form Step Data

      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Add Company Data
      data: {
        nameAr: null,
        nameEn: null,
        serviceAr: null,
        serviceEn: null,
        workField: null,
        descAr: null,
        descEn: null,
        whatsappNumber: null,
        email: null,
        website: null,
        socialLinks: null,
        addressAr: null,
        addressEn: null,
        logo: null,
        commercialRegister: null,
      },
      // End:: Add Company Data

      // Start:: Request Complete Message
      requestIsCompleted: false,
      // End:: Request Complete Message
    }
  },

  // Start:: Handel Banner Under Page Request
  async asyncData({ $axiosRequest }) {
    try {
      // ********** Start:: Implement Request ********** //
      let res = await $axiosRequest({
        method: 'GET',
        url: 'message_bundles',
      })
      // ********** End:: Implement Request ********** //
      return {
        BannerUnderPageDetails: res.data.additional_data,
      }
    } catch (err) {
      console.log(err)
    }
  },

  // Start:: Handel Banner Under Page Request

  methods: {
    // Start:: Handel Steps Navigation
    handelSecondStepNavigation(firstStepData) {
      this.data.nameAr = firstStepData.nameAr
      this.data.nameEn = firstStepData.nameEn
      this.data.serviceAr = firstStepData.serviceAr
      this.data.serviceEn = firstStepData.serviceEn
      this.data.workField = firstStepData.workField
      this.data.descAr = firstStepData.aboutCompanyAr
      this.data.descEn = firstStepData.aboutCompanyEn
      this.currentStep = 'contactDetailsStep'
    },
    handelThirdStepNavigation(secondStepData) {
      this.data.whatsappNumber = secondStepData.phone
      this.data.email = secondStepData.email
      this.data.website = secondStepData.website
      this.data.socialLinks = secondStepData.socialLinks
      this.data.addressAr = secondStepData.addressAr
      this.data.addressEn = secondStepData.addressEn
      this.currentStep = 'companyIdentityStep'
    },
    handelLastStep(thirdStepData) {
      this.data.logo = thirdStepData.logo
      this.data.commercialRegister = thirdStepData.commercialRegister

      this.handelStepsSubmit()
    },
    async handelStepsSubmit() {
      this.isWaitingApiResponse = true

      // Start:: Append Request Data
      const REQUEST_DATA = new FormData()
      REQUEST_DATA.append('title[ar]', this.data.nameAr)
      REQUEST_DATA.append('title[en]', this.data.nameEn)
      REQUEST_DATA.append('main_service[ar]', this.data.serviceAr)
      REQUEST_DATA.append('main_service[en]', this.data.serviceEn)
      REQUEST_DATA.append('category_id', this.data.workField.id)
      REQUEST_DATA.append('desc[ar]', this.data.descAr)
      REQUEST_DATA.append('desc[en]', this.data.descEn)
      REQUEST_DATA.append('phone', this.data.whatsappNumber)
      REQUEST_DATA.append('email', this.data.email)
      REQUEST_DATA.append('link', this.data.website)
      if (this.data.socialLinks.length > 0) {
        this.data.socialLinks.forEach((item, index) => {
          REQUEST_DATA.append(`socials[${index}][id]`, item?.platform?.id || '')
          REQUEST_DATA.append(`socials[${index}][link]`, item?.link || '')
        })
      }
      REQUEST_DATA.append('location[ar]', this.data.addressAr)
      REQUEST_DATA.append('location[en]', this.data.addressEn)
      REQUEST_DATA.append('image', this.data.logo.file)
      REQUEST_DATA.append('commercial_file', this.data.commercialRegister.file)
      // Start:: Append Request Data

      try {
        // ********** Start:: Implement Request ********** //
        await this.$axiosRequest({
          method: 'POST',
          url: 'companies-requests',
          data: REQUEST_DATA,
        })
        // ********** End:: Implement Request ********** //
        this.isWaitingApiResponse = false
        this.requestIsCompleted = true
      } catch (err) {
        this.isWaitingApiResponse = false
        this.$izitoast.error({
          message: err.response.data.message,
        })
      }
    },
    // End:: Handel Steps Navigation
  },
}
</script>

<style lang="scss" scoped>
.add_company_page_content_wrapper {
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

  .company_forms_wrapper {
    padding: 1rem;
    background-color: var(--theme_main_bg);
    border-radius: 8px;

    .page_image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .v-stepper {
      .v-stepper__content {
        padding: 0;
      }
    }
  }

  .completed_request_message {
    padding: 2.5rem 1.5rem;
    @include flex(center, center, column);
    row-gap: 2rem;
    background-color: var(--main_theme_clr);
    border-radius: 8px;

    .message_body {
      @include font($semi_bold_font, 1.2rem, var(--white));
    }

    a {
      @include primaryBtnStyle;
      background-image: linear-gradient(
        90deg,
        transparent 50%,
        var(--white) 50%
      );
      color: var(--main_theme_clr);
      &:hover {
        color: var(--white);
        border: 1px solid var(--white);
      }
    }
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.5;
    margin-bottom: 45px;
    position: relative;
    top: 61px;
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
