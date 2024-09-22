<template>
  <div class="package_card_wrapper">
    <h2 class="package_name">{{ packageData.title }}</h2>
    <!-- <h3 class="package_title"> {{ packageData.subtitle }} </h3>
    <p class="package_desc"> {{ packageData.desc }} </p> -->
    <div class="package_card_position">
      <img :src="srcImage" alt="" />
    </div>

    <nuxt-link
      v-if="displaySubscribeBtn"
      :to="cardRoute(packageData.id)"
      class="checkout_route"
    >
      {{ $t('BUTTONS.subscribe') }}
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PackageCard',

  props: {
    packageData: {
      type: Object,
      required: true,
    },
    displaySubscribeBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
    srcImage: {
      type: String,
    },
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
    }),
    // End:: Vuex Getters

    // Start:: Card Route Based On User Authentication Status
    cardRoute() {
      return (packageId) =>
        this.userIsLoggedIn
          ? {
              path: this.localePath(`/checkout/${packageId}`),
              query: { subscription_type: 'messaging_subscription' },
            }
          : this.localePath('/auth/login')
    },
    // End:: Card Route Based On User Authentication Status
  },
}
</script>

<style lang="scss" scoped>
.package_card_wrapper {
  min-height: 200px;
  padding: 0.5rem 0;
  @include flex(space-between, center, column);
  row-gap: 1.3rem;
  background-color: var(--theme_main_bg);
  border-radius: 8px;
  transition: all 0.3s linear;

  .package_name {
    margin: 0 auto !important;
    font-family: $semi_bold_font;
    font-size: 1rem;
    padding-top: 0.5rem;
  }
  .package_card_position {
    padding: 0 0.5rem;
    height: 80%;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .package_title {
    font-family: $bold_font;
    font-size: 1.4rem;
  }

  .checkout_route {
    @include borderedBtnStyle;
    min-width: unset;
    border-color: var(--main_theme_clr);
    color: var(--main_theme_clr);
  }

  &:hover {
    background-color: var(--main_theme_clr);
    border-color: transparent;
    * {
      color: var(--white);
    }

    .checkout_route {
      background-color: var(--white);
      color: var(--main_theme_clr);
    }
  }
}
</style>
