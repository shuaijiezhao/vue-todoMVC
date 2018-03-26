// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'todomvc-app-css/index.css'

import Vue from 'vue'

var filters = {
	all(todos) {
		return todos
	},
	active(todos) {
		return todos.filter((todo) => {
			return !todo.completed
		})
	},
	completed(todos) {
		return todos.filter((todo) => {
			return todo.completed
		})
	}
}

let app = new Vue({
	el: '.todoapp',
	data: {
		title: 'todoMVC',
		todos: [{
			content: 'vue',
			completed: false
		},{
			content: 'vuex',
			completed: false
		}],
		newTodo: '',
		editedTodo: null,
		hashName: 'all'
	},
	computed: {
		remain() {
			return filters.active(this.todos).length
		},
		isAll: {
			get() {
				return this.remain == 0
			},
			set(value) {
				return this.todos.forEach((todo) => {
					todo.completed = value
				})
			}
		},
		filteredTodos() {
			return filters[this.hashName](this.todos)
		}
	},
	methods: {
		addTodo(e) {
			if (!this.newTodo) {
				return
			}
			this.todos.push({
				content: this.newTodo,
				completed: false
			})
			this.newTodo = ''
		},
		removeTodo(index) {
			this.todos.splice(index, 1)
		},
		editTodo(todo) {
			this.editCache = todo.content
			this.editedTodo = todo
		},
		doneEdit(todo, index) {
			this.editedTodo = null
			if (!todo.content) {
				this.removeTodo(index)
			}
		},
		cancleEdit(todo) {
			this.editedTodo = null
			todo.content = this.editCache
		},
		clear() {
			this.todos = filters.active(this.todos)
		}
	},
	directives: {
		focus(el, value) {
			if (value) {
				el.focus()
			}
		}
	}
})

function hashChange() {
	let hashName = location.hash.replace(/#\/?/, '')
	if (filters[hashName]) {
		app.hashName = hashName
	} else {
		location.hash = ''
		app.hashName = 'all'
	}
}

window.addEventListener('hashchange', hashChange)





