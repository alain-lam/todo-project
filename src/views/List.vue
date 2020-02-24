<template>
	<div id="list">
		<section class="todoList">
			<h1>Todo list of {{ this.$route.params.creator }}.</h1>
			<div class="todo__container">
				<div class="todo__item" v-for="todoItem in getTodoList" :key="todoItem.id" :class="{ active: todoItem.id === activeItem, completed: todoItem.completed }">
					<div class="todo__control--complete" @click="toggleCheck(todoItem)"><img :src="getCheckboxImageSource(todoItem)" alt="Checkbox"></div>
					<div class="todo__task" @click="selectItem(todoItem.id)">
						<div class="todo__title"><strong>{{ todoItem.title }}</strong></div>
						<div class="todo__content">{{ todoItem.content }}</div>
					</div>
					<div class="todo__control--delete" @click="deleteItem(todoItem)"><img src="../assets/delete.svg" alt="Delete"></div>
				</div>
			</div>
		</section>

		<section class="add--modal" :class="{ hide: isHidden }">
			<div class="add__container">
				<h2>Add a new task</h2>
				<input type="text" class="add__title" placeholder="Title" v-model="newTitle">
				<textarea type="text" class="add__content" placeholder="Content" v-model="newContent"></textarea>
				<div class="add__error error__message" :class="{ hide: addErrorMessage === '' }">{{ addErrorMessage }}</div>
				<button class="add__button--add" @click="addTodoData">Add</button>
				<button class="add__button--cancel" @click="toggleAddModal">Cancel</button>
			</div>
		</section>

		<div class="todo__control--add" @click="toggleAddModal"><img src="../assets/add.png" alt="Add"></div>
		<!-- <button @click="addTodoAll">add</button> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	data () {
		return {
			activeItem: Number,
			isHidden: true,
			newTitle: '',
			newContent: '',
			addErrorMessage: ''
		}
	},
	computed: {
		...mapGetters([
			'getTodoList'
		])
	},
	methods: {
		...mapMutations([
			'addTodo',
			'addTodoAll',
			'requestTodo',
			'updateTodo',
			'deleteTodo'
		]),
		selectItem (i) {
			this.activeItem = i
		},
		toggleCheck (item) {
			item.completed = !item.completed
			this.updateTodo({ id: item.id, patch: { completed: item.completed } })
		},
		toggleAddModal () {
			this.isHidden = !this.isHidden
			if (!this.isHidden) this.cleanAddFields()
		},
		getCheckboxImageSource (todoItem) {
			var imgSrc = (todoItem.completed) ? require('../assets/checkbox.svg') : require('../assets/checkbox-outline.svg')
			return imgSrc
		},
		addTodoData () {
			if (this.newTitle === '') this.addErrorMessage = 'Title must not be empty'
			else {
				this.toggleAddModal()
				var newTask = {
					title: this.newTitle,
					content: this.newContent,
					creator: this.$route.params.creator,
					completed: false,
					isShared: false
				}
				this.addTodo(newTask)
			}
		},
		deleteItem (item) {
			this.deleteTodo({ id: item.id })
		},
		cleanAddFields () {
			this.newTitle = ''
			this.newContent = ''
			this.addErrorMessage = ''
		}
	},
	mounted () {
		this.requestTodo({ creator: this.$route.params.creator })
	}
}
</script>

<style lang="scss">
	@import '../css/shared.scss';

	#list {
		padding: 5rem 5rem 7rem 5rem;
	}

	.todoList h1 {
		text-align: center;
	}

	.todo__container {
		border-radius: 15px;
		padding: 0;
		overflow: hidden;
	}

	.todo__item {
		cursor: pointer;
		width: 100%;
		margin: 0rem;
		padding: 1rem;
		background-color: rgb(37, 37, 37);
		border-bottom: 1px rgb(20, 20, 20) solid;

		display: grid;
		grid-template-columns: 5% 90% 5%;

		&:hover {
			background-color:rgb(54, 54, 54);
		}

		&.active {
			background-color: rgb(121, 98, 67);
			border: 2px #ffa500 solid;

			.todo__content {
				font-size: inherit;
				margin-top: 1rem;
				opacity: 1;
				transition: font-size .25s,
							margin .25s,
							padding .25s,
							opacity .5s .25s;
			}
		}

		.todo__title {
			font-size: 1.5rem;
		}

		.todo__task {
			padding: 1rem 1.5rem;
		}

		.todo__content {
			font-size: 0;
			margin: 0;
			opacity: 0;
			padding: 0;
			transition: opacity .25s,
						font-size .5s .25s,
						margin .5s .25s,
						padding .5s .25s;
		}

		&.completed {
			text-decoration: line-through;
		}
	}

	.todo__control--complete, .todo__control--delete {
		filter: invert(1);
		margin: auto;
	}

	.todo__control--delete:hover {
		filter: initial;
	}

	.todo__control--add {
		position: fixed;
		bottom: 1rem;
		left: calc(50% - 2rem);
		cursor: pointer;
		filter: brightness(0) invert(1);

		&:hover {
			filter: initial;
		}

		img {
			width: 4rem;
			height: 4rem;
		}
	}

	.add--modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.884);
		transition: all 0.5s ease-out;
		z-index: 60;

		@include display-flex();
		justify-content: center;
		align-items: center;

		&.hide {
			visibility: hidden;
			opacity: 0;
		}
	}

	.add__container {
		@include display-flex();
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 2rem;
		border-radius: 15px;
		background-color: #1d1d1d;

		h2 {
			margin-top: 0;
		}

		input, textarea {
			font-family: 'Nunito';
			width: 20rem;
			padding: 0.5rem;
			margin-bottom: 0.5rem;
			font-size: 1.1rem;
			border: 3px rgba(0, 0, 0, 0) solid;

			&:active, &:focus {
				border-color: #ffa500;
			}
		}

		input {
			width: 100%;
			font-size: 1.2rem;
			height: 2.5rem;
		}

		textarea {
			height: 5rem;
		}

		.add__button--add, .add__button--cancel {
			width: 100%;
			background-color: #ffa500;
			border: none;
			color: white;
			padding: 0.8rem 1.2rem;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 1rem;
			margin-bottom: 0.5rem;
			font-family: 'Nunito';
			font-size: 1.1rem;

			&:hover {
				cursor: pointer;
				background-color: rgb(121, 98, 67);
			}
		}
	}

	/* Small screens */
	@media (max-width: 60rem) {
		.todo__item {
			grid-template-columns: 8% 84% 8%;
		}

		.add__container {
			width: 70%;
			padding: 1rem;

			textarea {
				width: 100%;
			}
		}
	}

	/* Very small screens */
	@media (max-width: 40rem) {
		#list {
			padding: 5rem 0rem 8rem 0rem;
		}

		.todo__container {
			border-radius: initial;
		}

		.add__container {
			width: 90%;
			padding: 1rem;
		}
	}
</style>
