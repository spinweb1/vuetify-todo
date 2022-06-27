<template>
    <div>
        <v-menu
            bottom
            left
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    class="menu-hover"
                    @click="handleClick(index)"
                >
                    <v-list-item-icon>
                        <v-icon 
                            class="menu-hover__icon" 
                            v-text="item.icon">
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title 
                        class="menu-hover__title">
                         {{ item.title }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <dialog-edit 
            v-if="dialogs.edit" 
            :task="task" 
            @close="dialogs.edit = false" 
        />
        <dialog-due-date 
            v-if="dialogs.dueDate"
            :task="task"
            @close="dialogs.dueDate = false"
        />
        <dialog-delete 
            v-if="dialogs.delete" 
            :task="task" 
            @close="dialogs.delete = false" 
        />
    </div>
</template>

<script>
import Dialog from '@/components/Todo/Dialogs/Dialog'
import DialogEdit from '@/components/Todo/Dialogs/DialogEdit'
import DialogDueDate from '@/components/Todo/Dialogs/DialogDueDate'

export default {
    props: ['task'],
    data: () => ({
      dialogs: {
            edit: false,
            dueDate: false,
            delete: false,
            sort: false
      },
      items: [
        { 
            title: 'Edit', 
            icon: 'mdi-application-edit-outline',
            click() {
                this.dialogs.edit = true
            } 
        },
        { 
            title: 'Due date', 
            icon: 'mdi-calendar-clock-outline',
            click() {
                this.dialogs.dueDate = true
            } 
        },
        { 
            title: 'Delete', 
            icon: 'mdi-delete',
            click() {
                this.dialogs.delete = true
            } 
        },
        {
            title: 'Sort',
            icon: 'mdi-drag-horizontal-variant',
            click() {
                if (!this.$store.state.search) {
                    // if search field is empty, activate sorting
                    this.$store.commit('toggleSorting')
                } else {
                    this.$store.commit('showSnackbar', 'No sorting while searching!')
                }
            }
        }
      ],
    }),
    methods: {
        handleClick(index) {
            this.items[index].click.call(this)
        }
    },
    components: {
        'dialog-delete': Dialog,
        'dialog-edit': DialogEdit,
        'dialog-due-date': DialogDueDate
    }    
}
</script>

<style>
.menu-hover:hover {
    background-color: rgb(170, 171, 170);
}
.menu-hover:hover .menu-hover__title {
    background-color: rgb(170, 171, 170);
    color: #fff;
}
.menu-hover:hover .menu-hover__icon {
    background-color: rgb(170, 171, 170);
    color: #fff;
} 
</style>