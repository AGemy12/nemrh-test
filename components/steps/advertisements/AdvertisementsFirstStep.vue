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
        v-for="item of adsPackages"
        :key="item.id"
        @itemSelected="handleSelectedItem"
        :packageData="item"
      />
    </div>
  </div>
</template>

<script>
import AdvertisementsFirstStepItem from './smallComp/AdvertisementsFirstStepItem.vue'
export default {
  data() {
    return {}
  },
  props: {
    adsPackages: {
      type: Array,
    },
  },
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
          srcImage: require('@/assets/media/advestement-below-search-engine.png'),
        },
        {
          id: 2,
          title: `${this.$t(
            'CYCLESTEPS.Advertisements.AdvertisementRectangulars'
          )}`,
          srcImage: require('@/assets/media/advestement-square-rec.png'),
        },
        {
          id: 3,
          title: `${this.$t(
            'CYCLESTEPS.Advertisements.AdvertisementMidPageSquare'
          )}`,
          srcImage: require('@/assets/media/advestement-middel-page.png'),
        },
        {
          id: 4,
          title: `${this.$t(
            'CYCLESTEPS.Advertisements.AdvertisementbottPageRectangular'
          )}`,
          srcImage: require('@/assets/media/advestement-below-page.png'),
        },
      ]
      return items
    },
  },
  methods: {
    handleSelectedItem(title) {
      this.$emit('adSelected', title) // تمرير العنوان المختار إلى المكون الأب
    },
  },
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
}
</style>
