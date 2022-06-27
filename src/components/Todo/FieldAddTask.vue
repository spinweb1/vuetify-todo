<template>
    <v-text-field
      v-on:keyup.enter="addTask"
      v-model="newTaskTitle"
      outlined
      clearable
      hide-details
      label="Add task"
      class="pr-3 pl-3 pt-3"
    >
      <template v-slot:append>
        <v-icon
          @click="addTask"
          :disabled="newTaskTitleInvalid"
          color="primary"
        >
          mdi-plus
        </v-icon>
      </template>
    </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: ''
    }
  },
  computed: {
      newTaskTitleInvalid() {
          return !this.newTaskTitle
      }
  },
  methods: {
      addTask() {
        if (!this.newTaskTitleInvalid) {
          this.$store.dispatch('addTask', this.newTaskTitle)
          this.newTaskTitle = ''
        }
      }
  }    
}
</script>