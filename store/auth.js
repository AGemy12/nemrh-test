// =========================== Start:: Auth Module State ===========================
export const state = () => ({
  userId: null,
  userWhatsappId: null,
  changeWhatsappNumber: null,
  userType: null,
  userToken: null,
  userName: null,
  userEmail: null,
  userAvatar: null,
  userPhone: null,
  userPhone_code: null,
  user: null,
  verificationCode: null,
  userCountry: null,
  country_id: null,
  city_id: null,
})
// =========================== End:: Auth Module State ===========================

// =========================== Start:: Auth Module Mutations ===========================
export const mutations = {
  // Start:: Update Store Auth Values To Fix SSR Bug
  updateStateAuthValues(state, payload) {
    // console.log("VUEX METHODS", payload);

    if (payload.id) {
      state.userId = payload.id
    }
    if (payload.uid) {
      state.userWhatsappId = payload.uid
    }
    if (payload.canChangeWhatsapp) {
      state.changeWhatsappNumber = payload.canChangeWhatsapp
    }
    if (payload.type) {
      state.userType = payload.type
    }
    if (payload.token) {
      state.userToken = payload.token
    }
    if (payload.avatar) {
      state.userAvatar = payload.avatar
    }
    if (payload.name) {
      state.userName = payload.name
    }
    if (payload.phone) {
      state.userPhone = payload.phone
    }
    if (payload.email) {
      state.userEmail = payload.email
    }
    if (payload.verificationCode) {
      state.verificationCode = payload.verificationCode
    }
  },
  // End:: Update Store Auth Values To Fix SSR Bug

  // Start:: Set Authed User Data Mutation
  setAuthedUserData(state, payload) {
    if (payload.id) {
      state.userId = payload.id
      this.$cookies.set('nemrh_website_user_id', payload.id)
    }
    if (payload.canChangeWhatsapp) {
      state.changeWhatsappNumber = payload.canChangeWhatsapp
      this.$cookies.set(
        'nemrh_website_change_whatsapp',
        payload.canChangeWhatsapp
      )
    }
    if (payload.uid) {
      state.userWhatsappId = payload.uid
      this.$cookies.set('nemrh_website_user_uid', payload.uid)
    }
    if (payload.type) {
      state.userType = payload.type
      this.$cookies.set('nemrh_website_user_type', payload.type)
    }
    if (payload.token) {
      state.userToken = payload.token
      this.$cookies.set('nemrh_website_user_token', payload.token)
    }
    if (payload.avatar) {
      state.userAvatar = payload.avatar
      this.$cookies.set('nemrh_website_user_avatar', payload.avatar)
    }
    if (payload.name) {
      state.userName = payload.name
      this.$cookies.set('nemrh_website_user_name', payload.name)
    }
    if (payload.email) {
      state.userEmail = payload.email
      this.$cookies.set('nemrh_website_user_email', payload.email)
    }
    if (payload.fullname) {
      state.userName = payload.fullname
      this.$cookies.set('nemrh_website_user_name', payload.fullname)
    }
    if (payload.country) {
      state.country_id = payload.country.id
      state.userCountry = payload.country
      this.$cookies.set('nemrh_website_country_id', payload.country.id)
    }
    if (payload.city) {
      state.city_id = payload.city.id
      this.$cookies.set('nemrh_website_city_id', payload.city.id)
    }
    if (payload.phone) {
      state.userPhone = payload.phone
      this.$cookies.set('nemrh_website_user_phone', payload.phone)
    }
    if (payload.phone_code) {
      state.userPhone_code = payload.phone_code
      this.$cookies.set('nemrh_website_user_phone_code', payload.phone_code)
    }
    if (payload.verificationCode) {
      state.verificationCode = payload.verificationCode
      this.$cookies.set(
        'nemrh_website_user_verification_code',
        payload.verificationCode
      )
    }
  },
  // END:: SET Authed User Data Mutation

  // Start:: Delete Local Storage Authed Data Mutation
  deleteAuthedUserData(state, payload) {
    if (payload.id) {
      this.$cookies.remove('nemrh_website_user_id')
    }
    if (payload.uid) {
      this.$cookies.remove('nemrh_website_user_uid')
    }
    if (payload.canChangeWhatsapp) {
      this.$cookies.remove('nemrh_website_change_whatsapp')
    }
    if (payload.type) {
      this.$cookies.remove('nemrh_website_user_type')
    }
    if (payload.token) {
      this.$cookies.remove('nemrh_website_user_token')
    }
    if (payload.avatar) {
      this.$cookies.remove('nemrh_website_user_avatar')
    }
    if (payload.phone) {
      this.$cookies.remove('nemrh_website_user_phone')
    }
    if (payload.verificationCode) {
      this.$cookies.remove('nemrh_website_user_verification_code')
    }
    if (payload.email) {
      this.$cookies.remove('nemrh_website_user_email')
    }
  },
  // End:: Delete Local Storage Authed Data Mutation

  // Start:: Reset State Data
  resetState(state) {
    state.userAvatar = null
    state.userEmail = null
    state.userPhone = null
    state.userPhone_code = null
    state.userToken = null
    state.userName = null
    state.userId = null
    state.userWhatsappId = null
    state.changeWhatsappNumber = null
    state.userType = null
    state.user = null
    state.verificationCode = null
  },
  // End:: Reset State Data
}
// =========================== End:: Auth Module Mutations ===========================

// =========================== Start:: Auth Module Actions ===========================
export const actions = {
  // Start:: Set Authed User Data Action
  setAuthedUserData(context, payload) {
    context.commit('setAuthedUserData', payload)
  },
  // End:: Set Authed User Data Action

  // Start:: Delete Local Storage Authed Data Action
  deleteAuthedUserData(context, payload) {
    context.commit('deleteAuthedUserData', payload)
  },
  // End:: Delete Local Storage Authed Data Action

  // Start:: Logout Action
  async logout(context) {
    try {
      // ********** Start:: Implement Request ********** //
      await this.$axiosRequest({
        method: 'GET',
        url: 'auth/logout',
      })
      localStorage.clear()
      this.$cookies.removeAll()
      context.commit('resetState')
      this.$router.go()
      // ********** End:: Implement Request ********** //
    } catch (err) {
      this.$izitoast.error({
        message: err.response.data.message,
      })
    }
  },
  // End:: Logout Action

  // Start:: DeleteAccount Action
  deleteAccount(context) {
    // localStorage.clear()
    this.$axiosRequest.delete('delete_my_account').then((res) => {
      this.$router.push(this.localePath('/'))
      this.$cookies.removeAll()
      context.commit('resetState')
      this.$izitoast.success({
        message: `${res.data.message}`,
      })
    })
    // location.reload()
  },
  // End:: DeleteAccount Action

  // Start :: Get User Data
  async getAuthedUserData(context) {
    const response = await this.$axiosRequest.get('/profile')
    // console.log(res.data.data)setAuthedUserData
    context.dispatch('setAuthedUserData', response.data.data)
  },
  // End :: Get User Data
}
// =========================== End:: Auth Module Actions ===========================

// =========================== Start:: Auth Module Getters ===========================
export const getters = {
  // Start:: Authed User Data Getter
  authedUserData(state) {
    return {
      id: state.userId,
      uid: state.userWhatsappId,
      canChangeWhatsapp: state.changeWhatsappNumber,
      type: state.userType,
      token: state.userToken,
      name: state.userName,
      email: state.userEmail,
      avatar: state.userAvatar,
      phone: state.userPhone,
      phone_code: state.userPhone_code,
      verificationCode: state.verificationCode,
      country_id: state.country_id,
      city_id: state.city_id,
      country: state.userCountry,
    }
  },
  userIsLoggedIn(state) {
    return !!state.userToken
  },
  // End:: Authed User Data Getter
}
// =========================== End:: Auth Module Getters ===========================
