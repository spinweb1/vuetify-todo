<template>
    <div>
        <v-list-item 
            :ripple="false"
            @click="$store.dispatch('doneTask', task.id)"
            :class="{ 'teal lighten-5' : task.done }"
            class="white"
        >
            <template v-slot:default>
                <v-list-item-action>
                    <v-checkbox
                        :input-value="task.done"
                        color="primary"
                    ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title
                        :class="{'text-decoration-line-through' : task.done }"
                    >{{ task.title }}
                    </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <v-list-item-action-text v-if="task.dueDate">
                        <v-icon small class="pr-1">mdi-calendar</v-icon>
                        {{ task.dueDate | niceDate }}
                    </v-list-item-action-text>
                </v-list-item-action>
                
                <v-list-item-action>
                    <task-menu :task="task" />
                </v-list-item-action>

                <v-list-item-action v-if="$store.state.isSorting">
                    <v-btn
                        color="primary"
                        class="handle"
                        icon
                    >
                        <v-icon>mdi-drag-horizontal-variant</v-icon>
                    </v-btn>
                </v-list-item-action>
            </template>
        </v-list-item>
        <v-divider></v-divider>
    </div>
</template>

<script>
import TaskMenu from '@/components/Todo/TaskMenu'
import moment from "moment";

export default {
    props: ['task'],
    components: {
        'task-menu': TaskMenu
    },
    filters: {
        niceDate(value) {
            return moment(value).format("MMM Do");
        }
    }
}
</script>

<style lang="sass">
.sortable-ghost
  opacity: 0
.sortable-drag
  box-shadow: 0 0 10px rgba(0,0,0,0.6)
</style>