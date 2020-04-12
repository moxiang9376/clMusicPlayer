import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wheelImg: ""
  },
  mutations: {
    changeWheelImg(state, src) {
      state.wheelImg = src;
    }
  },
  actions: {}
});
