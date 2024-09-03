<template>
  <v-app class="default_layout" :dir="$i18n.locale == 'en' ? 'ltr' : 'rtl'">
    <v-main class="app_main_content_wrapper">
      <TheNavbar />
      <Nuxt />
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/navigation/TheNavbar.vue'
import TheFooter from '@/components/navigation/TheFooter.vue'

export default {
  name: 'DefaultLayout',

  head() {
    return {
      titleTemplate: `${this.$t('APP_NAME')} | %s`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Website Desc Will Go Here',
        },
      ],
    }
  },

  components: {
    TheNavbar,
    TheFooter,
  },

  created() {
    // Start:: Get Contact Us Data To Be Global Across The App
    this.$store.dispatch('contactUsData/getContactData')
    // End:: Get Contact Us Data To Be Global Across The App

    // Start:: Fire Mutation Update Store Auth Values To Fix SSR Bug
    this.$store.commit('auth/updateStateAuthValues', {
      id: this.$cookies.get('nemrh_website_user_id'),
      uid: this.$cookies.get('nemrh_website_user_uid'),
      canChangeWhatsapp: this.$cookies.get('nemrh_website_change_whatsapp'),
      token: this.$cookies.get('nemrh_website_user_token'),
      phone: this.$cookies.get('nemrh_website_user_phone'),
      email: this.$cookies.get('nemrh_website_user_email'),
      avatar: this.$cookies.get('nemrh_website_user_avatar'),
      name: this.$cookies.get('nemrh_website_user_name'),
      verificationCode: this.$cookies.get(
        'nemrh_website_user_verification_code'
      ),
    })
    // End:: Fire Mutation Update Store Auth Values To Fix SSR Bug
  },
}
</script>

<style lang="scss" scoped>
.app_main_content_wrapper {
  min-height: calc(100vh - 481px);
}

// @media (max-width: 991px) {
//   .default_layout {
//     padding-bottom: 75px;
//   }
// }
</style>
