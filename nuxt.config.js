export default {
  target: 'server',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: {
    color: '#5E17EB',
    height: '3px',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/main.scss',
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],

  script: ['@bootstrap.bundle.min.js'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axiosConfig.js',
    '@/plugins/i18n.client.js',
    '@/plugins/vuetify.js',
    '@/plugins/aos.client.js',
    '@/plugins/fontAwesome.js',
    '@/plugins/vueSwiperCarousel.client.js',
    '@/plugins/imageLazyLoad.client.js',
    '@/plugins/flipCountdown.client.js',
    '@/plugins/vueLottie.client.js',
    '@/plugins/vueLettering.client.js',
    '@/plugins/main.js',
    { src: '~/plugins/viewport.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/style-resources'],

  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: false,
      icons: 'mdiSvg',
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-izitoast',
    [
      'cookie-universal-nuxt',
      {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      },
    ],
    [
      'nuxt-gmaps',
      {
        key: 'AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA',
        libraries: ['places'],
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            name: 'عربي ',
            code: 'ar',
            iso: 'ar-AR',
            file: 'ar.json',
            dir: 'rtl',
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en.json',
            dir: 'ltr',
          },
        ],
        langDir: 'locales/',
        lazy: true,
        loadLanguageAsync: true,
        defaultLocale: 'ar',
        fallbackLocale: 'ar',
        strategy: 'prefix',
        detectBrowserLanguage: false,
        rootRedirect: 'ar',
      },
    ],
    '@nuxt/icon',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   baseURL: 'http://api-nemrh-test.cmt-saudi.com/api/',
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Router Extend Config
  router: {
    mode: 'history',
    base: '/',
  },

  // Nuxt Style Resources
  styleResources: {
    scss: [
      '@/assets/sass/abstracts/_mixins.scss',
      '@/assets/sass/abstracts/_variables.scss',
    ],
  },

  // IziToast Config
  izitoast: {
    position: 'bottomLeft',
    transitionIn: 'bounceInTop',
    transitionOut: 'fadeOutBottom',
    timeout: 2000,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {},
  },

  server: {
    port: 3014,
  },

  // env: {
  //   baseUrl: process.env.API_BASE_URL || '',
  // },
}
