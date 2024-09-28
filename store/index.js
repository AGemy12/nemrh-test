// store.js
export const state = () => ({
  advertisementImage: null,
  advertisementImageName: null,
})

export const mutations = {
  setAdvertisementImage(state, { image, name }) {
    state.advertisementImage = image
    state.advertisementImageName = name
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
