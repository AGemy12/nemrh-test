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
      require: true,
    },
    advertisementDetailValue: {
      type: String,
      require: true,
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
  .advertisement_detail_value {
    font-weight: 600;
    font-size: 15px;
  }
}
</style>
