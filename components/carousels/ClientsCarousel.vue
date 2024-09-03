<template>
  <div class="clients_carousel_wrapper">
    <!-- Start:: Carousel -->
    <client-only>
      <swiper-carousel
        class="clients_carousel"
        :options="SwiperOptions"
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
          <div class="client_image_card">
            <img
              :src="item.image"
              :alt="item.alt_img"
              width="60"
              height="60"
              loading="lazy"
            />
          </div>
        </swiper-slide>
      </swiper-carousel>
    </client-only>
    <!-- End:: Carousel -->
  </div>
</template>

<script>
export default {
  name: 'ClientsCarousel',

  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      SwiperOptions: {
        grabCursor: true,
        loop: true,
        spaceBetween: 25,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
          },
          850: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 35,
          },
        },
      },
    }
  },
}
</script>

<style lang="scss">
.clients_carousel_wrapper {
  .clients_carousel {
    .slide_wrapper {
    .client_image_card {
        inline-size: 100%;
        block-size: 5rem;
        img {
          inline-size: 100%;
          block-size: 100%;
          aspect-ratio: 3/2;
          object-fit: contain;
          mix-blend-mode: color-burn;
        }
      }
    }
  }
}
</style>