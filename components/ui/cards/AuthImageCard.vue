<template>
  <div class="auth_image_card_wrapper">
    <img
      class="page_image"
      src="@/assets/media/images/auth_bg.png"
      width="200"
      height="300"
      alt="authentication page"
      loading="lazy"
    />
    <div class="overlay">
        <div class="page_header">
          <nuxt-link :to="localePath('/')" class="logo">
            <img
              src="~/assets/media/logo/logo_white.svg"
              width="150"
              height="70"
              alt="logo"
              loading="lazy"
            />
          </nuxt-link>
          <h1 class="auth_page_title"> {{ title }} </h1>
          <p class="auth_page_subtitle" v-if="subtitle"> {{ subtitle }} </p>
        </div>

        <!-- <div class="auth_route_wrapper">
          <nuxt-link
            :to="$route.path.includes('/login') ? localePath('/auth/register') : localePath('/auth/login')"
            v-html="authRouteText"
          />
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthImageCard",

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    authRouteText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.auth_image_card_wrapper {
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  .page_image {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: top;
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    padding: 4rem 3rem;
    background-color: rgba(225, 225, 225, 0.2);
    border-radius: 45px;
    backdrop-filter: blur(3px);
    @include flex(center, flex-start, column);
    .page_header {
      .logo {
        display: inline-block;
        margin-bottom: 1.5rem;
      }
      .auth_page_title {
        font-size: 1.7rem;
        font-family: $medium_font;
        color: var(--white);
        line-height: 2;
      }
      .auth_page_subtitle {
        margin-block-end: 15px;
        font-size: 1rem;
        color: var(--white);
        font-family: $regular_font;
      }
    }
    .auth_route_wrapper {
      a {
        font-size: 1.25rem;
        color: var(--white);
        span {
          display: inline-block;
          margin-inline: 6px;
          text-decoration: underline !important;
          text-transform: uppercase;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .auth_image_card_wrapper {
    display: none;
  }
}
</style>
