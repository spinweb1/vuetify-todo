<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app>
      <v-img
        class="pa-4"
        height="170"
        src="@/assets/hintersee.jpg"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar
          size="65"
        >
          <img
            src="@/assets/eric.jpg"
            alt="Eric"
          >
        </v-avatar>
        <div class="white--text text-subtitle-1 pt-2">Eric Schweitzer</div>
        <div class="white--text text-subtitle-2 font-weight-light">@eric_schweitzer</div>
      </v-img>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="@/assets/hintersee.jpg"
      height="170"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="pa-0 pt-4 header-container">
        <v-row>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <search v-if="$route.path === '/'" />
        </v-row>
        <v-row>
            <v-toolbar-title class="ml-3 text-h4">
              {{ $store.state.appTitle }}
            </v-toolbar-title>
        </v-row>
        <v-row>
            <live-date-time />
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>

  </v-app>
</template>

<script>
import Snackbar from '@/components/Shared/Snackbar'
import Search from '@/components/Tools/Search'
import LiveDateTime from '@/components/Tools/LiveDateTime'

export default {
  data: () => ({ 
    drawer: null,
    items: [
        { title: 'Todo', icon: 'mdi-pencil-box', to: "/" },
        { title: 'About', icon: 'mdi-help-box', to: "/about" },
        //{ title: 'Photos', icon: 'mdi-image', to: "/photos" },
      ],
    right: null, 
  }),
  components: {
    'snackbar': Snackbar,
    'search': Search,
    'live-date-time': LiveDateTime
  },
  mounted() {
    this.$store.dispatch('getTasks')
    window.scrollTo(0, 0) // this is vanilla js.  may be bad to mix it in
  }
}
</script>

<style>
.v-responsive__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-container {
  max-width: none !important;
}

.v-snack__content {
  color: #000;
}
</style>
