<template>
  <v-dialog
    :value="true"
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Edit task
      </v-card-title>

      <v-card-text>
        Edit the task title.
      </v-card-text>
     
      <v-text-field 
        v-model="taskTitle" 
        class="pl-6 pr-6" 
        @keyup.enter="saveTask"
      ></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="green darken-1"
            text
            @click="$emit('close')"
        >
            Cancel
        </v-btn>

        <v-btn
            color="red darken-1"
            text
            :disabled="taskTitleInvalid"
            @click="saveTask"
        >
            Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
            taskTitle: null
        }
    },
    computed: {
        taskTitleInvalid() {
            return !this.taskTitle || this.task.title === this.taskTitle
        }
    },
    methods: {
        saveTask() {
            if (!this.taskTitleInvalid) {
                let payload = {
                    id: this.task.id,
                    title: this.taskTitle
                }
                this.$store.dispatch('updateTaskTitle', payload)
                this.$emit('close')
            }
        }
    },
    mounted() {
        this.taskTitle = this.task.title
    }
}
</script>