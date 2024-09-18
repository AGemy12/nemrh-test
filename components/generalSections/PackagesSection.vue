<template>
  <section class="messaging_packages_section_content_wrapper">
    <h2 class="section_title" v-html="sectionTitle"></h2>
    <div class="messaging_packages_section_content_wrapper_container">
      <PackageOption
        href="/find-your-company"
        :packageOptionTitle="
          $t(
            'Packages.PackagesOptions.AdvertisementsOption.AdvertisementsOptionTitle'
          )
        "
        id="advertisementsOption"
        iconClass="fa-solid fa-rectangle-ad"
      />
      <PackageOption
        href="/messages-subscriptions"
        :packageOptionTitle="
          $t('Packages.PackagesOptions.MessagesOption.MessagesOptionTitle')
        "
        id="messagesOption"
        iconClass="fa-solid fa-rocket"
      />
    </div>
  </section>
</template>

<script>
import PackageOption from '../ui/cards/packages/PackageOption.vue'

export default {
  name: 'PackagesSection',
  props: {
    sectionTitle: {
      type: String,
      required: true,
    },
  },
  components: {
    PackageOption,
  },
  data() {
    return {
      activeIndex: null,
    }
  },
}
</script>

<style lang="scss">
.messaging_packages_section_content_wrapper {
  padding: 30px 0;
  @include flex(center, center, column);
  row-gap: 1rem;
  overflow: hidden;
  .section_title {
    @include font($semi_bold_font, 1.6rem);
    text-transform: capitalize;
    text-align: center;
    width: fit-content;
    margin: 20px auto;
    line-height: 1.8;
    max-width: 100%;
    span {
      display: inline-block;
      margin-inline: 0.3rem;
      text-align: center;
      padding: 0.2rem 1rem;
      @include font($medium_font, 1.4rem);
      color: var(--white);
      background-color: var(--main_theme_clr);
      border-radius: 8px;
    }
  }
  .messaging_packages_section_content_wrapper_container {
    @include flex(center, center, row, 30px);
    @media (max-width: 1024px) {
      flex-wrap: wrap;
      gap: 20px;
    }
  }
}
</style>
