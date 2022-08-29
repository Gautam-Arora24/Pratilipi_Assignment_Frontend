import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('user_id'),
    socket: null,
  },
  getters: {
  },
  mutations: {
    SET_IS_LOGGED_IN(state, data) {
      state.isLoggedIn = data;
    },
    SET_SOCKET(state, data) {
      state.socket = data;
    }
  },
  actions: {
  },
  modules: {
  },
});
