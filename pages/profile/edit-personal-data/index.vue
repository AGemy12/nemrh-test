<template>
  <section class="user_info_content_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <h1 class="tap_title"> {{$t("TITLES.Profile.editUserProfile")}} </h1>

      <v-form
        class="mt-8"
        ref="editUserInfoForm"
        v-model="formIsValid"
        @submit.prevent="submitForm"
        lazy-validation
      >
        <div class="row">
          <!-- Start:: Name Input -->
          <base-input
            col="6"
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
            col="6"
            type="email"
            :placeholder="$t('FORMS.Placeholders.email')"
            :serverSideErrorMessage="data.email.error"
            @clearServerSideErrorMessage="data.email.error = null"
            v-model.trim="data.email.value"
            required
          />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Number Input -->
          <base-input
            col="6"
            type="tel"
            :placeholder="$t('FORMS.Placeholders.whatsAppNumber')+'*'"
            staticPlaceholder="9665xxxxxxx"
            :validationRules="validationSchema.phoneRules"
            :serverSideErrorMessage="data.phone.error"
            @clearServerSideErrorMessage="data.phone.error = null"
            v-model.trim="data.phone.value"
            required
          />
          <!-- End:: Phone Number Input -->

          <!-- Start:: Submit Button -->
          <div class="col-lg-6">
            <base-button
              class="w-100"
              :btnText="$t('BUTTONS.save')"
              styleType="primary_btn"
              :isLoading="isWaitingApiResponse"
              :disabled="!formIsValid || isWaitingApiResponse"
            />
          </div>
          <!-- End:: Submit Button -->
        </div>
      </v-form>
    </template>
  </section>
</template>

<script>
import {mapActions } from 'vuex';
import MainLoader from "@/components/ui/MainLoader.vue";
// import isValidEmail from '@/utils/isValidEmail';

export default {
  name: "editPersonalData",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Profile.editUserProfile'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Profile.editUserProfile'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Profile.editUserProfile'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'User Profile Page Description',
        },
      ],
    }
  },

  components: {
    MainLoader,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      isWaitingApiResponse: false,
      isWaitingForBankDataServerResponse: false,
      // End:: Loaders Controlling Data

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
      },
      // End:: Data Collection To Send

      // Start:: Validation Schema
      formIsValid: true,
      validationSchema: {
        nameRules: [(val) => !!val || this.$t('FORMS.Validation.name')],
        // emailRules: [
        //   (val) => !!val || this.$t('FORMS.Validation.email'),
        //   (val) =>
        //     (val && !!isValidEmail(val)) ||
        //     this.$t('FORMS.Validation.invalidEmail'),
        // ],
        phoneRules: [
          val => !!val || this.$t('FORMS.Validation.phone'),
          val => !(val && !val.startsWith("966")) || this.$t('FORMS.Validation.phoneStartWith966'),
          val => !(val && val.length !== 12) || this.$t('FORMS.Validation.phoneLength'),
          (val) => /^\d*$/.test(val) || this.$t('FORMS.Validation.onlyNumbers')
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

    // Start:: Get Page Data
    async getPageData(methodUsageType) {
      if(methodUsageType !== 'edit_profile') {
        this.pageIsLoading = true;
      }
      try {
        let res = await this.$axiosRequest({
          method: 'GET',
          url: `profile`,
        });
        if(methodUsageType !== 'edit_profile') {
          this.pageIsLoading = false;
        }
        this.data.name.value = res.data.data.full_name;
        this.data.email.value = res.data.data.email;
        this.data.phone.value = res.data.data.phone_number;
      } catch (error) {
        if(methodUsageType !== 'edit_profile') {
          this.pageIsLoading = false;
        }
        this.$izitoast.error({
          message: error.response.data.message,
        });
      }
    },
    // End:: Get Page Data

    // Start:: Submit Form
    async submitForm() {
      this.$refs.editUserInfoForm.validate();

      if (this.formIsValid) {
        this.isWaitingApiResponse = true;

        // Start:: Append Request Data
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append('_method', "PUT");
        if(this.data.name.value) REQUEST_DATA.append('full_name', this.data.name.value);
        if(this.data.email.value) REQUEST_DATA.append('email', this.data.email.value);
        if(this.data.phone.value) REQUEST_DATA.append('phone_number', this.data.phone.value);
        // Start:: Append Request Data

        try {
          // ********** Start:: Implement Request ********** //
          await this.$axiosRequest({
            method: 'POST',
            url: 'profile',
            data: REQUEST_DATA,
          })
          this.isWaitingApiResponse = false;
          this.$izitoast.success({
            message: this.$t('MESSAGES.updatedSuccessfully'),
          });
          // Start:: Cache Authed User Data
          this.setAuthedUserData({
            name: this.data.name.value,
            email: this.data.email.value,
          });
          // End:: Cache Authed User Data
          this.getPageData('edit_profile');
          // ********** End:: Implement Request ********** //

          // Start:: Clear Form Inputs Data
          this.$refs.editUserInfoForm.resetValidation();
          // End:: Clear Form Inputs Data

          this.$router.back();
        } catch (err) {
          this.isWaitingApiResponse = false
          this.data.name.error = err.response.data.errors.full_name;
          this.data.email.error = err.response.data.errors.email;
          this.data.phone.error = err.response.data.errors.phone_number;
        }
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getPageData();
    // End:: Fire Methods
  },
}
</script>

<style lang="scss" scoped>
.user_info_content_wrapper {
  .main_loader_wrapper {
    min-height: 500px;
    max-height: 500px;
  }
}
</style>