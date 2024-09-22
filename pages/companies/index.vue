<template>
  <section class="companies_page_content_wrapper">
    <div class="container">
      <!-- ========== Start:: Search ========= -->
      <GlobalSearchSection
        :searchAdImage="homePageData?.search_ad_companies?.ad_image || null"
        :path="homePageData?.search_ad_companies?.ad_link || null"
      />
      <!-- ========= End:: Search ========= -->

      <!-- ========= Start:: Companies Categories ========= -->
      <CategoriesButtonsCarousel
        v-if="!isSearchQueryParamExist"
        :isWaitingCategoryClickApiResponse="isWaitingApiResponse"
        :initialSelectedCategoryId="+$route.query.filter_category"
        @selectCategory="updateRouterQueryParamBasedOnFilterCategory"
      />
      <!-- ========= End:: Companies Categories ========= -->

      <!-- ========= Start:: Companies Table ========= -->
      <CompaniesTable
        :isLoading="isWaitingApiResponse"
        :companies="companies"
        :compaignDetails="campaignDetails"
        :userIsSubscribedInMessagingPackage="userIsSubscribedInMessagingPackage"
        :userAvailableCopiesCount="userAvailableCopiesCount"
        :paginations="paginations"
        @onCopyToClipboard="decrementAvailableCopiesCount"
      />
      <!-- ========= End:: Companies Table ========= -->

      <!-- ========= Start:: Banner ========= -->
      <BannerUnderPage
        :bannerImage="homePageData?.bottom_ad_companies?.ad_image || null"
        :companySiteLink="homePageData?.bottom_ad_companies?.ad_link || null"
      />
      <!-- ========= End:: Banner ========= -->
    </div>
  </section>
</template>

<script>
import GlobalSearchSection from '@/components/generalSections/GlobalSearchSection.vue'
import CategoriesButtonsCarousel from '@/components/carousels/CategoriesButtonsCarousel.vue'
import CompaniesTable from '@/components/tables/CompaniesTable.vue'
import BaseBanner from '@/components/banners/BaseBanner.vue'
import BannerUnderPage from '~/components/banners/BannerUnderPage.vue'

export default {
  name: 'Companies',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Companies.title'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Companies.title'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Companies.title'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Companies Page Description WIll Go Here',
        },
      ],
    }
  },

  components: {
    GlobalSearchSection,
    CategoriesButtonsCarousel,
    CompaniesTable,
    BaseBanner,
    BannerUnderPage,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Filter Data
      filterBy: +this.$route.query.filter_category,
      searchKeyword: null,
      // End:: Filter Data

      // Start:: Companies Data
      companies: [],
      userIsSubscribedInMessagingPackage: false,
      userAvailableCopiesCount: 0,
      campaignDetails: null,
      // End:: Companies Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      // Start:: Banner Data
      bannerData: null,
      // End:: Banner Data
    }
  },

  computed: {
    // Start:: Check If Search Query Param Is Exist In Route Query Params
    isSearchQueryParamExist() {
      return Object.keys(this.$route.query).includes('search')
    },
    // End:: Check If Search Query Param Is Exist In Route Query Params
  },

  watch: {
    // Start:: Filter Category Query Param Watcher To Get Page Data Based On It's Change
    ['$route.query.filter_category']() {
      this.filterBy = +this.$route.query.filter_category
      this.getCompaniesBySelectedCategory()
    },
    // End:: Filter Category Query Param Watcher To Get Page Data Based On It's Change

    // Start:: Search Keyword Query Param Watcher To Get Page Data Based On It's Change
    ['$route.query.search']() {
      this.searchKeyword = this.$route.query.search
      this.getCompaniesBySelectedCategory()
    },
    // End:: Search Keyword Query Param Watcher To Get Page Data Based On It's Change

    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ['$route.query.page']() {
      this.paginations.current_page = +this.$route.query.page
      this.getCompaniesBySelectedCategory()
      // Scroll To Screen's Top After Paginate
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
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
          message_bundles: null,
        },
      }
    }
  },

  methods: {
    // Start:: Filter Category Pagination Query Params
    updateRouterQueryParamBasedOnFilterCategory(selectedCategoryId) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          filter_category: selectedCategoryId,
        },
      })
    },
    // End:: Filter Category Pagination Query Params

    // Start:: Get Companies By Selected Category
    async getCompaniesBySelectedCategory() {
      this.isWaitingApiResponse = true
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'companies',
          params: {
            page: this.paginations.current_page
              ? this.paginations.current_page
              : null,
            category_id: this.filterBy ? this.filterBy : null,
            keyword: this.searchKeyword ? this.searchKeyword : null,
          },
        })
        // ********** End:: Implement Request ********** //
        this.isWaitingApiResponse = false
        this.companies = res.data.data
        this.campaignDetails = res.data.additional_data
        this.userIsSubscribedInMessagingPackage =
          res.data.additional_data.has_message_subscriptions
        this.userAvailableCopiesCount =
          res.data.additional_data.remaining_copies_count
        this.bannerData = res.data.additional_data.bottom_banner_content
        this.paginations.current_page = res.data.meta.current_page
        this.paginations.last_page = res.data.meta.last_page
        this.paginations.items_per_page = res.data.meta.per_page
      } catch (err) {
        this.isWaitingApiResponse = false
        console.log(err.response.data.message)
      }
    },
    // End:: Get Companies By Selected Category

    // Start:: Decrement User Available Copies Count
    decrementAvailableCopiesCount() {
      if (this.userAvailableCopiesCount > 0) {
        this.userAvailableCopiesCount--
      }
    },
    // Start:: Decrement User Available Copies Count
  },

  created() {
    // Start:: Fire Methods
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page
    }
    if (this.$route.query.search) {
      this.searchKeyword = this.$route.query.search
    }
    // if (this.$route.query.filter_category) {
    //   this.filterBy = +this.$route.query.filter_category;
    // }
    this.getCompaniesBySelectedCategory()
    // End:: Fire Methods
  },
}
</script>

<style lang="scss">
.companies_page_content_wrapper {
  padding-block-end: $section_block_padding;
  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );
  .search_section_content_wrapper {
    background: transparent;
    .wrapper {
      min-height: unset;
      max-height: unset;
      row-gap: 1.5rem;
      padding-block: $section_block_padding * 1.5 $section_block_padding * 0.8;
    }
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.5;
    .search_section_content_wrapper {
      .wrapper {
        padding-block: 0 4rem;
      }
    }
  }
}
</style>
