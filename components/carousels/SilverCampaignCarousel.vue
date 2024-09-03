<template>
  <div class="silver_campaign_carousel_wrapper">
    <client-only>
        <swiper-carousel
          class="silver_campaign_carousel"
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
            <SilverCampaignCard :campaignData="item" />
          </swiper-slide>
        </swiper-carousel>
      </client-only>
  </div>
</template>

<script>
  import SilverCampaignCard from '@/components/ui/cards/campaigns/SilverCampaignCard.vue';

  export default {
    name: "SilverCampaignCarousel",

    components: {
      SilverCampaignCard,
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
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            850: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          },
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
.silver_campaign_carousel_wrapper {
  width: 100%;
  position: relative;
  padding-block: $section_block_padding * 0.4;
  padding-inline: 20px;
  overflow: hidden;
  .silver_campaign_carousel {
    margin-bottom: 30px;
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.3;
    padding-inline: 10px;
  }
}
</style>