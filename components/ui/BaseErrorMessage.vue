<template>
  <div class="error_content_wrapper">
    <img
      :src="errorImage"
      :alt="errorMessage"
      :width="imageWidth"
      :height="imageHeight"
      loading="lazy"
    />

    <div class="text_content_wrapper">
      <p dir="ltr"> Ooops! </p>
      <h1> {{errorMessage}} </h1>
    </div>

    <!-- <nuxt-link :to="localePath('/')"> Back To Home </nuxt-link> -->
    <button @click="routeBackToHome" v-if="routeBackDirection === 'home'">
      Back To Home
    </button>

    <button @click="routeBack" v-else>
      Go Back
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseErrorMessage",

  props: {
    errorImage: {
      type: String,
      requited: true,
    },
    routeBackDirection: {
      type: String,
      requited: false,
      default: "home"
    },
    imageWidth: {
      type: String,
      requited: false,
      default: "350"
    },
    imageHeight: {
      type: String,
      requited: false,
      default: "250"
    },
    errorMessage: {
      type: String,
      requited: true,
    }
  },

  methods: {
    // Start:: Route Back
    routeBackToHome() {
      this.$router.replace(this.localePath('/'));
    },
    routeBack() {
      this.$router.back();
    },
    // End:: Route Back
  },
}
</script>

<style lang="scss" scoped>
.error_content_wrapper {
  min-height: 100vh;
  max-height: 100vh;
  @include flex(center, center, column);
  row-gap: 18px;
  .text_content_wrapper {
    text-align: center;
    p {
      font-family: $semi_bold_font;
      font-size: 2.5rem;
    }
    h1 {
      color: var(--light_theme_text_clr);
      font-size: 1.3rem;
      font-family: $regular_font;
    }
  }
  a,
  button {
    @include primaryBtnStyle;
  }
}
</style>
