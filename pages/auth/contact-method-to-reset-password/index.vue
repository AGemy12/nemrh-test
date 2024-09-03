<template>
  <section class="auth_page_content_wrapper">
    <div class="auth_form_wrapper">
      <!-- Start:: Form Title -->
      <h2 class="form_title">{{ $t('TITLES.Auth.forgotYourPassword') }}</h2>
      <h4 class="form_subtitle">{{ $t('TITLES.Auth.sendNumberToGetOtp') }}</h4>
      <!-- End:: Form Title -->

      <!-- Start::Form -->
      <v-form
        ref="authForm"
        v-model="formIsValid"
        @submit.prevent="submitForm"
        lazy-validation
      >
        <div class="row">
          <!-- Start:: Phone Input -->
          <!-- <base-input 
            type="tel" 
            :placeholder="$t('FORMS.Placeholders.whatsAppNumber') + '*'"
            staticPlaceholder="966xxxxxxxx" 
            :validationRules="validationSchema.phoneRules"
            :serverSideErrorMessage="data.phone.error" 
            @clearServerSideErrorMessage="data.phone.error = null"
            v-model.trim="data.phone.value" required /> -->
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input
            type="email"
            :placeholder="$t('FORMS.Placeholders.email') + '*'"
            :validationRules="validationSchema.emailRules"
            @clearServerSideErrorMessage="data.email.error = null"
            :serverSideErrorMessage="data.email.error"
            v-model.trim="data.email.value"
            required
          />
          <!-- End:: Email Input -->
        </div>

        <!-- Start:: Form Buttons -->
        <base-button
          class="mt-6"
          :btnText="$t('BUTTONS.send')"
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
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import isValidEmail from '@/utils/isValidEmail'

export default {
  name: 'ContactMethodToResetPassword',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Auth.forgotYourPassword'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Auth.forgotYourPassword'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Auth.forgotYourPassword'),
        },
      ],
    }
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Data Collection To Send
      data: {
        // phone: {
        //   value: null,
        //   error: null,
        // },
        email: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        // phoneRules: [
        //   val => !!val || this.$t('FORMS.Validation.phone'),
        //   val => !(val && !val.startsWith("966")) || this.$t('FORMS.Validation.phoneStartWith966'),
        //   val => !(val && val.length !== 12) || this.$t('FORMS.Validation.phoneLength'),
        //   (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers')
        // ],
        emailRules: [
          (val) => !!val || this.$t('FORMS.Validation.email'),
          (val) =>
            (val && !!isValidEmail(val)) ||
            this.$t('FORMS.Validation.invalidEmail'),
        ],
      },
      // End:: Validation Schema
    }
  },

  methods: {
    // Start:: Vuex Set Authed User Data
    ...mapActions({
      setAuthedUserData: 'auth/setAuthedUserData',
    }),
    // End:: Vuex Set Authed User Data

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.authForm.validate()

      if (this.formIsValid) {
        this.isWaitingApiResponse = true
        // Start:: Append Request Data
        const REQUEST_DATA = new FormData()
        // REQUEST_DATA.append('phone_number', this.data.phone.value)
        REQUEST_DATA.append('email', this.data.email.value)
        // Start:: Append Request Data

        try {
          let res = await this.$axiosRequest({
            method: 'POST',
            url: 'auth/send-reset-code',
            data: REQUEST_DATA,
          })

          this.isWaitingApiResponse = false
          // Start:: Cache Authed User Data
          this.setAuthedUserData({
            email: this.data.email.value,
          })
          // End:: Cache Authed User Data
          this.$izitoast.success({
            message: res.data.message,
          })

          // Start:: Clear Form Inputs Data
          this.$refs.authForm.resetValidation()
          // this.data.phone.value = null
          // this.data.phone.error = null
          this.data.email.value = null
          this.data.email.error = null
          // End:: Clear Form Inputs Data

          this.$router.replace(
            this.localePath('/auth/verification-code/verify-contact-method')
          )
        } catch (err) {
          this.isWaitingApiResponse = false
          // this.data.phone.error = err.response.data.errors.phone_number
          this.data.email.error = err.response.data.errors.email
        }
      }
    },
    // End:: Submit Form
  },
}
</script>
