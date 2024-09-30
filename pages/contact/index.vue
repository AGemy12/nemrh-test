<template>
  <section class="contact_us_wrapper">
    <MainLoader v-if="!contactData" />

    <template v-else>
      <div class="container">
        <!-- ========== Start:: Contact ========== -->
        <div class="contact_section">
          <!-- Start:: Contact Section Header -->
          <div class="contact_section_header_wrapper">
            <h1
              class="section_title"
              v-html="$t('TITLES.ContactUs.title')"
            ></h1>
            <p class="section_desc">
              {{ $t('TITLES.ContactUs.desc') }}
            </p>
          </div>
          <!-- End:: Contact Section Header -->

          <!-- Start:: Contact Info & Form -->
          <div class="contact_info_and_form_wrapper">
            <div class="row justify-content-between">
              <div class="col-lg-6">
                <div class="contact_info_wrapper">
                  <div class="wrapper">
                    <h3>{{ $t('TITLES.ContactUs.contactInfo') }}</h3>
                    <p>{{ $t('TITLES.ContactUs.leaveMessage') }}</p>

                    <div class="contacts">
                      <div
                        class="contact_info"
                        v-if="contactData.contact_info.phone"
                      >
                        <i class="fa-solid fa-phone-volume"></i>
                        <a
                          :href="`tel:${contactData.contact_info.phone}`"
                          class="contact_copy"
                          dir="ltr"
                        >
                          {{ contactData.contact_info.phone }}
                        </a>
                      </div>

                      <div
                        class="contact_info"
                        v-if="contactData.contact_info.email"
                      >
                        <i class="fa-solid fa-envelope"></i>
                        <a
                          :href="`mailto:${'demo@gmail.com'}`"
                          class="contact_copy"
                        >
                          {{ contactData.contact_info.email }}
                        </a>
                      </div>

                      <div
                        class="contact_info"
                        v-if="contactData.contact_info.location"
                      >
                        <i class="fa-solid fa-location-dot"></i>
                        <span class="contact_copy">
                          {{ contactData.contact_info.location }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul class="social_links">
                    <li
                      class="social_item"
                      v-if="contactData.socials.whatsapp_link"
                    >
                      <a
                        :href="contactData.socials.whatsapp_link"
                        target="_blank"
                        aria-label="whatsapp"
                      >
                        <i class="fab fa-whatsapp"></i>
                      </a>
                    </li>

                    <li class="social_item" v-if="contactData.socials.facebook">
                      <a
                        :href="contactData.socials.facebook"
                        target="_blank"
                        aria-label="facebook"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>

                    <li
                      class="social_item"
                      v-if="contactData.socials.instagram"
                    >
                      <a
                        :href="contactData.socials.instagram"
                        target="_blank"
                        aria-label="instagram"
                      >
                        <i class="fa-brands fa-instagram"></i>
                      </a>
                    </li>

                    <li class="social_item" v-if="contactData.socials.x">
                      <a
                        :href="contactData.socials.x"
                        target="_blank"
                        aria-label="twitter"
                      >
                        <i class="fa-brands fa-x-twitter"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-lg-6 py-8 px-5">
                <v-form
                  class="contact_form_wrapper"
                  ref="contactForm"
                  v-model="formIsValid"
                  @submit.prevent="submitForm"
                  lazy-validation
                >
                  <!-- Start:: Name Input -->
                  <base-input
                    type="text"
                    :placeholder="$t('FORMS.Placeholders.name') + '*'"
                    :validationRules="validationSchema.nameRules"
                    :serverSideErrorMessage="data.name.error"
                    @clearServerSideErrorMessage="data.name.error = null"
                    v-model.trim="data.name.value"
                    required
                  />
                  <!-- End:: Name Input -->

                  <!-- Start:: Email Input -->
                  <base-input
                    type="email"
                    :placeholder="$t('FORMS.Placeholders.email') + '*'"
                    :validationRules="validationSchema.emailRules"
                    :serverSideErrorMessage="data.email.error"
                    @clearServerSideErrorMessage="data.email.error = null"
                    v-model.trim="data.email.value"
                    required
                  />
                  <!-- End:: Email Input -->

                  <!-- Start:: Phone Number Input -->
                  <base-input
                    type="tel"
                    :placeholder="$t('FORMS.Placeholders.phone') + '*'"
                    staticPlaceholder="9665xxxxxxx"
                    :validationRules="validationSchema.phoneRules"
                    :serverSideErrorMessage="data.phone.error"
                    @clearServerSideErrorMessage="data.phone.error = null"
                    v-model.trim="data.phone.value"
                    required
                  />
                  <!-- End:: Phone Number Input -->

                  <!-- Start:: Message Input -->
                  <base-input
                    type="textarea"
                    rows="7"
                    :placeholder="$t('FORMS.Placeholders.message') + '*'"
                    :validationRules="validationSchema.messageRules"
                    :serverSideErrorMessage="data.message.error"
                    @clearServerSideErrorMessage="data.message.error = null"
                    v-model.trim="data.message.value"
                    required
                  />
                  <!-- End:: Message Input -->

                  <base-button
                    class="w-100"
                    :btnText="$t('BUTTONS.send')"
                    styleType="primary_btn"
                    :isLoading="isWaitingApiResponse"
                    :disabled="!formIsValid || isWaitingApiResponse"
                  />
                </v-form>
              </div>
            </div>
          </div>
          <!-- End:: Contact Info & Form -->
        </div>
        <!-- ========== End:: Contact ========== -->

        <!-- ========== Start:: Faqs ========== -->
        <div class="faqs_section">
          <h2 class="faqs_section_title">{{ $t('TITLES.ContactUs.faqs') }}</h2>

          <div class="faqs_wrapper">
            <v-expansion-panels v-model="activePanels">
              <v-expansion-panel
                v-for="item in contactData.faqs"
                :key="item.id"
              >
                <v-expansion-panel-header disable-icon-rotate>
                  <template v-slot:actions>
                    <i class="fa-solid fa-angle-down"></i>
                  </template>
                  {{ item.question }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ item.answer }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <!-- ========== End:: Faqs ========== -->
      </div>

      <!-- ========== Start:: Map ========== -->
      <GMap
        ref="gMap"
        :center="{
          lat: +contactData.contact_info.lat,
          lng: +contactData.contact_info.lng,
        }"
        :options="{ fullscreenControl: false, styles: mapStyle }"
        :zoom="19"
      >
        <GMapMarker
          :position="{
            lat: +contactData.contact_info.lat,
            lng: +contactData.contact_info.lng,
          }"
        ></GMapMarker>
      </GMap>
      <!-- ========== End:: Map ========== -->
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import MainLoader from '@/components/ui/MainLoader.vue'
import isValidEmail from '@/utils/isValidEmail'
import dummyData from '@/helpers/dummyData'

export default {
  name: 'ContactPage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.ContactUs.pageTitle'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.ContactUs.pageTitle'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.ContactUs.pageTitle'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Contact Us Page Description',
        },
      ],
    }
  },

  components: {
    MainLoader,
  },

  data() {
    return {
      dummyData,

      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: G-map Data
      mapStyle: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ saturation: -40 }],
        },
      ],
      // mapCenter: {
      //   lat: 31.053435,
      //   lng: 31.37924,
      // },
      // End:: G-map Data

      // Start:: Data Collection To Send
      data: {
        name: {
          value: null,
          error: null,
        },
        email: {
          value: null,
          error: null,
        },
        phone: {
          value: null,
          error: null,
        },
        message: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        nameRules: [(val) => !!val || this.$t('FORMS.Validation.name')],
        emailRules: [
          (val) => !!val || this.$t('FORMS.Validation.email'),
          (val) =>
            (val && !!isValidEmail(val)) ||
            this.$t('FORMS.Validation.invalidEmail'),
        ],
        phoneRules: [
          (val) => !!val || this.$t('FORMS.Validation.phone'),
          (val) =>
            !(val && val.length !== 12) ||
            this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers'),
        ],
        messageRules: [(val) => !!val || this.$t('FORMS.Validation.message')],
      },
      // End:: Validation Schema

      // Start:: PreOpen Panels
      activePanels: 0,
      // End:: PreOpen Panels
    }
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      contactData: 'contactUsData/contactUsData',
    }),
    // End:: Vuex Getters
  },

  methods: {
    // Start:: Submit Form
    async submitForm() {
      this.$refs.contactForm.validate()

      if (this.formIsValid) {
        this.isWaitingApiResponse = true

        // Start:: Append Request Data
        const REQUEST_DATA = new FormData()
        REQUEST_DATA.append('name', this.data.name.value)
        REQUEST_DATA.append('email', this.data.email.value)
        REQUEST_DATA.append('phone_number', this.data.phone.value)
        REQUEST_DATA.append('message', this.data.message.value)
        // Start:: Append Request Data

        try {
          // ********** Start:: Implement Request ********** //
          let res = await this.$axiosRequest({
            method: 'POST',
            url: 'pages/contact',
            data: REQUEST_DATA,
          })
          this.isWaitingApiResponse = false
          this.$izitoast.success({
            message: res.data.message,
          })
          // ********** End:: Implement Request ********** //

          // Start:: Clear Form Inputs Data
          this.$refs.contactForm.resetValidation()
          this.data.name.value = null
          this.data.name.error = null
          this.data.email.value = null
          this.data.email.error = null
          this.data.phone.value = null
          this.data.phone.error = null
          this.data.message.value = null
          this.data.message.error = null
          // End:: Clear Form Inputs Data
        } catch (err) {
          this.isWaitingApiResponse = false
          this.data.name.error = err.response.data.errors.name
          this.data.email.error = err.response.data.errors.email
          this.data.phone.error = err.response.data.errors.phone
          this.data.message.error = err.response.data.errors.message
        }
      }
    },
    // End:: Submit Form
  },
}
</script>

<style lang="scss">
.contact_us_wrapper {
  padding-block: $section_block_padding * 1.5 0;
  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );

  .contact_section {
    .contact_section_header_wrapper {
      @include flex(center, center, column);
      .section_title {
        @include font($bold_font, 1.8rem);
        text-transform: capitalize;
        @include flex(center, center);
        column-gap: 0.8rem;

        span {
          position: relative;
          text-decoration: none;
          text-align: center;
          padding-block: 0.2rem;
          @include rtl(padding-inline, 1.4rem 45px, 45px 1.4rem);
          @include font($medium_font, 1.4rem);
          color: var(--white);
          background-color: var(--main_theme_clr);
          border-radius: 8px;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            @include rtl(left, auto, 10px);
            @include rtl(right, 10px, auto);
            display: block;
            @include size(28px, 28px);
            background-image: url('@/assets/media/icons/ui_icons/hand_pointing.svg');
            background-size: contain;
          }
        }
      }
      .section_desc {
        margin-block: 1rem 3rem !important;
        color: var(--gray_theme_clr);
        font-size: 1.1rem;
        text-align: center;
        max-width: 45%;
      }
    }

    .contact_info_and_form_wrapper {
      padding: 1rem;
      background-color: var(--theme_main_bg);
      border-radius: 8px;

      .contact_info_wrapper {
        position: relative;
        padding: 2rem;
        height: 100%;
        @include flex(space-between, flex-start, column);
        background-color: var(--main_theme_clr);
        border-radius: 8px;
        overflow: hidden;
        &::before,
        &::after {
          content: '';
          position: absolute;
          display: block;
          border-radius: 50%;
        }

        &::before {
          bottom: -65px;
          @include rtl(right, 70%, -40px);
          @include size(190px, 190px);
          background-color: var(--dark_main_theme_clr);
          opacity: 0.4;
        }

        &::after {
          bottom: 30px;
          @include rtl(right, 62%, 50px);
          @include size(130px, 130px);
          background-color: var(--soft_main_theme_clr);
          opacity: 0.2;
        }

        .wrapper {
          h3 {
            @include font($bold_font, 1.5rem, var(--white));
          }
          p {
            @include font($regular_font, 1.1rem, var(--white));
            margin-block: 1.2rem 3.7rem !important;
            line-height: 1.6;
          }

          .contacts {
            margin-block-start: 1rem;
            @include flex(flex-start, flex-start, column);
            row-gap: 3rem;

            .contact_info {
              @include flex(center, center);
              column-gap: 1.2rem;
              .contact_copy {
                font-size: 1.05rem;
                color: var(--white);
                a {
                  font-family: $regular_font;
                }
              }

              svg,
              i {
                font-size: 1.3rem;
                color: var(--white);
              }
            }
          }
        }

        .social_links {
          width: 100%;
          @include flex(flex-end, center);
          gap: 1rem;
          a {
            inline-size: 2rem;
            block-size: 2rem;
            border-radius: 50%;
            @include flex(center, center);
            transition: all 0.3s linear;
            i,
            svg {
              font-size: 1.2rem;
              color: var(--white);
              transition: all 0.3s linear;
            }
            &:hover {
              background-color: var(--white);
              i,
              svg {
                color: var(--main_theme_clr);
              }
            }
          }
        }
      }
    }
  }

  .faqs_section {
    padding-block: $section_block_padding * 1.5;

    .faqs_section_title {
      margin-block-end: 3rem;
      @include font($bold_font, 1.8rem);
      text-transform: capitalize;
      @include flex(center, center);
      column-gap: 0.8rem;
    }

    .v-expansion-panels {
      row-gap: 20px;
      .v-expansion-panel {
        padding: 15px;
        border-radius: 8px !important;
        background-color: rgba(255, 255, 255, 0.5);
        @include simpleShadow;
        &::after,
        &::before {
          display: none;
        }
        &.v-expansion-panel--active {
          border: 1px solid var(--main_theme_clr);
        }
        .v-expansion-panel-header {
          text-align: center;
          font-size: 1.05rem;
          font-family: $bold_font;
          line-height: 1.7;
          @include flex(space-between, center);
          column-gap: 10px;
          &::before {
            display: none;
          }
          .v-expansion-panel-header__icon {
            margin-left: 0;
            @include size(2rem, 2rem);
            border-radius: 50%;
            @include flex(center, center);
            transition: all 0.3s linear;
            svg,
            i {
              font-size: 1rem;
              transition: all 0.3s linear;
            }
          }
          &.v-expansion-panel-header--active {
            .v-expansion-panel-header__icon {
              background-color: var(--main_theme_clr);
              transform: rotate(180deg);
              svg,
              i {
                color: var(--white);
              }
            }
          }
        }
        .v-expansion-panel-content {
          .v-expansion-panel-content__wrap {
            text-align: justify;
            color: var(--light_theme_text_clr);
            font-size: 0.95rem;
          }
        }
      }
    }
  }

  @include media(md) {
    padding-block-start: $section_block_padding * 0.5;
    .contact_section {
      .contact_section_header_wrapper {
        .section_title {
          font-size: 1.4rem;
          line-height: 1.6;
          flex-wrap: wrap;
          row-gap: 1rem;
          text-align: center;

          span {
            padding: 0.2rem 1.2rem;
            font-size: 1.1rem;
          }
        }

        .section_desc {
          max-width: 95%;
        }
      }

      .contact_info_and_form_wrapper {
        .contact_info_wrapper {
          &::before {
            @include size(160px, 160px);
          }
          &::after {
            @include size(100px, 100px);
          }

          .wrapper {
            h3 {
              font-size: 1.2rem;
            }
            p {
              font-size: 0.9rem;
              margin-block-end: 2rem !important;
            }

            .contacts {
              margin-block-start: 0;
              margin-block-end: 2rem;
              row-gap: 2rem;
              .contact_info {
                .contact_copy {
                  a {
                    font-size: 0.95rem;
                  }
                }
                svg,
                i {
                  font-size: 1.1rem;
                }
              }
            }
          }
        }
      }
    }

    .faqs_section {
      padding-block: $section_block_padding * 0.5;

      .faqs_section_title {
        font-size: 1.4rem;
        margin-block: 2rem 3rem;
      }

      .v-expansion-panels {
        .v-expansion-panel {
          .v-expansion-panel-header {
            padding-inline: 0.5rem;
            &.v-expansion-panel-header--active {
              .v-expansion-panel-header__icon {
                background-color: transparent;
                svg,
                i {
                  color: var(--theme_text_clr);
                }
              }
            }
          }
          .v-expansion-panel-content {
            .v-expansion-panel-content__wrap {
              padding-inline: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
