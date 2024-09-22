<template>
  <div class="silver_campaign_card_wrapper">
    <div class="details_wrapper" v-if="campaignData.ad_desc">
      <img :src="campaignData.ad_image" alt="" />
    </div>

    <div class="wrapper" v-if="campaignData.company">
      <div class="item_info_wrapper">
        <nuxt-link
          :to="localePath(`/companies/${campaignData.company.id}`)"
          class="item_logo_wrapper"
        >
          <img
            v-lazy="campaignData.company.image"
            :alt="campaignData.company.title"
            width="65"
            height="65"
            loading="lazy"
          />
        </nuxt-link>

        <div class="info_wrapper">
          <h5>{{ campaignData.company.title }}</h5>
        </div>
      </div>

      <a
        class="item_website_link"
        :href="addProtocol(campaignData.ad_link)"
        target="_blank"
      >
        {{ $t('BUTTONS.visitWebsite') }}
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
      if (link && !/^https?:\/\//i.test(link)) {
        return `https://${link}`
      }
      return link
    },
  },
}
</script>

<style lang="scss" scoped>
.silver_campaign_card_wrapper {
  padding: 1.2rem 1.5rem;
  background-color: #fbf9ff;
  border-radius: 8px;
  .details_wrapper {
    padding-block: 0.5rem 1.2rem;
    font-size: 1.1rem;
    color: var(--dark_main_theme_clr);
    min-height: 240px;
    max-height: 240px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .wrapper {
    padding-block: 1.5rem 0.2rem;
    @include flex(space-between, center);
    column-gap: 0.5rem;
    border-top: 1px solid var(--light_border_clr);
    .item_info_wrapper {
      @include flex(flex-start, center);
      column-gap: 0.5rem;
      width: 70%;

      .item_logo_wrapper {
        padding: 0.3rem;
        @include size(55px, 55px);
        border-radius: 8px;
        box-shadow: 0 0 10px var(--simple_shadow_clr);
        overflow: hidden;
        @include flex(center, center);
        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: contain;
        }
      }

      .info_wrapper {
        @include flex(center, flex-start, column);
        max-width: calc(100% - 70px);

        h5 {
          margin: 0;
          width: 100%;
          @include font($bold_font, 1rem);
          @include textEllipsis;
        }
      }
    }

    .item_website_link {
      @include font($semi_bold_font, 0.85rem, var(--main_theme_clr));
      text-decoration: underline;
      text-underline-offset: 0.22rem;
    }
  }
}
</style>
