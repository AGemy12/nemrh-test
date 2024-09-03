<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="700"
      class="select_address_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card>
        <div class="select_address_form_wrapper">
          <!-- ========== Start:: Modal Header ========== -->
          <div class="modal_header_wrapper">
            <h5> {{ $t("TITLES.selectAnotherAddress") }} </h5>
          </div>
          <!-- ========== End:: Modal Header ========== -->

          <!-- ========== Start:: Select Address form ========== -->
          <AddressCard
            v-for="item in dummyAddresses"
            :key="item.id"
            :addressData="item"
            :isActive="addressIsActive(item)"
            :actionsAvailable="false"
            @selectIAddress="setSelectedAddressValue"
          />
          <!-- ========== End:: Select Address form ========== -->

          <!-- ========== Start:: Modal Footer ========== -->
          <div class="modal_footer_wrapper">
            <base-button
              :btnText="$t('BUTTONS.cancel')"
              styleType="discard_btn"
              @fireClick="toggleModal"
            />
            <base-button
              :btnText="$t('BUTTONS.selectAddress')"
              styleType="primary_btn"
              :isLoading="isWaitingApiResponse"
              :disabled="isWaitingApiResponse"
              @fireClick="selectAnotherAddress"
            />
          </div>
          <!-- ========== End:: Modal Footer ========== -->
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
import AddressCard from "@/components/ui/cards/AddressCard.vue";

export default {
  name: "SelectAddressModal",

  emits: ["toggleModal", "setSelectedUserAddress"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    preSelectedAddress: {
      type: Object,
      required: true,
    },
  },

  components: {
    AddressCard,
  },

  data() {
    return {
      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Selected Address
      selectedAddress: null,
      // End:: Selected Address

      // Start:: Dummy Data
      dummyAddresses: [
        {
          id: 1,
          location: "Mecca",
          is_default: true,
        },
        {
          id: 2,
          location: "Mecca 2",
          is_default: false,
        },
        {
          id: 3,
          location: "Mecca 3",
          is_default: false,
        },
      ],
      // End:: Dummy Data
    }
  },

  computed: {
    addressIsActive() {
      return address => this.selectedAddress?.id  == address.id;
    },
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },
    // End:: Control Modal Apperance

    // Start:: Set Selected Address VAlue
    setSelectedAddressValue(selectedAddress) {
      this.selectedAddress = selectedAddress;
    },
    // End:: Set Selected Address VAlue

    // Start:: Select Another Address
    selectAnotherAddress() {
      this.toggleModal();
      this.$emit("setSelectedUserAddress", this.selectedAddress);
    },
    // End:: Select Another Address
  },

  mounted() {
    // Start:: Assign Preselected Address Value
    this.selectedAddress = this.preSelectedAddress;
    // End:: Assign Preselected Address Value
  },
};
</script>


<style lang="scss" scoped>
.select_address_form_wrapper {
  .modal_header_wrapper {
    padding:15px;
    margin-bottom: 15px;
    text-align: center;
    h5 {
      margin: 0;
      color: var(--theme_text_clr);
      font-size: 19px;
      font-family: $bold_font;
    }
  }

  form {
    padding: 15px;
  }

  .modal_footer_wrapper {
    padding: 15px;
    @include flex(center, center);
    column-gap: 10px;
    button {
      padding: 10px;
      font-size: 14px;
      width: 150px;
    }
  }
}
</style>
