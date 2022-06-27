<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="counter++">{{ counter }}</button>
    <input 
      @keyup="doSomething" 
      v-model="text" 
      v-autofocus 
      :class="{'error': text.length > 23 }"
      ref="messageInput" />
    <div>{{ text.length }}</div>
    <h5 v-if="text">Some h5 copy</h5>
    <h6 v-else>{{ message | messageLowercase }}</h6>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      text: 'bald head guy',
      message: 'NICE ONE',
      counter: 0
    }
  },
  computed: {
    errorStyle() {
      if (this.text.length > 22) {
        return {
          'color' : 'red',
          'backgroundColor' : 'yellow'
        }
      }
    }
  },
  methods: {
    doSomething(e) {
      console.log(e)
      if (e.keyCode === 53) {
        alert('Tina')      
      }
    }
  },
  filters: {
    messageLowercase(value) {
      return value.toLowerCase();
    }
  },
  directives: {
    autofocus: {
      inserted(el) {
        console.log("input inserted")
        el.focus();
      }
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log(this.$refs)
    this.$refs.messageInput.className = 'bg-green'
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  }
}
</script>

<style>
.error {
  color: #ff0000;
}
button {
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid rgb(66, 65, 65);
  padding: 4px;
  border-radius: 4px;
}
</style>
