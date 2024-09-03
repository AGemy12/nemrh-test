<template>
  <section class="auth_page_content_wrapper">
    <div class="auth_form_wrapper">
      <!-- Start:: Form Title -->
      <h2 class="form_title">{{ $t('TITLES.Auth.register') }}</h2>
      <!-- End:: Form Title -->

      <!-- Start:: Form -->
      <v-form
        ref="authForm"
        v-model="formIsValid"
        @submit.prevent="submitForm"
        lazy-validation
      >
        <div class="row">
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
            @clearServerSideErrorMessage="data.email.error = null"
            :serverSideErrorMessage="data.email.error"
            v-model.trim="data.email.value"
            required
          />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Input -->
          <base-input
            type="tel"
            :placeholder="$t('FORMS.Placeholders.whatsAppNumber') + '*'"
            staticPlaceholder="966xxxxxxxx"
            :validationRules="validationSchema.phoneRules"
            :serverSideErrorMessage="data.phone.error"
            @clearServerSideErrorMessage="data.phone.error = null"
            v-model.trim="data.phone.value"
            required
          />
          <!-- End:: Phone Input -->

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

          <!-- Start:: Confirm Password Input -->
          <base-input
            type="password"
            :placeholder="$t('FORMS.Placeholders.confirmPassword') + '*'"
            :validationRules="validationSchema.confirmPasswordRules"
            :serverSideErrorMessage="data.confirmPassword.error"
            @clearServerSideErrorMessage="data.confirmPassword.error = null"
            v-model.trim="data.confirmPassword.value"
            required
          />
          <!-- End:: Confirm Password Input -->
        </div>

        <!-- Start:: Agree Terms And Conditions Input -->
        <div class="checkbox_input_wrapper p-0 my-0">
          <v-checkbox v-model="termsAgreement" color="#5E17EB">
            <template v-slot:label>
              <div>
                <span> {{ $t('FORMS.Placeholders.agreement') }} </span>
                <button
                  type="button"
                  @click.stop="toggleTermsAndConditionsModal"
                >
                  {{ $t('BUTTONS.termsAndConditions') }}
                </button>
              </div>
            </template>
          </v-checkbox>
        </div>
        <!-- End:: Agree Terms And Conditions Input -->

        <!-- Start:: Form Buttons -->
        <base-button
          class="mt-4"
          :btnText="$t('BUTTONS.register')"
          styleType="primary_btn"
          :isLoading="isWaitingApiResponse"
          :disabled="!formIsValid || !termsAgreement || isWaitingApiResponse"
        />
        <!-- End:: Form Buttons -->
      </v-form>
      <!-- End:: Form -->

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

    <!-- Start:: Terms & Conditions Modal -->
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
    <!-- End:: Terms & Conditions Modal -->
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TextContentModal from '@/components/modals/general/TextContentModal.vue'
import isValidEmail from '@/utils/isValidEmail'

export default {
  name: 'RegisterPage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Auth.register'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Auth.register'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Auth.register'),
        },
      ],
    }
  },

  components: {
    TextContentModal,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Dialogs Control Data
      termsModalIsOpen: false,
      // End:: Dialogs Control Data

      // Start:: Terms And Conditions Data
      termsAndConditions: null,
      // End:: Terms And Conditions Data

      // Start:: Data Collection To Send
      data: {
        name: {
          value: null,
          error: null,
        },
        phone: {
          value: null,
          error: null,
        },
        email: {
          value: null,
          error: null,
        },
        password: {
          value: null,
          error: null,
        },
        confirmPassword: {
          value: null,
          error: null,
        },
      },
      termsAgreement: false,
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        nameRules: [(val) => !!val || this.$t('FORMS.Validation.name')],
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
        emailRules: [
          (val) => !!val || this.$t('FORMS.Validation.email'),
          (val) =>
            (val && !!isValidEmail(val)) ||
            this.$t('FORMS.Validation.invalidEmail'),
        ],
        passwordRules: [
          (val) => !!val || this.$t('FORMS.Validation.password'),
          (val) =>
            !(val && val.length < 6) ||
            this.$t('FORMS.Validation.passwordLength'),
        ],
        confirmPasswordRules: [
          (val) => !!val || this.$t('FORMS.Validation.confirmPassword'),
          (val) =>
            !(val && val.length < 6) ||
            this.$t('FORMS.Validation.confirmPasswordLength'),
          (val) =>
            val === this.data.password.value ||
            this.$t('FORMS.Validation.passwordsMatching'),
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

    // Start:: Handling Terms & Conditions Agreement
    async getTermsAndConditionsData() {
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'pages/legal/terms-and-conditions',
        })
        // ********** End:: Implement Request ********** //
        this.termsAndConditions = res.data.data
      } catch (err) {
        this.$izitoast.error({
          message: err.response.data.message,
        })
      }
    },
    toggleTermsAndConditionsModal() {
      this.termsModalIsOpen = !this.termsModalIsOpen
    },
    agreeToTermsAndConditions() {
      this.termsAgreement = true
      this.toggleTermsAndConditionsModal()
    },
    // End:: Handling Terms & Conditions Agreement

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.authForm.validate()

      if (this.formIsValid) {
        this.isWaitingApiResponse = true
        // Start:: Append Request Data
        const REQUEST_DATA = new FormData()
        REQUEST_DATA.append('full_name', this.data.name.value)
        REQUEST_DATA.append('phone_number', this.data.phone.value)
        REQUEST_DATA.append('email', this.data.email.value)
        REQUEST_DATA.append('password', this.data.password.value)
        REQUEST_DATA.append(
          'password_confirmation',
          this.data.confirmPassword.value
        )
        // Start:: Append Request Data

        try {
          // ********** Start:: Implement Request ********** //
          let res = await this.$axiosRequest({
            method: 'POST',
            url: 'auth/register',
            data: REQUEST_DATA,
          })

          this.isWaitingApiResponse = false
          this.setAuthedUserData({
            email: this.data.email.value,
          })
          this.$izitoast.success({
            message: res.data.message,
          })
          // ********** End:: Implement Request ********** //

          // Start:: Clear Form Inputs Data
          this.$refs.authForm.resetValidation()
          this.data.name.value = null
          this.data.name.error = null
          this.data.phone.value = null
          this.data.phone.error = null
          this.data.email.value = null
          this.data.email.error = null
          this.data.password.value = null
          this.data.password.error = null
          this.data.confirmPassword.value = null
          this.data.confirmPassword.error = null
          // End:: Clear Form Inputs Data

          // ********** Start:: Redirect To Verify Account ********** //
          this.$router.replace(
            this.localePath('/auth/verification-code/verify-account')
          )
          // ********** End:: Redirect To Verify Account ********** //
        } catch (err) {
          this.isWaitingApiResponse = false
          this.data.name.error = err.response.data.errors.full_name
          this.data.phone.error = err.response.data.errors.phone_number
          this.data.email.error = err.response.data.errors.email
          this.data.confirmPassword.error = err.response.data.errors.password
        }
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getTermsAndConditionsData()
    // End:: Fire Methods
  },
}
</script>
