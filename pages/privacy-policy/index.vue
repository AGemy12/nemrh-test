<template>
  <div class="static_content_page_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <!-- Start:: Page Header -->
      <div class="page_header_wrapper">
        <h1 class="page_title">{{ $t('TITLES.StaticContentPages.privacyPolicy') }}</h1>
        <p class="page_desc">
          {{ $t('TITLES.StaticContentPages.pageDesc') }}
        </p>
      </div>
      <!-- End:: Page Header -->

      <!-- Start:: Page Content -->
      <div class="container">
        <div class="page_content_wrapper" v-html="pageData"></div>
      </div>
      <!-- End:: Page Content -->
    </template>
  </div>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue';

export default {
  name: "PrivacyPolicy",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.StaticContentPages.privacyPolicy'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.StaticContentPages.privacyPolicy'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.StaticContentPages.privacyPolicy'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Privacy Policy Page Desc Will Go Here',
        },
      ],
    }
  },

  components: {
    MainLoader,
  },

  async asyncData({ $axiosRequest }) {
    try {
      // ********** Start:: Implement Request ********** //
      let res = await $axiosRequest({
        method: 'GET',
        url: 'pages/legal/policy',
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
