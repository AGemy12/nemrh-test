<template>
  <section class="company_contact_info_form_step_wrapper">
    <div class="step_title_wrapper">
      <span class="step_number"> 2 </span>
      <h2 class="step_title">
        {{ $t('TITLES.CompaniesAndCampaignsForms.contactInfo') }}
      </h2>
    </div>

    <v-form
      class="w-100 mt-10"
      ref="companyContactInfoForm"
      v-model="formIsValid"
      lazy-validation
    >
      <div class="row">
        <!-- Start:: Phone Input -->
        <base-input
          type="tel"
          :placeholder="$t('FORMS.Placeholders.whatsAppNumber') + '*'"
          staticPlaceholder="966xxxxxxxx"
          :validationRules="validationSchema.phoneRules"
          :serverSideErrorMessage="data.phone.error"
          @clearServerSideErrorMessage="data.phone.error = null"
          v-model.trim="data.phone.value"
          required
        />
        <!-- End:: Phone Input -->

        <!-- Start:: Email Input -->
        <base-input
          type="email"
          :placeholder="$t('FORMS.Placeholders.email') + '*'"
          :validationRules="validationSchema.emailRules"
          :serverSideErrorMessage="data.email.error"
          @clearServerSideErrorMessage="data.email.error = null"
          v-model.trim="data.email.value"
          required
        />
        <!-- End:: Email Input -->

        <!-- Start:: Website Input -->
        <base-input
          type="text"
          :placeholder="$t('FORMS.Placeholders.website') + '*'"
          :validationRules="validationSchema.websiteRules"
          :serverSideErrorMessage="data.website.error"
          @clearServerSideErrorMessage="data.website.error = null"
          v-model.trim="data.website.value"
          required
        />
        <!-- End:: Website Input -->

        <!-- Start:: Social Links Inputs Repeater -->
        <div
          class="form_repeater co-12"
          v-for="(item, index) in data.socialLinks"
          :key="item.id"
        >
          <div class="row">
            <!-- ******** Start:: Social Link Input ******** -->
            <base-select-input
              v-if="socialPlatforms.length > 0"
              col="5"
              static
              :staticItems="socialPlatforms"
              :placeholder="$t('FORMS.Placeholders.socialPlatform')"
            />
            <!-- ******** End:: Social Link Input ******** -->

            <!-- ******** Start:: Social Link Input ******** -->
            <base-input
              col="5"
              type="text"
              :placeholder="$t('FORMS.Placeholders.link')"
            />
            <!-- ******** End:: Social Link Input ******** -->

            <!-- ******** Start:: Input Repeater Buttons ******** -->
            <div class="col-lg-2 form_repeater_btns_wrapper">
              <button
                v-show="
                  data.socialLinks.length === 1 ||
                  index === data.socialLinks.length - 1
                "
                type="button"
                class="add_btn"
                @click="appendFormRepeaterItem"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <button
                v-show="data.socialLinks.length > 1"
                type="button"
                class="delete_btn"
                @click="removeFormRepeaterItem(item)"
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
            <!-- ******** End:: Input Repeater Buttons ******** -->
          </div>
        </div>
        <!-- End:: Social Links Inputs Repeater -->

        <!-- Start:: Address Input -->
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.companyAddressAr') + '*'"
          :validationRules="validationSchema.addressRules"
          :serverSideErrorMessage="data.addressAr.error"
          @clearServerSideErrorMessage="data.addressAr.error = null"
          v-model.trim="data.addressAr.value"
          required
        />
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.companyAddressEn') + '*'"
          :validationRules="validationSchema.addressRules"
          :serverSideErrorMessage="data.addressEn.error"
          @clearServerSideErrorMessage="data.addressEn.error = null"
          v-model.trim="data.addressEn.value"
          required
        />
        <!-- End:: Address Input -->
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
        @fireClick="navigateToThirdStep"
        :disabled="!formIsValid"
      />
    </div>
  </section>
</template>

<script>
import isValidEmail from '@/utils/isValidEmail'

export default {
  name: 'CompanyContactInfoStep',

  emits: ['fireNavigateToPreviousStep', 'fireNavigateToThirdStep'],

  props: {
    companyContactInfo: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      // Start:: Loading Handling Data
      isWaitingApiResponse: false,
      // End:: Loading Handling Data

      // Start:: Social Platforms Data
      socialPlatforms: [],
      // End:: Social Platforms Data

      // Start:: Data Collection To Send
      data: {
        phone: {
          value: null,
          error: null,
        },
        email: {
          value: this.companyContactInfo?.email || null,
          error: null,
        },
        website: {
          value: this.companyContactInfo?.link || null,
          error: null,
        },
        socialLinks: [
          {
            id: 1,
            platform: {
              value: null,
              error: null,
            },
            link: {
              value: null,
              error: null,
            },
          },
        ],
        addressAr: {
          value: this.companyContactInfo?.location_ar || null,
          error: null,
        },
        addressEn: {
          value: this.companyContactInfo?.location_en || null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        phoneRules: [
          (val) => !!val || this.$t('FORMS.Validation.phone'),
          (val) =>
            !(val && !val.startsWith('966')) ||
            this.$t('FORMS.Validation.phoneStartWith966'),
          (val) =>
            !(val && val.length !== 12) ||
            this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers'),
        ],
        emailRules: [
          (val) => !!val || this.$t('FORMS.Validation.email'),
          (val) =>
            (val && !!isValidEmail(val)) ||
            this.$t('FORMS.Validation.invalidEmail'),
        ],
        websiteRules: [(val) => !!val || this.$t('FORMS.Validation.website')],
        // platformRules: [
        //   (val) => !!val || this.$t('FORMS.Validation.socialPlatform'),
        // ],
        // linkRules: [(val) => !!val || this.$t('FORMS.Validation.link')],
        addressRules: [(val) => !!val || this.$t('FORMS.Validation.address')],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Get Social Platforms
    async getSocialPlatforms() {
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'socials',
        })
        // ********** End:: Implement Request ********** //
        this.socialPlatforms = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.title,
          }
        })
      } catch (err) {
        console.log(err.response.data.message)
      }
    },
    // End:: Get Social Platforms

    // Start:: Pass Selected Package Data To Parent Component
    async navigateToThirdStep() {
      await this.$refs.companyContactInfoForm.validate()

      if (this.formIsValid) {
        this.$emit('fireNavigateToThirdStep', {
          phone: this.data.phone.value,
          email: this.data.email.value,
          website: this.data.website.value,
          socialLinks: this.data.socialLinks.map((item) => ({
            id: item.id,
            platform: item.platform.value,
            link: item.link.value,
          })),
          addressAr: this.data.addressAr.value,
          addressEn: this.data.addressEn.value,
        })
      }
    },
    // End:: Pass Selected Package Data To Parent Component

    // Start:: Handel Form Repeater Actions
    appendFormRepeaterItem() {
      this.data.socialLinks.push({
        id:
          Math.random().toString(36).substring(2) +
          new Date().getTime().toString(36),
        platform: {
          value: null,
          error: null,
        },
        link: {
          value: null,
          error: null,
        },
      })
    },
    removeFormRepeaterItem(itemToRemove) {
      this.data.socialLinks = this.data.socialLinks.filter(
        (item) => item.id !== itemToRemove.id
      )
    },
    // End:: Handel Form Repeater Actions
  },

  created() {
    // Start:: Fire Methods
    this.getSocialPlatforms()
    // End:: Fire Methods
  },
}
</script>

<style lang="scss" scoped>
.company_contact_info_form_step_wrapper {
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
