<template>
  <section class="clients_section_wrapper">
    <ClientsCarousel :carouselItems="sectionData" />
  </section>
</template>

<script>
import ClientsCarousel from '@/components/carousels/ClientsCarousel.vue';

export default {
  name: 'ClientsSection',

  components: {
    ClientsCarousel,
  },

  props: {
    sectionData: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.clients_section_wrapper {
  padding-block: $section_block_padding * 0.5 $section_block_padding;
  padding-inline: 1.5rem;

  @include media(md) {
    padding-block: 0 $section_block_padding * 0.5;
  }
}
</style>