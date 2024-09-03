<template>
  <transition name="fadeInUp">
    <v-dialog
      width="500"
      max-width="600"
      elevation="0"
      class="alert_modal"
      v-model="modalIsOpen"
      @click:outside="$emit('toggleModal')"
    >
      <v-card elevation="0">
        <div class="alert_message_content_wrapper">
          <h4 class="alert_title">
            {{$t("TITLES.areYouSureYouWant", {title: alertName})}}
          </h4>

          <div class="btns_wrapper">
            <base-button
              styleType="primary_btn"
              @fireClick="$emit('fireConfirmClick')"
              :btnText="$t('BUTTONS.confirm')"
              :isLoading="isWaitingApiResponse"
              :disabled="isWaitingApiResponse"
            />

            <base-button
              styleType="secondary_btn"
              @fireClick="$emit('toggleModal')"
              :btnText="$t('BUTTONS.cancel')"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "AlertModal",

  emits: ["toggleModal", "fireConfirmClick"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    isWaitingApiResponse: {
      type: Boolean,
      required: true,
    },
    alertName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .alert_message_content_wrapper {
    padding: 40px 15px;
    .alert_title {
      text-align: center;
      color: var(--main_theme_clr);
      font-family: $semi_bold_font;
    }

    .btns_wrapper {
      margin-top: 40px;
      @include flex(center, center);
      column-gap: 30px;
    }
  }
</style>
