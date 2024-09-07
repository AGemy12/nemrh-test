<template>
  <section class="auth_page_content_wrapper">
    <div class="auth_form_wrapper">
      <!-- Start:: Form Title -->
      <h2 class="form_title">{{ $t('TITLES.Auth.welcomeBack') }}</h2>
      <!-- End:: Form Title -->

      <!-- Start:: Form -->
      <v-form
        ref="authForm"
        v-model="formIsValid"
        @submit.prevent="submitForm"
        lazy-validation
      >
        <div class="row">
          <!-- Start:: Phone Input -->
          <base-input
            type="tel"
            :placeholder="$t('FORMS.Placeholders.phone') + '*'"
            staticPlaceholder="966xxxxxxxx"
            :validationRules="validationSchema.phoneRules"
            :serverSideErrorMessage="data.phone.error"
            @clearServerSideErrorMessage="data.phone.error = null"
            v-model.trim="data.phone.value"
            required
          />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <!-- <base-input
            type="email"
            :placeholder="$t('FORMS.Placeholders.email') + '*'"
            :validationRules="validationSchema.emailRules"
            @clearServerSideErrorMessage="data.email.error = null"
            :serverSideErrorMessage="data.email.error"
            v-model.trim="data.email.value"
            required
          /> -->
          <!-- End:: Email Input -->

          <!-- Start:: Password Input -->
          <base-input
            type="password"
            :placeholder="$t('FORMS.Placeholders.password') + '*'"
            :validationRules="validationSchema.passwordRules"
            :serverSideErrorMessage="data.password.error"
            @clearServerSideErrorMessage="data.password.error = null"
            v-model.trim="data.password.value"
            required
          />
          <!-- End:: Password Input -->
        </div>

        <div class="form_btns">
          <nuxt-link
            :to="localePath('/auth/contact-method-to-reset-password')"
            class="forget_password_route"
          >
            {{ $t('BUTTONS.forgetPassword') }}
          </nuxt-link>

          <base-button
            class="mt-6"
            :btnText="$t('BUTTONS.login')"
            styleType="primary_btn"
            :isLoading="isWaitingApiResponse"
            :disabled="!formIsValid || isWaitingApiResponse"
          />
        </div>
      </v-form>
      <!-- End:: Form -->

      <!-- Start:: Auth Route -->
      <div class="auth_route_wrapper">
        <!-- eslint-disable -->
        <nuxt-link
          :to="localePath('/auth/register')"
          v-html="$t('BUTTONS.registerRoute')"
        />
        <!-- eslint-enable -->
      </div>
      <!-- End:: Auth Route -->
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import isValidEmail from '@/utils/isValidEmail'

export default {
  name: 'LoginPage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Auth.login'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Auth.login'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Auth.login'),
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
        // email: {
        //   value: null,
        //   error: null,
        // },
        phone: {
          value: null,
          error: null,
        },
        password: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        phoneRules: [
          (val) => !!val || this.$t('FORMS.Validation.phone'),
          (val) =>
            !(val && !val.startsWith('966')) ||
            this.$t('FORMS.Validation.phoneStartWith966'),
          (val) =>
            !(val && val.length !== 12) ||
            this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers'),
        ],
        // emailRules: [
        //   (val) => !!val || this.$t('FORMS.Validation.email'),
        //   (val) =>
        //     (val && !!isValidEmail(val)) ||
        //     this.$t('FORMS.Validation.invalidEmail'),
        // ],
        passwordRules: [
          (val) => !!val || this.$t('FORMS.Validation.password'),
          (val) =>
            !(val && val.length < 6) ||
            this.$t('FORMS.Validation.passwordLength'),
        ],
      },
      // End:: Validation Schema
    }
  },

  computed: {
    ...mapGetters({
      authedUserData: 'auth/authedUserData',
    }),
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
        // REQUEST_DATA.append('identifier', this.data.email.value)
        REQUEST_DATA.append('identifier', this.data.phone.value)
        REQUEST_DATA.append('password', this.data.password.value)
        // Start:: Append Request Data

        try {
          let res = await this.$axiosRequest({
            method: 'POST',
            url: 'auth/login',
            data: REQUEST_DATA,
          })

          this.isWaitingApiResponse = false
          // Start:: Cache Authed User Data
          this.setAuthedUserData({
            id: res.data.data.id,
            uid: res.data.data.uid,
            canChangeWhatsapp: res.data.data.can_change_campaign_number,
            name: res.data.data.full_name,
            token: res.data.data.token,
          })
          // End:: Cache Authed User Data

          this.$izitoast.success({
            message: this.$t('MESSAGES.loggedInSuccessfully'),
          })

          // Start:: Clear Form Inputs Data
          this.$refs.authForm.resetValidation()
          // this.data.email.value = null
          // this.data.email.error = null
          this.data.phone.value = null
          this.data.phone.error = null
          this.data.password.value = null
          this.data.password.error = null
          // End:: Clear Form Inputs Data

          // await this.$router.replace(this.localePath("/"));
          location.reload()
        } catch (err) {
          // ********** Start:: Redirect To Verify Account ********** //
          if (
            err.response.data?.additional_data?.error_type ===
              'verification_error' &&
            // !err.response.data?.additional_data?.has_verified_email
            !err.response.data?.additional_data?.has_verified_phone
          ) {
            this.$nuxt.error({
              statusCode: 401,
              message: err.response.data.message,
              accountIsVerified:
                // err.response.data.additional_data.has_verified_email,
                err.response.data.additional_data.has_verified_phone,
            })
            this.setAuthedUserData({
              email: this.data.email.value,
              // phone: this.data.phone.value,
            })
          }
          // ********** End:: Redirect To Verify Account ********** //
          else {
            this.isWaitingApiResponse = false
            // this.data.email.error = err.response.data.message
            this.data.phone.error = err.response.data.message
            this.data.password.error = err.response.data.message

            // this.data.phone.error = err.response.data.errors.identifier;
            // this.data.password.error = err.response.data.errors.password;
            // this.data.email.error = err.response.data.errors.identifier;
            // this.data.password.error = err.response.data.errors.identifier;
          }
        }
      }
    },
    // End:: Submit Form
  },
}
</script>
