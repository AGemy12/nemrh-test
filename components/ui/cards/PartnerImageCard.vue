<template>
  <div class="partner_image_card">
    <img
      v-lazy="partnerData.image"
      :alt="partnerData.title"
      width="60"
      height="60"
      loading="lazy"
    />
  </div>
</template>

<script>
export default {
  name: "PartnerImageCard",

  props: {
    partnerData: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.partner_image_card {
  inline-size: 100%;
  block-size: 5rem;
  img {
    inline-size: 100%;
    block-size: 100%;
    aspect-ratio: 3/2;
    object-fit: contain;
  }
}
</style>
