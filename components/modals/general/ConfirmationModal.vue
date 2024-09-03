<template>
  <transition name="fadeInUp">
    <v-dialog
      width="500"
      max-width="600"
      elevation="0"
      class="alert_modal"
      v-model="modalIsOpen"
      persistent
    >
      <!-- @click:outside="$emit('toggleModal')" -->
      <v-card elevation="0">
        <div class="confirmation_modal_content_wrapper">
          <slot></slot>
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "ConfirmationModal",

  emits: ["toggleModal"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
  .confirmation_modal_content_wrapper {
    @include flex(center, center, column);
    row-gap: 2.5rem;
    padding-block: 2rem;

    :is(h2, h3, h4, h5) {
      text-align: center;
      font-size: 1.4rem;
      color: var(--light_theme_text_clr);
      line-height: 1.8;
    }

    a {
      @include primaryBtnStyle;
      width: 100%;
    }
  }
</style>
