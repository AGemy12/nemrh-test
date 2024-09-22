<template>
  <section class="banner_under_page">
    <div>
      <a
        :href="addProtocol(companySiteLink)"
        v-if="bannerImage"
        target="_blank"
      >
        <img :src="bannerImage" alt="إعلان اسفل الصفحة" />
      </a>
      <div class="banner_under_page_alt" v-else>
        <a href="/find-your-company">
          {{ $t('TITLES.CompaniesAndCampaignsForms.CanCompanyAd') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseBanner',

  props: {
    bannerImage: {
      type: String,
      required: false,
    },
    companySiteLink: {
      type: String,
      required: false,
    },
  },

  methods: {
    addProtocol(link) {
      if (link && !/^https?:\/\//i.test(link)) {
        return `https://${link}`
      }
      return link
    },
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      contactData: 'contactUsData/contactUsData',
    }),
    // End:: Vuex Getters
  },
}
</script>

<style lang="scss">
.banner_under_page {
  max-width: 1185px;
  margin: 1rem auto;
  div {
    @include simpleShadow;
    border-radius: 10px;
    img {
      width: 100%;
    }
    .banner_under_page_alt {
      height: 250px;
      width: 100%;
      background-color: var(--main_theme_clr);
      @include flex(center, center);
      @media (max-width: 768px) {
        height: 150px;
      }
      a {
        display: block;
        border: 1px solid var(--white);
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 20px;
        font-weight: bold;
        background-color: var(--white);
        transition: 0.4s;
        &:hover {
          background-color: var(--main_theme_clr);
          color: var(--white);
        }
        @media (max-width: 768px) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
