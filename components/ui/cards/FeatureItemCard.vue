<template>
  <div class="feature_item_card" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <img
      class="feature_image"
      v-lazy="featureData.image"
      :alt="featureData.title"
      width="70"
      height="70"
      loading="lazy"
    />
    <h3 class="feature_title">{{featureData.title}}</h3>
    <p class="feature_description">{{featureData.description}}</p>
  </div>
</template>

<script>
export default {
  name: 'FeatureItemCard',

  props: {
    featureData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.feature_item_card {
  position: relative;
  margin-block: 5px;
  background-color: var(--white);
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  block-size: 300px;
  @include flex(center, center, column);
  row-gap: 1.5rem;
  transition: all 0.5s linear;
  .feature_title {
    margin: 0;
    text-align: center;
    font-family: $bold_font;
    font-size: 1.3rem;
    color: var(--theme_text_clr);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
  }
  .feature_description {
    text-align: center;
    font-family: $semi_bold_font;
    font-size: 0.95rem;
    color: var(--light_theme_text_clr);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-block-end: 3rem;
  }

  &:hover {
    transform: scale(1.05);
  }

  @include media(md) {
    block-size: unset;
  }
}
</style>
