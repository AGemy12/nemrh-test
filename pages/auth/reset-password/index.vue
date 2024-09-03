<template>
  <section class="auth_page_content_wrapper">
    <div class="auth_form_wrapper">
      <!-- Start:: Form Title -->
      <h2 class="form_title">{{ $t('TITLES.Auth.changePassword') }}</h2>
      <h4 class="form_subtitle">{{ $t('TITLES.Auth.savePassword') }}</h4>
      <!-- End:: Form Title -->

      <!-- Start:: Form -->
      <v-form
        ref="authForm"
        v-model="formIsValid"
        @submit.prevent="submitForm"
        lazy-validation
      >
        <div class="row">
          <!-- Start:: Password Input -->
          <base-input
            type="password"
            :placeholder="$t('FORMS.Placeholders.newPassword') + '*'"
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
            :placeholder="$t('FORMS.Placeholders.confirmNewPassword') + '*'"
            :validationRules="validationSchema.confirmPasswordRules"
            :serverSideErrorMessage="data.confirmPassword.error"
            @clearServerSideErrorMessage="data.confirmPassword.error = null"
            v-model.trim="data.confirmPassword.value"
            required
          />
          <!-- End:: Confirm Password Input -->
        </div>

        <!-- Start:: Form Buttons -->
        <base-button
          class="mt-4"
          :btnText="$t('BUTTONS.save')"
          styleType="primary_btn"
          :isLoading="isWaitingApiResponse"
          :disabled="!formIsValid || isWaitingApiResponse"
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

        <h4>{{ $t('TITLES.Modals.passwordChanged') }}</h4>

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
  name: 'ResetPassword',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Auth.changePassword'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Auth.changePassword'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Auth.changePassword'),
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

      // Start:: Data Collection To Send
      data: {
        password: {
          value: null,
          error: null,
        },
        confirmPassword: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
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

  computed: {
    // Start:: Vuex Get Authed User Data
    ...mapGetters({
      authedUserData: 'auth/authedUserData',
    }),
    // End:: Vuex Get Authed User Data
  },

  methods: {
    // Start:: Vuex Set Authed User Data
    ...mapActions({
      deleteAuthedUserData: 'auth/deleteAuthedUserData',
    }),
    // End:: Vuex Set Authed User Data

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.authForm.validate()
      // this.isWaitingApiResponse = true;
      // setTimeout(() => {
      //   this.isWaitingApiResponse = false;
      //   this.confirmationModalIsOpen = true;
      // }, 2000);

      if (this.formIsValid) {
        this.isWaitingApiResponse = true

        // Start:: Append Request Data
        const REQUEST_DATA = new FormData()
        REQUEST_DATA.append('code', this.authedUserData.verificationCode)
        // REQUEST_DATA.append('phone_number', this.authedUserData.phone);
        REQUEST_DATA.append('email', this.authedUserData.email)
        REQUEST_DATA.append('new_password', this.data.password.value)
        REQUEST_DATA.append(
          'new_password_confirmation',
          this.data.confirmPassword.value
        )
        // Start:: Append Request Data

        try {
          await this.$axiosRequest({
            method: 'POST',
            url: 'auth/reset-password',
            data: REQUEST_DATA,
          })
          this.isWaitingApiResponse = false
          // Start:: Delete Cached Data From Previous Step
          // this.deleteAuthedUserData({phone: true, verificationCode: true});
          this.deleteAuthedUserData({ email: true, verificationCode: true })
          // End:: Delete Cached Data From Previous Step

          // this.$izitoast.success({
          //   message: this.$t('MESSAGES.changedSuccessfully'),
          // });

          // this.$router.replace(this.localePath("/auth/login"));
          this.confirmationModalIsOpen = true
        } catch (err) {
          this.isWaitingApiResponse = false
          this.$izitoast.error({
            message: err.response.data.errors.code,
          })
        }
      }
    },
    // End:: Submit Form
  },
}
</script>
