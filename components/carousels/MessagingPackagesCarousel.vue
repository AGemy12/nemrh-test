<template>
  <div class="messaging_packages_carousel_wrapper">
    <client-only>
      <swiper-carousel
        class="messaging_packages_carousel"
        :options="swiperOption"
        :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
      >
        <swiper-slide
          class="slide_wrapper"
          v-for="(item, index) in carouselItems"
          :key="item.id"
          :class="{ selected: selectedPackageId === item.id }"
        >
          <MessagingPackageCard
            :packageData="item"
            :isSelected="selectedPackageId === item.id"
            @click.native="selectPackage(item.id)"
            :discount-rate="
              item.id === 2
                ? 'خصم %30'
                : null || item.id === 3
                ? 'خصم %80'
                : null
            "
          />
        </swiper-slide>
      </swiper-carousel>
    </client-only>
    <div class="swiper-scrollbar"></div>
    <div class="terms_conditions">
      <input type="checkbox" id="termsCheckbox" @click="handleCheckBox" />
      <label>
        {{ $t('OTHERS.MessPackageCondAgree') }}
        <button type="button" @click.stop="toggleTermsAndConditionsModal">
          {{ $t('BUTTONS.termsAndConditions') }}
        </button></label
      >
    </div>
    <TextContentModal
      v-if="termsModalIsOpen"
      contentIsHtml
      :modalIsOpen="termsModalIsOpen"
      :modalTitle="$t('TITLES.StaticContentPages.messagesCompainesHelper')"
      :modalBody="
        $i18n.locale === 'ar' ? termsAndConditionsAr : termsAndConditionsEn
      "
      :modalBtnText="$t('BUTTONS.agree')"
      @toggleModal="toggleTermsAndConditionsModal"
      @fireConfirmClick="agreeToTermsAndConditions"
    />
    <div class="next_step_content">
      <base-button
        :btnText="$t('BUTTONS.next')"
        styleType="primary_btn"
        :disabled="!isCheckboxChecked || !selectedPackageId"
        @fireClick="cardRoute"
      />
    </div>
  </div>
</template>

<script>
import MessagingPackageCard from '@/components/ui/cards/packages/MessagesPackageCard.vue'
import { mapGetters } from 'vuex'
import TextContentModal from '../modals/general/TextContentModal.vue'

export default {
  name: 'MessagingPackagesCarousel',

  components: {
    MessagingPackageCard,
    TextContentModal,
  },

  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      swiperOption: {
        grabCursor: true,
        loop: false,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },
        spaceBetween: 15,
        breakpoints: {
          480: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
          1920: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      },
      selectedPackageId: null,
      termsModalIsOpen: false,
      isCheckboxChecked: false,
      termsAndConditionsAr: `
        <div dir="rtl" align="left">
          <table>
            <tbody>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 1.  مدة صلاحية الباقة: </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب استخدام الباقة خلال الفترة المحددة للاشتراك. بعد انتهاء الفترة، سيتم إلغاء أي رسائل غير مستخدمة ولن يتم ترحيلها إلى الفترة التالية.
                  </p>
                  </p>
                </td>
              </tr>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 2. المسؤولية عن الاستخدام: </h6>
                  <p dir="rtl" style='font-size:15px;'>إذا قام المستخدم بإرسال جميع الرسائل دفعة واحدة، فإن الموقع غير مسؤول عن أي مشاكل قد تحدث نتيجة لذلك، وتقع المسؤولية كاملة على المستخدم لضمان إرسال الرسائل بشكل صحيح.
                  </p>
                </td>
              </tr>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 3. الرسائل غير المرسلة: </h6>
                  <p dir="rtl" style='font-size:15px;'>في حال واجه المستخدم مشكلة في إرسال الرسائل نتيجة لخطأ في بيانات الاتصال أو أي خطأ تقني ناتج عن المستخدم، فإن الموقع غير ملزم بتعويض الرسائل غير المرسلة.
                  </p>
                </td>
              </tr>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 4. التحقق من البيانات: </h6>
                  <p dir="rtl" style='font-size:15px;'> تقع على عاتق المستخدم مسؤولية التأكد من صحة أرقام الهواتف أو العناوين البريدية التي يتم إرسال الرسائل إليها. الموقع غير مسؤول عن أي رسائل تُرسل إلى أرقام أو عناوين خاطئة.
                  </p>
                </td>
              </tr>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 5. السياسة المتعلقة بالاسترداد: </h6>
                  <p dir="rtl" style='font-size:15px;'>لا يمكن استرداد قيمة الباقة بعد بدء استخدامها، حتى لو لم يتم استخدام كافة الرسائل.
                  </p>
                </td>
              </tr>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 6. التحديثات التقنية: </h6>
                  <p dir="rtl" style='font-size:15px;'> يحق للموقع إجراء تحديثات أو تحسينات على النظام في أي وقت، وقد يتطلب ذلك انقطاعًا مؤقتًا في الخدمة. سيتم إعلام المستخدمين في حال حدوث أي انقطاع.
                  </p>
                </td>
              </tr>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 7. الاستخدام القانوني: </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب استخدام الباقة في إطار القوانين المعمول بها، وأي استخدام غير قانوني للرسائل قد يؤدي إلى إيقاف الخدمة دون إشعار مسبق.
                  </p>
                </td>
              </tr>
              <tr style='margin:10px 0;'>
                <td dir="ltr">
                  <h6 dir="rtl" style='font-size:16px; font-weight:bold; margin:10px 0; ' > 8.  التحذيرات الأمنية: </h6>
                  <p dir="rtl" style='font-size:15px;'>يجب على المستخدم التأكد من حماية حسابه وتغيير كلمات المرور بانتظام لضمان عدم إساءة استخدام الباقة.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        `,
      termsAndConditionsEn: `
      <div dir="ltr" align="left">
        <table>
          <tbody>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>1. Package Validity Period:</h6>
                <p dir="ltr" style='font-size:15px;'>The package must be used within the specified subscription period. Unused messages will be canceled after the period ends and will not be carried over to the next period.</p>
              </td>
            </tr>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>2. Responsibility for Usage:</h6>
                <p dir="ltr" style='font-size:15px;'>If the user sends all messages at once, the website is not responsible for any issues that arise, and it is the user's responsibility to ensure proper message delivery.</p>
              </td>
            </tr>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>3. Unsent Messages:</h6>
                <p dir="ltr" style='font-size:15px;'>If the user encounters an issue sending messages due to incorrect contact details or a technical error caused by the user, the website is not obligated to compensate for unsent messages.</p>
              </td>
            </tr>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>4. Data Verification:</h6>
                <p dir="ltr" style='font-size:15px;'>It is the user's responsibility to ensure the accuracy of phone numbers or email addresses to which messages are sent. The website is not responsible for messages sent to incorrect numbers or addresses.</p>
              </td>
            </tr>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>5. Refund Policy:</h6>
                <p dir="ltr" style='font-size:15px;'>The package value cannot be refunded after it has been used, even if not all messages have been sent.</p>
              </td>
            </tr>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>6. Technical Updates:</h6>
                <p dir="ltr" style='font-size:15px;'>The website reserves the right to make system updates or improvements at any time, which may require temporary service interruptions. Users will be notified of any disruptions.</p>
              </td>
            </tr>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>7. Legal Use:</h6>
                <p dir="ltr" style='font-size:15px;'>The package must be used within the framework of applicable laws, and any illegal use of messages may result in service suspension without prior notice.</p>
              </td>
            </tr>
            <tr style='margin:10px 0;'>
              <td dir="ltr">
                <h6 dir="ltr" style='font-size:16px; font-weight:bold; margin:10px 0;>8. Security Warnings:</h6>
                <p dir="ltr" style='font-size:15px;'>Users must ensure the security of their account and regularly change passwords to prevent misuse of the package.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      `,
    }
  },
  computed: {
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
    }),
  },
  methods: {
    // Start:: Card Route Based On User Authentication Status
    cardRoute() {
      const packageId = this.selectedPackageId
      console.log('Navigating to:', packageId) // للتحقق

      if (this.userIsLoggedIn && packageId) {
        this.$router.push({
          path: this.localePath(`/checkout/${packageId}`),
          query: { subscription_type: 'messaging_subscription' },
        })
      } else {
        this.$router.push(this.localePath('/auth/login'))
      }
    },

    // End:: Card Route Based On User Authentication Status
    selectPackage(packageId) {
      this.selectedPackageId = packageId
    },

    handleCheckBox() {
      this.isCheckboxChecked = !this.isCheckboxChecked
    },

    toggleTermsAndConditionsModal() {
      this.termsModalIsOpen = !this.termsModalIsOpen
    },
    agreeToTermsAndConditions() {
      this.termsAgreement = true
      this.toggleTermsAndConditionsModal()
    },

    resetData() {
      this.isCheckboxChecked = false // إعادة تعيين حالة الـ Checkbox
      this.selectedPackageId = null // إعادة تعيين حزمة الباقة المختارة
    },
  },
  mounted() {
    this.resetData()
  },
  watch: {
    $route() {
      this.isCheckboxChecked = false // إعادة تعيين حالة الـ Checkbox عند تغيير المسار
    },
  },
}
</script>

<style lang="scss">
@import '/node_modules/swiper/components/scrollbar/scrollbar.scss';

.messaging_packages_carousel_wrapper {
  width: 100%;
  position: relative;
  padding-inline: 20px;
  overflow: hidden;
  .swiper-scrollbar {
    margin-top: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 7px;
  }
  .swiper-scrollbar-drag {
    background-color: var(--main_theme_clr);
  }
  .messaging_packages_carousel {
    margin-bottom: 30px;
  }
  @include media(md) {
    padding-block: $section_block_padding * 0.3;
    padding-inline: 10px;
  }
  .terms_conditions {
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
  .next_step_content {
    @include flex(flex-end, center);
    .primary_btn {
      justify-content: flex-end;
    }
  }
}
</style>
