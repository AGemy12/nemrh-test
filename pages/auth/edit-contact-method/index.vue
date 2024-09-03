<template>
  <section class="auth_page_content_wrapper">
    <div class="auth_form_wrapper">
      <!-- Start:: Form Title -->
      <h2 class="form_title">{{ $t('TITLES.enterYourEmail') }}</h2>
      <!-- End:: Form Title -->

      <!-- Start::Form -->
      <v-form
          ref="authForm"
          v-model="formIsValid"
          @submit.prevent="submitForm"
          lazy-validation
      >
        <div class="row">
          <!-- Start:: Email Input -->
          <base-input
            type="email"
            :placeholder="$t('FORMS.Placeholders.enterYourEmail') + '*'"
            :validationRules="validationSchema.emailRules"
            :serverSideErrorMessage="data.email.error"
            @clearServerSideErrorMessage="data.email.error = null"
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
      <div class="small_screens_auth_route_wrapper">
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
import {mapActions} from 'vuex';
import isValidEmail from '@/utils/isValidEmail';

export default {
  name: "EditContactMethod",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in'
  },

  head() {
    return {
      title: this.$t('TITLES.changeEmail'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.changeEmail'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.changeEmail'),
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
    // Start:: Vuex Set Authed User Data
    ...mapActions({
      setAuthedUserData: "auth/setAuthedUserData",
    }),
    // End:: Vuex Set Authed User Data

    // Start:: Submit Form
    async submitForm() {
      await this.$refs.authForm.validate();

      if(this.formIsValid) {
        this.setAuthedUserData({
          email: this.data.email.value,
        });
        this.$router.replace(this.localePath("/auth/verification-code/verify-contact-method"));
      }


      if(this.formIsValid) {
        // this.isWaitingApiResponse = true;
        // // Start:: Append Request Data
        // const REQUEST_DATA = new FormData();
        // REQUEST_DATA.append('email', this.data.email.value);
        // // Start:: Append Request Data

        // try {
        //   let res = await this.$axiosRequest({
        //     method: 'POST',
        //     url: 'forgot_password',
        //     data: REQUEST_DATA,
        //   });

        //   this.isWaitingApiResponse = false;
        //   // Start:: Cache Authed User Data
        //   this.$cookies.set("outfit_user_phonecode", this.data.phoneCode.key);
        //   this.$cookies.set("outfit_user_country_id", this.data.phoneCode.id);
        //   this.setAuthedUserData({
        //     phone: this.data.phoneCode.key+this.data.phone,
        //     verificationCode: res.data.data.code,
        //   });
        //   // End:: Cache Authed User Data
        //   this.$izitoast.success({
        //     message: this.$t('MESSAGES.codeSentSuccessfully'),
        //   });

        //   // Start:: Clear Form Inputs Data
        //   this.$refs.authForm.resetValidation();
        //   this.data.email.value = null;
        //   this.data.email.error = null;
        //   // End:: Clear Form Inputs Data

        //   this.$router.replace("/auth/verification-code/verify-contact-method");
        // } catch(err) {
        //   this.isWaitingApiResponse = false;
        //   this.$izitoast.error({
        //     message: err.response.data.message,
        //   });
        // }
      }
    },
    // End:: Submit Form
  },
}
</script>
