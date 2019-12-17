export default {
    namespaced: true,
    state: {
      users: [],
      show_users: true
    },
    mutations: {
      updateUserList(state, value){
          state.userList = value
      },
      toggleUserList(state){
          state.show_users = !state.show_users
      }
    },
    actions: {
        async fetchUsers({commit}){
            const response = axios.get('http:\\localhost:3000/users')
            commit('updateUserList', response.data)
        }
    }
  }
  