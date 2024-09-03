<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="500"
      class="scan_whatsapp_qr_code_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card>
        <div class="scan_whatsapp_qr_code_form_wrapper">
          <!-- ========== Start:: Modal Header ========== -->
          <div class="model_header">
            <h5>{{ $t('TITLES.Modals.chooseWhatsappNumber') }}</h5>
            <button class="close_btn" @click="toggleModal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <!-- ========== End:: Modal Header ========== -->

          <!-- ========== Start:: Scan Qr Code ========== -->
          <div>
            <h2 class="model_instruction">
              {{ $t('TITLES.Profile.scanQrCode') }}
            </h2>
            <div class="qr_wrapper">
              <div class="qr_image">
                <img :src="qrCode" alt="qr code" v-if="qrCode" />
                <img
                  class="loading_icon"
                  src="@/assets/media/icons/ui_icons/icons-loading.svg"
                  alt="loading icon"
                  v-else
                />
              </div>
              <p
                class="qr_duration"
                v-html="$t('TITLES.Profile.qrDuration', { duration: 30 })"
              ></p>
              <p class="scan_qr_code_text">
                {{ $t('TITLES.Profile.scanQr') }}
              </p>
            </div>
          </div>
          <!-- ========== End:: Scan Qr Code ========== -->

          <!-- ========== Start:: scaning Qr ========== -->
          <!-- <div class="d-none">
            <h2 class="model_instruction">
              {{ $t('TITLES.Profile.syncWhatsappNumber') }}
            </h2>
            <div class="qr_wrapper">
              <div class="qr_image">
                <img
                  src="@/assets/media/images/qr_code_scan.png"
                  alt="qr code"
                />
              </div>
            </div>
          </div> -->

          <!-- ========== End:: scaning Qr ==========-->

          <!-- ========== Start:: Qr successfully added ========== -->
          <div class="d-none">
            <div class="qr_wrapper">
              <div class="confirmation_image">
                <img
                  src="@/assets/media/images/confirmation.svg"
                  alt="qr code"
                />
              </div>
              <h2 class="model_instruction">
                {{ $t('TITLES.Profile.phoneAddedSuccessfully') }}
              </h2>
            </div>
          </div>

          <!-- ========== End:: Qr successfully added ==========-->
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
import { state, restartSocket } from '@/src/socket'
export default {
  name: 'ScanWhatsappQrCodeModal',

  emits: ['toggleModal', 'onScanningSuccess'],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Data Collection To Send
      data: {
        phone: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        phoneRules: [
          (val) => !!val || this.$t('FORMS.Validation.phone'),
          (val) =>
            !(val && val.length !== 11) ||
            this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers'),
        ],
      },
      // End:: Validation Schema
    }
  },

  computed: {
    connected() {
      return state.connected
    },
    qrCode() {
      return state.qrCode
    },

    userId() {
      return state.userId
    },

    readyToSendMessages() {
      return state.readyToSendMessages
    },
  },

  watch: {
    readyToSendMessages(newValue) {
      if (newValue) {
        this.toggleModal()
        this.$emit('onScanningSuccess')
      }
    },
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
      restartSocket()
    },
    // End:: Control Modal Apperance
  },
}
</script>

<style lang="scss">
.scan_whatsapp_qr_code_form_wrapper {
  width: 100%;

  .model_header {
    @include flex(space-between, baseline);
    margin-block-end: 3rem;

    h5 {
      @include font($semi_bold_font, 1rem, var(--theme_text_clr));
      margin-block-end: 0;
    }
  }

  .model_instruction {
    @include font($medium_font, 1rem, var(--theme_text_clr));
  }

  .qr_wrapper {
    @include flex(center, center, column);
  }
  .qr_image {
    border: 1px solid rgba(94 23 235 / 0.4);
    border-radius: 10px;
    background-color: rgba(94 23 235 / 0.04);
    padding: 1.25rem;
    block-size: 12rem;
    margin-block: 1.25rem;
    width: 12rem;
    @include flex(center, center);

    img {
      @include size(100%, 100%);
      object-fit: contain;

      &.loading_icon {
        color: var(--main_theme_clr);
        @include size(6rem, 6rem);
      }
    }
  }

  .confirmation_image {
    block-size: 7rem;
    margin-block: 1.25rem;
  }

  .qr_duration {
    @include font($medium_font, 1rem, var(--gray_theme_clr));
    span {
      @include font($bold_font, 1rem, var(--main_theme_clr));
    }
  }

  button {
    display: block;
    inline-size: 50%;
    margin-block-start: 20px;
  }

  .scan_qr_code_text {
    padding: 6px 20px;
    margin-block-start: 1rem !important;
    @include font($medium_font, 1rem, var(--white));
    border-radius: 8px;
    background-color: var(--main_theme_clr);
    @include size(80%, 56px);
    @include flex(center, center);
  }

  .modal_footer_wrapper {
    @include flex(center, center);
    column-gap: 10px;

    button {
      padding: 10px;
      font-size: 14px;
      width: 100%;
    }
  }

  .close_btn {
    @include size(1.15rem, 1.15rem);
    margin-block-start: 0;
  }
}
</style>
