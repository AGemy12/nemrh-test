<template>
  <MainLoader v-if="pageIsLoading" />

  <section class="pricing_page_content_wrapper" v-else>
    <template>
      <!-- ========= Start::  Find Company Section ========= -->
      <section class="find_your_company container">
        <div class="title_wrapper">
          <h2 class="title">
            {{ $t('OTHERS.searchAboutYourCompanyTitle') }}
          </h2>
        </div>

        <v-form
          class="w-100 mt-8"
          ref="companyDetailsForm"
          v-model="formIsValid"
          lazy-validation
        >
          <div class="row find_company_field">
            <base-input
              type="email"
              :placeholder="$t('FORMS.Placeholders.searchCompEmail') + '*'"
              :validationRules="validationSchema.emailRules"
              :serverSideErrorMessage="data.email.error"
              @clearServerSideErrorMessage="data.email.error = null"
              v-model.trim="data.email.value"
              required
              @input="validateForm"
            />
          </div>
        </v-form>

        <div class="form_btns_wrapper">
          <base-button
            :btnText="$t('BUTTONS.next')"
            styleType="primary_btn"
            :isLoading="isWaitingApiResponse"
            :disabled="!formIsValid || isWaitingApiResponse"
            @fireClick="submitForm"
          />
        </div>
      </section>
      <!-- ========= End::  Find Company Section ========= -->

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
    </template>
    <SpiderModel
      :modalIsOpen="addCompanyModalIsOpen"
      @toggleModal="toggleModal"
    />
  </section>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue'
import isValidEmail from '@/utils/isValidEmail'
import BannerUnderPage from '~/components/banners/BannerUnderPage.vue'
import SpiderModel from '~/components/ui/modals/SpiderModel.vue'

export default {
  name: 'SubscriptionsPage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },
  emits: ['toggleModal'],

  head() {
    return {
      title: this.$t('TITLES.Subscriptions.title'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Subscriptions.title'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Subscriptions.title'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Subscriptions Page Description WIll Go Here',
        },
      ],
    }
  },
  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    MainLoader,
    BannerUnderPage,
    SpiderModel,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      // End:: Loaders Controlling Data
      addCompanyModalIsOpen: false,

      data: {
        email: {
          value: this.companyContactInfo?.email || null,
          error: null,
        },
      },
      modalIsOpen: true,
      validationSchema: {
        emailRules: [
          (val) => !!val || this.$t('FORMS.Validation.email'),
          (val) =>
            (val && !!isValidEmail(val)) ||
            this.$t('FORMS.Validation.invalidEmail'),
        ],
      },
    }
  },

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
        firstPannerData: res.data.additional_data?.first_section_title,
        lastPannerData: res.data.additional_data?.last_section_title,
      }
    } catch (err) {
      console.log(err)
    }
  },

  methods: {
    // Start :: Search About Your Company Before Ads Cycle
    async submitForm() {
      this.isWaitingApiResponse = true
      try {
        const email = this.data.email.value

        const res = await this.$axiosRequest({
          method: 'GET',
          url: `company/email?email=${email}`,
        })

        const companyId = res.data.data.id
        if (companyId) {
          this.$router.push(
            this.localePath(`/advertisements-subscriptions/${companyId}`)
          )
        } else {
          console.log('الشركة غير موجودة')
          this.addCompanyModalIsOpen = true
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('صفحة غير موجودة')
          this.addCompanyModalIsOpen = true
        } else {
          console.error('Error fetching company details:', error)
        }
      } finally {
        this.isWaitingApiResponse = false
      }
    },

    // End   :: Search About Your Company Before Ads Cycle

    handleActiveStateChange(isActive) {
      this.buttonIsDisables = !isActive
    },

    // Start:: Control Modal Apperance

    toggleModal() {
      this.addCompanyModalIsOpen = !this.addCompanyModalIsOpen
    },
    // End:: Control Modal Apperance

    validateForm() {
      this.formIsValid =
        !!this.data.email.value &&
        this.validationSchema.emailRules.every(
          (rule) => rule(this.data.email.value) === true
        )
    },
    handleEnterKey(event) {
      if (
        event.key === 'Enter' &&
        this.formIsValid &&
        !this.isWaitingApiResponse
      ) {
        this.submitForm()
      }
    },
  },

  mounted() {
    // Start:: Fire Methods
    if (this.firstPannerData) {
      this.pageIsLoading = !this.pageIsLoading
    }
    // End:: Fire Methods
  },
}
</script>

<style lang="scss">
.pricing_page_content_wrapper {
  padding-block: $section_block_padding;
  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );
  @media (max-width: 480px) {
    padding-top: 0;
    padding-bottom: 1.5rem;
  }
  .packages_container {
    position: relative;
    width: 80%;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    @media (max-width: 450px) {
      width: 100%;
    }
  }
  .find_company_field {
    width: 50%;
    margin: 0 auto;
    @media (max-width: 480px) {
      width: 90%;
    }
  }
  .form_btns_wrapper {
    width: fit-content;
    margin: 0 auto;
  }
  .hero_banner_wrapper {
    .banner_content_wrapper {
      border-radius: 0;

      .base_banner_title {
        & > span {
          &:nth-last-of-type(-n + 2) {
            margin: 0;
            padding: 0rem 0.5rem;
            background-color: var(--white);
            @include font($bold_font, 1.5rem, var(--main_theme_clr));
            @include rtl(border-radius, 6px 0 0 6px, 0 6px 6px 0);
          }

          &:last-of-type {
            @include rtl(border-radius, 0 6px 6px 0, 6px 0 0 6px);
            @include rtl(padding-inline, 0 0.5rem, 0.5rem 0);
          }
        }
      }
    }
  }
  .find_your_company {
    margin: 4rem auto 1rem auto;
    padding: 2rem;
    background-color: var(--theme_main_bg);
    border-radius: 8px;
    .title_wrapper {
      width: fit-content;
      margin: 1rem auto 2rem auto;
      .title {
        font-family: $bold_font !important;
      }
    }
  }
  .modal_wrapper {
    @include flex(center, center);
    flex-direction: column;
    padding: 2.5rem 1rem 1rem;

    .modal_close_btn {
      position: absolute;
      top: 3px;
      inset-inline-start: 15px;
      i {
        font-size: 16px;
      }
    }

    .modal_body {
      @include flex(center, center, column);
      gap: 0.825rem;

      h3 {
        @include font($medium_font, 1.5rem, var(--theme_text_clr));
        text-align: center;
        line-height: 1.7;

        @include media(md) {
          font-size: 1.25rem;
        }
      }
      p {
        @include font($regular_font, 1.15rem, var(--light_theme_text_clr));
        text-align: center;

        @include media(md) {
          font-size: 1rem;
        }
      }
    }

    .modal_footer_wrapper {
      @include flex(center, center);
      flex-wrap: wrap;
      gap: 1rem;
      padding: 25px 15px;
    }
  }

  .modal_link {
    @include primaryBtnStyle;
  }

  .close_btn {
    @include primaryBtnStyle;
    background-color: transparent;
    background-image: none;
    color: var(--theme_text_clr);
  }
}
</style>
