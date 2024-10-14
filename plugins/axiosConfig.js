export default ({ app, $axios, store, redirect, $cookies }, inject) => {
  const axiosRequest = $axios.create({
    // baseURL: ``, //****  LIVE URL ****//
    baseURL: `https://api-nemrh-test.cmt-saudi.com/api/`, //****  TEST URL ****//
    // baseURL: `http://192.168.1.18:8000/api/`, //****  LOCAL URL ****//
    headers: {
      common: {
        'cache-control': 'cache-control',
        Accept: 'application/json',
      },
    },
  })

  axiosRequest.setToken(
    app.$cookies.get('nemrh_website_user_token') || '',
    'Bearer'
  )
  axiosRequest.setHeader('Accept-Language', app.i18n.locale)
  axiosRequest.setHeader('lang', app.i18n.locale)

  // axiosRequest.onRequest(config => {
  //     console.log('Making request to =>' + config.url);
  // });
  axiosRequest.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 404) {
      const requestUrl = error.response.config.url
      if (!requestUrl.includes('company/email')) {
        redirect('/404')
      }
    } else if (code === 500) {
      redirect('/500')
    } else if (code === 401) {
      console.log('401')
      localStorage.clear()
      $cookies.removeAll()
      store.commit('auth/resetState')
      window.location.reload()
      // app.router.replace(app.localPath('/auth/login'));
    }
  })

  inject('axiosRequest', axiosRequest)
}
