<template>
  <section
    :class="[
      'search_section_content_wrapper',
      isHeroPath ? 'search_section_hero' : null,
    ]"
    id="hero"
  >
    <div class="wrapper">
      <h1 class="section_title">
        <p v-html="$t('TITLES.SearchSec.title')"></p>
        <a href="subscriptions">
          {{ $t('BUTTONS.buttonClick') }}
        </a>
      </h1>

      <p
        v-if="displayDescription"
        class="section_desc"
        :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
      >
        {{ $t('TITLES.SearchSec.mainDesc') }}
        <span v-html="$t('TITLES.SearchSec.preDesc')"> </span>
      </p>
      <form class="search_form_wrapper" @submit.prevent="handelSearch">
        <div class="form-group col-lg-6">
          <img
            src="@/assets/media/icons/ui_icons/search.svg"
            alt="search icon"
            width="22"
            height="22"
            loading="lazy"
          />
          <input
            type="text"
            class="form-control"
            :placeholder="$t('FORMS.Placeholders.browseCompanies')"
            v-model="searchKeyword"
          />
          <base-button
            :btnText="$t('BUTTONS.search')"
            styleType="primary_btn"
          />
        </div>
        <button
          v-if="searchKeyword"
          type="button"
          class="clear_search_input_btn"
          @click="clearSearchInputValue"
        >
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </form>
      <BannerUnderSearchEngine :searchAdImage="searchAdImage" :path="path" />
    </div>
  </section>
  <!-- <GlobalCaruosel /> -->
</template>

<script>
import BannerUnderSearchEngine from '../banners/BannerUnderSearchEngine.vue'

export default {
  name: 'GlobalSearchSection',

  emits: ['onFireSearch', 'getAllDataAgain'],

  props: {
    displayDescription: {
      type: Boolean,
      default: true,
    },
    searchAdImage: {
      type: String,
    },
    path: {
      type: String,
    },
  },

  components: {
    BannerUnderSearchEngine,
  },

  data() {
    return {
      // Start:: Search Keyword Data
      searchKeyword: this.$route.query.search || null,
      isHeroPath:
        this.$route.fullPath === '/ar' || this.$route.fullPath === '/en',

      // End:: Search Keyword Data
    }
  },

  watch: {
    '$route.path'(newPath) {
      this.isHeroPath = newPath === '/'
    },
    // Start:: Search Keyword Query Param Watcher
    ['$route.query.search'](newVal) {
      if (!newVal) {
        this.searchKeyword = null
      }
    },
    // End:: Search Keyword Query Param Watcher
  },

  methods: {
    addProtocol(link) {
      if (link && !/^https?:\/\//i.test(link)) {
        return `https://${link}`
      }
      return link
    },

    // Start:: Pass Search Keyword Data To Parent Component
    handelSearch() {
      if (!this.$route.path.includes('/companies')) {
        this.$router.replace({
          path: this.localePath(`/companies`),
          query: {
            page: 1,
            search: this.searchKeyword,
          },
        })
      } else {
        this.$router.replace({
          query: {
            search: this.searchKeyword,
          },
        })
      }
      this.$emit('onFireSearch', this.searchKeyword)
    },
    // End:: Pass Search Keyword Data To Parent Component

    // Start:: Clear Search Input Value
    clearSearchInputValue() {
      if (this.$route.path.includes('/companies')) {
        this.$router.replace({
          path: this.localePath(`/companies`),
          query: {
            page: 1,
            filter_category: null,
          },
        })

        this.$emit('getAllDataAgain')
      }
      this.searchKeyword = null
    },
    // End:: Clear Search Input Value
  },
}
</script>

<style lang="scss">
.search_section_hero {
  background-image: url('../../assets/media/images/hero.png');
  background-position: center center;
  background-size: cover;
}

.search_section_content_wrapper {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
  }

  .wrapper {
    padding-top: 7rem;
    padding-inline: 4rem;
    padding-bottom: 1.5rem;
    position: relative;
    @media (min-width: 1601px) {
      padding-top: 9rem;
    }
    @media (max-width: 480px) {
      padding-bottom: 0.5rem !important;
    }
    @include flex(center, center, column);
    animation: fadeIn 1s linear;
    .section_title {
      @include font($bold_font, 1.8rem);
      text-transform: capitalize;
      @include flex(center, center);
      column-gap: 0.8rem;
      p {
        color: var(--theme_text_clr);
      }
      span,
      a {
        position: relative;
        text-decoration: none;
        text-align: center;
        padding-block: 0.2rem;
        @include rtl(padding-inline, 1.4rem 45px, 45px 1.4rem);
        @include font($medium_font, 1.4rem);
        color: var(--white);
        background-color: var(--main_theme_clr);
        border-radius: 8px;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          @include rtl(left, auto, 10px);
          @include rtl(right, 10px, auto);
          display: block;
          @include size(28px, 28px);
          background-image: url('@/assets/media/icons/ui_icons/hand_pointing.svg');
          background-size: contain;
        }
      }
    }
    .section_desc {
      margin-block: 1rem !important;
      padding: 1rem !important;
      background-color: rgba(255, 255, 255, 0.8);
      border: 2px solid var(--main_theme_clr);
      color: var(--main_theme_clr);
      line-height: 2.5;

      font-size: 1rem;
      font-weight: bold;
      border-radius: 5px;
      text-align: center;
      @media (max-width: 450px) {
        margin-block: 0.5rem !important;
      }
      & > span {
        display: block;
        width: fit-content;
        color: var(--white);
        padding: 8px;
        background-color: var(--main_theme_clr);
        margin: 10px auto;
        border-radius: 8px;
      }
    }

    .search_form_wrapper {
      @include flex(center, center);
      column-gap: 1rem;
      inline-size: 100%;
      .form-group {
        position: relative;
        padding-inline: 7px 20px;
        padding-block: 4px;
        background-color: var(--theme_main_bg);
        border: 1px solid var(--border_clr);
        border-radius: 5rem;
        @include flex(center, center);
        img {
          opacity: 0.5;
        }
        .form-control {
          border: none;
          box-shadow: none;
          outline: none;
          padding-block: 0.6rem;
          @include font($medium_font, 1rem);
          &::placeholder {
            font-weight: 400;
            font-size: 1rem;
            color: var(--mid_gray);
            margin-inline-start: 0.5rem;
          }
        }
        button {
          border-radius: 5rem;
          padding: 0.3rem 1.5rem;
          font-size: 0.8rem;
          min-width: unset;
        }
      }
      .clear_search_input_btn {
        svg,
        i {
          color: var(--mid_red);
          font-size: 1.3rem;
        }
      }
    }
  }
  @include media(md) {
    .wrapper {
      padding-inline: 1.5rem;
      padding-bottom: 0.5rem;
      flex-wrap: wrap;
      text-align: center;

      .section_title {
        font-size: 1.4rem;
        line-height: 1.6;
        flex-wrap: wrap;
        row-gap: 1rem;
        text-align: center;

        span {
          padding: 0.2rem 1.2rem;
          @include rtl(padding, 0.2rem 2.5rem, 0.2rem 1.2rem);
          font-size: 1.1rem;
        }
      }

      .section_desc {
        max-width: 100%;
        padding: 0.5rem !important;
        font-size: 0.85rem;
        line-height: 1.7;
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
