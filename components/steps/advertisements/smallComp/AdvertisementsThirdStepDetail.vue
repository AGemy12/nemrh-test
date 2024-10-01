<template>
  <div class="advertisement_detail">
    <span class="advertisement_detail_key"> {{ advertisementDetailKey }} </span>
    <span class="advertisement_detail_value">
      {{ advertisementDetailValue }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    advertisementDetailKey: {
      type: String,
      required: true,
    },
    advertisementDetailValue: {
      type: [String, Number],
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.advertisement_detail {
  padding: 10px;
  background-color: var(--gray_overlay_bg);
  font-size: 17px;
  border-radius: 8px;
  @include flex(space-between, center);
  margin-bottom: 15px;
  .advertisement_detail_key {
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  .advertisement_detail_value {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
