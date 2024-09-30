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
      <div class="packages_container">
        <PackagesSection
          id="packages"
          :sectionTitle="$t('Packages.PackagesTitle')"
        />
      </div>

      <!-- ========= End::  Packages Section ========= -->

      <!-- ========= Start:: Site Cycle Steps Section ========= -->
      <SiteCycleStepsSection />
      <!-- ========= End:: Site Cycle Steps Section ========= -->
      <!-- ========= Start:: Banner ========= -->
      <BannerUnderPage
        :bannerImage="homePageData?.bottom_ad_companies?.ad_image || null"
        :companySiteLink="homePageData?.bottom_ad_companies?.ad_link || null"
      />
      <!-- ========= End:: Banner ========= -->
    </template>
  </section>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue'
import PackagesSection from '@/components/generalSections/PackagesSection.vue'
import SiteCycleStepsSection from '@/components/generalSections/SiteCycleStepsSection.vue'
import BaseBanner from '@/components/banners/BaseBanner.vue'
import BannerUnderPage from '@/components/banners/BannerUnderPage.vue'

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
    SiteCycleStepsSection,
    BaseBanner,
    BannerUnderPage,
  },

  // async asyncData({ $axiosRequest }) {
  //   try {
  //     // ********** Start:: Implement Request ********** //
  //     let res = await $axiosRequest({
  //       method: 'GET',
  //       url: 'message_bundles',
  //     })
  //     // ********** End:: Implement Request ********** //
  //     return {
  //       messagingPackages: res.data.data,
  //       firstPannerData: res.data.additional_data?.first_section_title,
  //       lastPannerData: res.data.additional_data?.last_section_title,
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },

  async asyncData({ $axiosRequest }) {
    try {
      // ********** Start:: Implement Request ********** //
      let res = await $axiosRequest({
        method: 'GET',
        url: 'pages/home',
      })
      let secRes = await $axiosRequest({
        method: 'GET',
        url: 'message_bundles',
      })
      // ********** End:: Implement Request ********** //
      return {
        homePageData: res.data.data,
        firstPannerData: secRes.data.additional_data.first_section_title,
      }
    } catch (err) {
      console.log(err.response ? err.response.data.message : err.message)
      return {
        homePageData: {
          middle_company: null,
          last_companies: null,
          about: null,
          message_bundles: null,
          partners: null,
        },
      }
    }
  },

  methods: {
    handleActiveStateChange(isActive) {
      this.buttonIsDisables = !isActive
    },
  },
  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      // End:: Loaders Controlling Data
    }
  },

  mounted() {
    // Start:: Fire Methods
    if (this.homePageData) {
      this.pageIsLoading = !this.pageIsLoading
    }
    // End:: Fire Methods
  },
}
</script>

<!-- padding-top: 0;
position: relative;
top: 61px; -->

<style lang="scss">
.pricing_page_content_wrapper {
  padding-block: $section_block_padding;

  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );
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
