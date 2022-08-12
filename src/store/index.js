import Vue from 'vue'
import Vuex from 'vuex'
import {getCart} from "../service/cart";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartCount: 0
  },
  mutations: {
    addCart(state, value){
      state.cartCount = value.count
    }
  },
  actions: {
    async updateCart(context){
      const {data} = await getCart()
      context.commit('addCart', {
        count : data.length || 0
      })
    }
  },
  modules: {
  }
})
