<template>
  <section class="checkout_page_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <div class="container" v-else>
      <!-- ========= Start:: Checkout Content Wrapper ========= -->
      <div class="page_content_wrapper">
        <div class="row justify-content-between">
          <!-- Start:: Checkout Form -->
          <div class="col-lg-6 order-2 order-md-1">
            <v-form ref="checkoutForm" v-model="formIsValid" lazy-validation>
              <div class="order_details_wrapper">
                <h4 class="order_details_title">
                  {{ $t('TITLES.Checkout.checkoutData') }}
                </h4>
                <div class="row mt-5">
                  <!-- Start:: Name Input -->
                  <base-input
                    type="text"
                    :placeholder="$t('FORMS.Placeholders.name')"
                    :validationRules="validationSchema.nameRules"
                    :serverSideErrorMessage="data.name.error"
                    @clearServerSideErrorMessage="data.name.error = null"
                    v-model.trim="data.name.value"
                    readonly
                  />
                  <!-- End:: Name Input -->

                  <!-- Start:: Country Input -->
                  <!-- <base-input
                  col="6"
                  type="text"
                  :placeholder="$t('FORMS.Placeholders.country') + '*'"
                  :validationRules="validationSchema.countryRules"
                  :serverSideErrorMessage="data.country.error"
                  @clearServerSideErrorMessage="data.country.error = null"
                  v-model.trim="data.country.value"
                  required
                /> -->
                  <!-- End:: Country Input -->
                </div>
              </div>

              <!-- <div class="payment_methods_wrapper">
              <h4 class="payment_methods_title">
                {{ $t('TITLES.Checkout.paymentMethods') }}
              </h4>

              <div class="methods_wrapper">
                <v-radio-group v-model="data.payType.value" :rules="validationSchema.payType">
                  <v-radio value="card" color="#5E17EB">
                    <template v-slot:label>
                      {{ $t("FORMS.Placeholders.paymentCard") }}

                      <div class="card_options_wrapper">
                        <img
                          class="payment_card"
                          src="@/assets/media/images/payMethods/visa.svg"
                          width="45"
                          height="30"
                          alt="Visa image"
                          loading="lazy"
                        />

                        <img
                          class="payment_card"
                          src="@/assets/media/images/payMethods/apple_pay.svg"
                          width="45"
                          height="30"
                          alt="apple pay image"
                          loading="lazy"
                        />

                        <img
                          class="payment_card"
                          src="@/assets/media/images/payMethods/stc-pay.svg"
                          width="45"
                          height="30"
                          alt="stc pay image"
                          loading="lazy"
                        />
                      </div>
                    </template>
                  </v-radio>

                  <v-radio value="mada" color="#5E17EB">
                    <template v-slot:label>
                      <span class="d-flex gap-2">
                        {{ $t("FORMS.Placeholders.madaPayment") }}
  
                        <img
                          class="payment_card"
                          src="@/assets/media/images/payMethods/mada.svg"
                          width="45"
                          height="30"
                          alt="mada image"
                          loading="lazy"
                        />
                      </span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
            </div> -->
            </v-form>

            <div class="add_coupon_wrapper mt-6">
              <h4 class="coupon_title">
                {{ $t('TITLES.Checkout.discountCoupon') }}
              </h4>

              <form
                class="coupon_form_wrapper"
                @submit.prevent="validateCouponForm"
              >
                <input type="text" v-model.trim="coupon" />
                <base-button
                  style-type="primary_btn"
                  :btnText="$t('BUTTONS.use')"
                  :disabled="isWaitingApiResponse"
                />
              </form>
            </div>
          </div>
          <!-- End:: Checkout Form -->

          <!-- <pre dir="ltr">
          {{ checkoutData }}
        </pre> -->

          <!-- Start:: Checkout Details -->
          <div class="col-lg-5 order-1 order-md-2">
            <div class="checkout_details_wrapper">
              <h4 class="checkout_details_title">
                {{ $t('TITLES.Checkout.checkoutDetails') }}
              </h4>

              <div class="content_wrapper">
                <div class="checkout_details_wrapper">
                  <h5 class="checkout_item_name">{{ checkoutData.title }}</h5>

                  <div class="detail_item">
                    <span> {{ $t('TITLES.Checkout.subscriptionPrice') }} </span>
                    <p>{{ checkoutData.price }} {{ $t('APP_CURRENCY') }}</p>
                  </div>

                  <div class="detail_item" v-if="checkoutData.is_vat_active">
                    <span> {{ $t('TITLES.Checkout.vatPercentage') }} </span>
                    <p>{{ checkoutData.vat_percent }} %</p>
                  </div>

                  <div class="detail_item" v-if="checkoutData.is_vat_active">
                    <span> {{ $t('TITLES.Checkout.vatAmount') }} </span>
                    <p>{{ checkoutData.vat_price }} {{ $t('APP_CURRENCY') }}</p>
                  </div>

                  <div class="detail_item" v-if="appliedCoupon">
                    <span>
                      {{ $t('TITLES.Checkout.coupon') }} :
                      <span> {{ appliedCoupon }} </span>
                    </span>
                    <p>-{{ discount }} {{ $t('APP_CURRENCY') }}</p>
                  </div>

                  <v-divider />

                  <div class="detail_item">
                    <span>
                      {{ $t('TITLES.Checkout.total') }}
                    </span>
                    <p>
                      {{ checkoutData.total_price }} {{ $t('APP_CURRENCY') }}
                    </p>
                  </div>

                  <base-button
                    class="mt-8 w-100"
                    :btnText="$t('BUTTONS.confirmPay')"
                    styleType="primary_btn"
                    @fireClick="bayForTheOrder"
                    :isLoading="waitingForApplyingPayment"
                    :disabled="!formIsValid || waitingForApplyingPayment"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- End:: Checkout Details -->
        </div>
      </div>
      <!-- ========= End:: Checkout Content Wrapper ========= -->

      <!-- ========= Start:: Banner ========= -->
      <BaseBanner class="mt-5" :bannerData="bannerData" data-aos="fade-up" />
      <!-- ========= End:: Banner ========= -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import MainLoader from '@/components/ui/MainLoader.vue'
import BaseBanner from '@/components/banners/BaseBanner.vue'

export default {
  name: 'Checkout',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Checkout.title'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Checkout.title'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Checkout.title'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout Page Desc Will Go Here',
        },
      ],
    }
  },

  components: {
    MainLoader,
    BaseBanner,
  },

  async asyncData({ $axiosRequest, params, query }) {
    try {
      // ********** Start:: Implement Request ********** //
      let res = await $axiosRequest({
        method: 'GET',
        url: `bundles/${params.id}}`,
      })
      // ********** End:: Implement Request ********** //
      const companyId = query.companyId || null

      return {
        checkoutData: res.data.data,
        bannerData: res.data.additional_data.last_section_title,
      }
    } catch (err) {
      console.log(err.response.data.message)
    }
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      isWaitingApiResponse: false,
      waitingForApplyingPayment: false,
      // End:: Loaders Controlling Data

      // Start:: Data Collection To Send
      data: {
        name: {
          value: null,
          error: null,
        },
        // country: {
        //   value: null,
        //   error: null,
        // },
        // payType: {
        //   value: null,
        //   error: null,
        // },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        nameRules: [(val) => !!val || this.$t('FORMS.Validation.name')],
        // countryRules: [(val) => !!val || this.$t('FORMS.Validation.country')],
        // payType: [(val) => !!val || this.$t('FORMS.Validation.payType')],
      },
      // End:: Validation Schema

      // Start:: Coupon Data
      coupon: null,
      appliedCoupon: null,
      discount: null,
      // End:: Coupon Data
    }
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      authedUserData: 'auth/authedUserData',
    }),
    // End:: Vuex Getters

    // Start:: Subscription Type
    subscriptionType() {
      return this.$route.query.subscription_type
    },
    // End:: Subscription Type
  },

  methods: {
    // Start:: Handling Coupon
    validateCouponForm() {
      if (!this.coupon) {
        this.$izitoast.error({
          message: this.$t('FORMS.Validation.coupon'),
        })
        return
      } else {
        this.submitCoupon()
        return
      }
    },
    async submitCoupon() {
      this.isWaitingApiResponse = true
      try {
        let res = await this.$axiosRequest({
          method: 'POST',
          url: `apply-coupon`,
          params: {
            bundle_id: this.$route.params.id,
            code: this.coupon,
          },
        })
        this.isWaitingApiResponse = false
        this.$izitoast.success({
          message: res.data.message,
        })
        this.appliedCoupon = this.coupon
        this.discount = res.data.data.discount
        this.checkoutData.total_price = res.data.data.total_price

        this.coupon = null
        // this.checkoutData = res.data.data;
      } catch (error) {
        this.isWaitingApiResponse = false
        this.$izitoast.error({
          message: error.response.data.message,
        })
      }
    },
    // End:: Handling Coupon

    // Start:: Bay For The Order
    async bayForTheOrder() {
      this.waitingForApplyingPayment = true

      // Start:: Append Request Data
      const REQUEST_DATA = new FormData()
      if (this.subscriptionType === 'campaign_subscription') {
        if (this.$cookies.get('company_id'))
          REQUEST_DATA.append('company_id', this.$cookies.get('company_id'))
        if (this.$cookies.get('ad_desc[ar]'))
          REQUEST_DATA.append('ad_desc[ar]', this.$cookies.get('ad_desc[ar]'))
        if (this.$cookies.get('ad_desc[en]'))
          REQUEST_DATA.append('ad_desc[en]', this.$cookies.get('ad_desc[en]'))
        if (this.$cookies.get('ad_notes'))
          REQUEST_DATA.append('ad_notes', this.$cookies.get('ad_notes'))

        // استرجاع الصورة من localStorage
        const imageBase64 = localStorage.getItem('adImage')

        if (imageBase64) {
          // تحويل Base64 إلى Blob
          const byteString = atob(imageBase64.split(',')[1])
          const mimeString = imageBase64
            .split(',')[0]
            .split(':')[1]
            .split(';')[0]
          const arrayBuffer = new ArrayBuffer(byteString.length)
          const uint8Array = new Uint8Array(arrayBuffer)

          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i)
          }

          const blob = new Blob([uint8Array], { type: mimeString })
          REQUEST_DATA.append('image', blob, 'advertisement_image.png')
        }

        if (this.$cookies.get('ad_link'))
          REQUEST_DATA.append('ad_link', this.$cookies.get('ad_link'))
        if (this.$cookies.get('ad_title'))
          REQUEST_DATA.append('ad_title', this.$cookies.get('ad_title'))
        if (this.$cookies.get('duration_limit'))
          REQUEST_DATA.append(
            'duration_limit',
            this.$cookies.get('duration_limit')
          )
      }
      REQUEST_DATA.append('bundle_id', this.$route.params.id)
      if (this.appliedCoupon) REQUEST_DATA.append('code', this.appliedCoupon)

      console.log('بيانات الريكويست قبل الإرسال:')
      REQUEST_DATA.forEach((value, key) => {
        console.log(`${key}:`, value)
      })

      try {
        let res = await this.$axiosRequest({
          method: 'POST',
          url:
            this.subscriptionType === 'campaign_subscription'
              ? 'ad-subscribe'
              : 'message-subscribe',
          data: REQUEST_DATA,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.waitingForApplyingPayment = false

        // Delete Cached Data
        if (this.subscriptionType === 'campaign_subscription') {
          this.$cookies.remove('company_id')
          this.$cookies.remove('ad_desc[ar]')
          this.$cookies.remove('ad_desc[en]')
          this.$cookies.remove('ad_notes')
        }

        // Redirect To Payment Invoice
        window.location.replace(res.data.data.InvoiceURL)
      } catch (error) {
        this.waitingForApplyingPayment = false
        this.$izitoast.error({
          message: error.response.data.message,
        })
      }
    },
    // End:: Bay For The Order
  },

  mounted() {
    // Start:: Fire Methods
    if (this.checkoutData) {
      this.pageIsLoading = !this.pageIsLoading
    }
    // End:: Fire Methods

    // Set Initial Username
    this.data.name.value = this.authedUserData.name
  },
}
</script>

<style lang="scss">
.checkout_page_wrapper {
  padding-block: $section_block_padding * 1.5 $section_block_padding;
  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );

  .page_content_wrapper {
    margin-block-end: 5rem;
    padding: 1.8rem;
    background-color: var(--theme_main_bg);
    border-radius: 8px;

    .order_details_wrapper {
      .order_details_title {
        font-size: 1.1rem;
        font-family: $medium_font;
        text-transform: uppercase;
        margin-block-end: 2.2rem !important;
        display: block;
      }
      .input_wrapper {
        margin-block-end: 0;
      }
    }

    .payment_methods_wrapper {
      margin-block: 2rem 2.5rem;
      .payment_methods_title {
        font-size: 1.1rem;
        font-family: $medium_font;
        text-transform: uppercase;
        margin-block-end: 1.3rem !important;
        display: block;
      }
      .methods_wrapper {
        .v-input--radio-group {
          width: 100%;
          .v-input__slot {
            background-color: transparent !important;
            .v-input--radio-group__input {
              @include flex(center, flex-start, column);
              row-gap: 1rem;
              .v-radio {
                padding: 0.5rem;
                background-color: var(--theme_inputs_bg);
                border-radius: 8px;
                width: 100%;
                .v-input--selection-controls__input {
                  margin: 0;
                }
                .v-label {
                  margin: 0;
                  padding-inline: 0.5rem;
                  @include flex(space-between, center);
                  .card_options_wrapper {
                    @include flex(center, center);
                    column-gap: 0.8rem;
                    .payment_card {
                      object-fit: contain;
                      filter: brightness(0);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .add_coupon_wrapper {
      .coupon_title {
        font-size: 1.1rem;
        font-family: $medium_font;
        text-transform: uppercase;
        margin-block-end: 1.3rem !important;
        display: block;
      }

      .coupon_form_wrapper {
        overflow: hidden;
        padding: 6px 8px;
        @include flex(space-between, center);
        column-gap: 5px;
        background-color: var(--theme_inputs_bg);
        border-radius: 8px;
        @media (max-width: 450px) {
          flex-direction: column;
          gap: 10px;
        }
        input {
          flex-grow: 1;
          outline: none;
          padding-inline: 10px;
          font-size: 1rem;
        }
        button {
          font-size: 0.9rem;
          padding: 6px;
          border-radius: 6px;
          min-width: 100px;
        }
      }
    }

    .checkout_details_wrapper {
      .checkout_details_title {
        font-size: 1.1rem;
        font-family: $medium_font;
        text-transform: uppercase;
        margin-block-end: 2.2rem !important;
        display: block;
      }
      .content_wrapper {
        padding: 1rem;
        background-color: var(--theme_inputs_bg);
        border-radius: 8px;
      }
      .checkout_details_wrapper {
        .checkout_item_name {
          margin-block-end: 1.7rem;
          font-family: $bold_font;
          font-size: 1.1rem;
        }

        .detail_item {
          @include flex(space-between, center);
          column-gap: 1rem;
          &:not(:last-of-type) {
            margin-block-end: 1.5rem;
          }
          span,
          p {
            color: var(--theme_text_clr);
            font-size: 1rem;
          }

          span {
            @include flex(flex-start, center);
            font-family: $semi_bold_font;
            span {
              color: var(--main_theme_clr);
            }
          }

          p {
            font-family: $regular_font;
          }
        }
      }
    }
  }

  @include media(md) {
    padding-block: 0 $section_block_padding * 0.3;

    .page_header_wrapper {
      align-items: center;
      .title_wrapper {
        margin-bottom: 1.5rem;
        flex-direction: column;
        row-gap: 20px;
        .header_title {
          font-size: 1.2rem;
        }
        .timer_wrapper {
          padding-inline: 30px;

          .flip-clock {
            column-gap: 6px;
          }
        }
      }
      .header_hint {
        text-align: center;
        font-size: 0.8rem;
      }
    }

    .page_content_wrapper {
      .checkout_summary_wrapper {
        margin-top: 0;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
