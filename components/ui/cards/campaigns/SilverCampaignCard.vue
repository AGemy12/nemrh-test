<template>
  <div class="silver_campaign_card_wrapper">
    <div class="details_wrapper" v-if="campaignData">
      <a
        class="item_website_link"
        :href="addProtocol(campaignData.ad_link)"
        target="_blank"
      >
        <img :src="campaignData.ad_image" alt="" />
      </a>
    </div>
    <div class="silver_campaign_card_wrapper_alt" v-else>
      <img src="../../../../assets/media/logo/logo_white.svg" alt="" />
      <p>{{ $t('OTHERS.bannerMiddelPageTitle') }}</p>
      <a href="/find-your-company">
        {{ $t('TITLES.CompaniesAndCampaignsForms.CanCompanyAd') }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SilverCampaignCard',

  props: {
    campaignData: {
      type: Object,
      required: true,
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
}
</script>

<style lang="scss" scoped>
.silver_campaign_card_wrapper {
  padding: 0 5px;
  background-color: #fbf9ff;
  border-radius: 8px;
  @include flex(center, center);
  .details_wrapper {
    padding-block: 0.5rem;
    font-size: 1.1rem;
    color: var(--dark_main_theme_clr);
    max-width: 300px;
    max-height: 280px;
    overflow: hidden;
    @include flex(center, center);
    img {
      width: 100%;
    }
  }
  .silver_campaign_card_wrapper_alt {
    padding: 2rem 0.5rem;
    width: 300px;
    height: 280px;
    background-color: var(--main_theme_clr);
    @include flex(center, center, column, 20px);

    img {
      width: 200px;
    }
    p {
      font-size: 1rem;
      color: var(--white);
      text-align: justify;
    }
    a {
      padding: 10px;
      border: 1px solid var(--white);
      background-color: var(--white);
      color: var(--dark);
      font-size: 1rem;
      font-weight: bold;
      border-radius: 5px;
      transition: 0.5s;
      &:hover {
        background-color: var(--main_theme_clr);
        color: var(--white);
      }
    }
    @media (max-width: 768px) {
      padding: 0.5rem;
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
