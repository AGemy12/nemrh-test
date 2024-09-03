<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="650"
      class="send_rate_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
      flat
    >
      <v-card elevation="0">
        <h5> {{ modalTitle }} </h5>

        <v-form
          class="w-100"
          ref="sendRateForm"
          v-model="formIsValid"
          @submit.prevent="submitForm"
          lazy-validation
        >
          <!-- End:: Rate Input -->
          <v-rating
            dir="ltr"
            background-color="#F4C800"
            color="#F4C800"
            length="5"
            size="45"
            v-model="data.rate.value"
            half-increments
            hover
          />
          <!-- empty-icon="fa-regular fa-star"
          half-icon="fa-solid fa-star-half-stroke"
          full-icon="fa-solid fa-star" -->
          <!-- End:: Rate Input -->

          <!-- Start:: Comment Input -->
          <base-input
            type="textarea"
            rows="6"
            :placeholder="$t('FORMS.Placeholders.yourComment') + '*'"
            :validationRules="validationSchema.commentRules"
            :serverSideErrorMessage="data.comment.error"
            @clearServerSideErrorMessage="data.comment.error = null"
            v-model.trim="data.comment.value"
            required
          />
          <!-- End:: Comment Input -->

          <div class="form_btns_wrapper">
            <base-button
              class="w-100"
              :btnText="$t('BUTTONS.send')"
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
  name: "SendRateModal",

  emits: ["toggleModal", "onResponseSuccess"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    companyId: {
      type: Number,
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
        rate: {
          value: 0,
          error: null,
        },
        comment: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        commentRules: [(val) => !!val || this.$t('FORMS.Validation.comment')],
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
      await this.$refs.sendRateForm.validate();

      if (this.formIsValid) {
        this.isWaitingApiResponse = true;

        // Start:: Append Request Data
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append('company_id', this.companyId);
        REQUEST_DATA.append('rate', this.data.rate.value);
        REQUEST_DATA.append('comment', this.data.comment.value);
        // Start:: Append Request Data

        try {
          // ********** Start:: Implement Request ********** //
          await this.$axiosRequest({
            method: 'POST',
            url: 'store-review',
            data: REQUEST_DATA,
          })
          this.isWaitingApiResponse = false;
          this.toggleModal();
          this.$emit('onResponseSuccess');
          // ********** End:: Implement Request ********** //

          // Start:: Clear Form Inputs Data
          this.$refs.sendRateForm.resetValidation();
          this.data.rate.value = null;
          this.data.rate.error = null;
          this.data.comment.value = null;
          this.data.comment.error = null;
          // End:: Clear Form Inputs Data
        } catch (err) {
          this.isWaitingApiResponse = false;
          this.$izitoast.error({
            message: err.response.data.message,
          });
        }
      }
    },
    // End:: Submit Form
  },
};
</script>


<style lang="scss">
.v-card {
  padding: 3rem 2rem;

  h5 {
    width: 100%;
    margin-bottom: 2rem;
    @include font($bold_font, 1.1rem);
    @include rtl(text-align, left, right);
  }
  .v-rating {
    @include flex(flex-end, center);
    margin-block: 0 2rem;
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
