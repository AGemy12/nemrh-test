<template>
  <section class="user_info_content_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <h1 class="tap_title"> {{$t("TITLES.Profile.userProfile")}} </h1>

      <v-form class="mt-8">
        <div class="row">
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('FORMS.Placeholders.name')"
            v-model.trim="data.name"
            readonly
          />
          <!-- End:: Name Input -->

          <!-- Start:: Email Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('FORMS.Placeholders.email')"
            v-model.trim="data.email"
            readonly
          />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Number Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('FORMS.Placeholders.whatsAppNumber')"
            v-model.trim="data.phone"
            readonly
          />
          <!-- End:: Phone Number Input -->

          <!-- Start:: Edit Profile Route -->
          <div class="col-lg-6">
            <nuxt-link :to="localePath('/profile/edit-personal-data')" class="edit_profile_route">
              {{$t("BUTTONS.edit")}}
              <i class="fa-solid fa-pencil"></i>
            </nuxt-link>
          </div>
          <!-- End:: Edit Profile Route -->
        </div>
      </v-form>
    </template>
  </section>
</template>

<script>
import MainLoader from "@/components/ui/MainLoader.vue";

export default {
  name: "UserInfo",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Profile.userProfile'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Profile.userProfile'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Profile.userProfile'),
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
      // End:: Loaders Controlling Data

      // Start:: Data Collection To Send
      data: {
        name: null,
        email: null,
        phone: null,
      },
      // End:: Data Collection To Send
    }
  },

  methods: {
    // Start:: Get Page Data
    async getPageData() {
      this.pageIsLoading = true;
      try {
        let res = await this.$axiosRequest({
          method: 'GET',
          url: `profile`,
        });
        this.pageIsLoading = false;
        this.data.name = res.data.data.full_name;
        this.data.email = res.data.data.email;
        this.data.phone = res.data.data.phone_number;
      } catch (error) {
        this.pageIsLoading = false;
        this.$izitoast.error({
          message: error.response.data.message,
        });
      }
    },
    // End:: Get Page Data
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
  .edit_profile_route {
    @include primaryBtnStyle;
    width: 100%;
  }
}
</style>