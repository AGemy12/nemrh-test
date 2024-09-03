<template>
  <button 
    @click="$emit('fireClick')" 
    :class="{
      discard_btn: styleType == 'discard_btn',
      primary_btn: styleType == 'primary_btn',
      secondary_btn: styleType == 'secondary_btn',
      bordered_btn: styleType == 'bordered_btn',
      text_btn: styleType == 'text_btn',
      loading: isLoading,
    }" 
    :disabled="disabled"
  >
    <slot name="btn_icon"></slot>
    {{ btnText }}
    <span class="btn_loader" v-if="isLoading"></span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  emits: ['fireClick'],

  props: {
    btnText: {
      required: true,
      type: String,
    },
    styleType: { // discard_btn || primary_btn || secondary_btn || bordered_btn || text_btn
      required: false,
      type: String,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
  button {
    &.discard_btn {
      @include discardButtonStyle;
    }
    &.primary_btn {
      @include primaryBtnStyle;
    }
    &.secondary_btn {
      @include secondaryBtnStyle;
    }
    &.bordered_btn {
      @include borderedBtnStyle;
      @include flex(center, center);
      column-gap: 8px;
    }
    &.text_btn {
      @include borderedBtnStyle;
      @include flex(center, center);
      column-gap: 8px;
      border: none;
      color: var(--main_theme_clr);
    }
  }
</style>
