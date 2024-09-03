<template>
  <div class="breadcrumb_wrapper">
    <v-breadcrumbs
      :items="breadcrumbItems"
      divider=">"
    ></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: "BaseBreadcrumb",

  props: {
    breadcrumbItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.breadcrumb_wrapper {
  .v-breadcrumbs {
    li {
      font-size: 15px;
      .v-breadcrumbs__item {
        color: var(--black);
        font-family: $regular_font;

      }
    }
    .v-breadcrumbs__divider {
      color: var(--black);
      padding: 0 6px;
    }
  }
}
</style>
