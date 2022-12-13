import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  //plugins: [createPersistedState({
    //storage: window.sessionStorage,
   //})],
  state: {
    items: [],
  },
  getters: {
    active: (state) => {
      return state.items;
    }
  },
  mutations: {
    deleteItemConfirm(state, {selectedId}) {
      state.items = state.items.filter(x => x.id != selectedId)
    },
    saveItem(state, {currentId, item}) {
      {Object.assign(state.items[currentId], item)}
    },
    createItem(state, item) {
      state.items.push(item)
      item.id = state.items.indexOf(item) + 1
    },
    addItems(state, response) {
      state.items = response;
    },
  },
  actions: {
    deleteItemConfirm({commit}, {selectedId}) {
      const URL = 'http://localhost:3000/items/delete'
      axios.post(URL, null, {params: {id: selectedId}}).then(function (response) {
        if (response.data.success) {
          commit("deleteItemConfirm", {selectedId})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    saveItem({commit}, {currentId, item}) {
      const URL = 'http://localhost:3000/items/update'
      axios.post(URL, item, {params: {id: currentId}}).then(function (response) {
        if (response.data.success) {
          commit("saveItem", {currentId, item: response.data.content})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    createItem({commit}, item) {
      const URL = 'http://localhost:3000/items/create'
      axios.post(URL, item).then(function (response) {
        if (response.data.success) {
          commit("createItem", item)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    loadItems({ commit }, searched) {
      const URL = 'http://localhost:3000/items'
      axios.get(URL, {params: {term: searched}}).then(response => {
        if (response.data.success) {
          commit('addItems', response.data.content)
        }
      })
      .catch (function(error){
        console.log(error);
      }) 
    },
  },
  modules: {
  }
})