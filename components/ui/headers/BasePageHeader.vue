<template>
  <div class="container-fluid">
    <div
      class="page_header_wrapper"
      :style="{backgroundImage: `url(${backgroundImage})`}"
    >
      <div class="overlay">
        <h1 class="header_title">{{title}}</h1>
        <p class="header_desc">{{description}}</p>
        <form
          class="page_search_wrapper"
          @submit.prevent="fireFilterByKeyword"
          v-if="searchIsAvailable"
        >
          <div class="form-group col-lg-5 m-auto">
            <button>
                <img
                  src="@/assets/media/icons/ui_icons/search.svg"
                  alt="search icon"
                  width="22"
                  height="22"
                  loading="lazy"
                >
            </button>
            <input
              type="text"
              class="form-control"
              :placeholder="$t('FORMS.Placeholders.eventsSearch')"
              v-model="searchKeyword"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePageHeader",

  emits: ["fireSearchInput"],

  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    searchIsAvailable: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      searchKeyword: this.$route.query.keyword,
    }
  },

  methods: {
    fireFilterByKeyword() {
      this.$emit("fireSearchInput", this.searchKeyword);
    },
  }
}
</script>

<style lang="scss" scoped>
.page_header_wrapper {
  position: relative;
  height: 280px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin-bottom: 80px;
  .overlay {
    position: absolute;
    inset: 0;
    padding: 15px;
    @include flex(center, center, column);
    row-gap: 20px;
    backdrop-filter: blur(2px);
    background-color: rgba(41, 0, 73, 0.3);
    border-radius: 10px;
    z-index: 1;
    .header_title {
      // margin-bottom: 1.5rem;
      font-family: $semi_bold_font;
      font-size: 1.8rem;
      color: var(--white);
    }
    .header_desc {
      text-align: center;
      font-size: 1rem;
      line-height: 1.7;
      color: var(--white);
      opacity: 0.7;
    }
    .page_search_wrapper {
      position: absolute;
      bottom: -29px;
      left: 50%;
      transform: translateX(-50%);
      inline-size: 95%;
      margin: auto;
      .form-group {
        position: relative;
        padding: 5px 20px;
        background-color: var(--white);
        @include flex(center, center);
        border-radius: 8px;
        @include simpleShadow;
        .form-control {
          border: none;
          padding-block: 0.6rem;
          font-weight: 500;
          font-size: 1rem;
          color: var(--theme_text_clr);
          &::placeholder {
            font-weight: 400;
            font-size: 1rem;
            color: var(--light_theme_text_clr);
            margin-inline-start: 0.5rem;
          }
          &:focus {
            box-shadow: 0 1px 150px 0 rgba(0, 0, 168, 0.08);
          }
        }
        img {
          filter: contrast(0.2);
        }
      }
    }
  }

  @include media(md) {
    height: 250px;
    margin-bottom: 10px;
    .overlay {
      .header_title {
        font-size: 1.5rem;
        text-align: center;
      }
      .page_search_wrapper {
        inline-size: 80%;
      }
    }
  }
}
</style>
