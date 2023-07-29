import { createStore } from 'vuex';


export default createStore({
  state: {
    token: null
  },
  getters: {
     
  },
  mutations: {
    // SET_USER_DATA (state, userData) {
    //   state.token = userData 
    //   localStorage.setItem('token', response.data.message.token)
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    // }
  },
  actions: {
    //  async deleteProduct({ commit }, productId) {
    //    try {
    //      const response = await axios.delete(`/product/${productId}`)
    //      console.log(response.data);
    //    } catch (error) {
    //       window.alert('Product deletion failed!');
    //       console.log(error);
    //    }
    //  }
  },
  modules: {
  }
})
