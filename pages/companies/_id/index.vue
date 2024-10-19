<template>
  <section class="company_profile_page_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <!-- ========= Start:: Company Details ========= -->
      <div class="company_details_wrapper">
        <div class="container" data-aos="fade-left">
          <div class="wrapper">
            <div class="company_info_wrapper">
              <div class="logo_wrapper">
                <img
                  class="company_logo"
                  v-lazy="companyProfileData.image"
                  :alt="companyProfileData.title"
                  width="100"
                  height="100"
                  loading="lazy"
                />
              </div>

              <div class="company_details">
                <div class="name_and_rate_wrapper">
                  <h1>{{ companyProfileData.title }}</h1>
                  <div class="rate">
                    ({{ companyProfileData.rate }})
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
                <p>{{ companyProfileData.main_service }}</p>
              </div>
            </div>

            <div class="company_action_btns">
              <a
                class="start_campaign_route report_btn"
                :href="`mailto:info@nemra.com?subject=إبلاغ عن ${companyProfileData.title}`"
              >
                {{ $t('BUTTONS.Report') }}
              </a>
              <nuxt-link
                class="start_campaign_route"
                :to="createCampaignRoute(companyProfileData.id)"
              >
                {{ $t('BUTTONS.advertiseYourCompany') }}
              </nuxt-link>

              <BaseDropdown
                v-if="userIsLoggedIn"
                dropdownClass="company_actions"
                :title="$t('BUTTONS.actions')"
                :items="dropdownItems"
                class="dropDown_btn"
              />

              <DeleteCompanyModal
                v-if="deleteCompanyModalIsOpen"
                :modalIsOpen="deleteCompanyModalIsOpen"
                :modalTitle="
                  $t('TITLES.Modals.deleteCompany', {
                    companyName: companyProfileData.title,
                  })
                "
                :companyId="companyProfileData.id"
                @toggleModal="
                  deleteCompanyModalIsOpen = !deleteCompanyModalIsOpen
                "
                @onResponseSuccess="
                  confirmationModalIsOpen = true
                  confirmationModalTitle = $t(
                    'TITLES.Modals.deleteRequestSentSuccessfully'
                  )
                "
              />
              <EditCompanyModal
                v-if="companyProfileData?.id"
                :modalIsOpen="editCompanyModalIsOpen"
                :modalTitle="
                  $t('TITLES.Modals.editCompany', {
                    companyName: companyProfileData.title,
                  })
                "
                :companyId="companyProfileData.id"
                :companyDetailsData="companyProfileData"
                @toggleModal="editCompanyModalIsOpen = !editCompanyModalIsOpen"
                @onResponseSuccess="
                  confirmationModalIsOpen = true
                  confirmationModalTitle = $t(
                    'TITLES.Modals.editRequestSentSuccessfully'
                  )
                "
              />
            </div>
          </div>

          <div class="wrapper my-8">
            <ul class="contact_info_wrapper">
              <li class="contact_item" v-if="companyProfileData.phone">
                <!-- <i class="fa-solid fa-phone-volume"></i> -->
                <!-- <span dir="ltr"> {{ companyProfileData.phone }} </span> -->

                <div class="whatsapp_number_wrapper">
                  <span v-if="companyProfileData.has_copied_phone">
                    <i class="fa-solid fa-check-double"></i>
                    {{ $t('BUTTONS.copied') }}
                  </span>

                  <button
                    @click="
                      copyToClipboard(companyProfileData, {
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
                      class="filter-white"
                    />
                    <!-- {{ $t('BUTTONS.copy') }} -->
                  </button>
                  <span dir="ltr"> {{ companyProfileData.phone }} </span>
                  <!-- <p dir="ltr"> {{ item.phone.replace(item.phone.slice(-4), '****') }} </p> -->
                </div>
              </li>

              <li class="contact_item" v-if="companyProfileData.email">
                <i class="fa-solid fa-envelope"></i>
                <span> {{ companyProfileData.email }} </span>
              </li>

              <li class="contact_item" v-if="companyProfileData.location">
                <i class="fa-solid fa-location-dot"></i>
                <span> {{ companyProfileData.location }} </span>
              </li>
            </ul>

            <ul class="social_media_wrapper">
              <li
                class="social_item"
                v-for="item in companyProfileData.socials"
                :key="item.id"
              >
                <a :href="item.link" target="_blank">
                  <img
                    :src="item.image"
                    width="25"
                    height="25"
                    :alt="item.title"
                    loading="lazy"
                  />
                </a>
              </li>

              <li class="social_item" v-if="companyProfileData.link">
                <a
                  :href="
                    companyProfileData.link.startsWith('http')
                      ? companyProfileData.link
                      : 'http://' + companyProfileData.link
                  "
                  target="_blank"
                  external
                >
                  <i class="fa-solid fa-globe"></i>
                </a>
              </li>
            </ul>
          </div>

          <p class="company_desc">{{ companyProfileData.desc }}</p>
        </div>
      </div>
      <!-- ========= End:: Company Details ========= -->

      <div class="container">
        <!-- ========= Start:: Clients Comments ========= -->
        <div class="company_rates_wrapper">
          <div class="section_title_wrapper">
            <h2>
              {{
                $t('TITLES.Companies.companyRates', {
                  companyName: companyProfileData.title,
                })
              }}
            </h2>

            <base-button
              v-if="userIsLoggedIn"
              :btnText="$t('BUTTONS.writeComment')"
              styleType="primary_btn"
              @fireClick="rateModalIsOpen = !rateModalIsOpen"
            />

            <SendRateModal
              v-if="rateModalIsOpen"
              :modalIsOpen="rateModalIsOpen"
              :modalTitle="
                $t('TITLES.Modals.rateCompany', {
                  companyName: companyProfileData.title,
                })
              "
              :companyId="companyProfileData.id"
              @toggleModal="rateModalIsOpen = !rateModalIsOpen"
              @onResponseSuccess="
                confirmationModalIsOpen = true
                confirmationModalTitle = $t(
                  'TITLES.Modals.commentSentSuccessfully'
                )
              "
            />
          </div>

          <EmptyMessage
            v-if="!ratesData.length"
            class="mt-8"
            :imageUrl="require('@/assets/media/empty_messages/empty_rates.svg')"
            :messageText="$t('TITLES.EmptyContent.emptyRates')"
          />

          <template v-else>
            <template v-if="isWaitingRatesData">
              <div class="skelton_loader_card" v-for="item in 3" :key="item">
                <v-skeleton-loader type="table-heading, list-item-two-line" />
              </div>
            </template>

            <ul class="clients_comments_wrapper" v-else>
              <li
                v-for="(item, index) in ratesData"
                :key="item.id"
                class="client_comment"
                data-aos="zoom-in"
                data-aos-duration="1000"
                :data-aos-delay="index * 100"
              >
                <div class="client_info_and_rate_wrapper">
                  <div class="wrapper">
                    <img
                      class="rounded-circle"
                      src="@/assets/media/images/avatar.svg"
                      width="45"
                      height="45"
                      :alt="item.user.full_name"
                      loading="lazy"
                    />
                    <h4>{{ item.user.full_name }}</h4>
                  </div>

                  <RatingPreview :rate="item.rate" size="14" />
                </div>

                <p class="comment_body">{{ item.comment }}</p>
              </li>
            </ul>

            <BasePagination
              v-if="paginations.last_page > 1"
              v-model="paginations.current_page"
              :length="paginations.last_page"
              :visibleTabs="6"
              @input="getPaginatedRates($event)"
            />
          </template>
        </div>
        <!-- ========= End:: Clients Comments ========= -->

        <!-- ========= Start:: Page Banner ========= -->
        <div class="container">
          <BaseBanner
            v-if="bannerData"
            data-aos="fade-right"
            :bannerData="bannerData"
          />
        </div>
        <!-- ========= End:: Page Banner ========= -->
      </div>

      <!-- ========= Start:: Confirmation Modal ========= -->
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

          <h4 v-if="confirmationModalTitle">
            {{ confirmationModalTitle }}
            <!-- {{ $t("TITLES.Modals.commentSentSuccessfully") }} -->
          </h4>

          <base-button
            class="w-100"
            styleType="primary_btn"
            :btnText="$t('BUTTONS.back')"
            @fireClick="confirmationModalIsOpen = false"
          />
        </template>
      </ConfirmationModal>
      <!-- ========= End:: Confirmation Modal ========= -->

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
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import MainLoader from '@/components/ui/MainLoader.vue'
import BaseBanner from '@/components/banners/BaseBanner.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import EmptyMessage from '@/components/ui/EmptyMessage.vue'
import RatingPreview from '@/components/ui/RatingPreview.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import SendRateModal from '@/components/modals/rates/SendRateModal.vue'
import DeleteCompanyModal from '@/components/modals/companies/DeleteCompanyModal.vue'
import EditCompanyModal from '@/components/modals/companies/EditCompanyModal.vue'
import ConfirmationModal from '@/components/modals/general/ConfirmationModal.vue'
import ActionMessageModal from '@/components/modals/general/ActionMessageModal.vue'

export default {
  name: 'CompanyProfile',

  emits: ['onCopyToClipboard'],

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.companyProfileData.title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.companyProfileData.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.companyProfileData.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.companyProfileData.desc,
        },
      ],
    }
  },

  components: {
    MainLoader,
    BaseBanner,
    BaseDropdown,
    EmptyMessage,
    RatingPreview,
    BasePagination,
    SendRateModal,
    DeleteCompanyModal,
    EditCompanyModal,
    ConfirmationModal,
    ActionMessageModal,
  },

  async asyncData({ $axiosRequest, params }) {
    const [companyProfileRes, ratesRes] = await Promise.all([
      $axiosRequest.get(`companies/${params.id}`),
      $axiosRequest.get(`company/${params.id}/reviews`),
    ])

    console.log('Company Profile Data:', companyProfileRes.data.data.id)

    return {
      companyProfileData: companyProfileRes.data.data,
      bannerData: companyProfileRes.data.additional_data.bottom_banner_content,
      ratesData: ratesRes.data.data,
    }
  },
  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      isWaitingRatesData: false,
      isWaitingApiCopyNumberResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Companies Data
      userAvailableCopiesCount: 0,
      // End:: Companies Data

      // Start:: Dialogs Control Data
      deleteCompanyModalIsOpen: false,
      editCompanyModalIsOpen: false,
      rateModalIsOpen: false,
      confirmationModalIsOpen: false,
      confirmationModalTitle: null,
      actionMessageModalIsOpen: false,
      // End:: Dialogs Control Data

      // Start:: Action Message Modal Content Based On User Status
      actionMessageModalContent: null,
      // End:: Action Message Modal Content Based On User Status

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data
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

    // Start:: Company Actions Dropdown Items
    dropdownItems() {
      return [
        {
          id: 'edit_comp',
          title: this.$t('BUTTONS.editCompany'),
          methodToFire: () => (this.editCompanyModalIsOpen = true),
        },
        {
          id: 'delete_comp',
          title: this.$t('BUTTONS.deleteCompany'),
          methodToFire: () => (this.deleteCompanyModalIsOpen = true),
        },
      ]
    },
    // End:: Company Actions Dropdown Items
  },

  methods: {
    // Start:: Get Paginated Rates Data
    async getPaginatedRates(page) {
      this.isWaitingRatesData = true
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: `company/${this.$route.params.id}/reviews`,
          params: {
            page,
          },
        })
        // ********** End:: Implement Request ********** //
        this.isWaitingRatesData = false
        this.ratesData = res.data.data
        this.paginations.current_page = res.data.meta.current_page
        this.paginations.last_page = res.data.meta.last_page
        this.paginations.items_per_page = res.data.meta.per_page
      } catch (err) {
        this.isWaitingRatesData = false
        console.log(err.response.data.message)
      }
    },
    // End:: Get Paginated Rates Data

    // Start:: Handel Copy To Clipboard
    async copyToClipboard(itemToCopy, modalContent) {
      if (this.userIsLoggedIn) {
        if (this.userAvailableCopiesCount > 0 || itemToCopy.has_copied_phone) {
          this.isWaitingApiCopyNumberResponse = true

          // Start:: Append Request Data
          const REQUEST_DATA = new FormData()
          REQUEST_DATA.append('company_id', itemToCopy.id)
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
            // let selectedCompany = this.companies.find(
            //   (company) => company.id === itemToCopy.id
            // )
            // selectedCompany.has_copied_phone = true
            // this.$emit('onCopyToClipboard')
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
  },

  mounted() {
    // Start:: Fire Methods
    if (this.companyProfileData) {
      this.pageIsLoading = !this.pageIsLoading
    }
    // End:: Fire Methods
  },
}
</script>

<style lang="scss">
.company_profile_page_wrapper {
  padding-block: 85px;
  .company_details_wrapper {
    background-color: var(--main_theme_clr);
    padding: 2rem;
    .wrapper {
      @include flex(space-between, flex-start);

      .company_info_wrapper {
        @include flex(flex-start, center);
        column-gap: 1rem;
        .logo_wrapper {
          padding: 0.3rem;
          @include simpleShadow;
          border-radius: 8px;
          .company_logo {
            border-radius: 8px;
            object-fit: contain;
          }
        }

        .company_details {
          .name_and_rate_wrapper {
            margin-block-end: 0.5rem;
            @include flex(flex-start, center);
            column-gap: 0.7rem;
            h1 {
              margin: 0;
              font-size: 1.5rem;
              font-family: $bold_font;
              color: var(--white);
            }
            .rate {
              color: var(--white);
              svg,
              i {
                color: var(--gold);
              }
            }
          }
          p {
            color: var(--white);
          }
        }
      }
      .company_action_btns {
        @include flex(flex-start, center);
        column-gap: 1rem;
        @media (max-width: 480px) {
          column-gap: 0.5rem;
          flex: 1 !important;
        }
        .start_campaign_route {
          @include borderedBtnStyle;
          padding: 6px 20px;
          border-color: var(--white);
          color: var(--white);
          &:hover {
            color: var(--white);
          }
          @media (max-width: 480px) {
            font-size: 12px;
            padding-left: 10px;
            padding-right: 10px;
            min-width: 100px;
          }
        }
      }
    }
    .contact_info_wrapper {
      @include flex(flex-start, center);
      column-gap: 1.5rem;
      .contact_item {
        @include flex(flex-start, center);
        column-gap: 0.7rem;
        color: var(--white);
        svg,
        i {
          font-size: 1.1rem;
        }
        img {
          object-fit: contain;
        }
      }
    }
    .social_media_wrapper {
      @include flex(center, center);
      column-gap: 1.1rem;
      .social_item {
        a {
          @include flex(center, center);
          svg,
          i {
            font-size: 1.4rem;
            color: var(--white);
          }
          img {
            object-fit: contain;
          }
        }
      }
    }
    .company_desc {
      font-size: 0.95rem;
      line-height: 2;
      color: var(--white);
    }
  }

  .company_rates_wrapper {
    margin-block: 2.5rem;
    padding-block: 1.3rem 2rem;
    padding-inline: 1.5rem;
    border: 1px solid var(--light_border_clr);
    border-radius: 8px;
    .section_title_wrapper {
      margin-block-end: 0.5rem;
      @include flex(space-between, center);

      h2 {
        margin: 0;
        font-family: $bold_font;
        font-size: 1.2rem;
      }
    }
    .skelton_loader_card {
      margin-block: 1.5rem;
      padding: 1.2rem 1.5rem;
      border: 1px solid var(--light_border_clr);
      border-radius: 8px;
      &:last-of-type {
        margin-block-end: 0;
      }
      .v-skeleton-loader {
        background-color: transparent;
        .v-skeleton-loader__table-heading {
          padding: 0;
          .v-skeleton-loader__bone {
            &.v-skeleton-loader__heading {
              @include size(50px, 50px);
              border-radius: 50%;
            }
            &.v-skeleton-loader__text {
              max-width: 150px;
            }
          }
        }
        .v-skeleton-loader__list-item-two-line {
          padding: 0;
        }
      }
    }

    .clients_comments_wrapper {
      .client_comment {
        margin-block: 1.5rem;
        padding: 1.2rem 1.5rem;
        background-color: #fbf9ff;
        border: 1px solid var(--light_border_clr);
        border-radius: 8px;
        &:last-of-type {
          margin-block-end: 0;
        }

        .client_info_and_rate_wrapper {
          @include flex(space-between, center);
          .wrapper {
            @include flex(flex-start, center);
            column-gap: 0.7rem;
            h4 {
              margin: 0;
              font-family: $bold_font;
              font-size: 1.1rem;
            }
          }
        }

        .comment_body {
          margin-block-start: 0.8rem !important;
          font-size: 0.9rem;
          color: var(--light_theme_text_clr);
        }
      }
    }
  }

  @include media(md) {
    padding-block: 0;
    margin-bottom: 40px;
    position: relative;
    top: 0px;
    .company_details_wrapper {
      padding: 1rem;
      .wrapper {
        justify-content: center;
        flex-wrap: wrap;
        row-gap: 2rem;
        align-items: center;
        .company_info_wrapper {
          order: 2;
          justify-content: center;
          .company_logo {
            @include size(80px, 80px);
          }

          .company_details {
            .name_and_rate_wrapper {
              h1 {
                font-size: 1.3rem;
              }
            }
            p {
              font-size: 0.9rem;
            }
          }
        }
        .company_action_btns {
          order: 1;
        }
      }
      .contact_info_wrapper {
        flex-wrap: wrap;
        justify-content: center;
        row-gap: 0.8rem;

        .contact_item {
          justify-content: center;
        }
      }
      .social_media_wrapper {
        justify-content: center;
      }
      .company_desc {
        margin-block-start: 2rem !important;
        text-align: justify;
      }
    }

    .container {
      @include flex(center, center, column);

      .wrapper {
        &:nth-of-type(2) {
          order: 3;
          margin-block-end: 0 !important;
        }
      }
    }

    .company_rates_wrapper {
      .section_title_wrapper {
        flex-wrap: wrap;
        justify-content: center;
        row-gap: 1rem;

        h2 {
          order: 2;
        }
      }

      .clients_comments_wrapper {
        .client_comment {
          .client_info_and_rate_wrapper {
            flex-direction: column;
            row-gap: 0.5rem;
          }

          .comment_body {
            text-align: center;
          }
        }
      }
    }
  }
}

.company_actions {
  top: 175px !important;
  @media (max-width: 767px) {
    top: 135px !important;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    top: 160px !important;
  }
}
.report_btn {
  border: none !important;
  min-width: 80px !important;
  background-color: var(--white) !important;
  color: var(--main_theme_clr) !important;
  font-weight: bold !important;
}
.dropdown_btn {
  @media (max-width: 480px) {
    min-width: 100px;

    padding-left: 10px;
    padding-right: 10px;
    min-width: 100px;
    span {
      font-size: 12px !important;
    }
  }
}
</style>
