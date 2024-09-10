<template>
  <div class="categories_buttons_carousel_wrapper">
    <!-- Start:: Categories Buttons Carousel -->
    <client-only>
      <swiper-carousel
        class="categories_buttons_carousel"
        :options="swiperOptions"
        :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
      >
        <swiper-slide
          class="slide_wrapper"
          v-for="item in categories"
          :key="item.id"
        >
          <base-button
            :class="{ active: selectedCategoryId == item.id }"
            :btnText="item.title"
            styleType="bordered_btn"
            @fireClick="handelCategorySelection(item.id)"
            :isLoading="
              selectedCategoryId == item.id && isWaitingCategoryClickApiResponse
            "
            :disabled="isWaitingCategoryClickApiResponse"
          />
        </swiper-slide>
      </swiper-carousel>
      <div class="swiper-scrollbar"></div>
    </client-only>
    <!-- End:: Categories Buttons Carousel -->
  </div>
</template>

<script>
export default {
  name: 'CategoriesButtonsCarousel',

  emits: ['finishCategoriesFetching', 'selectCategory'],

  props: {
    isWaitingCategoryClickApiResponse: {
      type: Boolean,
      required: true,
      default: true,
    },
    initialSelectedCategoryId: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      // Start::Categories Data
      categories: [],
      // End::Categories Data

      // Start:: Selected Category Data
      selectedCategoryId: this.initialSelectedCategoryId || null,
      // Start:: Selected Category Data

      // Start:: Swiper Carousel Data
      swiperOptions: {
        grabCursor: false,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },
        loop: false,
        autoplay: false,
        spaceBetween: 20,
        slidesPerView: 'auto',
        // breakpoints: {
        //   320: {
        //     slidesPerView: 3,
        //   },
        //   850: {
        //     slidesPerView: 4,
        //   },
        //   1024: {
        //     slidesPerView: 5,
        //   },
        // },
      },
      // End:: Swiper Carousel Data
    }
  },

  methods: {
    // Start:: Get Categories
    async getCategories() {
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'categories',
        })

        // ********** End:: Implement Request ********** //
        this.categories = res.data.data

        if (!this.initialSelectedCategoryId) {
          this.handelCategorySelection(res.data.data[0].id)
        } else {
          this.handelCategorySelection(this.initialSelectedCategoryId)
        }
        this.$emit('finishCategoriesFetching')
      } catch (err) {
        console.log(err.response.data.message)
      }
    },
    // End:: Get Categories

    // Start:: Handel Category Selection
    handelCategorySelection(categoryId) {
      // Set Selected Category Id To Toggle Category Button Active Class Using It
      this.selectedCategoryId = categoryId
      // Pass Selected Category Id To Parent Component To Get The Data Using It
      this.$emit('selectCategory', categoryId)
    },
    // End:: Handel Category Selection
  },

  created() {
    // Start:: Fire Methods
    this.getCategories()
    // End:: Fire Methods
  },
}
</script>

<style lang="scss">
@import '/node_modules/swiper/components/scrollbar/scrollbar.scss';

.categories_buttons_carousel_wrapper {
  .categories_buttons_carousel {
    .slide_wrapper {
      @include flex(center, center);
      width: fit-content;

      button {
        width: 100%;
        font-size: 0.85rem;
        font-family: $semi_bold_font;
        border-color: var(--light_border_clr);
        &:hover,
        &.active {
          color: var(--main_theme_clr);
          border-color: var(--main_theme_clr);
        }
      }
    }
  }
  .swiper-scrollbar {
    margin-top: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 7px;
  }
  .swiper-scrollbar-drag {
    background-color: var(--main_theme_clr);
  }
}
</style>
