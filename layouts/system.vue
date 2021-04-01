<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="!isMobile"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        v-if="!isMobile"
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
    >
      <v-list>
        <v-list-item v-for="item in rightItems" :key="item.title" @click="item.method">
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.subtitle">{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/menu/welcome'
        }
      ],
      miniVariant: false,
      rightDrawer: false,
      isMobile: true,
    }
  },
  mounted() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
  },
  methods: {
    async logout() {
      await this.$graphql.execute(this.$graphql.query.user.LOGOUT)
      location.replace('/')
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    rightItems() { 
      return [
        {
          icon: 'mdi-account',
          title: `${this.user.firstName} ${this.user.lastName}`,
          subtitle: 'Profile',
          method: () => this.$router.push('/setting/profile')
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          method: this.logout
        }
      ]
    }
  }
}
</script>
