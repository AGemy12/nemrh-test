<template>
  <v-app class="auth_layout" :dir="$i18n.locale == 'en' ? 'ltr' : 'rtl'">
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',

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

  middleware: 'authedUserMiddleware',

  created() {
    // Start:: Fire Mutation Update Store Auth Values To Fix SSR Bug
    this.$store.commit('auth/updateStateAuthValues', {
      id: this.$cookies.get('nemrh_website_user_id'),
      uid: this.$cookies.get('nemrh_website_user_uid'),
      canChangeWhatsapp: this.$cookies.get('nemrh_website_change_whatsapp'),
      token: this.$cookies.get('nemrh_website_user_token'),
      phone: this.$cookies.get('nemrh_website_user_phone'),
      email: this.$cookies.get('nemrh_website_user_email'),
      verificationCode: this.$cookies.get(
        'nemrh_website_user_verification_code'
      ),
    })
    // End:: Fire Mutation Update Store Auth Values To Fix SSR Bug
  },
}
</script>

<style lang="scss" scoped>
.auth_layout {
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

// @media (max-width: 991px) {
//   .default_layout {
//     padding-bottom: 75px;
//   }
// }
</style>
