<template>
  <div class="companies_table_wrapper">
    <v-data-table
      class="companies_table"
      :loading="isLoading"
      :loading-text="$t('TABLES.loadingData')"
      :headers="headers"
      :items="companies"
      :items-per-page="-1"
      :hide-default-footer="true"
      v-model="selectedCompanies"
      show-select
    >
      <!-- Start:: No Data State -->
      <template v-slot:no-data>
        {{ $t('TABLES.NoData') }}
      </template>
      <!-- Start:: No Data State -->

      <!-- Start:: Company Logo & Name -->
      <template v-slot:[`item.title`]="{ item }">
        <nuxt-link
          class="company_details_wrapper"
          :to="localePath(`/companies/${item.id}`)"
        >
          <img
            class="object-fit-contain"
            v-lazy="item.image"
            width="50"
            height="50"
            :alt="item.title"
            loading="lazy"
          />
          <span> {{ item.title }} </span>
        </nuxt-link>
      </template>
      <!-- End:: Company Logo & Name -->

      <!-- Start:: Company Whatsapp Number -->
      <template v-slot:[`item.phone`]="{ item }">
        <div class="whatsapp_number_wrapper">
          <span v-if="item.has_copied_phone">
            <i class="fa-solid fa-check-double"></i>
            {{ $t('BUTTONS.copied') }}
          </span>

          <button
            @click="
              copyToClipboard(item, {
                modalImage: require('@/assets/media/images/subscribe.svg'),
                modalTitle: $t('TITLES.Modals.youReachedCopyLimit'),
                modalBtnText: $t('BUTTONS.ok'),
              })
            "
            :disabled="isWaitingApiCopyNumberResponse"
          >
            <img
              src="@/assets/media/icons/ui_icons/copy.svg"
              width="22"
              height="22"
              alt="copy"
              loading="lazy"
            />
          </button>
          <p dir="ltr">{{ item.phone }}</p>
          <!-- <p dir="ltr"> {{ item.phone.replace(item.phone.slice(-4), '****') }} </p> -->
        </div>
      </template>
      <!-- End:: Company Whatsapp Number -->

      <!-- Start:: Create Campaign -->
      <template v-slot:[`item.campaign`]="{ item }">
        <nuxt-link
          class="create_campaign_route"
          :to="createCampaignRoute(item.id)"
        >
          {{ $t('BUTTONS.advertiseYourCompany') }}
        </nuxt-link>
      </template>
      <!-- End:: Create Campaign -->
    </v-data-table>

    <!-- Start:: Start Campaign Modal -->
    <div
      class="mt-5 py-2 d-flex justify-content-end align-items-center flex-wrap"
      v-if="userIsLoggedIn"
    >
      <button
        type="button"
        class="messages_compains_info mx-3 d-flex align-items-center"
        @click.stop="toggleTermsAndConditionsModal"
      >
        <i class="fa-solid fa-circle-info"></i>
      </button>

      <base-button
        class="mx-3 select_companies"
        :btnText="$t('BUTTONS.selectCompanies')"
        @fireClick="SendSelectedCategoryToModal"
      />

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

      <base-button
        class="mx-3"
        :btnText="$t('BUTTONS.startCampaign')"
        styleType="primary_btn"
        :disabled="selectedCompanies.length === 0"
        @fireClick="startCampaignModalIsOpen = !startCampaignModalIsOpen"
      />
    </div>

    <StartCampaignModal
      v-if="startCampaignModalIsOpen"
      :modalIsOpen="startCampaignModalIsOpen"
      :modalBtnText="$t('BUTTONS.startCampaign')"
      :compaignDetailsText="compaignDetails"
      :selectedCompaniesToSendMessage="selectedCompanies"
      :selectedCategorieId="selectedCategorieId"
      @toggleModal="startCampaignModalIsOpen = !startCampaignModalIsOpen"
      @onResponseSuccess="ScanQrModelIsOpen = !ScanQrModelIsOpen"
    />

    <ScanWhatsappQrCode
      :modalIsOpen="ScanQrModelIsOpen"
      @toggleModal="ScanQrModelIsOpen = !ScanQrModelIsOpen"
      @onScanningSuccess="OpenConfirnmationModalToSendMessages"
    />

    <ConfirmationModal
      v-if="confirmationModalIsOpen"
      :modalIsOpen="confirmationModalIsOpen"
    >
      <template v-slot>
        <img
          src="@/assets/media/images/sent_successfully.svg"
          width="150"
          height="150"
          alt="confirmation"
          loading="lazy"
        />

        <h4>
          {{ $t('TITLES.Modals.compaginStartSuccessfully') }}
        </h4>

        <base-button
          class="w-100"
          styleType="primary_btn"
          :btnText="$t('BUTTONS.back')"
          @fireClick="confirmationModalIsOpen = false"
        />
      </template>
    </ConfirmationModal>
    <!-- End:: Start Campaign Modal -->

    <!-- Start:: Pagination -->
    <BasePagination
      v-if="paginations.last_page > 1"
      v-model="paginations.current_page"
      :length="paginations.last_page"
      :visibleTabs="6"
      @input="updateRouterQueryParam($event)"
    />
    <!-- End:: Pagination -->

    <!-- Start:: Action Message Modal -->
    <ActionMessageModal
      v-if="actionMessageModalIsOpen && actionMessageModalContent"
      :modalIsOpen="actionMessageModalIsOpen"
      :modalImage="actionMessageModalContent.modalImage"
      :modalTitle="actionMessageModalContent.modalTitle"
      :modalBtnText="actionMessageModalContent.modalBtnText"
      @toggleModal="actionMessageModalIsOpen = !actionMessageModalIsOpen"
    />
    <!-- End:: Action Message Modal -->
  </div>
</template>

<script>
import { state, restartSocket } from '@/src/socket'
import { mapGetters } from 'vuex'
import BasePagination from '@/components/ui/BasePagination.vue'
import ActionMessageModal from '@/components/modals/general/ActionMessageModal.vue'
import ConfirmationModal from '@/components/modals/general/ConfirmationModal.vue'
import AddWhatsappNumber from '@/components/modals/addWhatsappNumber/AddWhatsappNumber.vue'
import ScanWhatsappQrCode from '~/components/modals/addWhatsappNumber/ScanWhatsappQrCode.vue'
import StartCampaignModal from '@/components/modals/companies/StartCompaginModal.vue'
import TextContentModal from '../modals/general/TextContentModal.vue'

export default {
  name: 'CompaniesTable',

  emits: ['onCopyToClipboard'],

  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    companies: {
      type: Array,
      required: true,
    },
    compaignDetails: {
      type: Object,
      required: false,
    },
    userAvailableCopiesCount: {
      type: Number,
      required: true,
    },
    userIsSubscribedInMessagingPackage: {
      type: Boolean,
      required: true,
    },
    paginations: {
      type: Object,
      required: true,
    },
  },

  components: {
    StartCampaignModal,
    BasePagination,
    ActionMessageModal,
    ConfirmationModal,
    AddWhatsappNumber,
    ScanWhatsappQrCode,
    TextContentModal,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      isWaitingApiCopyNumberResponse: false,
      // End:: Loaders Controlling Data

      termsModalIsOpen: false,

      termsAndConditionsAr: `
        <div dir="rtl" align="left">
          <strong>
          <table><colgroup><col width="624"></colgroup>
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
        <p>&nbsp;</p>
        `,
      termsAndConditionsEn: `
      <div dir="ltr" align="left">
  <strong>
    <table>
      <colgroup><col width="624"></colgroup>
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
  </strong>
</div>

      `,

      // Start:: Selected Items Data
      selectedCompanies: [],
      selectedCategorieId: null,
      // End:: Selected Items Data

      // Start:: Dialogs Control Data
      addWhatsNumberModalIsOpen: false,
      ScanQrModelIsOpen: false,
      startCampaignModalIsOpen: false,
      actionMessageModalIsOpen: false,
      confirmationModalIsOpen: false,
      confirmationModalTitle: null,
      // End:: Dialogs Control Data

      // Start:: Action Message Modal Content Based On User Status
      actionMessageModalContent: null,
      // End:: Action Message Modal Content Based On User Status

      // Start:: Tickets Table Data
      headers: [
        {
          text: this.$t('TABLES.companyName'),
          align: 'center',
          value: 'title',
          width: 180,
          sortable: false,
        },
        {
          text: this.$t('TABLES.service'),
          align: 'center',
          value: 'main_service',
          width: 180,
          sortable: false,
        },
        {
          text: this.$t('TABLES.whatsapp'),
          align: 'center',
          value: 'phone',
          width: 140,
          sortable: false,
        },
        {
          text: this.$t('TABLES.campaign'),
          align: 'center',
          value: 'campaign',
          width: 80,
          sortable: false,
        },
      ],
      // End:: Tickets Table Data
    }
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
    }),
    // End:: Vuex Getters

    // Start:: Create Campaign Route Based On User Authentication Status
    createCampaignRoute() {
      return (companyId) =>
        this.userIsLoggedIn
          ? this.localePath(`/advertisements-subscriptions/${companyId}`)
          : this.localePath('/auth/login')
    },
    // End:: Create Campaign Route Based On User Authentication Status

    // Start:: Ready To Send Messages
    readyToSendMessages() {
      return state.readyToSendMessages
    },
    // End:: Ready To Send Messages
  },

  methods: {
    toggleTermsAndConditionsModal() {
      this.termsModalIsOpen = !this.termsModalIsOpen
    },
    agreeToTermsAndConditions() {
      this.termsAgreement = true
      this.toggleTermsAndConditionsModal()
    },

    // Start:: Handel Pagination Query Params
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      })
    },
    // End:: Handel Pagination Query Params

    startCampaginModel() {
      this.startCampaignModalIsOpen = !this.startCampaignModalIsOpen
      restartSocket()
    },

    // Start:: Handel Copy To Clipboard
    async copyToClipboard(itemIdToCopy, modalContent) {
      if (this.userIsLoggedIn) {
        if (
          this.userAvailableCopiesCount > 0 ||
          itemIdToCopy.has_copied_phone
        ) {
          this.isWaitingApiCopyNumberResponse = true

          // Start:: Append Request Data
          const REQUEST_DATA = new FormData()
          REQUEST_DATA.append('company_id', itemIdToCopy.id)
          // Start:: Append Request Data

          try {
            // ********** Start:: Implement Request ********** //
            let res = await this.$axiosRequest({
              method: 'POST',
              url: 'messages/copy-phone',
              data: REQUEST_DATA,
            })
            this.isWaitingApiCopyNumberResponse = false
            this.$izitoast.success({
              message: this.$t('MESSAGES.numberCopied'),
            })
            if (navigator.clipboard && window.isSecureContext) {
              await navigator.clipboard.writeText(res.data.data.phone)
            } else {
              const input = document.createElement('input')
              input.value = res.data.data.phone
              input.style.position = 'absolute'
              input.style.left = '-999999px'
              document.body.prepend(input)
              input.select()
              document.execCommand('copy')
              document.body.removeChild(input)
            }
            let selectedCompany = this.companies.find(
              (company) => company.id === itemIdToCopy.id
            )
            selectedCompany.has_copied_phone = true
            this.$emit('onCopyToClipboard')
            // ********** End:: Implement Request ********** //
          } catch (err) {
            this.isWaitingApiCopyNumberResponse = false
            this.$izitoast.error({
              message: err.response.data.message,
            })
          }
        } else {
          this.actionMessageModalContent = modalContent
          this.actionMessageModalIsOpen = !this.actionMessageModalIsOpen
        }
      } else {
        this.$router.push(this.localePath('/auth/login'))
      }
    },
    // End:: Handel Copy To Clipboard

    // Start:: Handel Modal Toggling
    handelModalToggle(modalContent = null) {
      if (this.userIsSubscribedInMessagingPackage) {
        this.startCampaignModalIsOpen = !this.startCampaignModalIsOpen
      } else if (modalContent) {
        this.actionMessageModalContent = modalContent
        this.actionMessageModalIsOpen = !this.actionMessageModalIsOpen
      }
    },
    // End:: Handel Modal Toggling

    // Start:: Handel Action Message Modal Toggling
    handelQrCodeModalToggle() {
      this.ScanQrModelIsOpen = !this.ScanQrModelIsOpen
    },
    // End:: Handel Action Message Modal Toggling

    OpenConfirnmationModalToSendMessages() {
      this.confirmationModalIsOpen = !this.confirmationModalIsOpen
    },

    SendSelectedCategoryToModal() {
      this.selectedCategorieId = this.$route.query.filter_category
      this.startCampaignModalIsOpen = !this.startCampaignModalIsOpe
    },
  },
}
</script>

<style lang="scss">
.companies_table_wrapper {
  padding-block: 1.5rem;
  padding-inline: 0.4rem;

  .companies_table {
    margin-top: 1rem;
    background-color: transparent !important;
    border-radius: 8px;
    border: 1px solid var(--light_border_clr);
    overflow: hidden;

    .v-data-table__wrapper {
      table {
        th,
        tr {
          text-align: center !important;
          td {
            font-size: 0.9rem !important;
            text-align: center !important;
          }
        }

        .v-data-table-header {
          background-color: var(--main_theme_clr);

          th,
          td {
            color: var(--white);
            padding-block: 0.8rem;

            .v-data-table__checkbox {
              .v-input--selection-controls__input {
                .v-icon {
                  color: var(--white);
                }
              }
            }
          }
        }

        tr {
          td {
            padding-block: 0.8rem;
            font-family: $semi_bold_font;
            font-size: 3rem;

            .v-data-table__checkbox {
              .v-input--selection-controls__input {
                .v-icon {
                  color: var(--main_theme_clr);
                }
              }
            }

            .company_details_wrapper {
              @include flex(flex-start, center);
              column-gap: 0.5rem;
              max-width: 100%;
              @include textEllipsis;

              img {
                border-radius: 12px;
              }

              span {
                text-decoration: underline;
                text-underline-offset: 0.1rem;
                font-family: $semi_bold_font;
                color: var(--theme_text_clr);
              }
            }

            .whatsapp_number_wrapper {
              @include flex(center, center);
              column-gap: 0.8rem;
              font-family: $semi_bold_font;
              span {
                @include flex(center, center);
                column-gap: 0.3rem;
                color: var(--mid_green);
                font-family: $semi_bold_font;
                font-size: 0.8rem;
              }
              button {
                @include flex(center, center);
                color: var(--main_theme_clr);
                font-family: $semi_bold_font;
              }
            }
            .modal_title {
              font-size: 16px;
            }
            .create_campaign_route {
              @include primaryBtnStyle;
              min-width: max-content;
              padding: 0.4rem 0.8rem;
              font-size: 0.85rem;
            }
          }
        }
      }
    }
  }

  .select_companies {
    @include primaryBtnStyle;
    font-size: 1rem;
    width: max-content;
    border: 1px solid transparent;
    background-image: linear-gradient(90deg, transparent 50%, var(--white) 50%);
    color: var(--main_theme_clr);
    font-family: $semi_bold_font;
    &:hover {
      background-image: linear-gradient(
        90deg,
        transparent 50%,
        var(--white) 50%
      );
    }
  }
  @include media(md) {
    .companies_table {
      .v-data-table__wrapper {
        table {
          th,
          tr {
            td {
              display: flex;
              flex-wrap: wrap;
              row-gap: 0.8rem;
            }
          }
        }
      }
    }
  }
}
.messages_compains_info {
  svg {
    color: var(--main_theme_clr);
    font-size: 25px;
  }
}
</style>
