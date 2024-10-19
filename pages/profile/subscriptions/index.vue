<template>
  <section class="subscriptions_content_wrapper">
    <MainLoader v-if="pageIsLoading" />

    <template v-else>
      <!-- Start:: Campaigns Subscriptions -->
      <div class="wrapper">
        <h1 class="tap_title">
          {{ $t('TITLES.Profile.campaignsSubscriptions') }}
        </h1>

        <v-data-table
          class="add_requests_table"
          :loading-text="$t('TABLES.loadingData')"
          :headers="headers"
          :items="campaignSubscriptions"
          :items-per-page="-1"
          :hide-default-footer="true"
        >
          <!-- Start:: No Data State -->
          <template v-slot:no-data>
            <div class="no_data_message">
              <div class="image_wrapper">
                <img
                  src="@/assets/media/images/subscribe.svg"
                  alt="not subscribed"
                  width="150"
                  height="150"
                  loading="lazy"
                />
              </div>

              <div class="text_wrapper">
                <h3 class="message_title">{{ $t('TITLES.notSubscribed') }}</h3>
              </div>

              <nuxt-link :to="localePath('/companies?page=1')">
                {{ $t('BUTTONS.subscribeCampaign') }}
              </nuxt-link>
            </div>
          </template>
          <!-- Start:: No Data State -->

          <!-- Start:: Status -->
          <template v-slot:[`item.bundle.expired_at`]="{ item }">
            <span class="date">
              {{ item.expire_at }}
            </span>
          </template>
          <!-- End:: Status -->

          <!-- Start:: Status -->
          <template v-slot:[`item.status_trans`]="{ item }">
            <span class="status" :class="item.status">
              {{ item.status_trans }}
            </span>
          </template>
          <!-- End:: Status -->
        </v-data-table>
      </div>
      <!-- End:: Campaigns Subscriptions -->

      <!-- Start:: Messaging Subscriptions -->
      <div class="wrapper">
        <h2 class="tap_title">
          {{ $t('TITLES.Profile.messagingSubscriptions') }}
        </h2>

        <v-data-table
          class="add_requests_table"
          :loading-text="$t('TABLES.loadingData')"
          :headers="headers"
          :items="messageSubscriptions"
          :items-per-page="-1"
          :hide-default-footer="true"
        >
          <!-- Start:: No Data State -->
          <template v-slot:no-data>
            <div class="no_data_message">
              <div class="image_wrapper">
                <img
                  src="@/assets/media/images/subscribe.svg"
                  alt="not subscribed"
                  width="150"
                  height="150"
                  loading="lazy"
                />
              </div>

              <div class="text_wrapper">
                <h3 class="message_title">{{ $t('TITLES.notSubscribed') }}</h3>
              </div>

              <nuxt-link :to="localePath('/subscriptions')">
                {{ $t('BUTTONS.pricing') }}
              </nuxt-link>
            </div>
          </template>
          <!-- Start:: No Data State -->

          <!-- Start:: Status -->
          <template v-slot:[`item.status_trans`]="{ item }">
            <span class="status" :class="item.status">
              {{ item.status_trans }}
            </span>
          </template>
          <!-- End:: Status -->
        </v-data-table>
        <!-- <div class="subscribed_package_card">
          <h3 class="package_title"> الباقة البرونزية </h3> 
          <p class="package_desc"> مناسبة للاشخاص الراغبين في الحصول على عروض اسعار من الشركات او استفسار عن خدمة او منتج بنقرة واحدة </p> 
        </div> -->
      </div>
      <!-- End:: Messaging Subscriptions -->
    </template>
  </section>
</template>

<script>
import MainLoader from '@/components/ui/MainLoader.vue'

export default {
  name: 'Subscriptions',

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Profile.subscriptions'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Profile.subscriptions'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Profile.subscriptions'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Subscriptions Page Description',
        },
      ],
    }
  },

  components: {
    MainLoader,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      pageIsLoading: true,
      // End:: Loaders Controlling Data

      // Start:: Subscriptions Data
      messageSubscriptions: null,
      campaignSubscriptions: null,
      // End:: Subscriptions Data

      // Start:: Table Data
      headers: [
        {
          text: this.$t('TABLES.package'),
          align: 'center',
          value: 'bundle.title',
          width: 120,
          sortable: false,
        },
        {
          text: this.$t('TABLES.packageDesc'),
          align: 'center',
          value: 'bundle.desc',
          width: 250,
          sortable: false,
        },
        {
          text: this.$t('TABLES.subscriptionDate'),
          align: 'center',
          value: 'bundle.created_at',
          width: 120,
          sortable: false,
        },
        {
          text: this.$t('TABLES.subscriptionExpireDate'),
          align: 'center',
          value: 'bundle.expired_at',
          width: 120,
          sortable: false,
        },
        {
          text: this.$t('TABLES.status'),
          align: 'center',
          value: 'status_trans',
          width: 100,
          sortable: false,
        },
      ],
      // End:: Table Data
    }
  },

  methods: {
    // Start:: Get Subscriptions
    async getSubscriptions() {
      const [messagingSubscriptionsRes, campaignSubscriptionsRes] =
        await Promise.all([
          this.$axiosRequest.get('profile/message-subscriptions'),
          this.$axiosRequest.get('profile/ad-subscriptions'),
        ])

      this.pageIsLoading = false
      this.messageSubscriptions = messagingSubscriptionsRes.data.data
      this.campaignSubscriptions = campaignSubscriptionsRes.data.data
    },
    // End:: Get Subscriptions
  },

  created() {
    // Start:: Fire Methods
    this.getSubscriptions()
    // End:: Fire Methods
  },
}
</script>

<style lang="scss" scoped>
.subscriptions_content_wrapper {
  .main_loader_wrapper {
    min-height: 500px;
    max-height: 500px;
  }
  .wrapper {
    &:first-of-type {
      margin-block-end: 3rem;
    }

    .tap_title {
      color: var(--main_theme_clr);
      margin-block-end: 1.5rem !important;
    }
    .no_data_message {
      @include flex(center, center, column);
      row-gap: 1.5rem;
      .text_wrapper {
        width: 75%;
        text-align: center;
        .message_title {
          font-size: 1.2rem;
          font-family: $semi_bold_font;
        }
      }

      a {
        @include primaryBtnStyle;
      }
    }
    .subscribed_package_card {
      padding: 1.5rem;
      border: 1px solid var(--border_clr);
      border-radius: 8px;
      .package_title {
        margin-block-end: 1rem;
        font-size: 1.2rem;
        font-family: $semi_bold_font;
      }
      .package_desc {
        font-size: 0.95rem;
        color: var(--light_theme_text_clr);
      }
    }
  }
  @include media(md) {
    .wrapper {
      .no_data_message {
        .text_wrapper {
          width: 100%;
        }
      }
    }
  }
}
</style>
