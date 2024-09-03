<template>
  <v-menu :content-class="dropdownClass" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <button v-bind="attrs" v-on="on" class="dropdown_btn">
        <span> {{ title }} </span>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
    </template>

    <v-list>
      <v-list-item v-for="item in items" :key="item.id">
        <nuxt-link
          v-if="item.path"
          :to="localePath(item.path)"
        >
          <span> {{ item.title }} </span>
        </nuxt-link>
        
        <button @click="item.methodToFire" v-if="item.methodToFire">
          {{ item.title }}
        </button>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'BaseDropdown',

  props: {
    dropdownClass: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.dropdown_btn {
  @include solidBtnStyle;
  margin: 0 !important;
  padding: 7px 20px !important;
  background-image: unset;
  background-color: var(--white);
  @include flex(center, center);
  column-gap: 0.5rem;

  span {
    color: var(--theme_text_clr) !important;
  }
  i,
  svg {
    font-size: 0.8rem;
    color: var(--theme_text_clr) !important;
  }
  img {
    border-radius: 50%;
  }

  @include media(lg){
    font-size: 1rem;
    margin-inline: .5rem;
    padding-inline-end: 0 !important;
  }

  &:hover {
    color: var(--main_theme_clr);
  }
}

.reset_borders {
  & + .dropdown_btn {
    border-inline-end: none;
  }
}

.v-menu__content {
  border-radius: 8px;
  @include midShadow;
  .v-list {
    box-shadow: none !important;
    .v-list-item {
      min-height: unset !important;
      padding-block: 8px;
      border-bottom: 1px solid var(--border-clr);
      @include flex(flex-start, center);
      column-gap: 6px;
      a, button {
        display: inline-block;
        width: 100%;
        @include font($semi_bold_font, 0.8rem);
        @include transitioning(0.3s);
        &.nuxt-link-exact-active,
        &.active,
        &:hover {
          color: var(--main_theme_clr);
        }
      }
      &:last-of-type {
        color: var(--mid_red_clr);
        font-size: 13px;
      }
    }
  }
}
</style>