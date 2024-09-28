<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="650"
      class="send_message_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
      flat
    >
      <v-card elevation="0">
        <h5>{{ $t('TITLES.Modals.writeTheTextToSend') }}</h5>

        <v-form
          class="w-100"
          ref="sendMessageForm"
          v-model="formIsValid"
          @submit.prevent="submitForm"
          lazy-validation
        >
          <!-- Start:: Message Input -->
          <base-input
            type="textarea"
            rows="7"
            :placeholder="$t('FORMS.Placeholders.leaveYourMessage') + '*'"
            :validationRules="validationSchema.messageRules"
            :serverSideErrorMessage="data.message.error"
            @clearServerSideErrorMessage="data.message.error = null"
            v-model.trim="data.message.value"
            required
          />
          <!-- End:: Message Input -->

          <div class="form_btns_wrapper">
            <base-button
              class="w-100"
              :btnText="modalBtnText"
              styleType="primary_btn"
              :isLoading="isWaitingApiResponse"
              :disabled="!formIsValid || isWaitingApiResponse"
            />
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: 'SendMessageModal',

  emits: ['toggleModal', 'onResponseSuccess'],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalBtnText: {
      type: String,
      required: true,
    },
    selectedCompaniesToSendMessage: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loading Handling Data
      isWaitingApiResponse: false,
      // End:: Loading Handling Data

      // Start:: Data Collection To Send
      data: {
        message: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        messageRules: [(val) => !!val || this.$t('FORMS.Validation.message')],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },
    // End:: Control Modal Apperance

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.sendMessageForm.validate()

      if (this.formIsValid) {
        this.isWaitingApiResponse = true

        // Start:: Append Request Data
        const REQUEST_DATA = new FormData()
        this.selectedCompaniesToSendMessage.forEach((item, index) => {
          REQUEST_DATA.append(`companies_ids[${index}]`, item.id)
        })
        REQUEST_DATA.append('message', this.data.message.value)
        // Start:: Append Request Data

        try {
          // ********** Start:: Implement Request ********** //
          await this.$axiosRequest({
            method: 'POST',
            url: 'send-messages',
            data: REQUEST_DATA,
          })
          // ********** End:: Implement Request ********** //
          this.isWaitingApiResponse = false

          // Start:: Clear Form Inputs Data
          this.$refs.sendMessageForm.resetValidation()
          this.data.message.value = null
          this.data.message.error = null
          // End:: Clear Form Inputs Data

          this.$emit('onResponseSuccess')
          this.toggleModal()
        } catch (err) {
          this.isWaitingApiResponse = false
          this.$izitoast.error({
            message: err.response.data.message,
          })
        }
      }
    },
    // End:: Submit Form
  },
}
</script>

<style lang="scss" scoped>
.v-card {
  padding: 3rem 2rem;

  h5 {
    width: 100%;
    margin-bottom: 2rem;
    @include font($bold_font, 1.1rem);
    @include rtl(text-align, left, right);
  }
  .form_btns_wrapper {
    @include flex(space-between, center);
    column-gap: 10px;
    button {
      flex: 1;
      padding: 7px 20px;
    }
  }
}
</style>
