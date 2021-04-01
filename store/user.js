export const state = () => ({
  id: '',
  firstName: '',
  lastName: '',
  email: ''
})

export const mutations = {
  assign(state, user) {
    state.id = user.id
    state.firstName = user.firstName
    state.lastName = user.lastName
    state.email = user.email
  },
  logout(state) {
    state.id = ''
    state.firstName = ''
    state.lastName = ''
    state.email = ''
  }
}