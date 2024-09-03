<template>
  <section class="payment_status_content_wrapper">
    <lottie-animation
      :class="'lottie_loader'"
      :animationData="
        paymentStatus === 'success'
          ? require('@/assets/media/loaders/success.json')
          : require('@/assets/media/loaders/failed.json')
      "
      :loop="true"
    />
    <h1 class="page_title">
      <template v-if="paymentStatus === 'success'">
        {{ $t('TITLES.payedSuccessfully') }}
      </template>
      <template v-else> {{ $t('TITLES.failedToPay') }} </template>
    </h1>

    <!-- <nuxt-link :to="localePath('/')">
      {{ $t('BUTTONS.backToHome') }}
    </nuxt-link> -->
      <button @click="routeBack">
      {{ $t('BUTTONS.backToHome') }}
    </button>
  </section>
</template>

<script>
export default {
  name: 'PaymentStatus',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  layout: 'empty',

  head() {
    return {
      title:
        this.paymentStatus === 'success'
          ? this.$t('TITLES.payedSuccessfully')
          : this.$t('TITLES.failedToPay'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content:
            this.paymentStatus === 'success'
              ? this.$t('TITLES.payedSuccessfully')
              : this.$t('TITLES.failedToPay'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.paymentStatus === 'success'
              ? this.$t('TITLES.payedSuccessfully')
              : this.$t('TITLES.failedToPay'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Payment Status',
        },
      ],
    }
  },

  computed: {
    paymentStatus() {
      return this.$route.params.status
    },
  },

  methods: {
    // Start:: Route Back
    routeBack() {
      this.$router.replace(this.localePath('/'));
    },
    // End:: Route Back
  },
}
</script>

<style lang="scss" scoped>
.payment_status_content_wrapper {
  min-height: 100vh;
  max-height: 100vh;
  @include flex(center, center, column);
  row-gap: 20px;
  .lottie_loader {
    width: 220px;
    height: 220px;
  }

  .page_title {
    margin-top: 30px !important;
    font-size: 1.5rem;
    font-family: $semi_bold_font;
  }

  a,
  button {
    @include primaryBtnStyle;
  }
}
</style>
