<template>
  <section class="auth_page_content_wrapper">
    <div class="auth_form_wrapper">
      <!-- Start:: Form Title -->
      <h2 class="form_title">{{ $t('TITLES.Auth.enterVerificationCode') }}</h2>
      <h4 class="form_subtitle">
        {{ $t('TITLES.Auth.verificationCodeSent') }}
      </h4>
      <!-- End:: Form Title -->

      <!-- Start::Form -->
      <v-form
        ref="authForm"
        v-model="formIsValid"
        @submit.prevent="submitForm"
        lazy-validation
      >
        <div class="row">
          <!-- Start:: Verification Code -->
          <base-otp-input
            otpLength="4"
            v-model="data.verificationCode.value"
            :validationRules="validationSchema.verificationCodeRules"
            :serverSideErrorMessage="data.verificationCode.error"
          />
          <!-- End:: Verification Code -->
        </div>

        <!-- Start:: CountDown Timer -->
        <div class="timer_wrapper">
          <p>
            <span>{{ $t('TITLES.Auth.didntGetTheCode') }}</span>
            <button
              id="resend_btn"
              type="button"
              :disabled="timerCount > 0"
              @click="resendVerificationCode"
            >
              {{ $t('BUTTONS.resendCode') }}
            </button>
          </p>

          <h5 class="timer" dir="ltr">{{ '0 : ' + timerCount }}</h5>
        </div>
        <!-- End:: CountDown Timer -->

        <!-- Start:: Form Buttons -->
        <base-button
          class="mt-6"
          :btnText="$t('BUTTONS.verify')"
          styleType="primary_btn"
          :isLoading="isWaitingApiResponse"
          :disabled="!formIsValid || isWaitingApiResponse"
        />
        <!-- End:: Form Buttons -->
      </v-form>
      <!-- End::Form -->

      <!-- Start:: Auth Route -->
      <div class="auth_route_wrapper">
        <!-- eslint-disable -->
        <nuxt-link
          :to="localePath('/auth/login')"
          v-html="$t('BUTTONS.loginRoute')"
        />
        <!-- eslint-enable -->
      </div>
      <!-- End:: Auth Route -->
    </div>

    <!-- Start:: Confirmation Modal -->
    <ConfirmationModal
      v-if="confirmationModalIsOpen"
      :modalIsOpen="confirmationModalIsOpen"
    >
      <template v-slot>
        <img
          src="@/assets/media/images/confirmation.svg"
          width="80"
          height="80"
          alt="confirmation"
          loading="lazy"
        />

        <h4>{{ $t('TITLES.Modals.registeredSuccessfully') }}</h4>

        <nuxt-link :to="localePath('/auth/login')">
          {{ $t('BUTTONS.login') }}
        </nuxt-link>
      </template>
    </ConfirmationModal>
    <!-- End:: Confirmation Modal -->
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationModal from '@/components/modals/general/ConfirmationModal.vue'

export default {
  name: 'VerificationCode',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Auth.verify'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Auth.verify'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Auth.verify'),
        },
      ],
    }
  },

  components: {
    ConfirmationModal,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Dialogs Control Data
      confirmationModalIsOpen: false,
      // End:: Dialogs Control Data

      // Start:: Timer Data
      timerCount: 60,
      // End:: Timer Data

      // Start:: Data Collection To Send
      data: {
        verificationCode: {
          value: '',
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        verificationCodeRules: [
          (val) => !!val || this.$t('FORMS.Validation.verificationCode'),
          (val) =>
            !(val && val.length < 4) ||
            this.$t('FORMS.Validation.verificationCodeLength'),
        ],
      },
      // End:: Validation Schema
    }
  },

  computed: {
    // Start:: Vuex Get Authed User Data
    ...mapGetters({
      authedUserData: 'auth/authedUserData',
    }),
    // End:: Vuex Get Authed User Data

    // Start:: Verification Type
    verificationType() {
      return this.$route.params.type
    },
    // End:: Verification Type
  },

  methods: {
    // Start:: Vuex Set Authed User Data
    ...mapActions({
      setAuthedUserData: 'auth/setAuthedUserData',
      deleteAuthedUserData: 'auth/deleteAuthedUserData',
    }),
    // End:: Vuex Set Authed User Data

    // Start:: CountDown Timer
    countDown() {
      if (this.timerCount > 0) {
        setTimeout(() => {
          this.timerCount -= 1
          this.countDown()
        }, 1000)
      }
    },
    // End:: CountDown Timer

    // Start:: Resend Verification Code
    async resendVerificationCode() {
      const REQUEST_DATA = new FormData()
      // Start:: Append Request Data
      REQUEST_DATA.append(
        'email',
        this.$cookies.get('nemrh_website_user_email')
      )
      // End:: Append Request Data

      // ********** Start:: Implement Request ********** //
      try {
        // ********** Start:: Implement Request ********** //
        await this.$axiosRequest({
          method: 'POST',
          url: `auth/send-reset-code`,
          data: REQUEST_DATA,
        })
        this.$izitoast.success({
          message: this.$t('MESSAGES.sentSuccessfully'),
        })
        this.timerCount = 60
        this.countDown()
      } catch (err) {
        this.$izitoast.error({
          message: err.response.data.message,
        })
      }
      // ********** End:: Implement Request ********** //
    },
    // End:: Resend Verification Code

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.authForm.validate()

      if (this.formIsValid) {
        if (this.verificationType == 'verify-contact-method') {
          this.isWaitingApiResponse = true
          // Start:: Append Request Data
          const REQUEST_DATA = new FormData()
          REQUEST_DATA.append(
            'email',
            this.$cookies.get('nemrh_website_user_email')
          )
          REQUEST_DATA.append('code', this.data.verificationCode.value)
          // Start:: Append Request Data

          try {
            // ********** Start:: Implement Request ********** //
            await this.$axiosRequest({
              method: 'POST',
              url: 'auth/confirm-reset-code',
              data: REQUEST_DATA,
            })
            this.isWaitingApiResponse = false
            this.setAuthedUserData({
              verificationCode: this.data.verificationCode.value,
            })
            this.$izitoast.success({
              message: this.$t('MESSAGES.verifiedSuccessfully'),
            })
            // ********** End:: Implement Request ********** //

            // ********** Start:: Redirect To Reset Password Page ********** //
            this.$router.replace(this.localePath('/auth/reset-password'))
            // ********** End:: Redirect To Reset Password Page ********** //
          } catch (err) {
            this.isWaitingApiResponse = false
            this.$izitoast.error({
              message: err.response.data.errors.code[0]
                ? err.response.data.errors.code[0]
                : err.response.data.message,
            })
          }
        } else if (this.verificationType == 'verify-account') {
          this.isWaitingApiResponse = true
          // Start:: Append Request Data
          const REQUEST_DATA = new FormData()
          REQUEST_DATA.append(
            'email',
            this.$cookies.get('nemrh_website_user_email')
          )
          REQUEST_DATA.append('code', this.data.verificationCode.value)
          // Start:: Append Request Data

          try {
            // ********** Start:: Implement Request ********** //
            let res = await this.$axiosRequest({
              method: 'POST',
              url: 'auth/verify-email',
              data: REQUEST_DATA,
            })
            this.isWaitingApiResponse = false

            // Start:: Delete Cached Data From Previous Step
            this.deleteAuthedUserData({ email: true })
            // End:: Delete Cached Data From Previous Step

            // Start:: Cache Authed User Data
            this.setAuthedUserData({
              id: res.data.data.id,
              name: res.data.data.full_name,
              token: res.data.data.token,
            })
            // End:: Cache Authed User Data

            this.$izitoast.success({
              message: this.$t('MESSAGES.verifiedSuccessfully'),
            })
            // ********** End:: Implement Request ********** //

            // ********** Start:: Redirect To Home Page ********** //
            //  this.$router.replace(this.localePath("/"));
            location.reload()

            //  this.isWaitingApiResponse = false;
            // this.confirmationModalIsOpen = true;
            // ********** End:: Redirect To Home Page ********** //
          } catch (err) {
            this.isWaitingApiResponse = false
            this.$izitoast.error({
              message: err.response.data.errors.code[0]
                ? err.response.data.errors.code[0]
                : err.response.data.message,
            })
          }
        }
      }
    },
    // End:: Submit Form
  },

  mounted() {
    // Start:: Fire Methods
    this.countDown()
    // End:: Fire Methods
  },
}
</script>
