<template>
  <div class="advertisement_item" @click="clickToActiveOption">
    <h5>
      {{ adsSinglePackage.title }}
    </h5>
    <div class="advertisement_item_image">
      <img :src="srcImage" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    srcImage: {
      type: String,
      require: true,
    },
    adsSinglePackage: {
      type: Object,
      required: true,
    },

    // clickToActiveOption: {
    //   type: Function,
    // },
  },
  methods: {
    clickToActiveOption() {
      document
        .querySelectorAll('.advertisements_first_step .advertisement_item')
        .forEach((item) => {
          item.classList.remove('active')
        })
      this.$el.classList.add('active')
      document
        .querySelector('.advertisements_next_btn')
        .removeAttribute('disabled')
      this.$emit('itemSelected', this.advertisementItemTitle)
    },
  },
}
</script>

<style lang="scss" scoped>
.advertisement_item {
  background-color: var(--gray_overlay_bg);
  border-radius: 10px;
  @include flex(space-between, center, column, 10px);
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: var(--main_theme_clr);
    transform: scale(1.02);
  }
  h5 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    text-align: center;
    @media (max-width: 450px) {
      font-size: 15px;
    }
  }

  &:hover h5 {
    color: var(--white);
  }
  .advertisement_item_image {
    padding: 10px;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  &.active {
    transform: scale(1.02);
    background-color: var(--main_theme_clr);
    h5 {
      color: var(--white);
    }
  }
}
</style>
