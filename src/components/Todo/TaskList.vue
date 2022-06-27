<template>
    <v-list
      flat
      class="pt-1"
    >
        <draggable 
            v-model="tasks" 
            handle=".handle"
        >
            <task
                v-for="(task, index) in tasks"
                :key="task.id"
                :task="task"
                :index="index"
            />
        </draggable>
    </v-list>
</template>

<script>
import Task from '@/components/Todo/Task.vue'
import draggable from 'vuedraggable'

export default {
    computed: {
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                // dispatching an action that commits the 'setTasks' mutation
                this.$store.dispatch('setTasks', value)
            }
        }
    },
    components: {
        'task': Task,
        'draggable': draggable
    }    
}
</script>