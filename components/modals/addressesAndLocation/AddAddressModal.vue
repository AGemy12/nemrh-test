<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="700"
      class="add_address_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card>
        <div class="add_address_form_wrapper">
          <!-- ========== Start:: Modal Header ========== -->
          <div class="modal_header_wrapper">
            <h5> {{ $t("TITLES.addAddress") }} </h5>
          </div>
          <!-- ========== End:: Modal Header ========== -->

          <!-- ========== Start:: Add Address form ========== -->
          <v-form
            ref="addAddressForm"
            v-model="formIsValid"
            @submit.prevent="submitForm"
            lazy-validation
          >
            <div class="row">
              <!-- Start:: Phone Number Input -->
              <base-input
                type="tel"
                :placeholder="$t('FORMS.Placeholders.phone')+'*'"
                staticPlaceholder="9665xxxxxxx"
                :validationRules="validationSchema.phoneRules"
                :serverSideErrorMessage="data.phone.error"
                @clearServerSideErrorMessage="data.phone.error = null"
                v-model.trim="data.phone.value"
                required
              />
              <!-- End:: Phone Number Input -->

              <!-- Start:: Map Search Location Input -->
              <map-location-input
                :placeholder="$t('FORMS.Placeholders.shippingAddress')+'*'"
                :validationRules="validationSchema.addressRules"
                :serverSideErrorMessage="data.address.error"
                @selectLocation="setSelectedCoordinates"
                required
              />
              <!-- End:: Map Search Location Input -->

              <!-- Start:: Notes Input -->
              <base-input
                type="textarea"
                :placeholder="$t('FORMS.Placeholders.notes') + '*'"
                :validationRules="validationSchema.notesRules"
                :serverSideErrorMessage="data.notes.error"
                @clearServerSideErrorMessage="data.notes.error = null"
                v-model.trim="data.notes.value"
                required
              />
              <!-- End:: Notes Input -->
            </div>
          </v-form>
          <!-- ========== End:: Add Address form ========== -->

          <!-- ========== Start:: Modal Footer ========== -->
          <div class="modal_footer_wrapper">
            <base-button
              :btnText="$t('BUTTONS.cancel')"
              styleType="discard_btn"
              @fireClick="closeModal"
            />
            <base-button
              :btnText="$t('BUTTONS.addAddress')"
              styleType="primary_btn"
              :isLoading="isWaitingApiResponse"
              :disabled="!formIsValid || isWaitingApiResponse"
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
  name: "AddAddressModal",

  emits: ["toggleModal"],

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
        address: {
          value: null,
          error: null,
        },
        notes: {
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
          val => !(val && val.length !== 11) || this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers')
        ],
        addressRules: [(val) => !!val || this.$t('FORMS.Validation.address')],
        notesRules: [(val) => !!val || this.$t('FORMS.Validation.notes')],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },
    closeModal() {
      // Start:: Clear Form Inputs Data
      this.$refs.addAddressForm.resetValidation();
      this.data.phone.value = null;
      this.data.phone.error = null;
      this.data.address.value = null;
      this.data.address.error = null;
      this.data.notes.value = null;
      this.data.notes.error = null;
      // End:: Clear Form Inputs Data

      this.toggleModal();
    },
    // End:: Control Modal Apperance

      // Start:: Set Selected Map Coordinates
      async setSelectedCoordinates(selectedData) {
        this.data.address.value = selectedData;
      },
      // End:: Set Selected Map Coordinates

    // Start:: Submit Form
    async submitForm() {
      this.$refs.addAddressForm.validate();

      this.toggleModal();

      // if(this.formIsValid) {
      //   this.isWaitingApiResponse = true;

      //   // Start:: Append Request Data
      //   const REQUEST_DATA = new FormData();
      //   REQUEST_DATA.append('phone', this.data.phone.value);
      //   REQUEST_DATA.append('notes', this.data.notes.value);
      //   // Start:: Append Request Data

      //   try {
      //     // ********** Start:: Implement Request ********** //
      //     await this.$axiosRequest({
      //       method: 'POST',
      //       url: 'contacts',
      //       data: REQUEST_DATA,
      //     });
      //     this.isWaitingApiResponse = false;
      //     this.$izitoast.success({
      //       message: this.$t('MESSAGES.sentSuccessfully'),
      //     });
      //     // ********** End:: Implement Request ********** //

      //     // Start:: Clear Form Inputs Data
      //     this.$refs.addAddressForm.resetValidation();
      //     this.data.phone.value = null;
      //     this.data.phone.error = null;
      //     this.data.notes.value = null;
      //     this.data.notes.error = null;
      //     // End:: Clear Form Inputs Data

      // this.toggleModal();
      //   } catch (err) {
      //     this.isWaitingApiResponse = false;
      //     // console.log(err.response.data.errors);
      //     this.data.phone.error = err.response.data.errors.phone;
      //     this.data.notes.error = err.response.data.errors.notes;
      //   }
      // }
    },
    // End:: Submit Form
  },
};
</script>


<style lang="scss" scoped>
.add_address_form_wrapper {
  .modal_header_wrapper {
    padding:15px;
    margin-bottom: 15px;
    text-align: center;
    h5 {
      margin: 0;
      color: var(--theme_text_clr);
      font-size: 19px;
      font-family: $bold_font;
    }
  }

  form {
    padding: 15px;
  }

  .modal_footer_wrapper {
    padding: 15px;
    @include flex(center, center);
    column-gap: 10px;
    button {
      padding: 10px;
      font-size: 14px;
      width: 150px;
    }
  }
}
</style>
