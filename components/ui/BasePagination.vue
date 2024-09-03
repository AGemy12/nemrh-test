<template>
  <div class="pagination_wrapper">
    <v-pagination
      :value="value"
      @input="updateValue($event)"
      :length="length"
      :total-visible="visibleTabs"
      :prev-icon="$i18n.locale == 'ar' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'"
      :next-icon="$i18n.locale == 'ar' ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right'"
    />
  </div>
</template>

<script>
export default {
  name: 'BasePagination',

  emits: ['input'],

  props: {
    value: {
      required: true,
    },
    length: {
      type: Number,
      required: true,
      default: 10,
    },
    visibleTabs: {
      type: Number,
      required: true,
      default: 7,
    },
  },

  methods: {
    updateValue(e) {
      this.$emit('input', e)
    },
  },
}
</script>

<style lang="scss">
.pagination_wrapper {
  padding-block: 20px;
  @include flex(center, center);
  nav {
    // direction: ltr !important;
    .v-pagination {
      li {
        .v-pagination__navigation {
          box-shadow: none !important;
          background-color: var(--theme_main_bg) !important;
          border-color: var(--theme_main_bg) !important;
          i,
          svg {
            color: var(--theme_text_clr) !important;
            font-size: 16px;
          }
        }
        .v-pagination__item {
          box-shadow: none !important;
          border: none;
          border-radius: 2px;
          color: var(--theme_text_clr);
          font-size: 16px;
          font-family: $semi_bold_font;
          transition: all 0.4s linear;
          &:hover {
            background-color: var(--theme_second_bg) !important;
            color: var(--main_theme_clr) !important;
          }
          &.v-pagination__item--active {
            &.primary {
              background-color: var(--theme_second_bg) !important;
              border-color: var(--theme_second_bg) !important;
              color: var(--main_theme_clr) !important;
            }
          }
        }
        .v-pagination__more {
          color: var(--main_theme_clr);
          font-size: 30px;
        }
      }
    }
  }
}
#app.rtl {
  .v-pagination {
    .v-pagination__navigation {
      transform: rotate(180deg) !important;
    }
  }
}
</style>
