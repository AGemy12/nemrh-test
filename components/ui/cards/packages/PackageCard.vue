<template>
  <div class="package_card_wrapper">
    <h2 class="package_name"> {{ packageData.title }} </h2>
    <h3 class="package_title"> {{ packageData.subtitle }} </h3>
    <p class="package_desc"> {{ packageData.desc }} </p>

    <nuxt-link
      v-if="displaySubscribeBtn"
      :to="cardRoute(packageData.id)"
      class="checkout_route"
    >
      {{ $t("BUTTONS.subscribe") }}
    </nuxt-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

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
    }
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
    }),
    // End:: Vuex Getters

    // Start:: Card Route Based On User Authentication Status 
    cardRoute() {
      return packageId => this.userIsLoggedIn ? 
              {path: this.localePath(`/checkout/${packageId}`), query: {subscription_type: 'messaging_subscription'}} : 
              this.localePath('/auth/login');
    },
    // End:: Card Route Based On User Authentication Status
  },
}
</script>

<style lang="scss" scoped>
.package_card_wrapper {
  min-height: 290px;
  padding: 1.5rem;
  @include flex(space-evenly, stretch, column);
  row-gap: 1.3rem;
  background-color: var(--theme_main_bg);
  border-radius: 8px;
  transition: all 0.3s linear;

  .package_name {
    margin: 0 !important;
    font-family: $semi_bold_font;
    font-size: 1.1rem;
  }

  .package_title {
    font-family: $bold_font;
    font-size: 1.4rem;
  }
  
  .package_desc {
    margin: 0 !important;
    font-size: 0.9rem;
    color: var(--light_theme_text_clr);
    text-align: justify;
    line-height: 1.8;
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
      color: var(--main_theme_clr)
    }
  }
}
</style>
