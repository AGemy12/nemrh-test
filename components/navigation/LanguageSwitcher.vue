<template>
  <div class="language_switcher_wrapper">
    <v-menu content-class="language_switcher_dropdown" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <button v-bind="attrs" v-on="on" class="lang_switcher_btn">
          <i class="fa-solid fa-angle-down"></i>
          <span v-if="$i18n.locale === 'ar'"> Ar </span>
          <span v-else-if="$i18n.locale === 'en'"> En </span>
        </button>
      </template>

      <v-list>
        <v-list-item v-for="item in $i18n.locales" :key="item.code">
          <nuxt-link
            :to="switchLocalePath(item.code)"
            :class="{
              active_locale: item.code == $i18n.locale,
            }"
          >
            <span v-if="item.code === 'ar'"> Ar </span>
            <span v-else-if="item.code === 'en'"> En </span>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
}
</script>

<style lang="scss">
.lang_switcher_btn {
  height: unset !important;
  min-width: unset !important;
  padding: 0 !important;
  @include flex(center, center);
  column-gap: 5px;
  color: var(--theme_text_clr);
  @include font($bold_font, 18px);
  margin-inline: 0;
  @include transitioning(0.3s);

@include media(lg){
  font-size: 1rem;
  margin-inline: .5rem;
  padding-inline-end: 0 !important;
}

  &:hover {
    color: var(--main_theme_clr);
  }
  img {
    border-radius: 50%;
  }
  i,
  svg {
    font-size: 11px;
  }
}

.reset_borders {
  & + .lang_switcher_btn {
    border-inline-end: none;
  }
}

.language_switcher_dropdown {
  border-radius: 8px;
  box-shadow: 0 0 10px var(--simple_shadow_clr);
  .v-list {
    box-shadow: none !important;
    .v-list-item {
      min-height: unset !important;
      padding-block: 4px;
      border-bottom: 1px solid var(--border-clr);
      @include flex(flex-start, center);
      column-gap: 6px;
      a {
        display: inline-block;
        width: 100%;
        @include font($bold_font, 14px);
        @include transitioning(0.3s);
        &.nuxt-link-exact-active,
        &.active,
        &:hover {
          color: var(--main_theme_clr);
        }
        &.active_locale {
          position: relative;
          padding-inline: 12px;
          &:after {
            content: '\f00c';
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
            position: absolute;
            top: 0;
            @include rtl(left, -5px, auto);
            @include rtl(right, auto, -5px);
          }
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