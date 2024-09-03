<template>
  <transition name="fadeInUp">
    <v-dialog
      width="fit-content"
      max-width="500"
      elevation="0"
      class="upload_images_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card
        class="d-flex justify-center"
        color="transparent"
        elevation="0"
      >
        <div class="upload_image_form_wrapper">
          <h2 class="modal_title">{{$t("TITLES.uploadImages")}}</h2>
          <v-form
            ref="imageForm"
            v-model="formIsValid"
            @submit.prevent="submitForm"
            lazy-validation
          >
            <div class="row">
              <!-- Start:: Ticket Category Input -->
              <!-- <base-select-input
                v-if="ticketsCategories.length > 0"
                static
                :staticItems="ticketsCategories"
                :placeholder="$t('FORMS.Placeholders.ticketsCategories')"
                soloPlaceholder
                v-model="data.ticketCategory.value"
              /> -->
              <!-- End:: Ticket Category Input -->

              <!-- Start:: Price Input -->
              <!-- <base-input
                type="number"
                :placeholder="$t('FORMS.Placeholders.price') + '*'"
                :validationRules="validationSchema.priceRules"
                :serverSideErrorMessage="data.price.error"
                @clearServerSideErrorMessage="data.price.error = null"
                v-model.trim="data.price.value"
                required
              /> -->
              <!-- End:: Price Input -->

              <!-- Start:: Row Number Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('FORMS.Placeholders.rowNumber') + '*'"
                :validationRules="validationSchema.rowNumberRules"
                :serverSideErrorMessage="data.rowNumber.error"
                v-model.trim="data.rowNumber.value"
                required
              />
              <!-- End:: Row Number Input -->

              <!-- Start:: Seat Number Input -->
              <base-input
                col="6"
                type="text"
                :placeholder="$t('FORMS.Placeholders.seatNumber') + '*'"
                :validationRules="validationSchema.seatNumberRules"
                :serverSideErrorMessage="data.seatNumber.error"
                v-model.trim="data.seatNumber.value"
                required
              />
              <!-- End:: Seat Number Input -->

              <!-- Start:: Image Input -->
              <base-image-upload-input
                identifier="image"
                :placeholder="$t('FORMS.Placeholders.selectImageFile')"
                @selectImage="selectImage"
                @clearErrors="data.image.error = null"
                :errorMessage="data.image.error"
                required
              />
              <!-- End:: Image Input -->

              <!-- Start:: Is Adjacent Input -->
              <!-- <div class="col-12 pb-0">
                <div class="checkbox_input_wrapper">
                  <v-checkbox
                    color="#8758FF"
                    :label="$t('FORMS.Placeholders.isAdjacent')"
                    v-model="data.isAdjacent.value"
                    :error-messages="data.isAdjacent.error"
                  />
                </div>
              </div> -->
              <!-- End:: Is Adjacent Input -->
            </div>

            <base-button
              class="w-100 mt-6"
              :btnText="$t('BUTTONS.addData')"
              styleType="primary_btn"
              :isLoading="isWaitingApiResponse"
              :disabled="!formIsValid || isWaitingApiResponse"
            />
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "UploadImagesModal",

  emits: ["toggleModal", "setSelectedData"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    eventId: {
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Tickets Categories Data
      // ticketsCategories: [],
      // End:: Tickets Categories Data

      // Start:: Data Collection To Send
      data: {
        // ticketCategory: {
        //   value: null,
        //   error: null,
        // },
        // price: {
        //   value: null,
        //   error: null,
        // },
        rowNumber: {
          value: null,
          error: null,
        },
        seatNumber: {
          value: null,
          error: null,
        },
        image: {
          value: null,
          error: null,
        },
        isAdjacent: {
          value: false,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        // ticketCategoryRules: [(val) => !!val || this.$t('FORMS.Validation.ticketCategory')],
        // priceRules: [
        //   (val) => !!val || this.$t('FORMS.Validation.price'),
        //   (val) => val != 0 || this.$t('FORMS.Validation.numberBiggerThanZeroIsNeeded'),
        // ],
        rowNumberRules: [(val) => !!val || this.$t('FORMS.Validation.rowNumber')],
        seatNumberRules: [(val) => !!val || this.$t('FORMS.Validation.seatNumber')],
      },
      // End:: Validation Schema
    }
  },

  watch: {
    "data.image.value"() {
      if(!this.data.rowNumber.error && !this.data.seatNumber.error && !this.data.image.error) {
        this.formIsValid = true;
      }
    },
  },

  methods: {
    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image.value = selectedImage;
    },
    // End:: Select Upload Image

    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal');
    },
    // End:: Control Modal Apperance

    // Start:: Get Tickets Categories
    // async getTicketsCategories() {
    //   try {
    //     const res = await this.$axiosRequest({
    //       method: 'GET',
    //       url: `events/${this.eventId}/ticket-places`,
    //     });
    //     this.ticketsCategories = res.data.data.map(item => {
    //       return {
    //           id: item.id,
    //           name: item.place,
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error.response.data.message);
    //   }
    // },
    // End:: Get Tickets Categories

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.imageForm.validate();

      if(!this.data.image.value) {
        this.data.image.error = this.$t("FORMS.Validation.ticketImage");
        this.formIsValid = false;
        return;
      } else {
        if(this.formIsValid) {
          this.$emit("setSelectedData", {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            // ticketCategory: this.data.ticketCategory.value,
            // price: this.data.price.value,
            rowNumber: this.data.rowNumber.value,
            seatNumber: this.data.seatNumber.value,
            image:  this.data.image.value,
            // isAdjacent:  this.data.isAdjacent.value,
          })
          // Start:: Clear Form Inputs Data
          this.$refs.imageForm.resetValidation();
          this.data.rowNumber.value = null;
          this.data.rowNumber.error = null;
          this.data.seatNumber.value = null;
          this.data.seatNumber.error = null;
          this.data.image.value = null;
          this.data.image.error = null;
          // End:: Clear Form Inputs Data
          this.toggleModal();
        }
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    // this.getTicketsCategories();
    // End:: Fire Methods
  },
};
</script>

<style lang="scss" scoped>
.upload_image_form_wrapper {
  padding: 40px 20px;

  .modal_title {
    margin-bottom: 40px !important;
    font-size: 1.2rem;
    font-family: $semi_bold_font;
  }
}
</style>
