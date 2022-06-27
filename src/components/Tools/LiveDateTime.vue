<template>
    <div class="text-subtitle-2 font-weight-light ml-4">
        {{ date }}
    </div>
</template>

<script>
import moment from "moment";

export default {
    data() {
        return {
            date: ''
        }
    },
    methods: {
        formatDateTime() {
            // store the reformatted time as this.date
            this.date = moment().format("MMMM D, h:mm:ss");
            // run this same function every second
            setTimeout(this.formatDateTime, 1000)
        }
    },
    mounted() {
        // need to trigger the method when component's loaded
        this.formatDateTime()
    }
}
</script>