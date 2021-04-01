import * as user from './query/user'

export default ({ app }, inject) => {
  const execute = (query, variables = {}) => {
    return app.$axios.$post('/admin/api', {
      variables,
      query,
    }).then(res => {
      return res
    })
  }

  const graphql = {
    execute: execute,
    query: {
      user: user
    }
  }

  inject('graphql', graphql)
}