<template>
  <div class="advertisements_third_step_container" id="advertisementsThirdStep">
    <h2 class="global_title">
      {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepOneTitle') }}
    </h2>
    <h3 class="step_title">
      {{ companyTitle }}
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
      v-if="termsModalIsOpen"
      contentIsHtml
      :modalIsOpen="termsModalIsOpen"
      :modalTitle="$t('TITLES.StaticContentPages.termsAndConditions')"
      :modalBody="
        $i18n.locale === 'ar' ? termsAndConditionsAr : termsAndConditionsEn
      "
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
    companyTitle: {
      type: String,
      default: '',
    },
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
      selectedPackageImage: '',
      isCheckboxChecked: false,
      termsModalIsOpen: false,
      isWaitingApiResponse: false,
      companyTitle: '',

      termsAndConditionsAr: `
        <div dir="rtl" align="left">
          <strong>
            <h5 style="width:fit-content; margin:10px auto 20px auto; font-weight:bold;font-size:18px" >شروط واحكام النشر الاعلاني في موقع نمره </h5>
          </strong>
          <table><colgroup><col width="624"></colgroup>
            <tbody>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 1. الامتثال للقوانين واللوائح </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يتوافق المحتوى الإعلاني مع القوانين والأنظمة المعمول بها في المملكة، بما في ذلك نظام الإعلام المرئي والمسموع.
                  </p>
                  <p dir="rtl" style='font-size:15px;'>يجب الالتزام بالقوانين الخاصة بالإعلانات التجارية والترويجية.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 2. الاحترام للقيم والثقافة </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يكون المحتوى الإعلاني متوافقًا مع القيم الدينية والاجتماعية والثقافية للمملكة.
                  </p>
                  <p dir="rtl" style='font-size:15px;'>يُمنع نشر أي محتوى يتعارض مع الشريعة الإسلامية أو القوانين السعودية، مثل المحتوى المثير للجدل أو الذي يحتوي على مواد غير لائقة.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 3. الشفافية والإفصاح </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يكون المحتوى الإعلاني واضحًا وصريحًا، ويجب أن يتم الإعلان عن أي شراكات تجارية أو تعويضات مالية بوضوح.
                  </p>
                  <p dir="rtl" style='font-size:15px;'> يُفترض أن يتم توضيح طبيعة الإعلان وأن يكون خاليًا من أي تلاعب أو خداع.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 4. الحقوق الملكية الفكرية </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب احترام حقوق الملكية الفكرية وعدم استخدام أو نشر أي محتوى محمي بحقوق الطبع والنشر دون الحصول على إذن مسبق من أصحاب الحقوق.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 5. الموافقة المسبقة </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب الحصول على موافقة الهيئة قبل نشر أي محتوى إعلاني قد يكون له تأثير كبير أو يتطلب تصاريح خاصة.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 6. الرقابة والتقارير </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن يكون هناك آلية لمراقبة المحتوى الإعلاني وتقديم تقارير عن أي انتهاكات أو مخالفات.
                  </p>
                  <p dir="rtl" style='font-size:15px;'>يمكن للهيئة طلب مراجعة أو تعديل المحتوى الإعلاني إذا لزم الأمر.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 7. التزام المعايير الإعلانية </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب أن تلتزم الإعلانات بالمعايير الفنية والإعلانية المعتمدة من الهيئة، مثل حجم الإعلانات والمحتوى المرئي والمسموع.
                  </p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold margin:10px 0; ' > 8. حماية البيانات الشخصية </h6>
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
      termsAndConditionsEn: `
        <div dir="ltr" align="left">
          <strong>
            <h5 style="width:fit-content; margin:10px auto 20px auto; font-weight:bold;font-size:18px">Advertising Terms and Conditions on Nemrah Website</h5>
          </strong>
          <table>
            <colgroup><col width="624"></colgroup>
            <tbody>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>1. Compliance with Laws and Regulations</h6>
                  <p dir="ltr" style='font-size:15px;'>Advertising content must comply with the applicable laws and regulations in the Kingdom, including the Audio-Visual Media Law.</p>
                  <p dir="ltr" style='font-size:15px;'>Adherence to commercial and promotional advertising laws is mandatory.</p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>2. Respect for Values and Culture</h6>
                  <p dir="ltr" style='font-size:15px;'>The advertising content must align with the religious, social, and cultural values of the Kingdom.</p>
                  <p dir="ltr" style='font-size:15px;'>It is prohibited to publish content that contradicts Islamic law or Saudi laws, such as controversial or inappropriate material.</p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>3. Transparency and Disclosure</h6>
                  <p dir="ltr" style='font-size:15px;'>The advertising content must be clear and explicit, and any commercial partnerships or financial compensations must be clearly disclosed.</p>
                  <p dir="ltr" style='font-size:15px;'>The nature of the advertisement should be clear, free from any manipulation or deceit.</p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>4. Intellectual Property Rights</h6>
                  <p dir="ltr" style='font-size:15px;'>Intellectual property rights must be respected, and no content protected by copyright can be used or published without prior permission from the rights holders.</p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>5. Prior Approval</h6>
                  <p dir="ltr" style='font-size:15px;'>Approval from the relevant authorities must be obtained before publishing any advertising content that may have significant impact or require special permits.</p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>6. Monitoring and Reporting</h6>
                  <p dir="ltr" style='font-size:15px;'>There must be a mechanism to monitor advertising content and report any violations or infringements.</p>
                  <p dir="ltr" style='font-size:15px;'>The authority may request a review or modification of the advertising content if necessary.</p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>7. Compliance with Advertising Standards</h6>
                  <p dir="ltr" style='font-size:15px;'>Advertisements must comply with the technical and advertising standards set by the authority, including the size of ads and audiovisual content.</p>
                </td>
              </tr>
              <tr style='margin-bottom:10px;'>
                <td dir="ltr">
                  <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0; '>8. Protection of Personal Data</h6>
                  <p dir="ltr" style='font-size:15px;'>Advertisements must comply with personal data protection laws and not use data unlawfully.</p>
                </td>
              </tr>
              <tr style='margin-top:30px;'>
                <td dir="ltr">
                  <p dir="ltr" style='font-size:15px;'>Companies and websites cooperate with the Audio-Visual Media Authority to ensure compliance with these conditions and avoid any legal or regulatory issues.</p>
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
      console.log('Checkbox Statu ==>', this.isCheckboxChecked)
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedImage = file
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
    },
  },
  beforeUpdate() {
    this.selectedPackageImage = this.$cookies.get('selectedPackageImage')
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
  padding: 1rem 0;
  .global_title {
    background-color: var(--deactive_button_bg);
    color: var(--main_theme_clr);
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-transform: capitalize;
    @media (max-width: 480px) {
      margin: 1rem auto;
    }
  }

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
      @media (max-width: 480px) {
        max-width: 90%;
        margin: 0 auto;
      }
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
    margin: 1.5rem auto;
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
