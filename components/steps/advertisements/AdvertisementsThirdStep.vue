<template>
  <div class="advertisements_third_step_container" id="advertisementsThirdStep">
    <h3 class="advertisements_first_step_head">
      {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepOneTitle') }}
    </h3>

    <div class="advertisements_third_step">
      <div class="advertisements_third_step_details">
        <h6>{{ $t('OTHERS.AdvertisementDetails') }}</h6>
        <AdvertisementsThirdStepDetail
          v-for="detail in perviewDetails"
          :key="detail.id"
          :advertisementDetailKey="detail.advertisementDetailKey"
          :advertisementDetailValue="detail.advertisementDetailValue"
        />
      </div>
      <div class="advertisements_third_step_preview">
        <h6>{{ $t('OTHERS.AdvertisementPreview') }}</h6>
        <img
          src="../../../assets/media/advestement-below-search-engine.png"
          alt=""
        />
      </div>
    </div>
    <div class="advertisements_third_step_checkbox_ok">
      <input type="checkbox" id="termsCheckbox" @click="handelcheckBox" />
      <label>
        اقر على صحة المعلومات واوافق على
        <button type="button" @click.stop="toggleTermsAndConditionsModal">
          {{ $t('BUTTONS.termsAndConditions') }}
        </button></label
      >
    </div>

    <TextContentModal
      v-if="termsModalIsOpen && termsAndConditions"
      contentIsHtml
      :modalIsOpen="termsModalIsOpen"
      :modalTitle="$t('TITLES.StaticContentPages.termsAndConditions')"
      :modalBody="termsAndConditions"
      :modalBtnText="$t('BUTTONS.agree')"
      @toggleModal="toggleTermsAndConditionsModal"
      @fireConfirmClick="agreeToTermsAndConditions"
    />
  </div>
</template>

<script>
import TextContentModal from '~/components/modals/general/TextContentModal.vue'
import AdvertisementsThirdStepDetail from './smallComp/AdvertisementsThirdStepDetail.vue'

export default {
  props: {
    details: {
      type: Object,
      default: () => ({
        advertisementName: '',
        advertisementPrice: '',
        discountPercentage: '',
        startDate: '',
        endDate: '',
        period: '',
        website: '',
      }),
    },
    handelcheckBox: {
      type: Function,
      require: true,
    },
  },

  components: {
    AdvertisementsThirdStepDetail,
    TextContentModal,
  },

  data() {
    return {
      termsModalIsOpen: false,
      termsAndConditions: null,
    }
  },

  computed: {
    perviewDetails() {
      return [
        {
          id: 1,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPrice'
          )} : `,
          advertisementDetailValue:
            this.details.advertisementPrice + ` ${this.$t('OTHERS.Ryal')}`,
        },
        {
          id: 2,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPrecDisc'
          )} : `,
          advertisementDetailValue: this.details.discountPercentage + '%',
        },
        {
          id: 3,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementTitle'
          )} : `,
          advertisementDetailValue: this.details.advertisementName,
        },
        {
          id: 4,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPeriod'
          )} : `,
          advertisementDetailValue: this.details.period,
        },
        {
          id: 5,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementStart'
          )} : `,
          advertisementDetailValue: this.details.startDate,
        },
        {
          id: 6,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementEnd'
          )} : `,
          advertisementDetailValue: this.details.endDate,
        },
        {
          id: 7,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementLink'
          )} : `,
          advertisementDetailValue: this.details.website,
        },
      ]
    },
  },
  methods: {
    async getTermsAndConditionsData() {
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'pages/legal/terms-and-conditions',
        })
        // ********** End:: Implement Request ********** //
        this.termsAndConditions = res.data.data
      } catch (err) {
        this.$izitoast.error({
          message: err.response.data.message,
        })
      }
    },

    toggleTermsAndConditionsModal() {
      this.termsModalIsOpen = !this.termsModalIsOpen
    },
    agreeToTermsAndConditions() {
      this.termsAgreement = true
      this.toggleTermsAndConditionsModal()
    },
  },
  created() {
    // Start:: Fire Methods
    this.getTermsAndConditionsData()
    // End:: Fire Methods
  },
}
</script>

<style lang="scss" scoped>
.advertisements_third_step_container {
  @include flex(center, center, column, 20px);

  h3 {
    color: var(--white);
    width: fit-content;
    margin: 10px auto;
    padding: 10px;
    background-color: var(--main_theme_clr);
    font-size: 22px;
    text-transform: capitalize;
    border-radius: 5px;
    @media (max-width: 450px) {
      font-size: 20px;
    }
  }
  h4 {
    width: fit-content;
    margin-right: 0;
    font-size: 20px;
    text-transform: capitalize;
    @media (max-width: 450px) {
      font-size: 15px;
      margin: 20px 0;
    }
  }
  .advertisements_third_step {
    @include flex(center, flex-start, row, 20px);
    @media (max-width: 1300px) {
      flex-wrap: wrap;
    }
    .advertisements_third_step_details {
      h6 {
        margin-top: 0;
        width: fit-content;
        margin: 30px auto;
        padding: 10px 20px;
        color: var(--white);
        background-color: var(--main_theme_clr);
        border-radius: 8px;
      }
      flex-shrink: 0;
      width: 40%;
      @media (max-width: 1300px) {
        width: 100%;
      }
      @media (max-width: 450px) {
        width: 300px;
      }
    }
    .advertisements_third_step_preview {
      h6 {
        margin-top: 0;
        width: fit-content;
        margin: 30px auto;
        padding: 10px 20px;
        color: var(--white);
        background-color: var(--main_theme_clr);
        border-radius: 8px;
      }
      img {
        max-width: 100%;
        border-radius: 10px;
      }
    }
  }
  .advertisements_third_step_checkbox_ok {
    @include flex(center, center, row, 10px);
    width: fit-content;
    margin: 20px auto;
    label {
      font-size: 14px;
      font-weight: bold;
      color: var(--black);
      @media (max-width: 450px) {
        font-size: 12px;
      }
      button {
        color: var(--main_theme_clr);
      }
    }
    input {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
