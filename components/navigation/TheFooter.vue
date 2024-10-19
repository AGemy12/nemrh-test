<template>
  <footer class="footer_content_wrapper">
    <div class="container">
      <div class="row justify-content-between">
        <!-- Start:: Logo -->
        <div class="col-md-2 d-flex align-items-center justify-content-center">
          <nuxt-link :to="localePath('/')" class="logo_wrapper">
            <img
              src="@/assets/media/logo/logo_white.svg"
              width="150"
              height="60"
              alt="logo"
              loading="lazy"
            />
          </nuxt-link>
        </div>
        <!-- End:: Logo -->

        <!-- Start:: Routes List -->
        <div class="col-md-7 d-flex align-items-center justify-content-center">
          <ul class="routes_list_wrapper">
            <li>
              <nuxt-link :to="localePath('/')" exact>
                {{ $t('NAV.home') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/companies?page=1')">
                {{ $t('NAV.companies') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/add-company')" exact>
                {{ $t('NAV.addYourCompany') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/subscriptions')" exact>
                {{ $t('NAV.adsAndMessages') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/about')">
                {{ $t('NAV.aboutUs') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/contact')">
                {{ $t('NAV.contact') }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- End:: Routes List -->

        <!-- Start:: Social List -->
        <div
          class="col-md-3 d-flex align-items-center justify-content-center"
          v-if="contactData"
        >
          <ul class="social_links">
            <li class="social_item" v-if="contactData.socials.whatsapp_link">
              <a
                :href="contactData.socials.whatsapp_link"
                target="_blank"
                aria-label="whatsapp"
              >
                <i class="fab fa-whatsapp"></i>
              </a>
            </li>

            <li class="social_item" v-if="contactData.socials.facebook">
              <a
                :href="contactData.socials.facebook"
                target="_blank"
                aria-label="facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>

            <li class="social_item" v-if="contactData.socials.instagram">
              <a
                :href="contactData.socials.instagram"
                target="_blank"
                aria-label="instagram"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>

            <li class="social_item" v-if="contactData.socials.x">
              <a
                :href="contactData.socials.x"
                target="_blank"
                aria-label="twitter"
              >
                <i class="fa-brands fa-x-twitter"></i>
              </a>
            </li>

            <li class="social_item" v-if="contactData.socials.tiktok">
              <a
                :href="contactData.socials.tiktok"
                target="_blank"
                aria-label="tiktok"
              >
                <i class="fa-brands fa-tiktok"></i>
              </a>
            </li>

            <li
              class="social_item"
              v-if="
                contactData.contact_info.lat && contactData.contact_info.lng
              "
            >
              <a
                :href="`https://www.google.com/maps/@${contactData.contact_info.lat},${contactData.contact_info.lng}`"
                target="_blank"
                aria-label="location"
                :title="contactData.contact_info.location"
              >
                <i class="fa-solid fa-location-dot"></i>
              </a>
            </li>
          </ul>
        </div>
        <!-- End:: Social List -->
      </div>

      <div class="copyrights_wrapper">
        <div class="container">
          <div class="row">
            <div
              class="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start"
            >
              <p v-html="$t('TITLES.copyRights', { year: currentYear })"></p>
            </div>

            <div
              class="col-md-4 d-flex align-items-center justify-content-center"
            >
              <ul class="routes_list_wrapper">
                <li>
                  <nuxt-link :to="localePath('/privacy-policy')" exact>
                    {{ $t('FOOTER.privacyPolicy') }}
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/terms-and-conditions')" exact>
                    {{ $t('FOOTER.termsAndConditions') }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div
              class="col-md-4 d-flex align-items-center justify-content-center justify-content-md-end gap-3"
            >
              <div class="img_box">
                <img
                  src="@/assets/media/images/payMethods/visa.svg"
                  width="100"
                  height="100"
                  alt="Visa"
                  loading="lazy"
                />
              </div>
              <div class="img_box">
                <img
                  src="@/assets/media/images/payMethods/apple_pay.svg"
                  width="100"
                  height="100"
                  alt="apple pay"
                  loading="lazy"
                />
              </div>
              <div class="img_box">
                <img
                  src="@/assets/media/images/payMethods/stc-pay.svg"
                  width="100"
                  height="100"
                  alt="stc pay"
                  loading="lazy"
                />
              </div>
              <div class="img_box">
                <img
                  src="@/assets/media/images/payMethods/mada.svg"
                  width="100"
                  height="100"
                  alt="apple pay"
                  loading="lazy"
                />
              </div>
              <div class="img_box">
                <img
                  src="@/assets/media/images/payMethods/mastercard.svg"
                  width="100"
                  height="100"
                  alt="stc pay"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start:: Whats App Floating Button -->
    <a
      v-if="contactData"
      aria-label="whatsapp"
      :href="contactData.socials.whatsapp_link"
      target="_blank"
      ><div class="floating-button">
        <i class="fa-brands fa-whatsapp icon wa"></i>
      </div>
    </a>
    <!-- End:: Whats App Floating Button -->
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheFooter',

  data() {
    return {
      // Start:: Current Year
      currentYear: new Date().getFullYear(),
      // End:: Current Year
    }
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
      contactData: 'contactUsData/contactUsData',
    }),
    // End:: Vuex Getters
  },
}
</script>

<style lang="scss">
.floating-button {
  position: fixed;
  z-index: 49;
  bottom: 30px;
  z-index: 1000000000000;
  width: 60px;
  height: 60px;
  background: #03ae03;
  border-radius: 50%;
  right: 30px;
  @include flex(center, center);
  font-size: 35px;
  color: #fff;
  cursor: pointer;
  // z-index: 99;
  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    border: 50%;
    border: 1px solid #58ea00;
    left: -20px;
    right: -20px;
    top: -20px;
    bottom: -20px;
    border-radius: 50%;
    animation: animate 1.5s linear infinite;
    opacity: 0;
  }
  &::after {
    animation-delay: 0.5s;
  }
}

@media (max-width: 991px) {
  .floating-button {
    bottom: 25px;
    width: 50px;
    height: 50px;
    z-index: 3;
  }
}

@keyframes animate {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>
