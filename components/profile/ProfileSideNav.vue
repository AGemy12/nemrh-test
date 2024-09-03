<template>
  <div
    class="profile_tabs_wrapper"
    :class="{ small_screens_tabs: isSmallScreensProfileTabs }"
  >
    <button
      @click.stop="$emit('closeProfileTabs')"
      class="profile_taps_close_btn"
    >
      <i class="fas fa-xmark"></i>
    </button>

    <h2 class="username">
      {{ $t('TITLES.Navbar.welcome', { name: authedUserData.name }) }}
    </h2>

    <ul class="profile_taps" @click.stop="$emit('closeProfileTabs')">
      <li class="profile_tap" v-for="item in profileTabs" :key="item.id">
        <nuxt-link :to="item.route" exact>
          {{ item.title }}
        </nuxt-link>
      </li>

      <li class="profile_tap">
        <button @click="logoutConfirmationModalIsOpen = true">
          {{ $t('BUTTONS.logout') }}
        </button>

        <!-- Start:: Logout Confirmation Modal -->
        <v-dialog v-model="logoutConfirmationModalIsOpen">
          <v-card>
            <div class="modal_content_wrapper">
              <v-card-title class="justify-center">
                {{ $t('TITLES.Modals.logoutConfirmingMessage') }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="logout">{{
                  $t('BUTTONS.logout')
                }}</v-btn>

                <v-btn
                  class="modal_cancel_btn"
                  @click="logoutConfirmationModalIsOpen = false"
                  >{{ $t('BUTTONS.cancel') }}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </div>
          </v-card>
        </v-dialog>
        <!-- End:: Logout Confirmation Modal -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProfileTabs',

  emits: ['closeProfileTabs'],

  computed: {
    ...mapGetters({
      authedUserData: 'auth/authedUserData',
    }),

    isSmallScreensProfileTabs() {
      if (process.client) {
        return window.innerWidth < 1000 ? true : false
      }
    },

    profileTabs() {
      return [
        {
          id: 1,
          title: this.$t('NAV.Profile.userProfile'),
          route: this.localePath('/profile'),
        },
        // {
        //   id: 2,
        //   title: this.$t('NAV.Profile.myPhone'),
        //   route: this.localePath('/profile/myPhone'),
        //   img: require('@/assets/media/icons/ui_icons/userInfo.svg'),
        // },
        {
          id: 3,
          title: this.$t('NAV.Profile.subscriptions'),
          route: this.localePath('/profile/subscriptions'),
        },
        {
          id: 4,
          title: this.$t('NAV.Profile.invoices'),
          route: this.localePath('/profile/invoices'),
        },
        {
          id: 5,
          title: this.$t('NAV.Profile.addRequests'),
          route: this.localePath('/profile/add-requests'),
        },
        {
          id: 6,
          title: this.$t('NAV.Profile.changePassword'),
          route: this.localePath('/profile/change-password'),
        },
      ]
    },
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    }
  },

  methods: {
    // Start:: Vuex Set Authed User Data
    ...mapActions({
      logout: 'auth/logout',
      setAuthedUserData: 'auth/setAuthedUserData',
    }),
    // End:: Vuex Set Authed User Data
  },
}
</script>

<style lang="scss" scoped>
.profile_tabs_wrapper {
  width: 28%;
  padding: 2rem 1rem;
  background-color: var(--theme_main_bg);
  border-radius: 8px;
  .profile_taps_close_btn {
    display: none;
  }
  &.small_screens_tabs {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    padding: 25px;
    padding-bottom: 100px;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 5;
    transition: all 0.5s linear;
    overflow: auto;
    .profile_taps {
      .profile_tap {
        &:not(:last-of-type) {
          margin-block-end: 1.4rem;
        }
        &:last-of-type {
          button {
            color: var(--light_red);
          }
        }
        a,
        button {
          width: max-content;
          background-color: transparent;
          color: var(--theme_text_clr);
        }

        a,
        button {
          &.nuxt-link-active,
          &:hover {
            background-color: var(--main_theme_clr);
            color: var(--white);
          }
        }
      }
    }
    &::-webkit-scrollbar {
      width: 0;
    }
    &.active {
      left: 0;
    }
  }

  .username {
    margin-block: 1rem 2rem;
    text-align: center;
    font-size: 1.3rem;
    font-family: $semi_bold_font;
  }

  .profile_taps {
    .profile_tap {
      &:not(:last-of-type) {
        margin-block-end: 1rem;
      }
      &:last-of-type {
        button {
          color: var(--light_red);
        }
      }
      a,
      button {
        position: relative;
        display: block;
        width: 100%;
        padding: 10px 15px;
        border-radius: 8px;
        @include flex(flex-start, center);
        column-gap: 1rem;
        transition: all 0.3s linear;
        font-size: 1rem;
        font-family: $medium_font;
      }

      a {
        &.nuxt-link-active,
        &:hover {
          background-color: var(--main_theme_clr);
          color: var(--white);
        }
      }
    }
  }
}

@media (max-width: 1000px) {
  .profile_tabs_wrapper {
    .profile_taps_close_btn {
      display: inline-block;
      margin-block-end: 20px;
      font-size: 18px;
      svg,
      i {
        color: var(--light_red);
      }
    }

    .username {
      color: var(--white);
    }

    .profile_taps {
      border: none !important;
      .profile_tap {
        &:not(:last-of-type) {
          margin-block-end: 2.2rem;
        }
        a,
        button {
          padding: 8px !important;
          border-radius: 6px;
          color: var(--white) !important;
        }

        a,
        button {
          &::after {
            display: none;
          }
          &.nuxt-link-active,
          &:hover {
            width: max-content;
            background-color: var(--main_theme_clr);
          }
        }
      }
    }
  }
}
</style>
