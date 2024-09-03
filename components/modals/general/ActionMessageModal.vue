<template>
  <transition name="fadeInUp">
    <v-dialog
      width="500"
      max-width="600"
      elevation="0"
      class="action_message_modal"
      v-model="modalIsOpen"
      @click:outside="$emit('toggleModal')"
    >
      <v-card elevation="0">
        <div class="action_modal_content_wrapper">
          <img
            :src="modalImage"
            width="200"
            height="200"
            :alt="modalTitle"
            loading="lazy"
          />

          <h4 class="modal_title">
            {{ modalTitle }}
          </h4>

          <base-button
            class="modal_btn"
            styleType="primary_btn"
            :btnText="modalBtnText"
            @fireClick="$emit('toggleModal')"
          />
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: 'ActionMessageModal',

  emits: ['toggleModal', 'fireConfirmClick'],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalImage: {
      type: String,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    modalBtnText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.action_modal_content_wrapper {
  width: 100%;
  padding: 0 2rem;
  @include flex(center, center, column);
  row-gap: 2.5rem;
  .modal_title {
    text-align: center;
    font-family: $semi_bold_font;
    font-size: 1rem;
    line-height: 1.8;
  }
  .modal_btn {
    width: 100%;
  }
}
</style>
