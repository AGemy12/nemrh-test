<template>
  <section class="my_phone_content_wrapper">
    <!-- Start:: Add whatsapp number -->
    <div class="add_whatsapp_number_wrapper" v-if="scanQr && !userAuthorized">
      <h1 class="tap_title mb-0">{{ $t('TITLES.Profile.myPhone') }}</h1>
      <h2 class="tap_instruction">
        {{ $t('TITLES.Profile.add_whatsapp_number') }}
      </h2>
      <!-- Start:: Form -->
      <v-form
        ref="whatsappNumberForm"
        v-model="formIsValid"
        @submit.prevent="sendWhatsappNumber"
        lazy-validation
        class="whatsappNumberForm"
      >
        <!-- Start:: Phone Input -->
        <base-input
          type="tel"
          :placeholder="$t('FORMS.Placeholders.whatsAppNumber') + '*'"
          staticPlaceholder="966xxxxxxxx"
          :validationRules="validationSchema.phoneRules"
          :serverSideErrorMessage="data.phone.error"
          @clearServerSideErrorMessage="data.phone.error = null"
          v-model.trim="data.phone.value"
          required
          class="w-100"
        />
        <!-- End:: Phone Input -->

        <base-button
          :btnText="$t('BUTTONS.continue')"
          styleType="primary_btn"
          :isLoading="isWaitingApiResponse"
          :disabled="isWaitingApiResponse"
          @fireClick="sendWhatsappNumber"
        />
      </v-form>
      <!-- End:: Form -->
    </div>
    <!-- End:: Add whatsapp number -->

    <!-- Start:: Scan QR Code to integrate with whatsapp -->
    <div class="scan_qr_wrapper" v-if="syncWithWhatsapp && !userAuthorized">
      <h2 class="tap_instruction">
        {{ $t('TITLES.Profile.scanQrCode') }}
      </h2>
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

      <!-- <base-button
        :btnText="$t('BUTTONS.scanQr')"
        styleType="primary_btn"
        :isLoading="isWaitingApiResponse"
        :disabled="isWaitingApiResponse"
        @fireClick="scanQrCode"
      /> -->
    </div>
    <!-- End:: Scan QR Code to integrate with whatsapp -->

    <!-- Start:: Syncing with whatsapp -->
    <!-- <div class="sync_with_whatsapp_wrapper" v-if="!scanQr && syncWithWhatsapp">
      <h2 class="tap_instruction">
        {{ $t('TITLES.Profile.syncWhatsappNumber') }}
      </h2>
      <div class="qr_image">
        <img src="@/assets/media/images/qr_code_scan.png" alt="qr code" />
      </div>
    </div> -->
    <!-- End:: Syncing with whatsapp -->

    <!-- Start:: Whatsapp phone added successfully -->
    <div class="phone_added_wrapper" v-if="whatsappAddedSuccessfully">
      <div class="confirmation_image">
        <img src="@/assets/media/images/confirmation.svg" alt="qr code" />
      </div>
      <h2 class="tap_instruction">
        {{ $t('TITLES.Profile.phoneAddedSuccessfully') }}
      </h2>
    </div>
    <!-- End:: Whatsapp phone added successfully -->

    <!-- Start:: Add another whatsapp number -->
    <div class="add_another_whatapp_wrapper" v-if="addAnotherWhatsappNumber">
      <h1 class="tap_title">{{ $t('TITLES.Profile.myPhone') }}</h1>
      <h2 class="tap_instruction">
        {{ $t('TITLES.Profile.addAnotherWhatsappNumber') }}
      </h2>
      <div class="row align-items-center justify-content-between mt-5">
        <div class="col-lg-6 col-md-6">
          <!-- Start:: Phone Input -->
          <base-input
            type="tel"
            :placeholder="$t('FORMS.Placeholders.whatsAppNumber') + '*'"
            staticPlaceholder="966xxxxxxxx"
            :validationRules="validationSchema.phoneRules"
            :serverSideErrorMessage="data.phone.error"
            @clearServerSideErrorMessage="data.phone.error = null"
            v-model.trim="data.phone.value"
            required
            disabled
            class="w-100"
          />
          <base-button
            :btnText="$t('BUTTONS.addAnotherWhatsappNumber')"
            styleType="primary_btn"
            :isLoading="isWaitingApiResponse"
            :disabled="isWaitingApiResponse"
            @fireClick="scanQrCode"
          />
          <!-- End:: Phone Input -->
        </div>
        <div class="col-lg-5 col-md-6">
          <div class="scan_another_number">
            <!-- <div class="qr_code_image">
              <img src="@/assets/media/images/qr.png" alt="qr code" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- End:: Add another whatsapp number -->
  </section>
</template>

<script>
import { state } from '@/src/socket'
import BasePagination from '@/components/ui/BasePagination.vue'

export default {
  name: 'myPhone',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Profile.myPhone'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Profile.myPhone'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Profile.myPhone'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'myPhone Page Description',
        },
      ],
    }
  },

  components: {
    BasePagination,
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

    userAuthorized() {
      return state.userAuthorized
    },

    showDivToAddAnotherWhatsappNumber() {
      if (this.userAuthorized) {
        setTimeout(() => {
          this.whatsappAddedSuccessfully = !this.whatsappAddedSuccessfully
        }, 8000)

        this.addAnotherWhatsappNumber = !this.addAnotherWhatsappNumber
      }
    },
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isLoading: false,
      isWaitingApiResponse: false,
      scanQr: true,
      syncWithWhatsapp: false,
      whatsappAddedSuccessfully: false,
      addAnotherWhatsappNumber: false,
      // End:: Loaders Controlling Data

      // Start:: Loaders Controlling Data

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
            !(val && val.length !== 12) ||
            this.$t('FORMS.Validation.phoneLength'),
            (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers')
        ],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Send Whatsapp Number
    // async sendWhatsappNumber() {
    //   await this.$refs.whatsappNumberForm.validate()

    //   if (this.formIsValid) {
    //     this.isWaitingApiResponse = true
    //     // Start:: Append Request Data
    //     const REQUEST_DATA = new FormData()
    //     REQUEST_DATA.append('phone_number', this.data.phone.value)
    //     // Start:: Append Request Data

    //     try {
    //       // ********** Start:: Implement Request ********** //
    //       let res = await this.$axiosRequest({
    //         method: 'POST',
    //         url: 'whatsapp/auth-client',
    //         data: REQUEST_DATA,
    //       })

    //       this.isWaitingApiResponse = false
    //       this.$izitoast.success({
    //         message: res.data.message,
    //       })
    //       // ********** End:: Implement Request ********** //

    //       // Start:: Clear Form Inputs Data
    //       this.$refs.whatsappNumberForm.resetValidation()
    //       this.data.phone.error = null
    //       // End:: Clear Form Inputs Data

    //       // ********** Start:: Redirect To Verify Account ********** //
    //       this.scanQr = !this.scanQr
    //       this.syncWithWhatsapp = !this.syncWithWhatsapp
    //       // ********** End:: Redirect To Verify Account ********** //
    //     } catch (err) {
    //       this.isWaitingApiResponse = false
    //       this.data.phone.error = err.response.data.errors.phone_number
    //     }
    //   }
    // },
    // End:: Send Whatsapp Number

    // Start:: Send Whatsapp Number
    scanQrCode() {
      this.scanQr = !this.scanQr
      this.addAnotherWhatsappNumber = !this.addAnotherWhatsappNumber
    },
    // End:: Send Whatsapp Number
  },
}
</script>

<style lang="scss">
.my_phone_content_wrapper {
  .tap_instruction {
    @include font($medium_font, 1rem, var(--gray_theme_clr));
  }

  .add_whatsapp_number_wrapper {
    @include flex(flex-start, flex-start, column);
    gap: 1.5rem;

    .whatsappNumberForm {
      inline-size: 50%;
      @include media(md) {
        inline-size: 100%;
      }
    }

    button {
      inline-size: 100%;
    }
  }

  .scan_qr_wrapper,
  .sync_with_whatsapp_wrapper,
  .phone_added_wrapper {
    @include flex(center, center, column);

    .qr_image {
      border: 1px solid rgba(94 23 235 / 0.4);
      border-radius: 10px;
      background-color: rgba(94 23 235 / 0.04);
      padding: 1.5rem;
      block-size: 15rem;
      margin-block: 1.25rem;
      @include flex(center, center);

      img {
        @include size(100%, 100%);
        object-fit: contain;
        &.loading_icon {
          color: var(--main_theme_clr);
          width: 60%;
        }
      }
    }

    .confirmation_image {
      block-size: 7rem;
      margin-block: 1.25rem;
    }

    .qr_duration {
      @include font($medium_font, 1rem, var(--gray_theme_clr));
      margin-block-end: 1.25rem !important;

      span {
        @include font($bold_font, 1rem, var(--main_theme_clr));
      }
    }

    button {
      display: block;
      inline-size: 50%;
      margin-block-start: 20px;

      @include media(md) {
        inline-size: 80%;
      }
    }
    .scan_qr_code_text {
      padding: 6px 20px;
      @include font($medium_font, 1rem, var(--white));
      border-radius: 8px;
      background-color: var(--main_theme_clr);
      @include size(50%, 56px);
      @include flex(center, center);
    }
  }

  .add_another_whatapp_wrapper {
    .scan_another_number {
      @include flex(center, center, column);
      gap: 24px;

      .qr_code_image {
        block-size: 9rem;

        img {
          @include size(100%, 100%);
          object-fit: contain;
        }
      }
    }
  }
}
</style>
