<template>
  <div class="below_search_engine_banner">
    <a :href="addProtocol(path)" v-if="searchAdImage" target="_blank">
      <img :src="searchAdImage" alt="إعلان تحت محرك البحث" />
    </a>
    <div class="below_search_engine_banner_alt" v-else>
      <img src="../../assets/media/logo/logo_white.svg" alt="" />
      <p>{{ $t('OTHERS.bannerUnderSearTitle') }}</p>
      <a href="/find-your-company">
        {{ $t('TITLES.CompaniesAndCampaignsForms.CanCompanyAd') }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchAdImage: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  data() {
    return {}
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
}
</script>

<style lang="scss" scoped>
.below_search_engine_banner {
  width: 100vw;
  max-height: 380px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  @media (max-width: 480px) {
    position: relative;
    margin-top: 2rem;
  }
  @include simpleShadow;
  a {
    @include flex(center, center);
    img {
      width: 100%;
    }
  }
  .below_search_engine_banner_alt {
    width: inherit;
    padding: 1rem 0;
    @media (min-width: 992px) {
      min-height: 350px;
    }
    background-color: var(--main_theme_clr);
    @include flex(center, center, column, 20px);
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
</style>
