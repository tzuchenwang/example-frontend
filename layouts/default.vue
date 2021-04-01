<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title>
        <v-btn to="/" plain>{{ title }}</v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="user.id"
        to="/menu/welcome"
        plain
        color="primary"
        class="text-capitalize"
      >
        <v-icon left>mdi-account</v-icon>
        {{ `${user.firstName}` }}
      </v-btn>
      <v-btn v-else to="/account/login" plain color="primary">
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      title: 'Vuetify'
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>