<template>
  <div class="todo">
    <field-add-task />
    <task-list 
      v-if="$store.state.tasks.length"
    />
    <no-tasks v-else />
    <button-done-sorting 
      v-if="$store.state.isSorting"
    />
  </div>
</template>

<script>
import FieldAddTask from '@/components/Todo/FieldAddTask.vue'
import TaskList from '@/components/Todo/TaskList.vue'
import NoTasks from '@/components/Todo/NoTasks.vue'
import ButtonDoneSorting from '@/components/Todo/ButtonDoneSorting.vue'

export default {
  components: {
    'field-add-task': FieldAddTask,
    'task-list': TaskList,
    'no-tasks': NoTasks,
    'button-done-sorting': ButtonDoneSorting
  }
}
</script>
