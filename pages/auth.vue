<template>
  <section class="auth_pages">
    <div class="row justify-content-between m-0">
      <!-- Start:: Page Content -->
      <div class="col-lg-6 d-flex align-items-center justify-content-center">
        <NuxtChild />
      </div>
      <!-- End:: Page Content -->

      <!-- Start:: Page Image -->
      <AuthImageCard
        class="col-lg-5 p-0"
        :title="isAuthContenetAvailable ? contactData.auth_side_content : ''"
        :authRouteText="$t('BUTTONS.registerRoute')"
      />
      <!-- End:: Page Image -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthImageCard from '@/components/ui/cards/AuthImageCard.vue'

export default {
  name: 'AuthPages',

  layout: 'auth',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  components: {
    AuthImageCard,
  },

  data() {
    return {
      // Start:: Profile Tabs Drawer Controle Data
      profileTabsDrawerIsActive: false,
      // Start:: Profile Tabs Drawer Controle Data
    }
  },

  // middleware: "notAuthedUserMiddleware",

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      contactData: 'contactUsData/contactUsData',
    }),
    // End:: Vuex Getters

    isAuthContenetAvailable() {
      return !!this.contactData?.auth_side_content
    },
  },

  watch: {
    profileTabsDrawerIsActive(newVal) {
      let screenBreakPoint = window.matchMedia('(max-width: 1000px)').matches
      if (screenBreakPoint) {
        newVal
          ? (document.documentElement.style.overflowY = 'hidden')
          : (document.documentElement.style.overflowY = 'initial')
      }
    },
  },

  created() {
    // Start:: Get Contact Us Data To Be Global Across The App
    this.$store.dispatch('contactUsData/getContactData')
    // End:: Get Contact Us Data To Be Global Across The App
  },
}
</script>

<style lang="scss">
.profile_page_content_wrapper {
  padding-block: $section_block_padding * 1.5 $section_block_padding;
  position: relative;
  top: 0;
  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );

  .container {
    @include flex(center, center);
    .toggle_profile_taps_btn {
      display: none;
    }
    .user_profile_wrapper {
      width: 100%;
      @include flex(space-between, flex-start);
      .profile_views_container {
        position: relative;
        width: 69%;
        padding: 3.5rem 2rem;
        background-color: var(--theme_main_bg);
        border-radius: 8px;
        transition: all 0.3s linear;
        .main_loader_wrapper {
          position: absolute;
          border-radius: 10px;
          z-index: 2;
          @include simpleShadow;
        }

        &.dashboard_view {
          padding: 0;
        }

        .tap_title {
          margin-block-end: 2.5rem;
          font-size: 1.2rem;
          font-family: $bold_font;
        }
      }

      .v-data-table {
        .v-data-table__wrapper {
          border-radius: 8px;
          @include simpleShadow;
          overflow: hidden;

          .v-data-table-header {
            background-color: var(--main_theme_clr);
            border: 1px solid var(--main_theme_clr);
            border-radius: 10px 10px 0 0;
            tr {
              th {
                text-align: center !important;
                span {
                  text-transform: uppercase;
                  font-size: 0.9rem;
                  color: var(--white);
                  font-family: $regular_font;
                }
              }
            }

            @media (max-width: 650px) {
              display: none;
            }
          }

          tbody {
            border: 1px solid var(--border_clr);
            border-top: none;
            tr {
              border-bottom: 1px solid var(--border_clr);
              &:last-of-type {
                border-bottom: none;
                border-radius: 0 0 12px 12px;
                overflow: hidden;
              }
              td {
                padding: 1.5rem 0.8rem !important;
                border-bottom: none !important;
                font-size: 0.85rem !important;
                &.v-data-table__mobile-row {
                  border-block-end: 1px solid rgba(0, 0, 0, 0.03);
                }
                .download_file {
                  svg,
                  i {
                    font-size: 1.2rem;
                    color: var(--main_theme_clr);
                  }
                }
                .status {
                  display: inline-block;
                  min-width: 85px;
                  text-align: center;
                  padding: 6px 10px;
                  font-size: 14px;
                  font-family: $medium_font;
                  color: var(--white);
                  border-radius: 8px;
                  border: none;
                  &.approved {
                    background-color: var(--main_theme_clr);
                  }
                  &.pending {
                    background-color: var(--gold);
                  }
                  &.disapproved {
                    background-color: var(--light_red);
                  }
                  // &.has_complaint {
                  //   color: var(--theme_text_clr);
                  //   background-color: var(--light_gray);
                  // }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1000px) {
  .profile_page_content_wrapper {
    .container {
      padding-block: $section_block_padding * 0.2 $section_block_padding * 0.3;
      margin-top: 0;
      flex-direction: column;
      align-items: flex-start;
      .toggle_profile_taps_btn {
        display: block;
        padding: 6px;
        margin-bottom: 30px;
        width: 38px;
        height: 38px;
        background-color: var(--theme_main_bg);
        border-radius: 5px;
        @include flex(center, center);
      }
      .user_profile_wrapper {
        .profile_views_container {
          width: 100%;
        }
      }
    }
  }
}

@media (min-width: 850px) and (max-width: 1100px) {
}

@media (min-width: 1100px) and (max-width: 1670px) {
}
</style>
