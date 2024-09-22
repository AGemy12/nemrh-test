<template>
  <section class="silver_campaign_section_content_wrapper">
    <h2
      class="section_title"
      v-html="$t('TITLES.SilverCampaignSec.title')"
    ></h2>
    <p
      class="section_desc"
      v-lettering="{ splits: [' '] }"
      :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    >
      {{ $t('TITLES.SilverCampaignSec.desc') }}
    </p>

    <div class="companies_content_wrapper">
      <SilverCampaignCarousel :carouselItems="sectionData" />
    </div>
  </section>
</template>

<script>
import SilverCampaignCarousel from '@/components/carousels/SilverCampaignCarousel.vue'

export default {
  name: 'SilverCampaignSection',

  components: {
    SilverCampaignCarousel,
  },

  props: {
    sectionData: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.silver_campaign_section_content_wrapper {
  padding-block: $section_block_padding;
  @include flex(center, center, column);
  row-gap: 1rem;
  overflow: hidden;

  .section_title {
    @include font($semi_bold_font, 1.6rem);
    text-transform: capitalize;
    text-align: center;
    line-height: 1.8;
    max-width: 50%;

    span {
      display: inline-block;
      margin-inline: 0.3rem;
      text-align: center;
      padding: 0.2rem 1rem;
      @include font($medium_font, 1.4rem);
      color: var(--white);
      background-color: var(--main_theme_clr);
      border-radius: 8px;
    }
  }

  .section_desc {
    margin-block: 1rem !important;
    color: var(--gray_theme_clr);
    font-size: 1.1rem;
    text-align: center;
    max-width: 40%;

    & > span {
      display: inline-block;
      margin-inline: 0.1rem;

      &:nth-last-of-type(-n + 2) {
        color: var(--main_theme_clr);
        font-family: $semi_bold_font !important;
      }
    }
  }

  .companies_content_wrapper {
    margin-inline: auto;
    width: 100%;
  }

  @include media(md) {
    padding-block: 1rem;

    .section_title {
      font-size: 1.4rem;
      line-height: 1.6;
      flex-wrap: wrap;
      row-gap: 1rem;
      text-align: center;
      max-width: 95%;

      span {
        padding: 0.2rem 1.2rem;
        font-size: 1.1rem;
      }
    }

    .section_desc {
      margin-block: 0.5rem;
      max-width: 95%;
    }
  }
}
</style>
