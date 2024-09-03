// =========================== Start:: Notifications Module State ===========================
export const state = () => ({
  notifications: null,
  unreadNotificationsCount: 0,
})
// =========================== End:: Notifications Module State ===========================

// =========================== Start:: Notifications Module Mutations ===========================
export const mutations = {
  // Start:: Set Notifications
  setNotifications(state, payload) {
    state.notifications = payload.notification
    state.unreadNotificationsCount = payload.unreadNotificationsCount
  },
  // End:: Set Notifications
}
// =========================== End:: Notifications Module Mutations ===========================

// =========================== Start:: Notifications Module Actions ===========================
export const actions = {
  // Start:: Get Notifications
  async getNotifications(context) {
    try {
      // ********** Start:: Implement Request ********** //
      let res = await this.$axiosRequest({
        method: 'GET',
        url: 'get-notification',
      })
      context.commit('setNotifications', {
        notification: res.data.data.notifications,
        unreadNotificationsCount: res.data.data.unReadNotificationCount,
      })
      // ********** End:: Implement Request ********** //
    } catch (err) {
      console.log(err.response.data.message)
    }
  },
  // End:: Get Notifications

  // Start:: Read Notification
  async readNotification(context, payload) {
    try {
      // ********** Start:: Implement Request ********** //
      await this.$axiosRequest({
        method: 'GET',
        url: 'notification-read',
        params: {
          notification_id: payload,
        },
      })
      context.dispatch('getNotifications')
      // ********** End:: Implement Request ********** //
    } catch (err) {
      console.log(err.response.data.message)
    }
  },
  // End:: Read Notification
}
// =========================== End:: Notifications Module Actions ===========================

// =========================== Start:: Notifications Module Getters ===========================
export const getters = {
  // Start:: Notifications Getter
  userNotification(state) {
    return state.notifications
  },
  unreadNotificationsCount(state) {
    return state.unreadNotificationsCount
  },
  // End:: Notifications Getter
}
// =========================== End:: Notifications Module Getters ===========================
