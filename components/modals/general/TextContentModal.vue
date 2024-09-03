<template>
  <transition name="fadeInUp">
    <v-dialog
      width="500"
      max-width="600"
      elevation="0"
      class="text_content_modal"
      v-model="modalIsOpen"
      @click:outside="$emit('toggleModal')"
    >
      <v-card elevation="0">
        <div class="text_content_wrapper">
          <h4 class="modal_title">
            {{modalTitle}}
          </h4>

          <p class="modal_body" v-html="modalBody" v-if="contentIsHtml"> </p>
          <p class="modal_body" v-else> {{ modalBody }} </p>

          <base-button
            styleType="primary_btn"
            @fireClick="$emit('fireConfirmClick')"
            :btnText="modalBtnText"
            :isLoading="isWaitingApiResponse"
            :disabled="isWaitingApiResponse"
          />
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "TextContentModal",

  emits: ["toggleModal", "fireConfirmClick"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    modalBody: {
      type: String,
      required: true,
    },
    modalBtnText: {
      type: String,
      required: true,
    },
    isWaitingApiResponse: {
      type: Boolean,
      required: false,
      default: false,
    },
    contentIsHtml: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .text_content_wrapper {
    padding: 20px 15px;
    .modal_title {
      text-align: center;
      color: var(--main_theme_clr);
      font-family: $semi_bold_font;
    }

    .modal_body {
      padding: 2rem 1rem !important;
      font-size: 1.1rem;
      color: var(--light_theme_text_clr);
    }

    button {
      width: 100%;
    }
  }
</style>
