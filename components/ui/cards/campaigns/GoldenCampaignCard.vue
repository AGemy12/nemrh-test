<template>
  <div class="golden_campaign_card_wrapper">
    <div class="item_info_wrapper">
      <nuxt-link
        :to="localePath(`/companies/${campaignData.id}`)"
        class="item_logo_wrapper"
      >
        <img
          v-lazy="campaignData.image"
          :alt="campaignData.name"
          width="60"
          height="60"
          loading="lazy"
        />
      </nuxt-link>

      <div class="details_wrapper">
        <h5>{{ campaignData.name }}</h5>
        <RatingPreview size="12" :rate="campaignData.rate" />
      </div>
    </div>

    <a
      class="item_website_link"
      :href="addProtocol(campaignData.website)"
      target="_blank"
    >
      {{ $t('BUTTONS.visitWebsite') }}
    </a>
  </div>
</template>

<script>
import RatingPreview from '@/components/ui/RatingPreview.vue'

export default {
  name: 'GoldenCampaignCard',

  components: {
    RatingPreview,
  },

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
.golden_campaign_card_wrapper {
  padding: 0.9rem;
  border: 1px solid var(--light_border_clr);
  border-radius: 8px;
  @include flex(space-between, center);
  column-gap: 0.5rem;

  .item_info_wrapper {
    @include flex(flex-start, center);
    column-gap: 0.5rem;
    width: 75%;

    .item_logo_wrapper {
      padding: 0.2rem;
      border-radius: 8px;
      box-shadow: 0 0 10px var(--simple_shadow_clr);
      overflow: hidden;
      img {
        object-fit: contain;
        border-radius: 8px;
      }
    }

    .details_wrapper {
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
</style>
