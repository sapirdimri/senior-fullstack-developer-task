import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
    userRole: [],
  },
  getters: {
    getUsername: (state) => state.username,
    getUserRoles: (state) => state.userRole,
  },
  mutations: {
    setUserRoles(state, roles) {
      state.userRole = [...roles];
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    updateUserRoles({ commit }, role) {
      commit("setUserRole", role);
    },
    updateUsername({ commit }, username) {
      commit("setUsername", username);
    },
  },
  modules: {
    // Define your modules here
  },
});
