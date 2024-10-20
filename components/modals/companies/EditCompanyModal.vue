<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="750"
      class="edit_company_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
      flat
    >
      <v-card elevation="0">
        <h5>{{ modalTitle }}</h5>

        <v-stepper v-model="currentStep" class="p-0 w-100" flat>
          <v-stepper-items>
            <v-stepper-content step="companyDetailsStep">
              <EditCompanyDetailsStep
                :companyDetails="companyDetailsData"
                @fireNavigateToSecondStep="handelSecondStepNavigation"
              />
            </v-stepper-content>

            <v-stepper-content step="contactDetailsStep">
              <EditCompanyContactInfoStep
                :companyContactInfo="companyDetailsData"
                @fireNavigateToPreviousStep="currentStep = 'companyDetailsStep'"
                @fireNavigateToThirdStep="handelThirdStepNavigation"
              />
            </v-stepper-content>

            <v-stepper-content step="companyIdentityStep">
              <EditCompanyIdentityStep
                :companyIdentityInfo="companyDetailsData"
                :isWaitingApiResponse="isWaitingApiResponse"
                @fireNavigateToPreviousStep="currentStep = 'contactDetailsStep'"
                @submitForm="handelLastStep"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
// import CompanyDetailsStep from '@/components/steps/company/CompanyDetailsStep.vue'
// import CompanyContactInfoStep from '@/components/steps/company/CompanyContactInfoStep.vue'
import EditCompanyContactInfoStep from '@/components/steps/company/EditCompanyContactInfoStep.vue'
import EditCompanyDetailsStep from '@/components/steps/company/EditCompanyDetailsStep.vue'
import EditCompanyIdentityStep from '@/components/steps/company/EditCompanyIdentityStep.vue'

export default {
  name: 'EditCompanyModal',

  emits: ['toggleModal', 'onResponseSuccess'],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    companyId: {
      type: Number,
      required: true,
    },
    companyDetailsData: {
      type: Object,
      required: true,
    },
  },

  components: {
    EditCompanyDetailsStep,
    EditCompanyContactInfoStep,
    EditCompanyIdentityStep,
  },

  data() {
    return {
      // Start:: Current Form Step Data
      currentStep: 'companyDetailsStep',
      // End:: Current Form Step Data

      // Start:: Loading Handling Data
      isWaitingApiResponse: false,
      // End:: Loading Handling Data

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
    }
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },
    // End:: Control Modal Apperance

    // Start:: Handel Steps Navigation
    handelSecondStepNavigation(firstStepData) {
      this.data.nameAr = firstStepData.nameAr
      this.data.nameEn = firstStepData.nameEn
      this.data.serviceAr = firstStepData.serviceAr
      this.data.serviceEn = firstStepData.serviceEn
      this.data.workField = firstStepData.workField
      this.data.aboutCompanyAr = firstStepData.aboutCompanyAr
      this.data.aboutCompanyEn = firstStepData.aboutCompanyEn
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
      REQUEST_DATA.append('_method', 'PUT')
      REQUEST_DATA.append(
        'category_id',
        this.data.workField && this.data.workField.id
          ? this.data.workField.id
          : this.companyDetailsData.category_id
      )
      REQUEST_DATA.append('company_id', this.companyId)
      REQUEST_DATA.append('title[ar]', this.data.nameAr)
      REQUEST_DATA.append('title[en]', this.data.nameEn)
      REQUEST_DATA.append('main_service[ar]', this.data.serviceAr)
      REQUEST_DATA.append('main_service[en]', this.data.serviceEn)
      // REQUEST_DATA.append(
      //   'category_id',
      //   this.data.workField
      //     ? this.data.workField.id
      //     : this.companyDetailsData.category_id
      // )
      REQUEST_DATA.append('desc[ar]', this.data.descAr)
      REQUEST_DATA.append('desc[en]', this.data.descEn)
      REQUEST_DATA.append('phone', this.data.whatsappNumber)
      REQUEST_DATA.append('email', this.data.email)
      REQUEST_DATA.append('link', this.data.website)

      if (this.data.socialLinks && Array.isArray(this.data.socialLinks)) {
        this.data.socialLinks.forEach((item, index) => {
          if (item.platform && item.platform.id) {
            REQUEST_DATA.append(`socials[${index}][id]`, item.platform.id)
            REQUEST_DATA.append(`socials[${index}][link]`, item.link)
          }
        })
      }
      REQUEST_DATA.append('location[ar]', this.data.addressAr)
      REQUEST_DATA.append('location[en]', this.data.addressEn)
      if (this.data.logo && this.data.logo.file) {
        REQUEST_DATA.append('image', this.data.logo.file)
      }
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
        this.toggleModal()
        this.$emit('onResponseSuccess')
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
.v-card {
  padding: 3rem 2rem;

  h5 {
    width: 100%;
    margin-bottom: 1rem;
    @include font($bold_font, 1.1rem);
    @include rtl(text-align, left, right);
  }
  .v-stepper__content {
    padding: 0;
  }
}
</style>
