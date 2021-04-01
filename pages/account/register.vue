<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
            <v-toolbar dark color="success darken-1">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="registerForm" autocomplete="off">
                <v-row>
                  <v-col>
                    <v-text-field
                      prepend-icon="mdi-account"
                      name="firstName"
                      label="First Name"
                      type="text"
                      v-model="user.firstName"
                      :rules="rule.firstNameRules"
                      @keyup.enter="register"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      name="lastName"
                      label="Last Name"
                      type="text"
                      v-model="user.lastName"
                      :rules="rule.lastNameRules"
                      @keyup.enter="register"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  prepend-icon="mdi-email"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="user.email"
                  :rules="rule.emailRules"
                  @keyup.enter="register"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  :type="show1 ? 'text' : 'password'"
                  v-model="user.password"
                  :rules="rule.passwordRules"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  @keyup.enter="register"
                ></v-text-field>
                <v-text-field
                  id="confirmPassword"
                  prepend-icon="mdi-lock"
                  name="confirmPassword"
                  label="Confirm Password"
                  :type="show2 ? 'text' : 'password'"
                  v-model="user.confirmPassword"
                  :rules="rule.confirmPasswordRules"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  @keyup.enter="register"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" plain @click="register">Register</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog
      v-model="errorDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          <span class="error--text">The email address is already registered.</span>
        </v-card-title>
        <v-card-actions class="grey lighten-2">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="errorDialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="successDialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          <span class="success--text text--darken-1">Registered successfully!</span>
        </v-card-title>
        <v-card-actions class="grey lighten-2">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="login"
          >
            Login
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
      show1: false,
      show2: false,
      errorDialog: false,
      successDialog: false,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rule: {}
    }
  },
  methods: {
    setRule() {
      this.rule = {
        firstNameRules: [
          v => !!v || 'First name is required'
        ],
        lastNameRules: [
          v => !!v || 'Last name is required'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be greater than 8 characters'
        ],
        confirmPasswordRules: [
          v => !!v || 'Confirm password is required',
          v => v == this.user.password || 'Confirm password must be valid'
        ]
      }
    },
    async register() {
      this.setRule()
      await this.$refs.registerForm.validate()
      if (!this.valid)
        return

      const { data } = await this.$graphql.execute(
        this.$graphql.query.user.REGISTER,
        this.user
      )

      if (data.createUser) {
        this.successDialog = true
      }
      else {
        this.errorDialog = true
      }
    },
    async login() {
      const { data } = await this.$graphql.execute(
        this.$graphql.query.user.LOGIN,
        this.user
      )

      if (data.authenticateUserWithPassword) {
        this.$store.commit('user/assign', data.authenticateUserWithPassword.item)
        this.$router.push('/menu/welcome')
      }
    }
  }
}
</script>
