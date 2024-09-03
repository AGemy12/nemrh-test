<template>
  <div class="messaging_packages_carousel_wrapper">
    <client-only>
      <swiper-carousel
        class="messaging_packages_carousel"
        :options="swiperOption"
        :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
      >
        <swiper-slide
          class="slide_wrapper"
          v-for="(item, index) in carouselItems"
          :key="item.id"
          data-aos="fade-up"
          data-aos-duration="400"
          :data-aos-delay="index * 400"
        >
          <MessagingPackageCard :packageData="item" />
        </swiper-slide>
      </swiper-carousel>
    </client-only>
  </div>
</template>

<script>
import MessagingPackageCard from '@/components/ui/cards/packages/PackageCard.vue'

export default {
  name: 'MessagingPackagesCarousel',

  components: {
    MessagingPackageCard,
  },

  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      swiperOption: {
        grabCursor: true,
        loop: false,
        spaceBetween: 15,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          850: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          // 1366: {
          //   slidesPerView: 4,
          //   spaceBetween: 20,
          // },
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.messaging_packages_carousel_wrapper {
  width: 100%;
  position: relative;
  padding-inline: 20px;
  overflow: hidden;

  .messaging_packages_carousel {
    margin-bottom: 30px;
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.3;
    padding-inline: 10px;
  }
}
</style>
