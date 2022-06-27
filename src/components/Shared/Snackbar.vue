<template>
  <v-snackbar
    v-model="$store.state.snackbar.show"
    color="#f0de51"
  >
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="#000"
        text
        v-bind="attrs"
        @click="$store.commit('hideSnackbar')"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="sass">
div.v-snack:not(.v-snack--absolute)
  height: 100%
</style>