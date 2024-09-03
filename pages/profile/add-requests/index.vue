<template>
  <section class="invoices_content_wrapper">
    <h1 class="tap_title"> {{$t("TITLES.Profile.addRequests")}} </h1>

    <v-data-table 
      class="add_requests_table" 
      :loading="isLoading" 
      :loading-text="$t('TABLES.loadingData')" 
      :headers="headers"
      :items="requests" 
      :items-per-page="-1" 
      :hide-default-footer="true" 
    >
      <!-- Start:: No Data State -->
      <template v-slot:no-data>
        {{ $t("TABLES.NoData") }}
      </template>
      <!-- Start:: No Data State -->

      <!-- Start:: Status -->
      <template v-slot:[`item.status`]="{ item }">
        <span class="status" :class="item.status">
          {{ item.status_translated }}
        </span>
      </template>
      <!-- End:: Status -->
    </v-data-table>

    <!-- Start:: Pagination Modal -->
    <BasePagination 
      v-if="paginations.last_page > 1" 
      v-model="paginations.current_page" 
      :length="paginations.last_page"
      :visibleTabs="6" 
      @input="updateRouterQueryParam($event)" 
    />
    <!-- End:: Pagination Modal -->
  </section>
</template>

<script>
import BasePagination from "@/components/ui/BasePagination.vue";

export default {
  name: "addRequests",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.Profile.addRequests'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.Profile.addRequests'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.Profile.addRequests'),
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Add Requests Page Description',
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

      // Start:: Requests Data
      requests: [],
      // End:: Requests Data

      // Start:: Table Data
      headers: [
        {
          text: this.$t('TABLES.requestType'),
          align: 'center',
          value: 'type_translated',
          width: 150,
          sortable: false,
        },
        {
          text: this.$t('TABLES.companyName'),
          align: 'center',
          value: 'company',
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
          text: this.$t('TABLES.status'),
          align: 'center',
          value: 'status',
          width: 120,
          sortable: false,
        },
      ],
      // End:: Table Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data
    }
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.getPageData();
      // Scroll To Screen's Top After Paginate
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
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
          url: `profile/requests`,
        });
        this.isLoading = false;
        this.requests = res.data.data;
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