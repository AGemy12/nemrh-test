<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="650"
      class="delete_company_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
      flat
    >
      <v-card elevation="0">
        <h5> {{ modalTitle }} </h5>

        <v-form
          class="w-100"
          ref="deleteCompanyForm"
          v-model="formIsValid"
          @submit.prevent="submitForm"
          lazy-validation
        >
          <!-- Start:: Email Input -->
          <base-input
            class="my-2"
            type="email"
            :placeholder="$t('FORMS.Placeholders.email') + '*'"
            :validationRules="validationSchema.emailRules"
            :serverSideErrorMessage="data.email.error"
            @clearServerSideErrorMessage="data.email.error = null"
            v-model.trim="data.email.value"
            required
          />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Input -->
          <base-input
            class="my-2"
            type="tel"
            :placeholder="$t('FORMS.Placeholders.phone') + '*'"
            staticPlaceholder="966xxxxxxxx"
            :validationRules="validationSchema.phoneRules"
            :serverSideErrorMessage="data.phone.error"
            @clearServerSideErrorMessage="data.phone.error = null"
            v-model.trim="data.phone.value"
            required
          />
          <!-- End:: Phone Input -->

          <!-- Start:: Document Input -->
          <base-document-upload-input
            identifier="image"
            :placeholder="$t('FORMS.Placeholders.commercialRegister') + '*'"
            @selectDocument="selectDocument"
            @clearErrors="data.document.error = null"
            :errorMessage="data.document.error"
            required
          />
          <!-- End:: Document Input -->

          <div class="form_btns_wrapper">
            <base-button
              class="w-100 mt-5"
              :btnText="$t('BUTTONS.sendDeleteRequest')"
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
import isValidEmail from '@/utils/isValidEmail';

export default {
  name: "DeleteCompanyModal",

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
        email: {
          value: null,
          error: null,
        },
        phone: {
          value: null,
          error: null,
        },
        document: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        phoneRules: [
          val => !!val || this.$t('FORMS.Validation.phone'),
          val => !(val && !val.startsWith("966")) || this.$t('FORMS.Validation.phoneStartWith966'),
          val => !(val && val.length !== 12) || this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers')
        ],
        emailRules: [
          (val) => !!val || this.$t('FORMS.Validation.email'),
          (val) =>
            (val && !!isValidEmail(val)) ||
            this.$t('FORMS.Validation.invalidEmail'),
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
    // End:: Control Modal Apperance

    // Start:: Select Upload Document
    selectDocument(selectedDocument) {
      this.data.document.value = selectedDocument;
    },
    // End:: Select Upload Document

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.deleteCompanyForm.validate();
      if (!this.data.document.value) {
        this.data.document.error = this.$t('FORMS.Validation.commercialRegister')
        this.formIsValid = false;
        return
      } else {
        if (this.formIsValid) {
          this.isWaitingApiResponse = true;

          // Start:: Append Request Data
          const REQUEST_DATA = new FormData();
          REQUEST_DATA.append('company_id', this.companyId);
          REQUEST_DATA.append('email', this.data.email.value);
          REQUEST_DATA.append('phone', this.data.phone.value);
          REQUEST_DATA.append('commercial_file', this.data.document.value.file);
          // Start:: Append Request Data

          try {
            // ********** Start:: Implement Request ********** //
            await this.$axiosRequest({
              method: 'POST',
              url: 'companies-requests/delete',
              data: REQUEST_DATA,
            })
            this.isWaitingApiResponse = false;
            this.toggleModal();
            this.$emit('onResponseSuccess');
            // ********** End:: Implement Request ********** //
  
            // Start:: Clear Form Inputs Data
            this.$refs.deleteCompanyForm.resetValidation();
            this.data.email.value = null;
            this.data.email.error = null;
            this.data.phone.value = null;
            this.data.phone.error = null;
            this.data.document.value = null;
            this.data.document.error = null;
            // End:: Clear Form Inputs Data
          } catch (err) {
            this.isWaitingApiResponse = false;
            this.data.email.error = err.response.data.errors.email;
            this.data.phone.error = err.response.data.errors.phone;
            this.data.document.error = err.response.data.errors.commercial_file;
          }
        }
      }
    },
    // End:: Submit Form
  },
};
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
