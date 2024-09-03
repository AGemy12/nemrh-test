<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="500"
      class="add_whatsapp_num_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card>
        <div class="add_whatsapp_num_form_wrapper">
          <!-- ========== Start:: Modal Header ========== -->
          <div class="model_header">
            <h5>{{ $t('TITLES.Modals.add_whatsapp_number') }}</h5>
            <button class="close_btn" @click="toggleModal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <!-- ========== End:: Modal Header ========== -->

          <!-- ========== Start:: Add Whatsapp number form ========== -->
          <v-form
            ref="addWhatsappNumberForm"
            v-model="formIsValid"
            @submit.prevent="submitForm"
            lazy-validation
          >
            <div class="row">
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
            </div>
          </v-form>
          <!-- ========== End:: Add Whatsapp number form ========== -->

          <!-- ========== Start:: Modal Footer ========== -->
          <div class="modal_footer_wrapper">
            <base-button
              :btnText="$t('BUTTONS.confirmNumber')"
              styleType="primary_btn"
              :isLoading="isWaitingApiResponse"
              :disabled="isWaitingApiResponse"
              @fireClick="submitForm"
            />
          </div>
          <!-- ========== End:: Modal Footer ========== -->
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: 'AddWhatsappNumberModal',

  emits: ['toggleModal', 'openScanQrModal'],

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
            !(val && val.length !== 12) ||
            this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers'),
        ],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },

    openScanQrModal() {
      this.$emit('openScanQrModal')
    },

    closeModal() {
      // Start:: Clear Form Inputs Data
      this.$refs.addWhatsappNumberForm.resetValidation()
      this.data.phone.value = null
      this.data.phone.error = null
      // End:: Clear Form Inputs Data

      this.toggleModal()
    },
    // End:: Control Modal Apperance

    // Start:: Submit Form
    async submitForm() {
      this.$refs.addWhatsappNumberForm.validate()

      if (this.formIsValid) {
        this.isWaitingApiResponse = true
        // Start:: Append Request Data
        const REQUEST_DATA = new FormData()
        REQUEST_DATA.append('phone_number', this.data.phone.value)
        // Start:: Append Request Data

        try {
          // ********** Start:: Implement Request ********** //
          let res = await this.$axiosRequest({
            method: 'POST',
            url: 'whatsapp/auth-client',
            data: REQUEST_DATA,
          })

          this.isWaitingApiResponse = false
          this.$izitoast.success({
            message: res.data.message,
          })
          // ********** End:: Implement Request ********** //

          // Start:: Clear Form Inputs Data
          this.$refs.addWhatsappNumberForm.resetValidation()
          this.data.phone.value = null
          this.data.phone.error = null
          // End:: Clear Form Inputs Data

          this.toggleModal()
          this.openScanQrModal()
        } catch (err) {
          this.isWaitingApiResponse = false
          this.data.phone.error = err.response.data.errors.phone_number
        }
      }
    },
    // End:: Submit Form
  },
}
</script>

<style lang="scss" scoped>
.add_whatsapp_num_form_wrapper {
  width: 100%;
  .model_header {
    @include flex(space-between, baseline);
    margin-block-end: 4rem;

    h5 {
      @include font($semi_bold_font, 1rem, var(--theme_text_clr));
      margin-block-end: 0;
    }
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
  }
}
</style>
