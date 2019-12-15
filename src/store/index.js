import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mostrarDashBorad:false
  },
  mutations: {
    LimpiarDashboar(state, valor){
      state.mostrarDashBorad = valor;
    },
  },
  actions: {
  },
  modules: {
  }
})
