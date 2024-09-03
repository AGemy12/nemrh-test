<template>
  <transition name="fadeInUp">
    <v-dialog
      width="fit-content"
      max-width="600"
      elevation="0"
      class="image_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card
        class="d-flex justify-center"
        color="transparent"
        elevation="0"
      >
        <div class="image_wrapper">
          <img
            :src="modalImage"
            alt="Modal Image"
            width="500"
            height="500"
          />
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: "ImageModal",

  emits: ["toggleModal"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    modalImage: {
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

<style lang="scss" scoped>
  .image_wrapper {
    background-color: var(--white);
    width: fit-content;
    border-radius: 15px;
    overflow: hidden;
  }

  @media screen and (max-width: 991px) {
    .image_wrapper {
      height: 250px;
      img {
        width: 100%;
        height: 250px;
      }
    }
  }
</style>
