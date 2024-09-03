<template>
  <section class="invoices_content_wrapper">
    <h1 class="tap_title"> {{$t("TITLES.Profile.invoices")}} </h1>

    <v-data-table 
      class="invoices_table" 
      :loading="isLoading" 
      :loading-text="$t('TABLES.loadingData')" 
      :headers="headers"
      :items="invoices" 
      :items-per-page="-1" 
      :hide-default-footer="true" 
    >
      <!-- Start:: No Data State -->
      <template v-slot:no-data>
        {{ $t("TABLES.NoData") }}
      </template>
      <!-- Start:: No Data State -->

      <!-- Start:: Price -->
      <template v-slot:[`item.price`]="{ item }">
        {{ item.price }} {{ $t("APP_CURRENCY") }}
      </template>
      <!-- End:: Price -->

      <!-- Start:: Download -->
      <template v-slot:[`item.link`]="{ item }">
        <a
          class="download_file"
          :href="item.link"
          target="_blank"
        >
          <i class="fa-solid fa-download"></i>
        </a>
      </template>
      <!-- End:: Download -->
    </v-data-table>

    <!-- Start:: Pagination -->
    <BasePagination 
      v-if="paginations.last_page > 1" 
      v-model="paginations.current_page" 
      :length="paginations.last_page"
      :visibleTabs="6" 
      @input="updateRouterQueryParam($event)" 
    />
    <!-- End:: Pagination -->
  </section>
</template>

<script>
import BasePagination from "@/components/ui/BasePagination.vue";

export default {
  name: "Invoices",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Profile.invoices'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Profile.invoices'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Profile.invoices'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Invoices Page Description',
        },
      ],
    }
  },

  components: {
    BasePagination,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isLoading: false, 
      // End:: Loaders Controlling Data

      // Start:: Invoices Data
      invoices: [],
      // End:: Invoices Data

      // Start:: Tickets Table Data
      headers: [
        {
          text: this.$t('TABLES.package'),
          align: 'center',
          value: 'bundle.title',
          width: 150,
          sortable: false,
        },
        {
          text: this.$t('TABLES.invoiceNumber'),
          align: 'center',
          value: 'inv_num',
          width: 120,
          sortable: false,
        },
        {
          text: this.$t('TABLES.date'),
          align: 'center',
          value: 'date',
          width: 120,
          sortable: false,
        },
        {
          text: this.$t('TABLES.cost'),
          align: 'center',
          value: 'price',
          width: 120,
          sortable: false,
        },
        {
          text: this.$t('TABLES.download'),
          align: 'center',
          value: 'link',
          width: 100,
          sortable: false,
        },
      ],
      // End:: Tickets Table Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data
    }
  },

  methods: {
    // Start:: Handel Pagination Query Params
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        }
      });
    },
    // End:: Handel Pagination Query Params

    // Start:: Get Page Data
    async getPageData() {
      this.isLoading = true;
      try {
        let res = await this.$axiosRequest({
          method: 'GET',
          url: `profile/invoices`,
        });
        this.isLoading = false;
        this.invoices = res.data.data;
      } catch (error) {
        this.isLoading = false;
        this.$izitoast.error({
          message: error.response.data.message,
        });
      }
    },
    // End:: Get Page Data
  },

  created() {
    // Start:: Fire Methods
    this.getPageData();
    // End:: Fire Methods
  },
}
</script>