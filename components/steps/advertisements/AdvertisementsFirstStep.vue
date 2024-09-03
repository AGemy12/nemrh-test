<template>
  <div class="advertisements_first_step" id="advertisementsFirstStep">
    <h3 class="advertisements_first_step_head">
      {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepOneTitle') }}
    </h3>
    <h4>
      {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepOneSubTitle') }}
    </h4>
    <div class="advertisements_first_step_content">
      <AdvertisementsFirstStepItem
        v-for="item of advFirstStepItems"
        :key="item.id"
        :advertisement-item-title="item.title"
        :advertisement-item-image-scr="item.src"
      />
    </div>
  </div>
</template>

<script>
import AdvertisementsFirstStepItem from './smallComp/AdvertisementsFirstStepItem.vue'
export default {
  components: {
    AdvertisementsFirstStepItem,
  },
  computed: {
    advFirstStepItems() {
      const items = [
        {
          id: 1,
          title: `${this.$t(
            'CYCLESTEPS.Advertisements.AdvertisementBelowSearchEngine'
          )}`,
          src: `/_nuxt/assets/media/images/hero.png`,
        },
        {
          id: 2,
          title: `${this.$t(
            'CYCLESTEPS.Advertisements.AdvertisementRectangulars'
          )}`,
          src: `/_nuxt/assets/media/images/hero.png`,
        },
        {
          id: 3,
          title: `${this.$t(
            'CYCLESTEPS.Advertisements.AdvertisementMidPageSquare'
          )}`,
          src: `/_nuxt/assets/media/images/hero.png`,
        },
        {
          id: 4,
          title: `${this.$t(
            'CYCLESTEPS.Advertisements.AdvertisementbottPageRectangular'
          )}`,
          src: `/_nuxt/assets/media/images/hero.png`,
        },
      ]
      return items
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.advertisements_first_step {
  display: flex;
  gap: 20px;
  flex-direction: column;
  h3 {
    color: var(--white);
    width: fit-content;
    margin: 10px auto;
    padding: 10px;
    background-color: var(--main_theme_clr);
    font-size: 22px;
    border-radius: 5px;
    @media (max-width: 450px) {
      font-size: 20px;
    }
  }
  h4 {
    width: fit-content;
    margin-right: 0;
    font-size: 20px;
    @media (max-width: 450px) {
      font-size: 15px;
      margin: 20px 0;
    }
  }
  .advertisements_first_step_content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    @media (max-width: 1400px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
}
</style>
