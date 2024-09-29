// store.js
export const state = () => ({
  advertisementImage: null,
  advertisementImageName: null,
})

export const mutations = {
  setAdvertisementImage(state, { image, name }) {
    state.advertisementImage = image
    state.advertisementImageName = name
    // console.log('Image stored in Vuex:', state.advertisementImage)
    // console.log('Image Name stored in Vuex:', state.advertisementImageName)
  },
}
export const actions = {
  storeImage({ commit }, { image, name }) {
    commit('setAdvertisementImage', { image, name })
  },
}

export const getters = {
  getAdvertisementImage(state) {
    return state.advertisementImage
  },
  getAdvertisementImageName(state) {
    return state.advertisementImageName
  },
}
