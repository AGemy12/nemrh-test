<template>
  <section class="features_section_wrapper">
    <div class="container">
      <div class="row">
        <div 
          class="col-lg-4"
          v-for="(item, index) in sectionData"
          :key="item.title"
        >
          <div
            data-aos="flip-up"
            data-aos-duration="500"
            :data-aos-delay="index * 500"
          >
            <FeatureItemCard :featureData="item"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FeatureItemCard from "@/components/ui/cards/FeatureItemCard.vue";

export default {
  name: 'FeaturesSection',

  props: {
    sectionData: {
      type: Array,
      required: true,
    },
  },

  components: {
    FeatureItemCard,
  },
}
</script>

<style lang="scss" scoped>
.features_section_wrapper {
  padding-block: $section_block_padding;

  @include media(md) {
    padding-block: $section_block_padding * 0.5;
  }
}
</style>
