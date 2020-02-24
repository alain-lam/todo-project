import Vue from 'vue'
import Vuex from 'vuex'
import axiosTodo from '../store/axios-todo.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		todoList: []
	},
	getters: {
		getTodoList: state => {
			return state.todoList
		}
	},
	mutations: {
		requestTodo: (state, param) => {
			axiosTodo.get(`/todo.json?orderBy="creator"&equalTo="${param.creator}"`)
				.then(response => {
					state.todoList = []
					for (var key in response.data) {
						response.data[key].id = key
						state.todoList.push(response.data[key])
					}
				})
		},
		updateTodo: (state, param) => {
			axiosTodo.patch(`/todo/${param.id}.json`, param.patch)
				.then(
					result => {
						console.log(result)
					})
		},
		addTodo: (state, param) => {
			axiosTodo.post('/todo.json', param)
				.then(
					result => {
						param.id = result.data.name
						state.todoList.push(param)
					})
		},
		deleteTodo: (state, param) => {
			axiosTodo.delete(`/todo/${param.id}.json`)
				.then(
					result => {
						state.todoList = state.todoList.filter(function (value, index, arr) {
							return value.id !== param.id
						})
						console.log(result)
					})
		}
	},
	actions: {
	},
	modules: {
	}
})
