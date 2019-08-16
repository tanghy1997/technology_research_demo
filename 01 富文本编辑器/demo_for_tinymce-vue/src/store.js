import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      tinymceData: null
  },
  getters: {
    tinymceData: state => {
      return state.tinymceData
    }
  },
  mutations: {
    setTinymceData(state, inputData) {
      state.tinymceData = inputData;
    }
  },
  actions: {

  }
})
