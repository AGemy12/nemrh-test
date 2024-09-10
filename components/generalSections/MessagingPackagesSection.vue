<template>
  <section class="messaging_packages_section_content_wrapper">
    <h2 class="section_title" v-html="sectionTitle"></h2>

    <div class="companies_content_wrapper">
      <div class="container">
        <MessagingPackagesCarousel :carouselItems="sectionData" />
      </div>
    </div>
  </section>
</template>

<script>
import MessagingPackagesCarousel from '@/components/carousels/MessagingPackagesCarousel.vue'

export default {
  name: 'MessagingPackagesSection',

  components: {
    MessagingPackagesCarousel,
  },

  props: {
    sectionTitle: {
      type: String,
      required: true,
    },
    sectionData: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.messaging_packages_section_content_wrapper {
  @include flex(center, center, column);
  row-gap: 1rem;
  overflow: hidden;
  padding: 0 !important;
  .section_title {
    @include font($semi_bold_font, 1.6rem);
    text-transform: capitalize;
    text-align: center;
    // max-width: 35%;
    @include rtl(max-width, 50%, 35%);

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
  .companies_content_wrapper {
    max-width: 100%;
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.5 0;

    .section_title {
      font-size: 1.4rem;
      line-height: 1.6;
      flex-wrap: wrap;
      row-gap: 1rem;
      text-align: center;
      @include rtl(max-width, 95%, 95%);

      span {
        padding: 0.2rem 1.2rem;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
