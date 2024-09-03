<template>
  <div class="map_container col-12 ">
    <!-- <div class="disabled_overlay" v-if="viewOnly"></div> -->

    <div class="input_wrapper">
      <!-- <input
        v-if="!viewOnly"
        ref="gmap__synced_search_input"
        class="map_search_input"
        type="text"
        :placeholder="$t('FORMS.Placeholders.searchOnMap')"
        @input="getAddress"
      /> -->
      <v-text-field
        v-if="!viewOnly"
        ref="gmap__synced_search_input"
        type="text"
        :label="placeholder"
        @input="getAddress"
        :required="required"
        :disabled="disabled"
        :rules="validationRules"
        :error-messages="serverSideErrorMessage"
      >
      </v-text-field>
    </div>

    <div class="page_map_wrapper">
      <GMap
        ref="gMap"
        class="google_map"
        :center="mapCenter"
        :options="{}"
        :zoom="14"
        @click="generateMarkersOnMapClicking"
      >
        <GMapMarker
          :position="marker"
          :options="{ draggable: !viewOnly }"
          @mouseout="setMarkerValueOnDragging"
        ></GMapMarker>
      </GMap>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapSearchLocationInput",

  props: {
    initialLocation: {
      type: Object,
      required: false,
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      required: false,
      type: String,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    validationRules: {
      required: false,
      type: Array,
    },
    serverSideErrorMessage: {
      required: false,
    },
  },

  emits: ['selectLocation'],

  data() {
    return {
      // Start:: Loader Contrle Data
      isWaitingRequest: false,
      // End:: Loader Contrle Data

      // Start:: G-map Data
      mapStyle: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ saturation: -100 }],
        },
      ],
      // End:: G-map Data

      // Start:: Request Data
      address: '',
      center: null,
      mapCenter: {
        lat: 24.72697848143481,
        lng: 46.70513856250001,
      },
      marker: {
        lat: 24.72697848143481,
        lng: 46.70513856250001,
      },
      // End:: Request Data
    }
  },

  watch: {
    initialLocation(newVal, oldVal) {
      if(!oldVal.lat && !oldVal.lng) {
        // console.log("TEST =>", !oldVal.lat);
        // console.log("TEST =>", !oldVal.lng);

        this.mapCenter = {
          lat: newVal.lat,
          lng: newVal.lng,
        };
        this.marker = {
          lat: newVal.lat,
          lng: newVal.lng,
        };
      }
    },

    mapCenter() {
      if (this.$refs.gMap.map) {
        this.$refs.gMap.map.setCenter(this.mapCenter);
        this.$refs.gMap.markers[0].setPosition(this.mapCenter);
      }
      // this.$refs.gMarker.map.setPosition(this.mapCenter)
    },
    marker(value) {
      if (this.$refs.gMap.map && value) {
        this.$refs.gMap.markers[0].setPosition(value);
        this.$emit('selectLocation', {...value, address: this.address});
      }
    },
  },

  methods: {
    // Start:: Get Selected Location
    getAddress() {
      var self = this;
      var input = this.$refs.gmap__synced_search_input.$refs.input;
      var searchBox = new google.maps.places.SearchBox(input);
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        // var bounds = new google.maps.LatLngBounds();

      places.forEach(function (place) {
          // bounds.extend(place.geometry.location);
          self.address =  place.formatted_address;
          self.marker = self.mapCenter = {
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat(),
          };
          // console.log("SELECTED ADDRESS ==>", place.formatted_address)
        });
      })
    },
    // End:: Get Selected Location

    // Start:: Handling Marker Dragging
    async setMarkerValueOnDragging(e) {
      // ********** Start:: Set Marker Lat & Lng ********** //
      this.marker = {
        lat: e.event.latLng.lat(),
        lng: e.event.latLng.lng(),
      }
      // ********** End:: Set Marker Lat & Lng ********** //

      // ********** Start:: Set Formatted Address ********** //
      try {
        const formattedAddressData = await this.$axios({
          method: 'GET',
          url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.event.latLng.lat()},${e.event.latLng.lng()}&key=AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA`,
        })
        // console.log("formattedAddressData ==>", formattedAddressData.data.results[0].formatted_address);
        this.address = formattedAddressData.data.results[0].formatted_address;
      } catch (err) {
        console.log(err)
      }
      // ********** End:: Set Formatted Address ********** //
    },
    // End:: Handling Marker Dragging

    // Start:: Handling Map Clicking
    async generateMarkersOnMapClicking(e) {
      if(!this.viewOnly) {
        // ********** Start:: Set Marker Lat & Lng ********** //
        this.marker = {
          lat: e.event.latLng.lat(),
          lng: e.event.latLng.lng(),
        }
        // ********** End:: Set Marker Lat & Lng ********** //

        // ********** Start:: Set Formatted Address ********** //
        try {
          const formattedAddressData = await this.$axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.event.latLng.lat()},${e.event.latLng.lng()}&key=AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA`,
          })
          // console.log("formattedAddressData ==>", formattedAddressData.data.results[0].formatted_address);
          this.address = formattedAddressData.data.results[0].formatted_address;
        } catch (err) {
          console.log(err)
        }
        // ********** End:: Set Formatted Address ********** //
      }
    },
    // End:: Handling Map Clicking

    // Start:: Get Current Location
    getCurrentLocation() {
      // console.log('Current Location ==>' + this.initialLocation);

      if (navigator.geolocation && !this.initialLocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // this.$axios({
          //   method: "get",
          //   url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAITrPfT5r_qmCm_8ekZyPmnebGo8o_r18`,
          // })
          //   .then((res) => {
          //     console.log(res.data.results[0].formatted_address);
          //   })
          //   .catch(() => {});
          // console.log('cds')
          // console.log(position)

          console.log('Current Location ==>' + position.coords);

          this.marker = this.mapCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          //     (this.center = this.markers[0].position)
          //   this.coordinates_to_edit.lat = this.center.lat
          //   this.coordinates_to_edit.lng = this.center.lng
        })
      }
    },
    // End:: Get Current Location
  },

  mounted() {
    // Start:: Fire Methods
    this.getCurrentLocation();
    // End:: Fire Methods

    // if(this.initialLocation) {
    //   console.log("MOUNTED =>", this.initialLocation);
    //   console.log("MOUNTED =>", this.initialLocation.lat);
    //   console.log("MOUNTED =>", this.initialLocation.lng);
    //   this.$set(this.mapCenter, 'lat', this.initialLocation.lat);
    //   this.$set(this.mapCenter, 'lng', this.initialLocation.lng);
    //   this.$set(this.marker, 'lat', this.initialLocation.lat);
    //   this.$set(this.marker, 'lng', this.initialLocation.lng);
    // }

    // this.mapCenter = {
    //   lat: this.initialLocation.lat,
    //   lng: this.initialLocation.lng,
    // };
    // this.marker = {
    //   lat: this.initialLocation.lat,
    //   lng: this.initialLocation.lng,
    // };
  },
}
</script>

<style lang="scss" scoped>
.map_container {
  margin-bottom: 1rem;
  position: relative;
  // .disabled_overlay {
  //   position: absolute;
  //   inset: 0;
  //   background-color: rgba(0, 0, 0, 0.6);
  //   border-radius: 10px;
  //   z-index: 2;
  // }
  .map_search_input {
      width: 100%;
      margin: 0;
      outline: none;
      border-radius: 4px;
      background: var(--white);
      font-size: 14px;
      margin-block-end: 8px;
      border:1px solid var(--deactive_button_bg);
      line-height: 40px;
      padding-inline-start: 15px !important;
  }
  .page_map_wrapper {
    border-radius: 10px;
    overflow: hidden;
    height: 400px;
      .GMap__Wrapper {
      height: 400px !important;
    }
  }
}
</style>
