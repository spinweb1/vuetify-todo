<template>
    <v-text-field
        :value="$store.state.search"
        @input="$store.commit('setSearch', $event)"
        class="expanding-search mt-1"
        :class="{'closed' : searchClosed && !$store.state.search}"
        placeholder="Search"
        filled
        dense
        clearable
        prepend-inner-icon="mdi-magnify"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        :disabled="$store.state.isSorting"
    ></v-text-field>
</template>

<script>
export default {
    data() {
        return {
            searchClosed: true
        }
    }
}
</script>

<style lang="sass">
.expanding-search
  transition: max-width 0.3s
  .v-input__slot
    &:before, &:after
      border-color: transparent !important
  &.closed
    max-width: 45px
    .v-input__slot
        background-color: transparent !important
  .v-input__prepend-inner
    cursor: pointer
.v-text-field > .v-input__control > .v-input__slot::before, .v-text-field > .v-input__control > .v-input__slot::after 
  bottom: none
  content: initial
</style>