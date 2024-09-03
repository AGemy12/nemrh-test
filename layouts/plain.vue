<template>
  <v-app class="plain_layout position-relative" :dir="$i18n.locale == 'en' ? 'ltr' : 'rtl'">
    <v-main class="app_main_content_wrapper">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PlainLayout',
}
</script>
