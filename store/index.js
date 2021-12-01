import cookies from 'js-cookie';

export const state = () => ({
  token: null,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },

  REMOVE_TOKEN(state) {
    state.token = null;
  }
};

export const actions = {
  setToken({commit}, {token}) {
    this.$axios.setToken(token, 'Bearer');
    //const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
    cookies.set('x-access-token', token);
    commit('SET_TOKEN', token);
  },

  logout({commit}) {
    this.$axios.setToken(false);
    cookies.remove('x-access-token');
    commit('REMOVE_TOKEN');
  }
};