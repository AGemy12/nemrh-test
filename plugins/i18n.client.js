export default ({ app }) => {
  const BODY_ELEMENT = document.body;
  if(app.i18n.locale == "en") {
    BODY_ELEMENT.setAttribute("dir", "ltr");
  } else if (app.i18n.locale == "ar") {
    BODY_ELEMENT.setAttribute("dir", "rtl");
  }

  // ========== (onBeforeLanguageSwitch) Called Right Before Setting A New Locale ========== //
  // app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup) => {
  //   console.log('onBeforeLanguageSwitch', oldLocale, newLocale, isInitialSetup, app)
  // }

  // ========== (onLanguageSwitched) Called Right After A New Locale Has Been Set ========== //
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    console.log('onLanguageSwitched', oldLocale, newLocale, app)
    if(newLocale === "en") {
      BODY_ELEMENT.setAttribute("dir", "ltr");
    } else if (newLocale === "ar") {
      BODY_ELEMENT.setAttribute("dir", "rtl");
    }

    location.replace(location.origin + location.pathname.replace(`/${oldLocale}`, `/${newLocale}`))
    
    // setTimeout(() => {
    //   app.router.go();
    // }, 1000);

    // const locale = this.$i18n.locale == 'en' ? 'ar' : 'en'
    // this.$store.commit('localStorage/SET_CURRENT_LOCALE', locale)
    // const languageCode = `Bearer ${locale}_${module.default}`
    // this.$axios.defaults.headers.common.Authorization = languageCode
    // import(`~/locales/${locale}`).then((module) => {
    //   this.$i18n.setLocaleMessage(locale, module.default)
    //   window.history.replaceState('', '', this.switchLocalePath(locale))
    //   this.$nuxt.$router.go()
    // })
  }
}
