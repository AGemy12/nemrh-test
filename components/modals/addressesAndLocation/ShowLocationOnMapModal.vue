<template>
  <transition name="fadeInUp">
    <v-dialog
      width="fit-content"
      max-width="600"
      elevation="0"
      class="map_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card
        class="d-flex justify-center"
        color="transparent"
        elevation="0"
      >
        <GMap
          ref="gMap"
          :center="mapCenter"
          :options="{
            fullscreenControl: true,
            styles: mapStyle,
          }"
          :zoom="13"
        >
          <GMapMarker :position="mapCenter"></GMapMarker>
        </GMap>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "ShowLocationOnMapModal",

  emits: ["toggleModal"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      // Start:: G-map Data
      mapCenter: {
        lat: 55.555555,
        lng: 55.555555,
      },
      mapStyle: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ saturation: -100 }],
        },
      ],
      // End:: G-map Data
    }
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },
    // End:: Control Modal Apperance
  },

  mounted() {
    this.$nextTick(() => {
      // this.$refs.gMap.refresh();
    });
  },
};
</script>

<style lang="scss" scoped>
  .map_modal {
    background-color: var(--white);
    width: fit-content;
    border-radius: 15px;
    overflow: hidden;
  }
</style>
