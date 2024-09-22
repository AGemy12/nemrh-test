<template>
  <div class="golden_campaign_placeholder_card_wrapper">
    <div class="item_info_wrapper">
      <div class="item_logo_wrapper"></div>

      <div class="details_wrapper">
        <h5>{{ $t('TITLES.GoldenCampaignSec.advertiseWithNemrh') }}</h5>
      </div>
    </div>

    <nuxt-link
      class="add_campaign_route"
      :to="localePath('/find-your-company')"
    >
      {{ $t('BUTTONS.addCampaign') }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'GoldenCampaignPlaceholderCard',
}
</script>

<style lang="scss" scoped>
.golden_campaign_placeholder_card_wrapper {
  padding: 0.9rem;
  border: 1px solid var(--light_border_clr);
  border-radius: 8px;
  @include flex(space-between, center);
  column-gap: 1rem;

  .item_info_wrapper {
    @include flex(flex-start, center);
    column-gap: 1rem;
    width: 70%;

    .item_logo_wrapper {
      @include size(65px, 65px);
      background-color: var(--theme_second_bg);
      border-radius: 8px;
      box-shadow: 0 0 10px var(--simple_shadow_clr);
    }

    .details_wrapper {
      @include flex(center, flex-start, column);
      max-width: calc(100% - 80px);
      h5 {
        margin: 0;
        width: 100%;
        @include font($bold_font, 0.9rem);
        line-height: 1.6;
      }
    }
  }

  .add_campaign_route {
    @include primaryBtnStyle;
    min-width: unset;
    padding: 4px 6px;
    @include font($semi_bold_font, 0.8rem, var(--white));
    text-decoration: underline;
    text-underline-offset: 0.1rem;
  }
}
</style>
