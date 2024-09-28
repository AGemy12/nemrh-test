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
        <img src="../../assets/media/logo/logo_white.svg" alt="" />
        <p>{{ $t('OTHERS.bannerUnderPageTitle') }}</p>
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
      if (link && !/^https?:\/\/(www\.)?/i.test(link)) {
        link = `https://${link}`
      }
      if (!/^https?:\/\/www\./i.test(link)) {
        link = link.replace(/^https?:\/\//i, 'https://www.')
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
  width: 100vw;
  margin-top: 2rem;
  div {
    @include simpleShadow;
    img {
      width: 100%;
    }
    .banner_under_page_alt {
      padding: 2rem 0;
      width: 100%;
      background-color: var(--main_theme_clr);
      @include flex(center, center, column, 20px);
      @media (min-width: 992px) {
        min-height: 400px;
      }
      img {
        width: 200px;
      }
      p {
        font-size: 1.5rem;
        color: var(--white);
        text-align: justify;
      }
      a {
        padding: 10px;
        border: 1px solid var(--white);
        background-color: var(--white);
        color: var(--dark);
        font-size: 20px;
        font-weight: bold;
        border-radius: 5px;
        transition: 0.5s;
        &:hover {
          background-color: var(--main_theme_clr);
          color: var(--white);
        }
      }
      @media (max-width: 768px) {
        padding: 0.5rem 0;
        img {
          width: 80px;
        }
        p {
          font-size: 0.7rem;
        }
        a {
          font-size: 14px;
          padding: 5px;
        }
      }
    }
  }
}
</style>
