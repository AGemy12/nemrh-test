// store.js
export const state = () => ({
  advertisementImage: null, // تخزين الصورة مؤقتاً
})

export const mutations = {
  setAdvertisementImage(state, image) {
    state.advertisementImage = image
  },
}

export const actions = {
  storeImage({ commit }, image) {
    commit('setAdvertisementImage', image)
  },
}

export const getters = {
  getAdvertisementImage(state) {
    return state.advertisementImage
  },
}
