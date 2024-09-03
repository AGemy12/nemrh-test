<template>
  <v-rating
    class="text-center"
    dir="ltr"
    :background-color="backgroundColor"
    :color="color"
    :empty-icon="emptyIcon"
    :half-icon="halfIcon"
    :full-icon="fullIcon"
    :length="length"
    :size="size"
    :value="rate"
    half-increments
    readonly
    hover
  />
</template>

<script>
export default {
  name: 'RatingPreview',

  props: {
    backgroundColor: {
      required: false,
      default: '#FFE24B',
    },
    color: {
      required: false,
      default: '#F4C800',
    },
    emptyIcon: {
      required: false,
      default: 'fa-regular fa-star',
    },
    halfIcon: {
      required: false,
      default: 'fa-solid fa-star-half-stroke',
    },
    fullIcon: {
      required: false,
      default: 'fa-solid fa-star',
    },
    size: {
      required: false,
      default: 30,
    },
    length: {
      required: false,
      default: 5,
    },
    rate: {
      required: true,
    },
  },
}
</script>

<style lang="scss">
.v-rating {
  .v-icon {
    padding: 0.2rem !important;
  }
}
</style>
