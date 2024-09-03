// =========================== Start:: Contact Us Module State ===========================
export const state = () => ({
  contactData: null,
});
// =========================== End:: Contact Us Module State ===========================

// =========================== Start:: Contact Us Module Mutations ===========================
export const mutations = {
  // Start:: Set Notifications
  setContactData(state, payload) {
    state.contactData = payload;
  },
  // End:: Set Notifications
};
// =========================== End:: Contact Us Module Mutations ===========================

// =========================== Start:: Contact Us Module Actions ===========================
export const actions = {
  // Start:: Get Contact  Us Data
  async getContactData(context) {
    try{
      // ********** Start:: Implement Request ********** //
      let res = await this.$axiosRequest({
        method: 'GET',
        url: 'pages/contact',
      });
      context.commit('setContactData', res.data.data);
      // ********** End:: Implement Request ********** //
    } catch (err) {
      console.log(err.response.data.message);
    }
  },
  // End:: Get Contact  Us Data
};
// =========================== End:: Contact Us Module Actions ===========================

// =========================== Start:: Contact Us Module Getters ===========================
export const getters = {
  // Start:: Contact Us Data Getter
  contactUsData(state) {
    return state.contactData;
  },
  // End:: Contact Us Data Getter
};
// =========================== End:: Contact Us Module Getters ===========================
