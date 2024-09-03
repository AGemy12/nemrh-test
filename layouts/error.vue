<template>
  <section :class="[{ rtl: $i18n.locale == 'ar' }, { ltr: $i18n.locale == 'en' }]">
    <NotFoundError
      v-if="error.statusCode === 404"
      :errorImage="require('@/assets/media/errors/404_error.svg')"
      errorMessage="The Page You Are Looking For Is Not Available"
    />
    <NotFoundError
      v-else-if="error.statusCode === 500"
      :errorImage="require('@/assets/media/errors/500_error.svg')"
      imageWidth="320"
      imageHeight="320"
      :errorMessage="this.error.message ? this.error.message : 'Server Error'"
      routeBackDirection="go_back"
    />
    <NotFoundError
      v-else
      :errorImage="require('@/assets/media/errors/general.svg')"
      imageWidth="320"
      imageHeight="320"
      :errorMessage="this.error.message ? this.error.message : 'An Error Occurred'"
      routeBackDirection="go_back"
    />
  </section>
</template>

<script>
import NotFoundError from "@/components/ui/BaseErrorMessage.vue";

export default {
  name: 'ErrorLayout',

  layout: "plain",

  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  components: {
    NotFoundError,
  },

  head() {
    const title = this.error.statusCode === 404 ? "404 Not Found" : this.error.message;
    return {
      title,
    }
  },

  mounted() {
    // Start:: Fire Methods
    if(this.error.statusCode === 401 && !this.error.accountIsVerified) {
      this.$router.replace(this.localePath('/auth/verification-code/verify-account'));
    }
    // End:: Fire Methods
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
