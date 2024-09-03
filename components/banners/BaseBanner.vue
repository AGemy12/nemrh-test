<template>
  <section class="base_banner_wrapper">
    <div class="banner_content_wrapper">
      <div class="container">
        <div class="row justify-content-evenly align-items-center">
          <div class="col-lg-6 order-2 order-md-1">
            <h2 class="base_banner_title" v-lettering="{ splits: [' '] }">
              {{ bannerData }}
            </h2>

            <a
              v-if="showBannerButton && contactData"
              class="banner_btn"
              :href="contactData.socials.whatsapp_link"
              v-html="
                $t('BUTTONS.contactOnPhoneNumber', {
                  number: contactData.socials.whatsapp,
                })
              "
              target="_blank"
            >
            </a>
          </div>

          <div
            class="col-lg-5 d-flex justify-content-center align-items-center order-1 order-md-2"
          >
            <img
              class="base_banner_image"
              v-lazy="bannerImage"
              :alt="bannerData"
              width="100"
              height="100"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseBanner',

  props: {
    bannerImage: {
      type: String,
      required: false,
      default: require('@/assets/media/images/banner.svg'),
    },
    bannerData: {
      type: String,
      required: true,
    },
    showBannerButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      contactData: 'contactUsData/contactUsData',
    }),
    // End:: Vuex Getters
  },
}
</script>

<style lang="scss">
.base_banner_wrapper {
  .banner_content_wrapper {
    padding: 1.5rem;
    background-color: var(--main_theme_clr);
    border-radius: 8px;

    .base_banner_image {
      width: 70%;
      height: 70%;
      object-fit: cover;
    }

    .base_banner_title {
      text-transform: capitalize;
      line-height: 1.8;
      margin-inline: 0.35rem;
      @include font($semi_bold_font, 1.7rem, var(--white));

      & > span {
        display: inline-block;
        margin-inline: 0.35rem;
        font-family: $bold_font;
        font-size: 1.8rem;
      }
    }

    .banner_btn {
      @include primaryBtnStyle;
      font-size: 1rem;
      margin-top: 35px;
      width: max-content;
      border: 1px solid var(--white);
      background-image: linear-gradient(
        90deg,
        transparent 50%,
        var(--white) 50%
      );
      color: var(--main_theme_clr);
      font-family: $semi_bold_font;
      &:hover {
        color: var(--white);
        border: 1px solid var(--white);
      }
    }
  }

  @include media(md) {
    .banner_content_wrapper {
      .base_banner_image {
        width: 85%;
        height: 85%;
      }

      .base_banner_title {
        text-align: center;
        font-size: 1.4rem;
        & > span {
          font-size: 1.4rem;
        }
      }

      .banner_btn {
        display: block;
        margin-block: 2rem 0.5rem;
        margin-inline: auto;
      }
    }
  }
}
</style>
