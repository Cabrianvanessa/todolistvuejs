<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <h1>Vue ToDo List</h1>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="5">
          <div class="create-todo">
            <!-- Display total tasks and completed tasks -->
            <div class="totaltask">
              <div class="totalvalue">Tasks <span>{{ totalItems }}</span></div>
              <div class="totalvalue">Tasks Done <span>{{ totalCompletedItems }}</span></div>
              <div class="actions" v-if="totalCompletedItems > 0">
                <button class="delete" @click="deleteSelected"><i class="fa-solid fa-trash delete"></i>Tasks Done</button>
              </div>
              <div class="actions">
                <button class="delete" @click="deleteAllTasks"><i class="fa-solid fa-trash delete"></i>Tasks</button>
              </div>
            </div>
            <div class="todo-list">
              <div class="list" id="todo-list">
                <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
                  <label>
                    <input class="" type="checkbox" v-model="todo.done" />
                    <span :class="`bubble ${todo.category == 'a' ? 'a' : 'b'}`"></span>
                  </label>
                  <div class="todo-content">
                    <input class="todo-items" type="text" v-model="todo.content" />
                  </div>
                  <div class="actions">
                    <button class="delete" @click="removeTodo(todo)">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Add a new todo -->
            <form class="new-todo-form" id="new-todo-form" @submit.prevent="addTodo">
              <input type="text" name="content" id="content" placeholder="New Task" v-model="input_content" />
              <input class="add-button" type="submit" value="+" />
            </form>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* add some free styles */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const input_content = ref('')

const todos_asc = computed(() => todos.value.sort((a, b) => a.createdAt - b.createdAt))

const addTodo = () => {
  if (input_content.value.trim() === '') {
    return
  }

  todos.value.push({
    content: input_content.value,
    category: 'a',
    done: false,
    editable: false,
    createdAt: new Date().getTime()
  })
  input_content.value = '';
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

const deleteSelected = () => {
  todos.value = todos.value.filter((todo) => !todo.done)
}

const deleteAllTasks = () => {
  todos.value = [] // Set the todos array to an empty array to delete all tasks
}

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {
  deep: true
})

const totalItems = computed(() => todos.value.length)
const completedTodos = computed(() => todos.value.filter(todo => todo.done))
const totalCompletedItems = computed(() => completedTodos.value.length)

</script>
