<template>
  <v-row>
    <v-col>
      <v-form style="margin: 10px;" v-model="valid" ref="profileForm" autocomplete="off">
        <v-row>
          <v-col>
            <v-text-field
              prepend-icon="mdi-account"
              name="firstName"
              label="First Name"
              type="text"
              v-model="user.firstName"
              :rules="rule.firstNameRules"
              @keyup.enter="update"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              name="lastName"
              label="Last Name"
              type="text"
              v-model="user.lastName"
              :rules="rule.lastNameRules"
              @keyup.enter="update"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          prepend-icon="mdi-email"
          name="email"
          label="Email"
          type="text"
          v-model="user.email"
          disabled
        ></v-text-field>
        <v-btn
          @click="changePassword = !changePassword"
          style="margin: 10px 0px 20px 0px;"
        >
          <v-icon left dark v-if="changePassword">mdi-check</v-icon>
          Change Password
        </v-btn>
        <div v-if="changePassword">
          <v-text-field
            id="password"
            prepend-icon="mdi-lock"
            name="password"
            label="Password"
            :type="show1 ? 'text' : 'password'"
            v-model="password"
            :rules="rule.passwordRules"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            @keyup.enter="update"
          ></v-text-field>
          <v-text-field
            id="confirmPassword"
            prepend-icon="mdi-lock"
            name="confirmPassword"
            label="Confirm Password"
            :type="show2 ? 'text' : 'password'"
            v-model="confirmPassword"
            :rules="rule.confirmPasswordRules"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
            @keyup.enter="update"
          ></v-text-field>
        </div>
      </v-form>
      <v-row justify="center" style="margin-top: 30px;">
        <v-btn color="primary" :loading="loading" @click.native="update">
          <v-icon left dark v-if="updateSuccess">mdi-check</v-icon>
          Save Changes
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'system',
  data () {
    return {
      loading: false,
      updateSuccess: false,
      valid: false,
      changePassword: false,
      show1: false,
      show2: false,
      password: '',
      confirmPassword: '',
      rule: {}
    }
  },
  computed: {
    user () {
      return {...this.$store.state.user}
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
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be greater than 8 characters',
        ],
        confirmPasswordRules: [
          v => !!v || 'Confirm password is required',
          v => v == this.password || 'Confirm password must be valid'
        ]
      }
    },
    async update() {
      this.setRule()
      await this.$refs.profileForm.validate()
      if (!this.valid)
        return

      this.loading = true

      let query = this.$graphql.query.user.UPDATE_USER

      if (this.changePassword) {
        this.user.password = this.password
        query = this.$graphql.query.user.UPDATE_USER_WITH_PASSWORD
      }

      const { data } = await this.$graphql.execute(
        query,
        this.user
      )

      this.$store.commit('user/assign', data.updateUser)

      setTimeout(() => {
        this.loading = false
        this.updateSuccess = true
        this.rule = false
      }, 500)

    }
  }
}
</script>