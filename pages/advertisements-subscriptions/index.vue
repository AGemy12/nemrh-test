<template>
  <section class="pricing_page_content_wrapper">
    <MainLoader v-if="pageIsLoading" />
    <template v-else>
      <!-- ========= Start:: Page Banner ========= -->
      <BaseBanner
        class="hero_banner_wrapper"
        :bannerImage="require('@/assets/media/images/pricing_banner.svg')"
        :bannerData="firstPannerData"
        :showBannerButton="false"
      />
      <!-- ========= End:: Page Banner ========= -->

      <!-- ========= Start::  Packages Section ========= -->
      <div class="advertisements_packages_container">
        <!-- ========= Start:: Advertisements Packages Section ========= -->
        <AdvertisementsFirstStep />
        <AdvertisementsSecondStep
          ref="secondStepComponent"
          style="display: none"
        />
        <AdvertisementsThirdStep
          ref="thirdStepComponent"
          style="display: none"
          :details="formData"
          :handelcheck-box="adPayStepCheckbox"
        />
        <!-- ========= Start:: Advertisements Packages Section ========= -->
        <div class="packages_options_button">
          <button
            id="prevBtn"
            @click="advertisementsBackwardCycleSteps"
            style="display: none"
            v-html="$t('BUTTONS.previous')"
            class="advertisements_prev_btn text_btn"
          ></button>
          <button
            id="nextBtn"
            v-html="$t('BUTTONS.next')"
            class="advertisements_next_btn primary_btn"
            disabled="true"
            @click="advertisementsForwardCycleSteps"
          ></button>
        </div>
        <div class="correct_data_checkbox_validation" v-if="checkedIsTrue">
          <p style="">يجب الإقرار على صحة البيانات</p>
        </div>
      </div>

      <!-- ========= End::  Packages Section ========= -->

      <!-- ========= Start:: Site Cycle Steps Section ========= -->
      <!-- <SiteCycleStepsSection /> -->
      <!-- ========= End:: Site Cycle Steps Section ========= -->

      <!-- ========= Start:: Banner ========= -->
      <div class="container">
        <BaseBanner
          class="mt-5"
          :bannerData="lastPannerData"
          data-aos="fade-up"
        />
      </div>
      <!-- ========= End:: Banner ========= -->
    </template>
  </section>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue'
import PackagesSection from '@/components/generalSections/PackagesSection.vue'
import SiteCycleStepsSection from '@/components/generalSections/SiteCycleStepsSection.vue'
import BaseBanner from '@/components/banners/BaseBanner.vue'
import MessagingPackagesSection from '~/components/generalSections/MessagingPackagesSection.vue'
import AdvertisementsFirstStep from '~/components/steps/advertisements/AdvertisementsFirstStep.vue'
import AdvertisementsSecondStep from '~/components/steps/advertisements/AdvertisementsSecondStep.vue'
import AdvertisementsThirdStep from '~/components/steps/advertisements/AdvertisementsThirdStep.vue'

export default {
  name: 'SubscriptionsPage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

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

  components: {
    MainLoader,
    PackagesSection,
    MessagingPackagesSection,
    AdvertisementsFirstStep,
    AdvertisementsSecondStep,
    AdvertisementsThirdStep,
    SiteCycleStepsSection,
    BaseBanner,
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
        firstPannerData: res.data.additional_data?.first_section_title,
        lastPannerData: res.data.additional_data?.last_section_title,
      }
    } catch (err) {
      console.log(err)
    }
  },

  methods: {
    advertisementsForwardCycleSteps() {
      const firstStep = document.getElementById('advertisementsFirstStep'),
        secondtStep = document.getElementById('advertisementsSecondStep'),
        thirdStep = document.getElementById('advertisementsThirdStep'),
        prevBtn = document.querySelector('.advertisements_prev_btn'),
        nextBtn = document.querySelector('.advertisements_next_btn'),
        termsCheckbox = document.getElementById('termsCheckbox'),
        secondStepComponent = this.$refs.secondStepComponent
      if (termsCheckbox.checked) {
        console.log('true')
      } else {
        console.log('false')
      }

      if (secondtStep.style.display !== 'none') {
        const isFormValid = secondStepComponent.validateForm()

        if (isFormValid) {
          // عندما يكون التحقق صحيحاً، قم بتحديث البيانات
          this.formData = {
            advertisementName:
              secondStepComponent.$data.data.advertisementName.value,
            startDate: secondStepComponent.$data.data.startDate.value,
            endDate: secondStepComponent.$data.data.endDate.value,
            period: secondStepComponent.$data.data.period.value,
            website: secondStepComponent.$data.data.website.value,
            advertisementPrice: secondStepComponent.discountedPrice,
            discountPercentage: secondStepComponent.discountPercentage,
          }
          secondtStep.style.display = 'none'
          thirdStep.style.display = 'block'
          prevBtn.style.display = 'block'
          nextBtn.innerHTML = `${this.$t('BUTTONS.confirmPay')}`
        }
      } else if (firstStep.style.display !== 'none') {
        secondtStep.style.display = 'block'
        firstStep.style.display = 'none'
        prevBtn.style.display = 'block'
        nextBtn.removeAttribute('disabled')
      } else if (thirdStep.style.display !== 'none') {
        if (termsCheckbox.checked) {
          window.location.replace(
            'https://demo.myfatoorah.com/En/KWT/PayInvoice/Details/01072435239241-483ab996'
          )
        } else {
          this.checkedIsTrue = true
        }
      }
    },

    advertisementsBackwardCycleSteps() {
      const firstStep = document.getElementById('advertisementsFirstStep'),
        secondtStep = document.getElementById('advertisementsSecondStep'),
        thirdStep = document.getElementById('advertisementsThirdStep'),
        prevBtn = document.querySelector('.advertisements_prev_btn'),
        nextBtn = document.querySelector('.advertisements_next_btn')

      if (thirdStep.style.display !== 'none') {
        thirdStep.style.display = 'none'
        secondtStep.style.display = 'block'
        prevBtn.style.display = 'block'
        nextBtn.removeAttribute('disabled')
        nextBtn.innerHTML = `${this.$t('Packages.PackagesOptionBtnTitle')}`
      } else if (secondtStep.style.display !== 'none') {
        secondtStep.style.display = 'none'
        firstStep.style.display = 'block'
        prevBtn.style.display = 'none'
      }
    },
    adPayStepCheckbox() {
      let termsCheckbox = document.getElementById('termsCheckbox')

      if (termsCheckbox.checked) {
        this.checkedIsTrue = false
      } else {
        this.checkedIsTrue = true
      }
    },
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      // End:: Loaders Controlling Data

      // Start::
      checkedIsTrue: false,
      // End::

      // Start:: Form Data Save
      formData: {
        advertisementName: '',
        startDate: '',
        endDate: '',
        period: '',
        website: '',
      },
      // End:: Form Data Save
    }
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
  .advertisements_packages_container {
    position: relative;
    width: 80%;
    margin: 50px auto;
    padding: 20px;
    background-color: var(--white);
    border-radius: 10px;
    @media (max-width: 450px) {
      width: 100%;
    }
  }
  .packages_options_button {
    margin: 20px 0;
    button.primary_btn {
      @include primaryBtnStyle;
    }
    button.text_btn {
      @include borderedBtnStyle;
      @include flex(center, center);
      column-gap: 8px;
      border: none;
      color: var(--main_theme_clr);
    }
  }
  .correct_data_checkbox_validation {
    width: fit-content;
    margin: 20px auto 0 auto;
    p {
      color: red;
      font-size: 14px;
      font-weight: bold;
    }
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
  .packages_options_button {
    @include flex(center, center);
  }
  .section_title {
    font-family: $bold_font;
  }

  .messaging_packages_carousel_wrapper {
    padding-block: 0;
  }
}
</style>
