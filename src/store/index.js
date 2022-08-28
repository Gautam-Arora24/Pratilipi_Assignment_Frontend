import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('user_id'),
  },
  getters: {
  },
  mutations: {
    SET_IS_LOGGED_IN(state, data) {
      console.log('SDFDSF', data);
      state.isLoggedIn = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
