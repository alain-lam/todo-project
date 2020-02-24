import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://vuejs-todo-2f445.firebaseio.com/'
})

export default instance
