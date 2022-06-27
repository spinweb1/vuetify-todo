import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false // make true to see Localbase logs

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      /* {
        id: 1,
        title: 'Buy grapes',
        done: false,
        dueDate: '2022-08-14'
      },
      {
        id: 2,
        title: 'Wash car',
        done: false,
        dueDate: '2022-08-22'
      },
      {
        id: 3,
        title: 'Eat bananas',
        done: false,
        dueDate: ''
      } */
    ],
    snackbar: {
      show: false,
      text: ""
    },
    isSorting: false
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
      //console.log(state.search)
    },
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },
    doneTask(state, id) {
      // How to grab a specific task
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      // Return all tasks except this one
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
      window.scrollTo(0, 0)
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
      window.scrollTo(0, 0)
    },
    setTasks(state, tasks) {
      // console.log("tasks:", tasks)
      state.tasks = tasks
    },
    showSnackbar(state, text) {
      // only want delay if snackbar is currently displayed
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 600
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    toggleSorting(state) {
      state.isSorting = !state.isSorting
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added!')
      })
    },
    doneTask({ state, commit }, id) {
      // at this point we don't know what this task's done property is.. so including this
      let task = state.tasks.filter(task => task.id === id)[0]

      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Task removed!')        
      })
    },
    updateTaskTitle({ commit }, payload) {
      //console.log(payload)
      db.collection('tasks').doc({id: payload.id}).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task edited!')
      })
    },
    updateTaskDueDate({ commit }, payload) {
      //console.log(payload)
      db.collection('tasks').doc({id: payload.id}).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Due date updated!')
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks) // removed promise as it was causing slight loading glitch
      commit('setTasks', tasks)
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    }
  },
  getters: {
    tasksFiltered(state) {
      // if no text in search return all tasks
      if (!state.search) {
        return state.tasks
      } else {
        return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
      }
    }
  }
})
