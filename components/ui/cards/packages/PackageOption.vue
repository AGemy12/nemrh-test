<template>
  <a
    :class="`package_option_link  ${soonStyle} `"
    :href="href"
    @click="prventAction"
  >
    <div
      class="package_option_wrapper"
      :class="{ active: isActive }"
      @click="handleClick"
      :id="id"
    >
      <h2 class="package_name">
        <i :class="iconClass"></i>
        <span v-html="packageOptionTitle"></span>
      </h2>
    </div>
  </a>
</template>

<script>
export default {
  name: 'PackageOption',

  props: {
    packageOptionTitle: {
      type: String,
      required: true,
    },
    packageOptionDesc: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
    },
    iconClass: {
      type: String,
      required: true,
    },
    soonStyle: {
      type: String,
      required: false,
    },
    prventAction: {
      type: Function,
      required: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('toggleActive')
    },
  },
}
</script>

<style lang="scss" scoped>
.package_option_link {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  &.soon {
    &::before {
      content: 'قريبا';
    }
    cursor: default;
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
}
.package_option_wrapper {
  height: 290px;
  width: 300px;
  padding: 1.5rem;
  @include flex(space-evenly, stretch, column);
  row-gap: 0.5rem;
  background-color: var(--theme_main_bg);
  transition: all 0.3s linear;
  @media (max-width: 450px) {
    width: 250px;
    height: 250px;
  }
  .package_name {
    margin: 0 !important;
    text-align: center;
    text-wrap: nowrap;
    @include flex(center, center, column, 30px);
    svg {
      font-size: 50px;
      color: var(--main_theme_clr);
    }
    span {
      font-family: $bold_font;
      font-size: 1.1rem;
    }
  }
  &:hover span {
    color: var(--white);
  }
  &:hover svg {
    color: var(--white) !important;
  }
  .package_title {
    font-family: $bold_font;
    font-size: 1.4rem;
  }

  .package_desc {
    margin: 0 !important;
    font-size: 0.9rem;
    color: var(--light_theme_text_clr);
    text-align: justify;
    line-height: 1.8;
  }
  &:hover {
    background-color: var(--main_theme_clr);
    border-color: transparent;
    * {
      color: var(--white);
    }

    .checkout_route {
      background-color: var(--white);
      color: var(--main_theme_clr);
    }
  }
}
.active {
  background-color: var(--main_theme_clr);
  border-color: transparent;

  * {
    color: var(--white);
  }
  .package_desc {
    color: var(--white) !important;
  }
}
</style>
