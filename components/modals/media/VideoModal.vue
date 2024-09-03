<template>
  <transition name="fadeInUp">
    <v-dialog
      width="fit-content"
      max-width="800"
      elevation="0"
      class="video_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card
        class="d-flex justify-center"
        color="transparent"
        elevation="0"
      >
          <video controls>
            <source :src="videoSrc" type="video/mp4">
            <source :src="videoSrc" type="video/ogg">
          </video>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "VideoModal",

  emits: ["toggleModal"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    videoSrc: {
      type: String,
      required: true,
    },
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal');
    },
    // End:: Control Modal Apperance
  },
};
</script>

<style lang="scss">
.v-card {
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
