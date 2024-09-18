// store/index.js
export const state = () => ({
  adImage: null, // تخزين الصورة
})

export const mutations = {
  setAdImage(state, image) {
    state.adImage = image
  },
}

export const getters = {
  getAdImage(state) {
    return state.adImage
  },
}
