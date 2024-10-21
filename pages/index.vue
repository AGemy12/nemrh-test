<template>
  <section class="home_page_content_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <!-- ========== Start:: Search Section ========= -->
      <Intro />
      <GlobalSearchSection
        :searchAdImage="homePageData?.search_ad_companies?.ad_image || null"
        :path="homePageData?.search_ad_companies?.ad_link || null"
      />
      <!-- ========= End:: Search Section ========= -->

      <!-- ========= Start:: Golden Campaign Section ========= -->
      <GoldenCampaignSection />
      <!-- ========= End:: Golden Campaign Section ========= -->

      <!-- ========= Start:: Premium Campaign Section ========= -->
      <PremiumCampaignSection
        v-if="homePageData.middle_company"
        :sectionData="homePageData.middle_company"
      />
      <!-- ========= End:: Premium Campaign Section ========= -->

      <!-- ========= Start:: Silver Campaign Section ========= -->
      <SilverCampaignSection
        v-if="homePageData.middle_companies"
        :sectionData="homePageData.middle_companies"
      />
      <!-- ========= End:: Silver Campaign Section ========= -->

      <div class="gradient_wrapper">
        <!-- ========= Start:: About Us Section ========= -->
        <AboutSection
          v-if="homePageData.about"
          :sectionData="homePageData.about"
        />
        <!-- ========= End:: About Us Section ========= -->

        <!-- ========= Start:: Messages Packages Section ========= -->
        <!-- <MessagingPackagesSection
          v-if="homePageData.message_bundles"
          :sectionTitle="$t('TITLES.MessagingPackagesSec.title')"
          :sectionData="homePageData.message_bundles"
        /> -->
        <!-- ========= End:: Messages Packages Section ========= -->

        <!-- ========= Start:: Banner ========= -->
        <BannerUnderPage
          :bannerImage="homePageData?.bottom_ad_companies?.ad_image || null"
          :companySiteLink="homePageData?.bottom_ad_companies?.ad_link || null"
        />
        <!-- ========= End:: Banner ========= -->

        <!-- ========= Start:: Clients Section ========= -->
        <ClientsSection
          v-if="homePageData.partners"
          :sectionData="homePageData.partners"
        />
        <!-- ========= End:: Clients Section ========= -->

        <!-- <SpiderModel
          v-if="shouldShowSpiderModel"
          :modalIsOpen="spiderModalIsOpen"
          @toggleModal="spiderModalScroll"
        /> -->
      </div>
    </template>
  </section>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue'
import GlobalSearchSection from '@/components/generalSections/GlobalSearchSection.vue'
import GoldenCampaignSection from '@/components/generalSections/01.GoldenCampaignSection.vue'
import PremiumCampaignSection from '@/components/generalSections/02.PremiumCampaignSection.vue'
import SilverCampaignSection from '@/components/generalSections/03.SilverCampaignSection.vue'
import AboutSection from '@/components/generalSections/AboutSection.vue'
import ClientsSection from '@/components/generalSections/ClientsSection.vue'
// import SpiderModel from '@/components/ui/modals/SpiderModel.vue'
import BannerUnderPage from '~/components/banners/BannerUnderPage.vue'
import Intro from '~/components/modals/general/Intro.vue'

export default {
  name: 'HomePage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.home'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.home'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.home'),
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
    Intro,
    MainLoader,
    GlobalSearchSection,
    GoldenCampaignSection,
    PremiumCampaignSection,
    SilverCampaignSection,
    AboutSection,
    ClientsSection,
    // SpiderModel,
    BannerUnderPage,
  },

  async asyncData({ $axiosRequest }) {
    try {
      // ********** Start:: Implement Request ********** //
      let res = await $axiosRequest({
        method: 'GET',
        url: 'pages/home',
      })
      // ********** End:: Implement Request ********** //
      return {
        homePageData: res.data.data,
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

  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      // End:: Loaders Controlling Data

      // Start:: Dialogs Control Data
      // spiderModalIsOpen: true,
      // End:: Dialogs Control Data
    }
  },

  computed: {
    // shouldShowSpiderModel() {
    //   return (
    //     this.spiderModalIsOpen &&
    //     window.location.href.includes('spider-te8.com')
    //   )
    // },
  },

  methods: {
    // spiderModalScroll() {
    //   let top = window.pageYOffset || document.documentElement.scrollTop
    //   if (process.client && top >= 50) {
    //     this.spiderModalIsOpen = !this.spiderModalIsOpen
    //     window.removeEventListener('scroll', this.spiderModalScroll)
    //   }
    // },
  },

  mounted() {
    // Start:: Fire Methods
    if (this.homePageData) {
      this.pageIsLoading = !this.pageIsLoading
    }
    // End:: Fire Methods

    // if (process.client) {
    //   window.addEventListener('scroll', this.spiderModalScroll)
    // }
  },

  // beforeDestroy() {
  //   if (process.client) {
  //     window.removeEventListener('scroll', this.spiderModalScroll)
  //   }
  // },
}
</script>

<style lang="scss" scoped>
.gradient_wrapper {
  background: linear-gradient(
    360deg,
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );
}
</style>
