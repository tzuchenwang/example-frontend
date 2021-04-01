<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="loginForm" autocomplete="off">
                <v-text-field
                  prepend-icon="mdi-email"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="user.email"
                  :rules="rule.emailRules"
                  @keyup.enter="login"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  :type="show ? 'text' : 'password'"
                  v-model="user.password"
                  :rules="rule.passwordRules"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  @keyup.enter="login"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" plain to="/account/register">Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" plain @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          <span class="error--text">Incorrect email or password.</span>
        </v-card-title>
        <v-card-actions class="grey lighten-2">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      show: false,
      dialog: false,
      user: {
        email: '',
        password: ''
      },
      rule: {}
    }
  },
  methods: {
    setRule() {
      this.rule = {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required'
        ]
      }
    },
    async login() {
      this.setRule()
      await this.$refs.loginForm.validate()
      if (!this.valid)
        return

      const { data } = await this.$graphql.execute(
        this.$graphql.query.user.LOGIN,
        this.user
      )

      if (data.authenticateUserWithPassword) {
        this.$store.commit('user/assign', data.authenticateUserWithPassword.item)
        this.$router.push('/menu/welcome')
      }
      else {
        this.dialog = true
      }
    }
  }
}
</script>
