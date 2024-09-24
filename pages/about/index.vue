<template>
  <div class="about_us_page_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <div class="container">
        <!-- ========= Start:: About Us Section ========= -->
        <AboutSection
          :sectionData="{
            image: pageData.about_image,
            title: pageData.about_title,
            description: pageData.about_description,
            contact_number: pageData.contact_number,
          }"
        />
        <!-- ========= End:: About Us Section ========= -->

        <!-- ========= Start:: Features Section ========= -->
        <FeaturesSection :sectionData="pageData.objectives" />
        <!-- ========= End:: Features Section ========= -->
      </div>
      <!-- ========= Start:: Banner ========= -->
      <BannerUnderPage
        :bannerImage="pageData?.bottom_ad_companies?.ad_image || null"
        :companySiteLink="pageData?.bottom_ad_companies?.ad_link || null"
      />
      <!-- ========= End:: Banner ========= -->

      <!-- ========= Start:: Clients Section ========= -->
      <ClientsSection :sectionData="pageData.partners" />
      <!-- ========= End:: Clients Section ========= -->
    </template>
  </div>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue'
import AboutSection from '@/components/generalSections/AboutSection.vue'
import FeaturesSection from '@/components/generalSections/FeaturesSection.vue'
import BaseBanner from '@/components/banners/BaseBanner.vue'
import ClientsSection from '@/components/generalSections/ClientsSection.vue'
import BannerUnderPage from '~/components/banners/BannerUnderPage.vue'

export default {
  name: 'AboutUsPage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.AboutUs.pageTitle'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.AboutUs.pageTitle'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.AboutUs.pageTitle'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'About Us Page Description',
        },
      ],
    }
  },

  components: {
    MainLoader,
    AboutSection,
    FeaturesSection,
    BaseBanner,
    ClientsSection,
    BannerUnderPage,
  },

  async asyncData({ $axiosRequest }) {
    try {
      // ********** Start:: Implement Request ********** //
      let res = await $axiosRequest({
        method: 'GET',
        url: 'pages/about',
      })
      // ********** End:: Implement Request ********** //
      return {
        pageData: res.data.data,
      }
    } catch (err) {
      console.log(err.response.data.message)
    }
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
    if (this.pageData) {
      this.pageIsLoading = !this.pageIsLoading
    }
    // End:: Fire Methods
  },
}
</script>

<style lang="scss">
.about_us_page_wrapper {
  padding-block: $section_block_padding 0;
  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );

  .clients_section_wrapper {
    padding-block: $section_block_padding * 1.3;
  }

  @include media(md) {
    padding-block-start: $section_block_padding * 0.5;
    .clients_section_wrapper {
      padding-block: $section_block_padding * 0.5;
    }
  }
}
</style>
