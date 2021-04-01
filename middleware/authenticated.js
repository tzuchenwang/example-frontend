export default async function ({ store, redirect, route, $graphql }) {
  let accountPath = ['/account/login', '/account/register']

  if (store.state.user.id) {
    if (accountPath.includes(route.path))
      return redirect('/')
  }
  else {
    const { data } = await $graphql.execute($graphql.query.user.CHECK_USER)

    if (data.authenticatedUser) {
      store.commit('user/assign', data.authenticatedUser)
      if (accountPath.includes(route.path))
        return redirect('/')
    }
    else if (route.path != '/' && !accountPath.includes(route.path)) {
      return redirect('/account/login')
    }
  }
}