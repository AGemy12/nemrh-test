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
        <img src="../../../assets/media/images/hero.png" alt="" />
      </div>
    </div>
    <div class="advertisements_third_step_checkbox_ok">
      <input type="checkbox" id="termsCheckbox" @click="handelcheckBox" />
      <label for="">اقر على صحة المعلومات واوافق على الشروط والأحكام</label>
    </div>
  </div>
</template>

<script>
import AdvertisementsThirdStepDetail from './smallComp/AdvertisementsThirdStepDetail.vue'

export default {
  props: {
    details: {
      type: Object,
      default: () => ({
        advertisementName: '',
        advertisementPrice: '',
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
            'FORMS.Placeholders.advertisementTitle'
          )} : `,
          advertisementDetailValue: this.details.advertisementName,
        },
        {
          id: 3,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPeriod'
          )} : `,
          advertisementDetailValue: this.details.period,
        },
        {
          id: 4,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementStart'
          )} : `,
          advertisementDetailValue: this.details.startDate,
        },
        {
          id: 5,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementEnd'
          )} : `,
          advertisementDetailValue: this.details.endDate,
        },
        {
          id: 6,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementLink'
          )} : `,
          advertisementDetailValue: this.details.website,
        },
      ]
    },
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
    }
    input {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
