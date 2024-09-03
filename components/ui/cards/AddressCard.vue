<template>
  <div
    class="address_card"
    :class="{current_address: isActive}"
    @click="$emit('selectIAddress', addressData)"
    v-if="addressData"
  >
    <h4 class="address_name">
      <span class="custom_card_check">  </span>
      {{addressData.location}}
    </h4>

    <div class="address_actions_btns" v-if="actionsAvailable">
      <button class="delete_btn" @click="$emit('deleteAddress', addressData)">
        <i class="fa-solid fa-trash"></i>
      </button>

      <nuxt-link
        :to="localePath(`/profile/addresses/edit/${addressData.id}`)"
        class="edit_route"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressCard',

  emits: ['deleteAddress', "selectIAddress"],

  props: {
    addressData: {
      required: true,
      type: Object,
    },
    isActive: {
      required: true,
      type: Boolean,
    },
    actionsAvailable: {
      required: false,
      type: Boolean,
      default: true,
    }
  },
}
</script>

<style lang="scss">
.address_card {
  margin-block: 0;
  padding: 0 15px;
  @include flex(space-between, center);
  column-gap: 10px;
  margin-bottom: 15px;
  background-color: var(--theme_main_bg);
  border-radius: 8px;
  .address_name {
    padding: 10px 0;
    @include flex(flex-start, center);
    column-gap: 10px;
    margin: 0;
    max-width: 89%;
    min-width: 89%;
    font-size: 16px;
    font-family: $semi_bold_font;
    cursor: pointer;
    @include textEllipsis;
    .custom_card_check {
      position: relative;
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--main_theme_clr);
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 13px;
        height: 13px;
        background-color: var(--main_theme_clr);
        border-radius: 50%;
        opacity: 0;
        transition: all 0.2s linear;
      }
    }

    &:hover {
      .custom_card_check {
        &::after {
          opacity: 1;
        }
      }
    }
  }
  .address_actions_btns {
    @include flex(flex-end, center);
    column-gap: 12px;
    button {
      &.delete_btn {
        i,
          svg {
          font-size: 16px;
          color: var(--mid_red);
        }
      }
    }
    a {
      &.edit_route {
          i,
          svg {
            font-size: 16px;
            color: var(--theme_text_clr);
          }
      }
    }
  }
  &.current_address {
    .address_name {
      .custom_card_check {
        &::after {
          content: "";
          opacity: 1;
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .address_card {
    padding: 15px;
    .address_name {
      font-size: 15px;
    }
  }
}
</style>
