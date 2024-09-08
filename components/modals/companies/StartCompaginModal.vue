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
        <v-form
          class="w-100"
          ref="sendMessageForm"
          v-model="formIsValid"
          @submit.prevent="submitForm"
          lazy-validation
        >
          <!-- Add time between messages -->
          <div>
            <h5>{{ $t('TITLES.Modals.writeTheTextToSend') }}</h5>
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

            <!-- Start:: Message PDF File Input -->
            <h5 class="mb-2">{{ $t('TITLES.Modals.uploadPdfFile') }}</h5>
            <p
              class="details"
              v-html="$t('TITLES.Modals.theLargestPdfSize')"
            ></p>
            <base-document-upload-input
              class="my-6"
              identifier="file"
              :placeholder="$t('FORMS.Placeholders.AttachPdfFile')"
              @selectDocument="selectDocument"
              accept=".pdf, .png, .jpg, .jpeg"
            />
            <!-- End:: Message PDF File Input -->

            <!-- Start:: Message CSV File Input -->
            <h5 class="mb-2">{{ $t('TITLES.Modals.uploadCsvFile') }}</h5>
            <p
              class="details"
              v-html="$t('TITLES.Modals.theLargestCsvSize')"
            ></p>
            <base-document-upload-input
              class="my-6"
              identifier="csv_file"
              :placeholder="$t('FORMS.Placeholders.AttachCsvFile')"
              @selectDocument="selectDocument"
              accept=".csv"
              @clearErrors="data.CSVFile.error"
              :errorMessage="data.CSVFile.error"
            />

            <h5 class="mb-2">{{ $t('TITLES.Modals.timeOfSend') }}</h5>
            <p
              class="details"
              v-html="compaignDetailsText.campaign_details"
            ></p>
            <!-- Start:: Message Input -->
            <base-input
              type="number"
              :placeholder="compaignDetailsText.campaign_period_placeholder"
              :validationRules="validationSchema.messageTimeRules"
              :serverSideErrorMessage="data.messageTime.error"
              v-model.trim="data.messageTime.value"
              required
            />
            <!-- End:: Message Input -->

            <div class="form_btns_wrapper">
              <base-button
                class="w-100"
                :btnText="$t('BUTTONS.startCampaign')"
                styleType="primary_btn"
                :isLoading="isWaitingApiResponse"
                :disabled="
                  !formIsValid ||
                  isWaitingApiResponse ||
                  data.messageTime.value == null ||
                  data.messageTime.error != null ||
                  data.message.value == null ||
                  data.message.error != null
                "
              />
            </div>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StartCampaginModal',

  emits: ['toggleModal', 'onResponseSuccess'],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    selectedCompaniesToSendMessage: {
      type: Array,
      required: true,
    },
    compaignDetailsText: {
      type: Object,
      required: false,
    },
    selectedCategorieId: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      // Start:: Loading Handling Data
      isWaitingApiResponse: false,
      // End:: Loading Handling Data

      // Start:: Control Modal Apperance
      showMessageInput: true,
      // End:: Control Modal Apperance

      // Start:: Data Collection To Send
      data: {
        message: {
          value: null,
          error: null,
        },
        messageTime: {
          value: null,
          error: null,
        },
        campaignFile: {
          value: null,
          error: null,
        },
        campaignCsvFile: {
          value: null,
          error: null,
        },
        CSVFile: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        messageRules: [(val) => !!val || this.$t('FORMS.Validation.message')],
        messageTimeRules: [(val) => !!val || this.$t('FORMS.Validation.time')],
      },
      // End:: Validation Schema
    }
  },
  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      authedUserData: 'auth/authedUserData',
    }),
    // End:: Vuex Getters
  },

  methods: {
    // Start:: Select Upload Documents
    selectDocument(selectedDocument) {
      const MAX_PDF_FILE_SIZE = 3 * 1024 * 1024
      const MAX_CSV_FILE_SIZE = 2 * 1024 * 1024

      if (selectedDocument.identifier === 'file') {
        if (selectedDocument.file.size > MAX_PDF_FILE_SIZE) {
          this.data.campaignFile.error = this.$t(
            'FORMS.Validation.fileTooLarge'
          )
          this.$izitoast.error({
            message: this.$t('FORMS.Validation.fileTooLarge'),
          })
          this.data.campaignFile.value = null
        } else {
          this.data.campaignFile.error = null
          this.data.campaignFile.value = selectedDocument.file
        }
      }

      if (selectedDocument.identifier === 'csv_file') {
        if (selectedDocument.file.size > MAX_CSV_FILE_SIZE) {
          this.data.campaignCsvFile.error = this.$t(
            'FORMS.Validation.CSVfileTooLarge'
          )
          this.$izitoast.error({
            message: this.$t('FORMS.Validation.CSVfileTooLarge'),
          })
          this.data.campaignCsvFile.value = null
        } else {
          this.data.campaignCsvFile.error = null
          this.data.campaignCsvFile.value = selectedDocument.file
        }
      }
    },

    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },
    // End:: Control Modal Apperance

    // Start:: Control div Appearance
    showDivOfMessageTime() {
      if (
        this.data.message.value &&
        !this.data.campaignFile.error &&
        !this.data.campaignCsvFile.error
      ) {
        this.showMessageInput = false
        this.showMessageTimeInput = true
      } else {
        this.$izitoast.error({
          message: this.$t('FORMS.Validation.fixErrorsBeforeContinue'),
        })
      }
    },
    // End:: Control div Appearance

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.sendMessageForm.validate()

      if (this.formIsValid) {
        this.isWaitingApiResponse = true

        // Start:: Append Request Data
        const REQUEST_DATA = new FormData()

        if (!this.selectedCategorieId) {
          this.selectedCompaniesToSendMessage.forEach((item, index) => {
            REQUEST_DATA.append(`companies_ids[${index}]`, item.id)
          })
        } else {
          REQUEST_DATA.append('category_id', this.selectedCategorieId)
        }

        REQUEST_DATA.append('message', this.data.message.value)
        REQUEST_DATA.append('waiting_time', this.data.messageTime.value)

        // Add pdf file to data
        if (this.data.campaignFile.value) {
          REQUEST_DATA.append('file', this.data.campaignFile.value)
        }
        // Add csv file to data
        if (this.data.campaignCsvFile.value) {
          REQUEST_DATA.append('csv_file', this.data.campaignCsvFile.value)
        }

        try {
          let res = await this.$axiosRequest({
            method: 'POST',
            url: 'send-messages',
            data: REQUEST_DATA,
          })
          console.log([...REQUEST_DATA.entries()])

          this.isWaitingApiResponse = false

          // Start:: Clear Form Inputs Data
          this.$refs.sendMessageForm.resetValidation()
          this.data.message.value = null
          this.data.messageTime.value = null
          this.data.campaignFile.value = null
          this.data.campaignCsvFile.value = null

          this.$izitoast.success({
            message: res.data.message,
          })

          this.$emit('onResponseSuccess')
          this.toggleModal()
        } catch (err) {
          this.isWaitingApiResponse = false
          this.$izitoast.error({
            message: err.response.data.message,
          })

          if (err.response.data.errors?.waiting_time) {
            this.data.messageTime.error = err.response.data.errors.waiting_time
          }
          if (err.response.data.errors?.csv_file) {
            this.data.CSVFile.error = err.response.data.errors.csv_file[0]
          }
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
    @include font($bold_font, 1rem);
    @include rtl(text-align, left, right);
  }

  .details {
    @include font($regular_font, 0.9rem, var(--gray_theme_clr));
    margin-bottom: 2rem !important;
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
