<template>
  <nav
    ref="navbar"
    class="header_wrapper"
    :class="{
      small_screens_navbar: isSmallScreensNavbar,
      sticky: scrollPosition > navHeight,
    }"
  >
    <div class="wrapper">
      <div class="container">
        <!-- ========== Start:: Logo ========== -->
        <div class="logo_wrapper">
          <nuxt-link :to="localePath('/')" class="logo_wrapper">
            <img
              src="@/assets/media/logo/logo.svg"
              width="130"
              height="55"
              alt="logo"
              loading="lazy"
            />
          </nuxt-link>
        </div>
        <!-- ========== End:: Logo ========== -->

        <!-- ========== Start:: Routes  ========== -->
        <div
          class="navbar_content_wrapper"
          :class="{ active: navRoutesDrawerIsOpen }"
          @click="toggleNavRoutesDrawer"
        >
          <button @click.stop="toggleNavRoutesDrawer" class="drawer_close_btn">
            <i class="fas fa-times fa-lg"></i>
          </button>
          <ul class="routes_list">
            <li
              v-for="item in navbarRoutes"
              :key="item.id"
              class="navbar_route"
            >
              <nuxt-link
                :to="
                  item.path === '/companies'
                    ? { path: localePath(`${item.path}`), query: { page: 1 } }
                    : localePath(`${item.path}`)
                "
                :exact="item.path === '/'"
              >
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- ========== End:: Routes  ========== -->

        <!-- ========== Start:: Navbar Action Buttons ========== -->
        <div class="navbar_action_btns_wrapper">
          <LanguageSwitcher />

          <nuxt-link
            :to="localePath('/profile')"
            aria-label="profile"
            class="profile_route"
            v-if="userIsLoggedIn"
          >
            <span>
              {{ $t('TITLES.Navbar.welcome', { name: authedUserData.name }) }}
            </span>
            <i class="fa-regular fa-user"></i>
          </nuxt-link>

          <nuxt-link
            class="auth_route"
            :to="localePath('/auth/login')"
            aria-label="login"
            v-else
          >
            {{ $t('BUTTONS.login') }}
          </nuxt-link>

          <button class="nav_routes_drawer_btn" @click="toggleNavRoutesDrawer">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
        <!-- ========== End:: Navbar Action Buttons ========== -->
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher.vue'

export default {
  name: 'TheNavbar',

  components: {
    LanguageSwitcher,
  },

  data() {
    return {
      // Start:: NavBar Control Data
      scrollPosition: null,
      navHeight: null,
      // End:: NavBar Control Data

      // Start:: Drawers Control Data
      navRoutesDrawerIsOpen: false,
      // End:: Drawers Control Data
    }
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
      authedUserData: 'auth/authedUserData',
      contactData: 'contactUsData/contactUsData',
    }),
    // End:: Vuex Getters

    // Start:: Navbar Routes
    navbarRoutes() {
      let routes = [
        {
          id: 1,
          name: this.$t('NAV.home'),
          path: '/',
          showWithoutAuth: true,
        },
        {
          id: 2,
          name: this.$t('NAV.companies'),
          path: '/companies',
          showWithoutAuth: true,
        },
        {
          id: 3,
          name: this.$t('NAV.addYourCompany'),
          path: '/add-company',
          showWithoutAuth: true,
        },
        {
          id: 4,
          name: this.$t('NAV.subscriptions'),
          path: '/subscriptions',
          showWithoutAuth: true,
        },
        {
          id: 5,
          name: this.$t('NAV.aboutUs'),
          path: '/about',
          showWithoutAuth: true,
        },
        {
          id: 6,
          name: this.$t('NAV.contact'),
          path: '/contact',
          showWithoutAuth: true,
        },
      ]

      return routes.filter((item) => item.showWithoutAuth)
    },
    // End:: Navbar Routes

    // Start:: Small Screens Navbar Controlling
    isSmallScreensNavbar() {
      if (process.client) {
        return window.innerWidth < 1000 ? true : false
      }
    },
    // End:: Small Screens Navbar Controlling
  },

  methods: {
    // Start:: Handling Sticky Navbar
    updateScroll() {
      let screenBreakPoint = window.matchMedia('(max-width: 991px)').matches
      if (!screenBreakPoint) {
        this.scrollPosition = window.scrollY
        // window.scrollY > this.navHeight ? (document.body.style.paddingTop = '108px') : (document.body.style.paddingTop = '0');
      }
    },
    // End:: Handling Sticky Navbar

    // Start:: Drawers Control Method
    toggleNavRoutesDrawer() {
      if (window.innerWidth < 1000) {
        this.navRoutesDrawerIsOpen = !this.navRoutesDrawerIsOpen
        if (this.navRoutesDrawerIsOpen) {
          document.body.style.height = '100vh'
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.height = 'auto'
          document.body.style.overflowY = 'visible'
          document.body.style.overflowX = 'hidden'
        }
      }
    },
    //End:: Drawers Control Method
  },

  mounted() {
    // Start:: Fire Methods
    this.navHeight = this.$refs.navbar.clientHeight
    window.addEventListener('scroll', this.updateScroll, { passive: true })
    // End:: Fire Methods
  },
}
</script>
