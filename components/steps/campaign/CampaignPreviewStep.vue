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
        <img :src="selectedPackageImage" alt="Selected Advertisement Image" />
      </div>
    </div>
    <div class="advertisements_third_step_checkbox_ok">
      <input type="checkbox" id="termsCheckbox" @click="handleCheckBox" />
      <label>
        {{ $t('OTHERS.agree') }}
        <button type="button" @click.stop="toggleTermsAndConditionsModal">
          {{ $t('BUTTONS.termsAndConditions') }}
        </button></label
      >
    </div>

    <div class="form_btns_wrapper">
      <base-button
        :btnText="$t('BUTTONS.previous')"
        styleType="text_btn"
        @fireClick="$emit('fireNavigateToPreviousStep')"
      />

      <base-button
        :btnText="$t('BUTTONS.submit')"
        styleType="primary_btn"
        :isLoading="isWaitingApiResponse"
        :disabled="!isCheckboxChecked"
        @fireClick="submitStepData"
      />
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
import AdvertisementsThirdStepDetail from '~/components/steps/advertisements/smallComp/AdvertisementsThirdStepDetail.vue'

export default {
  props: {
    details: {
      type: Object,
      default: () => ({
        advertisementPosition: '',
        advertisementPrice: '',
        advertisementName: '',
        discountPercentage: '',
        startDate: '',
        endDate: '',
        period: '',
        website: '',
      }),
    },
    advertisementDetailValue: '',
  },

  components: {
    AdvertisementsThirdStepDetail,
    TextContentModal,
  },

  data() {
    return {
      selectedPackageImage: '', // لإستقبال الصورة من Cookie

      isCheckboxChecked: false,
      termsModalIsOpen: false,
      termsAndConditions: `
        <div dir="rtl" align="left">
          <strong>
            <h5 style="width:fit-content; margin:10px auto 20px auto; font-weight:bold;font-size:18px" >شروط واحكام النشر الاعلاني في موقع نمره </h5>
          </strong>
          <table><colgroup><col width="624"></colgroup>
            <tbody>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 1. الامتثال للقوانين واللوائح </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يتوافق المحتوى الإعلاني مع القوانين والأنظمة المعمول بها في المملكة، بما في ذلك نظام الإعلام المرئي والمسموع.
                  </p>
                  <p dir="rtl" style='font-size:15px;'>يجب الالتزام بالقوانين الخاصة بالإعلانات التجارية والترويجية.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 2. الاحترام للقيم والثقافة </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يكون المحتوى الإعلاني متوافقًا مع القيم الدينية والاجتماعية والثقافية للمملكة.
                  </p>
                  <p dir="rtl" style='font-size:15px;'>يُمنع نشر أي محتوى يتعارض مع الشريعة الإسلامية أو القوانين السعودية، مثل المحتوى المثير للجدل أو الذي يحتوي على مواد غير لائقة.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 3. الشفافية والإفصاح </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يكون المحتوى الإعلاني واضحًا وصريحًا، ويجب أن يتم الإعلان عن أي شراكات تجارية أو تعويضات مالية بوضوح.
                  </p>
                  <p dir="rtl" style='font-size:15px;'> يُفترض أن يتم توضيح طبيعة الإعلان وأن يكون خاليًا من أي تلاعب أو خداع.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 4. الحقوق الملكية الفكرية </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب احترام حقوق الملكية الفكرية وعدم استخدام أو نشر أي محتوى محمي بحقوق الطبع والنشر دون الحصول على إذن مسبق من أصحاب الحقوق.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 5. الموافقة المسبقة </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب الحصول على موافقة الهيئة قبل نشر أي محتوى إعلاني قد يكون له تأثير كبير أو يتطلب تصاريح خاصة.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 6. الرقابة والتقارير </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يكون هناك آلية لمراقبة المحتوى الإعلاني وتقديم تقارير عن أي انتهاكات أو مخالفات.
                  </p>
                  <p dir="rtl" style='font-size:15px;'>يمكن للهيئة طلب مراجعة أو تعديل المحتوى الإعلاني إذا لزم الأمر.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 7. التزام المعايير الإعلانية </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن تلتزم الإعلانات بالمعايير الفنية والإعلانية المعتمدة من الهيئة، مثل حجم الإعلانات والمحتوى المرئي والمسموع.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold ' > 8. حماية البيانات الشخصية </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن تتوافق الإعلانات مع قوانين حماية البيانات الشخصية وعدم استخدامها بشكل غير قانوني.
                  </p>
                </td>
              </tr>
              <tr style='margin-top:30px;tt'>
                <td dir="ltr">
                  <p dir="rtl" style='font-size:15px;'>تتعاون الشركات والمواقع الإلكترونية مع هيئة الإعلام المرئي والمسموع لضمان الامتثال لهذه الشروط وتفادي أي مشاكل قانونية أو تنظيمية.
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        <p>&nbsp;</p>
        `,
    }
  },

  computed: {
    perviewDetails() {
      return [
        {
          id: 1,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPosition'
          )} : `,
          advertisementDetailValue: this.details.advertisementPosition,
        },
        {
          id: 2,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPrice'
          )} : `,
          advertisementDetailValue:
            this.details.price + ` ${this.$t('OTHERS.Ryal')}`,
        },
        {
          id: 3,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPrecDisc'
          )} : `,
          advertisementDetailValue: this.details.discountPercentage + '%',
        },
        {
          id: 4,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementTitle'
          )} : `,
          advertisementDetailValue: this.details.advertisementName,
        },
        {
          id: 5,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementPeriod'
          )} : `,
          advertisementDetailValue: this.details.period,
        },
        {
          id: 6,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementStart'
          )} : `,
          advertisementDetailValue: this.details.startDate,
        },
        {
          id: 7,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementEnd'
          )} : `,
          advertisementDetailValue: this.details.endDate,
        },
        {
          id: 8,
          advertisementDetailKey: `${this.$t(
            'FORMS.Placeholders.advertisementLink'
          )} : `,
          advertisementDetailValue: this.details.website,
        },
      ]
    },
  },
  methods: {
    handleCheckBox() {
      this.isCheckboxChecked = !this.isCheckboxChecked
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedImage = file
        console.log('Uploaded Image:', this.selectedImage)
      }
    },
    toggleTermsAndConditionsModal() {
      this.termsModalIsOpen = !this.termsModalIsOpen
    },
    agreeToTermsAndConditions() {
      this.termsAgreement = true
      this.toggleTermsAndConditionsModal()
    },
    submitStepData() {
      this.$emit('fireStepsSubmit', {
        ...this.details,
        advertisementImage: this.selectedImage,
      })
      this.$cookies.remove('selectedPackageImage')

      console.log('تم حذف كوكي selectedPackageImage')
    },
  },

  beforeUpdate() {
    this.selectedPackageImage = this.$cookies.get('selectedPackageImage')
    console.log(this.selectedPackageImage)
  },
  watch: {
    '$cookies.get("selectedPackageImage")': function (newImage) {
      this.selectedPackageImage = newImage
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
  .form_btns_wrapper {
    @include flex(center, center, row, 10px);
  }
}
</style>
