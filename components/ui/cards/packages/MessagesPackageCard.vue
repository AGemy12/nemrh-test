<template>
  <div :class="['package_card_wrapper', { selected: isSelected }]">
    <h2 class="package_name">
      {{ packageData.title }}
    </h2>
    <h3 class="package_price">
      {{ packageData.price }} {{ $t('OTHERS.Ryal') }}
    </h3>
    <h4 class="package_title">
      {{ discountRate }}
    </h4>
    <p class="package_desc">{{ packageData.desc }}</p>
    <ul class="package_advantages_list">
      <li>
        <i class="fa-solid fa-check"></i>
        <p>{{ packageData.subtitle }}</p>
      </li>
      <li>
        <p>
          <span v-if="packageData.messages_limit <= 50000">
            <i class="fa-solid fa-check"></i>
            {{ $t('OTHERS.MessageLimit') }} : {{ packageData.messages_limit }}
          </span>
          <span v-else>
            <i class="fa-solid fa-check"></i>
            {{ $t('OTHERS.MessageLimit') }} :
            {{ $t('OTHERS.unlimitedMessage') }}
          </span>
          <span class="message_limit_note">
            {{ $t('OTHERS.MessageLimitNote') }}
          </span>
        </p>
      </li>
      <li>
        <i class="fa-solid fa-check"></i>
        <p>
          <span>
            {{ $t('OTHERS.durationLimit') }} : {{ packageData.duration_limit }}
            {{ $t('OTHERS.days') }}
          </span>
        </p>
      </li>
      <li v-if="packageData.company_message == 1">
        <i class="fa-solid fa-check"></i>
        <p>
          <span> {{ $t('OTHERS.nemrhCompMess') }} </span>
        </p>
      </li>
      <li>
        <i
          v-if="packageData.can_upload_csv == 0"
          class="fa-solid fa-xmark text-danger"
        ></i>
        <i v-else class="fa-solid fa-check"></i>

        <p>
          <span> {{ $t('OTHERS.yourCustomerMess') }} </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PackageCard',

  props: {
    packageData: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    discountRate: {
      type: String,
    },
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
    }),
    // End:: Vuex Getters
  },
}
</script>

<style lang="scss" scoped>
.package_card_wrapper {
  height: 570px;
  padding: 1rem;
  @include flex(space-evenly, stretch, column);
  row-gap: 1.3rem;
  background-color: var(--theme_main_bg);
  border-radius: 8px;
  transition: all 0.3s linear;
  cursor: default;
  .package_name {
    font-family: $bold_font;
    font-size: 1.5rem;
    width: fit-content;
    margin: 0 auto !important;
    @media (max-width: 480px) {
      font-size: 1.2rem !important;
    }
  }
  .package_price {
    font-size: 1.5rem;
    width: fit-content;
    font-weight: bold;
    margin: 0 auto;
    @media (max-width: 480px) {
      font-size: 1.2rem !important;
    }
  }

  .package_title {
    font-family: $semi_bold_font;
    font-size: 1.2rem;
    width: fit-content;
    margin: 0 auto !important;
    color: var(--main_theme_clr);
    font-weight: bold;
  }

  .package_desc {
    margin: 0 !important;
    font-size: 1.2rem;
    color: var(--light_theme_text_clr);
    text-align: justify;
    line-height: 1.8;
    height: 100px;
    @media (max-width: 480px) {
      font-size: 1rem !important;
      height: auto;
    }
  }

  .package_advantages_list {
    li {
      @include flex(flex-start, center, row, 10px);
      margin-bottom: 0.75rem;
      svg {
        font-size: 25px;
        color: var(--main_theme_clr);
      }
      p {
        font-size: 1.2rem !important;
        @media (max-width: 480px) {
          font-size: 1rem !important;
          .message_limit_note {
            font-size: 0.6rem;
          }
        }
        .message_limit_note {
          display: block;
          text-align: justify;
          font-size: 0.9rem;
          margin: 0.5rem auto;
          width: 90%;
          @media (max-width: 480px) {
            font-size: 0.8rem !important;
          }
        }
      }
    }
  }
  .checkout_route {
    @include borderedBtnStyle;
    min-width: unset;
    border-color: var(--main_theme_clr);
    color: var(--main_theme_clr);
  }

  &:hover,
  &.selected {
    background-color: var(--main_theme_clr);
    border-color: transparent;
    * {
      color: var(--white);
    }
    .package_advantages_list {
      li {
        svg {
          color: var(--white);
        }
      }
    }
    .checkout_route {
      background-color: var(--white);
      color: var(--main_theme_clr);
    }
  }
}
</style>
