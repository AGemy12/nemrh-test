<template>
  <section class="profile_page_content_wrapper">
    <!-- ========== Start:: Page Content ========== -->
    <div class="container">
      <button
        class="toggle_profile_taps_btn"
        @click.stop="profileTabsDrawerIsActive = !profileTabsDrawerIsActive"
      >
        <i class="fas fa-bars"></i>
      </button>

      <div class="user_profile_wrapper">
        <ProfileTabs
          :class="{ active: profileTabsDrawerIsActive }"
          @closeProfileTabs="
            profileTabsDrawerIsActive = !profileTabsDrawerIsActive
          "
        />

        <div
          class="profile_views_container"
          :class="{ dashboard_view: $route.path.includes('/vendor-dashboard') }"
        >
          <NuxtChild />
        </div>
      </div>
    </div>
    <!-- ========== End:: Page Content ========== -->
  </section>
</template>

<script>
import ProfileTabs from '@/components/profile/ProfileSideNav.vue'

export default {
  name: 'ProfilePage',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  components: {
    ProfileTabs,
  },

  data() {
    return {
      // Start:: Profile Tabs Drawer Controle Data
      profileTabsDrawerIsActive: false,
      // Start:: Profile Tabs Drawer Controle Data
    }
  },

  middleware: 'notAuthedUserMiddleware',

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
}
</script>

<style lang="scss">
.profile_page_content_wrapper {
  padding-block: $section_block_padding * 1.5 $section_block_padding;
  background: linear-gradient(
    rgba(177, 162, 204, 0.6),
    rgba(177, 162, 204, 0.4),
    transparent
  );
  position: relative;
  top: 61px;
  padding-bottom: 0 !important;
  margin-bottom: 45px;
  display: block;
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
          overflow-y: hidden;
          &::-webkit-scrollbar {
            display: none;
          }

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
                  &.approved,
                  &.inprogress {
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
    padding-block: $section_block_padding * 0.2 $section_block_padding * 0.5;
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
