<template>
  <section class="select_package_step_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <div class="step_title_wrapper">
        <span class="step_number"> 1 </span>
        <h2 class="step_title"> {{ $t("TITLES.CompaniesAndCampaignsForms.selectPackageStep") }} </h2>
      </div>
  
      <v-radio-group 
        v-model="selectedPackage" 
      >
        <div class="row">
          <div 
            class="col-lg-4"
            v-for="item in packages"
            :key="item.id"
          >
            <v-radio :value="item.id" :disabled="item.disabled">
              <template v-slot:label>
                <CampaignPackageCard 
                  :packageData="item" 
                  :displaySubscribeBtn="false"
                />
                <div class="disapled_overlay" v-if="item.disabled">
                  <p v-if="item.disable_reason"> {{item.disable_reason}} </p>
                </div>
              </template>
            </v-radio>
          </div>
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
import MainLoader from '@/components/ui/MainLoader.vue';
import CampaignPackageCard  from "@/components/ui/cards/packages/PackageCard.vue";

export default {
  name: "SelectPackageStep",

  emits: ['fireNavigateToNextStep'],

  components: {
    MainLoader,
    CampaignPackageCard,
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
    }
  },

  methods: {
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
        });
        // ********** End:: Implement Request ********** //
        this.pageIsLoading = false;
        this.packages = res.data.data;
      } catch (err) {
        this.pageIsLoading = false;
        console.log(err.response.data.message)
      }
    },
    // End:: Get Packages

    // Start:: Pass Selected Package Data To Parent Component
    navigateToNextStep() {
      this.$emit("fireNavigateToNextStep", this.selectedPackage);
    },
    // End:: Pass Selected Package Data To Parent Component
  },

  created() {
    // Start:: Fire Methods
    this.getPackages();
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
    @include flex(flex-start, center);
    column-gap: 0.8rem;
    .step_number {
      @include flex(center, center);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--main_theme_clr);
      font-size: 0.8rem;
      color: var(--white);
    }

    .step_title {
      width: calc(100% - 20px + 0.8rem);
      margin-block-end: 0 !important;
      font-size: 1rem;  
      font-family: $bold_font;
      line-height: 1.8;
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