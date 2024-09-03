<template>
  <section class="change_password_content_wrapper">
    <div class="profile_tap_title mb-0">
      <h1 class="tap_title"> {{$t("TITLES.changePassword")}} </h1>
    </div>

    <div class="row align-items-center justify-content-between">
      <div class="col-lg-7">
        <v-form
          ref="changePasswordForm"
          v-model="formIsValid"
          @submit.prevent="submitForm"
          lazy-validation
        >
          <div class="row">
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
          </div>

          <base-button
            class="mt-4"
            :btnText="$t('BUTTONS.send')"
            styleType="primary_btn"
            :isLoading="isWaitingApiResponse"
            :disabled="!formIsValid || isWaitingApiResponse"
          />
        </v-form>
      </div>

      <div class="col-lg-4">
        <img
          class="w-90 h-auto"
          src="@/assets/media/images/change_password_img.svg"
          width="200"
          height="200"
          alt="change password"
        />
      </div>
    </div>
  </section>
</template>

<script>
import isValidEmail from '@/utils/isValidEmail';

export default {
  name: "EmailToResetPassword",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.changePassword'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.changePassword'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.changePassword'),
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
        email: {
          value: null,
          error: null,
        },
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
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
    // Start:: Submit Form
    async submitForm() {
      this.$refs.changePasswordForm.validate();

      // if(this.formIsValid) {
      //   this.isWaitingApiResponse = true;

      //   // Start:: Append Request Data
      //   const REQUEST_DATA = new FormData();
      //   REQUEST_DATA.append('phone', this.data.phone.value);
      //   REQUEST_DATA.append('notes', this.data.notes.value);
      //   // Start:: Append Request Data

      //   try {
      //     // ********** Start:: Implement Request ********** //
      //     await this.$axiosRequest({
      //       method: 'POST',
      //       url: 'contacts',
      //       data: REQUEST_DATA,
      //     });
      //     this.isWaitingApiResponse = false;
      //     this.$izitoast.success({
      //       message: this.$t('MESSAGES.sentSuccessfully'),
      //     });
      //     // ********** End:: Implement Request ********** //

      //     // Start:: Clear Form Inputs Data
      //     this.$refs.changePasswordForm.resetValidation();
      //     this.data.password.value = null;
      //     this.data.password.error = null;
      //     this.data.confirmPassword.value = null;
      //     this.data.confirmPassword.error = null;
      //     // End:: Clear Form Inputs Data
      //   } catch (err) {
      //     this.isWaitingApiResponse = false;
      //     // console.log(err.response.data.errors);
      //     this.data.password.error = err.response.data.errors.password;
      //   }
      // }
    },
    // End:: Submit Form
  },
}
</script>

<style lang="scss" scoped>

</style>
