<template>
  <div class="stepper_wrapper">
    <div class="stepper_content">
      <div class="stepper_buttons">
        <button
          type="button"
          :class="currentQty <= minQty ? 'disabled' : ''"
          :disabled="currentQty <= minQty"
          @click="$emit('stepperDecrement')"
        >
          -
        </button>

        <span>
          {{ currentQty }}
        </span>

        <button
          type="button"
          :class="currentQty >= maxQty ? 'disabled' : ''"
          :disabled="currentQty >= maxQty"
          @click="$emit('stepperIncrement')"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stepper',

  emits: ['stepperIncrement', 'stepperDecrement'],

  props: {
    minQty: {
      type: Number,
      required: true,
    },
    maxQty: {
      type: Number,
      required: true,
    },
    currentQty: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.stepper_wrapper {
@include flex(center, center);
  .stepper_content {
    border-radius: 0.125rem;
    border: 1px solid var(--light_theme_text_clr);
    .stepper_buttons {
      height: 40px;
    @include flex(center, center);
      .ant-badge {
        .ant-scroll-number {
          border: none;
          box-shadow: none;
          display: inline-block;
          max-width: 50px;
          width: 40px;
          background-color: transparent;
          color: var(--theme_text_clr);
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }
      }
      button {
        color: var(--theme_text_clr);
        width: 40px;
        height: 100%;
        font-size: 22px;
        &.disabled {
          cursor: no-drop;
        }
      }
    }
  }
}
</style>
