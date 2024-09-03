<template>
  <section class="golden_campaign_section_content_wrapper">
    <h2
      class="section_title"
      v-html="$t('TITLES.GoldenCampaignSec.title')"
    ></h2>

    <div class="container">
      <!-- <pre dir="ltr">
        TEST:: {{companies}}
      </pre> -->

      <div class="companies_content_wrapper">
        <CategoriesButtonsCarousel
          :isWaitingCategoryClickApiResponse="isWaitingApiResponse"
          @finishCategoriesFetching="categoriesAreLoaded = true"
          @selectCategory="getCompaniesBySelectedCategory"
        />

        <div class="row" v-if="categoriesAreLoaded">
          <div
            class="col-lg-4"
            v-for="(item, index) in campaignItemsWithPlaceholders"
            :key="item.id"
          >
            <GoldenCampaignCard
              v-if="item.type == 'real_data'"
              :campaignData="item"
              data-aos="fade-up"
              data-aos-duration="400"
              :data-aos-delay="index * 400"
            />

            <GoldenCampaignPlaceholderCard
              data-aos="fade-up"
              data-aos-duration="400"
              :data-aos-delay="index * 400"
              v-else
            />
          </div>
        </div>

        <div class="wrapper">
          <nuxt-link
            class="view_all_route"
            :to="localePath('/companies?page=1')"
          >
            {{ $t('BUTTONS.showAll') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CategoriesButtonsCarousel from '@/components/carousels/CategoriesButtonsCarousel.vue'
import GoldenCampaignCard from '@/components/ui/cards/campaigns/GoldenCampaignCard.vue'
import GoldenCampaignPlaceholderCard from '@/components/ui/cards/campaigns/GoldenCampaignPlaceholderCard.vue'

export default {
  name: 'GoldenCampaignSection',

  components: {
    CategoriesButtonsCarousel,
    GoldenCampaignCard,
    GoldenCampaignPlaceholderCard,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      categoriesAreLoaded: false,
      // End:: Loaders Controlling Data

      // Start:: Companies Data
      companies: [],
      // End:: Companies Data
    }
  },

  computed: {
    // Start:: Campaign Items With Placeholders
    campaignItemsWithPlaceholders() {
      let campaignItemsListWithFixedType = this.companies.map((item) => {
        return {
          id: item?.company?.id,
          image: item?.company?.image,
          name: item?.company?.title,
          website: item?.company?.link,
          rate: item?.company?.rate,
          type: 'real_data',
        }
      })

      let fixedLength = 6
      let campaignItemsLength = campaignItemsListWithFixedType.length
      let placeholdersCount = fixedLength - campaignItemsLength

      if (placeholdersCount > 0) {
        let placeholders = []
        for (let i = 0; i < placeholdersCount; i++) {
          placeholders.push({
            id:
              Math.random().toString(36).substring(2) +
              new Date().getTime().toString(36),
            type: 'placeholder',
          })
        }
        return [...campaignItemsListWithFixedType, ...placeholders]
      } else {
        return this.companies
      }
    },
    // End:: Campaign Items With Placeholders
  },

  methods: {
    // Start:: Get Companies By Selected Category
    async getCompaniesBySelectedCategory(selectedCategoryId) {
      this.isWaitingApiResponse = true
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'top_companies',
          params: {
            category_id: selectedCategoryId,
          },
        })
        // ********** End:: Implement Request ********** //
        this.isWaitingApiResponse = false
        this.companies = res.data.data
      } catch (err) {
        this.isWaitingApiResponse = false
        console.log(err.response.data.message)
      }
    },
    // End:: Get Companies By Selected Category
  },
}
</script>

<style lang="scss">
.golden_campaign_section_content_wrapper {
  padding-block: $section_block_padding;
  background-color: var(--soft_main_theme_clr);
  @include flex(center, center, column);
  row-gap: 1rem;
  overflow: hidden;

  .section_title {
    @include font($semi_bold_font, 1.6rem, var(--black));
    text-transform: capitalize;
    text-align: center;
    line-height: 1.8;
    max-width: 50%;

    span {
      display: inline-block;
      margin-inline: 0.3rem;
      text-align: center;
      padding: 0.2rem 1rem;
      @include font($medium_font, 1.4rem);
      color: var(--white);
      background-color: var(--main_theme_clr);
      border-radius: 8px;
    }
  }

  .companies_content_wrapper {
    padding: 2rem;
    background-color: var(--theme_main_bg);
    border-radius: 8px;

    .row {
      margin-block-start: 2rem;
    }

    .wrapper {
      margin-block: 2rem 1rem;
      @include flex(center, center);
      .view_all_route {
        @include primaryBtnStyle;
      }
    }
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.8;
    .section_title {
      font-size: 1.4rem;
      max-width: 95%;
    }

    .companies_content_wrapper {
      padding: 1.5rem;
    }
  }
}
</style>
