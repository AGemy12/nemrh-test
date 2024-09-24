<template>
  <section class="select_package_step_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <div class="step_title_wrapper">
        <h2 class="global_title">
          {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepOneTitle') }}
        </h2>
        <h3 class="step_title">{{ companyTitle }}</h3>

        <h4 class="step_subtitle">
          {{ $t('CYCLESTEPS.Advertisements.AdvertisementsStepOneSubTitle') }}
        </h4>
      </div>

      <v-radio-group v-model="selectedPackage">
        <div class="row">
          <template>
            <div
              class="col-12 col-md-6"
              v-for="item in packages"
              :key="item.id"
            >
              <v-radio :value="item.id" :disabled="item.disabled">
                <template v-slot:label>
                  <CampaignPackageCard
                    :packageData="item"
                    :displaySubscribeBtn="false"
                    :src-image="getImageForPackage(item.id)"
                  />
                  <div class="disapled_overlay" v-if="item.disabled">
                    <p v-if="item.disable_reason">{{ item.disable_reason }}</p>
                  </div>
                </template>
              </v-radio>
            </div>
          </template>
        </div>
      </v-radio-group>

      <div class="btns_wrapper">
        <base-button
          :btnText="$t('BUTTONS.next')"
          styleType="primary_btn"
          @fireClick="navigateToNextStep"
          :disabled="!selectedPackage"
        />
      </div>
    </template>
  </section>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue'
import CampaignPackageCard from '@/components/ui/cards/packages/PackageCard.vue'

export default {
  name: 'SelectPackageStep',

  emits: ['fireNavigateToNextStep', 'fireCompanyTitle'],

  components: {
    MainLoader,
    CampaignPackageCard,
  },

  props: {
    companyTitle: {
      type: String,
    },
  },
  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      // End:: Loaders Controlling Data

      // Start:: Campaign Packages
      packages: [],
      // End:: Campaign Packages

      // Start:: Selected Package
      selectedPackage: null,
      // End:: Selected Package
      adPrice: null,
      companyTitle: {},
    }
  },

  computed: {
    adsPositionSourses() {
      return [
        {
          id: 4,
          srcImg: require('@/assets/media/ads-positions-images/advestement-square-rec.png'),
        },
        {
          id: 5,
          srcImg: require('@/assets/media/ads-positions-images/advestement-middel-page.png'),
        },
        {
          id: 6,
          srcImg: require('@/assets/media/ads-positions-images/advestement-below-page.png'),
        },
        {
          id: 7,
          srcImg: require('@/assets/media/ads-positions-images/advestement-below-search-engine.png'),
        },
      ]
    },
  },

  methods: {
    getImageForPackage(packageId) {
      const imageSource = this.adsPositionSourses.find(
        (source) => source.id === packageId
      )
      return imageSource
        ? imageSource.srcImg
        : require('@/assets/media/ads-positions-images/advestement-below-page.png')
    },

    // Start:: Get Packages
    async getPackages() {
      try {
        // ********** Start:: Implement Request ********** //
        let res = await this.$axiosRequest({
          method: 'GET',
          url: 'ad_bundles',
          params: {
            company_id: this.$route.params.companyId,
          },
        })
        // ********** End:: Implement Request ********** //
        this.pageIsLoading = false
        this.packages = res.data.data

        let companyRes = await this.$axiosRequest({
          method: 'GET',
          url: `companies/${this.$route.params.companyId}`,
        })

        this.companyTitle = companyRes.data.data.title

        this.$emit('fireCompanyTitle', this.companyTitle)
      } catch (err) {
        this.pageIsLoading = false
        console.log(err.response.data.message)
      }
    },

    // Start:: Pass Selected Package Data To Parent Component
    async navigateToNextStep() {
      try {
        let res = await this.$axiosRequest({
          method: 'GET',
          url: `bundles/${this.selectedPackage}`,
        })

        if (res.status === 200) {
          this.adPrice = res.data.data.price

          const selectedPackage = this.packages.find(
            (item) => item.id === this.selectedPackage
          )

          const selectedPackageTitle = selectedPackage.title
          const positionImageSrc = this.getImageForPackage(selectedPackage.id)
          this.$cookies.set('selectedPackageImage', positionImageSrc)

          this.$emit(
            'fireNavigateToNextStep',
            this.selectedPackage,
            selectedPackageTitle,
            this.adPrice
          )
        }
      } catch (err) {
        console.log(err.response.data.message)
      }
    },
    // End:: Pass Selected Package Data To Parent Component
  },

  created() {
    // Start:: Fire Methods
    this.getPackages()
    // End:: Fire Methods
  },
}
</script>

<style lang="scss">
.select_package_step_wrapper {
  position: relative;
  min-height: 420px;

  .main_loader_wrapper {
    position: absolute;
    min-height: 420px;
    z-index: 1;
  }

  .step_title_wrapper {
    margin-block-end: 2rem;
    .global_title {
      background-color: var(--deactive_button_bg);
      color: var(--main_theme_clr);
      width: fit-content;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      text-transform: capitalize;
    }
    .step_title {
      color: var(--white);
      width: fit-content;
      margin: 1rem auto 0 auto;
      padding: 10px;
      background-color: var(--main_theme_clr);
      font-size: 22px;
      border-radius: 5px;
      @media (max-width: 450px) {
        font-size: 20px;
      }
    }
    .step_subtitle {
      width: fit-content;
      margin-right: 0;
      font-size: 20px;
      @media (max-width: 450px) {
        font-size: 15px;
        margin: 20px 0;
      }
    }
  }

  .v-input--radio-group {
    .v-input__control {
      .v-input__slot {
        background-color: transparent !important;
        .v-input--radio-group__input {
          .v-radio {
            .v-input--selection-controls__input {
              display: none;
            }

            .v-label {
              position: relative;
              margin: 0 !important;
              .package_card_wrapper {
                border: 1px solid var(--light_border_clr);
                align-items: flex-start;
              }
              .disapled_overlay {
                padding: 1rem;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(19, 5, 47, 0.6);
                backdrop-filter: blur(3px);
                border-radius: 8px;
                @include flex(center, center);
                p {
                  @include font($semi-bold_font, 1.2rem, var(--white));
                  text-align: center;
                }
              }
            }

            &.v-item--active {
              .v-label {
                .package_card_wrapper {
                  background-color: var(--main_theme_clr);
                  border-color: transparent;
                  * {
                    color: var(--white);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .btns_wrapper {
    @include flex(flex-end, center);
    column-gap: 0.5rem;
  }
}
</style>
