<template>
  <section class="change_password_content_wrapper">
    <h1 class="tap_title"> {{$t("TITLES.Profile.changePassword")}} </h1>

    <v-form
      ref="changePasswordForm"
      v-model="formIsValid"
      @submit.prevent="submitForm"
      lazy-validation
    >
      <div class="row">
        <!-- Start:: Current Password Input -->
        <base-input
          col="6"
          type="password"
          :placeholder="$t('FORMS.Placeholders.currentPassword')+'*'"
          :validationRules="validationSchema.passwordRules"
          :serverSideErrorMessage="data.currentPassword.error"
          @clearServerSideErrorMessage="data.currentPassword.error = null"
          v-model.trim="data.currentPassword.value"
          required
        />
        <!-- End:: Current Password Input -->

        <!-- Start:: New Password Input -->
        <base-input
          col="6"
          type="password"
          :placeholder="$t('FORMS.Placeholders.newPassword')+'*'"
          :validationRules="validationSchema.passwordRules"
          :serverSideErrorMessage="data.password.error"
          @clearServerSideErrorMessage="data.password.error = null"
          v-model.trim="data.password.value"
          required
        />
        <!-- End:: New Password Input -->

        <!-- Start:: Confirm New Password Input -->
        <base-input
          col="6"
          type="password"
          :placeholder="$t('FORMS.Placeholders.confirmNewPassword')+'*'"
          :validationRules="validationSchema.confirmPasswordRules"
          :serverSideErrorMessage="data.confirmPassword.error"
          @clearServerSideErrorMessage="data.confirmPassword.error = null"
          v-model.trim="data.confirmPassword.value"
          required
        />
        <!-- End:: Confirm New Password Input -->

        <!-- Start:: Submit Button -->
        <div class="col-lg-6">
          <base-button
            class="w-100 mt-1 py-2"
            :btnText="$t('BUTTONS.changePassword')"
            styleType="primary_btn"
            :isLoading="isWaitingApiResponse"
            :disabled="!formIsValid || isWaitingApiResponse"
          />
        </div>
        <!-- End:: Submit Button -->
      </div>
    </v-form>
  </section>
</template>

<script>
export default {
  name: "ChangeUserPassword",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Profile.changePassword'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Profile.changePassword'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Profile.changePassword'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Change Password Page Description',
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
        currentPassword: {
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
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        passwordRules: [
          val => !!val || this.$t('FORMS.Validation.password'),
          val => !(val && val.length < 6) || this.$t('FORMS.Validation.passwordLength'),
        ],
        confirmPasswordRules: [
          val => !!val || this.$t('FORMS.Validation.confirmPassword'),
          val => !(val && val.length < 6) || this.$t('FORMS.Validation.confirmPasswordLength'),
          val => val === this.data.password.value || this.$t('FORMS.Validation.passwordsMatching'),
        ],
      },
      // End:: Validation Schema
    }
  },


  methods: {
    // Start:: Submit Form
    async submitForm() {
      await this.$refs.changePasswordForm.validate();

      if(this.formIsValid) {
        this.isWaitingApiResponse = true;

        // Start:: Append Request Data
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append('_method', "PUT");
        REQUEST_DATA.append('old_password', this.data.currentPassword.value);
        REQUEST_DATA.append('password', this.data.password.value);
        REQUEST_DATA.append('password_confirmation', this.data.confirmPassword.value);
        // Start:: Append Request Data

        try {
          await this.$axiosRequest({
            method: 'POST',
            url: 'profile/password',
            data: REQUEST_DATA,
          });
          this.isWaitingApiResponse = false;
          this.$izitoast.success({
            message: this.$t('MESSAGES.changedSuccessfully'),
          });
          // Start:: Clear Form Inputs Data
          this.$refs.changePasswordForm.resetValidation();
          this.data.currentPassword.value = null;
          this.data.currentPassword.error = null;
          this.data.password.value = null;
          this.data.password.error = null;
          this.data.confirmPassword.value = null;
          this.data.confirmPassword.error = null;
          // End:: Clear Form Inputs Data
          this.$router.push(this.localePath("/profile"));
        } catch(err) {
          this.isWaitingApiResponse = false;
          this.$izitoast.error({
            message: err.response.data.message,
          });
          // this.data.currentPassword.error = err.response.data.errors.old_password;
          // this.data.password.error = err.response.data.errors.password;
          // this.data.confirmPassword.error = err.response.data.errors.password;
        }
      }
    },
    // End:: Submit Form
  },
}
</script>

<style lang="scss" scoped>
.change_password_content_wrapper {
  .contact_method_to_reset_password {
    display: inline-block;
    margin-top: 25px;
    text-align: center;
    color: var(--main_theme_clr);
    font-size: 0.9rem;
    text-decoration: underline !important;
  }
}
</style>
