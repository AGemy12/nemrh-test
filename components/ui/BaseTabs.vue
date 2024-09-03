<template>
  <div class="tabs_wrapper">
    <v-card>
      <v-tabs
        v-model="tab"
        show-arrows
        next-icon="fa-solid fa-caret-right"
        prev-icon="fa-solid fa-caret-left"
      >
        <v-tab
          v-for="item in tabsContent" :key="item.tab"
          @click="$emit('fireTabClick', $event)"
          :data-key-name="item.key_name"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabsContent" :key="item.tab">
          <v-card flat>
            <slot :name="item.key_name"> </slot>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "BaseTabs",

  emits: ["fireTabClick"],

  props: ["tabsContent"],

  data() {
    return {
      tab: null,
    };
  },
};
</script>


<style lang="scss">
.tabs_wrapper {
  & > .v-sheet {
    &.v-card {
      &:not(.v-sheet--outlined) {
        box-shadow: none !important;
      }
    }

    .v-tabs {
      padding-block: 15px 0;
      background: var(--theme_bg) !important;
      .v-tabs-bar {
        height: unset !important;
      }
      .v-item-group {
        background: var(--theme_bg) !important;
        .v-slide-group__wrapper {
          .v-slide-group__content {
            column-gap: 25px;
            border-bottom: 1px solid var(--border_clr);
            .v-tabs-slider-wrapper {
              display: none;
            }
            .v-tab {
              border-radius: 0px;
              padding: 8px 5px;
              color: var(--mid_gray);
              font-size: 14px;
              font-family: $semi_bold_font;
              border-bottom: 2px solid transparent;

              &::before,
              &::after {
                display: none !important;
              }

              &.v-tab--active {
                color: var(--main_theme_clr) !important;
                background-color: var(--theme_bg);
                border-color: var(--main_theme_clr);
                &::before,
                &::after {
                  display: none !important;
                }
              }
            }
          }
        }
      }
    }

    .v-window {
      .v-window__container {
        .v-window-item {
          & > .v-card {
            background: var(--theme_bg) !important;
            padding: 25px 5px;
            @include borderRadius(0);
          }
        }
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .tabs_wrapper {
    direction: ltr;
  }
}
</style>
