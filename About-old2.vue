<template lang="">
    <div>
        <ul>
            <li @click="deleteTask(index)" v-for="(task, index) in tasks">
                <div>{{ task.name }}</div>
                <small>{{ task.date }} @ {{ task.time }}</small><button>X</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tasks: [
                {
                    name: 'dog time',
                    date: '05/23/22',
                    time: '18:30'
                },
                {
                    name: 'cat day',
                    date: '05/22/22',
                    time: '16:30'
                },
                {
                    name: 'turtle time',
                    date: '05/24/22',
                    time: '14:30'
                }
            ]
        }
    },
    methods: {
        deleteTask(index) {
            this.tasks.splice(index, 1)
        }
    }
}
</script>

<style>
    button {
        border: 1px solid #666;
        padding: 4px;
        border-radius: 4px;
    }
</style>